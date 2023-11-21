const FILTER_TYPE_COLOR = 'color';
const FILTER_TYPE_RES = 'res';

let cartItems = [];
document.addEventListener('DOMContentLoaded', function () {

    loadCartFromLocalStorage();
    loadTotalPriceFromLocalStorage();
    updateCartItemCount();
    
    const checkboxes = document.querySelectorAll('.filter-checkbox');
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', filterSetups);
    });
});

function addToCart(product) {
    const productName = product.querySelector('h2').innerText;
    const productPrice = parseFloat(product.querySelector('.add-to-cart-btn').getAttribute('data-price'));
    const productImg = product.querySelector('.add-to-cart-btn').getAttribute('data-pics');
    const cartItem = document.createElement('li');
    console.log("Product Image: ", productImg);
    
    cartItem.innerHTML = `
        <span>${productName} - €${productPrice.toFixed(2)}</span>
        <img class="cart-item-img" src="Pics/${productImg}" alt="${productName}">
        <img class="remove-from-cart-img" src="Pics/poubelle.png" alt="Remove" onclick="removeFromCart(this, ${productPrice})">
    `;
    
    const cartItemsList = document.querySelector('.cart ul');
    cartItemsList.appendChild(cartItem);

    updateTotalPrice(productPrice);
    updateCartItemCount();
    saveCartToLocalStorage();
    saveTotalPriceToLocalStorage();
    saveCartItemsListToLocalStorage();
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
    saveCartItemsListToLocalStorage();
 }

 function saveCartItemsListToLocalStorage() {
    const cartItemsList = document.querySelector('.cart ul');
    const items = Array.from(cartItemsList.children).map(item => item.innerText);
    localStorage.setItem('cartItemsList', JSON.stringify(items));
}


function filterSetups() {
    const colorCheckboxes = document.querySelectorAll('.filter-section .filter-checkbox[data-type="color"]');
    const resCheckboxes = document.querySelectorAll('.filter-section .filter-checkbox[data-type="res"]');
    const procCheckboxes = document.querySelectorAll('.filter-section .filter-checkbox[data-type="proc"]');
    const gpuCheckboxes = document.querySelectorAll('.filter-section .filter-checkbox[data-type="gpu"]');
    const setups = document.querySelectorAll('.liste-setups a');

    setups.forEach(function (setup) {
        const setupColor = setup.getAttribute('data-color').toLowerCase();
        const setupRes = setup.getAttribute('data-res');
        const setupProc = setup.getAttribute('data-proc');
        const setupGpu = setup.getAttribute('data-gpu');
        let displaySetup = true;

        colorCheckboxes.forEach(function (checkbox) {
            const colorFilter = checkbox.getAttribute('data-value').toLowerCase();

            if (checkbox.checked && colorFilter !== 'all' && colorFilter !== setupColor) {
                displaySetup = false;
            }
        });

        resCheckboxes.forEach(function (checkbox) {
            const resFilter = checkbox.getAttribute('data-value');

            if (checkbox.checked && resFilter !== 'all' && resFilter !== setupRes) {
                displaySetup = false;
            }
        });

        procCheckboxes.forEach(function (checkbox) {
            const procFilter = checkbox.getAttribute('data-value');

            if (checkbox.checked && procFilter !== 'all' && procFilter !== setupProc) {
                displaySetup = false;
            }
        });

        gpuCheckboxes.forEach(function (checkbox) {
            const gpuFilter = checkbox.getAttribute('data-value');

            if (checkbox.checked && gpuFilter !== 'all' && gpuFilter !== setupGpu) {
                displaySetup = false;
            }
        });

        setup.style.display = displaySetup ? 'block' : 'none';
    });

    console.log('Filtering done.');
}

function handleCheckboxChange() {
    filterSetups();
}

const colorCheckboxes = document.querySelectorAll('.filter-section .filter-checkbox[data-type="color"]');
const resCheckboxes = document.querySelectorAll('.filter-section .filter-checkbox[data-type="res"]');
const procCheckboxes = document.querySelectorAll('.filter-section .filter-checkbox[data-type="proc"]');
const gpuCheckboxes = document.querySelectorAll('.filter-section .filter-checkbox[data-type="gpu"]');

colorCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange);
});

resCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange);
});

procCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange);
});

gpuCheckboxes.forEach(function (checkbox) {
    checkbox.addEventListener('change', handleCheckboxChange);
});
