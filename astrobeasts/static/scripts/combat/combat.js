import { Aliens } from './aliens.js';
import { CombatMenu } from './combatmenu.js';
import { Enemy } from './enemies.js';
import { HPBar } from './healthbar.js';
import { RenderBackground } from './renderbackground.js';
import { Move } from './moves.js';
//import { Enemies } from './enemy.js';

var cursors, attacker, move, target, spacebar, strList =[];
var party = [];
var enemies = [];
var STATUS_STATE = 'default'
var CURR_TURN = 0;
var CURR_PARTY = 'player';
var flag = 0;
const FLEE_CHANCE = 40;

//var combat1, combat2;



export class CombatScene extends Phaser.Scene {
    #combatMenu;
    #EnemyAlien;
    #PlayerAlien1;
    #PlayerAlien2;
    #player;
    #items;



    constructor() {
        super({
            key:CombatScene.name,
         
        });
        console.log(CombatScene.name);
        
    }
        
preload()
{
    //Loading audio - does not seem to workin preload (TODO?)
    this.load.audio(
        'fight1',
        ['../static/assets/Music/OrbitalColossus.mp3']
    );

    //get the player object
    this.#player = this.registry.get("player");
    this.#items = this.registry.get('inventory_items');
    
}


//this.registry.get('inventory_items', playerData['inventory_items']);
//this.registry.set('inventory_astrobeasts', playerData['inventory_astrobeasts']);
//this.registry.set('inventory_moves', playerData['inventory_moves']);
//this.registry.set('playerName', playerData.playerName)



create() {  
  
    console.log('create - Combat');
 //accept keyboard input
    cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

//background
  const background = new RenderBackground(this);
  background.showFire();

const punch = new Move("Punch", "throw a haymaker", 40, 80, 1); //low damage, high acc
const strike = new Move("Strike", "cuts", 50, 75, 1); //mid damage, mid acc
const bite = new Move("Bite", "chomp!", 100, 70, 2); //high damage, mid acc
const sleep = new Move("Sleep", "", 20, 100, 5); //low damage, high acc
const slash = new Move("Slash", "", 80, 60, 5,); //high damage, low acc
const kick = new Move("Kick", "", 45, 90, 5); //low damage, high acc


//create enemy alien and idle
 this.#EnemyAlien = new Enemy({
    scene:this,
    EnemyDetails: {
        name: "Tarkeel",
        assets: 'Tarkeel',
        assetAnim: "idle_Tarkeel",
        maxHP: 10000,
        currentHP: 10000,
        stats: [250, 250, 250], //ATK, DEF, SPD
        moves: [punch, strike],
        level: 1,
        isAlive: true,
    }
    
 }, {x: 600, y: 310})

//create our alien and idle

this.#PlayerAlien1 = new Aliens({
    scene:this,
    AlienDetails: {
        name: "Strikoh",
        assets: 'Strikoh',
        assetAnim: "idle_Strikoh",
        maxHP: 2000,
        currentHP: 2000,
        maxExp: 1000,
        currentExp: 0,
        stats: [632, 408, 474, 468, 418], //ATK, DEF, SPD, DEX, LUK
        moves: [punch, slash, bite],
        level: 1,
        isAlive: true,
    }
    
 }, {x: 200, y: 310})
 
 this.#PlayerAlien2 = new Aliens({
    scene:this,
    AlienDetails: {
        name: "Hotu",
        assets: 'Hotu',
        assetAnim: "idle_Hotu",
        maxHP: 1000,
        currentHP: 1000,
        maxExp: 1000,
        currentExp: 0,
        stats: [476, 342, 144, 226, 212], //ATK, DEF, SPD, DEX, LUK
        moves: [sleep, kick],
        level: 1,
        isAlive: true,

    }
    
 }, {x: 200, y: 200})
 
 
 //
 
 //OLD CODE - creating a single instance
 //this.player = this.add.sprite(200, 310, 'Strikoh').setScale(4);
    //this.player.anims.play("idle_Strikoh", true)


// //Enemy Name formatting. TO DO to make this change based on  and Move into HP container, below
//     const enemyAlien = this.add.text(40,0, this.#EnemyAlien.getName(), 
//             {
//             color: '#31b1e0',
//             fontSize: '28px',
//             fontStyle: 'bold italic',
//             }
//     );

