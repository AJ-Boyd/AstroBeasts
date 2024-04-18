// third scene - load game
export class LoadGameScene extends Phaser.Scene {
    constructor() {
        super('LoadGame');
    }

    create() {
        this.add.text(100, 100, 'Load Game Scene', { color: '#fff' });
        // add load game functionality here
    }
}