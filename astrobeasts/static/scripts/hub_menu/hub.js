// THE HUB 
import * as WebFontLoader from '../webfontloader.js'
export class HubScene extends Phaser.Scene {
    constructor() {
        super('LoadHub');
    }

    preload() {
        this.load.image('hub', 'static/assets/Backgrounds/The_Hub.jpg');
        this.load.image('my', 'static/assets/Backgrounds/bPlanets.png');
    }

    create() {
        const bg = this.add.image(0, 0, 'hub').setOrigin(0.5, 0.5).setScale(1.2);
        bg.setPosition(this.cameras.main.width / 2, this.cameras.main.height / 2);

        // rpg-style text box
        const textBoxHeight = 150;
        const graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.7); 
        graphics.fillRect(0, this.cameras.main.height - 150, this.cameras.main.width, 150);
        
            
        const startXFirstRow = this.cameras.main.width / 2 - 200; // x axis for beginning of first row
        const startXSecondRow = this.cameras.main.width / 2 - 200; // same as above but for second row
        const gap = 200; //space between each option
        
        // Y positions for two rows
        const firstRowY = this.cameras.main.height - 110;
        const secondRowY = this.cameras.main.height - 60;

        // first row of options
        let InventoryText = this.add.text(startXFirstRow, firstRowY, ' > Inventory', { font: '15px', color: 'DodgerBlue' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => this.scene.start('LoadInventory'));
            InventoryText.on('pointerover', () => {
                InventoryText.setStyle({ fill: '#13b2f3'}); // when you hover changes color; alt: #41f3fd
            });
            InventoryText.on('pointerout', () => {
                InventoryText.setStyle({ fill: 'white'}); 
            });
       
        let ShopText = this.add.text(startXFirstRow + gap, firstRowY, ' > Shop', { font: '15px', color: 'MediumSeaGreen' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => this.scene.start('LoadShop'));
            ShopText.on('pointerover', () => {
                ShopText.setStyle({ fill: '#13b2f3'}); // when you hover changes color; alt: #41f3fd
            });
            ShopText.on('pointerout', () => {
                ShopText.setStyle({ fill: 'white'}); 
            });

        let DojoText = this.add.text(startXFirstRow + 2 * gap, firstRowY, ' > Dojo', { font: '15px', color: 'crimson' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => {
                this.registry.set('isTournament', false);
                this.scene.start('LoadDojo');
            });
            DojoText.on('pointerover', () => {
                DojoText.setStyle({ fill: '#13b2f3'}); // when you hover changes color; alt: #41f3fd
            });
            DojoText.on('pointerout', () => {
                DojoText.setStyle({ fill: 'white'}); 
            });

        // second row of options
        let TournamentText = this.add.text(startXSecondRow, secondRowY, ' > Tournament', { font: '15px', color: 'gold' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => {
                this.registry.set('isTournament', true);
                this.scene.start('LoadTourney');
            });
            TournamentText.on('pointerover', () => {
                TournamentText.setStyle({ fill: '#13b2f3'}); // when you hover changes color; alt: #41f3fd
            });
            TournamentText.on('pointerout', () => {
                TournamentText.setStyle({ fill: 'white'}); 
            });

        let SaveText = this.add.text(startXSecondRow + gap, secondRowY, '  > Save ', { font: '15px', color: 'white' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => this.saveGame()); //add a function to save and a pop-up saying save successful
            SaveText.on('pointerover', () => {
                SaveText.setStyle({ fill: '#13b2f3'}); // when you hover changes color; alt: #41f3fd
            });
            SaveText.on('pointerout', () => {
                SaveText.setStyle({ fill: 'white'}); 
            });

        let SaveAndQuitText = this.add.text(startXSecondRow + 2 * gap, secondRowY, '  > Save & Quit', { font: '15px', color: 'DodgerBlue' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => {
                this.saveGame();  // Call the saveGame function
                this.scene.start('MainMenu');  // Transition to the MainMenu scene
            });
            SaveAndQuitText.on('pointerover', () => {
                SaveAndQuitText.setStyle({ fill: '#13b2f3'}); // when you hover changes color; alt: #41f3fd
            });
            SaveAndQuitText.on('pointerout', () => {
                SaveAndQuitText.setStyle({ fill: 'white'}); 
            });

            // below is using the webfontloader module to use external fonts for the scene
        WebFontLoader.default.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                InventoryText.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                ShopText.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                DojoText.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                TournamentText.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                SaveText.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                SaveAndQuitText.setFontFamily('"Press Start 2P"').setColor('#ffffff')
            }
        }) 

    }
    async saveGame() {
        // SAVES ALL VARIABLES NEEDED IN DATABASE
        const gameState = {
            inventory_items: this.registry.get('inventory_items'),
            inventory_astrobeasts: this.registry.get('inventory_astrobeasts'),
            playerName: this.registry.get('playerName'),
            inventory_moves: this.registry.get('inventory_moves'),
            walletTotal: this.registry.get('walletTotal')
            // will need to include other registry variables
        };
        try {
            const response = await fetch('/save_game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({gameState: gameState }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                console.log('Game saved:', data.message);
                // update to show feedback
                this.add.text(this.cameras.main.width / 2, 380, 'Save successful!', { font: '24px', color: 'green' }).setOrigin(0.5, 0);
            } else {
                console.error('Save failed:', data.message);
                this.add.text(this.cameras.main.width / 2, 380, 'Save failed!', { font: '24px', color: 'red' }).setOrigin(0.5, 0);
            }
        } catch (error) {
            console.error('Error saving game:', error);
            this.add.text(this.cameras.main.width / 2, 380, 'Error saving game.', { font: '24px', color: 'red' }).setOrigin(0.5, 0);
        }
    }
}

