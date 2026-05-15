const API_BASE = '/api';
const AUTH_TOKEN_KEY = 'ardcom_auth_token';
const GUEST_CART_KEY = 'ardcom_guest_cart';

function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

function setAuthToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

function clearAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

function apiRequest(path, options = {}) {
  const headers = options.headers || {};
  headers['Content-Type'] = 'application/json';
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  }).then(async (response) => {
    const result = await response.json().catch(() => null);
    if (!response.ok) {
      const message = result?.message || 'Request failed';
      throw new Error(message);
    }
    return result;
  });
}

async function signupUser(data) {
  return apiRequest('/signup', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async function loginUser(data) {
  return apiRequest('/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

async function getCurrentUser() {
  if (!getAuthToken()) {
    return null;
  }
  return apiRequest('/user', { method: 'GET' });
}

async function updateUserProfile(data) {
  return apiRequest('/user/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

async function getCart() {
  if (!getAuthToken()) {
    const guestCart = localStorage.getItem(GUEST_CART_KEY);
    return guestCart ? JSON.parse(guestCart) : [];
  }
  return apiRequest('/cart', { method: 'GET' });
}

async function addCartItem(item) {
  if (!getAuthToken()) {
    const itemId = `${item.product_id || item.id}_${item.variation || 'Standard'}`.replace(/\s+/g, '_');
    const currentCart = await getCart();
    const existingIndex = currentCart.findIndex(
      (cartItem) => cartItem.id === itemId
    );

    const payload = {
      ...item,
      id: itemId,
      product_id: item.product_id || item.id,
    };

    if (existingIndex >= 0) {
      currentCart[existingIndex].quantity += item.quantity;
      currentCart[existingIndex] = { ...currentCart[existingIndex], ...payload };
    } else {
      currentCart.push(payload);
    }

    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(currentCart));
    return currentCart;
  }

  return apiRequest('/cart', {
    method: 'POST',
    body: JSON.stringify({ item }),
  });
}

async function removeCartItem(itemId) {
  if (!getAuthToken()) {
    const cart = (await getCart()).filter((item) => item.id !== itemId);
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
    return cart;
  }
  return apiRequest(`/cart/${encodeURIComponent(itemId)}`, { method: 'DELETE' });
}

async function updateCartItem(itemId, quantity) {
  if (!getAuthToken()) {
    const cart = await getCart();
    const updated = cart.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: Math.max(0, quantity) };
      }
      return item;
    }).filter((item) => item.quantity > 0);
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(updated));
    return updated;
  }
  return apiRequest('/cart', {
    method: 'PUT',
    body: JSON.stringify({ item: { id: itemId, quantity } }),
  });
}

async function checkoutCart(data) {
  if (!getAuthToken()) {
    throw new Error('Please log in before checkout.');
  }
  return apiRequest('/checkout', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

function getCartCount(items = []) {
  return items.reduce((count, item) => count + (item.quantity || 0), 0);
}

window.getAuthToken = getAuthToken;
window.setAuthToken = setAuthToken;
window.clearAuthToken = clearAuthToken;
window.signupUser = signupUser;
window.loginUser = loginUser;
window.getCurrentUser = getCurrentUser;
window.updateUserProfile = updateUserProfile;
window.getCart = getCart;
window.addCartItem = addCartItem;
window.removeCartItem = removeCartItem;
window.updateCartItem = updateCartItem;
window.checkoutCart = checkoutCart;
window.getCartCount = getCartCount;
