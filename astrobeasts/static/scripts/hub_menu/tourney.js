import * as WebFontLoader from '../webfontloader.js'
export class TourneyScene extends Phaser.Scene {
    constructor() {
        super('LoadTourney');
    }
    preload() {
        // Load all possible inventory images even if user doesn't have them at the moment
        this.load.image('bgTourney', '/static/assets/Backgrounds/bCombat2.jpg');
    }

    create() {
        // Background Image
        const bgTourney = this.add.image(0, 0, 'my').setOrigin(0, 0);

        let Title = this.add.text(100, 100, 'Tourney');  //, { fill: '#fff' } might have to load 3rd party text fillers
        // add load game functionality here
        let GoFightText = this.add.text(480, 550, "To the Tournament >", { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('Preload')); 
            GoFightText.on('pointerover', () => {
                GoFightText.setStyle({ fill: '#0f0'}); // when you hover, changes to white
            });
            GoFightText.on('pointerout', () => {
                GoFightText.setStyle({ fill: 'white'}); 
            });
            ////
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
                GoFightText.setFontFamily('"Press Start 2P"')
            }
        }) 
    }
}