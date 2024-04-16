import { Aliens } from './aliens.js';
import { CombatMenu } from './combatmenu.js';
import { HPBar } from './healthbar.js';
import { RenderBackground } from './renderbackground.js';
import {Move} from './moves.js';
import { Enemies } from './enemy.js';

var cursors;
var STATUS_STATE = 'nothing'
var CURR_TURN = 0;
var CURR_PARTY = "player";

var attacker, move, target; //i know global vars are bad, but the code works so please don't fight me lol

//hard-coded stuff
//example Move object
const exMove = new Move("Punch", "Medium damage to a single enemy", 40, 2, false);


export class CombatScene extends Phaser.Scene {
    //member variables
    #combatMenu; //the console at the bottom of the screen that displays input options
    #EnemyAlien; //this will be depreciated
    #PlayerAlien;
    #player; //the player object
    #party = []; // shallow copy array of party members
    #enemies = []; // array of enemies

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
    this.#EnemyAlien = new Aliens ({
        scene:this,
        AlienDetails: {
            name: "Tarkeel",
            assets: 'Tarkeel',
            assetAnim: "idle_Tarkeel",
            maxHP: 25,
            currentHP: 25,
            stats: [300, 250, 300, 250, 250],
            moves: [],
            level: 1,
            isAlive: true
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
        moves: [],
        level: 1,
        isAlive: true
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
    //when selecting which attack to perform
    if(STATUS_STATE == 'fight'){
        //get the Astrobeast that is currently attacking
        attacker = this.#party[CURR_TURN];
        console.log("attacker", attacker.alienDetails);
  
        //select move
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){ 
            move = attacker.alienDetails.moves[0]; //move is the first attack
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.down)){ //Option Down
            move = attacker.alienDetails.moves[1]; //second attack
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.left)){ //Option Left
            move = attacker.alienDetails.moves[2]; //third attack
        }     
        else if(Phaser.Input.Keyboard.JustDown(cursors.right)){  ////Option Right
            move = attacker.alienDetails.moves[3]; //fourth attack
        }

        if(move != undefined){
            STATUS_STATE = "target"; //only change state if move is chosen
            console.log("move:", move)
        }

    }else if(STATUS_STATE == "target"){
        //select target
        console.log("ready to select target")

        if(Phaser.Input.Keyboard.JustDown(cursors.up)){ 
            target = this.#enemies[0];
        }else if(Phaser.Input.Keyboard.JustDown(cursors.down)){
            target = this.#enemies[1];
        }else if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            target = this.#enemies[2];
        }else if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            target = this.#enemies[3];
        }

        if(target != undefined){
            STATUS_STATE = "attacking"; // only change state if target is chosen
            console.log(target.enemyDetails.name);
        }
    }else if(STATUS_STATE == "attacking"){
        //once move and target are selected, perform the attack
        //check that attack lands 
        //for now this is purely random; this will depend on player DEX later
        var hit = this.getRand(0,100);
        console.log("hit:", hit)
        if(hit <= 95){
            console.log("attack lands!")
            //attack target
            console.log("attacker:",attacker.alienDetails);
            console.log("target:", target);
            console.log("move:",move)
            
            //this will have a fully fleshed out formula but for now this should always return 95
            var d = this.attack(attacker, target, move);
            
            //check critical
            //this is also purely random; this will depend on player LUK later
            var crit = this.getRand(0,100);
            if(crit <= 5){
                d *= 2; //if there's a critical hit, double the damage
            }

            alert(attacker.alienDetails.name + " perfromed " + move.name + " on " + target.enemyDetails.name + " and dealt " + d + " damage!")
            
            //reduce health
            target.enemyDetails.currentHP -= d;
            alert(target.enemyDetails.name + " now has " + target.enemyDetails.currentHP + " HP remaining!")
        }else{
            console.log("MISS")
        }
        STATUS_STATE = "checking";
    }else if(STATUS_STATE == "checking"){
        //checks to see if battle is over
        if(target.enemyDetails.currentHP <= 0){
            target.enemyDetails.isAlive = false;
            alert(target.enemyDetails.name + " has been defeated!")
        }
        var condition = this.checkBattle() //see if one side is completely dead
        if(condition != -1)
            this.endBattle(condition); //if battle is over, end the battle
        else{    
            STATUS_STATE = "nothing"; //reset state
            this.changeTurn();
        }
        
        //reset global vars and state
        target = undefined;
        move = undefined;
        attacker = undefined;
    }else if(STATUS_STATE == "nothing"){
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
    }else if(STATUS_STATE == "enemy"){
        //enemy turn goes here

        //get attacker (living enemies)
        var atkrs = this.#enemies.filter(e => e.enemyDetails.isAlive)
        attacker = atkrs[CURR_TURN]; //get the attacker
        console.log("enemy attacker", attacker)

        //get move list
        var moves = attacker.enemyDetails.moves;
        move = moves[this.getRand(0, moves.length - 1)]; //get random move
        console.log("enemy's move", move)

        //get available targets (living friendlies)
        var targets = this.#party.filter(ab => ab.alienDetails.isAlive)
        target = this.#party[this.getRand(0, targets.length - 1)] //get random living target
        
        //enemy attack
        var dmg = 10;
        target.alienDetails.currentHP -= dmg;

        alert(attacker.enemyDetails.name + " performed " + move.name + " on " + target.alienDetails.name + " and did " + dmg + " damage!")
        alert(target.alienDetails.name + " now has " + target.alienDetails.currentHP + " HP remaining!")

        //check if target is dead
        if(target.alienDetails.currentHP <= 0){
            target.alienDetails.isAlive = false;
            alert(target.alienDetails.name + " has been defeated!")
        }

        var condition = this.checkBattle() //see if one side is completely dead
        if(condition != -1)
            this.endBattle(condition); //if battle is over, end the battle
        else{    
            //STATUS_STATE = "nothing"; //reset state
            this.changeTurn();
        }

         //reset global vars and state
         target = undefined;
         move = undefined;
         attacker = undefined;
 
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
        var a = (1.05 * move.level + 1.08 * attacker.alienDetails.level) * Math.pow(attacker.alienDetails.stats[0], 1.6);
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
        var a = 1.9 * target.enemyDetails.stats[1] + 0.5 * this.getRand(-10, 25);
        var b = 55;

        var c = Math.floor(a / b);
        c /= 100;

        return 0.05;
    }

    /*
    returns -1 if battle continues, 0 if all enemies are dead, and 1 if all friendlies are dead
    */
    checkBattle(){
        //check if all enemies are dead
        var dead = this.#enemies.every(enemy => !enemy.enemyDetails.isAlive);
        alert("all enemies dead?: " + dead);
        if(dead){
            return 0; //all enemies are dead
        }

        dead = this.#party.every(p => !p.alienDetails.isAlive);
        alert("all friendlies dead?: " + dead);
        if(dead){
            return 1; //all friendlies are dead
        }

        return -1;
    }

    /*
    changes the turn after an action has been done
    */
    changeTurn(){
        CURR_TURN++; //increment CURR_TURN counter

        var livP = this.#party.filter(ab => ab.alienDetails.isAlive)
        var livE = this.#enemies.filter(e => e.enemyDetails.isAlive)

        if(CURR_PARTY == "player"){
            if(CURR_TURN >= livP.length){
                //if finished with player party, change to enemy's turn
                CURR_PARTY = "enemy";
                CURR_TURN = 0;
                alert("enemy's turn!")
                STATUS_STATE = "enemy"; //change state to enemy turn 
            }
        }else if(CURR_PARTY == "enemy"){
            //if finished with enemy party, change to player's turn
            if(CURR_TURN >= livE.length){
                CURR_PARTY = "player";
                CURR_TURN = 0;
                alert("player's turn!")
                STATUS_STATE = "nothing";
            }
        }
    }

    endBattle(condition){
        var expGain = 0;
        var moneyGain = 0;

        //these end the scene
        //end scene in victory
        if(condition == 0){
            alert("YOU WON!!!!")
            STATUS_STATE = "nothing";
        }
        //end scene in defeat
        else if(condition == 1){
            alert("YOU LOSE :((((")
            STATUS_STATE = "nothing";
        }
        //end scene in fleeing
        else if(condition == 2){
            alert("coward!")
            STATUS_STATE = "nothing";
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

