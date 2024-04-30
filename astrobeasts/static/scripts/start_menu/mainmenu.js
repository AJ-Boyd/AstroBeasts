// first scene - start menu
// calls newgame, loadgame, and options scenes
import * as WebFontLoader from '../webfontloader.js'
import { Player } from './player.js';
export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }
    preload() {
        this.load.image('sky', 'static/assets/Backgrounds/bPlanets.png');
        this.load.audio('bg-music', 'static/assets/Music/FrozenJamSeamlessLoop.mp3');
    }
    init() {
        this.registry.set('playerName', '');
        this.registry.set('Score', 0);
        this.registry.set('player', new Player("", [], 1000,  0, 1, 0, 0));
        // Inventory contains dictionary items, where each dictionary represents an item. it has the following variables:
        // 1. key (image name), 2. name (item's name), 3. description, 4. quantity, 5. isEquipped (has the player equipped this item for battle?)
        this.registry.set('inventory_items', []); // should be list of dicts with the item name and its key that cooresponds to it's png path
       
        // Astrobeasts contain dictionaries, where each dictionary represents an astrobeast. it has the following variables:
        // 1. key (image name), 2. name (astrobeast name), 3. description (it's affinity), 4. quantity (always 1), 5. isEquipped (has the player equipped this beast for battle?)
        this.registry.set('inventory_astrobeasts', [ { 
            key: 'skol', 
            name: 'Skol',
            rarity: 'Common',
            assets: 'Skol', 
            assetAnim: "idle_Skol",
            description: 'Balanced AstroBeast', 
            quantity: 1, 
            cost: 50, 
            isEquipped: true,
            maxHP: 1000,
            currentHP: 1000,
            currentExp: 0,
            maxExp: 1000,
            stats: [300, 250, 300, 300, 250],
            level: 1,
            isAlive: true
        },
        { 
            key: 'tarkeel', 
            name: 'Tarkeel',
            rarity: 'Common',
            assets: 'Tarkeel', 
            assetAnim: "idle_Tarkeel",
            description: 'Bug AstroBeast', 
            quantity: 1, 
            cost: 50, 
            isEquipped: true,
            maxHP: 1000,
            currentHP: 1000,
            currentExp: 0,
            maxExp: 1000,
            stats: [194, 128, 448, 500, 130],
            level: 1,
            isAlive: true
        }
       ]);
        // Moves contain dictionaries, where each dictionary represents a move. it has the following variables:
        // 1. key (image name), 2. name (move name), 3. description (what it does), 4. quantity, 5. isEquipped (has the player equipped this  for battle?)
        this.registry.set('inventory_moves', [
        { key: 'slash', name: 'Slash', description: 'Deals damage to enemy', quantity: 1, cost: 30, isEquipped: false },
        { key: 'headbutt', name: 'Headbutt', description: 'Deals damage to enemy', quantity: 1, cost:25, isEquipped: false }]); 
       
       
        // SHOP Registry
       this.registry.set('shop_moves', [
        { key: 'slash', name: 'Slash', description: 'Deals damage to enemy', quantity: 1, cost:100, isSelected: false, damage:50, accuracy:50, level:1},
        { key: 'headbutt', name: 'Headbutt', description: 'Deals damage to enemy', quantity: 1, cost:100, isSelected: false, damage:60, accuracy:50, level:1},
        { key: 'chomp', name: 'Chomp', description: 'Deals damage to enemy', quantity: 1, cost:100, isSelected: false , damage:55, accuracy:75, level:1},
        { key: 'tackle', name: 'Tackle', description: 'Deals damage to enemy', quantity: 1, cost:100, isSelected: false , damage:65, accuracy:75, level:1},
        { key: 'strike', name: 'Strike', description: 'Deals damage to enemy', quantity: 1, cost:100, isSelected: false, damage:50, accuracy:75, level:1 },
        { key: 'fireball', name: 'Fireball', description: 'Deals Fire damage to enemy', quantity: 1, cost:150, isSelected: false , damage:80, accuracy:75, level:1},
        { key: 'hydrojet', name: 'Hydrojet', description: 'Deals Water damage to enemy', quantity: 1, cost:150, isSelected: false , damage:75, accuracy:75, level:1},
        { key: 'seismictoss', name: 'Seismic Toss', description: 'Deals Rock damage to enemy', quantity: 1, cost:150, isSelected: false, damage:80, accuracy:75, level:1 },
        { key: 'lightjolt', name: 'Lightning Jolt', description: 'Deals Electric damage to enemy', quantity: 1, cost:150, isSelected: false, damage:80, accuracy:75, level:1 },
        { key: 'gravpulse', name: 'Gravitic Pulse', description: 'Deals Gravity damage to enemy', quantity: 1, cost:150, isSelected: false, damage:8-0, accuracy:75, level:1}
        ]); 
       
        this.registry.set('shop_astrobeasts', [
        //{ key: 'skol',assetAnim: "idle_Skol", name: 'Skol', description: 'Fire AstroBeast', quantity: 1, cost: 350, isSelected: false },
        //{ key: 'tarkeel',assetAnim: "idle_Tarkeel", name: 'Tarkeel', description: 'Electric AstroBeast', quantity: 1, cost: 350, isSelected: false },
        { key: 'arquam', assets: 'arquam', assetAnim: "idle_Arquam", name: 'Arquam', rarity: 'Common', description: 'Water AstroBeast', quantity: 1, cost: 1000, isSelected: false, maxHP: 2000, currentHP: 2000, maxExp: 1000, currentExp: 0, stats: [266, 470, 198, 312, 154], level: 1, isAlive: true },
        { key: 'shamrock',assets: 'shamrock', assetAnim: "idle_Shamrock", name: 'Shamrock', rarity: 'Common', description: 'Lucky AstroBeast', quantity: 1, cost: 1000, isSelected: false, maxHP: 1000, currentHP: 1000, maxExp: 1000, currentExp: 0, stats: [358, 120, 218, 246, 458], level: 1, isAlive: true  },
        { key: 'zallo', assets: 'zallo', assetAnim: "idle_Zallo", name: 'Zallo', rarity: 'Common', description: 'Gravity AstroBeast', quantity: 1, cost: 1000, isSelected: false, maxHP: 1000, currentHP: 1000, maxExp: 1000, currentExp: 0, stats: [434, 470, 122, 102, 272], level: 1, isAlive: true  },
        
        { key: 'icell', assets: 'icell', assetAnim: "idle_Icell", name: 'Icell', rarity: 'Rare', description: 'The Harbinger of Winter', quantity: 1, cost: 2500, isSelected: false, maxHP: 4000, currentHP: 4000, maxExp: 1000, currentExp: 0, stats: [410, 648, 442, 510, 310], level: 1, isAlive: true  },
        { key: 'ragnex', assets: 'ragnex', assetAnim: "idle_Ragnex", name: 'Ragnex', rarity: 'Rare', description: 'The Eternal Dread of the Cosmos', quantity: 1, cost: 2500, isSelected: false, maxHP: 3500, currentHP: 3500, maxExp: 1000, currentExp: 0, stats: [520, 514, 450, 478, 438], level: 1, isAlive: true  },
        { key: 'strikoh', assets: 'strikoh', assetAnim: "idle_Strikoh", name: 'Strikoh', rarity: 'Rare', description: 'The Tempest\'s Last Stand', quantity: 1, cost: 2500, isSelected: false, maxHP: 3000, currentHP: 3000, maxExp: 1000, currentExp: 0, stats: [632, 408, 474, 468, 418], level: 1, isAlive: true  },
        { key: 'scourge', assets: 'scourge', assetAnim: "idle_Scourge", name: 'Scourge', rarity: 'Rare', description: 'The Doom of the Red Quesar', quantity: 1, cost: 2500, isSelected: false, maxHP: 3000, currentHP: 3000, maxExp: 1000, currentExp: 0, stats: [550, 498, 396, 416, 540], level: 1, isAlive: true  },
        
        { key: 'aesun', assets: 'aesun', assetAnim: "idle_Aesun", name: 'Aesun', rarity: 'Legendary', description: 'Aesun the Divine and Arcane Light', quantity: 1, cost: 5000, isSelected: false, maxHP: 8500, currentHP: 8500, maxExp: 1000, currentExp: 0, stats: [864, 820, 1086, 1018, 612], level: 1, isAlive: true  },
        { key: 'tyboar', assets: 'tyboar', assetAnim: "idle_Tyboar", name: 'Tyboar', rarity: 'Legendary', description: 'Tyboar the Ancient Titan of Thunder', quantity: 1, cost: 5000, isSelected: false, maxHP: 10000, currentHP: 10000, maxExp: 1000, currentExp: 0, stats: [832, 1088, 656, 1046, 808], level: 1, isAlive: true  }
        ]);

        this.registry.set('shop_items', [
        { key: 'cookies', name: 'CosmoCookies', description: 'Restores 15 HP', quantity: 1, HP: 15, cost: 20, isSelected: false },
        { key: 'ade', name: 'AstroAde', description: 'Restores 30 HP', quantity: 1, HP: 30, cost: 35, isSelected: false },
        { key: 'sequid', name: 'SequidSando', description: 'Restores 60 HP', quantity: 1, HP: 60, cost: 60, isSelected: false },
        { key: 'claws', name: 'Titanium Claws', description: '+10 ATK for the fight duration', quantity: 1, ATK: 10, cost: 60, isSelected: false },
        { key: 'boosters', name: 'Sonic Boosters', description: '+10 SPD for fight duration', quantity: 1, SPD: 10, cost: 60, isSelected: false },
        { key: 'shell', name: 'Hardlight Shell', description: '+10 DEF for fight duration', quantity: 1, DEF: 10, cost: 60, isSelected: false },
        { key: 'stim', name: 'Stim Beacon', description: '+10 DEX, LUK for fight duration', quantity: 1, DEX: 10, cost: 60, isSelected: false },
        { key: 'shield', name: 'Photon Shield', description: '+10 DEX, LUK for fight duration', quantity: 1, DEX: 10, cost: 60, isSelected: false },
        { key: 'gravnet', name: 'Grav Net', description: '+10 DEX, LUK for fight duration', quantity: 1, DEX: 10, cost: 80, isSelected: false }
        ]); 
       
       
       // caps for equipped items/astrobeasts/moves
       this.registry.set('maxItemsEquipped', 4);
       this.registry.set('maxAstrobeastsEquipped', 4);
       this.registry.set('maxMovesEquipped', 4);
       this.registry.set('currentItemsEquipped', 0);
       this.registry.set('currentAstrobeastsEquipped', 0);
       this.registry.set('currentMovesEquipped', 0);
       //this.registry.set('walletTotal', 1000);  

       //boolean variable for if we are entering into combat for the Tourney feature or nah
       this.registry.set('isTournament', false);
    }
    create() {
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        // check if bgMusic has already been created
        if (!this.game.registry.has('bgMusic')) {
            let bgMusic = this.sound.add('bg-music', {loop: true });
            bgMusic.play();
            this.game.registry.set('bgMusic', bgMusic);
        }
        
        // initialize the mute state only if it has not been initialized yet
        if (!this.game.registry.has('isMuted')) {
            this.game.registry.set('isMuted', false);
        }

        // Apply the current mute state
        let music = this.game.registry.get('bgMusic');
        let isMuted = this.game.registry.get('isMuted');
        music.setMute(isMuted);
        // center of screen horizontally (x axis)
        const centerX = this.cameras.main.width / 2;

        let title = this.add.text(centerX, 70, 'AstroBeasts', {font: '64px', color: '#ffff', stroke: '#13b2f3', strokeThickness: 3, align: 'center'}).setOrigin(0.5, 0);

        let startGameText= this.add.text(100, 220, 'Start New Game', {font: '24px', color: '#ffff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () =>  this.scene.start('NewGame'));
        
        let loadGameText = this.add.text(100, 320, 'Load Game', {font: '24px', color: '#ffff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadGame'));

        let optionsText = this.add.text(100, 420, 'Options', {font: '24px', color: '#ffff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('Options'));

            // below is using the webfontloader module to use external fonts for the scene
            WebFontLoader.default.load({
                google: {
                    families: ['Press Start 2P']
                },
                active: () => {
                    title.setFontFamily('"Press Start 2P"')
                    startGameText.setFontFamily('"Press Start 2P"')
                    loadGameText.setFontFamily('"Press Start 2P"')
                    optionsText.setFontFamily('"Press Start 2P"')
                }
            }) 
    }
}
