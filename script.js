/* =========================================================
   MASUMI CREATION
   Shared Cart + Wishlist System
   ========================================================= */

let cart = JSON.parse(localStorage.getItem("masumiCart")) || [];
let wishlist = JSON.parse(localStorage.getItem("masumiWishlist")) || [];


/* =========================
   SAVE DATA
   ========================= */

function saveCart() {
    localStorage.setItem("masumiCart", JSON.stringify(cart));
}

function saveWishlist() {
    localStorage.setItem("masumiWishlist", JSON.stringify(wishlist));
}


/* =========================
   UPDATE COUNTS
   ========================= */

function updateCartCount() {

    const count = cart.reduce(function(total, product) {
        return total + Number(product.qty);
    }, 0);

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = count;
    }
}


function updateWishlistCount() {

    const wishlistCount = document.getElementById("wishlist-count");

    if (wishlistCount) {
        wishlistCount.innerText = wishlist.length;
    }
}


/* =========================
   ADD TO CART
   ========================= */

function addToCart(productName, quantity = 1) {

    quantity = Number(quantity);

    if (quantity < 1 || isNaN(quantity)) {
        quantity = 1;
    }

    const existingProduct = cart.find(function(product) {
        return product.name === productName;
    });

    if (existingProduct) {

        existingProduct.qty += quantity;

    } else {

        cart.push({
            name: productName,
            qty: quantity
        });

    }

    saveCart();
    updateCartCount();
    displayCart();

    alert("✅ " + productName + " added to Cart!");
}


/* =========================
   REMOVE FROM CART
   ========================= */

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();
    updateCartCount();
    displayCart();
}


/* =========================
   DISPLAY CART
   ========================= */

function displayCart() {

    const cartItems = document.getElementById("cartItems");

    if (!cartItems) {
        return;
    }

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    let items = "";

    cart.forEach(function(product, index) {

        items += `
            <div class="cart-item">

                <p>
                    🛍️ <strong>${product.name}</strong>
                    × ${product.qty}
                </p>

                <button
                    class="btn"
                    onclick="removeFromCart(${index})">
                    Remove
                </button>

            </div>
        `;

    });

    cartItems.innerHTML = items;
}


/* =========================
   OPEN CART
   ========================= */

function openCart() {

    const cartPopup = document.getElementById("cartPopup");

    if (cartPopup) {

        displayCart();

        cartPopup.style.display = "block";
    }
}


/* =========================
   CLOSE CART
   ========================= */

function closeCart() {

    const cartPopup = document.getElementById("cartPopup");

    if (cartPopup) {

        cartPopup.style.display = "none";
    }
}


/* =========================
   ADD TO WISHLIST
   ========================= */

function addToWishlist(productName) {

    if (wishlist.includes(productName)) {

        alert("⚠️ " + productName + " is already in your Wishlist!");

        return;
    }

    wishlist.push(productName);

    saveWishlist();
    updateWishlistCount();
    displayWishlist();

    alert("❤️ " + productName + " added to Wishlist!");
}


/* =========================
   REMOVE FROM WISHLIST
   ========================= */

function removeFromWishlist(index) {

    wishlist.splice(index, 1);

    saveWishlist();
    updateWishlistCount();
    displayWishlist();
}


/* =========================
   DISPLAY WISHLIST
   ========================= */

function displayWishlist() {

    const wishlistItems = document.getElementById("wishlistItems");

    if (!wishlistItems) {
        return;
    }

    if (wishlist.length === 0) {

        wishlistItems.innerHTML =
            "<p>Your wishlist is empty.</p>";

        return;
    }

    let items = "";

    wishlist.forEach(function(product, index) {

        items += `
            <div class="wishlist-item">

                <p>
                    ❤️ <strong>${product}</strong>
                </p>

                <button
                    class="btn"
                    onclick="removeFromWishlist(${index})">
                    Remove
                </button>

            </div>
        `;

    });

    wishlistItems.innerHTML = items;
}


/* =========================
   OPEN WISHLIST
   ========================= */

function openWishlist() {

    const wishlistPopup =
        document.getElementById("wishlistPopup");

    if (wishlistPopup) {

        displayWishlist();

        wishlistPopup.style.display = "block";
    }
}


/* =========================
   CLOSE WISHLIST
   ========================= */

function closeWishlist() {

    const wishlistPopup =
        document.getElementById("wishlistPopup");

    if (wishlistPopup) {

        wishlistPopup.style.display = "none";
    }
}


/* =========================
   QUANTITY
   ========================= */

let quantity = 1;


function changeQty(change) {

    quantity += Number(change);

    if (quantity < 1) {
        quantity = 1;
    }

    const qtyElement = document.getElementById("qty");

    if (qtyElement) {
        qtyElement.innerText = quantity;
    }
}


/* =========================
   WHATSAPP CHECKOUT
   ========================= */

function checkoutWhatsApp() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    let message =
        "🛍️ *Masumi Creation Order*%0A%0A";

    let totalItems = 0;

    cart.forEach(function(product, index) {

        message +=
            (index + 1) +
            ". " +
            product.name +
            " × " +
            product.qty +
            "%0A";

        totalItems += Number(product.qty);
    });

    message +=
        "%0A--------------------%0A";

    message +=
        "🧾 Total Items: " +
        totalItems +
        "%0A%0A";

    message +=
        "Thank you for shopping with Masumi Creation ❤️";

    const whatsappNumber = "917874216100";

    window.open(
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message,
        "_blank"
    );
}


/* =========================
   IMAGE VIEWER
   ========================= */

function openImage(image) {

    const modal =
        document.getElementById("imageModal");

    const zoomedImage =
        document.getElementById("zoomedImage");

    if (modal && zoomedImage) {

        modal.style.display = "flex";

        zoomedImage.src = image;
    }
}


function closeImage() {

    const modal =
        document.getElementById("imageModal");

    if (modal) {

        modal.style.display = "none";
    }
}


function changeImage(image) {

    const mainImage =
        document.getElementById("mainImage");

    if (mainImage) {

        mainImage.src = image;
    }
}


/* =========================
   SEARCH PRODUCTS
   ========================= */

function searchProducts() {

    const searchBar =
        document.getElementById("searchBar");

    if (!searchBar) {
        return;
    }

    const input =
        searchBar.value.toLowerCase();

    const cards =
        document.querySelectorAll(".product-card");

    cards.forEach(function(card) {

        const text =
            card.innerText.toLowerCase();

        if (text.includes(input)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";
        }

    });
}


/* =========================
   INITIALIZE
   ========================= */

document.addEventListener("DOMContentLoaded", function() {

    updateCartCount();

    updateWishlistCount();

    displayCart();

    displayWishlist();

});
