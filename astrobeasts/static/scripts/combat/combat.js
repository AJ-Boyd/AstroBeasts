import { Aliens } from './aliens.js';
import { CombatMenu } from './combatmenu.js';
import { Enemies } from './enemies.js';
import { HPBar } from './healthbar.js';
import { RenderBackground } from './renderbackground.js';


var cursors, attacker, move, target,  strList =[];
var party = [];
var enemies = [];
var STATUS_STATE = 'default'
var CURR_TURN = 0;
var CURR_PARTY = 'player';
var flag = 0;

//var combat1, combat2;



export class CombatScene extends Phaser.Scene {
    #combatMenu;
    #EnemyAlien1;
    #EnemyAlien2;
    #EnemyAlien3;
    #EnemyAlien4;

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

//background
  const background = new RenderBackground(this);
  background.showFire();

//create enemy alien and idle
 this.#EnemyAlien1 = new Enemies({
    scene:this,
    EnemyDetails: {
        name: "Tarkeel",
        assets: 'Tarkeel',
        assetAnim: "idle_Tarkeel",
        maxHP: 250,
        currentHP: 250,
        stats: [100, 100, 100, 100],
        moves: ["Strike", "Slash","Bite","Sleep"] ,
        level: 1,
        isAlive: true,


    }
    
 }, {x: 75, y: 170})

 this.#EnemyAlien2 = new Enemies({
    scene:this,
    EnemyDetails: {
        name: "Shamrock",
        assets: 'Shamrock',
        assetAnim: "idle_Shamrock",
        maxHP: 400,
        currentHP: 250,
        stats: [200, 200, 200, 200],
        moves: ["Strike", "Slash","Bite","Sleep"] ,
        level: 1,
        isAlive: true,


    }
    
 }, {x: 200, y: 150})

 this.#EnemyAlien3 = new Enemies({
    scene:this,
    EnemyDetails: {
        name: "Arquam",
        assets: 'Arquam',
        assetAnim: "idle_Arquam",
        maxHP: 250,
        currentHP: 250,
        stats: [300, 300, 300, 300],
        moves: ["Strike", "Slash","--","--"] ,
        level: 1,
        isAlive: true,


    }
    
 }, { x: 210, y: 340})


 this.#EnemyAlien4 = new Enemies({
    scene:this,
    EnemyDetails: {
        name: "Icell",
        assets: 'Icell',
        assetAnim: "idle_Icell",
        maxHP: 250,
        currentHP: 250,
        stats: [400, 400, 400, 400],
        moves: ["Strike", "Slash","Bite","Sleep"] ,
        level: 1,
        isAlive: true,


    }
    
 }, {x: 100, y: 340})





//create our alien and idle

//this.registry.get('inventory_astrobeasts');


this.#PlayerAlien1 = new Aliens({
    scene:this,
    AlienDetails: {
        name: "Strikoh",
        assets: 'Strikoh',
        assetAnim: "idle_Strikoh",
        maxHP: 100,
        currentHP: 100,
        stats: [100, 100, 100, 100],  //[ATK, DEF, SPD, LUK]
        moves: ["Strike", "Slash","Bite","Sleep"] ,
        level: 1,
        isAlive: true,

    }
    
 }, {x: 720, y: 340})
 
 this.#PlayerAlien2 = new Aliens({
    scene:this,
    AlienDetails: {
        name: "Hotu",
        assets: 'Hotu',
        assetAnim: "idle_Hotu",
        maxHP: 100,
        currentHP: 50,
        stats: [100, 100, 100, 100],
        moves: ["Punch", "Kick","",""] ,
        level: 1,
        isAlive: true,

    }
    
 }, {x: 600, y: 340})
 
//Create box on the bottom
this.#combatMenu = new CombatMenu(this, this.#PlayerAlien1, this.#items);// this.#PlayerAlien);

//
//this.#combatMenu.battleOptionsOn();

party = [this.#PlayerAlien1, this.#PlayerAlien2];
enemies = [this.#EnemyAlien1, this.#EnemyAlien2, this.#EnemyAlien3, this.#EnemyAlien4]

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
    console.log("current turn:", CURR_TURN)
    attacker.NameandHPon();
    attacker.takeDamage(0) //renders correct HPBat
   // 

    //updates UI for moves
    this.#combatMenu.setFightText("Select a Move for " + attacker.getName());
    this.#combatMenu.setFightOptions(attacker.getMoves())

    console.log("it's " + attacker.getName() + "'s turn!")

    strList = attacker.getMoves();

        if(Phaser.Input.Keyboard.JustDown(cursors.up)) { //Option Up
           move = strList[0]
           STATUS_STATE = 'targeting';
           
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.left)){ //Option left
            move = strList[1]
            STATUS_STATE = 'targeting';
          
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.down)){ //Option down
            move = strList[2]
            STATUS_STATE = 'targeting';
            
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.right)){  ////Option Right
            move = strList[3]
            STATUS_STATE = 'targeting';
            return;
         
        }
        else {
            //Nothing here for now.
        }   
        
}
else if(STATUS_STATE == 'targeting') {
        //list of possible (living) targets
        console.log("In Target")
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
        }else if(Phaser.Input.Keyboard.JustDown(cursors.right)){
            if(enemies.length >= 3)
                target = enemies[2]; //For now
                target.NameandHPon();
                target.takeDamage(0) //renders correct HPBat
                this.battlestuff();
        }else if(Phaser.Input.Keyboard.JustDown(cursors.down)){
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
    }
