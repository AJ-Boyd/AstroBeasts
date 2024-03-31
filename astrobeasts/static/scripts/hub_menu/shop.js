export class ShopScene extends Phaser.Scene {
    constructor() {
        super('LoadShop');
    }

    create() {
        this.add.text(100, 100, 'Shop');  //, { fill: '#fff' } might have to load 3rd party text fillers
        // add load game functionality here
        let GoBackText = this.add.text(100, 300, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadHub'));
    }
}