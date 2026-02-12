// ============================================
// HILAL BAKERS - BAKERY & RESTAURANT
// ============================================

const BUSINESS = {
    name: 'Hilal Bakers & Family Restaurant',
    address: 'Chandgam, Pulwama, Jammu & Kashmir - 192301',
    phone: '+919018881213',
    whatsappLink: 'https://wa.me/919018881213'
};

const menuItems = [
    // BAKERY ITEMS
    { id: 1, category: 'Bakery', name: 'Fresh Cream Pastry', price: 80, desc: 'Soft sponge with fresh cream' },
    { id: 2, category: 'Bakery', name: 'Croissant (Plain)', price: 60, desc: 'Butter croissant, flaky layers' },
    { id: 3, category: 'Bakery', name: 'Chocolate Eclair', price: 90, desc: 'Filled with chocolate cream' },
    { id: 4, category: 'Bakery', name: 'Danish Pastry', price: 75, desc: 'Sweet fruit-filled pastry' },
    
    // BREADS
    { id: 5, category: 'Breads', name: 'White Bread (Loaf)', price: 80, desc: 'Soft, fresh white bread' },
    { id: 6, category: 'Breads', name: 'Whole Wheat Bread', price: 100, desc: 'Nutritious whole grain loaf' },
    { id: 7, category: 'Breads', name: 'Multigrain Bread', price: 120, desc: 'Healthy mix of grains' },
    
    // CAKES
    { id: 8, category: 'Cakes', name: 'Chocolate Cake (500g)', price: 350, desc: 'Rich chocolate eggless cake' },
    { id: 9, category: 'Cakes', name: 'Vanilla Cake (500g)', price: 300, desc: 'Classic vanilla eggless cake' },
    { id: 10, category: 'Cakes', name: 'Black Forest Cake (500g)', price: 450, desc: 'Premium fruit cake' },
    { id: 11, category: 'Cakes', name: 'Carrot Cake (500g)', price: 380, desc: 'Moist carrot cake with cream' },
    
    // SWEETS
    { id: 12, category: 'Sweets', name: 'Gulab Jamun (1kg)', price: 280, desc: 'Traditional syrup-soaked sweets' },
    { id: 13, category: 'Sweets', name: 'Kheer (500g)', price: 180, desc: 'Creamy rice pudding' },
    { id: 14, category: 'Sweets', name: 'Laddu Mix (500g)', price: 200, desc: 'Assorted traditional laddu' },
    
    // BEVERAGES
    { id: 15, category: 'Beverages', name: 'Kashmiri Kahwa', price: 80, desc: 'Traditional spiced tea' },
    { id: 16, category: 'Beverages', name: 'Hot Coffee', price: 100, desc: 'Freshly brewed premium coffee' },
    { id: 17, category: 'Beverages', name: 'Cappuccino', price: 120, desc: 'Espresso with milk foam' },
    
    // MEALS
    { id: 18, category: 'Meals', name: 'Paneer Butter Masala + Rice', price: 280, desc: 'Creamy paneer in tomato gravy' },
    { id: 19, category: 'Meals', name: 'Veg Biryani', price: 250, desc: 'Aromatic layered rice with veg' },
    { id: 20, category: 'Meals', name: 'Family Thali', price: 320, desc: 'Complete meal: dal, curry, bread, rice' }
];

let cart = new Map();
let activeCategory = 'All';

// ============================================
// DOM ELEMENTS
// ============================================

const categoryChips = document.getElementById('categoryChips');
const menuGrid = document.getElementById('menuGrid');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const closeCartBtn = document.getElementById('closeCartBtn');
const placeOrderBtn = document.getElementById('placeOrderBtn');
const customerName = document.getElementById('customerName');
const customerPhone = document.getElementById('customerPhone');
const customerAddress = document.getElementById('customerAddress');
const floatingWa = document.querySelector('.floating-wa');

// ============================================
// INITIALIZATION
// ============================================

function init() {
    renderCategories();
    renderMenuItems('All');
    attachEventListeners();
}

// ============================================
// CATEGORIES
// ============================================