//  //Player Name formatting. TO DO to make this change based on alien. Move into HP container, below
//     const playerAlien = this.add.text(40,0,this.#PlayerAlien1.getName(),
//         {
//             color: '#045eda',
//             fontSize: '28px',
//             fontStyle: 'bold italic',
//         }
//     );

// //Create container for Player health bar

// const playerHP = this.#PlayerAlien1._HPBar;
// const enemyHP = this.#EnemyAlien._HPBar;

//     this.add.container(550, 400, [
//       this.add
//         .image(0, 0,"healthback")
//         .setOrigin(0),
//         playerAlien,
//         playerHP.container,
              

//    this.add.text (175, 5,'25/25', {
//         color:'red',
//         fontSize: '18px',
//         fontStyle: 'Bold',
//     })

// ]);

// //Create container for Enemy health bar
//     this.add.container(1,400, [
//         this.add
//         .image(0, 0,"healthback")
//         .setOrigin(0),
//         enemyAlien,
//         enemyHP.container,
       
//     ]);
      

//Create box on the bottom
this.#combatMenu = new CombatMenu(this, this.#PlayerAlien1, this.#items);// this.#PlayerAlien);

//
//this.#combatMenu.battleOptionsOn();

party = [this.#PlayerAlien1, this.#PlayerAlien2];
enemies = [this.#EnemyAlien]

attacker = party[0];
this.#combatMenu.initialize(attacker)
//this.#combatMenu.battleOptionsOn()
}


update() {
console.log('update - Combat');
  
if(STATUS_STATE == 'use_item'){

   
    const items = this.registry.get('inventory_items');
    const equippedItems = items.filter(items => items.isEquipped);
    const equippedItemsCount = items.filter(items => items.isEquipped);
    
    if(equippedItemsCount ==0)
    {
        this.#combatMenu.attackerError('You have no items');
        STATUS_STATE = 'default'
        return

    }
    this.#combatMenu.setItemOptions(items)

    this.#combatMenu.itemOptionsOn();

    console.log(items)
    //get input for choosing item

    if(Phaser.Input.Keyboard.JustDown(cursors.up)){
        
        console.log(equippedItems[0])
        this.itemHandler(equippedItems[0]);
        
    }else if(Phaser.Input.Keyboard.JustDown(cursors.left)){
        if(equippedItemsCount >= 2)
           
            console.log(equippedItems[1])
            //console.log(selected.key)
            this.itemHandler(equippedItems[1]);
            
    }else if(Phaser.Input.Keyboard.JustDown(cursors.right)){
        if(equippedItemsCount >= 3)
        console.log(equippedItems[2])
            //console.log(selected.key)
            this.itemHandler(equippedItems[2]);
            
    }else if(Phaser.Input.Keyboard.JustDown(cursors.down)){
        if(equippedItemsCount >= 4)
        console.log(equippedItems[3])
        //console.log(selected.key)
        this.itemHandler(equippedItems[3]);
            
    }

    // //check if selected target is alive
    // if(target != undefined && target.getAlive() == false){
    //     console.log("cannot choose this target cuz they're dead")
    //     target = undefined;
    // }



}
else if(STATUS_STATE =='scanning'){

    var livE = enemies.filter(e => e.getAlive())
    this.#combatMenu.setTargetOptions(livE)
    this.#combatMenu.targetOptionsOn();

    //get input for choosing target
    if(Phaser.Input.Keyboard.JustDown(cursors.up)){
        target = enemies[0]; //For now
        this.scanStuff();
        
    }else if(Phaser.Input.Keyboard.JustDown(cursors.left)){
        if(enemies.length >= 2)
            target = enemies[1]; //For now
            this.scanStuff();
            
    }else if(Phaser.Input.Keyboard.JustDown(cursors.right)){
        if(enemies.length >= 3)
            target = enemies[2]; //For now
            this.scanStuff();
            
    }else if(Phaser.Input.Keyboard.JustDown(cursors.down)){
        if(enemies.length >= 4)
            target = enemies[3]; //For now
            this.scanStuff();
            
    }

    //check if selected target is alive
    if(target != undefined && target.getAlive() == false){
        console.log("cannot choose this target cuz they're dead")
        target = undefined;
    }



} 
else if(STATUS_STATE == 'fight'){
 
    attacker = party[CURR_TURN];
    console.log("attacker's moves: ", attacker.getMoves())
    console.log("current turn:", CURR_TURN)
    attacker.NameandHPon();
    attacker.takeDamage(0) //renders correct HPBat

    //updates UI for moves
    this.#combatMenu.setFightText("Select a Move for " + attacker.getName());
    this.#combatMenu.setFightOptions(attacker.getMoves())

    console.log("it's " + attacker.getName() + "'s turn!")
    

    strList = attacker.getMoves();

        if(Phaser.Input.Keyboard.JustDown(cursors.up)) { //Option Up
           move = strList[0]
        //    STATUS_STATE = "targeting";
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.left)){ //Option left
            move = strList[1]
            // STATUS_STATE = "targeting";
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.right)){ //Option right
            move = strList[2]
            // STATUS_STATE = "targeting";
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.down)){  ////Option down
            move = strList[3]
            // STATUS_STATE = "targeting";
        }
        if(move != undefined)
            STATUS_STATE = "targeting"

    }else if(STATUS_STATE == "targeting"){
        //list of possible (living) targets
        var livE = enemies.filter(e => e.getAlive())

        //show UI for targeting
        this.#combatMenu.fightOptionsOff();
        this.#combatMenu.setTargetOptions(livE)
        this.#combatMenu.targetOptionsOn();

        //get input for choosing target
        if(Phaser.Input.Keyboard.JustDown(cursors.up)){
            target = enemies[0]; //For now
            target.NameandHPon();
                target.takeDamage(0) //renders correct HPBat
                this.battlestuff();
        }else if(Phaser.Input.Keyboard.JustDown(cursors.left)){
            if(enemies.length >= 2)
                target = enemies[1]; //For now
                target.NameandHPon();
                target.takeDamage(0) //renders correct HPBat
                this.battlestuff();
        }else if(Phaser.Input.Keyboard.JustDown(cursors.down)){
            if(enemies.length >= 3)
                target = enemies[2]; //For now
                target.NameandHPon();
                target.takeDamage(0) //renders correct HPBat
                this.battlestuff();
        }else if(Phaser.Input.Keyboard.JustDown(cursors.right)){
            if(enemies.length >= 4)
                target = enemies[3]; //For now
                target.NameandHPon();
                target.takeDamage(0) //renders correct HPBat
                this.battlestuff();
        }

        //check if selected target is alive
        if(target != undefined && target.getAlive() == false){
            console.log("cannot choose this target cuz they're dead")
            target = undefined;
        }

        // if(target != undefined){
        //     this.battlestuff();
        // }        
    }else if(STATUS_STATE == "enemy"){
        //this.time.delayedCall(2000, this.enemyTurn, null, this);
        this.enemyTurn();
        return;
    }else if(STATUS_STATE == "enemy-waiting"){
        setTimeout(function(){
            STATUS_STATE = "enemy-continue"
        }, 2000)
    }else if(STATUS_STATE == "enemy-continue"){
        this.time.delayedCall(4000, this.enemyTurnCont, null, this);
    }else if(STATUS_STATE == "conclusion"){
        //guess it's over
        if(spacebar.isDown){
            this.scene.start("MainMenu")
        }
    }else{

        if(Phaser.Input.Keyboard.JustDown(cursors.up)){ //FIGHT
            console.log('Up Is Down')
            this.#combatMenu.playerInput('FIGHT')
            STATUS_STATE = 'fight';
            return;
           
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.down)){ 
            console.log('down Is Down')
            this.#combatMenu.playerInput('SCAN')
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.right)){ //ITEM
            console.log('Right Is Down')     
            this.#combatMenu.playerInput('ITEM')   
            STATUS_STATE = 'use_item';                   
            return;
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.left)){ //FLEE. TO DO...
            console.log('Left Is Down')
            //this.#combatMenu.playerInput('FLEE')
            this.flee();
            return;
        } 
        else
        {
        //Nothing here for now. 
        }
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
        console.log("raw damage: " + d)
        var m = this.calcMitigation(target); //the percentage of damage that the target can mitigate
        console.log("percentage of mitigation: " + m)
        d *= 1-m;
        d = Math.round(d);
        console.log("final damage: " + d)

        return d;
    }

    /*
    formula to calculate raw damage an attacker does with a move. this is based on attacker and move level, 
    attacker ATK stat, move baseATK stat, and a random number
    */
    calcDamage(attacker, move){
        var rand = this.getRand(16, 24);
        console.log("random coef: " + rand)
        var d = (Math.pow(attacker.getATK(), 1.18) / 1.5) + (rand * move.getBaseAttack()) + (10 * move.getLevel()) - 900

        return d;
    }

    /*
    formula to calculate the percentage of damage that a target mitigates. this is based on the target's
    DEF stat and a random number

    the exact formula for m(defense) = sqrt(defense / 1.1) - 6 + randN9-5, 5)
    */
    calcMitigation(target){
        var stats = [];
        stats = target.getStats();
        
        var m = Math.sqrt(stats[1] / 1.1) - 6 + this.getRand(-5,5)
        m /= 100; // convert into percentage

        return m; // return percentage
    }

    /*
    returns -1 if battle continues, 0 if all enemies are dead, and 1 if all friendlies are dead
    */
    checkBattle(){
        //check if all enemies are dead
        var dead = enemies.every(enemy => !enemy.getAlive());
        //alert("all enemies dead?: " + dead);
        if(dead){
            return 0; //all enemies are dead
        }

        dead = party.every(p=> !p.getAlive());
        //alert("all friendlies dead?: " + dead);
        if(dead){
            return 1; //all friendlies are dead
        }

        return -1;
    }

    
    //returns a random number between min and max, both inclusinve
