// first scene - start menu
// calls newgame, loadgame, and options scenes
export class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    create() {

        // center of screen horizontally (x axis)
        const centerX = this.cameras.main.width / 2;

        this.add.text(centerX, 50, 'AstroBeasts', {font: '64px', fill: '#0f0', align: 'center'}).setOrigin(0.5, 0);

        let startGameText= this.add.text(100, 200, 'Start New Game', { fill: '#0f0' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('NewGame'));
        
        let loadGameText = this.add.text(100, 300, 'Load Game', { fill: '#0f0' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadGame'));

        let optionsText = this.add.text(100, 400, 'Options', { fill: '#0f0' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('Options'));

    }
}