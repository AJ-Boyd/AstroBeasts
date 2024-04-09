// first scene - start menu
// calls newgame, loadgame, and options scenes
export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }
    init() {
        // inventory contains dictionary items, where each dictionary represents an item. it has the following variables:
       // 1. key (image name), 2. name (item's name), 3. description, 4. quantity, 5. isEquipped (has the player equipped this item for battle?)
       this.registry.set('inventory', [{ key: 'atk_potion', name: 'ATK Potion', description: 'Increases ATK by 10', quantity: 5, cost: 15, isEquipped: false },
       { key: 'cookies', name: 'CosmoCookies', description: 'Restores 20 HP', quantity: 1, cost: 10, isEquipped: false }]); // should be list of dicts with the item name and its key that cooresponds to it's png path
       
       // astrobeasts contain dictionaries, where each dictionary represents an astrobeast. it has the following variables:
       // 1. key (image name), 2. name (astrobeast name), 3. description (it's affinity), 4. quantity (always 1), 5. isEquipped (has the player equipped this beast for battle?)
       this.registry.set('astrobeasts', [{ key: 'skol', name: 'Skol', description: 'Fire AstroBeast', quantity: 1, cost: 50, isEquipped: false },
       { key: 'tarkeel', name: 'Tarkeel', description: 'Water AstroBeast', quantity: 1, cost: 51, isEquipped: false }]); // similar as above. showing starter astrobeasts
       

       // moves contain dictionaries, where each dictionary represents a move. it has the following variables:
       // 1. key (image name), 2. name (move name), 3. description (what it does), 4. quantity, 5. isEquipped (has the player equipped this  for battle?)
       this.registry.set('moves', [{ key: 'slash', name: 'Slash', description: 'Deals damage to enemy', quantity: 2, cost: 30, isEquipped: false },
       { key: 'headbutt', name: 'Headbutt', description: 'Deals damage to enemy', quantity: 25, isEquipped: false }]); 
       
       this.registry.set('playerName', '');

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
        // center of screen horizontally (x axis)
        const centerX = this.cameras.main.width / 2;

        this.add.text(centerX, 50, 'AstroBeasts', {font: '64px', color: 'cyan', align: 'center'}).setOrigin(0.5, 0);

        let startGameText= this.add.text(100, 175, 'Start New Game', {font: '24px', color: '#0f0' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () =>  this.scene.start('NewGame'));
        
        let loadGameText = this.add.text(100, 275, 'Load Game', {font: '24px', color: '#0f0' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadGame'));

        let optionsText = this.add.text(100, 375, 'Options', {font: '24px', color: '#0f0' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('Options'));

        let exitText = this.add.text(100, 475, 'Exit', {font: '24px', color: '#0f0' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('Options'));
    }
}