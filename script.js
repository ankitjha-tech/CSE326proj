(() => {
  "use strict";

  const STORAGE_KEYS = {
    cart: "bitezone_cart_v1",
    orders: "bitezone_orders_v1",
    favourites: "bitezone_favourites_v1",
    user: "bitezone_user_v1"
  };
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80";
  const categories = [
    { name: "Burgers", icon: "🍔" }, { name: "Pizza", icon: "🍕" },
    { name: "Indian Food", icon: "🍛" }, { name: "Biryani", icon: "🍚" },
    { name: "Chinese Food", icon: "🥡" }, { name: "Snacks", icon: "🍟" },
    { name: "Desserts", icon: "🍰" }, { name: "Beverages", icon: "🥤" }
  ];
  const products = [
    { id: "burger-smash", name: "Smash House Burger", description: "Double smash patty, aged cheddar, house sauce.", price: 289, rating: 4.6, category: "Burgers", badge: "Bestseller", featured: true, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=82" },
    { id: "burger-seoul", name: "Seoul Crunch", description: "Korean crispy chicken, slaw, gochujang mayo.", price: 259, rating: 4.8, category: "Burgers", badge: "Fan favourite", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=700&q=82" },
    { id: "burger-garden", name: "Garden Party Burger", description: "Grilled veg patty, avocado, herby yoghurt.", price: 229, rating: 4.7, category: "Burgers", badge: "Veggie", image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=700&q=82" },
    { id: "pizza-margherita", name: "Sunday Margherita", description: "San Marzano tomato, milky mozzarella, basil.", price: 349, rating: 4.5, category: "Pizza", badge: "Wood fired", featured: true, image: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=700&q=82" },
    { id: "pizza-pepperoni", name: "Pepperoni Party", description: "Crispy pepperoni, mozzarella, chilli honey.", price: 429, rating: 4.4, category: "Pizza", badge: "Bestseller", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=700&q=82" },
    { id: "pizza-paneer", name: "Tandoori Paneer Pizza", description: "Smoky paneer, red onion, mint drizzle.", price: 389, rating: 4.5, category: "Pizza", badge: "Spicy", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=82" },
    { id: "indian-butter", name: "Butter Chicken Bowl", description: "Creamy tomato gravy, charred chicken, naan.", price: 329, rating: 4.9, category: "Indian Food", badge: "Comfort food", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=82" },
    { id: "indian-paneer", name: "Paneer Tikka Masala", description: "Tandoor-kissed paneer in a rich masala.", price: 289, rating: 4.2, category: "Indian Food", badge: "Veggie", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=700&q=82" },
    { id: "indian-dosa", name: "Masala Dosa Plate", description: "Crisp golden dosa, potato masala, chutneys.", price: 189, rating: 3.8, category: "Indian Food", badge: "South Indian", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=82" },
    { id: "biryani-dum", name: "Dum Chicken Biryani", description: "Long-grain basmati, slow-cooked dum style.", price: 319, rating: 4.9, category: "Biryani", badge: "Bestseller", featured: true, image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=700&q=82" },
    { id: "biryani-paneer", name: "Paneer Tikka Biryani", description: "Smoky paneer, saffron rice, cooling raita.", price: 279, rating: 4.2, category: "Biryani", badge: "Veggie", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=700&q=82" },
    { id: "biryani-mutton", name: "Hyderabadi Mutton Biryani", description: "Tender mutton, fragrant spices, fried onions.", price: 399, rating: 4.4, category: "Biryani", badge: "Slow cooked", image: "https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=700&q=82" },
    { id: "chinese-noodles", name: "Chilli Garlic Noodles", description: "Wok-tossed noodles with garlic and greens.", price: 219, rating: 4.6, category: "Chinese Food", badge: "Wok tossed", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=82" },
    { id: "chinese-momos", name: "Crispy Chilli Momos", description: "Golden dumplings, tossed in a tangy chilli glaze.", price: 199, rating: 4.5, category: "Chinese Food", badge: "Spicy", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=82" },
    { id: "chinese-rice", name: "Dragon Fried Rice", description: "Smoky wok-fried rice, spring onion, chilli oil.", price: 229, rating: 4.5, category: "Chinese Food", badge: "Wok tossed", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=82" },
    { id: "snacks-fries", name: "Truffle Parmesan Fries", description: "Crispy fries, truffle oil, shaved parmesan.", price: 179, rating: 4.8, category: "Snacks", badge: "Crowd pleaser", featured: true, image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=82" },
    { id: "snacks-samosa", name: "Punjabi Samosa Duo", description: "Flaky pastry, spiced potato, mint chutney.", price: 99, rating: 4.6, category: "Snacks", badge: "Veggie", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=82" },
    { id: "snacks-wings", name: "Smoky BBQ Wings", description: "Sticky, smoky wings with a cool ranch dip.", price: 249, rating: 4.7, category: "Snacks", badge: "Smoky", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=700&q=82" },
    { id: "dessert-choco", name: "Midnight Chocolate Cake", description: "Dark cocoa sponge, whipped ganache, sea salt.", price: 189, rating: 4.8, category: "Desserts", badge: "Sweet tooth", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=82" },
    { id: "dessert-cheesecake", name: "Baked Cheesecake", description: "Silky New York style with berry compote.", price: 219, rating: 4.6, category: "Desserts", badge: "House made", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=700&q=82" },
    { id: "dessert-icecream", name: "Salted Caramel Sundae", description: "Vanilla bean, salted caramel, crunchy praline.", price: 159, rating: 4.7, category: "Desserts", badge: "Chilled", image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=82" },
    { id: "drink-coldbrew", name: "Velvet Cold Brew", description: "Slow-steeped coffee, smooth and ice cold.", price: 149, rating: 4.8, category: "Beverages", badge: "Caffeine fix", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=700&q=82" },
    { id: "drink-lemonade", name: "Mint Lime Cooler", description: "Fresh lime, mint, a little fizz, lots of joy.", price: 99, rating: 4.6, category: "Beverages", badge: "Refreshing", image: "https://images.unsplash.com/photo-1555949366-819808d99159?auto=format&fit=crop&w=700&q=82" },
    { id: "drink-mango", name: "Mango Lassi", description: "Alphonso mango blended with creamy yoghurt.", price: 119, rating: 4.8, category: "Beverages", badge: "Seasonal", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=82" }
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Math.max(0, Math.round(amount)));
  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

  function readStorage(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }
  function writeStorage(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* Keep the page usable when storage is disabled. */ }
  }

  let cart = readStorage(STORAGE_KEYS.cart, []);
  if (!Array.isArray(cart)) cart = [];
  cart = cart.filter((line) => products.some((product) => product.id === line.id) && Number.isFinite(Number(line.qty)) && Number(line.qty) > 0)
    .map((line) => ({ id: line.id, qty: Math.min(99, Math.floor(Number(line.qty))) }));
  let orders = readStorage(STORAGE_KEYS.orders, []);
  if (!Array.isArray(orders)) orders = [];
  let favourites = readStorage(STORAGE_KEYS.favourites, []);
  if (!Array.isArray(favourites)) favourites = [];
  favourites = favourites.filter((id) => products.some((product) => product.id === id));
  let currentUser = readStorage(STORAGE_KEYS.user, null);
  if (currentUser && (typeof currentUser !== "object" || !currentUser.email)) currentUser = null;
  let appliedCoupon = "";
  let activeCategory = "All";
  let searchQuery = "";
  let favouritesOnly = false;
  let authMode = "login";
  let orderInProgress = false;

  const productGrid = $("#productGrid");
  const featuredGrid = $("#featuredGrid");
  const cartDrawer = $("#cartDrawer");
  const drawerBackdrop = $("#drawerBackdrop");
  const checkoutModal = $("#checkoutModal");
  const checkoutBackdrop = $("#checkoutBackdrop");
  const successModal = $("#successModal");
  const successBackdrop = $("#successBackdrop");
  const accountModal = $("#accountModal");
  const accountBackdrop = $("#accountBackdrop");

  function getProduct(id) { return products.find((product) => product.id === id); }
  function cartQuantity() { return cart.reduce((total, line) => total + line.qty, 0); }
  function subtotal() {
    return cart.reduce((total, line) => {
      const product = getProduct(line.id);
      return total + (product ? product.price * line.qty : 0);
    }, 0);
  }
  function deliveryFee() {
    const amount = subtotal();
    return amount === 0 || amount >= 500 ? 0 : 39;
  }
  function couponDiscount() {
    const amount = subtotal();
    if (appliedCoupon === "BITE10") return Math.round(amount * 0.1);
    if (appliedCoupon === "FIRST50" && amount >= 299) return Math.min(50, amount);
    return 0;
  }
  function payableTotal() { return Math.max(0, subtotal() + deliveryFee() - couponDiscount()); }
  function saveCart() { writeStorage(STORAGE_KEYS.cart, cart); }

  function showToast(message, icon = "✓") {
    const region = $("#toastRegion");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span aria-hidden="true">${escapeHTML(icon)}</span><span>${escapeHTML(message)}</span>`;
    region.append(toast);
    window.setTimeout(() => {
      toast.classList.add("fade-out");
      window.setTimeout(() => toast.remove(), 260);
    }, 2800);
  }

  function updateBodyLock() {
    const drawerOpen = cartDrawer.classList.contains("open");
    const modalOpen = $$(".modal.open").length > 0;
    document.body.classList.toggle("drawer-open", drawerOpen);
    document.body.classList.toggle("modal-open", modalOpen);
  }
  function openCart() {
    cartDrawer.classList.add("open");
    drawerBackdrop.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    drawerBackdrop.setAttribute("aria-hidden", "false");
    updateBodyLock();
    $("#closeCartBtn").focus();
  }
  function closeCart() {
    cartDrawer.classList.remove("open");
    drawerBackdrop.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    drawerBackdrop.setAttribute("aria-hidden", "true");
    updateBodyLock();
  }
  function openModal(modal, backdrop) {
    modal.classList.add("open");
    backdrop.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    backdrop.setAttribute("aria-hidden", "false");
    updateBodyLock();
    const focusable = $("input:not([type=radio]), button, a", modal);
    if (focusable) window.setTimeout(() => focusable.focus(), 50);
  }
  function closeModal(modal, backdrop) {
    modal.classList.remove("open");
    backdrop.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    backdrop.setAttribute("aria-hidden", "true");
    updateBodyLock();
  }

  function productCard(product) {
    const isFavourite = favourites.includes(product.id);
    return `<article class="product-card">
      <div class="product-image"><img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" loading="lazy" /><span class="product-badge">${escapeHTML(product.badge)}</span><button class="wish-btn${isFavourite ? " active" : ""}" data-action="favourite" data-id="${product.id}" aria-label="${isFavourite ? "Remove" : "Add"} ${escapeHTML(product.name)} ${isFavourite ? "from" : "to"} favourites" aria-pressed="${isFavourite}">${isFavourite ? "♥" : "♡"}</button></div>
      <div class="product-body"><div class="product-meta"><span class="product-category">${escapeHTML(product.category)}</span><span class="product-rating"><span>★</span> ${product.rating.toFixed(1)}</span></div><h3 class="product-title">${escapeHTML(product.name)}</h3><p class="product-description">${escapeHTML(product.description)}</p><div class="product-bottom"><span class="product-price">${money(product.price)}</span><button class="add-btn" data-action="add" data-id="${product.id}" aria-label="Add ${escapeHTML(product.name)} to cart">+</button></div></div>
    </article>`;
  }

  function renderCategories() {
    $("#categoryGrid").innerHTML = categories.map((category) => `<button class="category-card${activeCategory === category.name ? " active" : ""}" data-category="${escapeHTML(category.name)}"><span class="category-emoji" aria-hidden="true">${category.icon}</span><span>${escapeHTML(category.name)}</span></button>`).join("");
    const filterList = [{ name: "All", icon: "✦" }, ...categories];
    $("#filterChips").innerHTML = filterList.map((category) => `<button class="filter-chip${activeCategory === category.name ? " active" : ""}" data-category="${escapeHTML(category.name)}">${category.icon} ${escapeHTML(category.name)}</button>`).join("");
  }

  function renderMenu() {
    const query = searchQuery.trim().toLowerCase();
    let visible = products.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesQuery = !query || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query);
      const matchesFavourite = !favouritesOnly || favourites.includes(product.id);
      return matchesCategory && matchesQuery && matchesFavourite;
    });
    const sortValue = $("#sortSelect").value;
    if (sortValue === "price-asc") visible.sort((a, b) => a.price - b.price);
    if (sortValue === "price-desc") visible.sort((a, b) => b.price - a.price);
    if (sortValue === "rating") visible.sort((a, b) => b.rating - a.rating || a.price - b.price);
    productGrid.innerHTML = visible.map(productCard).join("");
    $("#resultsLine").textContent = `Showing ${visible.length} of ${products.length} dishes${activeCategory !== "All" ? ` · ${activeCategory}` : ""}${favouritesOnly ? " · favourites" : ""}`;
    $("#menuEmpty").classList.toggle("hidden", visible.length > 0);
    productGrid.classList.toggle("hidden", visible.length === 0);
    $("#wishlistCount").textContent = String(favourites.length);
    $("#wishlistFilter").classList.toggle("active", favouritesOnly);
    $("#wishlistFilter").setAttribute("aria-pressed", String(favouritesOnly));
    renderCategories();
  }

  function renderFeatured() {
    featuredGrid.innerHTML = products.filter((product) => product.featured).map(productCard).join("");
  }

  function renderBill(target) {
    const amount = subtotal();
    const delivery = deliveryFee();
    const discount = couponDiscount();
    const couponIsPending = appliedCoupon === "FIRST50" && amount < 299;
    target.innerHTML = `<div class="bill-row"><span>Subtotal</span><strong>${money(amount)}</strong></div>
      <div class="bill-row"><span>Delivery</span><strong>${delivery === 0 && amount > 0 ? "Free" : money(delivery)}</strong></div>
      ${discount > 0 ? `<div class="bill-row discount-row"><span>Discount${appliedCoupon ? ` · ${escapeHTML(appliedCoupon)}` : ""}</span><strong>−${money(discount)}</strong></div>` : (couponIsPending ? `<div class="bill-row"><span>Discount · FIRST50 (min. ₹299)</span><strong>—</strong></div>` : "")}
      <div class="bill-row total-row"><span>Total to pay</span><strong>${money(payableTotal())}</strong></div>`;
  }

  function renderCart() {
    const itemCount = cartQuantity();
    $("#cartCount").textContent = String(itemCount);
    $("#drawerItemCount").textContent = `(${itemCount})`;
    const itemsNode = $("#cartItems");
    if (!cart.length) {
      itemsNode.innerHTML = `<div class="empty-cart"><div class="empty-cart-art" aria-hidden="true">🍽️</div><h3>Your cart is feeling lonely.</h3><p>Give it something delicious to hold.</p><button class="btn btn-outline" data-action="browse">Explore the menu <span>→</span></button></div>`;
    } else {
      itemsNode.innerHTML = cart.map((line) => {
        const product = getProduct(line.id);
        if (!product) return "";
        return `<article class="cart-line"><img src="${escapeHTML(product.image)}" alt="${escapeHTML(product.name)}" /><div class="cart-line-info"><strong>${escapeHTML(product.name)}</strong><small>${money(product.price)} each</small><div class="cart-line-actions"><button class="qty-btn" data-action="decrease" data-id="${product.id}" aria-label="Decrease ${escapeHTML(product.name)} quantity">−</button><span class="qty-value">${line.qty}</span><button class="qty-btn" data-action="increase" data-id="${product.id}" aria-label="Increase ${escapeHTML(product.name)} quantity">+</button><button class="remove-item" data-action="remove" data-id="${product.id}">Remove</button></div></div><span class="cart-line-price">${money(product.price * line.qty)}</span></article>`;
      }).join("");
    }
    renderBill($("#cartBill"));
    $("#checkoutBtn").disabled = cart.length === 0;
    if (!cart.length && appliedCoupon) {
      appliedCoupon = "";
      $("#couponMessage").textContent = "";
      $("#couponInput").value = "";
      renderBill($("#cartBill"));
    }
  }

  function renderCheckoutSummary() {
    $("#checkoutItems").innerHTML = cart.map((line) => {
      const product = getProduct(line.id);
      return product ? `<div class="checkout-item"><span>${line.qty} × ${escapeHTML(product.name)}</span><strong>${money(product.price * line.qty)}</strong></div>` : "";
    }).join("");
    renderBill($("#checkoutBill"));
  }

  function renderOrders() {
    const list = $("#ordersList");
    if (!orders.length) {
      list.innerHTML = `<div class="orders-empty"><span>✦</span>No orders yet. Your next great meal is one click away.</div>`;
      return;
    }
    const statusNames = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];
    list.innerHTML = [...orders].reverse().map((order) => {
      const date = new Date(order.date);
      const formattedDate = Number.isNaN(date.getTime()) ? "Date unavailable" : new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(date);
      const itemText = Array.isArray(order.items) ? order.items.map((item) => `${Number(item.qty) || 1} × ${escapeHTML(item.name)}`).join(", ") : "Order details";
      const status = statusNames.includes(order.status) ? order.status : "Order Placed";
      return `<article class="order-card"><div><span class="order-id-label">Order ID</span><span class="order-id">${escapeHTML(order.id)}</span><div class="order-date">${escapeHTML(formattedDate)}</div></div><div><span class="order-id-label">Items</span><div class="order-items">${itemText}</div></div><div><span class="order-id-label">Total · ${escapeHTML(order.payment || "Demo")}</span><div class="order-total">${money(Number(order.total) || 0)}</div></div><div><span class="order-status-label">Status</span><span class="status-pill">${escapeHTML(status)}</span></div></article>`;
    }).join("");
  }

  function renderAccountLabel() {
    const label = $("#accountLabel");
    if (!currentUser) label.textContent = "Sign in";
    else label.textContent = `Hi, ${(currentUser.name || currentUser.email.split("@")[0]).split(" ")[0]}`;
  }

  function syncSearch(value) {
    searchQuery = value;
    $("#heroSearch").value = value;
    $("#menuSearch").value = value;
    renderMenu();
  }

  function addToCart(id) {
    const product = getProduct(id);
    if (!product) return;
    const existing = cart.find((line) => line.id === id);
    if (existing) existing.qty = Math.min(99, existing.qty + 1);
    else cart.push({ id, qty: 1 });
    saveCart();
    renderCart();
    showToast(`${product.name} added to your cart`);
  }

  function updateQuantity(id, change) {
    const line = cart.find((item) => item.id === id);
    if (!line) return;
    line.qty += change;
    if (line.qty <= 0) cart = cart.filter((item) => item.id !== id);
    saveCart();
    renderCart();
    if (checkoutModal.classList.contains("open")) renderCheckoutSummary();
  }

  function toggleFavourite(id) {
    const product = getProduct(id);
    if (!product) return;
    if (favourites.includes(id)) {
      favourites = favourites.filter((item) => item !== id);
      showToast(`${product.name} removed from favourites`, "♡");
    } else {
      favourites.push(id);
      showToast(`${product.name} saved to favourites`, "♥");
    }
    writeStorage(STORAGE_KEYS.favourites, favourites);
    renderFeatured();
    renderMenu();
  }

  function setCategory(category) {
    activeCategory = category;
    favouritesOnly = false;
    renderMenu();
    if (category !== "All") {
      document.querySelector("#menu").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function applyCoupon(code) {
    const normalized = code.trim().toUpperCase();
    const message = $("#couponMessage");
    message.classList.remove("error");
    if (!normalized) {
      message.textContent = "Enter a coupon code to apply.";
      message.classList.add("error");
      return;
    }
    if (normalized !== "BITE10" && normalized !== "FIRST50") {
      message.textContent = "That code isn't valid. Try BITE10 or FIRST50.";
      message.classList.add("error");
      return;
    }
    if (!cart.length) {
      message.textContent = "Add something delicious before using a coupon.";
      message.classList.add("error");
      return;
    }
    if (normalized === "FIRST50" && subtotal() < 299) {
      appliedCoupon = "";
      message.textContent = "FIRST50 works on orders of ₹299 or more.";
      message.classList.add("error");
      renderCart();
      return;
    }
    appliedCoupon = normalized;
    message.textContent = normalized === "BITE10" ? "Nice! 10% has been taken off your order." : "Lovely! ₹50 has been taken off your order.";
    $("#couponInput").value = normalized;
    renderCart();
    showToast(`${normalized} applied successfully`);
  }

  function openCheckout() {
    if (!cart.length) {
      showToast("Your cart is empty. Add a favourite first.", "!");
      return;
    }
    $("#checkoutError").textContent = "";
    renderCheckoutSummary();
    openModal(checkoutModal, checkoutBackdrop);
  }

  function createOrder(formData) {
    const id = `BZ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const snapshot = cart.map((line) => {
      const product = getProduct(line.id);
      return { id: line.id, name: product.name, qty: line.qty, price: product.price };
    });
    return {
      id,
      date: new Date().toISOString(),
      items: snapshot,
      subtotal: subtotal(),
      delivery: deliveryFee(),
      discount: couponDiscount(),
      coupon: appliedCoupon,
      total: payableTotal(),
      payment: formData.get("payment"),
      status: "Order Placed",
      customer: {
        name: formData.get("fullName").trim(),
        phone: formData.get("phone").trim(),
        email: formData.get("email").trim(),
        address: formData.get("address").trim(),
        city: formData.get("city").trim(),
        pin: formData.get("pin").trim()
      }
    };
  }

  function finishOrder(order) {
    $("#successOrderId").textContent = order.id;
    $("#successDetails").innerHTML = `<div><strong>${order.items.reduce((sum, item) => sum + item.qty, 0)} items</strong> · ${order.items.map((item) => `${item.qty} × ${escapeHTML(item.name)}`).join(", ")}</div><div>Delivering to <strong>${escapeHTML(order.customer.city)} · ${escapeHTML(order.customer.pin)}</strong></div><div>Payment <strong>${escapeHTML(order.payment)}</strong> · Total <strong>${money(order.total)}</strong></div>`;
    openModal(successModal, successBackdrop);
  }

  function onCheckoutSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (orderInProgress) return;
    if (!cart.length) {
      $("#checkoutError").textContent = "Your cart is empty. Add a dish before checking out.";
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      $("#checkoutError").textContent = "Please check the required details and try again.";
      return;
    }
    const phone = form.elements.namedItem("phone").value.replace(/\D/g, "");
    if (phone.length < 10 || phone.length > 15) {
      $("#checkoutError").textContent = "Enter a valid mobile number with at least 10 digits.";
      form.elements.namedItem("phone").focus();
      return;
    }
    if (!/^\d{6}$/.test(form.elements.namedItem("pin").value.trim())) {
      $("#checkoutError").textContent = "Enter a valid 6-digit PIN code.";
      form.elements.namedItem("pin").focus();
      return;
    }

    orderInProgress = true;
    $("#checkoutError").textContent = "";
    $("#placeOrderBtn").disabled = true;
    const order = createOrder(new FormData(form));
    $("#loadingOverlay").classList.add("open");
    $("#loadingOverlay").setAttribute("aria-hidden", "false");
    window.setTimeout(() => {
      orders.push(order);
      writeStorage(STORAGE_KEYS.orders, orders);
      cart = [];
      appliedCoupon = "";
      saveCart();
      $("#couponInput").value = "";
      $("#couponMessage").textContent = "";
      renderCart();
      renderOrders();
      closeModal(checkoutModal, checkoutBackdrop);
      $("#loadingOverlay").classList.remove("open");
      $("#loadingOverlay").setAttribute("aria-hidden", "true");
      $("#checkoutForm").reset();
      $("#placeOrderBtn").disabled = false;
      orderInProgress = false;
      finishOrder(order);
    }, 1100);
  }

  function setAuthMode(mode) {
    authMode = mode;
    $$(".auth-tab").forEach((tab) => {
      const active = tab.dataset.authTab === mode;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    const nameField = $("#accountNameField");
    const nameInput = nameField.querySelector("input");
    nameField.classList.toggle("hidden", mode !== "signup");
    nameInput.required = mode === "signup";
    $("#accountTitle").innerHTML = mode === "signup" ? "Make yourself <em>at home.</em>" : "Good food starts <em>here.</em>";
    $("#accountSubmit").innerHTML = `${mode === "signup" ? "Create my account" : "Sign in"} <span>→</span>`;
    $("#accountError").textContent = "";
  }

  function handleAccountSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      $("#accountError").textContent = "Please enter a valid email and a password of at least 6 characters.";
      return;
    }
    const email = form.elements.namedItem("email").value.trim().toLowerCase();
    const typedName = form.elements.namedItem("name").value.trim();
    const wasSignup = authMode === "signup";
    const name = authMode === "signup" ? typedName : typedName || email.split("@")[0];
    currentUser = { name, email };
    writeStorage(STORAGE_KEYS.user, currentUser);
    renderAccountLabel();
    closeModal(accountModal, accountBackdrop);
    form.reset();
    setAuthMode("login");
    showToast(wasSignup ? `Welcome to Bitezone, ${name.split(" ")[0]}!` : `Welcome back, ${name.split(" ")[0]}!`);
  }

  function handleCardAction(event) {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const { action, id } = button.dataset;
    if (action === "add") addToCart(id);
    if (action === "favourite") toggleFavourite(id);
    if (action === "increase") updateQuantity(id, 1);
    if (action === "decrease") updateQuantity(id, -1);
    if (action === "remove") {
      const product = getProduct(id);
      cart = cart.filter((line) => line.id !== id);
      saveCart();
      renderCart();
      if (checkoutModal.classList.contains("open")) renderCheckoutSummary();
      if (product) showToast(`${product.name} removed from your cart`, "−");
    }
    if (action === "browse") {
      closeCart();
      $("#menu").scrollIntoView({ behavior: "smooth" });
    }
  }

  function closeSuccessAndCart(scrollToOrders) {
    closeModal(successModal, successBackdrop);
    closeCart();
    if (scrollToOrders) $("#orders").scrollIntoView({ behavior: "smooth" });
  }

  function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(value);
    return new Promise((resolve, reject) => {
      const helper = document.createElement("textarea");
      helper.value = value;
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.append(helper);
      helper.select();
      const copied = document.execCommand("copy");
      helper.remove();
      copied ? resolve() : reject(new Error("Copy failed"));
    });
  }

  function installEvents() {
    $("#heroSearch").addEventListener("input", (event) => syncSearch(event.target.value));
    $("#menuSearch").addEventListener("input", (event) => syncSearch(event.target.value));
    $("#heroSearchForm").addEventListener("submit", (event) => {
      event.preventDefault();
      syncSearch($("#heroSearch").value);
      $("#menu").scrollIntoView({ behavior: "smooth" });
    });
    $("#sortSelect").addEventListener("change", renderMenu);
    $("#categoryGrid").addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (button) setCategory(button.dataset.category);
    });
    $("#filterChips").addEventListener("click", (event) => {
      const button = event.target.closest("[data-category]");
      if (button) {
        activeCategory = button.dataset.category;
        favouritesOnly = false;
        renderMenu();
      }
    });
    productGrid.addEventListener("click", handleCardAction);
    featuredGrid.addEventListener("click", handleCardAction);
    $("#wishlistFilter").addEventListener("click", () => {
      favouritesOnly = !favouritesOnly;
      activeCategory = "All";
      renderMenu();
      $("#menu").scrollIntoView({ behavior: "smooth" });
    });
    $("#clearFiltersBtn").addEventListener("click", () => {
      activeCategory = "All";
      favouritesOnly = false;
      syncSearch("");
      $("#sortSelect").value = "recommended";
      renderMenu();
    });

    $("#openCartBtn").addEventListener("click", openCart);
    $("#closeCartBtn").addEventListener("click", closeCart);
    $("#continueShoppingBtn").addEventListener("click", closeCart);
    drawerBackdrop.addEventListener("click", closeCart);
    $("#cartItems").addEventListener("click", handleCardAction);
    $("#checkoutBtn").addEventListener("click", openCheckout);
    $("#couponForm").addEventListener("submit", (event) => {
      event.preventDefault();
      applyCoupon($("#couponInput").value);
    });
    $("#checkoutForm").addEventListener("submit", onCheckoutSubmit);
    $("#checkoutForm").addEventListener("input", () => { $("#checkoutError").textContent = ""; });

    checkoutBackdrop.addEventListener("click", () => closeModal(checkoutModal, checkoutBackdrop));
    accountBackdrop.addEventListener("click", () => closeModal(accountModal, accountBackdrop));
    successBackdrop.addEventListener("click", () => closeSuccessAndCart(false));
    $$("[data-close]").forEach((button) => button.addEventListener("click", () => {
      if (button.dataset.close === "checkout") closeModal(checkoutModal, checkoutBackdrop);
      if (button.dataset.close === "account") closeModal(accountModal, accountBackdrop);
    }));
    $("#successDoneBtn").addEventListener("click", () => closeSuccessAndCart(true));
    $("#viewOrdersLink").addEventListener("click", (event) => {
      event.preventDefault();
      closeSuccessAndCart(true);
    });

    $("#accountBtn").addEventListener("click", () => {
      if (currentUser) {
        currentUser = null;
        writeStorage(STORAGE_KEYS.user, null);
        renderAccountLabel();
        showToast("You have been signed out.");
        return;
      }
      setAuthMode("login");
      openModal(accountModal, accountBackdrop);
    });
    $$(".auth-tab").forEach((tab) => tab.addEventListener("click", () => setAuthMode(tab.dataset.authTab)));
    $("#accountForm").addEventListener("submit", handleAccountSubmit);

    $("#contactForm").addEventListener("submit", (event) => {
      event.preventDefault();
      if (!event.currentTarget.checkValidity()) {
        event.currentTarget.reportValidity();
        return;
      }
      event.currentTarget.reset();
      showToast("Thanks for reaching out. We’ll be in touch soon!");
    });

    $("#copyCouponBtn").addEventListener("click", async (event) => {
      const button = event.currentTarget;
      try {
        await copyText(button.dataset.code);
        $("#copyCouponLabel").textContent = "Copied ✓";
        showToast("FIRST50 copied — use it at checkout.");
      } catch (error) {
        $("#copyCouponLabel").textContent = "Code: FIRST50";
        showToast("Use FIRST50 at checkout for ₹50 off.");
      }
      window.setTimeout(() => { $("#copyCouponLabel").textContent = "Copy code ↗"; }, 2200);
    });

    $("#mobileMenuBtn").addEventListener("click", () => {
      const isOpen = $("#mainNav").classList.toggle("open");
      $("#mobileMenuBtn").setAttribute("aria-expanded", String(isOpen));
      $("#mobileMenuBtn").setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    $$("#mainNav a").forEach((link) => link.addEventListener("click", () => {
      $("#mainNav").classList.remove("open");
      $("#mobileMenuBtn").setAttribute("aria-expanded", "false");
    }));
    $("#backToTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => $("#backToTop").classList.toggle("visible", window.scrollY > 500), { passive: true });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (successModal.classList.contains("open")) closeSuccessAndCart(false);
        else if (accountModal.classList.contains("open")) closeModal(accountModal, accountBackdrop);
        else if (checkoutModal.classList.contains("open")) closeModal(checkoutModal, checkoutBackdrop);
        else if (cartDrawer.classList.contains("open")) closeCart();
        $("#mainNav").classList.remove("open");
        $("#mobileMenuBtn").setAttribute("aria-expanded", "false");
      }
      if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        event.preventDefault();
        $("#menuSearch").focus();
      }
    });
    document.addEventListener("error", (event) => {
      const image = event.target;
      if (image instanceof HTMLImageElement && !image.dataset.fallbackApplied) {
        image.dataset.fallbackApplied = "true";
        image.src = FALLBACK_IMAGE;
      }
    }, true);
  }

  function init() {
    $("#currentYear").textContent = String(new Date().getFullYear());
    $("#couponMessage").textContent = "";
    renderCategories();
    renderFeatured();
    renderMenu();
    renderCart();
    renderOrders();
    renderAccountLabel();
    installEvents();
  }

  init();
})();