getRand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    /*
    changes the turn after an action has been done
    */

battlestuff(){
        this.#combatMenu.targetOptionsOff();
        this.#combatMenu.setAlien(attacker);
        var hit = this.getRand(0,100);
        console.log("hit:", hit)
        if(hit <= this.getHitChance(attacker, move)){
            console.log("attack lands!")
            //attack target
            console.log("move:",move)
            
            //this will have a fully fleshed out formula but for now this should always return 95
            var d = this.attack(attacker, target, move);
            
            //check critical
            //this is also purely random; this will depend on player LUK later
            var crit = this.getRand(0,100);
            if(crit <= 5){
                d *= 2; //if there's a critical hit, double the damage
            }
            var strhit
            var remains

            //reduce health
            //strhit = hit.toString();
            target.takeDamage(d)
            var remains = target.getCurrentHP();

            this.#combatMenu.playerFightInputSelect(move, d, remains);
            STATUS_STATE = 'rest';

            if(target.getCurrentHP() <= 0){
                console.log("Someone Died")
                target.setAlive(false);
                this.#combatMenu.deathnotice(target.getName())
                
            }
            
            //return;

        }else{
            //if the attack misses
            console.log("MISS")
            this.#combatMenu.missRender(attacker.getName());
            STATUS_STATE = 'rest';
            //this.time.delayedCall(1000, this.updateUConsole, ["The " + move.name + " missed..."], this);
        }
        // STATUS_STATE = "checking"
        
        // if(target.getCurrentHP() <= 0){
        //     console.log("Someone Died")
        //     target.setAlive(false);
        //     this.#combatMenu.deathnotice(target.getName())
        // }

        var condition = this.checkBattle(); //see if one side is completely dead
        // alert(condition)
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
    }

    /**
     * @param {Aliens} atk
     * @param {Move} move
     */
    getHitChance(atk, move){
        console.log(move)
        var dex = 30 * Math.pow(atk.getDEX(), (1/6))
        console.log("astrobeast dex: " + atk.getDEX() + " --> " + dex)
        var acc = move.getAccuracy();
        console.log("move accuracy: " + acc)
        var hitChance = ((1.2 * dex + acc) / 2) + this.getRand(-10,5);
        hitChance = Math.round(hitChance);

        console.log("total hit chance:" + hitChance)
        return hitChance;
    }

