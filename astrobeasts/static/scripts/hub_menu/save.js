export class SaveScene extends Phaser.Scene {
    constructor() {
        super('SaveGame');
    }

    create() {
        console.log('Moves inventory after purchase:', this.registry.get('inventory_moves'));
    
        const centerX = this.cameras.main.width / 2;
        this.add.text(centerX, 50, 'Choose your Save Slot', {font: '32px', color: 'orange', align: 'center'}).setOrigin(0.5, 0);


        this.createSaveButton(centerX, 140, 'Save Slot 1', 1);
        this.createSaveButton(centerX, 220, 'Save Slot 2', 2);
        this.createSaveButton(centerX, 300, 'Save Slot 3', 3);


        this.add.text(100, 350, '< Back', { font: '24px', color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadHub'));
    }

    createSaveButton(x, y, text, slot) {
        this.add.text(x, y, text, { font: '24px', color: 'cyan' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0) // Center the button text
            .on('pointerdown', () => this.saveGame(slot));
    }

    async saveGame(slot) {
        // SAVES ALL VARIABLES NEEDED IN DATABASE

        console.log('Current inventory moves:', this.registry.get('inventory_moves'));

        
        const gameState = {
            inventory_items: this.registry.get('inventory_items'),
            inventory_astrobeasts: this.registry.get('inventory_astrobeasts'),
            inventory_moves: this.registry.get('inventory_moves'),
            playerName: this.registry.get('playerName'),
            walletTotal: this.registry.get('walletTotal')
            // will need to include other registry variables
        };
        try {
            const response = await fetch('/save_game', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ slot: slot.toString(), gameState: gameState }),
            });
            const data = await response.json();
            if (data.status === 'success') {
                console.log('Game saved:', data.message);
                // Update to show feedback in a consistent and visible location
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
