export function isWebp() {
    function testWebP(callback) {
        let webP = new Image(); 
        webP.onload = webP.onerror = function () { 
            callback(webP.height == 2); 
        }; 
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }

    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}

export function loadProducts(data) {
    const productsItems = document.querySelector('.products__items');

    data.products.forEach(item => {
        const productId = item.id;
        const productUrl = item.url;
        const productImage = item.image;
        const productTitle = item.title;
        const productText = item.text;
        const productPrice = item.price;
        const productOldPrice = item.priceOld;
        const productShareUrl = item.shareUrl;
        const productLikeUrl = item.likeUrl;
        const productLabels = item.labels;

        let productTemplateStart = `<article data-pid="${productId}" class="products__item item-product">`;
        let productTemplateEnd = `</article>`;

        let productTemplateImage = `
            <a href="${productUrl}" class="item-product__image">
                <img src="img/products/${productImage}" alt="${productTitle}" class="item-product__photo">
            </a>
        `;

        let productTemplateLabels = '';
        if (productLabels) {
            let productTemplateLabelsStart = `<div class="item-product__labels">`;
            let productTemplateLabelsEnd = `</div>`;
            let productTemplateLabelsContent = '';

            productLabels.forEach(labelItem => {
                productTemplateLabelsContent += `
                    <div class="item-product__label item-product__label_type_${labelItem.type}">${labelItem.value}</div>
                `;
            });

            productTemplateLabels += productTemplateLabelsStart;
            productTemplateLabels += productTemplateLabelsContent;
            productTemplateLabels += productTemplateLabelsEnd;
        }

        let productTemplateBodyStart = `<div class="item-product__body">`;
        let productTemplateBodyEnd = `</div>`;

        let productTemplateContent = `
            <div class="item-product__content">
                <h3 class="item-product__title">${productTitle}</h3>
                <div class="item-product__text">${productText}</div>
            </div>
        `;

        let productTemplatePrices = '';
        let productTemplatePricesStart = `<div class="item-product__prices">`;
        let productTemplatePricesCurrent = `<div class="item-product__price">Rp ${productPrice}</div>`;
        let productTemplatePricesOld = `<div class="item-product__price item-product__price_old">Rp ${productOldPrice}</div>`;
        let productTemplatePricesEnd = `</div>`;

        productTemplatePrices = productTemplatePricesStart;
        productTemplatePrices += productTemplatePricesCurrent;
        if (productOldPrice) {
            productTemplatePrices += productTemplatePricesOld;
        }
        productTemplatePrices += productTemplatePricesEnd;

        let productTemplateActions = `
            <div class="item-product__actions actions-product">
                <div class="actions-product__body">
                    <a href="" class="actions-product__button products-button"><span>Add to cart</span></a>
                    <a href="${productShareUrl}" class="actions-product__link">
                        <svg class="actions-product__icon">
                            <use xlink:href="img/icon_sprite/sprite.svg#share"></use>
                        </svg>
                        <span>Share</span>
                    </a>
                    <a href="${productLikeUrl}" class="actions-product__link">
                        <svg class="actions-product__icon">
                            <use xlink:href="img/icon_sprite/sprite.svg#heart"></use>
                        </svg>
                        <span>Like</span>
                    </a>
                </div>
            </div>
        `;

        let productTemplateBody = '';
        productTemplateBody += productTemplateBodyStart;
        productTemplateBody += productTemplateContent;
        productTemplateBody += productTemplatePrices;
        productTemplateBody += productTemplateActions;
        productTemplateBody += productTemplateBodyEnd;

        let productTemplate = '';
        productTemplate += productTemplateStart;
        productTemplate += productTemplateImage;
        productTemplate += productTemplateLabels;
        productTemplate += productTemplateBody;
        productTemplate += productTemplateEnd;

        productsItems.insertAdjacentHTML('beforeend', productTemplate);
    });
}
