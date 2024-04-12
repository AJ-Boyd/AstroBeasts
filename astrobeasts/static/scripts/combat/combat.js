import { Aliens } from './aliens.js';
import { CombatMenu } from './combatmenu.js';
import { HPBar } from './healthbar.js';
import { RenderBackground } from './renderbackground.js';
import {Move} from './moves.js';
import { Enemy } from './enemy.js';

var cursors;
var STATUS_STATE = 'default'
var CURR_TURN = 0;

//hard-coded stuff
const exMove = new Move("Punch", "Medium damage to a single enemy", 40, 2, false);
const Hotu = new Enemy({
    scene: this,
    EnemyDetails: {
        name: "Hotu",
        assets: "Hotu",
        assetAnim: "idle_Tarkeel",
        maxHP: 25,
        currentHP: 25,
        stats: [300, 250, 100],
        attackOptions: [exMove],
        level: 5
    }
}, 
{x: 200, y: 310},
);

export class CombatScene extends Phaser.Scene {
    //member variables
    #combatMenu; //the console at the bottom of the screen that displays input options
    #EnemyAlien; //this will be depreciated
    #PlayerAlien;
    #player; //the player object
    #party; // shallow copy array of party members
    #enemies; // array of enemies

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
            maxHP: 25,
            currentHP: 25,
            stats: [300, 250, 300, 250, 250],
            attackOptions: []
        }
        
    }, {x: 600, y: 310})

//create our alien and idle
this.#PlayerAlien = new Aliens({
    scene:this,
    AlienDetails: {
        name: "Strikoh",
        assets: 'Strikoh',
        assetAnim: "idle_Strikoh",
        maxHP: 25,
        currentHP: 25,
        stats: [300, 250, 300, 250, 250],
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

    //when selecting which attack to perform
   if(STATUS_STATE == 'fight'){
        //the Astrobeast that is currently attacking
        var attacker = 0;//this.#party[CURR_TURN];
        //the attack they want to use
        var move;
        
        //select move
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){ 
            //this doesn't work yet
            // move = attacker.#moves[0]; //move is the first attack
            move = 0;
            STATUS_STATE = 'target';
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.down)){ //Option Down
            // move = attacker.#moves[1]; //second attack
            move = 1;
            STATUS_STATE = 'target';
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.left)){ //Option Left
            // move = attacker.#moves[2]; //third attack
            move = 2;
            STATUS_STATE = 'target';
        }     
        else if(Phaser.Input.Keyboard.JustDown(cursors.right)){  ////Option Right
            // move = attacker.#moves[3]; //fourth attack
            move = 3;
            STATUS_STATE = 'target';
        }

        if(STATUS_STATE == "target"){
            //select target
            var target;
            console.log("ready to select target")

            if(Phaser.Input.Keyboard.JustDown(cursors.up)){ 
                target = 0;
            }else if(Phaser.Input.Keyboard.JustDown(cursors.up)){
                target = 1;
            }else if(Phaser.Input.Keyboard.JustDown(cursors.up)){
                target = 2;
            }else if(Phaser.Input.Keyboard.JustDown(cursors.up)){
                target = 3;
            }

            //check hit
            //for now this is purely random; this will depend on player DEX later
            var hit = this.getRand(0,100);
            if(hit <= 95){
                //attack target
                var d = this.attack(attacker, target, move);
                
                //check critical
                //this is also purely random; this will depend on player LUK later
                var crit = this.getRand(0,100);
                if(crit <= 5){
                    d *= 2; //if there's a critical hit, double the damage
                }

                //reduce health
                target.currentHP -= d;

            }else{
                console.log("MISS")
            }
            STATUS_STATE = "checking";
        }

        if(STATUS_STATE == "checking"){
            //this part still needs to be implemented...
            //check battle
            var battleCondtion = this.checkBattle(party, enemies);
            //if battle is over, end battle

            //condition will equal 1 if defeated
            if(battleCondition == 1){
                this.endBattle(battleCondtion);
            }

            //else, change turns
            this.changeTurn();

            STATUS_STATE = 'fight';
        
        }
       // STATUS_STATE = 'rest';
    }
    else
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
            this.flee();
            return;
        } 
        else
        {
        //Nothing here for now. 
        }
    }
    
    calcAvgSpd(party, enemies){
        var pSpdSum = 0;
        var eSpdSum = 0;

        for(var i = 0; i < party.length; i++)
            pSpdSum += party[i].stats[3];

        for(var i = 0; i < enemies.length; i++)
            eSpdSum += enemies[i].stats[2];
        
        //return true if party has higher avg speed, false for enemies
        return (pSpdSum / party.length >= eSpdSum / enemies.length);
    }

    flee(){
        if(this.getRand(0, 100) >= 80){
            console.log("flee success!")
            this.endBattle(2)
        }
    }

    /*
    returns the total damage an attacker does to a target with a given move
    attacker--Astrobeast
    target--Astrobeast
    move-Move
    */
    attack(attacker, target, move){
        var d = this.calcDamage(attacker, move); //raw damage a move can do
        var m = this.calcMitigation(target); //the percentage of damage that the target can mitigate
        d *= 1-m;
        return d;
    }

    /*
    formula to calculate raw damage an attacker does with a move. this is based on attacker and move level, 
    attacker ATK stat, move baseATK stat, and a random number
    */
    calcDamage(attacker, move){
        var a = (1.05 * move.level + 1.08 * attacker.level) * Math.pow(attacker.stats[0], 1.6);
        var b = move.baseATK / 100;
        var c = 70 + this.getRand(-10, 25);

        var d = Math.floor(b + (a/c)); 

        return 100;
    }

    /*
    formula to calculate the percentage of damage that a target mitigates. this is based on the target's
    DEF stat and a random number
    */
    calcMitigation(target){
        var a = 1.9 * target.stats[1] + 0.5 * this.getRand(-10, 25);
        var b = 55;

        var c = Math.floor(a / b);
        c /= 100;

        return 0.05;
    }

    endBattle(condition){
        var expGain = 0;
        var moneyGain = 0;

        //these end the scene
        //end scene in victory
        if(condition == 0){

        }
        //end scene in defeat
        else if(condition == 1){

        }
        //end scene in fleeing
        else if(condition == 2){

        }
    }

    //returns a random number between min and max, both inclusinve
    getRand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
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

