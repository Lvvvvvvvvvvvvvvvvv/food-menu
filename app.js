// ========== 数据管理 ==========
const DB_KEY = 'food_menu_data';

// 获取数据
function getData() {
  const data = localStorage.getItem(DB_KEY);
  return data ? JSON.parse(data) : { orders: [], customDishes: [] };
}

// 保存数据
function saveData(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

// 获取所有菜品（包括自定义）
function getAllDishes() {
  const data = getData();
  return [...DISHES_DATA, ...data.customDishes];
}

// ========== 页面初始化 ==========
let selectedDishes = new Map(); // id -> {dish, note}
let currentCategory = '全部';

document.addEventListener('DOMContentLoaded', () => {
  initDate();
  renderCategories();
  renderDishes();
  bindEvents();
});

// 显示日期
function initDate() {
  const now = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  document.getElementById('today-date').textContent = now.toLocaleDateString('zh-CN', options);
}

// 渲染分类标签
function renderCategories() {
  const categories = ['全部', ...CATEGORIES];
  const container = document.getElementById('category-tabs');
  
  container.innerHTML = categories.map(cat => `
    <button class="category-tab ${cat === currentCategory ? 'active' : ''}" data-category="${cat}">
      ${cat}
    </button>
  `).join('');
}

// 渲染菜品列表
function renderDishes() {
  const dishes = getAllDishes();
  const filtered = currentCategory === '全部' 
    ? dishes 
    : dishes.filter(d => d.category === currentCategory);
  
  const container = document.getElementById('dishes-container');
  
  container.innerHTML = filtered.map(dish => `
    <div class="dish-card ${selectedDishes.has(dish.id) ? 'selected' : ''}" data-id="${dish.id}">
      <img class="dish-image" src="${dish.image}" alt="${dish.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 text-anchor=%22middle%22 font-size=%2230%22>🍽️</text></svg>'">
      <div class="dish-info">
        <div class="dish-name">${dish.name}</div>
        <div class="dish-desc">${dish.desc}</div>
        <div class="dish-tags">
          ${dish.tags.map(tag => `<span class="dish-tag">${tag}</span>`).join('')}
        </div>
        <textarea class="note-input" placeholder="备注：比如少辣、不要葱..." data-note-id="${dish.id}">${selectedDishes.get(dish.id)?.note || ''}</textarea>
      </div>
    </div>
  `).join('');
  
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🍽️</div>
        <p>暂无菜品</p>
      </div>
    `;
  }
}

// 绑定事件
function bindEvents() {
  // 分类切换
  document.getElementById('category-tabs').addEventListener('click', (e) => {
    if (e.target.classList.contains('category-tab')) {
      currentCategory = e.target.dataset.category;
      renderCategories();
      renderDishes();
    }
  });
  
  // 菜品选择
  document.getElementById('dishes-container').addEventListener('click', (e) => {
    const card = e.target.closest('.dish-card');
    if (card && !e.target.classList.contains('note-input')) {
      const id = parseInt(card.dataset.id);
      toggleDish(id);
    }
  });
  
  // 备注输入
  document.getElementById('dishes-container').addEventListener('input', (e) => {
    if (e.target.classList.contains('note-input')) {
      const id = parseInt(e.target.dataset.noteId);
      if (selectedDishes.has(id)) {
        const item = selectedDishes.get(id);
        item.note = e.target.value;
        selectedDishes.set(id, item);
      }
    }
  });
  
  // 清空
  document.getElementById('clear-btn').addEventListener('click', () => {
    selectedDishes.clear();
    updateSelectedPanel();
    renderDishes();
  });
  
  // 提交
  document.getElementById('submit-btn').addEventListener('click', submitOrder);
  
  // 成功弹窗确认
  document.getElementById('ok-btn').addEventListener('click', () => {
    document.getElementById('success-modal').classList.remove('show');
    showHistoryPage();
  });
  
  // 历史入口（通过 header 点击）
  document.querySelector('.header').addEventListener('click', (e) => {
    if (e.target.classList.contains('history-btn') || e.target.closest('.history-btn')) {
      showHistoryPage();
    }
  });
  
  // 返回点菜
  document.getElementById('back-to-menu').addEventListener('click', showMenuPage);
}

// 切换菜品选择
function toggleDish(id) {
  const dishes = getAllDishes();
  const dish = dishes.find(d => d.id === id);
  
  if (selectedDishes.has(id)) {
    selectedDishes.delete(id);
  } else {
    selectedDishes.set(id, { dish, note: '' });
  }
  
  updateSelectedPanel();
  renderDishes();
}

// 更新已选面板
function updateSelectedPanel() {
  const panel = document.getElementById('selected-panel');
  const count = document.getElementById('selected-count');
  const list = document.getElementById('selected-list');
  
  count.textContent = selectedDishes.size;
  
  if (selectedDishes.size > 0) {
    panel.classList.add('show');
    list.innerHTML = Array.from(selectedDishes.values()).map(item => `
      <div class="selected-item">
        <span>${item.dish.name}</span>
        ${item.note ? `<span class="selected-item-note">(${item.note})</span>` : ''}
      </div>
    `).join('');
  } else {
    panel.classList.remove('show');
  }
}

// 提交订单
function submitOrder() {
  if (selectedDishes.size === 0) {
    alert('请先选择菜品哦~');
    return;
  }
  
  const data = getData();
  const order = {
    id: Date.now(),
    date: new Date().toISOString(),
    dishes: Array.from(selectedDishes.values()).map(item => ({
      name: item.dish.name,
      note: item.note
    }))
  };
  
  data.orders.unshift(order);
  
  // 只保留最近30天的记录
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  data.orders = data.orders.filter(o => new Date(o.date).getTime() > thirtyDaysAgo);
  
  saveData(data);
  
  // 清空选择
  selectedDishes.clear();
  updateSelectedPanel();
  renderDishes();
  
  // 显示成功弹窗
  document.getElementById('success-modal').classList.add('show');
}

// ========== 页面切换 ==========
function showHistoryPage() {
  document.getElementById('menu-page').classList.remove('active');
  document.getElementById('history-page').classList.add('active');
  renderHistory();
}

function showMenuPage() {
  document.getElementById('history-page').classList.remove('active');
  document.getElementById('menu-page').classList.add('active');
}

// 渲染历史记录
function renderHistory() {
  const data = getData();
  const container = document.getElementById('history-list');
  
  if (data.orders.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <p>还没有点菜记录哦~</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = data.orders.map(order => {
    const date = new Date(order.date);
    const dateStr = date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short' });
    const timeStr = date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    
    return `
      <div class="history-item">
        <div class="history-date">${dateStr}</div>
        <div class="history-dishes">
          ${order.dishes.map(d => `
            <div class="history-dish">
              ${d.name}
              ${d.note ? `<div class="history-dish-note">${d.note}</div>` : ''}
            </div>
          `).join('')}
        </div>
        <div class="history-time">${timeStr}</div>
      </div>
    `;
  }).join('');
}

// 添加历史按钮到 header
document.querySelector('.header').insertAdjacentHTML('beforeend', `
  <button class="history-btn" title="查看历史">📜</button>
`);
