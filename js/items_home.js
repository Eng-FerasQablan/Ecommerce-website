fetch("products.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (products) {

        // Get cart data from Local Storage
        var cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Get product containers from HTML
        var swiper_items_sale =
            document.getElementById("swiper_items_sale");

        var swiper_elctronics =
            document.getElementById("swiper_elctronics");

        var swiper_appliances =
            document.getElementById("swiper_appliances");

        var swiper_mobiles =
            document.getElementById("swiper_mobiles");

        // Loop through all products
        products.forEach(function (product) {

            // Create one product card
            var productCard = createProductCard(product, cart);

            // Add discounted products to sale section
            if (product.old_price) {
                swiper_items_sale.innerHTML += productCard;
            }

            // Add product to its category
            if (product.category == "electronics") {
                swiper_elctronics.innerHTML += productCard;
            }

            else if (product.category == "appliances") {
                swiper_appliances.innerHTML += productCard;
            }

            else if (product.category == "mobiles") {
                swiper_mobiles.innerHTML += productCard;
            }

        });

    })
    .catch(function (error) {
        console.log("Error loading products:", error);
    });


// Create product card
function createProductCard(product, cart) {

    // Check if product is already in cart
    var isInCart = cart.some(function (cartItem) {
        return cartItem.id === product.id;
    });

    // Default discount values
    var discountBadge = "";
    var oldPrice = "";

    // If product has an old price, calculate discount
    if (product.old_price) {

        var discountPercent = Math.floor(
            (product.old_price - product.price)
            / product.old_price
            * 100
        );

        discountBadge =
            `<span class="sale_present">%${discountPercent}</span>`;

        oldPrice =
            `<p class="old_price">$${product.old_price}</p>`;
    }

    // Default cart button state
    var buttonClass = "";
    var buttonText = "add to cart";

    // Change button if product is in cart
    if (isInCart) {
        buttonClass = "active";
        buttonText = "Item in cart";
    }

    // Return product HTML
    return `
        <div class="swiper-slide product">

            ${discountBadge}

            <div class="img_product">
                <a href="#">
                    <img src="${product.img}" alt="${product.name}">
                </a>
            </div>

            <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
            </div>

            <p class="name_product">
                <a href="#">${product.name}</a>
            </p>

            <div class="price">
                <p>
                    <span>$${product.price}</span>
                </p>

                ${oldPrice}
            </div>

            <div class="icons">

                <span
                    class="btn_add_cart ${buttonClass}"
                    data-id="${product.id}"
                >
                    <i class="fa-solid fa-cart-shopping"></i>
                    ${buttonText}
                </span>

                <span class="icon_product">
                    <i class="fa-regular fa-heart"></i>
                </span>

            </div>

        </div>
    `;
}