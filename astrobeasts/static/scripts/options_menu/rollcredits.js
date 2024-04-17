import * as WebFontLoader from '../webfontloader.js'
export class CreditsScene extends Phaser.Scene {
    constructor() {
        super('RollCredits');
    }

    create() {
        this.add.image(0, 0, 'my').setOrigin(0, 0);
        let Title = this.add.text(100, 90, 'Astrobeasts', {font: '34px', color: 'yellow', stroke: 'yellow', strokeThickness: 1 }); 
        let line1 = this.add.text(100, 150, 'Made by Russian Blue Studios ©', {font: '22px', color: 'yellow'});           // Retrive data from database on high scores
        let line2 = this.add.text(100, 200, 'Leann Alhashishi ', {font: '22px', color: 'yellow'}); 
        let line3 = this.add.text(100, 250, 'AJ Alano', {font: '22px', color: 'yellow'}); 
        let line4 = this.add.text(100, 300, 'Casey Hanley', {font: '22px', color: 'yellow'}); 
        let line5 = this.add.text(100, 350, 'Aamil Vahora', {font: '22px', color: 'yellow'}); 
        let line6 = this.add.text(100, 400, 'Josh Joo', {font: '22px', color: 'yellow'}); 
        let line7 = this.add.text(100, 450, 'CMSC 447 Software Engineering \n- Spring - Allgood ', {font: '14px', color: 'yellow'});
        
        let GoBackText = this.add.text(100, 500, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('Options'));
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
                Title.setFontFamily('"Press Start 2P"').setColor('yellow')
                line1.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                line2.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                line3.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                line4.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                line5.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                line6.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                line7.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                GoBackText.setFontFamily('"Press Start 2P"').setColor('#ffffff')
            }
        }) 
    }
}