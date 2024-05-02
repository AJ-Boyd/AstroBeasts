import * as WebFontLoader from '../webfontloader.js'
export class HighScoreScene extends Phaser.Scene {
    constructor() {
        super('HighScore');
    }

    create() {                      
        // Retrive data from database on high scores with API call
        this.add.image(0, 0, 'my').setOrigin(0, 0);
        let title = this.add.text(this.cameras.main.centerX, 50, 'High Scores', {
            font: '34px',
            color: 'yellow'
        }).setOrigin(0.5);

        this.scoreTexts = [];
        for (let i = 0; i < 5; i++) {
            this.scoreTexts.push(this.add.text(100, 150 + 70 * i, '', {
                font: '20px',
                color: 'white'
            }));
        }

        //this.loadScores();

        let submitButton = this.add.text(this.cameras.main.centerX, 500, 'Submit Scores', {
            font: '34px',
            color: 'yellow'
        }).setInteractive({ useHandCursor: true })
          .on('pointerdown', () => this.submitScores())
          .setOrigin(0.5);

          submitButton.on('pointerover', () => {
            submitButton.setStyle({ fill: 'white'}); // when you hover, changes to white
        });
        submitButton.on('pointerout', () => {
            submitButton.setStyle({ fill: 'yellow'}); 
        });

        let backButton = this.add.text(100, 570, '< Back', {
            color: 'white'
        }).setInteractive({ useHandCursor: true })
          .on('pointerdown', () => this.scene.start('Options'));

          backButton.on('pointerover', () => {
            backButton.setStyle({ fill: '#0f0'}); // when you hover, changes to white
        });
        backButton.on('pointerout', () => {
            backButton.setStyle({ fill: 'white'}); 
        });

          WebFontLoader.default.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                title.setFontFamily('"Press Start 2P"')
                submitButton.setFontFamily('"Press Start 2P"')
                backButton.setFontFamily('"Press Start 2P"')
                this.loadScores(); 
            }
        }) 
    }

    loadScores() {
        fetch('/get_high_scores')
        .then(response => response.json())
        .then(scores => {
            scores.forEach((player, index) => {
                this.scoreTexts[index].setFontFamily('"Press Start 2P"');
                this.scoreTexts[index].setText(`${index + 1}. ${player.name} - ${player.score}`);
            });
        })
        .catch(error => console.error('Error loading scores:', error));
    }

    submitScores() {
        fetch('/submit_scores', {  
            method: 'POST'
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        })
        .then(result => console.log('Success:', result))
        .catch(error => console.error('Error:', error));
    }

       
    }
