/**
 * DnD TRPG - API 集成系統
 */

class AIGameMaster {
    constructor() {
        this.config = this.loadConfig();
        this.conversationHistory = [];
    }

    /**
     * 加載 API 配置
     */
    loadConfig() {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.API_CONFIG);
        return saved ? JSON.parse(saved) : CONFIG.API_DEFAULTS;
    }

    /**
     * 保存 API 配置
     */
    saveConfig(config) {
        this.config = config;
        localStorage.setItem(CONFIG.STORAGE_KEYS.API_CONFIG, JSON.stringify(config));
    }

    /**
     * 設置 API 密鑰
     */
    setAPIKey(key) {
        this.config.apiKey = key;
        this.saveConfig(this.config);
    }

    /**
     * 生成遊戲大師提示詞
     */
    generateSystemPrompt(character, story) {
        return `你是一位經驗豐富的 D&D 遊戲大師（Game Master, GM）。你的角色是引導並描述一個奇幻冒險故事。

角色信息：
- 名稱：${character.name}
- 種族：${CONFIG.RACES[character.race]?.name}
- 職業：${CONFIG.CLASSES[character.class]?.name}
- 等級：${character.level}

故事背景：
${story?.description || '在一個奇幻的冒險中'}

你的責任：
1. 根據玩家的行動生成詳細、引人入勝的故事描述
2. 描述環境、敵人和情況
3. 根據玩家的屬性和技能公平地判斷行動結果
4. 提供有趣且沉浸式的遊戲體驗
5. 當玩家提出創意行動時要保持開放態度
6. 回應應該包含：
   - 故事描述（2-3 句）
   - 結果判定（成功/失敗/部分成功）
   - 可能的後續選項（3-4 項）

保持繁體中文回應，語氣應該是引人入勝且冒險的。`;
    }

    /**
     * 調用 OpenAI API
     */
    async callOpenAI(messages) {
        if (!this.config.apiKey) {
            throw new Error('API 密鑰未設置');
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify({
                model: this.config.model || 'gpt-3.5-turbo',
                messages: messages,
                temperature: this.config.temperature || 0.7,
                max_tokens: this.config.max_tokens || 500
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`API 錯誤: ${error.error?.message || '未知錯誤'}`);
        }

        const data = await response.json();
        return data.choices[0]?.message?.content || '';
    }

    /**
     * 調用 HuggingFace API
     */
    async callHuggingFace(prompt) {
        if (!this.config.apiKey) {
            throw new Error('API 密鑰未設置');
        }

        const response = await fetch(
            'https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf',
            {
                headers: { Authorization: `Bearer ${this.config.apiKey}` },
                method: 'POST',
                body: JSON.stringify({
                    inputs: prompt,
                    parameters: {
                        max_new_tokens: this.config.max_tokens || 500,
                        temperature: this.config.temperature || 0.7
                    }
                })
            }
        );

        if (!response.ok) {
            throw new Error('HuggingFace API 調用失敗');
        }

        const data = await response.json();
        return data[0]?.generated_text || '';
    }

    /**
     * 調用自定義 API
     */
    async callCustomAPI(prompt) {
        if (!this.config.apiEndpoint) {
            throw new Error('自定義 API 端點未設置');
        }

        const response = await fetch(this.config.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey || ''}`
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: this.config.max_tokens || 500,
                temperature: this.config.temperature || 0.7
            })
        });

        if (!response.ok) {
            throw new Error('自定義 API 調用失敗');
        }

        const data = await response.json();
        return data.text || data.response || data.result || '';
    }

    /**
     * 生成故事回應
     */
    async generateStoryResponse(character, action, story) {
        try {
            const systemPrompt = this.generateSystemPrompt(character, story);
            
            let response = '';

            if (this.config.provider === 'openai') {
                const messages = [
                    { role: 'system', content: systemPrompt },
                    ...this.conversationHistory,
                    { role: 'user', content: action }
                ];
                response = await this.callOpenAI(messages);
            } else if (this.config.provider === 'huggingface') {
                const prompt = `${systemPrompt}\n\n玩家行動：${action}`;
                response = await this.callHuggingFace(prompt);
            } else if (this.config.provider === 'custom') {
                const prompt = `${systemPrompt}\n\n玩家行動：${action}`;
                response = await this.callCustomAPI(prompt);
            } else {
                // 離線模式 - 使用預設回應
                response = this.generateOfflineResponse(character, action, story);
            }

            // 保存到對話歷史
            this.conversationHistory.push({ role: 'user', content: action });
            this.conversationHistory.push({ role: 'assistant', content: response });

            return response;
        } catch (error) {
            console.error('生成故事回應錯誤:', error);
            throw error;
        }
    }

    /**
     * 離線模式 - 生成預設回應
     */
    generateOfflineResponse(character, action, story) {
        const responses = [
            `${character.name} 做出了一個大膽的行動：${action}。
            
你擲出了一個 d20... 結果是 ${Math.floor(Math.random() * 20) + 1}！
根據你的 ${character.class} 技能，這個行動...（部分成功）

會發生什麼呢？你可以選擇：
1. 查看結果並繼續
2. 嘗試不同的策略
3. 尋求隊友幫助`,

            `在這個關鍵時刻，${character.name} 的 ${character.class} 經驗派上了用場。

你的行動引發了一系列事件...
掌握了主動權，你現在可以：
1. 追擊敵人
2. 幫助同伴
3. 調查周圍環境`,

            `${character.name} 的行動引起了重大的轉變！

這是一個決定性的時刻。${character.class} 的你意識到...
接下來你想：
1. 繼續進攻
2. 使用特殊技能
3. 尋找逃生路線`,

            `一個有趣的轉折出現了！

${character.name} 的${character.class}技能在這裡發揮了關鍵作用。
結果：(成功！)

現在擺在你面前的是：
1. 收集戰利品
2. 救援被困者
3. 揭露神秘真相`
        ];

        return responses[Math.floor(Math.random() * responses.length)];
    }

    /**
     * 清除對話歷史
     */
    clearHistory() {
        this.conversationHistory = [];
    }
}

// 全局 AI 遊戲大師實例
const aiGameMaster = new AIGameMaster();
window.aiGameMaster = aiGameMaster;
window.AIGameMaster = AIGameMaster;
