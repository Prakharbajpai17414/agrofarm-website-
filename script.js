const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 3000); // Change slide every 3 seconds

// JavaScript for Language Selector
document.getElementById('language').addEventListener('change', function() {
  alert(`Language changed to: ${this.value}`);
});

// JavaScript for Add to Cart
document.querySelectorAll('.product-card button').forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.parentElement.querySelector('h3').innerText;
    alert(`${productName} added to cart!`);
  });
});