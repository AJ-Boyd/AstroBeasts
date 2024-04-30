import * as WebFontLoader from '../webfontloader.js'
export class SemiScene extends Phaser.Scene {
    constructor() {
        super('LoadSemi');
    }
    preload() {
        // Load all possible inventory images even if user doesn't have them at the moment
        this.load.image('bgTourney', '/static/assets/Backgrounds/bTourney.png');
        this.load.image('jumbo', '/static/assets/Backgrounds/jumbotron.png')
        this.load.image('astronaut', '/static/assets/Objects/astronaut.png')
        this.load.image('boss2', '/static/assets/Objects/boss2.png')
    }

    create() {
        // Background Image
        const bgTourney = this.add.image(0, 0, 'bgTourney').setOrigin(0, 0);
        const jumbotron = this.add.image(-4,0,'jumbo').setOrigin(0,0); jumbotron.setScale(1.4);
        const Naut = this.add.image(200,330, 'astronaut'); Naut.setScale(.7);
        const Wiz = this.add.image(575, 330, 'boss2'); Wiz.setScale(.85);

        // Title
        let Title = this.add.text(150, 90, "Semi-Finals\nPlayer vs Teresa");
        //Title.setBackgroundColor('black').setPadding(14);
        Title.setFontSize(32).setAlign('center').setColor('white'); 

        // Enter
        let EnterText = this.add.text(300, 430, 'FIGHT')
            .setInteractive({ useHandCursor: true }).setPadding(16)
            .on('pointerdown', () => {this.registry.set("isTournament", true); this.scene.start('Preload')});
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