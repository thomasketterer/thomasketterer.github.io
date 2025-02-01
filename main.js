let swiper = new Swiper(".container", {
    slidesPerView: 5,
    spaceBetween: 30,
    grabCursor: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {
        el:'swiper-pagination',
        clickable: true,
        dynamicBullets: true
    }
});