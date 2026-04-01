// ========== 云同步服务 ==========
const REPO_OWNER = 'Lvvvvvvvvvvvvvvvvv';
const REPO_NAME = 'food-menu';
const DATA_FILE = 'data.json';

// Token 通过 URL 参数传递
const urlParams = new URLSearchParams(window.location.search);
const TOKEN = urlParams.get('token') || localStorage.getItem('food_menu_token') || '';

if (urlParams.get('token')) {
  localStorage.setItem('food_menu_token', urlParams.get('token'));
}

let cachedSha = null;

// Base64 解码（支持中文 UTF-8）
function decodeBase64(base64) {
  try {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  } catch (e) {
    console.error('Base64解码失败:', e);
    return null;
  }
}

// 从云端拉取数据
async function pullFromCloud() {
  if (!TOKEN) {
    console.log('未设置Token，跳过云同步');
    return null;
  }
  
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${DATA_FILE}`,
      { headers: { Authorization: `token ${TOKEN}` } }
    );
    
    if (res.status === 404) {
      console.log('云端数据文件不存在');
      return null;
    }
    
    const data = await res.json();
    cachedSha = data.sha;
    
    const content = decodeBase64(data.content);
    if (!content) return null;
    
    const parsed = JSON.parse(content);
    console.log('✅ 云端数据拉取成功');
    return parsed;
  } catch (e) {
    console.error('云同步拉取失败:', e);
    return null;
  }
}

// 推送数据到云端
async function pushToCloud(data) {
  if (!TOKEN) {
    console.log('未设置Token，跳过云同步');
    return;
  }
  
  try {
    const jsonStr = JSON.stringify(data, null, 2);
    const encoded = btoa(unescape(encodeURIComponent(jsonStr)));
    
    const body = {
      message: `📝 更新点菜数据 - ${new Date().toLocaleString('zh-CN')}`,
      content: encoded
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
    if (result.content) {
      cachedSha = result.content.sha;
    }
    
    console.log('✅ 云同步推送成功');
  } catch (e) {
    console.error('云同步推送失败:', e);
  }
}

// 合并本地和云端数据
function mergeData(localData, cloudData) {
  if (!cloudData) return localData;
  
  // 合并订单（按ID去重）
  const orderMap = new Map();
  [...(cloudData.orders || []), ...(localData.orders || [])].forEach(order => {
    orderMap.set(order.id, order);
  });
  
  // 按时间排序，保留最近30天
  const allOrders = Array.from(orderMap.values())
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter(o => Date.now() - new Date(o.date).getTime() < 30 * 24 * 60 * 60 * 1000);
  
  return {
    orders: allOrders,
    customDishes: cloudData.customDishes || localData.customDishes || [],
    deletedDishIds: cloudData.deletedDishIds || localData.deletedDishIds || [],
    userId: localData.userId || cloudData.userId || '吃货0000'
  };
}