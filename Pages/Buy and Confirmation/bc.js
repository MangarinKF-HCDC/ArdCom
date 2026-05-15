// Buy and Confirmation Page JavaScript

// Store current order data
let currentOrder = {
    items: [],
    deliveryAddress: {
        name: "Juan Dela Cruz",
        phone: "09008184444",
        address: "Ang address namin na mataas, Building Namin, Syudad ng babaw, Davao del Sur, Mindanao, Pilipinas, 8000"
    },
    shippingMethod: "standard",
    shippingCost: 0,
    paymentMethod: null,
    referenceNumber: null
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadOrderData();
    populateItemsTable();
    updateOrderTotal();
});

// Load order data from cart manager
function loadOrderData() {
    // Check if there are checkout items (from shopping cart)
    const checkoutItemsStr = localStorage.getItem('checkoutItems');
    
    if (checkoutItemsStr) {
        try {
            const checkoutItems = JSON.parse(checkoutItemsStr);
            currentOrder.items = checkoutItems.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                variation: item.variation || 'Standard',
                quantity: item.quantity
            }));
        } catch (e) {
            console.error('Error parsing checkout items:', e);
            currentOrder.items = getMockCartItems();
        }
    } else if (typeof cartManager !== 'undefined') {
        // Fallback to cart manager if available
        currentOrder.items = cartManager.getItems().map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            variation: item.variation || 'Standard',
            quantity: item.quantity
        }));
    } else {
        // Final fallback to mock data
        currentOrder.items = getMockCartItems();
    }
    
    // Load saved delivery address if available
    const savedAddress = localStorage.getItem('deliveryAddress');
    if (savedAddress) {
        try {
            currentOrder.deliveryAddress = JSON.parse(savedAddress);
            updateDeliveryAddressDisplay();
        } catch (e) {
            console.error('Error parsing address data:', e);
        }
    }
}

// Mock cart items for testing
function getMockCartItems() {
    return [
        {
            id: 1,
            name: "Inplay Gaming Headset",
            variation: "Black",
            image: "../../Source Image/Shop/PC Accessories/Inplay Gaming Headset/headset.jpg",
            price: 1299.00,
            quantity: 2
        },
        {
            id: 2,
            name: "Corsair LL120 RGB",
            variation: "Triple Pack",
            image: "../../Source Image/Shop/Computer Fan/Corsair LL120 RGB/fan.jpg",
            price: 4999.00,
            quantity: 1
        }
    ];
}

// Populate items table
function populateItemsTable() {
    const tableBody = document.getElementById('itemsTableBody');
    
    if (!tableBody) return; // Not on buying page
    
    tableBody.innerHTML = '';
    let totalItems = 0;
    let totalPrice = 0;
    
    currentOrder.items.forEach(item => {
        const row = document.createElement('tr');
        const itemTotal = item.price * item.quantity;
        
        row.innerHTML = `
            <td>
                <div class="product-row">
                    <img src="../../${item.image}" alt="${item.name}" class="product-image">
                    <div class="product-info">
                        <div class="product-name">${item.name}</div>
                        <div class="product-variation">${item.variation || 'Standard'}</div>
                    </div>
                </div>
            </td>
            <td class="price">₱ ${item.price.toFixed(2)}</td>
            <td>${item.quantity}</td>
            <td class="price">₱ ${itemTotal.toFixed(2)}</td>
        `;
        
        tableBody.appendChild(row);
        totalItems += item.quantity;
        totalPrice += itemTotal;
    });
    
    // Store subtotal for later use
    currentOrder.merchandiseSubtotal = totalPrice;
    
    // Update item count
    const itemCountSpan = document.getElementById('itemCount');
    if (itemCountSpan) {
        itemCountSpan.textContent = totalItems;
    }
    
    // Update total amount display (Order Total section)
    const totalAmountSpan = document.getElementById('totalAmount');
    if (totalAmountSpan) {
        totalAmountSpan.textContent = totalPrice.toFixed(2);
    }
    
    // Update merchandise subtotal display (Payment Summary section)
    const merchandiseSubtotalSpan = document.getElementById('merchandiseSubtotal');
    if (merchandiseSubtotalSpan) {
        merchandiseSubtotalSpan.textContent = totalPrice.toFixed(2);
    }
}

