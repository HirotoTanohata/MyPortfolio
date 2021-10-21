const swiper = new Swiper('.swiper', {
  // Optional parameters
  effect:'coverflow',
  coverflowEffect:{
    rotate:70,
  },
  slidesPerView:1,
  centeredSlides: true,
  loop: true,
  speed:1000,
  breakpoints: {
    769: {
      slidesPerView:3,
    }
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});