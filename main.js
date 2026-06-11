let cardIndex = 0;

function buildCard(p) {
  const card = document.createElement('div');
  card.className = 'card';
  card.id = `product-${p.id}`;
  card.style.animationDelay = `${cardIndex * 0.05}s`;
  cardIndex++;
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
  return card;
}

function renderAll() {
  const container = document.getElementById('product-sections');
  CATEGORIES.forEach(cat => {
    const section = document.createElement('section');
    section.className = 'category-section';
    section.id = `cat-${cat.id}`;

    const catTitle = document.createElement('h2');
    catTitle.className = 'category-title';
    catTitle.textContent = cat.name;
    section.appendChild(catTitle);

    cat.subs.forEach(sub => {
      const subDiv = document.createElement('div');
      subDiv.className = 'subcategory';
      subDiv.id = `sub-${cat.id}-${sub.id}`;

      const subTitle = document.createElement('h3');
      subTitle.className = 'subcategory-title';
      subTitle.textContent = sub.name;
      subDiv.appendChild(subTitle);

      const grid = document.createElement('div');
      grid.className = 'product-grid';
      sub.products.forEach(p => grid.appendChild(buildCard(p)));
      subDiv.appendChild(grid);
      section.appendChild(subDiv);
    });

    container.appendChild(section);
  });
}

// Nav 捲動（shop.html 專用）
document.addEventListener('click', e => {
  const subItem = e.target.closest('.submenu li');
  if (subItem) {
    const catId = subItem.closest('.type > li').dataset.catId;
    const subId = subItem.dataset.subId;
    document.getElementById(`sub-${catId}-${subId}`)?.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  const navLabel = e.target.closest('.nav-label');
  if (navLabel) {
    const catId = navLabel.closest('.type > li').dataset.catId;
    document.getElementById(`cat-${catId}`)?.scrollIntoView({ behavior: 'smooth' });
  }
});

// 從廣告輪播連結跳過來時捲動到指定商品
window.addEventListener('load', () => {
  if (location.hash) {
    const el = document.querySelector(location.hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
  }
});

renderAll();
