// fourth scene - display options
export class OptionsScene extends Phaser.Scene {
    constructor() {
        super('Options');
    }

    create() {
        this.add.text(100, 100, 'OPTIONS STUFF HERE', { color: '#fff' });
        // add options functionality here

        let GoBackText = this.add.text(100, 300, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MainMenu'));
    }
}