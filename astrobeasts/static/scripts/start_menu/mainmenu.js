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
        this.registry.set('player', new Player("", [], 1500,  0, 1, 0, 0));
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
        { key: 'slash', name: 'Slash', description: 'Very low damage, high accuracy attack', quantity: 1, cost: 30, isEquipped: true, damage:30, accuracy:90, level:1 },
        { key: 'headbutt', name: 'Headbutt', description: 'Meduium damage, medium accuracy attack', quantity: 1, cost:25, isEquipped: true, damage:60, accuracy:75, level:1}]); 
       
       
        // SHOP Registry
       this.registry.set('shop_moves', [
        { key: 'slash', name: 'Scratch', description: 'Low damage, medium accuracy', quantity: 1, cost:100, isSelected: false, damage:50, accuracy:50, level:1},
        { key: 'headbutt', name: 'Pounce', description: 'Medium damage, low accuracy', quantity: 1, cost:100, isSelected: false, damage:60, accuracy:50, level:1},
        { key: 'chomp', name: 'Chomp', description: 'Medium damage, medium acuuracy', quantity: 1, cost:400, isSelected: false , damage:55, accuracy:75, level:1},
        { key: 'tackle', name: 'Tackle', description: 'High damage, low accuracy', quantity: 1, cost:400, isSelected: false , damage:65, accuracy:75, level:1},
        { key: 'strike', name: 'Strike', description: 'Medium damage, very high acurracy', quantity: 1, cost:700, isSelected: false, damage:60, accuracy:100, level:1 },
        { key: 'fireball', name: 'Fireball', description: 'Very high damage, low accuracy', quantity: 1, cost:700, isSelected: false , damage:95, accuracy:65, level:1},
        { key: 'hydrojet', name: 'Hydrojet', description: 'High damage, medium accuracy', quantity: 1, cost:1000, isSelected: false , damage:75, accuracy:70, level:1},
        { key: 'seismictoss', name: 'Seismic Toss', description: 'Very high damage, very low accuracy', quantity: 1, cost:2000, isSelected: false, damage:105, accuracy:55, level:1 },
        { key: 'lightjolt', name: 'Lightning Jolt', description: 'High damage, high accuracy', quantity: 1, cost:4000, isSelected: false, damage:85, accuracy:90, level:1 },
        { key: 'gravpulse', name: 'Gravitic Pulse', description: 'Very high damage, high accuracy', quantity: 1, cost:5000, isSelected: false, damage:170, accuracy:85, level:1}
        ]); 
       
        this.registry.set('shop_astrobeasts', [
        { key: 'skol', assets: 'Skol', assetAnim: "idle_Skol", name: 'Skol', rarity: 'common', description: 'Balanced AstroBeast', quantity: 1, cost: 350, isSelected: false, maxHP: 1000, currentHP: 1000, currentExp: 0, maxExp: 1000, stats: [300, 250, 300, 300, 250], level: 1,isAlive: true },
        { key: 'tarkeel',assets: 'Tarkeel', assetAnim: "idle_Tarkeel", name: 'Tarkeel', rarity: 'common', description: 'Electric AstroBeast', quantity: 1, cost: 350, isSelected: false, maxHP: 1000, currentHP: 1000, currentExp: 0, maxExp: 1000, stats: [194, 128, 448, 500, 130], level: 1,isAlive: true  },
        { key: 'arquam', assets: 'Arquam', assetAnim: "idle_Arquam", name: 'Arquam', rarity: 'Common', description: 'Water AstroBeast', quantity: 1, cost: 1000, isSelected: false, maxHP: 2000, currentHP: 2000, maxExp: 1000, currentExp: 0, stats: [266, 470, 198, 312, 154], level: 1, isAlive: true },
        { key: 'shamrock',assets: 'Shamrock', assetAnim: "idle_Shamrock", name: 'Shamrock', rarity: 'Common', description: 'Lucky AstroBeast', quantity: 1, cost: 1000, isSelected: false, maxHP: 1000, currentHP: 1000, maxExp: 1000, currentExp: 0, stats: [358, 120, 218, 246, 458], level: 1, isAlive: true  },
        { key: 'zallo', assets: 'Zallo', assetAnim: "idle_Zallo", name: 'Zallo', rarity: 'Common', description: 'Gravity AstroBeast', quantity: 1, cost: 1000, isSelected: false, maxHP: 1000, currentHP: 1000, maxExp: 1000, currentExp: 0, stats: [434, 470, 122, 102, 272], level: 1, isAlive: true  },
        
        { key: 'icell', assets: 'Icell', assetAnim: "idle_Icell", name: 'Icell', rarity: 'Rare', description: 'The Harbinger of Winter', quantity: 1, cost: 2500, isSelected: false, maxHP: 4000, currentHP: 4000, maxExp: 1000, currentExp: 0, stats: [410, 648, 442, 510, 310], level: 1, isAlive: true  },
        { key: 'ragnex', assets: 'Ragnex', assetAnim: "idle_Ragnex", name: 'Ragnex', rarity: 'Rare', description: 'The Eternal Dread of the Cosmos', quantity: 1, cost: 2500, isSelected: false, maxHP: 3500, currentHP: 3500, maxExp: 1000, currentExp: 0, stats: [520, 514, 450, 478, 438], level: 1, isAlive: true  },
        { key: 'strikoh', assets: 'Strikoh', assetAnim: "idle_Strikoh", name: 'Strikoh', rarity: 'Rare', description: 'The Tempest\'s Last Stand', quantity: 1, cost: 2500, isSelected: false, maxHP: 3000, currentHP: 3000, maxExp: 1000, currentExp: 0, stats: [632, 408, 474, 468, 418], level: 1, isAlive: true  },
        { key: 'scourge', assets: 'Scourge', assetAnim: "idle_Scourge", name: 'Scourge', rarity: 'Rare', description: 'The Doom of the Red Quesar', quantity: 1, cost: 2500, isSelected: false, maxHP: 3000, currentHP: 3000, maxExp: 1000, currentExp: 0, stats: [550, 498, 396, 416, 540], level: 1, isAlive: true  },
        
        { key: 'aesun', assets: 'Aesun', assetAnim: "idle_Aesun", name: 'Aesun', rarity: 'Legendary', description: 'Aesun the Divine and Arcane Light', quantity: 1, cost: 5000, isSelected: false, maxHP: 6000, currentHP: 6000, maxExp: 1000, currentExp: 0, stats: [964, 820, 1086, 1018, 612], level: 1, isAlive: true  },
        { key: 'tyboar', assets: 'Tyboar', assetAnim: "idle_Tyboar", name: 'Tyboar', rarity: 'Legendary', description: 'Tyboar the Ancient Titan of Thunder', quantity: 1, cost: 5000, isSelected: false, maxHP: 6000, currentHP: 6000, maxExp: 1000, currentExp: 0, stats: [832, 1188, 656, 1046, 808], level: 1, isAlive: true  }
        ]);

        this.registry.set('shop_items', [
        { key: 'cookies', name: 'CosmoCookies', description: 'Restores 250 HP', quantity: 1, HP: 250, cost: 250, isSelected: false },
        { key: 'ade', name: 'AstroAde', description: 'Restores 700 HP', quantity: 1, HP: 700, cost: 700, isSelected: false },
        { key: 'sequid', name: 'SequidSando', description: 'Restores 1000 HP', quantity: 1, HP: 1000, cost: 1000, isSelected: false },
        { key: 'claws', name: 'Titanium Claws', description: '+50 ATK for the fight duration', quantity: 1, ATK: 50, cost: 250, isSelected: false },
        { key: 'boosters', name: 'Sonic Boosters', description: '+50 SPD for fight duration', quantity: 1, SPD: 50, cost: 250, isSelected: false },
        { key: 'shell', name: 'Hardlight Shell', description: '+50 DEF for fight duration', quantity: 1, DEF: 50, cost: 250, isSelected: false },
        { key: 'stim', name: 'Stim Beacon', description: '+50 DEX, LUK for fight duration', quantity: 1, DEX: 50, cost: 250, isSelected: false },
        { key: 'shield', name: 'Photon Shield', description: '+50 DEX, LUK for fight duration', quantity: 1, DEX: 50, cost: 250, isSelected: false },
        { key: 'gravnet', name: 'Grav Net', description: '+50 DEX, LUK for fight duration', quantity: 1, DEX: 50, cost: 250, isSelected: false }
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
            startGameText.on('pointerover', () => {
                startGameText.setStyle({ fill: '#13b2f3'}); // when you hover changes color; alt: #41f3fd
            });
            startGameText.on('pointerout', () => {
                startGameText.setStyle({ fill: 'white'}); 
            });
        
        let loadGameText = this.add.text(100, 320, 'Load Game', {font: '24px', color: '#ffff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadGame'));
            loadGameText.on('pointerover', () => {
                loadGameText.setStyle({ fill: '#13b2f3'}); // when you hover changes color; alt: #41f3fd
            });
            loadGameText.on('pointerout', () => {
                loadGameText.setStyle({ fill: 'white'}); 
            });

        let optionsText = this.add.text(100, 420, 'Options', {font: '24px', color: '#ffff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('Options'));
            optionsText.on('pointerover', () => {
                optionsText.setStyle({ fill: '#13b2f3'}); // when you hover changes color; alt: #41f3fd
            });
            optionsText.on('pointerout', () => {
                optionsText.setStyle({ fill: 'white'}); 
            });

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
