export class DojoScene extends Phaser.Scene {
    constructor() {
        super('LoadDojo');
    }
    preload() {
        // Load all possible inventory images even if user doesn't have them at the moment
        this.load.image('bgDojo', '/static/assets/Backgrounds/bCombat2.jpg');
    }

    create() {
        // Background Image
        const bgShop = this.add.image(0, 0, 'bgDojo').setOrigin(0, 0);
        
        this.add.text(100, 100, 'Dojo');  //, { fill: '#fff' } 
        // add load game functionality here

        let GoBackText = this.add.text(100, 550, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadHub'));
    }
}