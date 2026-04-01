// 菜品数据库
const DISHES_DATA = [
  // === 荤菜 ===
  {
    id: 1,
    name: "红烧肉",
    category: "荤菜",
    desc: "肥而不腻，入口即化，经典家常菜",
    tags: ["下饭", "经典"],
    image: "https://images.unsplash.com/photo-1623689046286-01c8af040127?w=200&h=200&fit=crop"
  },
  {
    id: 2,
    name: "糖醋排骨",
    category: "荤菜",
    desc: "酸甜可口，外酥里嫩",
    tags: ["酸甜", "下饭"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop"
  },
  {
    id: 3,
    name: "可乐鸡翅",
    category: "荤菜",
    desc: "甜香浓郁，肉质鲜嫩",
    tags: ["甜口", "简单"],
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=200&h=200&fit=crop"
  },
  {
    id: 4,
    name: "宫保鸡丁",
    category: "荤菜",
    desc: "麻辣鲜香，花生酥脆",
    tags: ["辣", "川味"],
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=200&h=200&fit=crop"
  },
  {
    id: 5,
    name: "红烧鸡翅",
    category: "荤菜",
    desc: "色泽红亮，味道浓郁",
    tags: ["下饭", "经典"],
    image: "https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=200&h=200&fit=crop"
  },
  {
    id: 6,
    name: "鱼香肉丝",
    category: "荤菜",
    desc: "酸甜微辣，鱼香味浓",
    tags: ["下饭", "川味"],
    image: "https://images.unsplash.com/photo-1606851094291-6efae152bb87?w=200&h=200&fit=crop"
  },
  {
    id: 7,
    name: "回锅肉",
    category: "荤菜",
    desc: "肥瘦相间，豆瓣酱香",
    tags: ["辣", "川味"],
    image: "https://images.unsplash.com/photo-1623689046286-01c8af040127?w=200&h=200&fit=crop"
  },
  {
    id: 8,
    name: "小炒肉",
    category: "荤菜",
    desc: "青椒配五花肉，鲜香下饭",
    tags: ["辣", "下饭"],
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop"
  },
  {
    id: 9,
    name: "土豆牛腩",
    category: "荤菜",
    desc: "软烂入味，土豆绵糯",
    tags: ["炖菜", "下饭"],
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop"
  },
  {
    id: 10,
    name: "啤酒鸭",
    category: "荤菜",
    desc: "酒香浓郁，鸭肉软烂",
    tags: ["炖菜", "特色"],
    image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=200&h=200&fit=crop"
  },
  
  // === 素菜 ===
  {
    id: 11,
    name: "酸辣土豆丝",
    category: "素菜",
    desc: "清脆爽口，酸辣开胃",
    tags: ["快手", "经典"],
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200&h=200&fit=crop"
  },
  {
    id: 12,
    name: "蒜蓉西兰花",
    category: "素菜",
    desc: "清香爽脆，营养健康",
    tags: ["健康", "清淡"],
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200&h=200&fit=crop"
  },
  {
    id: 13,
    name: "手撕包菜",
    category: "素菜",
    desc: "爽脆可口，简单美味",
    tags: ["快手", "下饭"],
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200&h=200&fit=crop"
  },
  {
    id: 14,
    name: "清炒时蔬",
    category: "素菜",
    desc: "新鲜蔬菜，清淡健康",
    tags: ["健康", "清淡"],
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200&h=200&fit=crop"
  },
  {
    id: 15,
    name: "干煸四季豆",
    category: "素菜",
    desc: "外皮微皱，香辣入味",
    tags: ["辣", "下饭"],
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200&h=200&fit=crop"
  },
  {
    id: 16,
    name: "地三鲜",
    category: "素菜",
    desc: "茄子土豆青椒，经典东北菜",
    tags: ["经典", "下饭"],
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?w=200&h=200&fit=crop"
  },
  {
    id: 17,
    name: "番茄炒蛋",
    category: "素菜",
    desc: "酸甜可口，经典家常",
    tags: ["快手", "经典"],
    image: "https://images.unsplash.com/photo-1482049016gy-2d3d13f5c33g?w=200&h=200&fit=crop"
  },
  {
    id: 18,
    name: "麻婆豆腐",
    category: "素菜",
    desc: "麻辣鲜香，嫩滑入味",
    tags: ["辣", "川味"],
    image: "https://images.unsplash.com/photo-1582576163090-09d3b6f8a969?w=200&h=200&fit=crop"
  },
  
  // === 汤品 ===
  {
    id: 19,
    name: "番茄蛋花汤",
    category: "汤品",
    desc: "酸甜开胃，简单快手",
    tags: ["快手", "清淡"],
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=200&fit=crop"
  },
  {
    id: 20,
    name: "紫菜蛋花汤",
    category: "汤品",
    desc: "鲜美清爽，营养丰富",
    tags: ["快手", "健康"],
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=200&fit=crop"
  },
  {
    id: 21,
    name: "冬瓜排骨汤",
    category: "汤品",
    desc: "清淡滋补，清热解暑",
    tags: ["炖菜", "清淡"],
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=200&fit=crop"
  },
  {
    id: 22,
    name: "玉米排骨汤",
    category: "汤品",
    desc: "鲜甜浓郁，营养美味",
    tags: ["炖菜", "滋补"],
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=200&h=200&fit=crop"
  },
  {
    id: 23,
    name: "酸菜鱼",
    category: "汤品",
    desc: "酸辣鲜香，鱼肉嫩滑",
    tags: ["辣", "特色"],
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=200&h=200&fit=crop"
  },
  
  // === 主食 ===
  {
    id: 24,
    name: "蛋炒饭",
    category: "主食",
    desc: "粒粒分明，金黄诱人",
    tags: ["快手", "经典"],
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop"
  },
  {
    id: 25,
    name: "阳春面",
    category: "主食",
    desc: "清淡鲜香，简单美味",
    tags: ["快手", "清淡"],
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop"
  },
  {
    id: 26,
    name: "西红柿鸡蛋面",
    category: "主食",
    desc: "酸甜可口，开胃解馋",
    tags: ["快手", "经典"],
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop"
  },
  {
    id: 27,
    name: "饺子",
    category: "主食",
    desc: "皮薄馅大，蘸醋更香",
    tags: ["节日", "经典"],
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=200&h=200&fit=crop"
  },
  
  // === 凉菜 ===
  {
    id: 28,
    name: "凉拌黄瓜",
    category: "凉菜",
    desc: "清脆爽口，开胃解腻",
    tags: ["快手", "爽口"],
    image: "https://images.unsplash.com/photo-1604709255526-6ac94d523de7?w=200&h=200&fit=crop"
  },
  {
    id: 29,
    name: "凉拌木耳",
    category: "凉菜",
    desc: "爽脆开胃，营养丰富",
    tags: ["健康", "爽口"],
    image: "https://images.unsplash.com/photo-1604709255526-6ac94d523de7?w=200&h=200&fit=crop"
  },
  {
    id: 30,
    name: "皮蛋豆腐",
    category: "凉菜",
    desc: "嫩滑爽口，下饭神器",
    tags: ["快手", "下饭"],
    image: "https://images.unsplash.com/photo-1604709255526-6ac94d523de7?w=200&h=200&fit=crop"
  }
];

// 获取所有分类
const CATEGORIES = [...new Set(DISHES_DATA.map(d => d.category))];

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { DISHES_DATA, CATEGORIES };
}
