let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart items in Order Summary
function displayCartItems() {
  const cartItemsContainer = document.getElementById('checkout-cart-items');
  cartItemsContainer.innerHTML = '';

  let totalItems = 0;
  let subtotal = 0;

  cart.forEach((item) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>Price: ${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);

    totalItems += item.quantity;
    subtotal += parseFloat(item.price.replace('₹', '')) * item.quantity;
  });

  const gst = subtotal * 0.18; // 18% GST
  const discount = subtotal * 0.1; // 10% discount
  const totalPrice = subtotal + gst - discount;

  document.getElementById('checkout-total-items').textContent = totalItems;
  document.getElementById('checkout-subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('checkout-gst').textContent = gst.toFixed(2);
  document.getElementById('checkout-discount').textContent = discount.toFixed(2);
  document.getElementById('checkout-total-price').textContent = totalPrice.toFixed(2);
}

// Function to handle payment selection (UPI, Credit Card, COD)
function handlePaymentSelection() {
  const upiForm = document.getElementById('upi-form');
  const creditCardForm = document.getElementById('credit-card-form');
  const codForm = document.getElementById('cod-form');

  const selectedPayment = document.querySelector('input[name="payment"]:checked').value;

  // Hide all forms initially
  upiForm.style.display = 'none';
  creditCardForm.style.display = 'none';
  codForm.style.display = 'none';

  // Show the selected payment form
  if (selectedPayment === 'upi') {
    upiForm.style.display = 'block';
  } else if (selectedPayment === 'credit-card') {
    creditCardForm.style.display = 'block';
  } else if (selectedPayment === 'cod') {
    codForm.style.display = 'block';
  }
}

// Function to place order
function placeOrder() {
  const selectedPayment = document.querySelector('input[name="payment"]:checked').value;

  if (selectedPayment === 'upi') {
    const upiId = document.getElementById('upi-id').value;
    if (!upiId) {
      alert('Please enter your UPI ID.');
      return;
    }
  } else if (selectedPayment === 'credit-card') {
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

    if (!cardNumber || !expiryDate || !cvv) {
      alert('Please fill all credit card details.');
      return;
    }
  }

  // Redirect to the success page
  window.location.href = 'order-success.html';
}

// Add event listeners to payment options
document.querySelectorAll('input[name="payment"]').forEach((radio) => {
  radio.addEventListener('change', handlePaymentSelection);
});

// Initial call to set the correct form visibility on page load
handlePaymentSelection();

// Initial Load
displayCartItems();