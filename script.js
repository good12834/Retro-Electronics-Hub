
// Countdown Timer
const countdown = () => {
  const endDate = new Date('December 31, 2023 23:59:59').getTime();
  const now = new Date().getTime();
  const timeLeft = endDate - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  document.getElementById('days').innerText = days;
  document.getElementById('hours').innerText = hours;
  document.getElementById('minutes').innerText = minutes;
  document.getElementById('seconds').innerText = seconds;

  if (timeLeft < 0) {
    clearInterval(interval);
    document.getElementById('countdown').innerHTML = 'Offer Expired!';
    document.getElementById('claimOffer').disabled = true;
  }
};

const interval = setInterval(countdown, 1000);

// Claim Offer Button
document.getElementById('claimOffer').addEventListener('click', () => {
  const discountCode = document.getElementById('discountCode');
  const emailReminderForm = document.getElementById('emailReminderForm');
  const claimButton = document.getElementById('claimOffer');

  // Show discount code
  discountCode.style.display = 'block';
  claimButton.style.display = 'none';

  // Show email reminder form
  emailReminderForm.style.display = 'block';
});

// Email Reminder Form
document.getElementById('emailReminderForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[type="email"]').value;
  if (email) {
    alert(`Thank you! We'll remind you at ${email} before the offer ends.`);
  } else {
    alert('Please enter a valid email address.');
  }
});

// Update Progress Bar
const updateProgress = () => {
  const progressBar = document.getElementById('offerProgress');
  let progress = parseInt(progressBar.style.width);

  if (progress < 100) {
    progress += 10; // Simulate progress increase
    progressBar.style.width = `${progress}%`;
    progressBar.innerText = `${progress}% Claimed`;
  }
};

// Simulate progress update every 5 seconds
setInterval(updateProgress, 5000);
// Interactive Stats
const stats = document.querySelectorAll('.display-4[data-count]');
stats.forEach(stat => {
  const target = +stat.getAttribute('data-count');
  const increment = target / 100;
  let count = 0;

  const updateCount = () => {
    if (count < target) {
      count += increment;
      stat.innerText = Math.ceil(count);
      setTimeout(updateCount, 10);
    } else {
      stat.innerText = target;
    }
  };

  updateCount();
});
let cart = [];
let cartCount = 0;
let compareList = [];
let products = [
  { name: 'Nintendo Entertainment System', price: 99.99, image: 'images/nes.jpg', category: 'console', tags: ['vintage', 'gaming'], stock: 5, discount: 20 },
  { name: 'Sony Walkman', price: 49.99, image: 'images/walkman.jpg', category: 'audio', tags: ['vintage', 'audio'], stock: 10, discount: 10 },
  { name: 'Game Boy', price: 79.99, image: 'images/gameboy.jpg', category: 'console', tags: ['vintage', 'gaming'], stock: 3, discount: 15 },
];

// Initialize product list
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(products);
});

// Render products
function renderProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';

  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'col-md-4 mb-4';
    productElement.innerHTML = `
      <div class="card">
        ${product.discount ? `<div class="position-absolute top-0 start-0 bg-danger text-white p-2">${product.discount}% Off</div>` : ''}
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description || 'Relive the golden age of gaming.'}</p>
          <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
          <p class="card-text"><small class="text-muted">In Stock: ${product.stock}</small></p>
          <div class="mt-2">
            ${product.tags.map(tag => `<span class="badge bg-secondary">${tag}</span>`).join('')}
          </div>
          <button class="btn btn-primary mt-2" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
          <button class="btn btn-outline-info mt-2" onclick="addToComparison('${product.name}', ${product.price}, '${product.image}')">Compare</button>
          <button class="btn btn-outline-secondary mt-2" onclick="shareProduct('${product.name}', window.location.href)">Share</button>
        </div>
      </div>
    `;
    productList.appendChild(productElement);
  });
}

// Add to Cart
function addToCart(name, price) {
  cart.push({ name, price });
  cartCount++;
  updateCart();
}

// Update Cart UI
function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const cartCountElement = document.getElementById('cartCount');
  
  // Clear existing items
  cartItems.innerHTML = '';

  // Add new items
  cart.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item mb-3';
    itemElement.innerHTML = `
      <p><strong>${item.name}</strong> - $${item.price.toFixed(2)}</p>
      <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(itemElement);
  });

  // Update cart count
  cartCountElement.textContent = cartCount;
}

// Remove from Cart
function removeFromCart(index) {
  cart.splice(index, 1);
  cartCount--;
  updateCart();
}

// Clear Cart
function clearCart() {
  cart = [];
  cartCount = 0;
  updateCart();
}

// Add to Comparison
function addToComparison(name, price, image) {
  if (compareList.length < 3) {
    compareList.push({ name, price, image });
    updateComparison();
  } else {
    alert('You can only compare up to 3 products.');
  }
}

// Update Comparison UI
function updateComparison() {
  const compareSection = document.getElementById('compareProducts');
  compareSection.innerHTML = '';

  compareList.forEach(product => {
    const productElement = document.createElement('div');
    productElement.className = 'col-md-4';
    productElement.innerHTML = `
      <div class="card">
        <img src="${product.image}" class="card-img-top" alt="${product.name}">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text"><strong>$${product.price.toFixed(2)}</strong></p>
        </div>
      </div>
    `;
    compareSection.appendChild(productElement);
  });
}
// Clear Comparison
function clearComparison() {
  compareList = [];
  updateComparison();
}



// Search and Filter Functionality
document.getElementById('searchInput').addEventListener('input', filterProducts);
document.getElementById('categoryFilter').addEventListener('change', filterProducts);
document.getElementById('priceSort').addEventListener('change', sortProducts);

function filterProducts() {
  const searchQuery = document.getElementById('searchInput').value.toLowerCase();
  const category = document.getElementById('categoryFilter').value;
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    const matchesCategory = category === '' || product.category === category;
    return matchesSearch && matchesCategory;
  });
  renderProducts(filteredProducts);
}

function sortProducts() {
  const sortBy = document.getElementById('priceSort').value;
  const sortedProducts = [...products].sort((a, b) => {
    return sortBy === 'low-to-high' ? a.price - b.price : b.price - a.price;
  });
  renderProducts(sortedProducts);
}
