diff --git a/app.js b/app.js
index 1833ee369133737bb7a64e7d3996ba590b2664c5..716056887353fbf1d99eafd3b701c97097d515da 100644
--- a/app.js
+++ b/app.js
@@ -1,195 +1,208 @@
-const MAPS_LINK = 'https://maps.app.goo.gl/FxLS9AavZHeaDcCw6';
-const WHATSAPP_NUMBER = '919119600421';
-
-const restaurant = {
-  name: 'Your Restaurant (from Google Maps Link)',
-  tagline: 'Professional dining website with map-integrated discovery',
+const BUSINESS = {
+  name: 'Hilal Bakers & Family Restaurant',
+  address: 'Chandgam, Pulwama, Jammu & Kashmir - 192301',
+  mapsLink: 'https://maps.app.goo.gl/FxLS9AavZHeaDcCw6',
+  mapEmbed:
+    'https://maps.google.com/maps?q=Hilal%20Bakers%20and%20Family%20Restaurant%20Chandgam%20Pulwama&t=&z=15&ie=UTF8&iwloc=&output=embed',
+  whatsappNumber: '919018881213',
+  phones: ['+91 90188 81213', '+91 98583 26566'],
+  instagram: 'https://www.instagram.com/hilalbakers/',
+  facebook: 'https://www.facebook.com/HilalBakerspvtltd/'
 };
 
-const fullMenu = [
-  { id: 1, category: 'Starters', name: 'Crispy Veg Platter', price: 220, desc: 'Crunchy starter mix with house dip.' },
-  { id: 2, category: 'Starters', name: 'Paneer Tikka', price: 280, desc: 'Tandoor-grilled cottage cheese with spices.' },
-  { id: 3, category: 'Main Course', name: 'Paneer Butter Masala', price: 290, desc: 'Creamy tomato gravy with paneer cubes.' },
-  { id: 4, category: 'Main Course', name: 'Dal Tadka', price: 170, desc: 'Yellow lentils tempered with desi tadka.' },
-  { id: 5, category: 'Breads', name: 'Butter Naan', price: 50, desc: 'Soft naan finished with butter.' },
-  { id: 6, category: 'Breads', name: 'Tandoori Roti', price: 20, desc: 'Classic whole wheat tandoori roti.' },
-  { id: 7, category: 'Rice', name: 'Jeera Rice', price: 140, desc: 'Basmati rice tossed with cumin.' },
-  { id: 8, category: 'Rice', name: 'Veg Biryani', price: 240, desc: 'Layered aromatic biryani with vegetables.' },
-  { id: 9, category: 'Beverages', name: 'Masala Chai', price: 30, desc: 'Refreshing ginger masala tea.' },
-  { id: 10, category: 'Dessert', name: 'Gulab Jamun', price: 80, desc: 'Warm syrup-soaked sweet dumplings.' },
+const menuItems = [
+  { id: 1, category: 'Bakery Items', name: 'Fresh Cream Pastry', price: 80, desc: 'Soft sponge with fresh cream and seasonal toppings.' },
+  { id: 2, category: 'Bakery Items', name: 'Eggless Celebration Cake', price: 900, desc: 'Customisable eggless cake for birthdays and events.' },
+  { id: 3, category: 'Main Course', name: 'Paneer Butter Masala', price: 260, desc: 'Classic creamy gravy with soft paneer cubes.' },
+  { id: 4, category: 'Main Course', name: 'Veg Family Thali', price: 320, desc: 'Balanced meal platter with breads, sabzi, dal, and rice.' },
+  { id: 5, category: 'Coffee & Beverages', name: 'Kashmiri Kahwa', price: 70, desc: 'Traditional aromatic saffron-spiced tea.' },
+  { id: 6, category: 'Coffee & Beverages', name: 'Hot Cappuccino', price: 120, desc: 'Rich coffee topped with milk foam.' },
+  { id: 7, category: 'Desserts & Specialty Sweets', name: 'Bakery Special Mix Sweets', price: 240, desc: 'A selection of assorted fresh sweets.' },
+  { id: 8, category: 'Desserts & Specialty Sweets', name: 'Chocolate Brownie Slice', price: 110, desc: 'Fudgy brownie served warm.' },
+  { id: 9, category: 'Seasonal or Custom Orders', name: 'Wedding Dessert Box', price: 650, desc: 'Custom sweet box for gifting and celebrations.' },
+  { id: 10, category: 'Seasonal or Custom Orders', name: 'Festival Sweet Platter', price: 550, desc: 'Seasonal assortment curated for festivals.' }
 ];
 
 const categoryChips = document.getElementById('categoryChips');
 const menuGrid = document.getElementById('menuGrid');
 const cartModal = document.getElementById('cartModal');
 const cartItems = document.getElementById('cartItems');
 const cartTotal = document.getElementById('cartTotal');
 const cartCount = document.getElementById('cartCount');
+const customerName = document.getElementById('customerName');
+const customerPhone = document.getElementById('customerPhone');
+const customerAddress = document.getElementById('customerAddress');
 
 const cart = new Map();
 let activeCategory = 'All';
 
-function bindRestaurantData() {
-  document.getElementById('restaurantName').textContent = restaurant.name;
-  document.getElementById('heroTitle').textContent = restaurant.name;
-  document.getElementById('heroDesc').textContent = restaurant.tagline;
+function configureBusinessLinks() {
+  const waBase = `https://wa.me/${BUSINESS.whatsappNumber}`;
 
-  const mapButtons = ['mapsBtnTop', 'mapsBtnMiddle', 'mapsBtnBottom', 'shareMapBtn'];
-  mapButtons.forEach((id) => {
-    const btn = document.getElementById(id);
-    if (btn) btn.href = MAPS_LINK;
-  });
+  document.getElementById('heroOrderBtn').href = waBase;
+  document.getElementById('waContactBtn').href = waBase;
+  document.getElementById('floatingWhatsApp').href = waBase;
+  document.getElementById('footerWaBtn').href = waBase;
+
+  document.getElementById('mapsBtn').href = BUSINESS.mapsLink;
+  document.getElementById('footerMapBtn').href = BUSINESS.mapsLink;
 
-  document.getElementById('mapFrame').src = 'https://maps.google.com/maps?q=restaurant&t=&z=13&ie=UTF8&iwloc=&output=embed';
+  document.getElementById('instagramBtn').href = BUSINESS.instagram;
+  document.getElementById('facebookBtn').href = BUSINESS.facebook;
 
-  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}`;
-  document.getElementById('floatingWhatsApp').href = waUrl;
-  document.getElementById('whatsappChatBtn').href = waUrl;
+  const mapFrame = document.getElementById('mapFrame');
+  mapFrame.src = BUSINESS.mapEmbed;
+
+  document.getElementById('customCakeBtn').href = `${waBase}?text=${encodeURIComponent('Hi, I want to order a custom cake from Hilal Bakers.')}`;
+  document.getElementById('seasonalOfferBtn').href = `${waBase}?text=${encodeURIComponent('Hi, please share today\'s seasonal offers and combos.')}`;
 }
 
 function renderCategoryChips() {
-  const categories = ['All', ...new Set(fullMenu.map((item) => item.category))];
+  const categories = ['All', ...new Set(menuItems.map((item) => item.category))];
   categoryChips.innerHTML = categories
-    .map(
-      (category) =>
-        `<button class="chip ${category === activeCategory ? 'active' : ''}" onclick="setCategory('${category}')">${category}</button>`
-    )
+    .map((category) => `<button class="chip ${category === activeCategory ? 'active' : ''}" onclick="setCategory('${category.replace(/'/g, "&#39;")}')">${category}</button>`)
     .join('');
 }
 
-function filteredMenu() {
-  if (activeCategory === 'All') return fullMenu;
-  return fullMenu.filter((item) => item.category === activeCategory);
+function getFilteredItems() {
+  return activeCategory === 'All' ? menuItems : menuItems.filter((item) => item.category === activeCategory);
 }
 
 function renderMenu() {
-  const items = filteredMenu();
-  menuGrid.innerHTML = items
+  menuGrid.innerHTML = getFilteredItems()
     .map(
       (item) => `
-      <article class="menu-item">
-        <small>${item.category}</small>
-        <h3>${item.name}</h3>
-        <p>${item.desc}</p>
-        <div class="menu-meta">
-          <span class="price">₹${item.price}</span>
-          <button class="btn btn-primary" onclick="addToCart(${item.id})">Add</button>
-        </div>
-      </article>
+        <article class="menu-item">
+          <small>${item.category}</small>
+          <h3>${item.name}</h3>
+          <p>${item.desc}</p>
+          <div class="menu-meta">
+            <span class="price">₹${item.price}</span>
+            <button class="btn btn-primary" onclick="addToCart(${item.id})">Add</button>
+          </div>
+        </article>
       `
     )
     .join('');
 }
 
 function setCategory(category) {
   activeCategory = category;
   renderCategoryChips();
   renderMenu();
 }
 
-function addToCart(id) {
-  const selected = fullMenu.find((item) => item.id === id);
+function addToCart(itemId) {
+  const selected = menuItems.find((item) => item.id === itemId);
   if (!selected) return;
 
-  const existing = cart.get(id);
-  if (existing) existing.qty += 1;
-  else cart.set(id, { ...selected, qty: 1 });
+  const existing = cart.get(itemId);
+  if (existing) {
+    existing.qty += 1;
+  } else {
+    cart.set(itemId, { ...selected, qty: 1 });
+  }
 
   renderCart();
 }
 
-function changeQty(id, delta) {
-  const item = cart.get(id);
+function changeQty(itemId, delta) {
+  const item = cart.get(itemId);
   if (!item) return;
 
   item.qty += delta;
-  if (item.qty <= 0) cart.delete(id);
+  if (item.qty <= 0) cart.delete(itemId);
   renderCart();
 }
 
-function removeItem(id) {
-  cart.delete(id);
+function removeItem(itemId) {
+  cart.delete(itemId);
   renderCart();
 }
 
 function renderCart() {
   const items = [...cart.values()];
   cartCount.textContent = String(items.reduce((sum, item) => sum + item.qty, 0));
 
   if (!items.length) {
-    cartItems.innerHTML = '<p>Your cart is empty. Add dishes from the menu.</p>';
+    cartItems.innerHTML = '<p>Your cart is empty. Add menu items to continue.</p>';
     cartTotal.textContent = '0';
     return;
   }
 
   cartItems.innerHTML = items
     .map(
       (item) => `
       <div class="cart-row">
-        <div><strong>${item.name}</strong><br /><small>₹${item.price} each</small></div>
+        <div>
+          <strong>${item.name}</strong><br />
+          <small>₹${item.price} each</small>
+        </div>
         <div class="qty-controls">
           <button onclick="changeQty(${item.id}, -1)">−</button>
           <strong>${item.qty}</strong>
           <button onclick="changeQty(${item.id}, 1)">+</button>
         </div>
         <strong>₹${item.qty * item.price}</strong>
         <button onclick="removeItem(${item.id})">🗑️</button>
       </div>
       `
     )
     .join('');
 
   cartTotal.textContent = String(items.reduce((sum, item) => sum + item.qty * item.price, 0));
 }
 
 function placeOrder() {
-  const name = document.getElementById('customerName').value.trim();
-  const phone = document.getElementById('customerPhone').value.trim();
-  const address = document.getElementById('customerAddress').value.trim();
   const items = [...cart.values()];
+  const name = customerName.value.trim();
+  const phone = customerPhone.value.trim();
+  const address = customerAddress.value.trim();
 
   if (!items.length) {
-    alert('Please add items to cart first.');
+    alert('Please add some items to cart first.');
     return;
   }
 
   if (!name || !address) {
-    alert('Please enter your name and location/table details.');
+    alert('Please add your name and table/address details.');
     return;
   }
 
   const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);
-
-  let text = `*NEW ORDER*%0A`;
-  text += `*Restaurant:* ${encodeURIComponent(restaurant.name)}%0A`;
-  text += `*Customer:* ${encodeURIComponent(name)}%0A`;
-  text += `*Location:* ${encodeURIComponent(address)}%0A`;
-  text += `*Phone:* ${encodeURIComponent(phone || 'N/A')}%0A`;
-  text += `--------------------%0A`;
-  text += `*Items:*%0A`;
+  let message = '*NEW ORDER – HILAL BAKERS & FAMILY RESTAURANT*\n';
+  message += '-------------------------------------\n';
+  message += `Customer: ${name}\n`;
+  message += `Phone: ${phone || 'N/A'}\n`;
+  message += `Location/Table: ${address}\n`;
+  message += '-------------------------------------\n';
+  message += 'Items:\n';
 
   items.forEach((item) => {
-    text += `• ${encodeURIComponent(item.name)} x${item.qty} = ₹${item.qty * item.price}%0A`;
+    message += `• ${item.name} x${item.qty} = ₹${item.qty * item.price}\n`;
   });
 
-  text += `--------------------%0A`;
-  text += `*TOTAL:* ₹${total}%0A`;
-  text += `*Google Maps Link:* ${encodeURIComponent(MAPS_LINK)}%0A`;
+  message += '-------------------------------------\n';
+  message += `TOTAL: ₹${total}\n`;
+  message += `Google Maps: ${BUSINESS.mapsLink}`;
 
-  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
+  const encodedMessage = encodeURIComponent(message);
+  window.open(`https://wa.me/${BUSINESS.whatsappNumber}?text=${encodedMessage}`, '_blank');
 }
 
-// Events
-document.getElementById('openCartBtn').addEventListener('click', () => cartModal.classList.remove('hidden'));
-document.getElementById('closeCartBtn').addEventListener('click', () => cartModal.classList.add('hidden'));
-document.getElementById('placeOrderBtn').addEventListener('click', placeOrder);
+function bindEvents() {
+  document.getElementById('openCartBtn').addEventListener('click', () => cartModal.classList.remove('hidden'));
+  document.getElementById('closeCartBtn').addEventListener('click', () => cartModal.classList.add('hidden'));
+  document.getElementById('placeOrderBtn').addEventListener('click', placeOrder);
+}
 
 window.setCategory = setCategory;
 window.addToCart = addToCart;
 window.changeQty = changeQty;
 window.removeItem = removeItem;
 
-bindRestaurantData();
+configureBusinessLinks();
 renderCategoryChips();
 renderMenu();
 renderCart();
+bindEvents();
