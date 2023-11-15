document.addEventListener('DOMContentLoaded', function () {
    const openCartBtn = document.getElementById('openCartBtn');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cart = document.getElementById('cart');

    openCartBtn.addEventListener('click', function () {
        cart.classList.add('open');
    });

    closeCartBtn.addEventListener('click', function () {
        cart.classList.remove('open');
    });
});
