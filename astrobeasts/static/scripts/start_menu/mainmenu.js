// first scene - start menu
// calls newgame, loadgame, and options scenes
export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu');
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