// ── 工具 ────────────────────────────────────────────────
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function flatProducts() {
  return CATEGORIES.flatMap(cat =>
    cat.subs.flatMap(sub =>
      sub.products.map(p => ({ ...p, catId: cat.id, subId: sub.id }))
    )
  );
}

// ── 輪播廣告 ─────────────────────────────────────────────
const CAROUSEL_INTERVAL = 4000;
const carouselProducts = shuffle(flatProducts()).slice(0, 3);
let current = 0;
let autoTimer = null;

function buildSlide(p, index) {
  const div = document.createElement('div');
  div.className = 'carousel-slide' + (index === 0 ? ' active' : '');
  div.innerHTML = `
    <div class="slide-bg" style="background-image:url('${p.img}')"></div>
    <img class="slide-img" src="${p.img}" alt="${p.name}" />
    <div class="slide-overlay">
      <div class="slide-content">
        <span class="slide-badge">精選推薦</span>
        <h2 class="slide-name">${p.name}</h2>
        <p class="slide-price">${p.price}</p>
        <a href="product.html?id=${p.id}" class="slide-cta">立即選購</a>
      </div>
    </div>
  `;
  return div;
}

function goTo(index) {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots   = document.querySelectorAll('.carousel-dot');
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + carouselProducts.length) % carouselProducts.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  resetProgress();
}

function startAuto() {
  autoTimer = setInterval(() => goTo(current + 1), CAROUSEL_INTERVAL);
}
function stopAuto() { clearInterval(autoTimer); }

function resetProgress() {
  const bar = document.getElementById('carousel-progress');
  if (!bar) return;
  bar.classList.remove('running');
  void bar.offsetWidth;
  bar.classList.add('running');
  bar.style.animationDuration = `${CAROUSEL_INTERVAL}ms`;
}

function renderCarousel() {
  const track = document.getElementById('carousel-track');
  const dots  = document.getElementById('carousel-dots');
  carouselProducts.forEach((p, i) => {
    track.appendChild(buildSlide(p, i));
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `切換至第 ${i + 1} 張`);
    dot.addEventListener('click', () => { stopAuto(); goTo(i); startAuto(); });
    dots.appendChild(dot);
  });
  document.getElementById('carousel-prev').addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  document.getElementById('carousel-next').addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
  const hero = document.getElementById('hero-carousel');
  hero.addEventListener('mouseenter', stopAuto);
  hero.addEventListener('mouseleave', startAuto);
  resetProgress();
  startAuto();
}

// ── 暢銷商品 ─────────────────────────────────────────────
function renderBestsellers() {
  const all  = flatProducts();
  const grid = document.getElementById('bestsellers-grid');
  BESTSELLER_IDS.forEach((id, i) => {
    const p = all.find(x => x.id === id);
    if (!p) return;
    const card = document.createElement('div');
    card.className = 'card';
    card.id = `product-${p.id}`;
    card.style.animationDelay = `${i * 0.07}s`;
    card.innerHTML = `
      <a href="product.html?id=${p.id}" class="card-img-link">
        <div class="card-img">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
        </div>
      </a>
      <div class="card-body">
        <div class="card-name">${p.name}</div>
        <div class="card-footer">
          <span class="price">${p.price}</span>
          <button class="add-cart-btn"
            data-id="${p.id}"
            data-name="${p.name}"
            data-price="${p.price}"
            data-img="${p.img}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 001.98 1.61H20a2 2 0 001.96-1.61L23 6H6"/>
            </svg>
            加入
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── Nav（首頁跳到 shop.html） ────────────────────────────
document.querySelector('nav').addEventListener('click', e => {
  const subItem = e.target.closest('.submenu li');
  if (subItem) {
    const catId = subItem.closest('.type > li').dataset.catId;
    window.location.href = `shop.html#sub-${catId}-${subItem.dataset.subId}`;
    return;
  }
  const navLabel = e.target.closest('.nav-label');
  if (navLabel) {
    window.location.href = `shop.html#cat-${navLabel.closest('.type > li').dataset.catId}`;
  }
});

renderCarousel();
renderBestsellers();
