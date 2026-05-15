/**
 * Shopping Cart Management
 * Handles cart operations including add, remove, update quantity, and checkout
 */

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  async init() {
    await this.loadCart();
    this.renderCart();
    this.attachEventListeners();
  }

  async loadCart() {
    try {
      this.items = await getCart();
    } catch (error) {
      console.warn('Unable to load cart from server, using empty cart.', error);
      this.items = [];
    }
  }

  async addItem(product, quantity = 1, variation = 'Standard') {
    const item = {
      id: product.id || product.name.replace(/\s+/g, '_'),
      product_id: product.id || product.name.replace(/\s+/g, '_'),
      name: product.name,
      price: product.price,
      image: product.image1 || product.image,
      category: product.category || '',
      details: product.details || '',
      quantity,
      variation,
    };

    try {
      this.items = await addCartItem(item);
      this.renderCart();
      showAppNotification('Item added to cart.');
      refreshCartBadge();
    } catch (error) {
      showAppNotification(error.message || 'Unable to add item to cart.', 'error');
    }
  }

  async removeItem(itemId) {
    try {
      this.items = await removeCartItem(itemId);
      this.renderCart();
      refreshCartBadge();
    } catch (error) {
      showAppNotification(error.message || 'Unable to remove item.', 'error');
    }
  }

  async updateQuantity(itemId, quantity) {
    if (quantity <= 0) {
      return this.removeItem(itemId);
    }

    try {
      this.items = await updateCartItem(itemId, quantity);
      this.renderCart();
      refreshCartBadge();
    } catch (error) {
      showAppNotification(error.message || 'Unable to update quantity.', 'error');
    }
  }

  createItemElement(item, index) {
    return `
      <div class="cart-item" data-item-id="${item.id}" data-index="${index}">
        <img src="../${item.image}" alt="${item.name}" class="cart-item-image" />

        <div class="cart-item-details">
          <h3 class="cart-item-name">${item.name}</h3>
          <select class="cart-item-variation" data-item-id="${item.id}">
            <option value="Standard" ${item.variation === 'Standard' ? 'selected' : ''}>Standard</option>
            <option value="Variant 1" ${item.variation === 'Variant 1' ? 'selected' : ''}>Variant 1</option>
            <option value="Variant 2" ${item.variation === 'Variant 2' ? 'selected' : ''}>Variant 2</option>
            <option value="Variant 3" ${item.variation === 'Variant 3' ? 'selected' : ''}>Variant 3</option>
          </select>

          <div class="cart-item-quantity">
            <label class="quantity-label">Quantity:</label>
            <div class="quantity-controls">
              <button class="quantity-btn decrease-qty" data-item-id="${item.id}">−</button>
              <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-item-id="${item.id}" />
              <button class="quantity-btn increase-qty" data-item-id="${item.id}">+</button>
            </div>
          </div>
        </div>

        <div class="cart-item-right">
          <div class="cart-item-price">${item.price}</div>
          <input type="checkbox" class="cart-item-checkbox" data-item-id="${item.id}" />
          <button class="cart-item-delete" data-item-id="${item.id}">Delete</button>
        </div>
      </div>
    `;
  }

  renderCart() {
    const cartItemsList = document.getElementById('cart-items-list');
    const emptyMessage = document.getElementById('empty-cart-message');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (!cartItemsList || !emptyMessage || !checkoutBtn) return;

    if (this.items.length === 0) {
      cartItemsList.style.display = 'none';
      emptyMessage.style.display = 'block';
      checkoutBtn.disabled = true;
      this.updateSummary();
      return;
    }

    cartItemsList.style.display = 'flex';
    emptyMessage.style.display = 'none';
    checkoutBtn.disabled = false;

    cartItemsList.innerHTML = this.items
      .map((item, index) => this.createItemElement(item, index))
      .join('');

    this.attachItemListeners();
    this.updateSummary();
  }

  attachItemListeners() {
    document.querySelectorAll('.cart-item-delete').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const itemId = e.target.dataset.itemId;
        this.removeItem(itemId);
      });
    });

    document.querySelectorAll('.increase-qty').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const itemId = e.target.dataset.itemId;
        const input = document.querySelector(`.quantity-input[data-item-id="${itemId}"]`);
        const newQuantity = parseInt(input.value, 10) + 1;
        this.updateQuantity(itemId, newQuantity);
      });
    });

    document.querySelectorAll('.decrease-qty').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const itemId = e.target.dataset.itemId;
        const input = document.querySelector(`.quantity-input[data-item-id="${itemId}"]`);
        const newQuantity = parseInt(input.value, 10) - 1;
        if (newQuantity > 0) {
          this.updateQuantity(itemId, newQuantity);
        }
      });
    });

    document.querySelectorAll('.quantity-input').forEach((input) => {
      input.addEventListener('change', (e) => {
        const itemId = e.target.dataset.itemId;
        const newQuantity = parseInt(e.target.value, 10) || 1;
        if (newQuantity > 0) {
          this.updateQuantity(itemId, newQuantity);
        }
      });
    });

    document.querySelectorAll('.cart-item-variation').forEach((select) => {
      select.addEventListener('change', async (e) => {
        const itemId = e.target.dataset.itemId;
        const item = this.items.find((i) => i.id === itemId);
        if (!item) return;

        const newVariation = e.target.value;
        if (newVariation === item.variation) return;

        const quantity = item.quantity;
        await this.removeItem(itemId);
        await this.addItem({
          id: item.id,
          product_id: item.product_id || item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          details: item.details,
        }, quantity, newVariation);
      });
    });

    document.querySelectorAll('.cart-item-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', this.updateSelectAllState.bind(this));
    });
  }

  updateSummary() {
    const itemsCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
    const total = this.items.reduce((sum, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
      return sum + price * item.quantity;
    }, 0);

    document.getElementById('items-count').textContent = itemsCount;
    document.getElementById('total-price').textContent = `₱ ${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  }

  updateSelectAllState() {
    const checkboxes = document.querySelectorAll('.cart-item-checkbox');
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    const allChecked = Array.from(checkboxes).every((cb) => cb.checked);
    const someChecked = Array.from(checkboxes).some((cb) => cb.checked);

    selectAllCheckbox.checked = allChecked;
    selectAllCheckbox.indeterminate = someChecked && !allChecked;
  }

  attachEventListeners() {
    const selectAllCheckbox = document.getElementById('select-all-checkbox');
    const deleteSelectedBtn = document.getElementById('delete-selected-btn');
    const applyVoucherBtn = document.getElementById('apply-voucher-btn');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (selectAllCheckbox) {
      selectAllCheckbox.addEventListener('change', (e) => {
        document.querySelectorAll('.cart-item-checkbox').forEach((checkbox) => {
          checkbox.checked = e.target.checked;
        });
      });
    }

    if (deleteSelectedBtn) {
      deleteSelectedBtn.addEventListener('click', () => {
        const selectedCheckboxes = document.querySelectorAll('.cart-item-checkbox:checked');
        selectedCheckboxes.forEach((checkbox) => {
          const itemId = checkbox.dataset.itemId;
          this.removeItem(itemId);
        });
      });
    }

    if (applyVoucherBtn) {
      applyVoucherBtn.addEventListener('click', () => {
        const voucherInput = document.getElementById('platform-vouchers');
        const voucherCode = voucherInput.value.trim();
        if (voucherCode) {
          showAppNotification(`Voucher "${voucherCode}" will be applied at checkout`);
          voucherInput.value = '';
        }
      });
    }

    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', async () => {
        if (this.items.length === 0) return;

        if (!getAuthToken()) {
          showAppNotification('Please log in before checking out.', 'error');
          setTimeout(() => window.location.href = 'Account/login.html', 700);
          return;
        }

        try {
          const user = await getCurrentUser();
          const delivery = {
            delivery_name: user?.username || '',
            delivery_phone: user?.phone || '',
            delivery_address: user?.address || '',
            delivery_city: user?.city || '',
            delivery_province: user?.province || '',
            delivery_postal_code: user?.postal_code || '',
          };

          const result = await checkoutCart(delivery);
          showAppNotification(result.message || 'Checkout completed.');
          await this.loadCart();
          this.renderCart();
          refreshCartBadge();
        } catch (error) {
          showAppNotification(error.message || 'Unable to complete checkout.', 'error');
        }
      });
    }
  }
}

// Initialize shopping cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.shoppingCart = new ShoppingCart();
  window.shoppingCart.init();

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
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});

/**
 * PUBLIC API - Use these functions to interact with the cart from other pages
 */

// Add item to cart from product pages
async function addProductToCart(product, quantity = 1, variation = 'Standard') {
  if (!product || !product.name) {
    console.warn('Invalid product passed to addProductToCart');
    return;
  }

  try {
    await addCartItem({
      id: product.id || product.name.replace(/\s+/g, '_'),
      product_id: product.id || product.name.replace(/\s+/g, '_'),
      name: product.name,
      price: product.price,
      image: product.image1 || product.image,
      category: product.category || '',
      details: product.details || '',
      quantity,
      variation,
    });
    refreshCartBadge();
    showAppNotification('Added to cart.');
  } catch (error) {
    showAppNotification(error.message || 'Could not add item to cart.', 'error');
  }
}

function goToCart() {
  window.location.href = 'Shopping Cart.html';
}

function getCartItems() {
  return window.shoppingCart ? window.shoppingCart.items : [];
}

function getCartTotal() {
  return window.shoppingCart ? window.shoppingCart.items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + price * item.quantity;
  }, 0) : 0;
}
