/*
  BITEZONE - SIMPLE JAVASCRIPT
  This file is written with basic JavaScript concepts:
  variables, functions, if-else, loops and click events.
*/

// Get elements from the HTML page
var productGrid = document.getElementById("productGrid");
var featuredGrid = document.getElementById("featuredGrid");
var cartDrawer = document.getElementById("cartDrawer");
var cartItems = document.getElementById("cartItems");
var cart = [];
var orders = [];
var favourites = [];
var activeCategory = "All";
var searchText = "";
var showFavourites = false;
var coupon = "";
var currentUser = null;
var loginMode = "login";

// Read food information from the HTML cards
var products = [];
var cards = productGrid.getElementsByClassName("product-card");

for (var i = 0; i < cards.length; i++) {
    cards[i].setAttribute("data-order", i);
    var food = {
        id: cards[i].getAttribute("data-id"),
        name: cards[i].getAttribute("data-name"),
        price: Number(cards[i].getAttribute("data-price")),
        category: cards[i].getAttribute("data-category"),
        image: cards[i].getAttribute("data-image"),
        rating: cards[i].getAttribute("data-rating")
    };
    products.push(food);
}

// Load saved information from the browser
function loadData() {
    if (localStorage.getItem("bitezone_cart_v1") != null) {
        cart = JSON.parse(localStorage.getItem("bitezone_cart_v1"));
    }
    if (localStorage.getItem("bitezone_orders_v1") != null) {
        orders = JSON.parse(localStorage.getItem("bitezone_orders_v1"));
    }
    if (localStorage.getItem("bitezone_favourites_v1") != null) {
        favourites = JSON.parse(localStorage.getItem("bitezone_favourites_v1"));
    }
    if (localStorage.getItem("bitezone_user_v1") != null) {
        currentUser = JSON.parse(localStorage.getItem("bitezone_user_v1"));
    }
}

// Save information in the browser
function saveData() {
    localStorage.setItem("bitezone_cart_v1", JSON.stringify(cart));
    localStorage.setItem("bitezone_orders_v1", JSON.stringify(orders));
    localStorage.setItem("bitezone_favourites_v1", JSON.stringify(favourites));
    localStorage.setItem("bitezone_user_v1", JSON.stringify(currentUser));
}

// Find one food item using its ID
function getFood(id) {
    for (var i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            return products[i];
        }
    }
    return null;
}

// Show a small message on the screen
function showMessage(message) {
    var area = document.getElementById("toastRegion");
    var box = document.createElement("div");
    box.className = "toast";
    box.innerHTML = message;
    area.appendChild(box);

    setTimeout(function () {
        box.classList.add("fade-out");
        setTimeout(function () {
            if (box.parentNode) {
                box.parentNode.removeChild(box);
            }
        }, 300);
    }, 2500);
}

// Show or hide the shopping cart
function openCart() {
    cartDrawer.classList.add("open");
    document.getElementById("drawerBackdrop").classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
    cartDrawer.classList.remove("open");
    document.getElementById("drawerBackdrop").classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
}

// Open and close pop-up windows
function openPopup(popupName, backgroundName) {
    document.getElementById(popupName).classList.add("open");
    document.getElementById(backgroundName).classList.add("open");
    document.getElementById(popupName).setAttribute("aria-hidden", "false");
}

function closePopup(popupName, backgroundName) {
    document.getElementById(popupName).classList.remove("open");
    document.getElementById(backgroundName).classList.remove("open");
    document.getElementById(popupName).setAttribute("aria-hidden", "true");
}

// Find the total number of items in the cart
function getCartCount() {
    var count = 0;
    for (var i = 0; i < cart.length; i++) {
        count = count + cart[i].qty;
    }
    return count;
}

// Find the total price of the cart
function getSubtotal() {
    var total = 0;
    for (var i = 0; i < cart.length; i++) {
        var food = getFood(cart[i].id);
        if (food != null) {
            total = total + food.price * cart[i].qty;
        }
    }
    return total;
}

// Calculate delivery charge
function getDelivery() {
    if (getSubtotal() == 0 || getSubtotal() >= 500) {
        return 0;
    }
    return 39;
}

