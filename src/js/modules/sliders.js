import Swiper, { Navigation, Pagination, Parallax} from 'swiper';


// ----- Main slider ------------------------------------------------------------------------

export function swiperMainSlider() {
    if (document.querySelector('.slider-main__body')) {
        const mainSlider = new Swiper('.slider-main__body', {
            modules: [Navigation, Pagination, Parallax],
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 32,
            watchOverflow: true,
            speed: 800,
            loop: true,
            loopAdditionalSlides: 5,
            preloadImages: false,
            parallax: true,
            pagination: {
                el: '.controls-m-s__dots',
                clickable: true,
            },
            navigation: {
            nextEl: '.slider-main .slider-arrows__btn_next',
            prevEl: '.slider-main .slider-arrows__btn_prev',
            },
        });
    }
}
//------------------------------------------------------------------------------------------- 