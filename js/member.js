function loadMemberPage() {
  const prompt  = document.getElementById('login-prompt');
  const content = document.getElementById('member-content');
  if (!prompt || !content) return;

  if (!currentUser) {
    prompt.removeAttribute('hidden');
    content.setAttribute('hidden', '');
    return;
  }

  prompt.setAttribute('hidden', '');
  content.removeAttribute('hidden');
  document.getElementById('profile-avatar').textContent = currentUser.username.charAt(0).toUpperCase();
  document.getElementById('profile-name').textContent   = currentUser.username;
  document.getElementById('profile-since').textContent  = `加入日期：${currentUser.created_at?.split(' ')[0] || '—'}`;
  document.querySelectorAll('[onclick="showAuthModal()"]').forEach(el => el.setAttribute('hidden', ''));
  document.getElementById('edit-email').value   = currentUser.email   || '';
  document.getElementById('edit-phone').value   = currentUser.phone   || '';
  document.getElementById('edit-address').value = currentUser.address || '';


  const orders  = queryAll('SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC', [currentUser.id]);
  const listEl  = document.getElementById('orders-list');
  const emptyEl = document.getElementById('orders-empty');

  if (!orders.length) {
    emptyEl?.removeAttribute('hidden');
    listEl.innerHTML = '';
    return;
  }
  emptyEl?.setAttribute('hidden', '');

  listEl.innerHTML = orders.map(order => {
    const items = queryAll('SELECT * FROM order_items WHERE order_id = ?', [order.id]);
    return `
      <div class="order-card">
        <div class="order-header">
          <div>
            <span class="order-id">訂單 #${order.id}</span>
            <span class="order-status">${order.status === 'completed' ? '已完成' : order.status}</span>
          </div>
          <div class="order-meta">
            <span class="order-date">${order.created_at}</span>
            <span class="order-total">NT$ ${parseInt(order.total).toLocaleString()}</span>
          </div>
        </div>
        <div class="order-items">
          ${items.map(item => `
            <div class="order-item">
              <img src="${item.img}" alt="${item.name}" class="order-item-img" />
              <span class="order-item-name">${item.name}</span>
              <span class="order-item-qty">× ${item.quantity}</span>
              <span class="order-item-price">${item.price}</span>
            </div>`).join('')}
        </div>
      </div>`;
  }).join('');
}


document.addEventListener('submit', e => {
  if (e.target.id !== 'profile-edit-form') return;
  e.preventDefault();
  if (!currentUser) return;

  const email   = document.getElementById('edit-email').value.trim();
  const phone   = document.getElementById('edit-phone').value.trim();
  const address = document.getElementById('edit-address').value.trim();

  runSQL('UPDATE users SET email=?, phone=?, address=? WHERE id=?', [email, phone, address, currentUser.id]);

  currentUser.email   = email;
  currentUser.phone   = phone;
  currentUser.address = address;
  saveSession(currentUser);

  const fb = document.getElementById('save-feedback');
  if (fb) {
    fb.removeAttribute('hidden');
    setTimeout(() => fb.setAttribute('hidden', ''), 2000);
  }
  showToast('個人資料已更新');
});


document.addEventListener('click', e => {
  if (e.target.closest('#logout-btn')) setTimeout(() => loadMemberPage(), 0);
});

document.addEventListener('submit', e => {
  if (e.target.id === 'login-form' || e.target.id === 'register-form') {
    setTimeout(() => loadMemberPage(), 100);
  }
});

window.APP_READY.then(() => loadMemberPage());
