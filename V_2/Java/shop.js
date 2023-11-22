const urlParams = new URLSearchParams(window.location.search);
const cartItemsParam = urlParams.get('cartItems');
const totalPriceParam = urlParams.get('totalPrice');


if (cartItemsParam) {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartItems = JSON.parse(decodeURIComponent(cartItemsParam));

    cartItems.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerText = item;
        cartItemsList.appendChild(cartItem);
    });

    const totalPriceElement = document.createElement('p');
    totalPriceElement.innerText = `${decodeURIComponent(totalPriceParam)}`;
    document.querySelector('.info-section').appendChild(totalPriceElement);

    const productImgElement = document.createElement('img');
    productImgElement.onload = function() {
        document.querySelector('.info-section').appendChild(productImgElement);
    };
    productImgElement.src = 'Pics/' + decodeURIComponent(productImg);
}