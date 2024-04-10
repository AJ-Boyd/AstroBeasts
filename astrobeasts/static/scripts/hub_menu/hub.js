// THE HUB 
export class HubScene extends Phaser.Scene {
    constructor() {
        super('LoadHub');
    }

    preload() {
        this.load.image('hub', 'static/assets/Backgrounds/The_Hub.jpg');
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
        let InventoryText = this.add.text(startXFirstRow, firstRowY, ' > Inventory', { font: '22px', color: 'DodgerBlue' })
        .setInteractive({ useHandCursor: true })
        .setOrigin(0.5, 0.5)
        .on('pointerdown', () => this.scene.start('LoadInventory'));
       
        let ShopText = this.add.text(startXFirstRow + gap, firstRowY, ' > Shop', { font: '22px', color: 'MediumSeaGreen' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => this.scene.start('LoadShop'));

        let DojoText = this.add.text(startXFirstRow + 2 * gap, firstRowY, ' > Dojo', { font: '22px', color: 'crimson' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => this.scene.start('LoadDojo'));

        // second row of options
        let TournamentText = this.add.text(startXSecondRow, secondRowY, ' > Tournament', { font: '22px', color: 'gold' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => this.scene.start('LoadTourney'));

        let SaveText = this.add.text(startXSecondRow + gap, secondRowY, ' > Save', { font: '22px', color: 'white' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => this.scene.start('SaveGame')); //add a function to save and a pop-up saying save successful

        let SaveAndQuitText = this.add.text(startXSecondRow + 2 * gap, secondRowY, ' > Save & Quit', { font: '22px', color: 'DodgerBlue' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5)
            .on('pointerdown', () => this.scene.start('MainMenu'));

    }
}

