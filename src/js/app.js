import * as flsFunctions from "./modules/functions.js";
import * as sliders from "./modules/sliders.js";



//----- Webp --------------------------------------------------------------------------------

flsFunctions.isWebp();
//-------------------------------------------------------------------------------------------

// ----- Main slider ------------------------------------------------------------------------

sliders.swiperMainSlider();
//-------------------------------------------------------------------------------------------  



window.onload = function() {
    document.addEventListener("click", docActions);

    function docActions(e) {
        const targetElement = e.target;

// ----- Burger -----------------------------------------------------------------------------

        if (targetElement.classList.contains('burger')) {
            document.querySelector('.burger').classList.toggle('burger_active');
            document.querySelector('.menu__body').classList.toggle('menu__body_active');
            document.body.classList.toggle('locked');
        }
//-------------------------------------------------------------------------------------------

//----- Header spoilers ---------------------------------------------------------------------
        
        const mediaQueryHover = window.matchMedia('(any-hover: none)');
        if (mediaQueryHover.matches) {
            
            const activeMenuItems = document.querySelectorAll('.menu__item_active');
            
            if (!targetElement.closest('.menu__item_active') && activeMenuItems.length > 0) {
                for (let item of activeMenuItems) {
                    item.classList.remove('menu__item_active');
                }
            }
            
            if (targetElement.classList.contains('menu__arrow')) {
                targetElement.closest('.menu__item').classList.toggle('menu__item_active');
            }
        }
//-------------------------------------------------------------------------------------------

//----- Cart spoiler ------------------------------------------------------------------------

        if (targetElement.classList.contains('cart__icon') || targetElement.closest('.cart__icon')) {
            if (document.querySelector('.purchase-list').children.length > 0) {
                document.querySelector('.cart').classList.toggle('cart_active');
            }
            e.preventDefault();
        } else if (!targetElement.closest('.cart') && !targetElement.classList.contains('actions-product__button')) {
            document.querySelector('.cart').classList.remove('cart_active');
        }
//-------------------------------------------------------------------------------------------

//----- Header search -----------------------------------------------------------------------

        if (targetElement.classList.contains('search-form__icon')) {
            document.querySelector('.search-form').classList.toggle('search-form_active');
        } else if (!targetElement.closest('.search-form_active') && 
                   document.querySelector('.search-form_active')) {
            document.querySelector('.search-form').classList.remove('search-form_active');
        }
//-------------------------------------------------------------------------------------------

//----- Footer spoilers ---------------------------------------------------------------------

        const mediaQueryMobile = window.matchMedia('(max-width: 767.98px)');
        if (mediaQueryMobile.matches) {

            const activeFooterColumns = document.querySelectorAll('.menu-footer__column_active');
            
            if (!targetElement.closest('.menu-footer__column_active') && activeFooterColumns.length > 0) {
                for (let item of activeFooterColumns) {
                    item.classList.remove('menu-footer__column_active');
                }
            }
            
            if (targetElement.classList.contains('menu-footer__title')) {
                targetElement.closest('.menu-footer__column').classList.toggle('menu-footer__column_active');
            }
        }
//-------------------------------------------------------------------------------------------

//----- Product cards loading ---------------------------------------------------------------

        if (targetElement.classList.contains('products__more')) {
            getProducts(targetElement);
            e.preventDefault();
        }

        async function getProducts(button) {
            if (!button.classList.contains('products__more_hold')) {
                button.classList.add('products__more_hold');
                const file = "json/products.json";
                let response = await fetch(file, {
                    method: "GET"
                });
                if (response.ok) {
                    let result = await response.json();
                    flsFunctions.loadProducts(result);
                    button.classList.remove('products__more_hold');
                    button.remove();
                } else {
                    alert("Error loading");
                }
            }
        }
//-------------------------------------------------------------------------------------------

//----- Adding to cart ----------------------------------------------------------------------

        if (targetElement.classList.contains('actions-product__button')) {
            const productId = targetElement.closest('.item-product').dataset.pid;
            addToCart(targetElement, productId);
            e.preventDefault();
        }

        function addToCart(productButton, productId) {
            if (!productButton.classList.contains('actions-product__button_hold')) {
                productButton.classList.add('actions-product__button_hold');
                productButton.classList.add('actions-product__button_fly');

                const cart = document.querySelector('.cart__icon');
                const product = document.querySelector(`[data-pid="${productId}"]`);
                const productImage = product.querySelector('.item-product__image');

                const productImageFly = productImage.cloneNode(true);

                const productImageFlyWidth = productImage.offsetWidth;
                const productImageFlyHeight = productImage.offsetHeight;
                const productImageFlyTop = productImage.getBoundingClientRect().top;
                const productImageFlyLeft = productImage.getBoundingClientRect().left;

                productImageFly.setAttribute('class', 'flying-image');
                productImageFly.querySelector('img').setAttribute('class', 'flying-image__photo');
                productImageFly.style.cssText = `
                    top: ${productImageFlyTop}px;
                    left: ${productImageFlyLeft}px;
                    width: ${productImageFlyWidth}px;
                    height: ${productImageFlyHeight}px;
                `;

                document.body.append(productImageFly);

                const cartFlyLeft = cart.getBoundingClientRect().left;
                const cartFlyTop = cart.getBoundingClientRect().top;

                productImageFly.style.cssText = `
                    top: ${cartFlyTop}px;
                    left: ${cartFlyLeft}px;
                    width: 0px;
                    height: 0px;
                    opacity: 0;
                `;

                productImageFly.addEventListener('transitionend', function() {
                    if (productButton.classList.contains('actions-product__button_fly')) {
                        productImageFly.remove();
                        updateCart(productButton, productId);
                        productButton.classList.remove('actions-product__button_fly');
                    }
                });
            }
        }

        function updateCart(productButton, productId, productAdd = true) {
            const cart = document.querySelector('.cart');
            const cartIcon = document.querySelector('.cart__icon');
            const cartQuantity = cartIcon.querySelector('span');
            const cartProduct = document.querySelector(`[data-cartpid="${productId}"]`);
            const cartList = document.querySelector('.purchase-list');

            if (productAdd) {
                if (cartQuantity) {
                    cartQuantity.innerHTML = ++cartQuantity.innerHTML;
                } else {
                    cartIcon.insertAdjacentHTML('beforeend', `<span class="cart__products-num">1</span>`);
                }

                if (!cartProduct) {
                    const product = document.querySelector(`[data-pid="${productId}"]`);
                    const cartProductImage = product.querySelector('.item-product__image').innerHTML;
                    const cartProductTitle = product.querySelector('.item-product__title').innerHTML;
                    const cartProductContent = `
                        <a href="" class="purchase-list__image">${cartProductImage}</a>
                        <div class="purchase-list__body">
                            <a href="" class="purchase-list__title">${cartProductTitle}</a>
                            <div class="purchase-list__quantity">
                                Quantity: <span class="purchase-list__quantity-num">1</span>
                            </div>
                            <a href="" class="purchase-list__delete">Delete</a>
                        </div>
                    `;
                    cartList.insertAdjacentHTML('beforeend',
                        `<li data-cartpid="${productId}" class="purchase-list__item">${cartProductContent}</li>`);
                } else {
                    const cartProductQuantity = cartProduct.querySelector('.purchase-list__quantity-num');
                    cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
                }

                productButton.classList.remove('actions-product__button_hold');
            } else {
                const cartProductQuantity = cartProduct.querySelector('.purchase-list__quantity-num');
                cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;
                if (!parseInt(cartProductQuantity.innerHTML)) {
                    cartProduct.remove();
                }

                const cartQuantityValue = --cartQuantity.innerHTML;

                if (cartQuantityValue) {
                    cartQuantity.innerHTML = cartQuantityValue;
                } else {
                    cartQuantity.remove();
                    cart.classList.remove('cart_active');
                }
            }
        }
//-------------------------------------------------------------------------------------------

//----- Delete from cart --------------------------------------------------------------------

        if (targetElement.classList.contains('purchase-list__delete')) {
            const productId = targetElement.closest('.purchase-list__item').dataset.cartpid;
            updateCart(targetElement, productId, false);
            e.preventDefault();
        } 
//-------------------------------------------------------------------------------------------

    }

//----- Header scroll -----------------------------------------------------------------------
        
    const headerElement = document.querySelector('.header');

    const callback = function(entries, observer) {
        if (entries[0].isIntersecting) {
            headerElement.classList.remove('header_scroll');
        } else {
            headerElement.classList.add('header_scroll');
        }
    };

    const headerObserver = new IntersectionObserver(callback);
    headerObserver.observe(headerElement);
//-------------------------------------------------------------------------------------------

};