document.addEventListener('DOMContentLoaded', function () {
    const openCartBtn = document.getElementById('openCartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cart = document.getElementById('cart');
    const goToCartBtn = document.getElementById('goToCartBtn');   
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsList = document.querySelector('.cart ul');
    

    openCartBtn.addEventListener('click', function () {
        cart.classList.add('open');
        showGoToCartButton();
        clearCartButton();
        saveTotalPriceToLocalStorage();
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

});