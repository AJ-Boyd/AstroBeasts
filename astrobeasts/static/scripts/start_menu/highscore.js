export class HighScoreScene extends Phaser.Scene {
    constructor() {
        super('HighScore');
    }

    create() {
        this.add.text(100, 100, 'High Scores'); 
        this.add.text(100, 200, '1st name1'); 
        this.add.text(100, 300, '2nd name2'); 
        this.add.text(100, 400, '3rd name3'); 
        // add load game functionality here
        let GoBackText = this.add.text(100, 500, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('Options'));
    }
}