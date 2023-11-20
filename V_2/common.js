document.addEventListener('DOMContentLoaded', function () {

    loadCartFromLocalStorage();
    loadTotalPriceFromLocalStorage();
    updateCartItemCount();
});

function addToCart(product) {
    const productName = product.querySelector('h2').innerText;
    const productPrice = parseFloat(product.querySelector('.add-to-cart-btn').getAttribute('data-price'));
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
       <span>${productName} - €${productPrice.toFixed(2)}</span>
       <img class="remove-from-cart-img" src="Pics/poubelle.png" alt="Remove" onclick="removeFromCart(this, ${productPrice})">
    `;
    const cartItemsList = document.querySelector('.cart ul');
    cartItemsList.appendChild(cartItem);
 
    updateTotalPrice(productPrice);
    updateCartItemCount();
    saveCartToLocalStorage();
    saveTotalPriceToLocalStorage();
 }


function updateTotalPrice(price) {
    const totalPriceElement = document.getElementById('totalPrice');
    const currentTotal = parseFloat(totalPriceElement.innerText.replace('Total: €', '')) || 0;
    const newTotal = currentTotal + price;
    totalPriceElement.innerText = 'Total: €' + newTotal.toFixed(2);
}

function clearCart() {
    const cartItemsList = document.querySelector('.cart ul');
    cartItemsList.innerHTML = '';
    updateCartItemCount();
}

function resetTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.innerText = 'Total: €0.00';
}

function saveCartToLocalStorage() {
    const cartItems = [];
    const cartItemsElements = document.querySelectorAll('.cart ul li');
    cartItemsElements.forEach(function (item) {
        cartItems.push(item.innerText);
    });
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadCartFromLocalStorage() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsList = document.querySelector('.cart ul');
    cartItemsList.innerHTML = '';
    cartItems.forEach(function (item) {
        const cartItem = document.createElement('li');
        cartItem.innerText = item;
        cartItemsList.appendChild(cartItem);
    });
    updateTotalPriceBasedOnCart();
    updateCartItemCount();
}

function saveTotalPriceToLocalStorage() {
    const totalPrice = document.getElementById('totalPrice').innerText;
    localStorage.setItem('totalPrice', totalPrice);
}

function loadTotalPriceFromLocalStorage() {
    const totalPrice = localStorage.getItem('totalPrice') || '€0.00';
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.innerText = totalPrice;
}

function updateTotalPriceBasedOnCart() {
    const totalPriceElement = document.getElementById('totalPrice');
    let total = 0;
    const cartItemsElements = document.querySelectorAll('.cart ul li');
    
    cartItemsElements.forEach(function (item) {
        const itemText = item.innerText;
        const priceString = itemText.split(' - €')[1];
        const price = parseFloat(priceString);
        total += price;
    });

    totalPriceElement.innerText = 'Total: €' + total.toFixed(2);
}

function updateCartItemCount() {
    const cartItemsElements = document.querySelectorAll('.cart ul li');
    const cartItemCountElement = document.getElementById('cartItemCount');
    const itemCount = cartItemsElements.length;
 
    cartItemCountElement.innerText = itemCount;
 
    localStorage.setItem('cartItemCount', itemCount);
    
    if (itemCount >= 10) {
        document.getElementById('cartItemCount').classList.add('largeCount');
        cartItemCountElement.style.fontSize = '0.9em';
     } else {
        cartItemCountElement.style.fontSize = ''; // Rétablir la taille par défaut si le nombre d'articles est inférieur à 10
        document.getElementById('cartItemCount').classList.remove('largeCount');
     }
 }

 function removeFromCart(button, price) {
    const cartItem = button.parentNode;
    const cartItemsList = document.querySelector('.cart ul');
    cartItemsList.removeChild(cartItem);
 
    updateTotalPrice(-price); 
    updateCartItemCount();
    saveCartToLocalStorage();
    saveTotalPriceToLocalStorage();
 }