// Calculate coupon discount
function getDiscount() {
    var total = getSubtotal();
    if (coupon == "BITE10") {
        return Math.round(total * 10 / 100);
    } else if (coupon == "FIRST50" && total >= 299) {
        return 50;
    }
    return 0;
}

// Calculate final amount
function getFinalTotal() {
    return getSubtotal() + getDelivery() - getDiscount();
}

// Display prices in rupees
function money(amount) {
    return "₹" + Math.round(amount);
}

// Show the bill in the cart and checkout
function showBill(elementId) {
    var bill = document.getElementById(elementId);
    var deliveryText = money(getDelivery());
    if (getDelivery() == 0 && getSubtotal() > 0) {
        deliveryText = "Free";
    }

    var billHTML = "<div class='bill-row'><span>Subtotal</span><strong>" + money(getSubtotal()) + "</strong></div>";
    billHTML = billHTML + "<div class='bill-row'><span>Delivery</span><strong>" + deliveryText + "</strong></div>";

    if (getDiscount() > 0) {
        billHTML = billHTML + "<div class='bill-row discount-row'><span>Discount</span><strong>-" + money(getDiscount()) + "</strong></div>";
    }

    billHTML = billHTML + "<div class='bill-row total-row'><span>Total to pay</span><strong>" + money(getFinalTotal()) + "</strong></div>";
    bill.innerHTML = billHTML;
}

// Add one food item to the cart
function addToCart(id) {
    var found = false;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart[i].qty = cart[i].qty + 1;
            found = true;
        }
    }

    if (found == false) {
        cart.push({ id: id, qty: 1 });
    }

    saveData();
    showCart();
    showMessage("Food added to your cart!");
}

// Change the quantity of a food item
function changeQuantity(id, change) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart[i].qty = cart[i].qty + change;
            if (cart[i].qty <= 0) {
                cart.splice(i, 1);
            }
            break;
        }
    }
    saveData();
    showCart();
    showCheckoutBill();
}

// Remove an item from the cart
function removeFromCart(id) {
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
            cart.splice(i, 1);
            break;
        }
    }
    saveData();
    showCart();
    showCheckoutBill();
}

// Display all cart items
function showCart() {
    var html = "";
    var count = getCartCount();

    document.getElementById("cartCount").innerHTML = count;
    document.getElementById("drawerItemCount").innerHTML = "(" + count + ")";

    if (cart.length == 0) {
        html = "<div class='empty-cart'><div class='empty-cart-art'>🍽️</div><h3>Your cart is feeling lonely.</h3><p>Give it something delicious to hold.</p><button class='btn btn-outline' data-action='browse'>Explore the menu</button></div>";
    } else {
        for (var i = 0; i < cart.length; i++) {
            var food = getFood(cart[i].id);
            if (food != null) {
                html = html + "<article class='cart-line'>";
                html = html + "<img src='" + food.image + "' alt='" + food.name + "'>";
                html = html + "<div class='cart-line-info'><strong>" + food.name + "</strong>";
                html = html + "<small>" + money(food.price) + " each</small>";
                html = html + "<div class='cart-line-actions'>";
                html = html + "<button class='qty-btn' data-action='decrease' data-id='" + food.id + "'>-</button>";
                html = html + "<span class='qty-value'>" + cart[i].qty + "</span>";
                html = html + "<button class='qty-btn' data-action='increase' data-id='" + food.id + "'>+</button>";
                html = html + "<button class='remove-item' data-action='remove' data-id='" + food.id + "'>Remove</button>";
                html = html + "</div></div>";
                html = html + "<span class='cart-line-price'>" + money(food.price * cart[i].qty) + "</span></article>";
            }
        }
    }

    cartItems.innerHTML = html;
    showBill("cartBill");

    if (cart.length == 0) {
        document.getElementById("checkoutBtn").disabled = true;
        coupon = "";
        document.getElementById("couponMessage").innerHTML = "";
        document.getElementById("couponInput").value = "";
    } else {
        document.getElementById("checkoutBtn").disabled = false;
    }
}

