/**
 * DnD TRPG - 角色系統
 */

class Character {
    constructor(data = {}) {
        this.id = data.id || Date.now().toString();
        this.name = data.name || '';
        this.race = data.race || '';
        this.class = data.class || '';
        this.level = data.level || 1;
        this.experience = data.experience || 0;
        
        // 基本屬性
        this.stats = {
            str: data.stats?.str || 10,
            dex: data.stats?.dex || 10,
            con: data.stats?.con || 10,
            int: data.stats?.int || 10,
            wis: data.stats?.wis || 10,
            cha: data.stats?.cha || 10
        };
        
        // 應用種族加成
        this.applyRacialBonuses();
        
        // 生命值
        this.maxHP = this.calculateMaxHP();
        this.currentHP = this.maxHP;
        
        // 護甲等級
        this.ac = 10 + this.getModifier('dex');
        
        // 背景故事
        this.background = data.background || '';
        
        // 外觀
        this.appearance = {
            gender: data.appearance?.gender || 'male',
            hairColor: data.appearance?.hairColor || '',
            distinguishing: data.appearance?.distinguishing || ''
        };
        
        // 技能
        this.skills = this.initializeSkills();
        
        // 已知法術（如果是施法職業）
        this.spells = data.spells || [];
        
        // 裝備
        this.equipment = data.equipment || [];
        
        // 創建日期
        this.createdDate = data.createdDate || new Date().toISOString();
    }

    /**
     * 應用種族加成
     */
    applyRacialBonuses() {
        if (!this.race) return;
        
        const raceBonuses = CONFIG.RACES[this.race]?.bonuses || {};
        Object.keys(raceBonuses).forEach(stat => {
            this.stats[stat] = (this.stats[stat] || 0) + raceBonuses[stat];
        });
    }

    /**
     * 計算最大生命值
     */
    calculateMaxHP() {
        if (!this.class) return 10;
        
        const classData = CONFIG.CLASSES[this.class];
        const hpPerLevel = classData?.hp_per_level || 8;
        const conModifier = this.getModifier('con');
        const baseHP = hpPerLevel + conModifier;
        
        return Math.max(1, baseHP + (this.level - 1) * (hpPerLevel / 2 + conModifier));
    }

    /**
     * 獲取屬性修正值
     */
    getModifier(stat) {
        return Math.floor((this.stats[stat] - 10) / 2);
    }

    /**
     * 初始化技能
     */
    initializeSkills() {
        const skills = {};
        Object.keys(CONFIG.SKILLS).forEach(skillKey => {
            const skill = CONFIG.SKILLS[skillKey];
            skills[skillKey] = {
                name: skill.name,
                stat: skill.stat,
                proficient: false,
                bonus: this.getModifier(skill.stat)
            };
        });
        return skills;
    }

    /**
     * 擲骰（d20）
     */
    rollD20() {
        return Math.floor(Math.random() * 20) + 1;
    }

    /**
     * 執行技能檢定
     */
    skillCheck(skillKey) {
        const skill = this.skills[skillKey];
        if (!skill) return null;
        
        const roll = this.rollD20();
        const statModifier = this.getModifier(skill.stat);
        const proficiencyBonus = this.level >= 5 ? 3 : 2;
        const bonus = skill.proficient ? proficiencyBonus : 0;
        
        return {
            roll: roll,
            modifier: statModifier,
            proficiencyBonus: bonus,
            total: roll + statModifier + bonus,
            success: roll + statModifier + bonus >= 10
        };
    }

    /**
     * 受傷
     */
    takeDamage(amount) {
        this.currentHP = Math.max(0, this.currentHP - amount);
        return this.currentHP;
    }

    /**
     * 治療
     */
    heal(amount) {
        this.currentHP = Math.min(this.maxHP, this.currentHP + amount);
        return this.currentHP;
    }

    /**
     * 獲取角色摘要
     */
    getSummary() {
        return {
            id: this.id,
            name: this.name,
            race: CONFIG.RACES[this.race]?.name || this.race,
            class: CONFIG.CLASSES[this.class]?.name || this.class,
            level: this.level,
            hp: `${this.currentHP}/${this.maxHP}`,
            ac: this.ac
        };
    }

    /**
     * 轉換為 JSON 格式
     */
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            race: this.race,
            class: this.class,
            level: this.level,
            experience: this.experience,
            stats: { ...this.stats },
            maxHP: this.maxHP,
            currentHP: this.currentHP,
            ac: this.ac,
            background: this.background,
            appearance: { ...this.appearance },
            skills: { ...this.skills },
            spells: [...this.spells],
            equipment: [...this.equipment],
            createdDate: this.createdDate
        };
    }

    /**
     * 從 JSON 恢復
     */
    static fromJSON(data) {
        return new Character(data);
    }
}

/**
 * 角色管理器
 */
class CharacterManager {
    constructor() {
        this.characters = this.loadCharacters();
        this.currentCharacter = this.loadCurrentCharacter();
    }

    /**
     * 加載所有角色
     */
    loadCharacters() {
        const data = localStorage.getItem(CONFIG.STORAGE_KEYS.CHARACTERS);
        if (!data) return [];
        
        try {
            const characters = JSON.parse(data);
            return characters.map(char => Character.fromJSON(char));
        } catch (e) {
            console.error('載入角色出錯:', e);
            return [];
        }
    }

    /**
     * 加載當前角色
     */
    loadCurrentCharacter() {
        const id = localStorage.getItem(CONFIG.STORAGE_KEYS.CURRENT_CHARACTER);
        if (!id) return null;
        
        return this.characters.find(char => char.id === id) || null;
    }

    /**
     * 保存所有角色
     */
    saveCharacters() {
        const data = this.characters.map(char => char.toJSON());
        localStorage.setItem(CONFIG.STORAGE_KEYS.CHARACTERS, JSON.stringify(data));
    }

    /**
     * 保存當前角色
     */
    saveCurrentCharacter(characterId) {
        localStorage.setItem(CONFIG.STORAGE_KEYS.CURRENT_CHARACTER, characterId);
        this.currentCharacter = this.characters.find(char => char.id === characterId) || null;
    }

    /**
     * 創建新角色
     */
    createCharacter(data) {
        const character = new Character(data);
        this.characters.push(character);
        this.saveCharacters();
        return character;
    }

    /**
     * 刪除角色
     */
    deleteCharacter(characterId) {
        this.characters = this.characters.filter(char => char.id !== characterId);
        this.saveCharacters();
        
        if (this.currentCharacter?.id === characterId) {
            this.currentCharacter = null;
            localStorage.removeItem(CONFIG.STORAGE_KEYS.CURRENT_CHARACTER);
        }
    }

    /**
     * 更新角色
     */
    updateCharacter(characterId, data) {
        const character = this.characters.find(char => char.id === characterId);
        if (!character) return null;
        
        Object.assign(character, data);
        this.saveCharacters();
        return character;
    }

    /**
     * 獲取所有角色
     */
    getAllCharacters() {
        return this.characters;
    }

    /**
     * 獲取角色根據 ID
     */
    getCharacter(id) {
        return this.characters.find(char => char.id === id);
    }

    /**
     * 獲取當前角色
     */
    getCurrentCharacter() {
        return this.currentCharacter;
    }
}

// 全局角色管理器實例
const characterManager = new CharacterManager();
window.characterManager = characterManager;
window.Character = Character;
