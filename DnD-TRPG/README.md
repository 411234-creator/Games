# DnD TRPG - 冒險之書

一個基於 HTML5 的 D&D 風格 TRPG（角色扮演遊戲）引擎，集成了 AI API 支持以實現動態故事生成。

## 功能特性

### 🎮 核心遊戲功能
- **角色創建系統**：完整的 D&D 5th Edition 風格角色創建
  - 8 種種族可選（人類、精靈、矮人等）
  - 12 種職業可選（戰士、法師、聖騎士等）
  - 6 大屬性系統（力量、敏捷、體質、智力、感知、魅力）
  - 自動計算生命值、護甲等級等遊戲數值

- **動態故事系統**
  - 3 個預設故事場景
  - AI 動力的故事生成
  - 玩家行動影響故事發展
  - 完整的冒險日誌記錄

- **擲骰系統**
  - 標準 d20 擲骰
  - dXd 多次擲骰支持
  - 複雜表達式計算（如 3d6+5）

### 🤖 AI 集成
支持多個 AI 提供商：
- **OpenAI ChatGPT** - 推薦方案
- **HuggingFace** - 開源 LLM
- **自定義 API** - 支持自定義端點
- **離線模式** - 沒有 API 時可使用預設回應

### 💾 數據管理
- 本地存儲 (LocalStorage)
- 自動保存遊戲進度
- 數據導出備份
- 多角色管理

## 安裝與使用

### 快速開始

1. **打開遊戲**
   - 在瀏覽器中打開 `index.html`
   - 或通過本地 Web 服務器運行（推薦）

2. **配置 API（可選但推薦）**
   - 點擊「設置」
   - 選擇你的 API 提供商
   - 輸入你的 API 密鑰
   - 保存設置

3. **創建角色**
   - 點擊「新建角色」
   - 填寫角色信息
   - 選擇種族和職業
   - 分配屬性點數（使用「擲骰分配」或手動設置）
   - 保存角色

4. **開始遊戲**
   - 點擊「開始冒險」
   - 選擇一個故事
   - 與遊戲大師互動，描述你的行動

### API 設置指南

#### OpenAI ChatGPT（推薦）

1. 訪問 [OpenAI API](https://platform.openai.com)
2. 創建帳戶並生成 API 密鑰
3. 在遊戲設置中填入密鑰
4. 確保帳戶有足夠的配額

```
API 提供商: OpenAI
API 密鑰: sk-...（你的密鑰）
```

#### HuggingFace

1. 訪問 [HuggingFace](https://huggingface.co)
2. 創建帳戶並生成 API 令牌
3. 在遊戲設置中填入令牌

```
API 提供商: HuggingFace
API 密鑰: hf_...（你的令牌）
```

#### 自定義 API

如果你有自己的 API 端點：

```
API 提供商: 自定義 API
API 密鑰: （如需要）
API 端點: https://你的.api/endpoint
```

自定義 API 應接受 POST 請求，格式如下：
```json
{
  "prompt": "故事提示詞",
  "max_tokens": 500,
  "temperature": 0.7
}
```

響應格式應包含：
```json
{
  "text": "生成的故事文本",
  "response": "或使用 response 字段"
}
```

## 目錄結構

```
DnD-TRPG/
├── index.html           # 主頁面文件
├── css/
│   └── styles.css       # 所有樣式表
├── js/
│   ├── config.js        # 配置與常量
│   ├── character.js     # 角色系統
│   ├── api.js           # AI API 集成
│   ├── game.js          # 遊戲邏輯
│   └── ui.js            # UI 交互
├── data/                # 未來用於存儲數據
└── README.md            # 本文件
```

## 遊戲系統規則

### D&D 5th Edition 規則

#### 屬性修正值計算
```
修正值 = (屬性值 - 10) / 2（向下取整）
```

#### 生命值計算
```
最大生命值 = 職業基礎HP + 體質修正值 + (等級-1) × (基礎HP/2 + 體質修正值)
```

#### 護甲等級 (AC)
```
基礎 AC = 10 + 敏捷修正值
```

#### 技能檢定
```
結果 = d20 + 屬性修正值 + (精通加值？)
DC 10 為標準難度
```

### 職業特性

#### 蠻族 (Barbarian)
- HP 每級：12
- 主要屬性：力量
- 特性：高生命值，強大的近戰

#### 法師 (Wizard)
- HP 每級：6
- 主要屬性：智力
- 特性：豐富的法術選項

#### 戰士 (Fighter)
- HP 每級：10
- 主要屬性：力量
- 特性：多重攻擊，防禦專長

*（更多職業見遊戲內配置）*

### 種族特性

#### 精靈 (Elf)
- 敏捷 +2
- 視覺黑暗視覺
- 特性：敏捷且優雅

#### 矮人 (Dwarf)
- 體質 +2
- 特性：堅毅且頑強

*（更多種族見遊戲內配置）*

## 常見問題

### Q: 遊戲沒有 API 密鑰可以運行嗎？
A: 可以。遊戲有內置的離線模式，會生成預設的故事回應。但使用 AI API 能獲得更豐富的體驗。

### Q: 我的數據存儲在哪裡？
A: 所有數據都存儲在瀏覽器的 LocalStorage 中。清除瀏覽器數據會刪除所有遊戲進度。

### Q: 怎樣備份我的遊戲進度？
A: 在設置中點擊「匯出遊戲數據」以下載 JSON 備份文件。

### Q: 支持多人遊戲嗎？
A: 目前版本是單人遊戲。未來版本可能支持多人功能。

### Q: 我可以添加自己的故事嗎？
A: 可以。編輯 `js/game.js` 中的 `StoryEngine` 類的 `initializeStories` 方法。

## 自定義與擴展

### 添加新故事

編輯 `js/game.js`：

```javascript
{
    id: 'my_story',
    title: '我的故事',
    description: '故事描述...',
    difficulty: '中等',
    levelRecommendation: '2-4',
    startingScene: 'start'
}
```

### 添加新職業

編輯 `js/config.js`：

```javascript
my_class: {
    name: '自定義職業',
    description: '描述',
    hp_per_level: 8,
    primary_stat: 'str',
    saving_throws: ['str', 'con']
}
```

### 自定義 UI 樣式

編輯 `css/styles.css` 中的顏色變量：

```css
:root {
    --primary-color: #8B4513;
    --accent-color: #FFD700;
    /* ... 更多變量 */
}
```

## 技術棧

- **前端框架**：Vanilla JavaScript (ES6+)
- **存儲**：Browser LocalStorage API
- **UI/UX**：Custom CSS3
- **API 集成**：Fetch API
- **相容性**：所有現代瀏覽器（Chrome、Firefox、Safari、Edge）

## 浏覽器要求

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 性能優化

- 輕量級：無外部依賴
- 快速加載：純靜態文件
- 離線支持：基本遊戲可離線進行
- 自動保存：每 30 秒保存遊戲狀態

## 許可證

此專案為個人學習和娛樂項目。
D&D 是 Wizards of the Coast 的商標。

## 致謝

感謝所有測試和反饋的貢獻者。

## 聯絡與支持

遇到問題或有建議？
- 檢查 FAQ 部分
- 查看瀏覽器控制台（F12）尋找錯誤信息
- 確保 JavaScript 已啟用

## 更新日誌

### v1.0.0 (2025-12-30)
- 初始版本發佈
- 基本角色創建系統
- AI API 集成
- 故事引擎
- 擲骰系統
- 數據持久化

---

**祝你玩得愉快！願你的冒險充滿驚喜與成就！** ⚔️🎲✨
