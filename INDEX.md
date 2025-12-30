# 📚 DnD TRPG - 完整文件索引

## 🎮 遊戲文件

### 核心應用
- **[index.html](index.html)** (303 行)
  - 遊戲主頁面
  - 包含所有 UI 元素
  - 遊戲入口點

### 樣式
- **[css/styles.css](css/styles.css)** (700+ 行)
  - 完整遊戲視覺樣式
  - D&D 主題設計
  - 響應式布局
  - 動畫和過渡

### JavaScript 代碼
- **[js/config.js](js/config.js)**
  - 遊戲配置和常量
  - 種族定義（8 種）
  - 職業定義（12 種）
  - 技能列表（18 種）
  - 預設故事
  - API 設置默認值

- **[js/character.js](js/character.js)** (300+ 行)
  - Character 類定義
  - 角色創建邏輯
  - 屬性計算
  - CharacterManager 類
  - 數據持久化

- **[js/api.js](js/api.js)** (300+ 行)
  - AIGameMaster 類
  - OpenAI 集成
  - HuggingFace 集成
  - 自定義 API 支持
  - 離線模式
  - API 配置管理

- **[js/game.js](js/game.js)** (400+ 行)
  - GameState 類
  - StoryEngine 類
  - EncounterGenerator 類
  - DiceRoller 類
  - 遊戲邏輯
  - 故事管理

- **[js/ui.js](js/ui.js)** (600+ 行)
  - UI 交互函數
  - 屏幕管理
  - 按鈕事件處理
  - 通知系統
  - 角色創建 UI
  - 冒險遊戲 UI
  - 設置管理

---

## 📖 文檔文件

### 入門指南
- **[START.txt](START.txt)** ⭐ 最先讀這個
  - 快速開始（3 步）
  - 項目結構概覽
  - AI 配置簡介
  - 常見問題快速答案
  - 系統要求

- **[QUICKSTART.md](QUICKSTART.md)** 
  - 5 分鐘快速入門
  - 逐步操作指南
  - AI 設置詳細步驟
  - 遊戲流程示例
  - 初手建議
  - 故障排除

### 主文檔
- **[README.md](README.md)** 📘 最完整的文檔
  - 功能特性列表
  - 安裝方法
  - API 設置步驟
  - 目錄結構說明
  - D&D 5e 規則說明
  - 自定義指南
  - 技術棧說明
  - 常見問題解答

### 專項指南
- **[API_GUIDE.md](API_GUIDE.md)** 🔌 API 詳細指南
  - OpenAI 設置（步驟詳細）
  - HuggingFace 設置
  - 自定義 API 說明
  - 離線模式說明
  - 成本估計
  - API 測試方法
  - 故障排除
  - 安全提示

- **[GAME_MANUAL.md](GAME_MANUAL.md)** 🎲 遊戲規則
  - D&D 5e 規則說明
  - 角色創建詳細步驟
  - 屬性系統詳解
  - 戰鬥系統
  - 技能檢定
  - 法術系統
  - 進階規則
  - 遊戲大師提示

### 項目信息
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** 
  - 項目完成報告
  - 統計數據
  - 功能清單
  - 技術棧
  - 性能信息
  - 下一步指引

- **[CHECKLIST.md](CHECKLIST.md)** ✅ 完整檢查清單
  - 項目結構驗證
  - 功能實現列表
  - 代碼質量檢查
  - 文檔完整性
  - 測試清單
  - 部署檢查
  - 性能指標

### 配置文件
- **[project.json](project.json)** 
  - 項目元數據
  - 版本信息
  - 功能列表（JSON）
  - 文件結構定義
  - 系統要求
  - 兼容性信息

---

## 🚀 啟動文件

- **[start.bat](start.bat)** 🪟 Windows
  - 自動檢測 Python/Node.js
  - 啟動本地服務器
  - 智能錯誤提示

- **[start.sh](start.sh)** 🍎🐧 Mac/Linux
  - Python 3 優先
  - 備用 Python 2
  - Node.js 備選
  - 使用說明

---

## 📁 目錄

- **[css/](css/)** - 樣式文件目錄
- **[js/](js/)** - JavaScript 代碼目錄
- **[data/](data/)** - 數據存儲目錄（未來使用）

---

## 📊 文件統計

| 類型 | 數量 | 行數 |
|------|------|------|
| HTML | 1 | ~300 |
| CSS | 1 | ~700 |
| JavaScript | 5 | ~2000 |
| Markdown | 4 | ~1500 |
| 配置 | 1 | ~100 |
| 腳本 | 2 | ~50 |
| **總計** | **14** | **~4650** |

---

## 🎯 讀取順序推薦

### 首次使用者
1. **START.txt** - 30 秒了解項目
2. **QUICKSTART.md** - 5 分鐘開始遊戲
3. **API_GUIDE.md** - 配置 AI（可選）
4. 開始遊戲！

### 深度學習者
1. **README.md** - 完整文檔
2. **GAME_MANUAL.md** - 遊戲規則
3. **PROJECT_SUMMARY.md** - 項目信息
4. 代碼注釋 - 查看實現細節

