/**
 * DnD TRPG - 配置文件
 */

const CONFIG = {
    // 遊戲基本設置
    GAME_NAME: "DnD TRPG - 冒險之書",
    GAME_VERSION: "1.0.0",
    
    // 存儲鍵值
    STORAGE_KEYS: {
        CHARACTERS: 'dnd_characters',
        CURRENT_CHARACTER: 'dnd_current_character',
        GAME_STATE: 'dnd_game_state',
        SETTINGS: 'dnd_settings',
        API_CONFIG: 'dnd_api_config'
    },

    // 種族特性
    RACES: {
        human: {
            name: '人類',
            description: '多功能且適應力強',
            bonuses: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
            hp_bonus: 0
        },
        elf: {
            name: '精靈',
            description: '敏捷且長壽',
            bonuses: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 0 },
            hp_bonus: 0
        },
        dwarf: {
            name: '矮人',
            description: '強悍且堅毅',
            bonuses: { str: 0, dex: 0, con: 2, int: 0, wis: 0, cha: 0 },
            hp_bonus: 0
        },
        halfling: {
            name: '半身人',
            description: '幸運且敏捷',
            bonuses: { str: 0, dex: 2, con: 0, int: 0, wis: 0, cha: 0 },
            hp_bonus: 0
        },
        dragonborn: {
            name: '龍裔',
            description: '強大的龍族後裔',
            bonuses: { str: 2, dex: 0, con: 0, int: 0, wis: 0, cha: 1 },
            hp_bonus: 2
        },
        gnome: {
            name: '侏儒',
            description: '聰慧且發明天才',
            bonuses: { str: 0, dex: 0, con: 0, int: 1, wis: 0, cha: 0 },
            hp_bonus: 0
        },
        'half-orc': {
            name: '半獸人',
            description: '力量與力量',
            bonuses: { str: 2, dex: 0, con: 1, int: -2, wis: 0, cha: -1 },
            hp_bonus: 1
        },
        tiefling: {
            name: '提夫林',
            description: '神秘的地獄血統',
            bonuses: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 2 },
            hp_bonus: 0
        }
    },

    // 職業特性
    CLASSES: {
        barbarian: {
            name: '野蠻人',
            description: '野蠻戰士，充滿怒火',
            hp_per_level: 12,
            primary_stat: 'str',
            saving_throws: ['str', 'con']
        },
        bard: {
            name: '吟遊詩人',
            description: '魅力十足的藝術家和法師',
            hp_per_level: 8,
            primary_stat: 'cha',
            saving_throws: ['dex', 'cha']
        },
        cleric: {
            name: '聖職者',
            description: '神聖力量的使者',
            hp_per_level: 8,
            primary_stat: 'wis',
            saving_throws: ['wis', 'cha']
        },
        druid: {
            name: '德魯伊',
            description: '自然力量的守護者',
            hp_per_level: 8,
            primary_stat: 'wis',
            saving_throws: ['int', 'wis']
        },
        fighter: {
            name: '戰士',
            description: '訓練有素的戰鬥專家',
            hp_per_level: 10,
            primary_stat: 'str',
            saving_throws: ['str', 'con']
        },
        monk: {
            name: '武僧',
            description: '紀律與身心合一',
            hp_per_level: 8,
            primary_stat: 'dex',
            saving_throws: ['str', 'dex']
        },
        paladin: {
            name: '聖騎士',
            description: '正義與力量的化身',
            hp_per_level: 10,
            primary_stat: 'str',
            saving_throws: ['wis', 'cha']
        },
        ranger: {
            name: '遊俠',
            description: '野外獵人與追蹤者',
            hp_per_level: 10,
            primary_stat: 'dex',
            saving_throws: ['str', 'dex']
        },
        rogue: {
            name: '盜賊',
            description: '敏捷與詭計的大師',
            hp_per_level: 8,
            primary_stat: 'dex',
            saving_throws: ['dex', 'int']
        },
        sorcerer: {
            name: '術士',
            description: '天生的魔法力量',
            hp_per_level: 6,
            primary_stat: 'cha',
            saving_throws: ['con', 'cha']
        },
        warlock: {
            name: '術士',
            description: '與超自然力量簽訂協議',
            hp_per_level: 8,
            primary_stat: 'cha',
            saving_throws: ['wis', 'cha']
        },
        wizard: {
            name: '法師',
            description: '研究魔法的智慧大師',
            hp_per_level: 6,
            primary_stat: 'int',
            saving_throws: ['int', 'wis']
        }
    },

    // 技能列表
    SKILLS: {
        acrobatics: { name: '特技', stat: 'dex' },
        animal_handling: { name: '動物馴養', stat: 'wis' },
        arcana: { name: '秘聞', stat: 'int' },
        athletics: { name: '運動', stat: 'str' },
        deception: { name: '欺騙', stat: 'cha' },
        history: { name: '歷史', stat: 'int' },
        insight: { name: '洞悉', stat: 'wis' },
        intimidation: { name: '威嚇', stat: 'cha' },
        investigation: { name: '調查', stat: 'int' },
        medicine: { name: '醫術', stat: 'wis' },
        nature: { name: '自然', stat: 'int' },
        perception: { name: '察覺', stat: 'wis' },
        performance: { name: '表演', stat: 'cha' },
        persuasion: { name: '勸導', stat: 'cha' },
        religion: { name: '宗教', stat: 'int' },
        sleight_of_hand: { name: '巧手', stat: 'dex' },
        stealth: { name: '隱蔽', stat: 'dex' },
        survival: { name: '生存', stat: 'wis' }
    },

    // 預設劇本故事
    STORIES: [
        {
            id: 'dragon_cave',
            title: '龍窟的秘寶',
            description: '傳聞在北方的高山上有一個古老的龍窟，藏著無比的財寶...',
            difficulty: '困難',
            level_recommendation: '3-5'
        },
        {
            id: 'cursed_village',
            title: '被詛咒的村莊',
            description: '一個村莊突然陷入了詭異的詛咒中，所有居民都變得瘋狂...',
            difficulty: '中等',
            level_recommendation: '1-3'
        },
        {
            id: 'lost_temple',
            title: '失落的神廟',
            description: '在叢林深處發現了一座被遺忘的古老神廟，等待著冒險家的探索...',
            difficulty: '中等',
            level_recommendation: '2-4'
        }
    ],

    // API 設置預設值
    API_DEFAULTS: {
        provider: 'openai',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        max_tokens: 500,
        timeout: 30000
    }
};

// 導出全局訪問
window.CONFIG = CONFIG;