// Display cart items in the checkout window
function showCheckoutBill() {
    var html = "";
    for (var i = 0; i < cart.length; i++) {
        var food = getFood(cart[i].id);
        if (food != null) {
            html = html + "<div class='checkout-item'><span>" + cart[i].qty + " x " + food.name + "</span><strong>" + money(food.price * cart[i].qty) + "</strong></div>";
        }
    }
    document.getElementById("checkoutItems").innerHTML = html;
    showBill("checkoutBill");
}

// Save a food item as favourite
function changeFavourite(id) {
    var found = false;
    for (var i = 0; i < favourites.length; i++) {
        if (favourites[i] == id) {
            favourites.splice(i, 1);
            found = true;
            break;
        }
    }
    if (found == false) {
        favourites.push(id);
        showMessage("Added to favourites!");
    } else {
        showMessage("Removed from favourites!");
    }
    saveData();
    updateFavouriteButtons();
    filterMenu();
}

// Update heart buttons on all food cards
function updateFavouriteButtons() {
    var buttons = document.getElementsByClassName("wish-btn");
    for (var i = 0; i < buttons.length; i++) {
        var id = buttons[i].getAttribute("data-id");
        var found = false;
        for (var j = 0; j < favourites.length; j++) {
            if (favourites[j] == id) found = true;
        }
        if (found == true) {
            buttons[i].innerHTML = "♥";
            buttons[i].classList.add("active");
        } else {
            buttons[i].innerHTML = "♡";
            buttons[i].classList.remove("active");
        }
    }
    document.getElementById("wishlistCount").innerHTML = favourites.length;
}

// Filter menu by search, category and favourites
function filterMenu() {
    var allCards = productGrid.getElementsByClassName("product-card");
    var visibleCount = 0;
    var query = searchText.toLowerCase();

    for (var i = 0; i < allCards.length; i++) {
        var name = allCards[i].getAttribute("data-name").toLowerCase();
        var description = allCards[i].getAttribute("data-description").toLowerCase();
        var category = allCards[i].getAttribute("data-category");
        var id = allCards[i].getAttribute("data-id");
        var show = true;

        if (activeCategory != "All" && category != activeCategory) show = false;
        if (query != "" && name.indexOf(query) == -1 && description.indexOf(query) == -1 && category.toLowerCase().indexOf(query) == -1) show = false;

        if (showFavourites == true) {
            var isFavourite = false;
            for (var j = 0; j < favourites.length; j++) {
                if (favourites[j] == id) isFavourite = true;
            }
            if (isFavourite == false) show = false;
        }

        if (show == true) {
            allCards[i].style.display = "";
            visibleCount++;
        } else {
            allCards[i].style.display = "none";
        }
    }

    document.getElementById("resultsLine").innerHTML = "Showing " + visibleCount + " of " + allCards.length + " dishes";
    document.getElementById("menuEmpty").classList.toggle("hidden", visibleCount > 0);
    document.getElementById("productGrid").classList.toggle("hidden", visibleCount == 0);
    document.getElementById("wishlistFilter").classList.toggle("active", showFavourites);
    document.getElementById("wishlistFilter").setAttribute("aria-pressed", showFavourites);
    updateCategoryButtons();
}

// Highlight the selected category button
function updateCategoryButtons() {
    var buttons = document.querySelectorAll("[data-category]");
    for (var i = 0; i < buttons.length; i++) {
        if (buttons[i].getAttribute("data-category") == activeCategory) {
            buttons[i].classList.add("active");
        } else {
            buttons[i].classList.remove("active");
        }
    }
}

// Select a category
function chooseCategory(category) {
    activeCategory = category;
    showFavourites = false;
    filterMenu();
}

