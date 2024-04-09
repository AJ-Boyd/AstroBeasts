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

        let rollcreds = this.add.text(100, 200, 'Credits', {font: '24px', color: 'deeppink' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('RollCredits'));

        let muwusic = this.add.text(100, 250, 'Mute Music', {font: '24px', color: 'deeppink' })
        let musicOff = this.add.text(260, 250, '□', {font: '28px', color: 'deeppink' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.add.text(260, 250, '✓', {font: '24px', color: 'white' }));
            // ADD MUSIC MUTE FUNCTIONALITY
        

        let GoBackText = this.add.text(100, 500, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MainMenu'));
    }
}