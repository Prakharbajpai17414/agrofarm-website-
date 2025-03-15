let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update Cart Count
function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}

// Display Cart Items
function displayCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>Price: ${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;

    cartItemsContainer.appendChild(cartItem);

    totalItems += item.quantity;
    totalPrice += parseFloat(item.price.replace('₹', '')) * item.quantity;
  });

  document.getElementById('total-items').textContent = totalItems;
  document.getElementById('total-price').textContent = totalPrice.toFixed(2);
}

// Remove Item from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCartItems();
  updateCartCount();
}

// Proceed to Checkout
document.getElementById('proceed-to-checkout').addEventListener('click', () => {
  window.location.href = 'checkout.html';
});

// Initial Load
updateCartCount();
displayCartItems();