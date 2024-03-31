export class InventoryScene extends Phaser.Scene {
    constructor() {
        super('LoadInventory');
    }

    preload() {
        this.load.image('sky', 'static/assets/Backgrounds/bPlanets.jpg');
        this.load.image('skol', 'static/assets/Objects/skol.png');
        this.load.image('tarkeel', 'static/assets/Objects/tarkeel.png');
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        // Define tabs at the class level for easier access
        
        const backButtonX = this.cameras.main.width - 100; 
        const backButtonY = this.cameras.main.height - 50;

       // next button to go to tutorial
       this.backButton = this.add.text(backButtonX, backButtonY, ' > Back', { color: '#0f0' })
            .setInteractive({ useHandCursor: true }) 
            .setOrigin(0.5, 0.5); 

        this.backButton.on('pointerdown', () => {
            this.scene.start('LoadHub'); 
        });
        
        this.backButton.on('pointerover', () => {
            this.backButton.setStyle({ fill: '#fff'}); // when you hover, changes to white
        });

        this.backButton.on('pointerout', () => {
            this.backButton.setStyle({ fill: '#0f0'}); 
        });

        
    }
   
}