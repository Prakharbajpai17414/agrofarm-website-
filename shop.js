// Product Data (Replace with your actual data)
const products = {
  "organic-tomatoes": {
    name: "Organic Tomatoes",
    price: "₹50/kg",
    description: "Fresh, organic tomatoes grown naturally on our farm. Perfect for salads, sauces, and more!",
    image: "images/tomatoes.jpg",
    category: "vegetable & fruit seeds"
  },
  "avocado-seed": {
    name: "Avocado Seed",
    price: "₹30/kg",
    description: "High-quality avocado seeds for farming. Ideal for growing your own avocado trees at home.",
    image: "images/avocado seed.jpg",
    category: "vegetable & fruit seeds"
  },
  "agri-car": {
    name: "Agri Car",
    price: "₹520",
    description: "A versatile agricultural vehicle designed for farming tasks. Perfect for transporting goods and equipment.",
    image: "images/agri car.jpg",
    category: "Farm machinery"
  },
  "pesticides": {
    name: "Pesticides",
    price: "₹60/ml",
    description: "Effective pesticides to protect your crops from harmful insects and pests.",
    image: "images/pesticides.jpg",
    category: "insecticides"
  },
  "marigold-seeds": {
    name: "Marigold Seeds",
    price: "₹660/kg",
    description: "High-quality marigold seeds for vibrant and colorful flowers. Perfect for gardens and landscaping.",
    image: "images/marigold seeds.avif",
    category: "vegetable & fruit seeds"
  },
  "akadi-sickle": {
    name: "Sickle",
    price: "₹250",
    description: "A traditional farming tool for cutting crops and grass. Durable and easy to use.",
    image: "images/akadi sickle.avif",
    category: "Farm machinery"
  },
  "knapsack-sprayer": {
    name: "Farm Sprayer",
    price: "₹1350",
    description: "A knapsack sprayer for efficient pesticide and fertilizer application on crops.",
    image: "images/knapsack sprayer.avif",
    category: "Farm machinery"
  },
  "hand-weeder": {
    name: "2 in 1 Hand Weeder",
    price: "₹450",
    description: "A versatile hand weeder for removing weeds and tilling soil. Lightweight and ergonomic design.",
    image: "images/hand weeder.avif",
    category: "Farm machinery"
  },
  "tomato-seeds": {
    name: "Tomato Seeds",
    price: "₹500/kg",
    description: "High-yield tomato seeds for growing juicy and delicious tomatoes in your garden.",
    image: "images/tomato seeds.avif",
    category: "vegetable & fruit seeds"
  },
  "coriander-seeds": {
    name: "Coriander Seeds",
    price: "₹449/kg",
    description: "Premium coriander seeds for adding flavor to your dishes. Easy to grow and maintain.",
    image: "images/coriander seeds.avif",
    category: "vegetable & fruit seeds"
  },
  "pumpkin-seeds": {
    name: "Pumpkin Seeds",
    price: "₹660/kg",
    description: "Healthy pumpkin seeds for growing pumpkins. Rich in nutrients and perfect for farming.",
    image: "images/pumpkin seeds.avif",
    category: "vegetable & fruit seeds"
  },
  "beetroot-seeds": {
    name: "Beetroot Seeds",
    price: "₹770/kg",
    description: "High-quality beetroot seeds for growing nutritious and delicious beetroots.",
    image: "images/beetroot seeds.avif",
    category: "vegetable & fruit seeds"
  },
  "coragen-insecticide": {
    name: "Coragen Insecticide",
    price: "₹150",
    description: "Effective insecticide for controlling pests in crops. Safe and reliable for farming.",
    image: "images/coragen insecticide.avif",
    category: "insecticides"
  },
  "pegasus-insecticide": {
    name: "Pegasus Insecticide",
    price: "₹349",
    description: "A powerful insecticide for protecting crops from harmful insects. Ensures healthy crop growth.",
    image: "images/pegasus insecticide.avif",
    category: "insecticides"
  },
  "tafgor-insecticide": {
    name: "Tafgor Insecticide",
    price: "₹670",
    description: "A trusted insecticide for pest control in agriculture. Provides long-lasting protection.",
    image: "images/tafgor insecticide.avif",
    category: "insecticides"
  },
  "liquid-bio-fertilizer": {
    name: "Liquid Bio Fertilizer",
    price: "₹200/ltr",
    description: "Organic liquid bio fertilizer for enhancing soil fertility and promoting plant growth.",
    image: "images/biovita liquid bio fertilizer.avif",
    category: "crop nutrients"
  },
  "flower-booster": {
    name: "Flower Growth Booster",
    price: "₹600/kg",
    description: "A nutrient-rich fertilizer for promoting vibrant and healthy flower growth.",
    image: "images/flower booster.avif",
    category: "crop nutrients"
  },
  "plant-growth-promoter": {
    name: "Plant Growth Promoter",
    price: "₹150/100ml",
    description: "An organic growth promoter for enhancing plant health and increasing yield.",
    image: "images/plant growth promoter.avif",
    category: "crop nutrients"
  },
  "sulphur-liquid-fertilizer": {
    name: "Sulphur Liquid Fertilizer",
    price: "₹560/ltr",
    description: "A liquid fertilizer rich in sulphur for improving soil quality and crop health.",
    image: "images/sulphur liquid fertilizer.avif",
    category: "crop nutrients"
  }
};

// Cart Data
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Filter Products by Category
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.getAttribute('data-category');

    productCards.forEach(card => {
      if (category === 'all' || card.getAttribute('data-category') === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Add to Cart Functionality
function addToCart(productId, quantity) {
  const product = products[productId];

  if (product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
      // If product exists, update the quantity
      existingProduct.quantity = quantity;
    } else {
      // If product doesn't exist, add it to cart
      cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity // Add the selected quantity
      });
    }

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    alert('Product added to cart!');
  } else {
    alert('Product not found!');
  }
}

// Update Cart Count
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Redirect to Product Details Page
function redirectToProduct(productId) {
  const product = products[productId];

  if (product) {
    localStorage.setItem('productName', product.name);
    localStorage.setItem('productPrice', product.price);
    localStorage.setItem('productDescription', product.description);
    localStorage.setItem('productImage', product.image);

    window.location.href = 'product.html';
  } else {
    window.location.href = 'shop.html';
  }
}

// Display Product Details on product.html
window.onload = () => {
  if (window.location.pathname.includes('product.html')) {
    const productName = localStorage.getItem('productName');
    const productPrice = localStorage.getItem('productPrice');
    const productDescription = localStorage.getItem('productDescription');
    const productImage = localStorage.getItem('productImage');

    document.getElementById('product-name').textContent = productName;
    document.getElementById('product-price').textContent = productPrice;
    document.getElementById('product-description').textContent = productDescription;
    document.getElementById('product-image').src = productImage;

    document.getElementById('add-to-cart').addEventListener('click', () => {
      const productId = Object.keys(products).find(key => products[key].name === productName);
      if (productId) {
        addToCart(productId);
      }
    });
  }

  updateCartCount();
};