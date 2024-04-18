// Display options
import * as WebFontLoader from '../webfontloader.js'
export class OptionsScene extends Phaser.Scene {
    constructor() {
        super('Options');
    }

    preload() {
        this.load.image('my', 'static/assets/Backgrounds/bPlanets.png');
    }
    create() {
        this.add.image(0, 0, 'my').setOrigin(0, 0);
        let Option = this.add.text(100, 90, 'Options', {font: '34px', color: 'white', stroke: 'white', strokeThickness: 1 });
        
        let HighScore = this.add.text(100, 180, 'High Scores', {font: '24px', color: 'deeppink' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('HighScore'));
            HighScore.on('pointerover', () => {
                HighScore.setStyle({ fill: '#13b2f3'}); // when you hover changes color; alt: #41f3fd
            });
            HighScore.on('pointerout', () => {
                HighScore.setStyle({ fill: 'white'}); 
            });

        let Rollcreds = this.add.text(100, 230, 'Credits', {font: '24px', color: 'deeppink' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('RollCredits'));
            Rollcreds.on('pointerover', () => {
                Rollcreds.setStyle({ fill: '#13b2f3'}); // when you hover changes color; alt: #41f3fd
            });
            Rollcreds.on('pointerout', () => {
                Rollcreds.setStyle({ fill: 'white'}); 
            });

        let Music = this.add.text(100, 280, 'Mute Music □', {font: '24px', color: 'deeppink' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => {
                this.add.text(365, 280, '✓', {font: '24px', color: 'white' })           
                let music = this.game.registry.get('bgMusic');
                let isMuted = this.game.registry.get('isMuted');
                isMuted = !isMuted; // Toggle the current state
                music.setMute(isMuted);
                this.game.registry.set('isMuted', isMuted); // Update the registry with new state
            });
            Music.on('pointerover', () => {
                Music.setStyle({ fill: '#13b2f3'}); // when you hover changes color; alt: #41f3fd
            });
            Music.on('pointerout', () => {
                Music.setStyle({ fill: 'white'}); 
            });
        

        let GoBackText = this.add.text(100, 500, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('MainMenu'));
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
                Option.setFontFamily('"Press Start 2P"').setColor('yellow')
                HighScore.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                Rollcreds.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                Music.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                GoBackText.setFontFamily('"Press Start 2P"').setColor('#ffffff')
            }
        }) 
    }
}
