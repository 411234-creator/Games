/**
 * DnD TRPG - 遊戲邏輯系統
 */

class GameState {
    constructor() {
        this.currentStory = null;
        this.isGameRunning = false;
        this.currentCharacter = null;
        this.adventureLog = [];
        this.load();
    }

    /**
     * 加載遊戲狀態
     */
    load() {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.GAME_STATE);
        if (saved) {
            const state = JSON.parse(saved);
            this.currentStory = state.currentStory;
            this.adventureLog = state.adventureLog || [];
        }
    }

    /**
     * 保存遊戲狀態
     */
    save() {
        const state = {
            currentStory: this.currentStory,
            adventureLog: this.adventureLog
        };
        localStorage.setItem(CONFIG.STORAGE_KEYS.GAME_STATE, JSON.stringify(state));
    }

    /**
     * 開始新遊戲
     */
    startGame(character, story) {
        this.currentCharacter = character;
        this.currentStory = story;
        this.isGameRunning = true;
        this.adventureLog = [];
        aiGameMaster.clearHistory();
        this.save();
        return this;
    }

    /**
     * 結束遊戲
     */
    endGame() {
        this.isGameRunning = false;
        this.save();
    }

    /**
     * 添加日誌條目
     */
    addLogEntry(entry) {
        const timestamp = new Date().toLocaleTimeString('zh-Hant');
        this.adventureLog.push({
            timestamp,
            message: entry,
            id: Date.now()
        });
        this.save();
    }

    /**
     * 清除遊戲狀態
     */
    clearGame() {
        this.currentStory = null;
        this.isGameRunning = false;
        this.currentCharacter = null;
        this.adventureLog = [];
        localStorage.removeItem(CONFIG.STORAGE_KEYS.GAME_STATE);
    }
}

/**
 * 故事引擎
 */
class StoryEngine {
    constructor() {
        this.stories = this.initializeStories();
    }

    /**
     * 初始化故事
     */
    initializeStories() {
        return [
            {
                id: 'dragon_cave',
                title: '龍窟的秘寶',
                description: `在古老的北方山脈中，傳聞著一個巨龍的窟穴。數十年來，勇敢的冒險家試圖尋找傳說中的寶藏，但大多數人都沒有回來。

你聽說了一個古老的地圖，據說它指向龍窟的入口。這將是一場危險但也許充滿回報的冒險。

當你到達山脈時，你看到一個黑暗的洞穴入口，冷風從裡面吹出。你能感受到內部的強大力量。`,
                difficulty: '困難',
                levelRecommendation: '3-5',
                startingScene: 'cave_entrance',
                scenes: {
                    cave_entrance: {
                        description: '你站在龍窟的入口處...'
                    }
                }
            },
            {
                id: 'cursed_village',
                title: '被詛咒的村莊',
                description: `一個曾經繁華的村莊突然陷入了詭異的詛咒之中。所有居民都變得瘋狂，他們喃喃自語地重複著古老的言語。

村莊的長者說，這一切始於月圓之夜，當一個陌生人經過村莊時。現在，他們迫切需要冒險家的幫助來破解這個詛咒。

你進入了這個被詛咒的村莊，感受到了不祥的氛圍...`,
                difficulty: '中等',
                levelRecommendation: '1-3',
                startingScene: 'village_center'
            },
            {
                id: 'lost_temple',
                title: '失落的神廟',
                description: `在一片廣闊的叢林深處，探險家發現了一座被遺忘已久的古老神廟。神廟的石雕依然栩栩如生，訴說著一個古老文明的故事。

據說這個神廟裡藏著一個巨大的秘密，可能是古代魔法或失落的知識。但進入神廟需要解開許多謎題和克服各種危險。

你踏入了神廟，被古老的符號和詭異的靜寂所包圍...`,
                difficulty: '中等',
                levelRecommendation: '2-4',
                startingScene: 'temple_entrance'
            }
        ];
    }

    /**
     * 獲取所有故事
     */
    getAllStories() {
        return this.stories;
    }

    /**
     * 根據 ID 獲取故事
     */
    getStory(id) {
        return this.stories.find(story => story.id === id);
    }

    /**
     * 獲取故事簡介
     */
    getStorySummary(id) {
        const story = this.getStory(id);
        if (!story) return null;

        return {
            id: story.id,
            title: story.title,
            description: story.description.substring(0, 100) + '...',
            difficulty: story.difficulty,
            levelRecommendation: story.levelRecommendation,
            fullDescription: story.description
        };
    }
}

/**
 * 遭遇生成器
 */
class EncounterGenerator {
    /**
     * 生成敵人
     */
    static generateEnemy(level = 1) {
        const enemies = [
            { name: '地精', hp: 7, ac: 15, damage: '1d6' },
            { name: '獸人', hp: 11, ac: 12, damage: '1d8+1' },
            { name: '盜匪', hp: 27, ac: 16, damage: '1d6+3' },
            { name: '骷髏兵', hp: 13, ac: 15, damage: '1d8' },
            { name: '死靈法師', hp: 22, ac: 12, damage: '1d4+2 或法術' },
            { name: '巨龍（小）', hp: 44, ac: 18, damage: '2d6+4' }
        ];

        const enemy = enemies[Math.floor(Math.random() * enemies.length)];
        return {
            ...enemy,
            currentHP: enemy.hp,
            level: level
        };
    }

    /**
     * 生成遭遇
     */
    static generateEncounter(level = 1) {
        const difficulty = Math.random();
        let enemyCount = 1;

        if (difficulty < 0.3) {
            enemyCount = 1; // 簡單
        } else if (difficulty < 0.6) {
            enemyCount = 2; // 中等
        } else if (difficulty < 0.9) {
            enemyCount = 3; // 困難
        } else {
            enemyCount = 4; // 極難
        }

        const enemies = [];
        for (let i = 0; i < enemyCount; i++) {
            enemies.push(this.generateEnemy(level));
        }

        return {
            enemies: enemies,
            difficulty: difficulty < 0.3 ? '簡單' : difficulty < 0.6 ? '中等' : difficulty < 0.9 ? '困難' : '極難'
        };
    }
}

/**
 * 擲骰系統
 */
class DiceRoller {
    /**
     * 擲骰
     */
    static roll(sides = 20) {
        return Math.floor(Math.random() * sides) + 1;
    }

    /**
     * 多次擲骰
     */
    static rollMultiple(times, sides = 6) {
        let total = 0;
        const rolls = [];
        for (let i = 0; i < times; i++) {
            const roll = this.roll(sides);
            rolls.push(roll);
            total += roll;
        }
        return { rolls, total };
    }

    /**
     * 擲骰表達式 (例如 3d6+5)
     */
    static rollExpression(expression) {
        // 解析表達式
        const match = expression.match(/(\d+)d(\d+)([\+\-]\d+)?/);
        if (!match) return null;

        const times = parseInt(match[1]);
        const sides = parseInt(match[2]);
        const modifier = match[3] ? parseInt(match[3]) : 0;

        const { rolls, total } = this.rollMultiple(times, sides);
        return {
            expression: expression,
            rolls: rolls,
            subtotal: total,
            modifier: modifier,
            total: total + modifier,
            display: `${rolls.join('+')} ${modifier >= 0 ? '+' : ''}${modifier} = ${total + modifier}`
        };
    }
}

// 全局遊戲實例
const gameState = new GameState();
const storyEngine = new StoryEngine();

window.GameState = GameState;
window.StoryEngine = StoryEngine;
window.EncounterGenerator = EncounterGenerator;
window.DiceRoller = DiceRoller;
window.gameState = gameState;
window.storyEngine = storyEngine;
