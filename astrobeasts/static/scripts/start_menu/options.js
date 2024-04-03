// fourth scene - display options
export class OptionsScene extends Phaser.Scene {
    constructor() {
        super('Options');
    }

    create() {
        this.add.text(100, 90, 'Options', {font: '34px', color: 'white', stroke: 'white', strokeThickness: 1 });
        // add options functionality here
        
        let HighScore = this.add.text(100, 150, 'High Scores', {font: '24px', color: 'deeppink' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('HighScore'));

        let smthn = this.add.text(100, 200, 'Credits', {font: '24px', color: 'deeppink' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('RollCredits'));

        let smelse = this.add.text(100, 250, 'Option 3', {font: '24px', color: 'deeppink' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('HighScore'));

        let GoBackText = this.add.text(100, 500, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MainMenu'));
    }
}