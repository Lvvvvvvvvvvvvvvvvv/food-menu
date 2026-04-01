// ========== 云同步服务 ==========
const REPO_OWNER = 'Lvvvvvvvvvvvvvvvvv';
const REPO_NAME = 'food-menu';
const DATA_FILE = 'data.json';

// Token 通过 URL 参数传递，避免硬编码
const urlParams = new URLSearchParams(window.location.search);
const TOKEN = urlParams.get('token') || localStorage.getItem('food_menu_token') || '';

// 保存 token 到本地
if (urlParams.get('token')) {
  localStorage.setItem('food_menu_token', urlParams.get('token'));
}

let cachedSha = null;

// Base64 解码（支持中文）
function decodeBase64(str) {
  try {
    // 先尝试 atob
    const binary = atob(str);
    // 将二进制转为 UTF-8
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  } catch (e) {
    console.error('Base64 解码失败', e);
    return null;
  }
}

async function pullFromCloud() {
  if (!TOKEN) return null;
  
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_FILE}`,
      { headers: { Authorization: `token ${TOKEN}` } }
    );
    
    if (res.status === 404) return null;
    
    const data = await res.json();
    cachedSha = data.sha;
    
    const content = decodeBase64(data.content);
    return content ? JSON.parse(content) : null;
  } catch (e) {
    console.log('云同步拉取失败', e);
    return null;
  }
}

async function pushToCloud(data) {
  if (!TOKEN) return;
  
  try {
    const body = {
      message: `📝 更新点菜数据 - ${new Date().toLocaleString('zh-CN')}`,
      content: btoa(unescape(encodeURIComponent(JSON.stringify(data, null, 2))))
    };
    
    if (cachedSha) body.sha = cachedSha;
    
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_FILE}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `token ${TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    );
    
    const result = await res.json();
    if (result.content) cachedSha = result.content.sha;
    
    console.log('✅ 云同步成功');
  } catch (e) {
    console.log('云同步推送失败', e);
  }
}

function mergeData(localData, cloudData) {
  if (!cloudData) return localData;
  
  const orderMap = new Map();
  [...(cloudData.orders || []), ...(localData.orders || [])].forEach(order => {
    orderMap.set(order.id, order);
  });
  
  const allOrders = Array.from(orderMap.values())
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter(o => Date.now() - new Date(o.date).getTime() < 30 * 24 * 60 * 60 * 1000);
  
  return {
    orders: allOrders,
    customDishes: cloudData.customDishes || localData.customDishes || [],
    deletedDishIds: cloudData.deletedDishIds || localData.deletedDishIds || [],
    userId: localData.userId || '吃货0000'
  };
}