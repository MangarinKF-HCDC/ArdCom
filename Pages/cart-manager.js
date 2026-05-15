/**
 * Client-side Cart Manager
 * Handles all cart operations using localStorage
 */

const CART_STORAGE_KEY = 'ardcom_cart';

class CartManager {
  constructor() {
    this.cart = this.loadCart();
  }

  // Load cart from localStorage
  loadCart() {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : { items: [], lastUpdated: new Date().toISOString() };
    } catch (e) {
      console.error('Error loading cart:', e);
      return { items: [], lastUpdated: new Date().toISOString() };
    }
  }

  // Save cart to localStorage
  saveCart() {
    try {
      this.cart.lastUpdated = new Date().toISOString();
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
      this.notifyObservers();
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }

  // Add item to cart
  addToCart(product) {
    const existingItem = this.cart.items.find(item => item.name === product.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.items.push({
        id: this.generateId(),
        name: product.name,
        price: this.parsePrice(product.price),
        image: product.image1,
        variation: product.variation || 'Standard',
        quantity: 1,
        selected: true  // Mark as selected by default
      });
    }

    this.saveCart();
    this.showNotification(`${product.name} added to cart!`);
  }

  // Remove item from cart
  removeFromCart(itemId) {
    this.cart.items = this.cart.items.filter(item => item.id !== itemId);
    this.saveCart();
  }

  // Update item quantity
  updateQuantity(itemId, quantity) {
    const item = this.cart.items.find(i => i.id === itemId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart();
    }
  }

  // Clear cart
  clearCart() {
    this.cart.items = [];
    this.saveCart();
  }

  // Get all items
  getItems() {
    return this.cart.items;
  }

  // Get item count
  getItemCount() {
    return this.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Get total price
  getTotalPrice() {
    return this.cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  // Parse price string to number
  parsePrice(priceString) {
    if (typeof priceString === 'number') return priceString;
    return parseFloat(priceString.replace(/[₱,\s]/g, '')) || 0;
  }

  // Generate unique ID
  generateId() {
    return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Show notification
  showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: #4caf50;
      color: white;
      padding: 15px 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(400px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
    `;
    if (!document.querySelector('style[data-cart-animation]')) {
      style.setAttribute('data-cart-animation', 'true');
      document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => notification.remove(), 300);
    }, 2500);
  }

  // Observer pattern for cart updates
  observers = [];

  subscribe(observer) {
    this.observers.push(observer);
  }

  notifyObservers() {
    this.observers.forEach(observer => observer(this.cart));
  }
}

// Global cart instance
const cartManager = new CartManager();

// Quick add to cart function for onclick handlers
function addToCartFromProduct(productName) {
  // Find the product in allProducts array (from script.js)
  if (typeof allProducts === 'undefined') {
    console.error('Products not loaded yet');
    return;
  }

  const product = allProducts.find(p => p.name === productName);
  if (product) {
    cartManager.addToCart(product);
  }
}

// Buy now function - save cart and redirect to buying page
function buyNowProduct(productName) {
  if (typeof allProducts === 'undefined') {
    console.error('Products not loaded yet');
    return;
  }

  const product = allProducts.find(p => p.name === productName);
  if (product) {
    // Clear cart and add only this product
    cartManager.clearCart();
    cartManager.addToCart(product);
    
    // Redirect to buying page
    window.location.href = 'Buy and Confirmation/buying.html';
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { CartManager, cartManager };
}
