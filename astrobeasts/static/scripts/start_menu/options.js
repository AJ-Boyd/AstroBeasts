// fourth scene - display options
export class OptionsScene extends Phaser.Scene {
    constructor() {
        super('Options');
    }

    create() {
        this.add.text(100, 100, 'OPTIONS STUFF HERE', { color: 'white' });
        // add options functionality here
        
        let HighScore = this.add.text(100, 200, 'High Scores', { color: 'magenta' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('HighScore'));

        let smthn = this.add.text(100, 300, 'option 2', { color: 'magenta' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('HighScore'));

        let smelse = this.add.text(100, 400, 'option 3', { color: 'deeppink' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('HighScore'));

        let GoBackText = this.add.text(100, 500, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MainMenu'));
    }
}