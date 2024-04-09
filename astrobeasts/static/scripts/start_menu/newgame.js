// second scene - new game
export class NewGameScene extends Phaser.Scene {
    constructor() {
        super('NewGame');
    }

    // WHERE GLOBAL REGISTERY IS CREATED
    // creates any global variable that has to be accessed in multiple scenes
    init() {

         // inventory contains dictionary items, where each dictionary represents an item. it has the following variables:
        // 1. key (image name), 2. name (item's name), 3. description, 4. quantity, 5. isEquipped (has the player equipped this item for battle?)
        this.registry.set('inventory', [{ key: 'atk_potion', name: 'ATK Potion', description: 'Increases ATK by 10', quantity: 5, isEquipped: false },
        { key: 'cookies', name: 'cookies', description: 'Restores 20 HP', quantity: 1, isEquipped: false }]); // should be list of dicts with the item name and its key that cooresponds to it's png path
        
        // astrobeasts contain dictionaries, where each dictionary represents an astrobeast. it has the following variables:
        // 1. key (image name), 2. name (astrobeast name), 3. description (it's affinity), 4. quantity (always 1), 5. isEquipped (has the player equipped this beast for battle?)
        this.registry.set('astrobeasts', [{ key: 'skol', name: 'Skol', description: 'Fire AstroBeast', quantity: 1, isEquipped: false },
        { key: 'tarkeel', name: 'Tarkeel', description: 'Water AstroBeast', quantity: 1, isEquipped: false }]); // similar as above. showing starter astrobeasts
        

        // moves contain dictionaries, where each dictionary represents a move. it has the following variables:
        // 1. key (image name), 2. name (move name), 3. description (what it does), 4. quantity, 5. isEquipped (has the player equipped this  for battle?)
        this.registry.set('moves', [{ key: 'slash', name: 'Slash', description: 'Deals damage to enemy', quantity: 2, isEquipped: false },
        { key: 'headbutt', name: 'Headbutt', description: 'Deals damage to enemy', quantity: 1, isEquipped: false }]); 
        
        this.registry.set('playerName', '');

        // caps for equipped items/astrobeasts/moves
        this.registry.set('maxItemsEquipped', 5);
        this.registry.set('maxAstrobeastsEquipped', 4);
        this.registry.set('maxMovesEquipped', 5);
        this.registry.set('currentItemsEquipped', 0);
        this.registry.set('currentAstrobeastsEquipped', 0);
        this.registry.set('currentMovesEquipped', 0);    
    }

    preload() {
        this.load.image('sky', 'static/assets/Backgrounds/bPlanets.jpg');
    }

    create() {
        // need to scale background image properly
        this.add.image(0, 0, 'sky').setOrigin(0, 0);
        const introText = "a long time ago in a galaxy far, far away....";
        const displayText = this.add.text(100, 100, '', { font: '16px Arial', color: '#ffffff', align: 'center' });

        // add typing effect event
        let index = 0;
        this.time.addEvent({
            delay: 120, // how fast text is typed
            callback: () => {
                displayText.text += introText[index++]; // display letters one by one
            },
            repeat: introText.length - 1
        });

        const nextButtonX = this.cameras.main.width - 100; 
        const nextButtonY = this.cameras.main.height - 50;
        // next button to go to tutorial
        const nextButton = this.add.text(nextButtonX, nextButtonY, 'Next >', { color: '#0f0' })
            .setInteractive({ useHandCursor: true }) 
            .setOrigin(0.5, 0.5); 

        nextButton.on('pointerdown', () => {
            this.scene.start('NameInput'); 
        });
        
        nextButton.on('pointerover', () => {
            nextButton.setStyle({ fill: '#fff'}); // when you hover, changes to white
        });

        nextButton.on('pointerout', () => {
            nextButton.setStyle({ fill: '#0f0'}); 
        });
    }
}

export class NameInputScene extends Phaser.Scene {
    constructor() {
        super('NameInput')
    }
    
    preload() {
        this.load.image('sky', 'static/assets/Backgrounds/bPlanets.jpg');
        this.load.image('dude','static/assets/Objects/astronaut.png'); // just used a random placeholder image for our player
    }

    create() {
        // need to scale background image properly
        this.add.image(0, 0, 'sky').setOrigin(0, 0);

       // calculated left side of screen and right side of screen
        const left = this.cameras.main.height / 2;
        const textX = 3 * this.cameras.main.width / 4; 

        this.add.text(textX, 200, 'What is your name?', { color: '#0f0',  align: 'center' }).setOrigin(0.5, 0);
        
         // create form for user to input info
         // will need to make it look pretty with bootstrap!
         const formHtml = `
            <input type="text" name="nameField" placeholder="Enter your name">
            <button type="button" name="playButton">OK</button>
        `;

        // create the form, using dom module (which gives the ability to interact with HTML objects on our phaser canvas)
        let element = this.add.dom(textX, 300).createFromHTML(formHtml).setOrigin(0.5);
 
        element.addListener('click');
        element.on('click', (event) => {
            if (event.target.name === 'playButton') {
                let inputText = document.querySelector('input[name="nameField"]'); // player name
 
                if (inputText instanceof HTMLInputElement && inputText.value !== '') {
                    this.registry.set('playerName', inputText.value);
                    this.scene.start('PickYourStarter');
                } else {
                    this.add.text(textX, 400, 'Please input a name!', { color: '#0f0', align: 'center' }).setOrigin(0.5, 0);
                }
            }
        });
        let player = this.add.image(200, left, 'dude').setOrigin(0.5, 0.5);
    }
}

