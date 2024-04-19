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
//Music

//this.load.audio(
//    'fight1',
//    '../static/assets/Music/OrbitalColossus.mp3'
//);


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
        { frameWidth: 64, frameHeight: 80 }
    ); 

    this.load.spritesheet('AllWrath',
        '../static/assets/Sprites/aAll Wrath.png',
        { frameWidth: 64, frameHeight: 80 }
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
    { frameWidth: 64, frameHeight: 80 }
    ); 
   
    this.load.spritesheet('Tyboar',
    '../static/assets/Sprites/Tyboar.png',
    { frameWidth: 64, frameHeight: 80 }
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

// Animations

//Items:

this.anims.create({
    key: 'blueitem',
    frames: this.anims.generateFrameNumbers('item',  { frames: [ 3,4,5,6,12,13,14,15] } ),
    frameRate: 7,
    repeat: 1,
    hideOnComplete: true
});



//TO DO: All Wrath, Aesun, Malgrun,Ragnex,Ruinn,Tyboar



//Arquam

this.anims.create({
    key: 'idle_Aquam',
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
    repeat: -1
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
     repeat: -1
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
    key: 'die_Icell',
    frames: this.anims.generateFrameNumbers('Icell', { start: 12, end: 17}),
    frameRate: 5,
    repeat: -1
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
     repeat: -1
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
    key: 'die_Shamrock',
    frames: this.anims.generateFrameNumbers('Shamrock', { start: 24, end: 29}),
    frameRate: 5,
    repeat: -1
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
     repeat: -1
});


this.anims.create({
     key: 'pain_Skol',
     frames: this.anims.generateFrameNumbers('Skol', { start: 18, end: 20}),
     frameRate: 5,
     repeat: -1
});

//Strikoh

this.anims.create({
    key: 'idle_Strikoh',
    frames: this.anims.generateFrameNumbers('Strikoh',  { frames: [ 0,6 ] } ),
    frameRate: 3,
    repeat: -1
});



this.anims.create({
     key: 'lob_Strikoh',
     frames: this.anims.generateFrameNumbers('Strikoh', { start: 6, end: 8}),
     frameRate: 5,
     repeat: -1
});


this.anims.create({
     key: 'died_Strikoh',
     frames: this.anims.generateFrameNumbers('Strikoh', { start: 12, end: 17}),
     frameRate: 5,
     repeat: -1
});



//Tarkeel

this.anims.create({
    key: 'idle_Tarkeel',
    frames: this.anims.generateFrameNumbers('Tarkeel',  { frames: [ 2,4,5,4 ] } ),
    frameRate: 10,
    repeat: -1
});

this.anims.create({
    key: 'lob_Tarkeel',
    frames: this.anims.generateFrameNumbers('Tarkeel', { start: 8, end: 11}),
    frameRate: 5,
    repeat: -1
});


this.anims.create({
    key: 'die_Tarkeel',
    frames: this.anims.generateFrameNumbers('Tarkeel', { frames: [ 2, 12,13,1,14,1,3,3,3 ] }),
    frameRate: 5,
    repeat: -1
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
     repeat: -1
});


this.scene.start('CombatScene');


}


}