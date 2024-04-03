export class CreditsScene extends Phaser.Scene {
    constructor() {
        super('RollCredits');
    }

    create() {
        this.add.text(100, 90, 'Astrobeasts', {font: '34px', color: 'yellow', stroke: 'yellow', strokeThickness: 1 }); 
        this.add.text(100, 150, 'Created by the Russian Blue Studios © 2024', {font: '22px', color: 'yellow'});           // Retrive data from database on high scores
        this.add.text(100, 200, 'Leann Alhashishi ', {font: '22px', color: 'yellow'}); 
        this.add.text(100, 250, 'AJ Alano', {font: '22px', color: 'yellow'}); 
        this.add.text(100, 300, 'Casey Hanley', {font: '22px', color: 'yellow'}); 
        this.add.text(100, 350, 'Aamil Vahora', {font: '22px', color: 'yellow'}); 
        this.add.text(100, 400, 'Josh Joo', {font: '22px', color: 'yellow'}); 
        this.add.text(100, 450, 'CMSC 447 Software Engineering - Spring - Allgood ', {font: '22px', color: 'yellow'});
        // add load game functionality here
        let GoBackText = this.add.text(100, 500, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('Options'));
    }
}