### 開發者
1. **PROJECT_SUMMARY.md** - 技術棧概覽
2. 查看代碼文件
   - 從 `config.js` 開始
   - 然後 `character.js`
   - 再看 `game.js`
   - 最後 `ui.js`
3. **CHECKLIST.md** - 功能清單

---

## 🔍 按主題查找

### 快速問題答案
- 如何開始？ → [START.txt](START.txt)
- 怎樣創建角色？ → [QUICKSTART.md](QUICKSTART.md)
- 規則如何？ → [GAME_MANUAL.md](GAME_MANUAL.md)
- API 怎麼配置？ → [API_GUIDE.md](API_GUIDE.md)
- 如何自定義？ → [README.md](README.md)

### 問題排除
- 遊戲無法加載 → [README.md](README.md) 常見問題
- API 不工作 → [API_GUIDE.md](API_GUIDE.md) 故障排除
- 數據丟失 → [QUICKSTART.md](QUICKSTART.md) 故障排除
- 遊戲崩潰 → 查看瀏覽器控制台（F12）

### 進階功能
- 添加自己的故事 → [README.md](README.md) 自定義
- 修改遊戲風格 → [README.md](README.md) 自定義
- 使用自定義 API → [API_GUIDE.md](API_GUIDE.md) 自定義 API
- 查看代碼架構 → [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

## 💾 本地文件組織

```
c:\Users\user\Documents\Games\DnD-TRPG\
│
├── 📘 文檔（按優先級）
│   ├── START.txt           (首先讀這個！)
│   ├── QUICKSTART.md       (快速開始)
│   ├── README.md           (完整文檔)
│   ├── API_GUIDE.md        (API 設置)
│   ├── GAME_MANUAL.md      (遊戲規則)
│   ├── PROJECT_SUMMARY.md  (項目信息)
│   └── CHECKLIST.md        (檢查清單)
│
├── 🎮 遊戲文件
│   ├── index.html          (主頁面)
│   ├── css/styles.css      (樣式)
│   ├── js/config.js        (配置)
│   ├── js/character.js     (角色系統)
│   ├── js/api.js           (AI 集成)
│   ├── js/game.js          (遊戲邏輯)
│   └── js/ui.js            (界面)
│
├── 🔧 啟動文件
│   ├── start.bat           (Windows)
│   ├── start.sh            (Mac/Linux)
│   └── START.txt           (開始説明)
│
├── ⚙️  配置
│   └── project.json        (項目配置)
│
└── 📁 目錄
    └── data/               (未來數據)
```

---

## 🌐 文件大小估計

| 文件 | 大小 |
|------|------|
| index.html | ~15 KB |
| css/styles.css | ~35 KB |
| js/config.js | ~8 KB |
| js/character.js | ~12 KB |
| js/api.js | ~12 KB |
| js/game.js | ~15 KB |
| js/ui.js | ~25 KB |
| 文檔總計 | ~50 KB |
| **項目總計** | **~180 KB** |

超輕量級！

---

## 🔗 文件依賴關係

```
index.html
├── css/styles.css
└── Scripts (按順序加載)
    ├── js/config.js          (配置常量)
    ├── js/character.js       (依賴: config)
    ├── js/api.js             (依賴: config)
    ├── js/game.js            (依賴: config, DiceRoller)
    └── js/ui.js              (依賴: 以上所有)
```

---

## ✨ 特殊文件

### START.txt 🌟
**最重要的文件！首先讀這個。**
- 項目快速概覽
- 3 步快速開始
- 常見問題快速答案
- 簡潔易懂

### index.html 🎮
**遊戲本身。**
- 在瀏覽器中打開此文件即可運行
- 包含所有 UI 元素
- 無需其他文件

### README.md 📘
**最完整的文檔。**
- 功能詳細說明
- 深度指南
- 進階使用方法

### API_GUIDE.md 🔌
**API 配置聖經。**
- OpenAI 詳細步驟
- 成本計算
- 故障排除

---

## 📋 快速查找表

| 我想要... | 查看這個文件 |
|---------|------------|
| 快速開始 | START.txt |
| 詳細指南 | README.md |
| 遊戲規則 | GAME_MANUAL.md |
| 設置 AI | API_GUIDE.md |
| 源代碼 | js/*.js |
| 自定義 UI | css/styles.css |
| 項目信息 | PROJECT_SUMMARY.md |
| 檢查清單 | CHECKLIST.md |

---

## 🚀 下一步

1. 讀 **START.txt**（2 分鐘）
2. 讀 **QUICKSTART.md**（5 分鐘）
3. 打開 **index.html**
4. 創建你的第一個角色
5. 開始冒險！

---

## 📞 支持資源

### 遇到問題？
1. 查看相關文檔
2. 檢查 [README.md](README.md) 常見問題
3. 在瀏覽器控制台查看錯誤（F12）
4. 查看 [API_GUIDE.md](API_GUIDE.md) 故障排除

### 想要自定義？
1. 查看 [README.md](README.md) 自定義部分
2. 編輯 `js/config.js` 添加內容
3. 編輯 `css/styles.css` 修改風格
4. 查看代碼註釋了解實現

---

**歡迎使用 DnD TRPG！祝你遊戲愉快！** 🎲⚔️✨

**版本 1.0.0 | 2025 年 12 月 30 日**
