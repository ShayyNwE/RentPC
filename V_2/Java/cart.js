document.addEventListener('DOMContentLoaded', function () {
    const openCartBtn = document.getElementById('openCartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cart = document.getElementById('cart');  
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const goToCartBtn = document.getElementById('goToCartBtn');

    
    openCartBtn.addEventListener('click', function () {
        cart.classList.add('open');
        showGoToCartButton();
        clearCartButton();
        saveTotalPriceToLocalStorage();
    });

    goToCartBtn.addEventListener('click', function (event) {
        event.preventDefault();
    
        const cartItemsList = document.querySelector('.cart ul');
        const cartItems = Array.from(cartItemsList.children).map(item => item.innerText);
        const totalPrice = document.getElementById('totalPrice').innerText;
    
        const queryParams = `?cartItems=${encodeURIComponent(JSON.stringify(cartItems))}&totalPrice=${encodeURIComponent(totalPrice)}`;
        const shopPageUrl = 'shop.html' + queryParams;
    
        window.location.href = shopPageUrl;
    });

    closeCartBtn.addEventListener('click', function () {
        cart.classList.remove('open');
        hideGoToCartButton();
        hideClearCartButton();
    });

    clearCartBtn.addEventListener('click', function () {
        clearCart();
        resetTotalPrice();
        localStorage.clear();
    });

    addToCartButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            addToCart(button.parentNode);
        });
    });
});

function clearCart() {
    const cartItemsList = document.querySelector('.cart ul');
    cartItemsList.innerHTML = '';
}

    function showGoToCartButton() {
        const goToCart = document.querySelector('.go-to-cart');
        goToCart.style.display = 'block';
    }

    function hideGoToCartButton() {
        const goToCart = document.querySelector('.go-to-cart');
        goToCart.style.display = 'none';
    }

       function clearCartButton() {
        const goToCart = document.querySelector('.clear-cart');
        goToCart.style.display = 'block';
    }

    function hideClearCartButton() {
        const clearCart = document.querySelector('.clear-cart');
        clearCart.style.display = 'none';
    }

    

