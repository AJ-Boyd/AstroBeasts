import * as WebFontLoader from '../webfontloader.js'
export class DojoScene extends Phaser.Scene {
    constructor() {
        super('LoadDojo');
    }
    preload() {
        // Load all possible inventory images even if user doesn't have them at the moment
        this.load.image('bgDojo', '/static/assets/Backgrounds/dojo.png');
    }

    create() {
        // Background Image
        this.add.image(0, 0, 'bgDojo').setOrigin(0, 0);
        
        // Title
        let Title = this.add.text(170, 90, "Welcome to the\nDojo!");
        Title.setBackgroundColor('black').setPadding(14);
        Title.setFontSize(32).setAlign('center').setColor('white'); 

        // Enter
        let EnterText = this.add.text(320, 430, 'FIGHT')
            .setInteractive({ useHandCursor: true }).setPadding(16)
            .on('pointerdown', () => this.scene.start('LoadSemi'));
            EnterText.setBackgroundColor('black').setFontSize(32);
            // EnterText.on('pointerdown', () => Title.setVisible(false).setVisible(false));
            EnterText.on('pointerover', () => {
                EnterText.setStyle({ fill: 'yellow'}); // when you hover, changes to white
            });
            EnterText.on('pointerout', () => {
                EnterText.setStyle({ fill: 'white'}); 
            });

        // Back
        let GoBackText = this.add.text(100, 550, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true }).setBackgroundColor('black')
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
                EnterText.setFontFamily('"Press Start 2P"')
            }
        }) 
    }
}