// Sort food by price or rating
function sortMenu() {
    var sortValue = document.getElementById("sortSelect").value;
    var cards = [];
    var menuCards = productGrid.getElementsByClassName("product-card");

    for (var i = 0; i < menuCards.length; i++) {
        cards.push(menuCards[i]);
    }

    for (var i = 0; i < cards.length; i++) {
        for (var j = i + 1; j < cards.length; j++) {
            var first = Number(cards[i].getAttribute("data-price"));
            var second = Number(cards[j].getAttribute("data-price"));
            var firstRating = Number(cards[i].getAttribute("data-rating"));
            var secondRating = Number(cards[j].getAttribute("data-rating"));
            var swap = false;

            if (sortValue == "price-asc" && first > second) swap = true;
            if (sortValue == "price-desc" && first < second) swap = true;
            if (sortValue == "rating" && firstRating < secondRating) swap = true;
            if (sortValue == "recommended") {
                var firstOrder = Number(cards[i].getAttribute("data-order"));
                var secondOrder = Number(cards[j].getAttribute("data-order"));
                if (firstOrder > secondOrder) swap = true;
            }

            if (swap == true) {
                var temp = cards[i];
                cards[i] = cards[j];
                cards[j] = temp;
            }
        }
    }

    for (var i = 0; i < cards.length; i++) {
        productGrid.appendChild(cards[i]);
    }
    filterMenu();
}

// Apply a coupon code
function applyCoupon() {
    var code = document.getElementById("couponInput").value.toUpperCase();
    var message = document.getElementById("couponMessage");
    message.classList.remove("error");

    if (cart.length == 0) {
        message.innerHTML = "Add food to your cart first.";
        message.classList.add("error");
    } else if (code == "BITE10") {
        coupon = code;
        message.innerHTML = "10% discount applied!";
    } else if (code == "FIRST50" && getSubtotal() >= 299) {
        coupon = code;
        message.innerHTML = "₹50 discount applied!";
    } else {
        coupon = "";
        message.innerHTML = "Invalid code or minimum order not reached.";
        message.classList.add("error");
    }
    showCart();
}

// Display all previous orders
function showOrders() {
    var list = document.getElementById("ordersList");
    var html = "";

    if (orders.length == 0) {
        list.innerHTML = "<div class='orders-empty'><span>✦</span>No orders yet. Your next great meal is one click away.</div>";
        return;
    }

    for (var i = orders.length - 1; i >= 0; i--) {
        var order = orders[i];
        var items = "";
        for (var j = 0; j < order.items.length; j++) {
            items = items + order.items[j].qty + " x " + order.items[j].name + ", ";
        }
        html = html + "<article class='order-card'><div><span class='order-id-label'>Order ID</span><span class='order-id'>" + order.id + "</span><div class='order-date'>" + order.date + "</div></div>";
        html = html + "<div><span class='order-id-label'>Items</span><div class='order-items'>" + items + "</div></div>";
        html = html + "<div><span class='order-id-label'>Total</span><div class='order-total'>" + money(order.total) + "</div></div>";
        html = html + "<div><span class='order-status-label'>Status</span><span class='status-pill'>Order Placed</span></div></article>";
    }
    list.innerHTML = html;
}

// Show the signed-in user's name
function updateAccountName() {
    if (currentUser == null) {
        document.getElementById("accountLabel").innerHTML = "Sign in";
    } else {
        document.getElementById("accountLabel").innerHTML = "Hi, " + currentUser.name;
    }
}

// Change between login and create account
function setLoginMode(mode) {
    loginMode = mode;
    var nameField = document.getElementById("accountNameField");
    var title = document.getElementById("accountTitle");
    var submit = document.getElementById("accountSubmit");
    var tabs = document.getElementsByClassName("auth-tab");

    if (mode == "signup") {
        nameField.classList.remove("hidden");
        title.innerHTML = "Make yourself <em>at home.</em>";
        submit.innerHTML = "Create my account →";
    } else {
        nameField.classList.add("hidden");
        title.innerHTML = "Good food starts <em>here.</em>";
        submit.innerHTML = "Sign in →";
    }

    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
        if (tabs[i].getAttribute("data-auth-tab") == mode) {
            tabs[i].classList.add("active");
        }
    }
    document.getElementById("accountError").innerHTML = "";
}

