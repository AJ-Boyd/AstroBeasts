// second scene - new game
export class NewGameScene extends Phaser.Scene {
    constructor() {
        super('NewGame');
    }

    create() {
        this.add.text(100, 100, 'New Game Scene', { fill: '#fff' });
        // add new game functionality here
    }
}