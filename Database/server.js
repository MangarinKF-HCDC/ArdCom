const express = require('express');
const path = require('path');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { run, get, all } = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'ardcom_secret_2026';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

function createToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '12h' });
}

async function getUserFromToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await get('SELECT id, username, email, phone, address, city, province, postal_code FROM users WHERE id = ?', [payload.id]);
    req.user = user || null;
  } catch (error) {
    req.user = null;
  }

  next();
}

app.use(getUserFromToken);

app.post('/api/signup', async (req, res) => {
  const { username, email, password, phone, address, city, province, postal_code } = req.body || {};

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  try {
    const existing = await get('SELECT id FROM users WHERE email = ?', [email]);
    if (existing) return res.status(400).json({ message: 'Email is already registered.' });

    const password_hash = await bcrypt.hash(password, 10);
    const created_at = new Date().toISOString();

    const result = await run(
      `INSERT INTO users (username, email, password_hash, phone, address, city, province, postal_code, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [username, email, password_hash, phone || '', address || '', city || '', province || '', postal_code || '', created_at]
    );

    const user = { id: result.lastID, username, email, phone, address, city, province, postal_code };
    const token = createToken(user);
    res.json({ user, token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Unable to create account.' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password.' });

    const token = createToken(user);
    res.json({ user: {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      province: user.province,
      postal_code: user.postal_code,
    }, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Unable to log in.' });
  }
});

app.get('/api/user', (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated.' });
  res.json(req.user);
});

app.put('/api/user/profile', async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated.' });

  const { phone, address, city, province, postal_code } = req.body || {};
  try {
    await run(
      `UPDATE users SET phone = ?, address = ?, city = ?, province = ?, postal_code = ? WHERE id = ?`,
      [phone || '', address || '', city || '', province || '', postal_code || '', req.user.id]
    );
    const user = await get('SELECT id, username, email, phone, address, city, province, postal_code FROM users WHERE id = ?', [req.user.id]);
    res.json(user);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Unable to update profile.' });
  }
});

async function ensureActiveCart(userId) {
  let cart = await get('SELECT id FROM carts WHERE user_id = ? AND status = ?', [userId, 'active']);
  if (!cart) {
    const createdAt = new Date().toISOString();
    const result = await run('INSERT INTO carts (user_id, status, created_at) VALUES (?, ?, ?)', [userId, 'active', createdAt]);
    cart = { id: result.lastID };
  }
  return cart.id;
}

app.get('/api/cart', async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated.' });
  try {
    const cartId = await ensureActiveCart(req.user.id);
    const items = await all('SELECT id, product_id, name, price, quantity, variation, image, category, details FROM cart_items WHERE cart_id = ?', [cartId]);
    res.json(items);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Unable to load cart.' });
  }
});

app.post('/api/cart', async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated.' });
  const item = req.body?.item;
  if (!item || !item.id || !item.name || typeof item.quantity !== 'number') {
    return res.status(400).json({ message: 'Invalid cart item payload.' });
  }

  try {
    const cartId = await ensureActiveCart(req.user.id);
    const existing = await get('SELECT id, quantity FROM cart_items WHERE cart_id = ? AND product_id = ? AND variation = ?', [cartId, item.product_id || item.id, item.variation || '']);

    if (existing) {
      const newQuantity = existing.quantity + item.quantity;
      await run('UPDATE cart_items SET quantity = ? WHERE id = ?', [newQuantity, existing.id]);
    } else {
      const createdAt = new Date().toISOString();
      await run(
        `INSERT INTO cart_items (cart_id, product_id, name, price, quantity, variation, image, category, details, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [cartId, item.product_id || item.id, item.name, item.price, item.quantity, item.variation || '', item.image || '', item.category || '', item.details || '', createdAt]
      );
    }

    const items = await all('SELECT id, product_id, name, price, quantity, variation, image, category, details FROM cart_items WHERE cart_id = ?', [cartId]);
    res.json(items);
  } catch (error) {
    console.error('Add cart item error:', error);
    res.status(500).json({ message: 'Unable to add to cart.' });
  }
});

app.put('/api/cart', async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated.' });
  const item = req.body?.item;
  if (!item || !item.id || typeof item.quantity !== 'number') {
    return res.status(400).json({ message: 'Invalid cart item payload.' });
  }

  try {
    const cartId = await ensureActiveCart(req.user.id);
    const existing = await get('SELECT id FROM cart_items WHERE cart_id = ? AND product_id = ? AND variation = ?', [cartId, item.product_id || item.id, item.variation || '']);
    if (!existing) {
      return res.status(404).json({ message: 'Cart item not found.' });
    }

    if (item.quantity <= 0) {
      await run('DELETE FROM cart_items WHERE id = ?', [existing.id]);
    } else {
      await run('UPDATE cart_items SET quantity = ? WHERE id = ?', [item.quantity, existing.id]);
    }

    const items = await all('SELECT id, product_id, name, price, quantity, variation, image, category, details FROM cart_items WHERE cart_id = ?', [cartId]);
    res.json(items);
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({ message: 'Unable to update cart item.' });
  }
});

app.delete('/api/cart/:itemId', async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated.' });
  try {
    const cartId = await ensureActiveCart(req.user.id);
    await run('DELETE FROM cart_items WHERE cart_id = ? AND id = ?', [cartId, req.params.itemId]);
    const items = await all('SELECT id, product_id, name, price, quantity, variation, image, category, details FROM cart_items WHERE cart_id = ?', [cartId]);
    res.json(items);
  } catch (error) {
    console.error('Delete cart item error:', error);
    res.status(500).json({ message: 'Unable to remove item.' });
  }
});

app.post('/api/checkout', async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated.' });
  const { delivery_name, delivery_phone, delivery_address, delivery_city, delivery_province, delivery_postal_code } = req.body || {};

  try {
    const cartId = await ensureActiveCart(req.user.id);
    const items = await all('SELECT * FROM cart_items WHERE cart_id = ?', [cartId]);
    if (!items.length) {
      return res.status(400).json({ message: 'Cart is empty.' });
    }

    const totalAmount = items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
      return sum + price * item.quantity;
    }, 0).toFixed(2);

    const createdAt = new Date().toISOString();
    const orderResult = await run(
      `INSERT INTO orders (user_id, cart_id, delivery_name, delivery_phone, delivery_address, delivery_city, delivery_province, delivery_postal_code, total_amount, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, cartId, delivery_name || req.user.username, delivery_phone || req.user.phone || '', delivery_address || req.user.address || '', delivery_city || req.user.city || '', delivery_province || req.user.province || '', delivery_postal_code || req.user.postal_code || '', `₱ ${totalAmount}`, 'pending', createdAt]
    );

    await Promise.all(items.map(item => {
      return run(
        `INSERT INTO order_items (order_id, product_id, name, price, quantity, variation, image, category, details, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [orderResult.lastID, item.product_id, item.name, item.price, item.quantity, item.variation, item.image, item.category, item.details, createdAt]
      );
    }));

    await run('DELETE FROM cart_items WHERE cart_id = ?', [cartId]);
    await run('UPDATE carts SET status = ? WHERE id = ?', ['completed', cartId]);

    res.json({ message: 'Checkout completed.', orderId: orderResult.lastID, totalAmount: `₱ ${totalAmount}` });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: 'Unable to complete checkout.' });
  }
});

app.listen(PORT, () => {
  console.log(`ArdCom API server running on http://localhost:${PORT}`);
});