// Complete login or account creation
function accountSubmit(event) {
    event.preventDefault();
    var form = document.getElementById("accountForm");
    var email = form.elements["email"].value;
    var password = form.elements["password"].value;
    var name = form.elements["name"].value;

    if (email == "" || password.length < 6) {
        document.getElementById("accountError").innerHTML = "Enter a valid email and password with 6 characters.";
        return;
    }
    if (loginMode == "signup" && name.length < 2) {
        document.getElementById("accountError").innerHTML = "Please enter your name.";
        return;
    }

    if (name == "") name = email.split("@")[0];
    currentUser = { name: name, email: email };
    saveData();
    updateAccountName();
    closePopup("accountModal", "accountBackdrop");
    form.reset();
    setLoginMode("login");
    showMessage("Welcome to Bitezone, " + name + "!");
}

// Place an order
function placeOrder(event) {
    event.preventDefault();
    var form = document.getElementById("checkoutForm");
    var phone = form.elements["phone"].value;
    var pin = form.elements["pin"].value;

    if (cart.length == 0) {
        document.getElementById("checkoutError").innerHTML = "Your cart is empty.";
        return;
    }
    if (form.checkValidity() == false) {
        form.reportValidity();
        return;
    }
    if (phone.length < 10 || phone.length > 15 || isNaN(phone)) {
        document.getElementById("checkoutError").innerHTML = "Enter a valid mobile number.";
        return;
    }
    if (pin.length != 6 || isNaN(pin)) {
        document.getElementById("checkoutError").innerHTML = "Enter a valid 6 digit PIN code.";
        return;
    }

    var orderItems = [];
    for (var i = 0; i < cart.length; i++) {
        var food = getFood(cart[i].id);
        orderItems.push({ name: food.name, qty: cart[i].qty, price: food.price });
    }

    var payment = "Cash on Delivery";
    var paymentOptions = form.elements["payment"];
    for (var i = 0; i < paymentOptions.length; i++) {
        if (paymentOptions[i].checked) payment = paymentOptions[i].value;
    }

    var order = {
        id: "BZ-" + new Date().getTime(),
        date: new Date().toLocaleString(),
        items: orderItems,
        total: getFinalTotal(),
        payment: payment,
        status: "Order Placed",
        customer: form.elements["fullName"].value
    };

    document.getElementById("loadingOverlay").classList.add("open");
    document.getElementById("placeOrderBtn").disabled = true;

    setTimeout(function () {
        orders.push(order);
        cart = [];
        coupon = "";
        saveData();
        showCart();
        showOrders();
        closePopup("checkoutModal", "checkoutBackdrop");
        document.getElementById("loadingOverlay").classList.remove("open");
        document.getElementById("placeOrderBtn").disabled = false;
        form.reset();
        document.getElementById("successOrderId").innerHTML = order.id;
        document.getElementById("successDetails").innerHTML = "Your order total is " + money(order.total) + ". Payment: " + order.payment;
        openPopup("successModal", "successBackdrop");
    }, 900);
}

// Click on food cards: add to cart or favourite
function foodButtonClick(event) {
    var button = event.target;
    while (button != null && button.getAttribute("data-action") == null) {
        button = button.parentElement;
    }
    if (button == null) return;
    var action = button.getAttribute("data-action");
    var id = button.getAttribute("data-id");

    if (action == "add") {
        addToCart(id);
    } else if (action == "favourite") {
        changeFavourite(id);
    } else if (action == "increase") {
        changeQuantity(id, 1);
    } else if (action == "decrease") {
        changeQuantity(id, -1);
    } else if (action == "remove") {
        removeFromCart(id);
    } else if (action == "browse") {
        closeCart();
        document.getElementById("menu").scrollIntoView();
    }
}

