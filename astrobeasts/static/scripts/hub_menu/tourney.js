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
        const bgTourney = this.add.image(0, 0, 'bgTourney').setOrigin(0, 0);

        this.add.text(100, 100, 'Tourney');  //, { fill: '#fff' } might have to load 3rd party text fillers
        // add load game functionality here
        let GoBackText = this.add.text(100, 300, '< Back', { color: 'white' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => this.scene.start('LoadHub'));
    }
}