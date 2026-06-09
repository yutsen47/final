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

const books = [
  {
    id: 1,
    img: 'img/2025eslite_top10_yearend01.jpg',
    name: '黃仁勳傳',
    price: 'NT$680',
    category: '商業理財'
  },
  {
    id: 2,
    img: 'img/2025eslite_top10_yearend02.jpg',
    name: '變成自己想望的大人',
    price: 'NT$450',
    category: '心理勵志'
  },
  {
    id: 3,
    img: 'img/2025eslite_top10_yearend03.jpg',
    name: '想哭就哭吧，你不需要那麼 懂事。',
    price: 'NT$320',
    category: '心理勵志'
  },
  {
    id: 4,
    img: 'img/2025eslite_top10_yearend04.jpg',
    name: '失控的焦慮世代',
    price: 'NT$420',
    category: '心理勵志'
  },
  {
    id: 5,
    img: 'img/2025eslite_top10_yearend05.jpg',
    name: '城與不確定的牆',
    price: 'NT$360',
    category: '文學小說'
  },
  {
    id: 6,
    img: 'img/2025eslite_top10_yearend06.jpg',
    name: '生命中最大的寶藏就是你自己',
    price: 'NT$400',
    category: '心理勵志'
  },
  {
    id: 7,
    img: 'img/2025eslite_top10_yearend07.jpg',
    name: '如果歷史是一群喵',
    price: 'NT$350',
    category: '文學小說'
  },
  {
    id: 8,
    img: 'img/2025eslite_top10_yearend08.jpg',
    name: '世界盡頭的咖啡館',
    price: 'NT$460',
    category: '文學小說'
  },
  {
    id: 9,
    img: 'img/2025eslite_top10_yearend09.jpg',
    name: '把日子慢慢變好',
    price: 'NT$580',
    category: '心理勵志'
  },
  {
    id: 10,
    img: 'img/2025eslite_top10_yearend10.jpg',
    name: '張忠謀自傳',
    price: 'NT$620',
    category: '商業理財'
  }
];

let cartCount = 0;
let toastTimer;

function renderCards() {
  products.forEach((p, i) => {
    const grid = document.getElementById('product-grid');
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

function renderBooks(category = "全部") {

  const grid = document.getElementById('book-grid');

  grid.innerHTML = '';

  const filteredBooks =
    category === "全部"
      ? books
      : books.filter(book => book.category === category);

  filteredBooks.forEach(book => {

    const card = document.createElement('div');

    card.className = 'card';

    card.innerHTML = `
      <div class="card-img">
        <img src="${book.img}" alt="${book.name}">
      </div>

      <div class="card-body">
        <div>
          <div class="product-name">${book.name}</div>
          <div class="price">${book.price}</div>
        </div>

        <button class="add-cart-btn"
                data-name="${book.name}">
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

// 點擊書本

document.getElementById("book-menu").addEventListener("click", function(e){

  if (e.target.classList.contains("book-category")) return;

  document.getElementById("home-page").classList.add("hidden");
  document.getElementById("book-page").classList.remove("hidden");

  renderBooks("全部");

});

document.querySelectorAll(".book-category")
.forEach(item => {

  item.addEventListener("click", function(e){

    e.stopPropagation();

    const category = this.dataset.category;

    // 切頁：首頁 → 書本
    document.getElementById("home-page").classList.add("hidden");
    document.getElementById("book-page").classList.remove("hidden");

    // 顯示對應分類
    renderBooks(category);

  });

});

// 點擊店名回首頁

  document.getElementById("home-btn").addEventListener("click", function(){
  document.getElementById("book-page").classList.add("hidden");
  document.getElementById("home-page").classList.remove("hidden");
  document.getElementById("book-grid").innerHTML = "";

});