// Connect buttons and forms with their functions
function startWebsite() {
    loadData();
    document.getElementById("currentYear").innerHTML = new Date().getFullYear();
    showCart();
    showOrders();
    updateAccountName();
    updateFavouriteButtons();
    filterMenu();

    productGrid.onclick = foodButtonClick;
    featuredGrid.onclick = foodButtonClick;
    cartItems.onclick = foodButtonClick;

    document.getElementById("openCartBtn").onclick = openCart;
    document.getElementById("closeCartBtn").onclick = closeCart;
    document.getElementById("continueShoppingBtn").onclick = closeCart;
    document.getElementById("drawerBackdrop").onclick = closeCart;

    document.getElementById("checkoutBtn").onclick = function () {
        if (cart.length > 0) {
            showCheckoutBill();
            openPopup("checkoutModal", "checkoutBackdrop");
        }
    };
    document.getElementById("checkoutBackdrop").onclick = function () { closePopup("checkoutModal", "checkoutBackdrop"); };
    document.getElementById("successBackdrop").onclick = function () { closePopup("successModal", "successBackdrop"); };
    document.getElementById("accountBackdrop").onclick = function () { closePopup("accountModal", "accountBackdrop"); };

    document.getElementById("couponForm").onsubmit = function (event) {
        event.preventDefault();
        applyCoupon();
    };
    document.getElementById("checkoutForm").onsubmit = placeOrder;
    document.getElementById("accountForm").onsubmit = accountSubmit;

    document.getElementById("heroSearch").onkeyup = function () {
        searchText = this.value;
        document.getElementById("menuSearch").value = searchText;
        filterMenu();
    };
    document.getElementById("menuSearch").onkeyup = function () {
        searchText = this.value;
        document.getElementById("heroSearch").value = searchText;
        filterMenu();
    };
    document.getElementById("heroSearchForm").onsubmit = function (event) {
        event.preventDefault();
        document.getElementById("menu").scrollIntoView();
    };

    document.getElementById("categoryGrid").onclick = function (event) {
        var button = event.target;
        while (button != null && button.getAttribute("data-category") == null) {
            button = button.parentElement;
        }
        if (button != null) chooseCategory(button.getAttribute("data-category"));
    };
    document.getElementById("filterChips").onclick = function (event) {
        var button = event.target;
        while (button != null && button.getAttribute("data-category") == null) {
            button = button.parentElement;
        }
        if (button != null) chooseCategory(button.getAttribute("data-category"));
    };
    document.getElementById("sortSelect").onchange = sortMenu;
    document.getElementById("wishlistFilter").onclick = function () {
        showFavourites = !showFavourites;
        activeCategory = "All";
        filterMenu();
    };
    document.getElementById("clearFiltersBtn").onclick = function () {
        activeCategory = "All";
        showFavourites = false;
        searchText = "";
        document.getElementById("heroSearch").value = "";
        document.getElementById("menuSearch").value = "";
        document.getElementById("sortSelect").value = "recommended";
        sortMenu();
    };

    document.getElementById("accountBtn").onclick = function () {
        if (currentUser != null) {
            currentUser = null;
            saveData();
            updateAccountName();
            showMessage("You have signed out.");
        } else {
            setLoginMode("login");
            openPopup("accountModal", "accountBackdrop");
        }
    };
    var authTabs = document.getElementsByClassName("auth-tab");
    for (var i = 0; i < authTabs.length; i++) {
        authTabs[i].onclick = function () {
            setLoginMode(this.getAttribute("data-auth-tab"));
        };
    }

    var closeButtons = document.querySelectorAll("[data-close]");
    for (var i = 0; i < closeButtons.length; i++) {
        closeButtons[i].onclick = function () {
            var name = this.getAttribute("data-close");
            if (name == "checkout") closePopup("checkoutModal", "checkoutBackdrop");
            if (name == "account") closePopup("accountModal", "accountBackdrop");
        };
    }

    document.getElementById("successDoneBtn").onclick = function () {
        closePopup("successModal", "successBackdrop");
        closeCart();
        document.getElementById("orders").scrollIntoView();
    };
    document.getElementById("viewOrdersLink").onclick = function (event) {
        event.preventDefault();
        closePopup("successModal", "successBackdrop");
        document.getElementById("orders").scrollIntoView();
    };
    document.getElementById("contactForm").onsubmit = function (event) {
        event.preventDefault();
        showMessage("Thanks for contacting Bitezone!");
        this.reset();
    };
    document.getElementById("copyCouponBtn").onclick = function () {
        document.getElementById("copyCouponLabel").innerHTML = "Code: FIRST50";
        showMessage("Use FIRST50 at checkout for ₹50 off.");
    };
    document.getElementById("backToTop").onclick = function () {
        window.scrollTo(0, 0);
    };
}

// Start the website after the HTML has loaded
startWebsite();
