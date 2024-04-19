// fourth scene - display options
export class OptionsScene extends Phaser.Scene {
    constructor() {
        super('Options');
    }

    create() {
        this.add.text(100, 100, 'is this working lol', { fill: '#fff' });
        // add options functionality here
    }
}