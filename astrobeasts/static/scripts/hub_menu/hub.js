// THE HUB 
export class HubScene extends Phaser.Scene {
    constructor() {
        super('LoadHub');
    }

    create() {

        // center of screen horizontally (x axis)
        const centerX = this.cameras.main.width / 2;
        this.add.text(centerX, 50, 'The Hub', {font: '48px', color: 'orange', align: 'center'}).setOrigin(0.5, 0);

        let InventoryText= this.add.text(100, 125, 'Inventory', {font: '22px', color: 'DodgerBlue' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadInventory'));
        
        let ShopText = this.add.text(100, 200, 'Shop', {font: '22px', color: 'MediumSeaGreen' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadShop'));

        let DojoText = this.add.text(100, 275, 'Dojo', {font: '22px', color: 'crimson' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadDojo'));

        let TournamentText = this.add.text(100, 350, 'Tournament', {font: '22px', color: 'gold' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadTourney'));

        let GoBackText = this.add.text(100, 425, 'Save & Quit', {font: '22px', color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MainMenu'));
    }
}

