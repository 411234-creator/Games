# API 集成指南

本文檔詳細説明如何為 DnD TRPG 配置和使用各種 AI API。

## 目錄

1. [OpenAI ChatGPT (推薦)](#openai)
2. [HuggingFace API](#huggingface)
3. [自定義 API](#custom-api)
4. [離線模式](#offline)
5. [常見問題](#faq)
6. [成本估計](#costs)

## OpenAI ChatGPT (推薦) {#openai}

OpenAI 的 ChatGPT 提供最佳的故事生成質量。

### 設置步驟

#### 1. 創建 OpenAI 帳戶
1. 訪問 [OpenAI 平台](https://platform.openai.com)
2. 點擊「Sign up」或「Log in」
3. 使用 Google、Microsoft 或郵箱註冊
4. 驗證你的電子郵件
5. 添加支付方式（信用卡）

#### 2. 生成 API 密鑰
1. 登錄到 OpenAI 儀表板
2. 進入「API keys」部分
3. 點擊「Create new secret key」
4. 複製密鑰（不要分享給任何人！）
   - 格式：`sk-...`

#### 3. 在遊戲中配置
1. 打開 DnD TRPG 遊戲
2. 點擊「設置」(⚙️)
3. 設置以下項目：
   ```
   API 提供商: OpenAI
   API 密鑰: sk-... (你的密鑰)
   ```
4. 點擊「保存設置」
5. 完成！

### 模型選擇

```javascript
// 可用模型（在 js/config.js 中更改）
CONFIG.API_DEFAULTS.model = 'gpt-3.5-turbo';  // 快速且便宜（推薦）
CONFIG.API_DEFAULTS.model = 'gpt-4';           // 更好的質量但更昂貴
```

### 成本估計

- **gpt-3.5-turbo**：~$0.0005 per 1K tokens (~0.002 USD per story response)
- **gpt-4**：~$0.03 per 1K tokens (~0.15 USD per story response)

平均每個故事回應 500 tokens。

### 安全提示

- ⚠️ 永遠不要在公開代碼中提交你的 API 密鑰
- 使用有限權限的 API 密鑰
- 定期檢查使用情況
- 設置使用限制避免意外費用

## HuggingFace API {#huggingface}

HuggingFace 提供免費和付費選項，支持各種開源模型。

### 設置步驟

#### 1. 創建 HuggingFace 帳戶
1. 訪問 [HuggingFace](https://huggingface.co)
2. 點擊「Sign Up」
3. 使用郵箱或社交媒體註冊

#### 2. 生成 API 令牌
1. 點擊右上角的個人資料
2. 進入「Settings」→「Access Tokens」
3. 點擊「New token」
4. 選擇「Read」權限
5. 複製令牌

#### 3. 在遊戲中配置
1. 打開遊戲設置
2. 設置：
   ```
   API 提供商: HuggingFace
   API 密鑰: hf_... (你的令牌)
   ```
3. 保存設置

### 推薦模型

```javascript
// 可用的開源模型
'meta-llama/Llama-2-7b-chat-hf'      // 推薦，免費
'mistralai/Mistral-7B-Instruct-v0.1' // 另一個好選擇
'tiiuae/falcon-7b-instruct'           // 高速模型
```

### 成本

- **免費版**：限制請求數，但免費
- **付費版**：基於使用情況計費

## 自定義 API {#custom-api}

如果你有自己的 API 或本地 LLM 服務器。

### 設置步驟

#### 1. API 要求

你的 API 應接受 POST 請求：

```javascript
POST /your-api-endpoint

請求體：
{
  "prompt": "故事提示詞和玩家行動",
  "max_tokens": 500,
  "temperature": 0.7
}

響應體：
{
  "text": "生成的故事文本"
  // 或使用以下任一字段
  "response": "故事",
  "result": "故事"
}
```

#### 2. 在遊戲中配置

1. 打開遊戲設置
2. 設置：
   ```
   API 提供商: 自定義 API
   API 密鑰: (可選，根據你的 API)
   API 端點: https://your-api.com/endpoint
   ```
3. 保存設置

#### 3. 示例：使用本地 Ollama

如果你在本地運行 Ollama：

```javascript
// 在設置中配置：
API 提供商: 自定義 API
API 端點: http://localhost:11434/api/generate
```

#### 4. 示例：Flask 後端

```python
# app.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.json
    prompt = data.get('prompt')
    max_tokens = data.get('max_tokens', 500)
    temperature = data.get('temperature', 0.7)
    
    # 你的 LLM 邏輯
    response_text = your_llm_function(
        prompt, 
        max_tokens, 
        temperature
    )
    
    return jsonify({
        "text": response_text
    })

if __name__ == '__main__':
    app.run(debug=False, port=5000)
```

## 離線模式 {#offline}

沒有 API 密鑰？沒問題！遊戲有內置的離線模式。

### 功能

- 預生成的故事回應
- 擲骰系統正常工作
- 角色創建和管理正常工作
- 不需要互聯網連接

### 啟用離線模式

離線模式自動啟用，當：
1. 沒有配置 API 提供商
2. API 調用失敗
3. 離線工作（無網絡）

### 局限

- 故事回應不會根據玩家行動動態變化
- 使用預定義的回應模板
- 缺乏 AI 的個性化體驗

## 常見問題 {#faq}

### Q: 哪個 API 最便宜？
A: 
- **免費**：HuggingFace（有限制）或自定義本地 LLM
- **最便宜**：OpenAI gpt-3.5-turbo (~$0.002/回應)
- **最佳質量**：OpenAI gpt-4（更昂貴但更好）

### Q: 我的 API 密鑰安全嗎？
A: 
- 存儲在瀏覽器 LocalStorage 中
- 從瀏覽器客戶端發送到 API（不經過服務器）
- 建議使用有限權限的密鑰

### Q: API 調用是否計入免費額度？
A:
- **OpenAI**：所有調用計費（免費試用除外）
- **HuggingFace**：免費版有限制，付費版計費

### Q: 如果 API 失敗怎麼辦？
A: 遊戲自動回退到離線模式，使用預設回應。

### Q: 我可以更改模型嗎？
A: 可以，編輯 `js/config.js` 中的 `CONFIG.API_DEFAULTS.model`。

## 成本估計 {#costs}

### OpenAI ChatGPT

```
使用情況：每天玩 10 個故事回應
每個回應：~500 tokens
每日成本（gpt-3.5-turbo）：$0.02
月成本：$0.60
年成本：$7.20
```

### 如何節省費用

1. **使用 gpt-3.5-turbo** 而不是 gpt-4
2. **設置使用限制** 在 OpenAI 儀表板
3. **使用 HuggingFace** 免費版本
4. **自託管本地 LLM** 完全免費

## API 測試

### 測試 OpenAI 連接

在瀏覽器控制台運行：

```javascript
// 測試 API 配置
const testMessage = [
    { 
        role: 'system', 
        content: '你是一位 D&D 遊戲大師' 
    },
    { 
        role: 'user', 
        content: '生成一個冒險開場' 
    }
];

aiGameMaster.callOpenAI(testMessage)
    .then(response => console.log('成功:', response))
    .catch(error => console.error('錯誤:', error));
```

### 檢查當前配置

```javascript
// 查看當前 API 配置
console.log(aiGameMaster.config);
```

## 故障排除

### 錯誤：「API 密鑰未設置」
- 確認已在設置中輸入 API 密鑰
- 確認密鑰格式正確
- 確認已點擊「保存設置」

### 錯誤：「API 調用失敗」
- 檢查網絡連接
- 驗證 API 密鑰有效
- 檢查 API 帳戶是否有足夠餘額（OpenAI）
- 查看瀏覽器控制台（F12）的詳細錯誤

### 錯誤：「CORS 錯誤」
- 這通常意味著 API 不支持跨域請求
- 嘗試使用代理服務或自定義後端

### API 回應緩慢
- 這很正常，AI 生成需要時間
- 降低 `max_tokens` 值以加快速度
- 考慮使用更快的模型

## 推薦配置

### 預算選項
```
API 提供商: OpenAI
模型: gpt-3.5-turbo
temperature: 0.7
max_tokens: 500
月成本: < $2
```

### 質量優先
```
API 提供商: OpenAI
模型: gpt-4
temperature: 0.8
max_tokens: 800
月成本: ~$10+
```

### 完全免費
```
API 提供商: 自定義 API
使用本地 Ollama 或其他開源 LLM
成本: 0（需要計算資源）
```

---

**需要幫助？** 查看主 README.md 或在瀏覽器控制台檢查錯誤信息。

**提示：** 定期檢查你的 API 使用情況，避免意外費用！💰
