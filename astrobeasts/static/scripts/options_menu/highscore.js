import * as WebFontLoader from '../webfontloader.js'
export class HighScoreScene extends Phaser.Scene {
    constructor() {
        super('HighScore');
    }

    create() {                      
        // Retrive data from database on high scores with API call
        this.add.image(0, 0, 'my').setOrigin(0, 0);
        let title = this.add.text(this.cameras.main.centerX, 50, 'High Scores', {
            font: '34px Press Start 2P',
            color: 'yellow'
        }).setOrigin(0.5);

        this.scoreTexts = [];
        for (let i = 0; i < 5; i++) {
            this.scoreTexts.push(this.add.text(100, 150 + 70 * i, '', {
                font: '22px Press Start 2P',
                color: 'white'
            }));
        }

        this.loadScores();

        let submitButton = this.add.text(this.cameras.main.centerX, 500, 'Submit Scores', {
            font: '22px Press Start 2P',
            color: 'yellow'
        }).setInteractive({ useHandCursor: true })
          .on('pointerdown', () => this.submitScores())
          .setOrigin(0.5);

        let backButton = this.add.text(100, 570, '< Back', {
            font: '22px Press Start 2P',
            color: 'white'
        }).setInteractive({ useHandCursor: true })
          .on('pointerdown', () => this.scene.start('Options'));

          WebFontLoader.default.load({
            google: {
                families: ['Press Start 2P']
            },
            active: () => {
                title.setFontFamily('"Press Start 2P"').setColor('yellow')
                submitButton.setFontFamily('"Press Start 2P"').setColor('#ffffff')
                backButton.setFontFamily('"Press Start 2P"').setColor('#ffffff')
            }
        }) 
    }

    loadScores() {
        // dummy data
        const scores = [
            { name: "Alice", score: 120 },
            { name: "Bob", score: 110 },
            { name: "Charlie", score: 100 },
            { name: "David", score: 90 },
            { name: "Eve", score: 80 }
        ];
        scores.forEach((player, index) => {
            this.scoreTexts[index].setText(`${index + 1}. ${player.name} - ${player.score}`);
        });
    }

    submitScores() {
        const topPlayers = [
            { name: "Alice", score: 120 },
            { name: "Bob", score: 110 },
            { name: "Charlie", score: 100 },
            { name: "David", score: 90 },
            { name: "Eve", score: 80 }
        ];
    
        const data = {
            "data": [
                {
                    "Group": "Russian-Blue",
                    "Title": "Top 5 Scores"
                }
            ]
        };
    
        topPlayers.forEach((player, index) => {
            const suffix = ['st', 'nd', 'rd', 'th', 'th'][index]; 
            data.data[0][`${index+1}${suffix} Name`] = player.name;
            data.data[0][`${index+1}${suffix} Score`] = player.score;
        });
    
        fetch('https://eope3o6d7z7e2cc.m.pipedream.net', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
