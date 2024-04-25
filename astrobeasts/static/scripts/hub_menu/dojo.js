import * as WebFontLoader from '../webfontloader.js'
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
        this.add.image(0, 0, 'my').setOrigin(0, 0);
        
        let Title = this.add.text(100, 100, 'Dojo');  //, { fill: '#fff' } 
        // add load game functionality here

        let GoBackText = this.add.text(100, 550, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadHub'));
            GoBackText.on('pointerover', () => {
                GoBackText.setStyle({ fill: '#0f0'}); // when you hover, changes to white
            });
            GoBackText.on('pointerout', () => {
                GoBackText.setStyle({ fill: 'white'}); 
            });

        // Below is using the webfontloader module to use external fonts for the scene
        WebFontLoader.default.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                Title.setFontFamily('"Press Start 2P"')
                GoBackText.setFontFamily('"Press Start 2P"')
            }
        }) 
    }
}