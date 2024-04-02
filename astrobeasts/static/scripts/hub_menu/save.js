export class SaveScene extends Phaser.Scene {
    constructor() {
        super('SaveGame');
    }

    create() {
        this.add.text(100, 100, 'Game saved.');  
        // add load game functionality here
        let GoBackText = this.add.text(100, 300, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadHub'));
    }
}