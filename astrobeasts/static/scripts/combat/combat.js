import { Aliens } from './aliens.js';
import { CombatMenu } from './combatmenu.js';
import { HPBar } from './healthbar.js';
import { RenderBackground } from './renderbackground.js';

var cursors;
var STATUS_STATE = 'default'

export class CombatScene extends Phaser.Scene {
    #combatMenu;
    #EnemyAlien;
    #PlayerAlien;

    constructor() {
        super({
            key:CombatScene.name,
         
        });
        console.log(CombatScene.name);
        
    }
        
preload()
{
    //Loading audio - does not seem to work in preload (TODO?)
    this.load.audio(
        'fight1',
        ['../static/assets/Music/OrbitalColossus.mp3']
    );


}


create() {
   
   
    console.log('create - Combat');

 //accept keyboard input
    cursors = this.input.keyboard.createCursorKeys();
    
    

 

//background
  const background = new RenderBackground(this);
  background.showFire();



//create enemy alien and idle
 this.#EnemyAlien = new Aliens({
    scene:this,
    AlienDetails: {
        name: "Tarkeel",
        assets: 'Tarkeel',
        assetAnim: "idle_Tarkeel",
        maxHp: 25,
        currentHp: 25,
        baseAttack: 2,
        attackOptions: []
    }
    
 }, {x: 600, y: 310})

 //OLD CODE - creating a single instance
    // this.enemy = this.add.sprite(600, 310, 'Tarkeel').setScale(3);
    // this.enemy.anims.play("idle_Tarkeel", true)



//create our alien and idle
this.#PlayerAlien = new Aliens({
    scene:this,
    AlienDetails: {
        name: "Strikoh",
        assets: 'Strikoh',
        assetAnim: "idle_Strikoh",
        maxHp: 25,
        currentHp: 25,
        baseAttack: 2,
        attackOptions: []
    }
    
 }, {x: 200, y: 310})
 
 
 //
 
 //OLD CODE - creating a single instance
 //this.player = this.add.sprite(200, 310, 'Strikoh').setScale(4);
    //this.player.anims.play("idle_Strikoh", true)


//Enemy Name formatting. TO DO to make this change based on  and Move into HP container, below
    const enemyAlien = this.add.text(40,0, "TARKEEL", 
            {
            color: '#31b1e0',
            fontSize: '28px',
            fontStyle: 'bold italic',
            }
    );

 //Player Name formatting. TO DO to make this change based on alien. Move into HP container, below
    const playerAlien = this.add.text(40,0,"STRIKOH", 
        {
            color: '#045eda',
            fontSize: '28px',
            fontStyle: 'bold italic',
        }
    );

//Create container for Player health bar

    this.add.container(550, 400, [
      this.add
        .image(0, 0,"healthback")
        .setOrigin(0),
        playerAlien,
        new HPBar(this, 10, 22).container,       

   this.add.text (175, 5,'25/25', {
        color:'red',
        fontSize: '18px',
        fontStyle: 'Bold',
    })

]);

//Create container for Enemy health bar
    this.add.container(1,400, [
        this.add
        .image(0, 0,"healthback")
        .setOrigin(0),
        enemyAlien,
        new HPBar(this, 10, 22).container,
       
    ]);



      
     

//Create box on the bottom
this.#combatMenu = new CombatMenu(this);
this.#combatMenu.battleOptionsOn()




}


update() {

    console.log('update - Combat');
    //console.log(JSON.parse(JSON.stringify(STATUS_STATE)));

   if(STATUS_STATE == 'fight'){
      
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){ //Option Up
           this.#combatMenu.playerFightInputSelect("SLASH");
            STATUS_STATE = 'rest';
            return;

        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.down)){ //Option Down

    
            this.#combatMenu.playerFightInputSelect("TACKLE");
            STATUS_STATE = 'rest'
            return;

        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.left)){ //Option Left

            this.#combatMenu.playerFightInputSelect("CROSS SLASH");
            STATUS_STATE = 'rest'
            return;

        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.right)){  ////Option Right

            this.#combatMenu.playerFightInputSelect("BITE")
            STATUS_STATE = 'rest'
            return;

        }
        else {
            //Nothing here for now.
        }
    }
    else{

        if(Phaser.Input.Keyboard.JustDown(cursors.up)){ //FIGHT
            console.log('Up Is Down')
            this.#combatMenu.playerInput('FIGHT')
            STATUS_STATE = 'fight';
            return;
           
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.down)){ //SCAN. TO DO
            console.log('down Is Down')
            this.#combatMenu.playerInput('SCAN')
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.right)){ //ITEM
            console.log('Right Is Down')
                    
            this.#combatMenu.playerInput('ITEM')                            
            
            return;
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.left)){ //FLEE. TO DO...
            console.log('Left Is Down')
            this.#combatMenu.playerInput('FLEE')
            return;
        } 
        else
        {
        //Nothing here for now. 
        }
    }
    
   // while(this.#combatMenu.STATUS_STATE === 'battle'){
    // if(Phaser.Input.Keyboard.JustDown(cursors.up)){
    //    console.log('In Fight Up Is Down')
    //    this.#combatMenu.playerFightInputSelect('HELLO'')
     //   return;
    //}

    
   // else if(cursors.down.isDown){
    //    console.log('In Fight DOWN Is Down')
    //    this.#combatMenu.playerFightInputSelect(this.#combatMenu.MOVE_2)
    //    return;
   // }
   // else if(cursors.right.isDown){
    //    console.log('Right Is Down')
    //    this.#combatMenu.playerInput('ITEM')
   // }
    //else if(cursors.left.isDown){
      //  console.log('Left Is Down')
        //this.#combatMenu.playerInput('FLEE')
    //} 
    }




    
}
