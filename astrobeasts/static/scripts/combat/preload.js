export class Preload extends Phaser.Scene {
    constructor() {
        super({
            key:Preload.name,        
        });
        console.log(Preload.name);
    }


    init (){
        console.log('init = preload');
    }

    preload() {
        console.log('preload - preload');       

        //Background Images
        this.load.image(
            'fire',
            '../static/assets/Backgrounds/bCombat3.jpg'
        );

        this.load.image(
            'forest',
            '../static/assets/Backgrounds/bCombat1.jpg'
        );

        this.load.image(
            'planetary',
            '../static/assets/Backgrounds/bCombat1.png'
        );

        this.load.image(
            'stars',
            '../static/assets/Backgrounds/bStars.jpg'
        );

        //Music

        this.load.audio(
           'fight1',
           '../static/assets/Music/OrbitalColossus.mp3'
        );


        //random assets
        this.load.image('leftkey', '../static/assets/Objects/leftkey.png');
        this.load.image('rightkey', '../static/assets/Objects/rightkey.png');
        this.load.image('upkey', '../static/assets/Objects/upkey.png');
        this.load.image('downkey', '../static/assets/Objects/downkey.png');

        //Spritesheets
        //Items
        this.load.spritesheet('item', 
            '../static/assets/Objects/Item.png',
            { frameWidth: 24.5, frameHeight: 24.5 }
        );


        this.load.spritesheet('Aesun',
            '../static/assets/Sprites/Aesun.png',
            { frameWidth: 80, frameHeight: 95 }
        ); 

        this.load.spritesheet('AllWrath',
            '../static/assets/Sprites/aAll Wrath.png',
            { frameWidth: 73, frameHeight:92 }
        ); 

        this.load.spritesheet('Arquam',
        '../static/assets/Sprites/Arquam.png',
        { frameWidth: 64, frameHeight: 80 }
        );

        this.load.spritesheet('Hotu',
            '../static/assets/Sprites/Hotu.png',
            { frameWidth: 64, frameHeight: 80 }
        );

        this.load.spritesheet('Icell',
        '../static/assets/Sprites/Icell.png',
        { frameWidth: 64, frameHeight: 80 }
        );

        this.load.spritesheet('Malgrun',
        '../static/assets/Sprites/Malgrun.png',
        { frameWidth: 65, frameHeight: 74.3 }
        );

        this.load.spritesheet('Ragnex',
        '../static/assets/Sprites/Ragnex.png',
        { frameWidth: 65, frameHeight: 80 }
        );

        this.load.spritesheet('Ruinn',
        '../static/assets/Sprites/Ruinn.png',
        { frameWidth: 72, frameHeight: 100 }
        );
        
        this.load.spritesheet('Scourge',
        '../static/assets/Sprites/Scourge.png',
        { frameWidth: 64, frameHeight: 80 }
        );

        this.load.spritesheet('Shamrock',
            '../static/assets/Sprites/Shamrock.png',
            { frameWidth: 64, frameHeight: 80 }
        );


        this.load.spritesheet('Skol',
        '../static/assets/Sprites/Skol.png',
        { frameWidth: 65, frameHeight: 80}  
        );

        this.load.spritesheet('Strikoh',
            '../static/assets/Sprites/Strikoh.png',
            { frameWidth: 64, frameHeight: 80 }
        );

        this.load.spritesheet('Tarkeel',
        '../static/assets/Sprites/Tarkeel.png',
        { frameWidth: 67.6, frameHeight: 78 }
        ); 
    
        this.load.spritesheet('Tyboar',
        '../static/assets/Sprites/Tyboar.png',
        { frameWidth: 64, frameHeight: 74 }
        ); 

        this.load.spritesheet('Zallo',
            '../static/assets/Sprites/Zallo.png',
            { frameWidth: 64, frameHeight: 80 }
        ); 


        //HealthBar and containers
        this.load.image('healthback',
        '../static/assets/Backgrounds/healthback.png'
        );
        
        this.load.image('leftcap',
        '../static/assets/Backgrounds/lefthealth.png'
        );
        this.load.image('midhealth',
        '../static/assets/Backgrounds/midhealth.png'
        );
        this.load.image('rightcap',
        '../static/assets/Backgrounds/righthealth.png'
        );
    }

    create() {
        console.log('create - preload');  


        // //Music Section for Leann - this will play.
        // //Need to mute/stop bg music
        // //nee to be able to invoke the setMute (gives me an error that setMute does not exist on type 'BaseSound')
        // let ftMusic = this.sound.add('fight1', {loop: true });
        // ftMusic.play();     

        // let isMuted = this.game.registry.get('isMuted');
        // ftMusic.setMute(isMuted)
        

        // Animations
        //Items:
        this.anims.create({
            key: 'blueitem',
            frames: this.anims.generateFrameNumbers('item',  { frames: [ 3,4,5,6,12,13,14,15] } ),
            frameRate: 7,
            repeat: 1,
            hideOnComplete: true
        });

        //All Wrath
        this.anims.create({
            key: 'idle_AllWrath',
            frames: this.anims.generateFrameNumbers('AllWrath',  { frames: [ 0,1,2,3,2,1 ] } ),
            frameRate: 3,
            repeat: -1,

        });

        this.anims.create({
            key: 'died_AllWrath',
            frames: this.anims.generateFrameNumbers('AllWrath', { frames: [5,6,7,8,10,11,12,13] } ),
            frameRate: 5,
            repeat: 0,
        });


        ///Aesun




        this.anims.create({
            key: 'idle_Aesun',
            frames: this.anims.generateFrameNumbers('Aesun',  { frames: [ 0,5,10,15,10,5] } ),
            frameRate: 3,
            repeat: -1,

        });

        this.anims.create({
            key: 'died_Aesun',
            frames: this.anims.generateFrameNumbers('Aesun',  { frames: [ 6,11,12,16,14,17] } ),
            frameRate: 3,
            repeat: 0,

        });



        //Arquam
        this.anims.create({
            key: 'idle_Arquam',
            frames: this.anims.generateFrameNumbers('Arquam',  { frames: [ 9,12 ] } ),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'lob_Arquam',
            frames: this.anims.generateFrameNumbers('Arquam', { start: 12, end: 14}),
            frameRate: 5,
            repeat: -1
        });


        this.anims.create({
            key: 'died_Arquam',
            frames: this.anims.generateFrameNumbers('Arquam', { start: 18, end: 23}),
            frameRate: 5,
            repeat: 0
        });

        //Hotu
        this.anims.create({
            key: 'idle_Hotu',
            frames: this.anims.generateFrameNumbers('Hotu',  { frames: [ 0,6 ] } ),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'lob_Hotu',
            frames: this.anims.generateFrameNumbers('Hotu', { start: 6, end: 8}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'died_Hotu',
            frames: this.anims.generateFrameNumbers('Hotu', { start: 12, end: 17}),
            frameRate: 5,
            repeat: 0
        });

        //Icell
        this.anims.create({
            key: 'idle_Icell',
            frames: this.anims.generateFrameNumbers('Icell',  { frames: [ 0,6 ] } ),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'lob_Icell',
            frames: this.anims.generateFrameNumbers('Icell', { start: 6, end: 8}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'died_Icell',
            frames: this.anims.generateFrameNumbers('Icell', { start: 12, end: 17}),
            frameRate: 5,
            repeat: 0
        });

        //Malgrun
        this.anims.create({
            key: 'idle_Malgrun',
            frames: this.anims.generateFrameNumbers('Malgrun',  { frames: [ 0,1] } ),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'died_Malgrun',
            frames: this.anims.generateFrameNumbers('Malgrun',  { frames: [ 56, 57,58,59,60,61] } ),
            frameRate: 4,
            repeat: -1,
        });



        //Ragnex
        this.anims.create({
            key: 'idle_Ragnex',
            frames: this.anims.generateFrameNumbers('Ragnex',  { frames: [ 0,1] } ),
            frameRate: 3,
            repeat: -1
        });


        this.anims.create({
            key: 'died_Ragnex',
            frames: this.anims.generateFrameNumbers('Ragnex',  { frames: [ 18,19,20,21,22,23] } ),
            frameRate: 3,
            repeat: 0,
        });


        //Ruinn
        this.anims.create({
            key: 'idle_Ruinn',
            frames: this.anims.generateFrameNumbers('Ruinn',  { frames: [ 0,1,3,2] } ),
            frameRate: 3,
            repeat: -1
        });
        
        this.anims.create({
            key: 'died_Ruinn',
            frames: this.anims.generateFrameNumbers('Ruinn',  { frames: [ 54,55,56,57,58,59,60,61,62] } ),
            frameRate: 3,
            repeat: 0,
        });



        //Scourge
        this.anims.create({
            key: 'idle_Scourge',
            frames: this.anims.generateFrameNumbers('Scourge',  { frames: [ 0,6 ] } ),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'lob_Scourge',
            frames: this.anims.generateFrameNumbers('Scourge', { start: 6, end: 8}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'died_Scourge',
            frames: this.anims.generateFrameNumbers('Scourge', { start: 12, end: 17}),
            frameRate: 5,
            repeat: 0
        });

        //Shamrock
        this.anims.create({
            key: 'idle_Shamrock',
            frames: this.anims.generateFrameNumbers('Shamrock',  { frames: [ 12, 18 ] } ),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'lob_Shamrock',
            frames: this.anims.generateFrameNumbers('Shamrock', { start: 18, end: 20}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'died_Shamrock',
            frames: this.anims.generateFrameNumbers('Shamrock', { start: 24, end: 29}),
            frameRate: 5,
            repeat: 0
        });


        //Skol
        this.anims.create({
            key: 'idle_Skol',
            frames: this.anims.generateFrameNumbers('Skol',  { frames: [ 6,12,6,7,12] } ),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'lob_Skol',
            frames: this.anims.generateFrameNumbers('Skol', { start: 12, end: 14}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'died_Skol',
            frames: this.anims.generateFrameNumbers('Skol', { start: 25, end: 29}),
            frameRate: 5,
            repeat: 0
        });
        this.anims.create({
            key: 'pain_Skol',
            frames: this.anims.generateFrameNumbers('Skol', { start: 18, end: 20}),
            frameRate: 5,
            repeat: -1
        });

        //Tarkeel
        this.anims.create({
            key: 'idle_Tarkeel',
            frames: this.anims.generateFrameNumbers('Tarkeel',  { frames: [ 0,6 ] } ),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'lob_Tarkeel',
            frames: this.anims.generateFrameNumbers('Tarkeel', { start: 6, end: 8}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'died_Tarkeel',
            frames: this.anims.generateFrameNumbers('Tarkeel', { start: 12, end: 17}),
            frameRate: 5,
            repeat: 0
        });

        //Strikoh
        this.anims.create({
            key: 'idle_Strikoh',
            frames: this.anims.generateFrameNumbers('Strikoh',  { frames: [ 2,4,5,4 ] } ),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lob_Strikoh',
            frames: this.anims.generateFrameNumbers('Strikoh', { start: 8, end: 11}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'died_Strikoh',
            frames: this.anims.generateFrameNumbers('Strikoh', { frames: [ 2, 12,13,1,14,1,3,3,3 ] }),
            frameRate: 5,
            repeat: 0
        });

        //Tyboar
        this.anims.create({
            key: 'idle_Tyboar',
            frames: this.anims.generateFrameNumbers('Tyboar',  { frames: [ 4,5,6,7 ] } ),
            frameRate: 7,
            repeat: -1
        });

        this.anims.create({
            key: 'died_Tyboar',
            frames: this.anims.generateFrameNumbers('Tyboar',  { frames: [ 16,17,18,19] } ),
            frameRate: 6,
            repeat: 0,
        });


        //Zallo
        this.anims.create({
            key: 'idle_Zallo',
            frames: this.anims.generateFrameNumbers('Zallo',  { frames: [ 0,6 ] } ),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'lob_Zallo',
            frames: this.anims.generateFrameNumbers('Zallo', { start: 6, end: 8}),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'died_Zallo',
            frames: this.anims.generateFrameNumbers('Zallo', { start: 12, end: 17}),
            frameRate: 5,
            repeat: 0
        });

        this.scene.start('CombatScene'); //starts combat
    }
}