// Category menu
var category_nav_list =
    document.querySelector(".category_nav_list");

function Open_Categ_list() {
    category_nav_list.classList.toggle("active");
}


// Mobile navigation menu
var nav_links =
    document.querySelector(".nav_links");

function open_Menu() {
    nav_links.classList.toggle("active");
}


// Shopping cart
var cart =
    document.querySelector(".cart");

function open_close_cart() {
    cart.classList.toggle("active");
}


// Store products after loading JSON
var productsData = [];


// Get products from JSON
fetch("products.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (products) {
        productsData = products;
    })
    .catch(function (error) {
        console.log("Error loading products:", error);
    });


// Detect clicks on add-to-cart buttons
document.addEventListener("click", function (event) {

    var button = event.target.closest(".btn_add_cart");

    // Stop if user did not click an add-to-cart button
    if (!button) {
        return;
    }

    var productId = button.getAttribute("data-id");

    var selectedProduct = productsData.find(function (product) {
        return product.id == productId;
    });

    // Stop if product was not found
    if (!selectedProduct) {
        return;
    }

    addToCart(selectedProduct);

    // Update all buttons belonging to the same product
    var allMatchingButtons =
        document.querySelectorAll(
            `.btn_add_cart[data-id="${productId}"]`
        );

    allMatchingButtons.forEach(function (btn) {

        btn.classList.add("active");

        btn.innerHTML = `
            <i class="fa-solid fa-cart-shopping"></i>
            Item in cart
        `;

    });

});


// Add product to cart
function addToCart(product) {

    var cartItems =
        JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists
    var productExists = cartItems.some(function (item) {
        return item.id === product.id;
    });

    // Do not add the same product twice
    if (productExists) {
        return;
    }

    // Create a copy and add quantity
    var productToAdd = {
        ...product,
        quantity: 1
    };

    cartItems.push(productToAdd);

    saveCart(cartItems);

    updateCart();
}


// Save cart in Local Storage
function saveCart(cartItems) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cartItems)
    );

}


// Update cart content
function updateCart() {

    var cartItemsContainer =
        document.getElementById("cart_items");

    var cartItems =
        JSON.parse(localStorage.getItem("cart")) || [];

    var total_Price = 0;
    var total_count = 0;

    // Clear old cart content
    cartItemsContainer.innerHTML = "";

    // Display every cart product
    cartItems.forEach(function (item, index) {

        var total_Price_item =
            item.price * item.quantity;

        total_Price += total_Price_item;

        total_count += item.quantity;

        cartItemsContainer.innerHTML += `
            <div class="item_cart">

                <img src="${item.img}" alt="${item.name}">

                <div class="content">

                    <h4>${item.name}</h4>

                    <p class="price_cart">
                        $${total_Price_item}
                    </p>

                    <div class="quantity_control">

                        <button
                            class="decrease_quantity"
                            data-index="${index}"
                        >
                            -
                        </button>

                        <span class="quantity">
                            ${item.quantity}
                        </span>

                        <button
                            class="Increase_quantity"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="delete_item"
                    data-index="${index}"
                >
                    <i class="fa-solid fa-trash-can"></i>
                </button>

            </div>
        `;

    });

    // Get total elements
    var price_cart_total =
        document.querySelector(".price_cart_toral");

    var count_item_cart =
        document.querySelector(".Count_item_cart");

    var count_item_header =
        document.querySelector(".count_item_header");

    // Display total values
    price_cart_total.innerHTML =
        "$ " + total_Price;

    count_item_cart.innerHTML =
        total_count;

    count_item_header.innerHTML =
        total_count;
}


// Detect quantity and delete button clicks
document.addEventListener("click", function (event) {

    // Increase quantity
    var increaseButton =
        event.target.closest(".Increase_quantity");

    if (increaseButton) {

        var itemIndex =
            increaseButton.getAttribute("data-index");

        increaseQuantity(itemIndex);

        return;
    }


    // Decrease quantity
    var decreaseButton =
        event.target.closest(".decrease_quantity");

    if (decreaseButton) {

        var itemIndex =
            decreaseButton.getAttribute("data-index");

        decreaseQuantity(itemIndex);

        return;
    }


    // Delete item
    var deleteButton =
        event.target.closest(".delete_item");

    if (deleteButton) {

        var itemIndex =
            deleteButton.getAttribute("data-index");

        removeFromCart(itemIndex);
    }

});


// Increase product quantity
function increaseQuantity(index) {

    var cartItems =
        JSON.parse(localStorage.getItem("cart")) || [];

    cartItems[index].quantity += 1;

    saveCart(cartItems);

    updateCart();
}


// Decrease product quantity
function decreaseQuantity(index) {

    var cartItems =
        JSON.parse(localStorage.getItem("cart")) || [];

    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity -= 1;
    }

    saveCart(cartItems);

    updateCart();
}


// Remove product from cart
function removeFromCart(index) {

    var cartItems =
        JSON.parse(localStorage.getItem("cart")) || [];

    var removedProduct =
        cartItems.splice(index, 1)[0];

    saveCart(cartItems);

    updateCart();

    updateButoonsState(removedProduct.id);
}


// Reset product buttons after deletion
function updateButoonsState(productId) {

    var allMatchingButtons =
        document.querySelectorAll(
            `.btn_add_cart[data-id="${productId}"]`
        );

    allMatchingButtons.forEach(function (button) {

        button.classList.remove("active");

        button.innerHTML = `
            <i class="fa-solid fa-cart-shopping"></i>
            add to cart
        `;

    });

}


// Show saved cart when page loads
updateCart();