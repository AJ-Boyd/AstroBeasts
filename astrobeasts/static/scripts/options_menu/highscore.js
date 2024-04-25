import * as WebFontLoader from '../webfontloader.js'
export class HighScoreScene extends Phaser.Scene {
    constructor() {
        super('HighScore');
    }

    create() {                      
        // Retrive data from database on high scores with API call
        this.add.image(0, 0, 'my').setOrigin(0, 0);
        let Title = this.add.text(100, 90, 'High Scores', {font: '34px', color: 'yellow', stroke: 'yellow', strokeThickness: 1 }); 
        let line1 = this.add.text(100, 150, '1st\t name1: \t\tWins: \n     Exp: \t\tCredits: ', {font: '22px', color: 'yellow'});           
        let line2 = this.add.text(100, 220, '2nd\t name2: \t\tWins: \n     Exp: \t\tCredits: ', {font: '22px', color: 'yellow'}); 
        let line3 = this.add.text(100, 290, '3rd\t name3: \t\tWins: \n     Exp: \t\tCredits: ', {font: '22px', color: 'yellow'}); 
        let line4 = this.add.text(100, 350, '4th\t name4: \t\tWins: \n     Exp: \t\tCredits: ', {font: '22px', color: 'yellow'}); 
        let line5 = this.add.text(100, 410, '5th\t name5: \t\tWins: \n     Exp: \t\tCredits: ', {font: '22px', color: 'yellow'}); 
        // add load game functionality here
        let GoBackText = this.add.text(100, 500, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('Options'));
            GoBackText.on('pointerover', () => {
                GoBackText.setStyle({ fill: '#0f0'}); // when you hover, changes to white
            });
            GoBackText.on('pointerout', () => {
                GoBackText.setStyle({ fill: 'white'}); 
            });
        
        // below is using the webfontloader module to use external fonts for the scene
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
                GoBackText.setFontFamily('"Press Start 2P"').setColor('#ffffff')
            }
        }) 
    }
}