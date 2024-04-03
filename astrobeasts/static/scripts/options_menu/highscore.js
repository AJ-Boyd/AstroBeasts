export class HighScoreScene extends Phaser.Scene {
    constructor() {
        super('HighScore');
    }

    create() {                      // Retrive data from database on high scores
        this.add.text(100, 90, 'High Scores', {font: '34px', color: 'yellow', stroke: 'yellow', strokeThickness: 1 }); 
        this.add.text(100, 150, '1st\t name1: \t\tWins: \n     Exp: \t\tCredits: ', {font: '22px', color: 'yellow'});           
        this.add.text(100, 250, '2nd\t name2: \t\tWins: \n     Exp: \t\tCredits: ', {font: '22px', color: 'yellow'}); 
        this.add.text(100, 350, '3rd\t name3: \t\tWins: \n     Exp: \t\tCredits: ', {font: '22px', color: 'yellow'}); 
        // add load game functionality here
        let GoBackText = this.add.text(100, 500, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('Options'));
    }
}