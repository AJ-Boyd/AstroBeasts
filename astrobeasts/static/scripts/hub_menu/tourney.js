export class TourneyScene extends Phaser.Scene {
    constructor() {
        super('LoadTourney');
    }

    create() {
        this.add.text(100, 100, 'Tourney');  //, { fill: '#fff' } might have to load 3rd party text fillers
        // add load game functionality here
        let GoBackText = this.add.text(100, 300, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadHub'));
    }
}