// Update delivery address display
function updateDeliveryAddressDisplay() {
    const nameEl = document.getElementById('customerName');
    const phoneEl = document.getElementById('customerPhone');
    const addressEl = document.getElementById('customerAddress');
    
    if (nameEl) nameEl.textContent = currentOrder.deliveryAddress.name;
    if (phoneEl) phoneEl.textContent = currentOrder.deliveryAddress.phone;
    if (addressEl) addressEl.textContent = currentOrder.deliveryAddress.address;
}

// Edit delivery address
function editDeliveryAddress() {
    const name = prompt('Enter name:', currentOrder.deliveryAddress.name);
    if (name === null) return;
    
    const phone = prompt('Enter phone:', currentOrder.deliveryAddress.phone);
    if (phone === null) return;
    
    const address = prompt('Enter address:', currentOrder.deliveryAddress.address);
    if (address === null) return;
    
    currentOrder.deliveryAddress = { name, phone, address };
    localStorage.setItem('deliveryAddress', JSON.stringify(currentOrder.deliveryAddress));
    updateDeliveryAddressDisplay();
}

// Handle shipping method change
function updateShippingCost() {
    const shippingSelect = document.getElementById('shippingOptions');
    if (!shippingSelect) return;
    
    const method = shippingSelect.value;
    let cost = 0;
    
    switch(method) {
        case 'express':
            cost = 250;
            break;
        case 'overnight':
            cost = 500;
            break;
        default:
            cost = 0;
    }
    
    currentOrder.shippingMethod = method;
    currentOrder.shippingCost = cost;
    
    // Update shipping cost display
    const shippingSubtotalSpan = document.getElementById('shippingSubtotal');
    if (shippingSubtotalSpan) {
        shippingSubtotalSpan.textContent = cost.toFixed(2);
    }
}

// Update order total
function updateOrderTotal() {
    updateShippingCost();
    
    const merchandiseSubtotal = currentOrder.merchandiseSubtotal || 0;
    const shippingSubtotal = currentOrder.shippingCost || 0;
    const voucherSubtotal = 0; // Can be implemented later
    
    const totalPayment = merchandiseSubtotal + shippingSubtotal - voucherSubtotal;
    
    const totalPaymentSpan = document.getElementById('totalPayment');
    if (totalPaymentSpan) {
        totalPaymentSpan.textContent = totalPayment.toFixed(2);
    }
}

// Select payment method
function selectPayment(method, button) {
    currentOrder.paymentMethod = method;
    
    // Remove active class from all buttons
    const buttons = document.querySelectorAll('.payment-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    if (button) {
        button.classList.add('active');
    } else if (event && event.target) {
        event.target.classList.add('active');
    }
}

// Generate reference number
function generateReferenceNumber() {
    const prefix = 'PHI';
    // Generate random 10-digit number
    let randomNumbers = '';
    for (let i = 0; i < 10; i++) {
        randomNumbers += Math.floor(Math.random() * 10);
    }
    return prefix + randomNumbers;
}

// Place order
function placeOrder() {
    // Validate payment method
    if (!currentOrder.paymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    // Validate items
    if (currentOrder.items.length === 0) {
        alert('No items in order');
        return;
    }
    
    // Generate reference number
    currentOrder.referenceNumber = generateReferenceNumber();
    
    // Save order to localStorage
    localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
    
    // Clear all cart data
    localStorage.removeItem('cart');
    localStorage.removeItem('ardcom_cart');
    localStorage.removeItem('checkoutItems');
    sessionStorage.removeItem('cart');
    
    // Redirect to confirmation page
    window.location.href = 'buy-confirmation.html';
}

// Display confirmation details
function displayConfirmation() {
    const referenceNumberEl = document.getElementById('referenceNumber');
    
    // Load order data
    const orderData = localStorage.getItem('currentOrder');
    if (orderData) {
        try {
            const order = JSON.parse(orderData);
            if (referenceNumberEl && order.referenceNumber) {
                referenceNumberEl.textContent = order.referenceNumber;
            }
        } catch (e) {
            console.error('Error loading order data:', e);
        }
    }
}

// Back to main menu
function backToMainMenu() {
    window.location.href = '../../index.html';
}

// Initialize confirmation page if on that page
if (document.title.includes('Confirmation')) {
    document.addEventListener('DOMContentLoaded', displayConfirmation);
}
