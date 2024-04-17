// third scene - load game
export class LoadGameScene extends Phaser.Scene {
    constructor() {
        super('LoadGame');
    }

    create ()
    {
        this.add.text(10, 10, 'Enter your name:, Hit enter when done', { font: '32px Courier', fill: '#ffffff' });

        const textEntry = this.add.text(10, 50, '', { font: '32px Courier', fill: '#ffff00' });

        let playerName = '';

        let inputHandler =  this.input.keyboard.on('keydown', event =>
        {
            if (event.keyCode === 8 && textEntry.text.length > 0)
            {
                textEntry.text = textEntry.text.substring(0, textEntry.text.length - 1);
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90))
            {
                textEntry.text += event.key;
            }else if (event.keyCode == 13){
                this.playerName = textEntry.text;
                //this.add.text(this.cameras.main.width / 2, 380, this.playerName, { font: '24px', color: 'green' }).setOrigin(0.5, 0);
                textEntry.text = '';
                this.check_name(this.playerName);

                inputHandler.removeListener('keydown');
            }
        });

        this.registry.set('playerName', playerName);

        
    }
    async check_name(my_name) {
        // Your async code to save the name goes here
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
                // Update to show feedback in a consistent and visible location
                const playerData = data.playerData;

                // Retrieve existing data
    
                // Update the registry
                this.registry.set('inventory_items', playerData['inventory_items']);
                this.registry.set('inventory_astrobeasts', playerData['inventory_astrobeasts']);
                this.registry.set('inventory_moves', playerData['inventory_moves']);
                this.registry.set('playerName', playerData.playerName)

                this.scene.start('LoadHub');
            } else {
                console.error('User does not exist in DB:', data.message);
                this.scene.start('NameInput');
            }
        } catch (error) {
            console.error('Error chekcing user:', error);
            this.add.text(this.cameras.main.width / 2, 380, 'Error chekcing user.', { font: '24px', color: 'red' }).setOrigin(0.5, 0);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: LoadGameScene
};