changeTurn(){
    CURR_TURN++; //increment CURR_TURN counter
    var livP = party.filter(ab => ab.getAlive())
    var livE = enemies.filter(e => e.getAlive())
    

    if(CURR_PARTY == "player"){
        if(CURR_TURN >= livP.length){
            //if finished with player party, change to enemy's turn
            console.log("enemy's turn")
            alert("enemy's turn!")
            attacker.NameandHPoff();
            console.log("Turn off", attacker.getName())
            target.NameandHPoff();
            CURR_PARTY = "enemy";
            CURR_TURN = 0;
            STATUS_STATE = "enemy"; //change state to enemy turn 
             
        }
        else {
            attacker.NameandHPoff();
            console.log("Turn off", attacker.getName())
            attacker = party[CURR_TURN]
            console.log("It is turn",CURR_TURN)
            this.#combatMenu.initialize(attacker)
            attacker.NameandHPon();
        }
    }else if(CURR_PARTY == "enemy"){
        //if finished with enemy party, change to player's turn
        if(CURR_TURN >= livE.length){
            CURR_PARTY = "player";
           // console.log("Turn off", attacker.getName())
           // attacker.NameandHPoff();
           // console.log("Turn off", target.getName())
           // target.NameandHPoff();
            CURR_TURN = 0;
            alert("player's turn!");
            STATUS_STATE = "nothing";
        }
    }
    //alert("changing turn")
}

    endBattle(condition){
        var expGain = 0;
        var moneyGain = 0;
        var damageDone = 0;

        //sum up how much damage you did overall
        for(var i = 0; i < enemies.length; i++){
            damageDone += enemies[i].getMaxHP() - enemies[i].getCurrentHP();
            console.log("damage done: " + damageDone);
        }

        //these end the scene
        //end scene in victory
        if(condition == 0){
            //you earn 1/3 exp for each point of damage you did
            expGain = Math.round(damageDone / 3);
            //and 1/5 credits 
            moneyGain = Math.round(damageDone / 5);
            console.log("exp: " + expGain + " credits: " + moneyGain);
            this.time.delayedCall(2000, this.#combatMenu.showEndMsg, ["VICTORY!\nYou earned " + expGain + " EXP and " + moneyGain + " credits.\nPress Spacebar to exit."], this.#combatMenu);
            this.checkLevelUp(expGain);
            STATUS_STATE = "conclusion";
            this.#player.updateExpGained(expGain); //update exp earned and credits earned
            this.#player.updateCredits(moneyGain)
        }
        //end scene in defeat
        else if(condition == 1){
            //you earn 1/10 exp for each point of damage you did
            expGain = Math.round(damageDone / 10);
            //and lose 1000 credits
            moneyGain = -1000;
            this.time.delayedCall(2000, this.#combatMenu.showEndMsg, ["DEFEAT\nYou earned " + expGain + " EXP and " + moneyGain + " credits.\nPress Spacebar to exit."], this.#combatMenu);
            this.checkLevelUp(expGain);
            STATUS_STATE = "conclusion";
            this.#player.updateExpGained(expGain); //update exp earned and credits earned
            this.#player.updateCredits(moneyGain)
        }
        //end scene in fleeing
        else if(condition == 2){
            alert("coward!")
            this.time.delayedCall(500, this.#combatMenu.showEndMsg, ["You have successfully fled the battle.\nPress Spacebar to exit."], this.#combatMenu);
            STATUS_STATE = "conclusion";
        }
    }

    checkLevelUp(exp){
        for(var i = 0; i < party.length; i++){
            let ab = party[i];
            console.log(ab.getName() + " earned " + Math.round(exp / party.length))
            ab.gainExp(Math.round(exp / party.length)) //each astrobeast in the party gets an equal share of exp gained
            console.log(ab.getStats())
        }
    }

    enemyTurn(){
        //get attacker (living enemies)
        var atkrs = enemies.filter(e => e.getAlive())
        attacker = atkrs[CURR_TURN]; //get the attacker
        console.log("enemy attacker", attacker)
        //this.time.delayedCall(2000, this.updateUConsole,["It's " + attacker.enemyDetails.name + "'s turn"],this);

        //get move list
        var moves = attacker._enemyDetails.moves;
        move = moves[this.getRand(0, moves.length - 1)]; //get random move
        console.log("enemy's move", move)

        //get available targets (living friendlies)
        var targets = party.filter(ab => ab._alienDetails.isAlive)
        console.log(targets)
        target = party[this.getRand(0, targets.length - 1)] //get random living target
        
        //enemy attack
        var dmg = 10;
        target.getCurrentHP -= dmg;

        //update console to show enemy attack, its damage, and how much HP the target has
        //this.time.delayedCall(1000, this.#combatMenu.setRenderMessage, [attacker.getName() + " used " + move + " on " + target.getName() + " and dealt " + dmg +" damage!"], this.#combatMenu); 
        //this.time.delayedCall(1500, this.setState, ["enemy-waiting"], this); //we need to pause here before continuing
        alert(attacker.getName() + " used " + move.getName() + " on " + target.getName() + " and dealt " + dmg +" damage!")
        if(target._alienDetails.currentHP <= 0){
            target._alienDetails.isAlive = false;
            alert(target.getName() + " has been defeated!");
            console.log(target.getName() + " has been defeated!")
        }
        
        //reset vars
        attacker = undefined;
        target = undefined;
        move = undefined;

        //see if one side is completely dead
        var condition = this.checkBattle() 
        if(condition != -1){
           // this.time.delayedCall(100000, this.endBattle, [condition], this); //if battle is over, end the battle
            this.endBattle(condition)
        }else{    
      
            this.changeTurn();
        } 
    }

    enemyTurnCont(){
        //check if target is dead
        if(target._alienDetails.currentHP <= 0){
            target._alienDetails.isAlive = false;
            this.time.delayedCall(1000, this.#combatMenu.setRenderMessage, [target.getName() + " has been defeated!"], this.#combatMenu); 
            console.log(target.getName() + " has been defeated!")
        }
        
        //see if one side is completely dead
        var condition = this.checkBattle() 
        if(condition != -1)
            this.time.delayedCall(100000, this.endBattle, [condition], this); //if battle is over, end the battle
        else{    
            //STATUS_STATE = "nothing"; //reset state
            this.time.delayedCall(10000, this.changeTurn, [], this);
        }
    }

    setState(state){
        STATUS_STATE = state;
    }

    //when attempting to flee battle
    flee(){
        var flee = this.getRand(0, 100)
        console.log(flee)
        if(flee < FLEE_CHANCE){
            //flee is successful
            this.endBattle(2)
        }else{
            //flee fails
            this.#combatMenu.battleOptionsOff();
            this.#combatMenu.setRenderMessage("You fail to escape");
            this.time.delayedCall(2100, this.changeTurn, null, this);
            this.time.delayedCall(2101, this.#combatMenu.battleOptionsOn, null, this.#combatMenu)
            attacker = undefined;
            target = undefined;
            move = undefined;
            STATUS_STATE = "nothing";
        }
    }

    
scanStuff()
{
    this.#combatMenu.targetOptionsOff();

    STATUS_STATE = 'nothing';

    this.#combatMenu.showScan(target)

 return

}

itemHandler(selected)
{
    if(!attacker)
    {
        this.#combatMenu.itemOptionsOff();
        this.#combatMenu.attackerError('You must have started battle to use an item');
        STATUS_STATE = 'default';
        return
        
    }
    
    console.log("USED ITEM", selected.key)
    this.#combatMenu.itemOptionsOff();

    if(selected.HP)
    {
        var num = selected.HP
        console.log("Gained HP:", selected.HP)
        attacker.takeDamage(-num);

        console.log("Prev Val:", selected.quantity)
        var flag = 1;
        console.log("New Val:", selected.quantity)
          
    }
    else if(selected.ATK)  //[ATK, DEF, SPD, LUK]
    {
        var num = selected.ATK
        console.log("Gained ATK:", selected.ATK)
        attacker.setATK(num);

        console.log("Prev Val:", selected.quantity)
        var flag = 1;
        console.log("New Val:", selected.quantity)

    }
    else if(selected.DEF)
    {
        var num = selected.DEF
        console.log("Gained DEF:", selected.ATK)
        attacker.setDEF(num);

        console.log("Prev Val:", selected.quantity)
        var flag = 1;
        console.log("New Val:", selected.quantity)

    }
    else if (selected.SPD)
    {
        {
            var num = selected.SPD
            console.log("Gained ATK:", selected.ATK)
            attacker.setSPD(num);
    
            console.log("Prev Val:", selected.quantity)
           var flag = 1;
            console.log("New Val:", selected.quantity)
    
        }
    }
    else if (selected.LUK)
    {
        {
            var num = selected.LUK
            console.log("Gained ATK:", selected.ATK)
            attacker.setLUK(num);
    
            console.log("Prev Val:", selected.quantity)
           var flag = 1;
            console.log("New Val:", selected.quantity)
    
        }
    }
    else{


    }



    if(flag ==1)
    {
        var flag = 1;
        selected.isEquipped = false;
        flag = 0;
    }
    
    this.#combatMenu.battleOptionsOn();
 //Nothing here for now
     STATUS_STATE = 'default';
    return


}





}

