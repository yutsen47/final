'use strict';

// ── DB 工具（sql.js） ────────────────────────────────────
let db = null;

function saveDB() {
  const data = db.export();
  const chars = new Array(data.length);
  for (let i = 0; i < data.length; i++) chars[i] = String.fromCharCode(data[i]);
  localStorage.setItem('store_db', btoa(chars.join('')));
}

function queryAll(sql, params = []) {
  const stmt = db.prepare(sql);
  if (params.length) stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

function queryOne(sql, params = []) {
  return queryAll(sql, params)[0] ?? null;
}

function runSQL(sql, params = []) {
  db.run(sql, params);
  saveDB();
}

function insertSQL(sql, params = []) {
  db.run(sql, params);
  const id = db.exec('SELECT last_insert_rowid()')[0].values[0][0];
  saveDB();
  return id;
}

function nowStr() {
  const d = new Date();
  const p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

// ── State ────────────────────────────────────────────────
let currentUser = null;
let cartItems   = [];
let toastTimer;

// ── Session（localStorage） ──────────────────────────────
function loadSession() {
  try {
    const s = localStorage.getItem('store_session');
    if (!s) return null;
    const saved = JSON.parse(s);
    return queryOne('SELECT id, username, email, phone, address, created_at FROM users WHERE id = ?', [saved.id]);
  } catch { return null; }
}
function saveSession(user) {
  if (user) localStorage.setItem('store_session', JSON.stringify({ id: user.id }));
  else      localStorage.removeItem('store_session');
}

// ── Auth ─────────────────────────────────────────────────
function dbRegister(username, email, password) {
  if (!username?.trim() || !password) return { error: '帳號與密碼為必填' };
  username = username.trim();
  if (queryOne('SELECT id FROM users WHERE username = ?', [username])) return { error: '此帳號已存在' };
  const id   = insertSQL('INSERT INTO users (username,email,password,created_at) VALUES (?,?,?,?)', [username, email||'', password, nowStr()]);
  const user = queryOne('SELECT id,username,email,phone,address,created_at FROM users WHERE id = ?', [id]);
  return { success: true, user };
}

function dbLogin(username, password) {
  const user = queryOne('SELECT id,username,email,phone,address,created_at FROM users WHERE username=? AND password=?', [username, password]);
  return user ? { success: true, user } : { error: '帳號或密碼錯誤' };
}

// ── Cart ─────────────────────────────────────────────────
function reloadCart() {
  cartItems = currentUser
    ? queryAll('SELECT * FROM cart_items WHERE user_id = ?', [currentUser.id])
    : [];
}

function dbAddToCart(productId, name, price, img) {
  if (!currentUser) return;
  const ex = queryOne('SELECT id FROM cart_items WHERE user_id=? AND product_id=?', [currentUser.id, productId]);
  if (ex) runSQL('UPDATE cart_items SET quantity=quantity+1 WHERE id=?', [ex.id]);
  else    insertSQL('INSERT INTO cart_items (user_id,product_id,name,price,img) VALUES (?,?,?,?,?)', [currentUser.id, productId, name, price, img]);
  reloadCart();
}

function dbUpdateCart(id, qty) {
  if (qty < 1) runSQL('DELETE FROM cart_items WHERE id=? AND user_id=?', [id, currentUser.id]);
  else         runSQL('UPDATE cart_items SET quantity=? WHERE id=? AND user_id=?', [qty, id, currentUser.id]);
  reloadCart();
}

function dbRemoveCart(id) {
  runSQL('DELETE FROM cart_items WHERE id=? AND user_id=?', [id, currentUser.id]);
  reloadCart();
}

function dbCheckout() {
  if (!currentUser || !cartItems.length) return { error: '購物車是空的' };
  const total   = cartItems.reduce((s, i) => s + parseInt(i.price.replace(/[^\d]/g,'')) * i.quantity, 0);
  const orderId = insertSQL('INSERT INTO orders (user_id,total,status,created_at) VALUES (?,?,?,?)', [currentUser.id, total, 'completed', nowStr()]);
  for (const item of cartItems) {
    insertSQL('INSERT INTO order_items (order_id,product_id,name,price,img,quantity) VALUES (?,?,?,?,?,?)',
      [orderId, item.product_id, item.name, item.price, item.img, item.quantity]);
  }
  runSQL('DELETE FROM cart_items WHERE user_id=?', [currentUser.id]);
  cartItems = [];
  return { success: true, orderId, total };
}

// ── Toast ────────────────────────────────────────────────
function showToast(msg, type = '') {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.className   = ['show', type].filter(Boolean).join(' ');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (t.className = ''), 2400);
}

// ── Ripple ───────────────────────────────────────────────
function createRipple(e, el) {
  el.querySelector('.ripple')?.remove();
  const r = document.createElement('span');
  r.className = 'ripple';
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  Object.assign(r.style, { width:`${size}px`, height:`${size}px`, left:`${e.clientX-rect.left-size/2}px`, top:`${e.clientY-rect.top-size/2}px` });
  el.appendChild(r);
  r.addEventListener('animationend', () => r.remove());
}

// ── Header ───────────────────────────────────────────────
function updateHeader(user) {
  const authBtn  = document.getElementById('auth-btn');
  const userInfo = document.getElementById('user-info');
  const nameEl   = document.getElementById('header-username');
  if (user) {
    authBtn?.setAttribute('hidden','');
    userInfo?.removeAttribute('hidden');
    if (nameEl) nameEl.textContent = user.username;
  } else {
    authBtn?.removeAttribute('hidden');
    userInfo?.setAttribute('hidden','');
  }
  updateBadge();
}

function updateBadge() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  const total = cartItems.reduce((s,i) => s + i.quantity, 0);
  badge.textContent = total;
  if (total > 0) { badge.classList.remove('bounce'); void badge.offsetWidth; badge.classList.add('bounce'); }
}

