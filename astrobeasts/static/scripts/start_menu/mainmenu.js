// first scene - start menu
// calls newgame, loadgame, and options scenes
// import * as WebFontLoader from '../webfontloader.js';
import { Player } from './player.js';
export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }
    preload() {
        this.load.image('sky', 'static/assets/Backgrounds/bPlanets.jpg');
    }
    init() {
        this.registry.set('playerName', '');

        this.registry.set('player', new Player("jim", [], 0,  0, 100, 1, 0, 0));
        // Inventory contains dictionary items, where each dictionary represents an item. it has the following variables:
        // 1. key (image name), 2. name (item's name), 3. description, 4. quantity, 5. isEquipped (has the player equipped this item for battle?)
        this.registry.set('inventory_items', []); // should be list of dicts with the item name and its key that cooresponds to it's png path
       
        // Astrobeasts contain dictionaries, where each dictionary represents an astrobeast. it has the following variables:
        // 1. key (image name), 2. name (astrobeast name), 3. description (it's affinity), 4. quantity (always 1), 5. isEquipped (has the player equipped this beast for battle?)
        this.registry.set('inventory_astrobeasts', [{ key: 'Skol', name: 'Skol', description: 'Fire AstroBeast', quantity: 1, cost: 50, isEquipped: false },
        { key: 'tarkeel', name: 'Tarkeel', description: 'Water AstroBeast', quantity: 1, cost: 51, isEquipped: false }]); // similar as above. showing starter astrobeasts
       
        // Moves contain dictionaries, where each dictionary represents a move. it has the following variables:
        // 1. key (image name), 2. name (move name), 3. description (what it does), 4. quantity, 5. isEquipped (has the player equipped this  for battle?)
        this.registry.set('inventory_moves', [
        { key: 'slash', name: 'Slash', description: 'Deals damage to enemy', quantity: 1, cost: 30, isEquipped: false },
        { key: 'headbutt', name: 'Headbutt', description: 'Deals damage to enemy', quantity: 1, cost:25, isEquipped: false }]); 
       
       
        // SHOP Registry
       this.registry.set('shop_moves', [
        { key: 'slash', name: 'Slash', description: 'Deals damage to enemy', quantity: 1, cost:100, isSelected: false },
        { key: 'headbutt', name: 'Headbutt', description: 'Deals damage to enemy', quantity: 1, cost:100, isSelected: false },
        { key: 'chomp', name: 'Chomp', description: 'Deals damage to enemy', quantity: 1, cost:100, isSelected: false },
        { key: 'tackle', name: 'Tackle', description: 'Deals damage to enemy', quantity: 1, cost:100, isSelected: false },
        { key: 'strike', name: 'Strike', description: 'Deals damage to enemy', quantity: 1, cost:100, isSelected: false },
        { key: 'fireball', name: 'Fireball', description: 'Deals Fire damage to enemy', quantity: 1, cost:150, isSelected: false },
        { key: 'hydrojet', name: 'Hydrojet', description: 'Deals Water damage to enemy', quantity: 1, cost:150, isSelected: false },
        { key: 'seismictoss', name: 'Seismic Toss', description: 'Deals Rock damage to enemy', quantity: 1, cost:150, isSelected: false },
        { key: 'lightjolt', name: 'Lightning Jolt', description: 'Deals Electric damage to enemy', quantity: 1, cost:150, isSelected: false },
        { key: 'gravpulse', name: 'Gravitic Pulse', description: 'Deals Gravity damage to enemy', quantity: 1, cost:150, isSelected: false }
        ]); 
       
        this.registry.set('shop_astrobeasts', [
        { key: 'skol', name: 'Skol', description: 'Fire AstroBeast', quantity: 1, cost: 350, isSelected: false },
        { key: 'tarkeel', name: 'Tarkeel', description: 'Electric AstroBeast', quantity: 1, cost: 350, isSelected: false },
        { key: 'arquam', name: 'Arquam', description: 'Water AstroBeast', quantity: 1, cost: 350, isSelected: false },
        { key: 'radrok', name: 'Radrok', description: 'Rock AstroBeast', quantity: 1, cost: 350, isSelected: false },
        { key: 'zallo', name: 'Zallo', description: 'Gravity AstroBeast', quantity: 1, cost: 350, isSelected: false }
        ]);

        this.registry.set('shop_items', [
        { key: 'cookies', name: 'CosmoCookies', description: 'Restores 15 HP', quantity: 1, cost: 20, isSelected: false },
        { key: 'atk_potion', name: 'AstroAde', description: 'Restores 30 HP', quantity: 1, cost: 35, isSelected: false },
        { key: 'sequid', name: 'SequidSando', description: 'Restores 60 HP', quantity: 1, cost: 60, isSelected: false },
        { key: 'claws', name: 'Titanium Claws', description: '+10 ATK for the fight duration', quantity: 1, cost: 60, isSelected: false },
        { key: 'boosters', name: 'Sonic Boosters', description: '+10 SPD for fight duration', quantity: 1, cost: 60, isSelected: false },
        { key: 'shell', name: 'Hardlight Shell', description: '+10 DEF for fight duration', quantity: 1, cost: 60, isSelected: false },
        { key: 'stim', name: 'Stim Beacon', description: '+10 DEX, LUK for fight duration', quantity: 1, cost: 60, isSelected: false },
        { key: 'shield', name: 'Photon Shield', description: '+10 DEX, LUK for fight duration', quantity: 1, cost: 60, isSelected: false },
        { key: 'gravnet', name: 'Grav Net', description: '+10 DEX, LUK for fight duration', quantity: 1, cost: 80, isSelected: false }
        ]); 
       
       
       // caps for equipped items/astrobeasts/moves
       this.registry.set('maxItemsEquipped', 5);
       this.registry.set('maxAstrobeastsEquipped', 4);
       this.registry.set('maxMovesEquipped', 5);
       this.registry.set('currentItemsEquipped', 0);
       this.registry.set('currentAstrobeastsEquipped', 0);
       this.registry.set('currentMovesEquipped', 0);
       this.registry.set('walletTotal', 1000);  
    }
    create() {
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        // center of screen horizontally (x axis)
        const centerX = this.cameras.main.width / 2;

        let title = this.add.text(centerX, 70, 'AstroBeasts', {font: '64px', color: '#ffff', align: 'center'}).setOrigin(0.5, 0);

        let startGameText= this.add.text(100, 220, 'Start New Game', {font: '24px', color: '#ffff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () =>  this.scene.start('CombatScene'));
        
        let loadGameText = this.add.text(100, 320, 'Load Game', {font: '24px', color: '#ffff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadGame'));

        let optionsText = this.add.text(100, 420, 'Options', {font: '24px', color: '#ffff' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('Options'));

            // // below is using the webfontloader module to use external fonts for the scene
            // WebFontLoader.default.load({
            //     google: {
            //         families: ['Press Start 2P']
            //     },
            //     active: () => {
            //         title.setFontFamily('"Press Start 2P"')
            //         startGameText.setFontFamily('"Press Start 2P"')
            //         loadGameText.setFontFamily('"Press Start 2P"')
            //         optionsText.setFontFamily('"Press Start 2P"')
            //     }
            // }) 
    }
}