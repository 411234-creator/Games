/**
 * DnD TRPG - UI 交互系統
 */

/**
 * 屏幕管理
 */
function showScreen(screenId) {
    // 隱藏所有屏幕
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // 顯示指定屏幕
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');

        // 屏幕專用初始化
        if (screenId === 'characterSelect') {
            updateCharacterList();
        } else if (screenId === 'adventure') {
            initAdventureScreen();
        } else if (screenId === 'settings') {
            loadSettingsUI();
        }
    }
}

/**
 * 通知系統
 */
function showNotification(message, type = 'info') {
    const center = document.getElementById('notificationCenter');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    center.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * 加載指示器
 */
function showLoading(show = true) {
    const indicator = document.getElementById('loadingIndicator');
    if (show) {
        indicator.classList.remove('hidden');
    } else {
        indicator.classList.add('hidden');
    }
}

/**
 * 角色創建 - 擲骰
 */
function rollStats() {
    const stats = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    
    stats.forEach(stat => {
        const result = DiceRoller.rollMultiple(3, 6);
        const total = result.total;
        document.getElementById(`stat-${stat}`).value = total;
    });

    showNotification('擲骰完成！', 'success');
}

/**
 * 角色創建 - 保存角色
 */
function saveCharacter() {
    const name = document.getElementById('charName').value.trim();
    const race = document.getElementById('charRace').value;
    const charClass = document.getElementById('charClass').value;
    const background = document.getElementById('charBackground').value.trim();

    // 驗證必填字段
    if (!name) {
        showNotification('請輸入角色名稱', 'error');
        return;
    }
    if (!race) {
        showNotification('請選擇種族', 'error');
        return;
    }
    if (!charClass) {
        showNotification('請選擇職業', 'error');
        return;
    }

    // 獲取屬性
    const stats = {
        str: parseInt(document.getElementById('stat-str').value),
        dex: parseInt(document.getElementById('stat-dex').value),
        con: parseInt(document.getElementById('stat-con').value),
        int: parseInt(document.getElementById('stat-int').value),
        wis: parseInt(document.getElementById('stat-wis').value),
        cha: parseInt(document.getElementById('stat-cha').value)
    };

    // 獲取外觀
    const appearance = {
        gender: document.getElementById('charGender').value,
        hairColor: document.getElementById('charHairColor').value,
        distinguishing: document.getElementById('charDistinguishing').value
    };

    // 創建角色
    const character = characterManager.createCharacter({
        name,
        race,
        class: charClass,
        background,
        stats,
        appearance
    });

    showNotification(`角色 "${name}" 創建成功！`, 'success');
    
    // 重置表單
    document.getElementById('charName').value = '';
    document.getElementById('charRace').value = '';
    document.getElementById('charClass').value = '';
    document.getElementById('charBackground').value = '';
    
    // 返回主菜單
    setTimeout(() => showScreen('mainMenu'), 1500);
}

/**
 * 角色選擇 - 更新列表
 */
function updateCharacterList() {
    const list = document.getElementById('characterList');
    const noCharacters = document.getElementById('noCharacters');
    const characters = characterManager.getAllCharacters();

    list.innerHTML = '';

    if (characters.length === 0) {
        noCharacters.style.display = 'block';
        return;
    }

    noCharacters.style.display = 'none';

    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <h3>${character.name}</h3>
            <p><strong>種族：</strong> ${CONFIG.RACES[character.race]?.name || character.race}</p>
            <p><strong>職業：</strong> ${CONFIG.CLASSES[character.class]?.name || character.class}</p>
            <p><strong>等級：</strong> ${character.level}</p>
            <p><strong>生命值：</strong> ${character.currentHP}/${character.maxHP}</p>
            <p><strong>建立時間：</strong> ${new Date(character.createdDate).toLocaleDateString('zh-Hant')}</p>
            <div class="card-buttons">
                <button class="btn btn-primary" onclick="selectCharacter('${character.id}')">選擇</button>
                <button class="btn btn-danger" onclick="deleteCharacterConfirm('${character.id}')">刪除</button>
            </div>
        `;
        list.appendChild(card);
    });
}

/**
 * 選擇角色
 */
function selectCharacter(characterId) {
    characterManager.saveCurrentCharacter(characterId);
    showNotification('角色已選擇，進入冒險！', 'success');
    setTimeout(() => showScreen('adventure'), 1000);
}

/**
 * 刪除角色確認
 */
function deleteCharacterConfirm(characterId) {
    if (confirm('確定要刪除這個角色嗎？此操作無法撤銷。')) {
        characterManager.deleteCharacter(characterId);
        updateCharacterList();
        showNotification('角色已刪除', 'success');
    }
}

/**
 * 冒險屏幕 - 初始化
 */
function initAdventureScreen() {
    const character = characterManager.getCurrentCharacter();
    
    if (!character) {
        showNotification('請先選擇一個角色', 'error');
        showScreen('characterSelect');
        return;
    }

    // 更新角色信息欄
    const infoBar = document.getElementById('characterInfo');
    infoBar.innerHTML = `${character.name} | 等級 ${character.level} | HP ${character.currentHP}/${character.maxHP}`;

    // 初始化故事內容
    const storyContent = document.getElementById('storyContent');
    storyContent.innerHTML = `
        <h3>選擇你的冒險</h3>
        <p>選擇下面的故事開始你的冒險...</p>
        <div style="display: grid; gap: 15px; margin-top: 20px;">
    `;

    const stories = storyEngine.getAllStories();
    stories.forEach(story => {
        const button = document.createElement('button');
        button.className = 'btn btn-primary';
        button.style.textAlign = 'left';
        button.style.whiteSpace = 'normal';
        button.innerHTML = `
            <div style="flex: 1;">
                <strong>${story.title}</strong><br>
                <small>${story.description.substring(0, 60)}...</small><br>
                <small style="color: var(--secondary-color);">難度: ${story.difficulty} | 推薦等級: ${story.levelRecommendation}</small>
            </div>
        `;
        button.onclick = () => startAdventure(story.id);
        storyContent.querySelector('div').appendChild(button);
    });

    storyContent.querySelector('div').innerHTML += '</div>';

    // 更新角色卡
    updateCharacterSheet(character);

    // 清除冒險日誌
    document.getElementById('logContent').innerHTML = '';

    gameState.clearGame();
}

/**
 * 開始冒險
 */
async function startAdventure(storyId) {
    const character = characterManager.getCurrentCharacter();
    const story = storyEngine.getStory(storyId);

    if (!character || !story) {
        showNotification('無法開始冒險', 'error');
        return;
    }

    gameState.startGame(character, story);
    gameState.addLogEntry(`開始冒險: ${story.title}`);

    // 更新故事內容
    const storyContent = document.getElementById('storyContent');
    storyContent.innerHTML = `
        <h3>${story.title}</h3>
        <p>${story.description}</p>
        <hr style="margin: 20px 0; border: 1px solid var(--border-color);">
        <p id="storyResponse" style="margin-top: 20px; color: var(--accent-color);">等待遊戲大師的回應...</p>
    `;

    // 清空動作按鈕
    document.getElementById('actionButtons').innerHTML = '';

    // 生成開場
    try {
        showLoading(true);
        const response = await aiGameMaster.generateStoryResponse(
            character,
            `請開始故事: ${story.title}。我準備好冒險了！`,
            story
        );
        showLoading(false);

        document.getElementById('storyResponse').innerHTML = response;
        gameState.addLogEntry(`GM: ${response.substring(0, 50)}...`);

        // 生成動作按鈕
        generateActionButtons();
    } catch (error) {
        showLoading(false);
        showNotification(`錯誤: ${error.message}`, 'error');
        gameState.addLogEntry(`[錯誤] ${error.message}`);
    }
}

/**
 * 生成動作按鈕
 */
function generateActionButtons() {
    const actionButtons = document.getElementById('actionButtons');
    const actions = [
        { label: '向前探索', action: '我小心翼翼地向前探索。' },
        { label: '檢查周圍', action: '我仔細檢查周圍的環境。' },
        { label: '談話/互動', action: '我嘗試與遇到的人或生物交談。' },
        { label: '準備戰鬥', action: '我拔出武器準備戰鬥。' },
        { label: '使用魔法/技能', action: '我使用我的職業技能或法術。' },
        { label: '逃離/躲藏', action: '我尋找逃跑或躲藏的地方。' }
    ];

    actionButtons.innerHTML = '';
    actions.forEach(act => {
        const button = document.createElement('button');
        button.className = 'btn btn-secondary';
        button.textContent = act.label;
        button.onclick = () => performAction(act.action);
        actionButtons.appendChild(button);
    });
}

/**
 * 執行動作
 */
async function performAction(action) {
    const character = characterManager.getCurrentCharacter();
    const story = gameState.currentStory;

    if (!character || !story) return;

    try {
        showLoading(true);

        // 執行擲骰檢定
        const roll = DiceRoller.roll(20);
        const modifier = character.getModifier('str');
        const total = roll + modifier;

        const response = await aiGameMaster.generateStoryResponse(character, action, story);
        
        showLoading(false);

        // 更新故事內容
        document.getElementById('storyResponse').innerHTML = response;

        // 添加日誌
        gameState.addLogEntry(`${character.name}: ${action}`);
        gameState.addLogEntry(`擲骰: d20+${modifier} = ${total}`);

        // 更新日誌顯示
        updateAdventureLog();

        // 重新生成動作按鈕
        generateActionButtons();
    } catch (error) {
        showLoading(false);
        showNotification(`錯誤: ${error.message}`, 'error');
    }
}

/**
 * 提交自定義動作
 */
async function submitCustomAction() {
    const textarea = document.getElementById('customAction');
    const action = textarea.value.trim();

    if (!action) {
        showNotification('請輸入你的行動', 'error');
        return;
    }

    textarea.value = '';
    await performAction(action);
}

/**
 * 更新冒險日誌
 */
function updateAdventureLog() {
    const logContent = document.getElementById('logContent');
    logContent.innerHTML = '';

    gameState.adventureLog.slice(-5).forEach(entry => {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.innerHTML = `<strong>${entry.timestamp}:</strong> ${entry.message}`;
        logContent.appendChild(logEntry);
    });
}

/**
 * 更新角色卡
 */
function updateCharacterSheet(character) {
    const sheet = document.getElementById('characterSheet');
    sheet.innerHTML = `
        <div class="sheet-stat">
            <span class="sheet-stat-label">名稱</span>
            <span class="sheet-stat-value">${character.name}</span>
        </div>
        <div class="sheet-stat">
            <span class="sheet-stat-label">種族/職業</span>
            <span class="sheet-stat-value">${CONFIG.RACES[character.race]?.name || character.race} / ${CONFIG.CLASSES[character.class]?.name || character.class}</span>
        </div>
        <div class="sheet-stat">
            <span class="sheet-stat-label">等級</span>
            <span class="sheet-stat-value">${character.level}</span>
        </div>
        <div class="sheet-stat">
            <span class="sheet-stat-label">生命值</span>
            <span class="sheet-stat-value">${character.currentHP}/${character.maxHP}</span>
        </div>
        <div class="sheet-stat">
            <span class="sheet-stat-label">護甲等級</span>
            <span class="sheet-stat-value">${character.ac}</span>
        </div>
        <div style="margin: 10px 0; border-top: 1px solid rgba(139, 69, 19, 0.3); padding-top: 10px;">
            <h4 style="color: var(--accent-color); margin-bottom: 8px;">屬性</h4>
            <div class="sheet-stat">
                <span>力量</span>
                <span>${character.stats.str} (${character.getModifier('str') >= 0 ? '+' : ''}${character.getModifier('str')})</span>
            </div>
            <div class="sheet-stat">
                <span>敏捷</span>
                <span>${character.stats.dex} (${character.getModifier('dex') >= 0 ? '+' : ''}${character.getModifier('dex')})</span>
            </div>
            <div class="sheet-stat">
                <span>體質</span>
                <span>${character.stats.con} (${character.getModifier('con') >= 0 ? '+' : ''}${character.getModifier('con')})</span>
            </div>
            <div class="sheet-stat">
                <span>智力</span>
                <span>${character.stats.int} (${character.getModifier('int') >= 0 ? '+' : ''}${character.getModifier('int')})</span>
            </div>
            <div class="sheet-stat">
                <span>感知</span>
                <span>${character.stats.wis} (${character.getModifier('wis') >= 0 ? '+' : ''}${character.getModifier('wis')})</span>
            </div>
            <div class="sheet-stat">
                <span>魅力</span>
                <span>${character.stats.cha} (${character.getModifier('cha') >= 0 ? '+' : ''}${character.getModifier('cha')})</span>
            </div>
        </div>
    `;
}

/**
 * 設置屏幕 - 加載配置
 */
function loadSettingsUI() {
    const settings = localStorage.getItem(CONFIG.STORAGE_KEYS.SETTINGS);
    if (settings) {
        const data = JSON.parse(settings);
        document.getElementById('apiProvider').value = data.apiProvider || 'openai';
        document.getElementById('apiKey').value = data.apiKey || '';
        document.getElementById('apiEndpoint').value = data.apiEndpoint || '';
        document.getElementById('soundEnabled').checked = data.soundEnabled !== false;
        document.getElementById('autoSave').checked = data.autoSave !== false;
    }
}

/**
 * 設置屏幕 - 保存設置
 */
function saveSettings() {
    const settings = {
        apiProvider: document.getElementById('apiProvider').value,
        apiKey: document.getElementById('apiKey').value,
        apiEndpoint: document.getElementById('apiEndpoint').value,
        soundEnabled: document.getElementById('soundEnabled').checked,
        autoSave: document.getElementById('autoSave').checked
    };

    localStorage.setItem(CONFIG.STORAGE_KEYS.SETTINGS, JSON.stringify(settings));

    // 更新 AI 遊戲大師配置
    aiGameMaster.saveConfig({
        provider: settings.apiProvider,
        apiKey: settings.apiKey,
        apiEndpoint: settings.apiEndpoint
    });

    showNotification('設置已保存！', 'success');
}

/**
 * 導出遊戲數據
 */
function exportGameData() {
    const data = {
        characters: characterManager.getAllCharacters().map(c => c.toJSON()),
        gameState: gameState,
        timestamp: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dnd-trpg-backup-${Date.now()}.json`;
    link.click();

    showNotification('遊戲數據已導出！', 'success');
}

/**
 * 清除所有數據
 */
function clearAllData() {
    if (confirm('確定要清除所有遊戲數據嗎？此操作無法撤銷！')) {
        localStorage.clear();
        characterManager.characters = [];
        characterManager.currentCharacter = null;
        gameState.clearGame();
        showNotification('所有數據已清除', 'success');
        showScreen('mainMenu');
    }
}

/**
 * 頁面加載事件
 */
document.addEventListener('DOMContentLoaded', () => {
    // 初始化應用
    showScreen('mainMenu');

    // 自動保存遊戲狀態
    setInterval(() => {
        if (gameState.isGameRunning) {
            gameState.save();
        }
    }, 30000); // 每 30 秒保存一次
});