// ── Modal 注入 ───────────────────────────────────────────
function injectModals() {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="modal-overlay" id="auth-overlay">
      <div class="modal">
        <button class="modal-x" id="auth-close">✕</button>
        <div class="modal-tabs">
          <button class="modal-tab active" data-tab="login">登入</button>
          <button class="modal-tab" data-tab="register">加入會員</button>
        </div>
        <p class="auth-error" id="auth-error" hidden></p>
        <form class="auth-form" id="login-form">
          <div class="form-group"><label>帳號</label><input type="text" id="login-username" autocomplete="username" required /></div>
          <div class="form-group"><label>密碼</label><input type="password" id="login-password" autocomplete="current-password" required /></div>
          <button type="submit" class="form-submit">登入</button>
        </form>
        <form class="auth-form" id="register-form" style="display:none">
          <div class="form-group"><label>帳號</label><input type="text" id="reg-username" autocomplete="username" required /></div>
          <div class="form-group"><label>Email（選填）</label><input type="email" id="reg-email" autocomplete="email" /></div>
          <div class="form-group"><label>密碼</label><input type="password" id="reg-password" autocomplete="new-password" required /></div>
          <button type="submit" class="form-submit">建立帳號</button>
        </form>
      </div>
    </div>

    <div class="drawer-overlay" id="cart-overlay">
      <div class="cart-drawer">
        <div class="drawer-header">
          <h3>購物車</h3>
          <button class="modal-x" id="cart-close">✕</button>
        </div>
        <div class="drawer-body" id="cart-body"></div>
        <div class="drawer-footer">
          <span class="cart-total-text" id="cart-total"></span>
          <button class="btn-accent" id="go-checkout" hidden>前往結帳</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="checkout-overlay" style="display:none">
      <div class="modal checkout-modal">
        <button class="modal-x" id="checkout-close">✕</button>
        <h3 class="modal-title">確認訂單</h3>
        <div class="checkout-items" id="checkout-items"></div>
        <div class="checkout-total" id="checkout-total"></div>
        <div class="modal-actions">
          <button class="btn-accent" id="confirm-order">確認結帳</button>
          <button class="btn-ghost"  id="cancel-order">取消</button>
        </div>
      </div>
    </div>
  `);
}

// ── Auth Modal ───────────────────────────────────────────
function showAuthModal(tab = 'login') {
  document.getElementById('auth-overlay').classList.add('visible');
  switchTab(tab);
}
function hideAuthModal() {
  document.getElementById('auth-overlay').classList.remove('visible');
  setAuthErr('');
}
function switchTab(tab) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.getElementById('login-form').style.display    = tab === 'login'    ? '' : 'none';
  document.getElementById('register-form').style.display = tab === 'register' ? '' : 'none';
  setAuthErr('');
}
function setAuthErr(msg) {
  const el = document.getElementById('auth-error');
  if (!el) return;
  el.textContent = msg;
  msg ? el.removeAttribute('hidden') : el.setAttribute('hidden','');
}

// ── Cart Drawer ──────────────────────────────────────────
function showCartDrawer() { renderCart(); document.getElementById('cart-overlay').classList.add('visible'); }
function hideCartDrawer() { document.getElementById('cart-overlay').classList.remove('visible'); }

function renderCart() {
  const body  = document.getElementById('cart-body');
  const totEl = document.getElementById('cart-total');
  const goBtn = document.getElementById('go-checkout');
  if (!body) return;

  if (!currentUser) {
    body.innerHTML = `<div class="cart-empty"><p>請先登入才能使用購物車</p><button class="btn-accent" onclick="hideCartDrawer();showAuthModal()">前往登入</button></div>`;
    if (totEl) totEl.textContent = '';
    goBtn?.setAttribute('hidden','');
    return;
  }
  if (!cartItems.length) {
    body.innerHTML = '<div class="cart-empty"><p>購物車是空的</p></div>';
    if (totEl) totEl.textContent = '';
    goBtn?.setAttribute('hidden','');
    return;
  }
  const total = cartItems.reduce((s,i) => s + parseInt(i.price.replace(/[^\d]/g,'')) * i.quantity, 0);
  body.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <img src="${item.img}" class="cart-item-img" alt="${item.name}" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${item.price}</div>
      </div>
      <div class="cart-qty">
        <button class="qty-btn" data-action="dec" data-id="${item.id}" data-qty="${item.quantity}">−</button>
        <span>${item.quantity}</span>
        <button class="qty-btn" data-action="inc" data-id="${item.id}" data-qty="${item.quantity}">+</button>
      </div>
      <button class="cart-remove" data-id="${item.id}">✕</button>
    </div>`).join('');
  if (totEl) totEl.textContent = `合計 NT$ ${total.toLocaleString()}`;
  goBtn?.removeAttribute('hidden');
}

