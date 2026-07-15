// Main image slider
var mainSwiper = new Swiper(".slide-swp", {

    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true
    },

    autoplay: {
        delay: 2500
    },

    loop: true

});


// Products slider
var productsSwiper = new Swiper(".slide_product", {

    slidesPerView: 5,

    spaceBetween: 20,

    autoplay: {
        delay: 2500
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },

    loop: true,

    breakpoints: {

        // Mobile screens
        0: {
            slidesPerView: 2,
            spaceBetween: 10
        },

        // Tablet screens
        700: {
            slidesPerView: 3,
            spaceBetween: 15
        },

        // Small laptop screens
        1000: {
            slidesPerView: 4,
            spaceBetween: 20
        },

        // Large screens
        1200: {
            slidesPerView: 5,
            spaceBetween: 20
        }

    }

});