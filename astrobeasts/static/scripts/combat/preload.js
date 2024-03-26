export class Preload extends Phaser.Scene {
    constructor() {
        super({
            key:Preload.name,
            active: true,
           

        });
        console.log(Preload.name);
    }


init (){

    console.log('init');
    
}

preload() {
    
    console.log('preload');       
   

    this.load.image(
        'background',
        '../static/assets/Backgrounds/bCombat3.jpg'
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
}

create() {

   this.scene.start('CombatScene');

}


}