// ── Checkout Modal ───────────────────────────────────────
function showCheckoutModal() {
  if (!cartItems.length) return;
  const total = cartItems.reduce((s,i) => s + parseInt(i.price.replace(/[^\d]/g,'')) * i.quantity, 0);
  const el = document.getElementById('checkout-items');
  const tl = document.getElementById('checkout-total');
  if (el) el.innerHTML = cartItems.map(i => `
    <div class="checkout-row">
      <img src="${i.img}" class="checkout-thumb" alt="${i.name}" />
      <span class="checkout-row-name">${i.name}</span>
      <span class="checkout-row-qty">× ${i.quantity}</span>
      <span class="checkout-row-price">${i.price}</span>
    </div>`).join('');
  if (tl) tl.textContent = `總計 NT$ ${total.toLocaleString()}`;
  const ov = document.getElementById('checkout-overlay');
  if (ov) { ov.style.display = ''; ov.classList.add('visible'); }
}
function hideCheckoutModal() {
  document.getElementById('checkout-overlay')?.classList.remove('visible');
}

// ── Global Events ────────────────────────────────────────
function setupEvents() {
  document.addEventListener('click', e => {
    const addBtn = e.target.closest('.add-cart-btn');
    if (addBtn) {
      createRipple(e, addBtn);
      if (!currentUser) { showAuthModal(); showToast('請先登入才能加入購物車','error'); return; }
      dbAddToCart(parseInt(addBtn.dataset.id), addBtn.dataset.name, addBtn.dataset.price, addBtn.dataset.img);
      updateBadge();
      showToast(`✓ ${addBtn.dataset.name} 已加入購物車`);
      return;
    }
    if (e.target.closest('#cart-btn'))     { createRipple(e, e.target.closest('#cart-btn')); showCartDrawer(); return; }
    if (e.target.closest('#auth-btn'))     { showAuthModal(); return; }
    if (e.target.closest('#logout-btn'))   {
      currentUser = null; cartItems = [];
      saveSession(null); updateHeader(null);
      showToast('已登出'); return;
    }
    if (e.target.id==='auth-overlay'     || e.target.closest('#auth-close'))     { hideAuthModal(); return; }
    if (e.target.id==='cart-overlay'     || e.target.closest('#cart-close'))     { hideCartDrawer(); return; }
    if (e.target.id==='checkout-overlay' || e.target.closest('#checkout-close') || e.target.closest('#cancel-order')) { hideCheckoutModal(); return; }
    const tab = e.target.closest('.modal-tab');
    if (tab) { switchTab(tab.dataset.tab); return; }
    const qtyBtn = e.target.closest('.qty-btn');
    if (qtyBtn) {
      const newQty = parseInt(qtyBtn.dataset.qty) + (qtyBtn.dataset.action==='inc' ? 1 : -1);
      dbUpdateCart(qtyBtn.dataset.id, newQty); updateBadge(); renderCart(); return;
    }
    const rmBtn = e.target.closest('.cart-remove');
    if (rmBtn) { dbRemoveCart(rmBtn.dataset.id); updateBadge(); renderCart(); return; }
    if (e.target.closest('#go-checkout'))   { hideCartDrawer(); showCheckoutModal(); return; }
    if (e.target.closest('#confirm-order')) {
      const result = dbCheckout();
      if (result.success) {
        hideCheckoutModal(); updateBadge();
        showToast(`訂單 #${result.orderId} 已成立！感謝您的購買`);
      } else {
        showToast(result.error || '結帳失敗', 'error');
      }
      return;
    }
  });

  document.addEventListener('submit', e => {
    if (e.target.id === 'login-form') {
      e.preventDefault();
      const res = dbLogin(document.getElementById('login-username').value.trim(), document.getElementById('login-password').value);
      if (res.error) { setAuthErr(res.error); return; }
      currentUser = res.user; reloadCart(); saveSession(currentUser);
      updateHeader(currentUser); hideAuthModal();
      showToast(`歡迎回來，${currentUser.username}！`);
    }
    if (e.target.id === 'register-form') {
      e.preventDefault();
      const res = dbRegister(document.getElementById('reg-username').value.trim(), document.getElementById('reg-email').value.trim(), document.getElementById('reg-password').value);
      if (res.error) { setAuthErr(res.error); return; }
      currentUser = res.user; reloadCart(); saveSession(currentUser);
      updateHeader(currentUser); hideAuthModal();
      showToast(`歡迎加入，${currentUser.username}！`);
    }
  });
}

// ── 初始化 ───────────────────────────────────────────────
window.APP_READY = (async () => {
  const SQL = await initSqlJs({
    locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${f}`
  });

  const saved = localStorage.getItem('store_db');
  if (saved) {
    const buf = Uint8Array.from(atob(saved), c => c.charCodeAt(0));
    db = new SQL.Database(buf);
  } else {
    db = new SQL.Database();
  }

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email    TEXT DEFAULT '',
      phone    TEXT DEFAULT '',
      address  TEXT DEFAULT '',
      password TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS cart_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      price TEXT NOT NULL,
      img TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      total INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'completed',
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      price TEXT NOT NULL,
      img TEXT NOT NULL,
      quantity INTEGER NOT NULL
    );
  `);
  // Migration：舊資料庫補欄位（已存在時 catch 忽略）
  try { db.run("ALTER TABLE users ADD COLUMN phone   TEXT DEFAULT ''"); } catch {}
  try { db.run("ALTER TABLE users ADD COLUMN address TEXT DEFAULT ''"); } catch {}
  saveDB();

  injectModals();

  currentUser = loadSession();
  if (currentUser) reloadCart();
  updateHeader(currentUser);
  setupEvents();

  document.dispatchEvent(new Event('app-ready'));
})();
