const products = [
  { id: 1, img: 'img/2025eslite_top10_yearend01.jpg', name: '商品一', price: 'NT$ 380' },
  { id: 2, img: 'img/2025eslite_top10_yearend02.jpg', name: '商品二', price: 'NT$ 520' },
  { id: 3, img: 'img/2025eslite_top10_yearend03.jpg', name: '商品三', price: 'NT$ 290' },
  { id: 4, img: 'img/2025eslite_top10_yearend04.jpg', name: '商品四', price: 'NT$ 450' },
  { id: 5, img: 'img/2025eslite_top10_yearend05.jpg', name: '商品五', price: 'NT$ 680' },
  { id: 6, img: 'img/2025eslite_top10_yearend06.jpg', name: '商品六', price: 'NT$ 350' },
  { id: 7, img: 'img/2025eslite_top10_yearend07.jpg', name: '商品一', price: 'NT$ 380' },
  { id: 8, img: 'img/2025eslite_top10_yearend08.jpg', name: '商品二', price: 'NT$ 520' },
  { id: 9, img: 'img/2025eslite_top10_yearend09.jpg', name: '商品三', price: 'NT$ 290' },
  { id: 10, img: 'img/2025eslite_top10_yearend10.jpg', name: '商品四', price: 'NT$ 450' },
  { id: 11, img: 'img/fire01.jpg', name: '商品五', price: 'NT$ 680' },
];

let cartCount = 0;
let toastTimer;

function renderCards() {
  products.forEach((p, i) => {
    const grid = document.getElementById(i < 3 ? 'grid-1' : 'grid-2');
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-img">
        <span class="img-placeholder">${p.emoji}</span>
      </div>
      <div class="card-body">
        <span class="price">${p.price}</span>
        <button class="add-cart-btn" data-name="${p.name}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61H20a2 2 0 001.96-1.61L23 6H6"/>
          </svg>
          購物車
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function addToCart(name) {
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;
  showToast(`✓ ${name} 已加入購物車`);
}

function openCart() {
  showToast(`購物車共 ${cartCount} 件商品`);
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

// Event delegation for add-to-cart buttons
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.add-cart-btn');
  if (btn) {
    addToCart(btn.dataset.name);
    return;
  }
  if (e.target.closest('#cart-btn')) {
    openCart();
  }
});

renderCards();
