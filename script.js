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
   LOAD PRODUCTS FROM SUPABASE
   ========================= */

async function loadStorefrontProducts() {

    const container = document.getElementById("productsContainer");

 if (!container || typeof supabaseClient === "undefined") {
    return;
}

    try {

        const { data: products, error } = await supabaseClient
            .from("products")
            .select("id, name, category, price, badge, image_url, description")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Product loading failed:", error.message);
            return;
        }

        container.replaceChildren();

        if (!products || products.length === 0) {
            container.textContent = "No products available yet.";
            return;
        }

        products.forEach(function(product) {

            const card = document.createElement("div");
            card.className = "card product-card";

            if (product.badge) {
                const badge = document.createElement("span");
                badge.className = "badge";
                badge.textContent = product.badge;
                card.appendChild(badge);
            }

            if (product.image_url) {

                const image = document.createElement("img");

                const imageUrl = product.image_url.startsWith("http")
                    ? product.image_url
                    : supabaseClient.storage
                        .from("product-images")
                        .getPublicUrl(product.image_url).data.publicUrl;

                image.src = imageUrl;
                image.alt = product.name || "Product";
                image.loading = "lazy";

                card.appendChild(image);
            }

            const name = document.createElement("h3");
            name.textContent = product.name;
            card.appendChild(name);

            const category = document.createElement("p");
            category.textContent = product.category || "";
            card.appendChild(category);

            const description = document.createElement("p");
            description.textContent = product.description || "";
            card.appendChild(description);

            const info = document.createElement("div");
            info.className = "product-card-info";

            const price = document.createElement("p");
            price.className = "price";
            price.textContent = "💎 Price: RM " +
                Number(product.price).toFixed(2);

            info.appendChild(price);

            const cartButton = document.createElement("button");
            cartButton.className = "card-btn";
            cartButton.type = "button";
            cartButton.textContent = "Add to Cart";

            cartButton.addEventListener("click", function() {
                addToCart(product.name);
            });

            info.appendChild(cartButton);

            const wishlistButton = document.createElement("button");
            wishlistButton.className = "card-btn";
            wishlistButton.type = "button";
            wishlistButton.textContent = "❤️ Wishlist";

            wishlistButton.addEventListener("click", function() {
                addToWishlist(product.name);
            });

            info.appendChild(wishlistButton);

            card.appendChild(info);
            container.appendChild(card);

        });

        searchProducts();

        console.log("Storefront products loaded successfully!");

    } catch (error) {

        console.error("Something went wrong:", error.message);

    }
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


async function loadCategoryProducts(categoryName) {
    const container = document.getElementById("categoryProductsContainer");

    if (!container || typeof supabaseClient === "undefined") {
        return;
    }

    try {
        const { data: products, error } = await supabaseClient
            .from("products")
            .select("id, name, category, price, badge, image_url, description")
            .eq("category", categoryName)
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Product loading failed:", error.message);
            return;
        }

        products.forEach(function(product) {

            const card = document.createElement("div");
            card.className = "card product-card";

            // Product image
            if (product.image_url) {
                const image = document.createElement("img");

                image.src = product.image_url.startsWith("http")
                    ? product.image_url
                    : supabaseClient.storage
                        .from("product-images")
                        .getPublicUrl(product.image_url).data.publicUrl;

                image.alt = product.name;
                card.appendChild(image);
            }

            // Product name
            const name = document.createElement("h3");
            name.textContent = product.name;
            card.appendChild(name);

            // Product description
            const description = document.createElement("p");
            description.textContent = product.description || "";
            card.appendChild(description);

            // Product price
            const price = document.createElement("p");
            price.className = "price";
            price.textContent = "💎 Price: RM " +
                Number(product.price).toFixed(2);
            card.appendChild(price);

            // View Product button
            const viewButton = document.createElement("a");
            viewButton.href =
                "designer-necklace.html?id=" +
                encodeURIComponent(product.id);

            viewButton.className = "btn";
            viewButton.textContent = "View Product";

            card.appendChild(viewButton);

            // Add product without removing original cards
            container.appendChild(card);
        });

    } catch (error) {
        console.error("Unable to load category products:", error);
    }
}