function renderCategories() {
    const categories = ['All', ...new Set(menuItems.map(item => item.category))];
    categoryChips.innerHTML = '';
    
    categories.forEach(category => {
        const chip = document.createElement('button');
        chip.className = `chip ${category === 'All' ? 'active' : ''}`;
        chip.textContent = category;
        chip.onclick = () => {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            activeCategory = category;
            renderMenuItems(category);
        };
        categoryChips.appendChild(chip);
    });
}

// ============================================
// MENU RENDERING
// ============================================

function renderMenuItems(category) {
    const filtered = category === 'All' 
        ? menuItems 
        : menuItems.filter(item => item.category === category);
    
    menuGrid.innerHTML = '';
    
    filtered.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-item';
        card.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.desc}</p>
            <div class="menu-meta">
                <span class="price">₹${item.price}</span>
                <button onclick="addToCart(${item.id})" class="add-btn">+ Add</button>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

// ============================================
// CART MANAGEMENT
// ============================================

function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;
    
    if (cart.has(itemId)) {
        const cartItem = cart.get(itemId);
        cartItem.quantity += 1;
    } else {
        cart.set(itemId, {
            ...item,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification('Added to cart!');
}

function removeFromCart(itemId) {
    cart.delete(itemId);
    updateCart();
}

function updateQuantity(itemId, quantity) {
    if (quantity <= 0) {
        removeFromCart(itemId);
    } else {
        const cartItem = cart.get(itemId);
        cartItem.quantity = quantity;
        updateCart();
    }
}

function updateCart() {
    let total = 0;
    cartItems.innerHTML = '';
    
    if (cart.size === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #999; padding: 20px;">Cart is empty</p>';
    } else {
        cart.forEach((item, id) => {
            total += item.price * item.quantity;
            
            const row = document.createElement('div');
            row.className = 'cart-row';
            row.innerHTML = `
                <div>
                    <strong>${item.name}</strong>
                    <p style="margin: 5px 0; font-size: 14px; color: #666;">₹${item.price} x ${item.quantity}</p>
                </div>
                <div>
                    <button onclick="updateQuantity(${id}, ${item.quantity - 1})" style="margin-right: 5px;">−</button>
                    <button onclick="updateQuantity(${id}, ${item.quantity + 1})">+</button>
                </div>
                <button onclick="removeFromCart(${id})" style="background: #e74c3c;">Remove</button>
            `;
            cartItems.appendChild(row);
        });
    }
    
    cartTotal.textContent = total;
}

// ============================================
// MODAL MANAGEMENT
// ============================================

function openCart() {
    cartModal.classList.remove('hidden');
    cartModal.classList.add('active');
}

function closeCart() {
    cartModal.classList.add('hidden');
    cartModal.classList.remove('active');
}

// ============================================
// ORDER PLACEMENT
// ============================================

function placeOrder() {
    const name = customerName.value.trim();
    const phone = customerPhone.value.trim();
    const address = customerAddress.value.trim();
    
    if (!name || !phone || !address) {
        showNotification('Please fill all details', 'error');
        return;
    }
    
    if (cart.size === 0) {
        showNotification('Cart is empty', 'error');
        return;
    }
    
    let orderText = `Hi! I want to place an order:\n\n`;
    let total = 0;
    
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        orderText += `${item.name} x${item.quantity} = ₹${subtotal}\n`;
    });
    
    orderText += `\nTotal: ₹${total}\n`;
    orderText += `\nCustomer Name: ${name}\n`;
    orderText += `Phone: ${phone}\n`;
    orderText += `Address: ${address}`;
    
    const whatsappUrl = `https://wa.me/919018881213?text=${encodeURIComponent(orderText)}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear form
    customerName.value = '';
    customerPhone.value = '';
    customerAddress.value = '';
    cart.clear();
    updateCart();
    closeCart();
    showNotification('Redirecting to WhatsApp...');
}

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#27ae60'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        z-index: 2000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// EVENT LISTENERS
// ============================================

function attachEventListeners() {
    closeCartBtn.addEventListener('click', closeCart);
    placeOrderBtn.addEventListener('click', placeOrder);
    
    // Create cart button if needed
    const openCartBtn = document.querySelector('[onclick*="openCart"]');
    if (openCartBtn) {
        openCartBtn.addEventListener('click', openCart);
    }
}

// ============================================
// ANIMATIONS
// ============================================

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

// ============================================
// INITIALIZE ON LOAD
// ============================================

document.addEventListener('DOMContentLoaded', init);
