// third scene - load game
export class LoadGameScene extends Phaser.Scene {
    constructor() {
        super('LoadGame');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        this.add.text(centerX, 50, 'Choose your Save Slot', {font: '32px', color: 'orange', align: 'center'}).setOrigin(0.5, 0);
        
        let SaveSlot1Text= this.add.text(100, 140, 'Save Slot 1', {font: '24px', color: 'cyan'})
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadHub'));
        
        let SaveSlot2Text= this.add.text(100, 220, 'Save Slot 2', {font: '24px', color: 'cyan'})
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadHub'));

        let SaveSlot3Text= this.add.text(100, 300, 'Save Slot 3', {font: '24px', color: 'cyan'})
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadHub'));

        let GoBackText = this.add.text(100, 380, '< Back', {font: '24px', color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MainMenu'));
    }
}