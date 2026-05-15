function showAppNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `app-notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 18px;
    right: 18px;
    background: ${type === 'success' ? '#4caf50' : '#e53935'};
    color: #fff;
    padding: 14px 18px;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.18);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.25s ease;
  `;

  document.body.appendChild(notification);
  requestAnimationFrame(() => {
    notification.style.opacity = '1';
  });

  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 250);
  }, 2500);
}

async function refreshCartBadge() {
  const buttons = document.querySelectorAll('.header-action-button[aria-label*="Shopping cart"]');
  const items = await getCart().catch(() => []);
  const count = getCartCount(items);

  buttons.forEach((button) => {
    let badge = button.querySelector('.cart-count-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'cart-count-badge';
      badge.style.cssText = 'position:absolute;top:4px;right:4px;min-width:20px;height:20px;font-size:12px;padding:0 6px;border-radius:999px;background:#ff3b30;color:#fff;display:flex;align-items:center;justify-content:center;';
      button.style.position = 'relative';
      button.appendChild(badge);
    }
    badge.textContent = count > 0 ? count : '';
    badge.style.display = count > 0 ? 'flex' : 'none';
  });
}

async function refreshUserState() {
  const user = await getCurrentUser().catch(() => null);
  window.currentUser = user;
}

async function handleAddToCartClick(event) {
  const button = event.target.closest('.add-to-cart-btn');
  if (!button) return;
  event.preventDefault();
  event.stopPropagation();

  let productName = button.dataset.productName;
  let quantity = 1;
  let variation = button.dataset.productVariation || 'Standard';

  if (!productName) {
    const detailName = document.getElementById('productName');
    if (detailName) productName = detailName.textContent.trim();
  }

  if (!productName) {
    showAppNotification('Unable to find product details.', 'error');
    return;
  }

  const product = window.allProducts?.find((item) => item.name === productName);
  if (!product) {
    showAppNotification('Product not found.', 'error');
    return;
  }

  const qtyInput = button.closest('.product-detail-buttons')?.querySelector('#quantityInput') || document.querySelector('.quantity-input');
  if (qtyInput) {
    quantity = parseInt(qtyInput.value, 10) || 1;
  }

  try {
    await addCartItem({
      id: product.name.replace(/\s+/g, '_'),
      product_id: product.name.replace(/\s+/g, '_'),
      name: product.name,
      price: product.price,
      image: product.image1,
      category: product.category,
      details: product.details,
      quantity,
      variation,
    });
    await refreshCartBadge();
    showAppNotification('Added to cart.');
  } catch (error) {
    showAppNotification(error.message || 'Could not add item to cart.', 'error');
  }
}

function bindAddToCartButtons() {
  document.body.addEventListener('click', (event) => {
    if (event.target.closest('.add-to-cart-btn')) {
      handleAddToCartClick(event);
    }
  });
}

function initSharedApp() {
  refreshUserState();
  refreshCartBadge();
  bindAddToCartButtons();
}

window.showAppNotification = showAppNotification;
window.initSharedApp = initSharedApp;

document.addEventListener('DOMContentLoaded', () => {
  initSharedApp();
});
