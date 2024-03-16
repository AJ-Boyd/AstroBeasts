// second scene - new game
export class NewGameScene extends Phaser.Scene {
    constructor() {
        super('NewGame');
    }

    preload() {

        this.load.image('sky', 'static/assets/Backgrounds/bPlanets.jpg');
        this.load.image('dude','static/assets/Objects/astronaut.png'); // just used a random placeholder image for our player

    }

    create() {
        // need to scale background image properly
        this.add.image(0, 0, 'sky').setOrigin(0, 0);

       // calculated left side of screen and right side of screen (stackoverflow'ed)
        const left = this.cameras.main.height / 2;
        const textX = 3 * this.cameras.main.width / 4; 

        this.add.text(textX, 200, 'What is your name?', { fill: '#0f0',  align: 'center' }).setOrigin(0.5, 0);
        
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
                let inputText = element.getChildByName('nameField'); // player name
 
                if (inputText.value !== '') {
                    console.log(inputText.value);
                    this.scene.start('Options', { playerName: inputText.value }); // change to 'pick a starter' scene
                } else {
                    this.add.text(textX, 400, 'Please input a name!', { fill: '#0f0', align: 'center' }).setOrigin(0.5, 0);
                }
            }
        });

        player = this.add.image(200, left, 'dude').setOrigin(0.5, 0.5);
    }
}