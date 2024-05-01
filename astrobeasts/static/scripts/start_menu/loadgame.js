// third scene - load game
import * as WebFontLoader from '../webfontloader.js'
export class LoadGameScene extends Phaser.Scene {
    constructor() {
        super('LoadGame');
    }
    preload() {
        // Load all possible inventory images even if user doesn't have them at the moment
        this.load.image('bgLoad', '/static/assets/Backgrounds/bStars.jpg');
    }

    create () {
        this.add.image(0, 0, 'bgLoad').setOrigin(0, 0).setScale(1.5);
        this.add.image(0, 300, 'bgLoad').setOrigin(0, 0).setScale(1.5);
        this.add.image(350, 0, 'bgLoad').setOrigin(0, 0).setScale(1.5);
        this.add.image(350, 300, 'bgLoad').setOrigin(0, 0).setScale(1.5);

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const name_input = this.add.text(centerX, centerY - 60, 'Enter your name:', {font: '20px', color: '#ffffff'}).setOrigin(0.5, 0.5);

        const textEntry =  this.add.text(centerX, centerY, '', {font: '20px', color: '#ffff00'}).setOrigin(0.5, 0.5);

        let playerName = '';

        let cursor = this.add.text(centerX + 5, centerY, '|', {font: '20px', color: '#ffff00'}).setOrigin(0.5, 0.5);

        this.input.keyboard.on('keydown', (event) => {
            if (event.keyCode === 8 && textEntry.text.length > 0) {  // detects backspace
                textEntry.setText(textEntry.text.substring(0, textEntry.text.length - 1));
            } else if ((event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) && textEntry.text.length < 15) {  // user can only enter up to 15 characters
                textEntry.setText(textEntry.text + event.key);
            }
            cursor.setPosition(textEntry.getTopRight().x - 3, textEntry.y); 
        });

        // blinking cursor effect at the end of text
        this.time.addEvent({
            delay: 530,  
            callback: () => {
                cursor.visible = !cursor.visible;
            },
            loop: true
        });

        // button for submitting the name
        const okButton = this.add.text(centerX, centerY + 60, 'OK!', {
            font: '20px Arial', color: '#00ff00'
        }).setOrigin(0.5, 0.5).setInteractive().setPadding(10).setStyle({ backgroundColor: '#000' });

        okButton.on('pointerdown', () => {
            this.playerName = textEntry.text.trim();
            if (this.playerName.length > 0) {
                textEntry.setText('');
                this.check_name(this.playerName);
            } else {
                name_input.setText('Please enter a name:');
            }
        });

        okButton.on('pointerover', () => {
            okButton.setStyle({ fill: '#fff'}); // when you hover, changes to white
        });

        okButton.on('pointerout', () => {
            okButton.setStyle({ fill: '#0f0'}); 
        });
        
        

        // below is using the webfontloader module to use external fonts for the scene
        WebFontLoader.default.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                name_input.setFontFamily('"Press Start 2P"').setColor('#ffff')
                textEntry.setFontFamily('"Press Start 2P"').setColor('#0f0')
                okButton.setFontFamily('"Press Start 2P"')
            }
        }) 

        
    }
    async check_name(my_name) {
        try {
            const response = await fetch('/check_name', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: my_name }),
            });
            const data = await response.json();
            if (data.exists) {
                console.log('user exists inside of DB:', data.message);
                console.log("Loaded score:", data.playerData.Score); 
                // update to show feedback
                const playerData = data.playerData;

                // retrieve existing data
    
                // update the registry
                this.registry.set('inventory_items', playerData['inventory_items']);
                this.registry.set('inventory_astrobeasts', playerData['inventory_astrobeasts']);

                console.log(this.registry.get('inventory_astrobeasts'))


                this.registry.set('inventory_moves', playerData['inventory_moves']);
                //this.registry.set('playerName', playerData.playerName)
                this.registry.get("player").setName(data.playerData.playerName)
                this.registry.get('player').setCredits(data.playerData.walletTotal)
                this.registry.get('player').setScore(data.playerData.Score);
                this.registry.get('player').setLevel(data.playerData.Level);
                this.scene.start('LoadHub');
            } else {
                console.error('User does not exist in DB:', data.message);
                this.scene.start('NameInput');
            }
        } catch (error) {
            console.error('Error checking user:', error);
            this.add.text(this.cameras.main.width / 2, 380, 'Error chekcing user.', { font: '24px', color: 'red' }).setOrigin(0.5, 0);
        }
    }
}
/*
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: LoadGameScene
};
*/

