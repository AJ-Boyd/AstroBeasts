export class DojoScene extends Phaser.Scene {
    constructor() {
        super('LoadDojo');
    }

    create() {
        this.add.text(100, 100, 'Dojo');  //, { fill: '#fff' } might have to load 3rd party text fillers
        // add load game functionality here

        let GoBackText = this.add.text(100, 300, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadHub'));
    }
}