export class PickYourStarterScene extends Phaser.Scene {
    constructor() {
        super('PickYourStarter');
    }
    preload() {
        this.load.image('sky', 'static/assets/Backgrounds/bPlanets.jpg');
        this.load.image('skol', 'static/assets/Objects/skol.png');
        this.load.image('tarkeel', 'static/assets/Objects/tarkeel.png');
    }
    create() {
        // below is the "here are your starters" screen
        this.add.image(0, 0, 'sky').setOrigin(0, 0);

        // player name from registery
        const playerName = this.registry.get('playerName');

        const centerX = this.cameras.main.width / 2;
        const left = centerX / 2;
        const right = 3 * centerX / 2;
        const imageY = 250; 
        const textYOffset = 100; // bottom of the image and top of the text margin


        this.add.text(centerX, 50, `Here are your starter AstroBeasts, ${playerName}!`, {font: '30px', color: '#0f0', align: 'center'}).setOrigin(0.5, 0);

        // skol
        const skolX = this.cameras.main.width / 4;
        this.add.text(left, 150, "Skol", {color: '#0f0', align: 'center'}).setOrigin(0.5, 0.5);
        this.add.image(skolX, imageY, 'skol').setOrigin(0.5, 0.5).setScale(0.5);;
        this.add.text(skolX, imageY + textYOffset, "Level 1\nRarity: Common\nClass: Balanced\nATK: 300\nDEF: 250\nDEX: 300\nSPD: 300\nLUK: 250", { color: '#0f0', align: 'center' }).setOrigin(0.5, 0);

        // tarkeel
        const tarkeelX = 3 * this.cameras.main.width / 4; 
        this.add.text(right, 150, "Tarkeel", {color: '#0f0', align: 'center'}).setOrigin(0.5, 0.5);
        this.add.image(tarkeelX, imageY, 'tarkeel').setOrigin(0.5, 0.5).setScale(0.5);;
        this.add.text(tarkeelX, imageY + textYOffset, "Level 1\nRarity: Common\nClass: Assassin\nATK: 194\nDEF: 128\nDEX: 448\nSPD: 500\nLUK: 130", { color: '#0f0', align: 'center' }).setOrigin(0.5, 0);

        const nextButtonX = this.cameras.main.width - 100; 
        const nextButtonY = this.cameras.main.height - 50;

       // next button to go to tutorial
        const nextButton = this.add.text(nextButtonX, nextButtonY, 'Next >', { color: '#0f0' })
            .setInteractive({ useHandCursor: true }) 
            .setOrigin(0.5, 0.5); 

        nextButton.on('pointerdown', () => {
            this.scene.start('Tutorial'); 
        });
        
        nextButton.on('pointerover', () => {
            nextButton.setStyle({ fill: '#fff'}); // when you hover, changes to white
        });

        nextButton.on('pointerout', () => {
            nextButton.setStyle({ fill: '#0f0'}); 
        });
    }
}

export class TutorialScene extends Phaser.Scene {
    constructor() {
        super('Tutorial');
    }

    preload() {
        this.load.image('sky', 'static/assets/Backgrounds/bPlanets.jpg');
        this.tutorialStep = 0;
    }

    create() {
        this.askForTutorial();
    }

    askForTutorial() {
        // asks the user if they want a tutorial or not. if not, proceed to loadgame.js
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;
        this.add.text(centerX, centerY - 50, 'Would you like a tutorial of the game?', { color: '#0f0', align: 'center' })
            .setOrigin(0.5, 0.5);

        
        const yesButton = this.add.text(centerX - 100, centerY + 50, 'Yes', { color: '#0f0' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5);

        yesButton.on('pointerdown', () => {
            // if yes, start tutorial
            // currently leaving empty until more of the gameplay is completed in order to have accurate tutorial
           
        });

        const noButton = this.add.text(centerX + 100, centerY + 50, 'No', { color: '#0f0' })
            .setInteractive({ useHandCursor: true })
            .setOrigin(0.5, 0.5);

        noButton.on('pointerdown', () => {
            // if no, load game // we go save menue
            this.scene.start('SaveGame');
        });

        [yesButton, noButton].forEach(button => {
            button.on('pointerover', () => {
                button.setStyle({ fill: '#fff' });
            });

            button.on('pointerout', () => {
                button.setStyle({ fill: '#0f0' });
            });
        });
    }

}