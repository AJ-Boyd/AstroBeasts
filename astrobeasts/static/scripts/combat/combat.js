import { CombatMenu } from './combatmenu.js';

var cursors;
var STATUS_STATE = 'default'

export class CombatScene extends Phaser.Scene {
    #combatMenu;

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
    

 //music for battle scene, slowed down and lower volume than raw file. 
    var music = this.sound.add('fight1', {loop:true, volume:0.8, rate:0.8});
    music.play();


//background
    this.add.image(this.scale.width/2,
        (this.scale.height/1.95 - 75), 
        'background');

//create enemy alien and idle

    this.enemy = this.add.sprite(600, 310, 'Tarkeel').setScale(3);
    this.enemy.anims.play("idle_Tarkeel", true)

//create our alien and idle

    this.player = this.add.sprite(200, 310, 'Strikoh').setScale(4);
    this.player.anims.play("idle_Strikoh", true)


//Enemy Name formatting. TO DO to make this change based on alien
    const enemyAlien = this.add.text(40,0, "TARKEEL", 
            {
            color: '#31b1e0',
            fontSize: '28px',
            fontStyle: 'bold italic',
            }
    );

 //Player Name formatting. TO DO to make this change based on alien
    const playerAlien = this.add.text(40,0,"STRIKOH", 
        {
            color: '#045eda',
            fontSize: '28px',
            fontStyle: 'bold italic',
        }
    );

//Create container for Player health bar

    this.add.container(550, 425, [
      this.add
        .image(0, 0,"healthback")
        .setOrigin(0),
        playerAlien,
        this.#HPBar(10,22),

   this.add.text (175, 5,'25/25', {
        color:'red',
        fontSize: '18px',
        fontStyle: 'Bold',
    })

]);

//Create container for Enemy health bar
    this.add.container(1, 20, [
        this.add
        .image(0, 0,"healthback")
        .setOrigin(0),
        enemyAlien,
        this.#HPBar(20,22),

    ]);



      
     

//Create box on the bottom
this.#combatMenu = new CombatMenu(this);
this.#combatMenu.battleOptionsOn()
this.#combatMenu.battlePromptOn();

}


update() {

    console.log('update - Combat');
    //console.log(JSON.parse(JSON.stringify(STATUS_STATE)));

   if(STATUS_STATE == 'fight'){
       console.log("YOU ARE HERE")
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            console.log('In Fight Up Is Down')
            this.#combatMenu.playerFightInputSelect('slash')
            //this.#combatMenu.managedInBattleScene();
            STATUS_STATE = 'rest'

            return;
        }
    }
    else{

        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            console.log('Up Is Down')
            this.#combatMenu.playerInput('FIGHT')
            STATUS_STATE = 'fight';
            return;
           
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.down)){
            console.log('down Is Down')
            this.#combatMenu.playerInput('SCAN')
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.right)){
            console.log('Right Is Down')
                    
            this.#combatMenu.playerInput('ITEM')                            
            
            return;
        }
        else if((Phaser.Input.Keyboard.JustDown(cursors.left))){
            console.log('Left Is Down')
            this.#combatMenu.playerInput('FLEE')
            return;
        } 
        else
        {
            //this.#combatMenu.itemPromptOff();
            //this.#combatMenu.managedInBattleScene();
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





    /**
     * @param {number} x
     * @param {number} y
     */
    #HPBar(x , y) {
    
        const leftCap = this.add
            .image(x , y, 'leftcap')
            .setOrigin(0,0.5);
        const middle = this.add
            .image(leftCap.x +leftCap.width, y, 'midhealth')
            .setOrigin(0,0.5);
            //Adjust for health bar
            middle.displayWidth = 25
        const rightCap = this.add
            .image(middle.x + middle.displayWidth, y, 'rightcap')
            .setOrigin(0,0.5);
        return this.add.container(x,y, [leftCap, middle, rightCap ])
    } 
    
   
}
