import * as WebFontLoader from '../webfontloader.js'
export class CongratsScene extends Phaser.Scene {
    constructor() {
        super('LoadCongrats');
    }
    preload() {
        // Load all possible inventory images even if user doesn't have them at the moment
        this.load.image('bgCongrats', '/static/assets/Backgrounds/bTourney.png');
        this.load.image('trophy', '/static/assets/Objects/trophy.png')
    }

    create() {
        // Background Image
        const bgTourney = this.add.image(0, 0, 'bgCongrats').setOrigin(0, 0);
        const trophy = this.add.image(575, 330, 'trophy'); trophy.setScale(.85);

        // Title
        let Title = this.add.text(70, 90, "Congratulations!!!\nYou're the\nGalactic Champion!").setPadding(14);
        Title.setBackgroundColor('black').setFontSize(34).setAlign('center'); 

        // Enter
        let EnterText = this.add.text(300, 400, 'CLAIM')
            .setInteractive({ useHandCursor: true }).setPadding(16)
            .on('pointerdown', () => this.scene.start('LoadHub'));
            EnterText.setBackgroundColor('black').setFontSize(32);
            EnterText.on('pointerover', () => {
                EnterText.setStyle({ fill: '#13b2f3'}); // when you hover, changes to white
            });
            EnterText.on('pointerout', () => {
                EnterText.setStyle({ fill: 'white'}); 
            });
            // EnterText.on('pointerdown', () => Title.setVisible(false).setVisible(false));
        

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
