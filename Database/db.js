const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const dbPath = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Unable to open SQLite database:', err);
    process.exit(1);
  }
});

const schema = [
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    city TEXT,
    province TEXT,
    postal_code TEXT,
    created_at TEXT NOT NULL
  )`,

  `CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`,

  `CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id INTEGER NOT NULL,
    product_id TEXT,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    variation TEXT,
    image TEXT,
    category TEXT,
    details TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY(cart_id) REFERENCES carts(id)
  )`,

  `CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    cart_id INTEGER,
    delivery_name TEXT,
    delivery_phone TEXT,
    delivery_address TEXT,
    delivery_city TEXT,
    delivery_province TEXT,
    delivery_postal_code TEXT,
    total_amount TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(cart_id) REFERENCES carts(id)
  )`,

  `CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id TEXT,
    name TEXT NOT NULL,
    price TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    variation TEXT,
    image TEXT,
    category TEXT,
    details TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY(order_id) REFERENCES orders(id)
  )`
];

schema.forEach((sql) => {
  db.run(sql, (err) => {
    if (err) {
      console.error('Error applying schema:', err);
    }
  });
});

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = {
  db,
  run,
  get,
  all,
};