else {
    

        if(Phaser.Input.Keyboard.JustDown(cursors.up)){ //FIGHT
            console.log('Up Is Down')
            this.#combatMenu.playerInput('FIGHT')
            STATUS_STATE = 'fight';
            return;  
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.down)){ 
            console.log('down Is Down')
            this.#combatMenu.playerInput('SCAN')
            STATUS_STATE = 'scanning';
            return;
        }
        else if(Phaser.Input.Keyboard.JustDown(cursors.right)){ //ITEM
            console.log('Right Is Down')     
            this.#combatMenu.playerInput('ITEM')   
            STATUS_STATE = 'use_item';                   
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
        var stats = []
        stats = attacker.getStats();
        var a = (1.05 * //move.level 
        10 + 1.08 * attacker.getLevel()) * Math.pow(stats[0], 1.6);
        var b = //move.baseATK / 100;
        10/100;
        var c = 70 + this.getRand(-10, 25);

        var d = Math.floor(b + (a/c)); 

        return 100;
    }

    /*
    formula to calculate the percentage of damage that a target mitigates. this is based on the target's
    DEF stat and a random number
    */
    calcMitigation(target){

        var stats = [];
        stats = target.getStats();
        var a = 1.9 * stats[1] + 0.5 * this.getRand(-10, 25);
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
        var hit = this.getRand(0,100);
        console.log("hit:", hit)
        if(hit <= 80){
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
                       
            target.takeDamage(d)
            var remains = target.getCurrentHP();

            this.#combatMenu.playerFightInputSelect(move, hit, remains);
            STATUS_STATE = 'rest';

            if(target.getCurrentHP() <= 0){
                console.log("Someone Died")
                target.setAlive(false);
                this.#combatMenu.deathnotice(target.getName())
                                
            }
            

         }
         else
         {
        //if the attack misses
        console.log("MISS")
        this.#combatMenu.missRender(attacker.getName());            

        STATUS_STATE = 'rest';
        
        }
    
        STATUS_STATE = "checking"
    
        // if(target.getCurrentHP() <= 0){
        //     console.log("Someone Died")
        //     target.setAlive(false);
        //     this.#combatMenu.deathnotice(target.getName())
        
        // }
    
        var condition = this.checkBattle() //see if one side is completely dead
           
        if(condition != -1){
            this.endBattle(condition); //if battle is over, end the battle
        }
        else
        {    
            STATUS_STATE = "nothing"; //reset state
            //CURR_TURN = 0;
            this.changeTurn();
        }
    
    //reset global vars and state
    //target = undefined;
    //move = undefined;
    //attacker = undefined;
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
            target.NameandHPoff();
            CURR_PARTY = "enemy";
            CURR_TURN = 0;
            STATUS_STATE = "enemy"; //change state to enemy turn 
             
        }
        else {
            attacker = party[CURR_TURN];
            this.#combatMenu.initialize(attacker)
            attacker.NameandHPon();
        }
    }else if(CURR_PARTY == "enemy"){
        //if finished with enemy party, change to player's turn
        if(CURR_TURN >= livE.length){
            CURR_PARTY = "player";
            CURR_TURN = 0;
            alert("player's turn!");
            attacker.NameandHPoff();
            target.NameandHPoff();
            STATUS_STATE = "nothing";
        }
    }
    //alert("changing turn")
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
        this.scene.start("MainMenu")
    }
}

enemyTurn(){
    //get attacker (living enemies)
    var atkrs = enemies.filter(e => e.getAlive())
    attacker = atkrs[CURR_TURN]; //get the attacker
    console.log("enemy attacker", attacker)
    //this.time.delayedCall(2000, this.updateUConsole,["It's " + attacker.enemyDetails.name + "'s turn"],this);

    //get move list
    var moves = attacker.enemyDetails.moves;
    move = moves[this.getRand(0, moves.length - 1)]; //get random move
    console.log("enemy's move", move)

    //get available targets (living friendlies)
    var targets = party.filter(ab => ab.alienDetails.isAlive)
    target = party[this.getRand(0, targets.length - 1)] //get random living target
    
    //enemy attack
    var dmg = 10;
    target.getCurrentHP -= dmg;

    //update console to show enemy attack, its damage, and how much HP the target has
    //this.time.delayedCall(4000, this.updateUConsole, [attacker.enemyDetails.name + " performed " + move.name + " on " + target.alienDetails.name + " and did " + dmg + " damage!"], this);
    //this.time.delayedCall(8000, this.updateUConsole, [target.alienDetails.name + " now has " + target.alienDetails.currentHP + " HP remaining!"], this);
    
    //check if target is dead
    if(target.alienDetails.currentHP <= 0){
        target.alienDetails.isAlive = false;
        //this.time.delayedCall(10000, this.updateUConsole, [target.alienDetails.name + " has been defeated!"], this)
        console.log(target.alienDetails.name + " has been defeated!")
        target.NameandHPoff();

    }

    var condition = this.checkBattle() //see if one side is completely dead
    if(condition != -1)
        this.endBattle(condition); //if battle is over, end the battle
    else{    
        //STATUS_STATE = "nothing"; //reset state
        this.changeTurn();
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
