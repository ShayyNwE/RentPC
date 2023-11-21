const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartItemsList = document.getElementById('cartItemsList');
document.addEventListener('DOMContentLoaded', function(){
cartItems.forEach(item => {
    const liElement = document.createElement('li');

    // Créer l'élément image
    const imgElement = document.createElement('img');
    imgElement.src = item.imageSrc;
    imgElement.alt = item.name;

    // Créer l'élément span pour le nom du produit
    const spanElement = document.createElement('span');
    spanElement.textContent = `${item.name} - €${item.price.toFixed(2)}`;

    // Ajouter l'image et le nom du produit à l'élément li
    liElement.appendChild(imgElement);
    liElement.appendChild(spanElement);

    // Ajouter l'élément li à la liste des articles du panier
    cartItemsList.appendChild(liElement);
});
});

// Vérifier la console du navigateur pour d'éventuelles erreurs
console.log('Cart items:', cartItems);

