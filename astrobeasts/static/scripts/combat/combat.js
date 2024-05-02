import { Aliens } from './aliens.js';
import { CombatMenu } from './combatmenu.js';
import { Enemy } from './enemies.js';
import { HPBar } from './healthbar.js';
import { RenderBackground } from './renderbackground.js';
import { Move } from './moves.js';


var cursors, attacker, move, target, spacebar, strList =[];
var party = [];
var enemies = [];
var STATUS_STATE = 'default'
var CURR_TURN = 0;
var CURR_PARTY = 'player';
var flag = 0;
var check = true;

const FLEE_CHANCE = 60;

export class CombatScene extends Phaser.Scene {
    #combatMenu;
    #EnemyAlien;
    #PlayerAlien1;
    #PlayerAlien2;
    #player;
    #items;
    #globalMoves;

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

create() {  
    console.log('create - Combat');
    //accept keyboard input
    cursors = this.input.keyboard.createCursorKeys();
    spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    //background
    const background = new RenderBackground(this);
    background.showForest();

    //hard-coded moves
    const punch = new Move("Punch", "throw a haymaker", 40, 80, 1); //low damage, high acc
    const strike = new Move("Strike", "cuts", 50, 75, 1); //mid damage, mid acc
    const bite = new Move("Bite", "chomp!", 100, 70, 2); //high damage, mid acc
    const sleep = new Move("Sleep", "", 20, 100, 5); //low damage, high acc
    const slash = new Move("Slash", "", 80, 60, 5,); //high damage, low acc
    const kick = new Move("Kick", "", 45, 90, 5); //low damage, high acc

    //enemy-only moves
    const dspiral = new Move("Death Spiral", "", 130, 50, this.getRand(1,5));
    const fireball = new Move("Fireball", "", 60, 80, this.getRand(1,5));
    const sflare = new Move("Solar Flare", "", 100, 90, 5);
    const hkai = new Move("Hydro Kai", "", 80, 50, this.getRand(1,5));
    const torrentus = new Move("Torrentus", "", 100, 60, this.getRand(1,5));
    const quake = new Move("Quake", "", 50, 95, this.getRand(1,5));
    const spark = new Move("Spark", "", 35, 100, this.getRand(1,5));
    const msurge = new Move("Mass Surge", "", 85, 55, this.getRand(1,5));
    const mrise = new Move("Meteor Riser", "", 90, 45, 5);
    const widow = new Move("Widowmaker", "", 100, 90, 5);

    this.#globalMoves = [punch, strike, bite, sleep, slash, kick, dspiral, fireball, sflare, hkai,
        torrentus, quake, spark, mrise];

    //details for tourney enemies
    const allwrath = {
        name: "ALLWRATH",
        rarity: "Galactic",
        assets: 'AllWrath',
        assetAnim: "idle_AllWrath",
        maxHP: 15000,
        currentHP: 15000,
        stats: [2500, 2650, 2600], //ATK, DEF, SPD
        moves: [torrentus, hkai, msurge],
        level: 10,
        isAlive: true,
        isBoss: true
    }
    
    const malgrun = {
            name: "||MALGRÜN||",
            rarity: "Legendary",
            assets: 'Malgrun',
            assetAnim: "idle_Malgrun",
            maxHP: 10000,
            currentHP: 10000,
            stats: [1980, 1380, 1692], //ATK, DEF, SPD
            moves: [fireball, widow, quake],
            level: 7,
            isAlive: true,
            isBoss: true
        }

    const ruinn = {
            name: "Ŗ̴̃Ȗ̴̬I̵͎̋N̶̬̔Ǹ̸̡",
            assets: 'Ruinn',
            rarity: "Galactic",
            assetAnim: "idle_Ruinn",
            maxHP:20000,
            currentHP: 20000,
            stats: [3014, 2988, 3556], //ATK, DEF, SPD
            moves: [dspiral, mrise, sflare, bite],
            level: 10,
            isAlive: true,
            isBoss: true
        }
    const tourneyEnemies = [allwrath, malgrun, ruinn];

    //if entering for tourney, get alien based off of level
    if(this.registry.get("isTournament") == true){
        if(this.#player.getLevel() == 1){
            //first boss is ||MALGRUN||
            this.#EnemyAlien = new Enemy({
                scene: this,
                EnemyDetails: malgrun,
            }, {x: 600, y: 200});
        }else if(this.#player.getLevel() == 2){
            //second boss is ALLWRATH
            this.#EnemyAlien = new Enemy({
                scene: this,
                EnemyDetails: allwrath,
            }, {x: 600, y: 260});
        }else if(this.#player.getLevel() == 3){
            //last boss is Ŗ̴̃Ȗ̴̬I̵͎̋N̶̬̔Ǹ̸̡
            this.#EnemyAlien = new Enemy({
                scene: this,
                EnemyDetails: ruinn,
            }, {x: 600, y: 260});
        }else{
            //if already beaten all three enemies, pull a random
            var rand = this.getRand(0, tourneyEnemies.length-1);
            this.#EnemyAlien = new Enemy({
                scene: this,
                EnemyDetails: tourneyEnemies[rand]
            }, {x: 600, y: 250});
        }
        
        enemies = [this.#EnemyAlien];
    }else{
        enemies = this.genEnemies();
    }
    
    //create our alien and idle
    let directions = [[200,310] , [200,200], [100,310], [100,200]];
    let temp = this.registry.get('inventory_astrobeasts');
    let shop_beasts = this.registry.get('shop_astrobeasts');
    let my_move =  this.registry.get('inventory_moves');
    let moves_list = []
    let move_count = 0;
    for (let i = 0; i < my_move.length && move_count <4; i++){
        let name  = my_move[i]['key']
        if (name && my_move[i]["isEquipped"] ){

            let shop_moves = this.registry.get('shop_moves');
            for (var j = 0; j < shop_moves.length; j++){
                if (shop_moves[j].key === name){
                    let thing = new Move(shop_moves[j].name, shop_moves[j].description, shop_moves[j].damage, shop_moves[j].accuracy, shop_moves[j].level);
                    moves_list.push(thing);
                    move_count+=1;
                }
            }
        }
    }
    console.log("our moves", moves_list);
    let count = 0;

    console.log("temp:", temp)

    for (let i = 0; i < temp.length; i++){
        if (temp[i]['isEquipped'] && count < directions.length){
            let assetAnime = "";
            let rare = "";
            let MAXEXP = 0;

            for (let j = 0; j < shop_beasts.length; j++) {
                if (shop_beasts[j].name === temp[i].name) {
                    assetAnime = shop_beasts[j].assetAnim; 
                    rare = shop_beasts[j].rarity;
                    //MAXEXP = shop_beasts[j].maxExp;
                    break; 
                }
            }

            let alien = new Aliens({
                scene:this,
                AlienDetails: {
                    name: temp[i]['name'],
                    rarity: rare,
                    assets: temp[i]['assets'],
                    assetAnim: assetAnime,
                    maxHP: temp[i]['maxHP'],
                    currentHP: temp[i]['currentHP'],
                    maxExp: temp[i]['maxExp'],
                    currentExp: temp[i]['currentExp'],
                    stats: temp[i]['stats'], //ATK, DEF, SPD, DEX, LUK
                    moves: moves_list,
                    level: temp[i]['level'],
                    isAlive: temp[i]['isAlive'],
                }
                
            }, {x: directions[count][0], y: directions[count][1]})
            console.log("created alien", alien.getDetials())
            party.push(alien);        
            count++;
        }
    }

    console.log("our party", party)
    if(party.length == 0){
        alert("You must equip at least one AstroBeast before entering combat!");
        check = false;
    }
    if(moves_list.length == 0){
        alert("You must equip at least one Move before entering combat!");
        check = false;
    }

    console.log("check =",check)
    if(check == true){
        console.log("party:", party)
        //Create box on the bottom
        attacker = party[0];
        this.#combatMenu = new CombatMenu(this, attacker, this.#items);// this.#PlayerAlien);
        //this.#combatMenu.initialize(attacker)
        this.#combatMenu.battleOptionsOn()
    }
}


update() {
console.log('update - Combat');
    if(check == false){
        //reset key variables
        party = [];
        enemies = [];
        CURR_TURN = 0;
        CURR_PARTY = 'player';
        attacker = undefined;
        target = undefined;
        move = undefined;
        check = true;
        this.scene.start("LoadHub");
    }
  
if(STATUS_STATE == 'use_item'){
    const items = this.registry.get('inventory_items');
    const equippedItems = items.filter(items => items.isEquipped);
    const equippedItemsCount = items.filter(items => items.isEquipped);
    
    if(equippedItemsCount == 0)
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
}
else if(STATUS_STATE =='scanning'){
    this.#combatMenu.battleOptionsOff();

    var livE = enemies.filter(e => e.getAlive())
    this.#combatMenu.setTargetOptions(livE)
    this.#combatMenu.targetOptionsOn();

    //get input for choosing target
    if(Phaser.Input.Keyboard.JustDown(cursors.up)){
        target = enemies[0]; //For now
    }else if(Phaser.Input.Keyboard.JustDown(cursors.left)){
        if(enemies.length >= 2)
            target = enemies[1]; //For now      
    }else if(Phaser.Input.Keyboard.JustDown(cursors.right)){
        if(enemies.length >= 3)
            target = enemies[2]; //For now        
    }else if(Phaser.Input.Keyboard.JustDown(cursors.down)){
        if(enemies.length >= 4)
            target = enemies[3]; //For now      
    }

    //check if selected target is alive
    if(target != undefined && target.getAlive() == false){
        console.log("cannot choose this target cuz they're dead")
        target = undefined;
    }

    if(target != undefined){
        this.scanStuff();
    }
} 
else if(STATUS_STATE == 'fight'){
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
            target = livE[0]; //For now
            target.NameandHPon();
            target.takeDamage(0) //renders correct HPBat
        }else if(Phaser.Input.Keyboard.JustDown(cursors.left)){
            if(livE.length >= 2){
                target = livE[1]; //For now
                target.NameandHPon();
                target.takeDamage(0) //renders correct HPBat
            }
        }else if(Phaser.Input.Keyboard.JustDown(cursors.right)){
            if(livE.length >= 3){
                target = livE[2]; //For now
                target.NameandHPon();
                target.takeDamage(0) //renders correct HPBat
            }
        }else if(Phaser.Input.Keyboard.JustDown(cursors.down)){
            if(livE.length >= 4){
                target = livE[3]; //For now
                target.NameandHPon();
                target.takeDamage(0) //renders correct HPBat
            }
        }

        //check if selected target is alive
        if(target != undefined && target.getAlive() == false){
            console.log("cannot choose this target cuz they're dead")
            target = undefined;
        }

        if(target != undefined){
            this.battlestuff();
        }        
    }else if(STATUS_STATE == "enemy"){
        var x = [2000, 4100, 6200, 8300]
        var livingE = enemies.filter(e => e.getAlive());
        for(var i = 0; i < livingE.length; i++){
            this.time.delayedCall(x[i]-5, this.enemyTurn, null, this);
        }
        STATUS_STATE = "nothing"
    }else if(STATUS_STATE == "conclusion"){
        //reset important variables when spacebar is pressed
        if(spacebar.isDown){
            STATUS_STATE = "nothing";
            this.registry.set("player", this.#player); //update player object
            if(this.registry.get("isTournament") == true && this.#player.getLevel() >= 4){
                this.registry.set("isTournament", false); //isTourney object
                this.scene.start("LoadCongrats");
            }else{
                this.registry.set("isTournament", false); //isTourney object
                this.scene.start("LoadHub");
            }
        }
        //reset important variables regardless
        party = [];
        enemies = [];
        CURR_TURN = 0;
        CURR_PARTY = 'player';
        attacker = undefined;
        target = undefined;
        move = undefined;
    }else if(STATUS_STATE == "waiting"){
    
    }else{   
        attacker = party[CURR_TURN];
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
            STATUS_STATE = "waiting"
            this.flee();
        } 
        else
        {
        //Nothing here for now. 
        }
    }
}
    //randomly generates a party of 2-4 enemy Astrobeasts 
    genEnemies(){
        const rabs = this.registry.get("shop_astrobeasts")
        const partySize = this.getRand(2,4); //size of enemy party
        const directions = [[500,310] , [500,150], [650,310], [650,150]];
        var [indexes, enemies] = [[], []];

        console.log("we're making " + partySize + " enemies")
        for(var i = 0; i < partySize; i++){
            const rand = this.getRand(0, rabs.length- 1)
            const randEnemyDict = rabs[rand];
            var percent = this.getRand(40, 60) / 100; //enemies HP are reduced by 40-60%
            console.log(randEnemyDict['name'], "health reduction", percent)
            
            const HP = Math.round(randEnemyDict['maxHP'] * (1-percent))
            console.log(randEnemyDict['name'], "health is:" + HP)
            
            let enemy = new Enemy({
                scene: this,
                EnemyDetails:{
                    name: randEnemyDict['name'],
                    rarity: randEnemyDict['rarity'],
                    assets: randEnemyDict['assets'],
                    assetAnim: randEnemyDict['assetAnim'],
                    maxHP: HP,
                    currentHP: HP,
                    stats: randEnemyDict['stats'],
                    moves: this.genMoves(),
                    level: this.getRand(1, 7),
                    isAlive: true,
                    isBoss: false
                }
            }, {x: directions[i][0], y: directions[i][1]});

            console.log(enemy.getDetails())
            //if this index has already been selected, update enemy name
            if(indexes.includes(rand)){
                var n = 0;
                for(var j = 0; j < indexes.length; j++){
                    if(indexes[j] == rand){
                        n++;
                    }
                }
                enemy.setName(enemy.getName() + " " + (n+1))
            }
            console.log(enemy.getDetails());
            enemies.push(enemy); //push this enemy to our array
            indexes.push(rand); //append this index to our array
        }

        return enemies;
    }

    /*
    randomly generates an array of Move objects
    */
    genMoves(){
        var [indexes, Moves] = [[], []];
        const num = this.getRand(1,4); //number of unique moves 

        //get random moves
        for(var i = 0; i < num; i++){
            var rand = this.getRand(0, this.#globalMoves.length - 1);
            if(indexes.indexOf(rand) == -1){
                Moves.push(this.#globalMoves[rand])
                indexes.push(rand)
            }else{
                i--; //go back in loop
            }
        }
        console.log("generated moves:", Moves)
        return Moves;
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

    enemyAttack(attacker, target, move){
        var d = this.calcEnemyDamage(attacker, move); //raw damage a move can do
        console.log("raw enemy damage: " + d)
        var m = this.calcMitigation(target); //the percentage of damage that the target can mitigate
        console.log("percentage of player mitigation: " + m)
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
        var d = (Math.pow(attacker.getATK(), 1.18) / 1.5) + (rand * move.getBaseAttack()) + (10 * move.getLevel()) - 900

        return d;
    }

    /*
    formula to calculate raw damage for an enemy attacker based on attacker ATK and level and a random number
    */
    calcEnemyDamage(attacker, move){
        var rand = this.getRand(0, 5);
        console.log("random number:", rand)
        var d = (0.5 * Math.pow(attacker.getATK() * rand, 0.8)) + (5 * attacker.getLevel()) + move.getBaseAttack();

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
            
            //get the total damage of an attack
            var d = this.attack(attacker, target, move);
            
            //check critical
            //this is also purely random; this will depend on player LUK later
            var crit = this.getRand(0,100);
            if(crit <= 5){
                d *= 2; //if there's a critical hit, double the damage
            }
            var remains

            //reduce health
            target.takeDamage(d)
            var remains = target.getCurrentHP();

            this.#combatMenu.playerFightInputSelect(move, target, d, remains);
            STATUS_STATE = 'rest';

            if(target.getCurrentHP() <= 0){
                console.log("Someone Died")
                target.setAlive(false);
                target.setAnimation("died_" + target.getAssets());
                this.#combatMenu.deathnotice(target.getName());   
            }
        }else{
            //if the attack misses
            console.log("MISS")
            this.#combatMenu.missRender(attacker.getName());
            STATUS_STATE = 'rest';
            //this.time.delayedCall(1000, this.updateUConsole, ["The " + move.name + " missed..."], this);
        }

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
            // alert("enemy turn")
            console.log("enemy's turn")
            if(attacker != undefined){
                attacker.NameandHPoff();
                console.log("Turn off", attacker.getName())
            }
            if(target != undefined){
                target.NameandHPoff();
            }
            CURR_PARTY = "enemy";
            CURR_TURN = 0;
            STATUS_STATE = "enemy"; //change state to enemy turn 
        }else{
            attacker.NameandHPoff();
            console.log("Turn off", attacker.getName())
            attacker = party[CURR_TURN]
            console.log("It is turn",CURR_TURN)
            this.#combatMenu.setAlien(attacker);
            this.time.delayedCall(2000, this.#combatMenu.battleOptionsOn, null, this.#combatMenu);
            //this.#combatMenu.initialize(attacker)
            attacker.NameandHPon();
            STATUS_STATE = "nothing";
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
            STATUS_STATE = "nothing";
            this.#combatMenu.setAlien(party.filter(ab => ab.getAlive())[0]);
            this.#combatMenu.battleOptionsOn();
        }
    }
    move = undefined;
    attacker = undefined;
    target = undefined;
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
            //update the astrobeasts in combat
            STATUS_STATE = "conclusion";
            this.#player.updateExpGained(expGain); //update exp earned and credits earned
            this.#player.updateCredits(moneyGain)
            this.#player.battlesWon++; //increment battles won
            //if playing the story mode, level increases
            if(this.registry.get("isTournament") == true){
                this.#player.incrementLevel();
            }
        }
        //end scene in defeat
        else if(condition == 1){
            //you earn 1/10 exp for each point of damage you did
            expGain = Math.round(damageDone / 10);
            //and lose 1000 credits
            moneyGain = -100;
            this.time.delayedCall(2000, this.#combatMenu.showEndMsg, ["DEFEAT\nYou earned " + expGain + " EXP and " + moneyGain + " credits.\nPress Spacebar to exit."], this.#combatMenu);
            this.checkLevelUp(expGain);
            STATUS_STATE = "conclusion";
            this.#player.updateExpGained(expGain); //update exp earned and credits earned
            this.#player.updateCredits(moneyGain);
        }
        //end scene in fleeing
        else if(condition == 2){
            this.time.delayedCall(500, this.#combatMenu.showEndMsg, ["You have successfully fled the battle.\nPress Spacebar to exit."], this.#combatMenu);
            STATUS_STATE = "conclusion";
        }

        if(condition != -1){
            //update astrobeasts in registry
            let registryAstrobeasts = this.registry.get('inventory_astrobeasts')
            for(var i = 0; i < registryAstrobeasts.length; i++){
                //if it was an astrobeast involved in battle, we must update certain data like stats, exp, and HP
                if(registryAstrobeasts[i]['isEquipped'] == true){
                    //find which party member it is
                    for(var j = 0; j < party.length; j++){
                        if(registryAstrobeasts[i]['name'] == party[j].getName()){
                            //stats
                            registryAstrobeasts[i]['stats'] = party[j].getStats();
                            //exp and level
                            registryAstrobeasts[i]['currentExp'] = party[j].getCurrentExp();
                            registryAstrobeasts[i]['maxExp'] = party[j].getMaxExp();
                            registryAstrobeasts[i]['level'] = party[j].getLevel();
                            //HP
                            registryAstrobeasts[i]['currentHP'] = party[j].getMaxHP(); //reset max HP
                            registryAstrobeasts[i]['maxHP'] = party[j].getMaxHP();
                        }
                    }
                }
            }
            this.registry.set('inventory_astrobeasts', registryAstrobeasts)
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
        this.#combatMenu.battleOptionsOff();
        var atkrs = enemies.filter(e => e.getAlive())
        attacker = atkrs[CURR_TURN]; //get the attacker
        if(attacker != undefined){
            console.log("enemy attacker", attacker.getDetails())
            this.enemyTurnCont();
        }
    }

    enemyTurnCont(){
        //get move list
        var moves = attacker._enemyDetails.moves;
        move = moves[this.getRand(0, moves.length - 1)]; //get random move
        console.log("enemy's move", move)

        //get available targets (living friendlies)
        var targets = party.filter(ab => ab._alienDetails.isAlive)
        console.log("targets", targets)
        target = targets[this.getRand(0, targets.length - 1)] //get random living target
        console.log(target)

        //enemy attack
        var dmg = this.enemyAttack(attacker, target, move);
        var diff = target.getCurrentHP() - dmg;
        if(diff < 0){
            diff = 0;
        }
        this.#combatMenu.setAlien(attacker);
        this.#combatMenu.enemyAttacks(attacker.getName(), move.getName(), target.getName(), dmg, diff);//playerFightInputSelect(move, target, dmg, diff)
        target.takeDamage(dmg);
        this.#combatMenu.setAlien(attacker);

        //check if target is dead
        if(target._alienDetails.currentHP <= 0){
            target._alienDetails.isAlive = false;
            this.time.delayedCall(1000, this.#combatMenu.setRenderMessage, [target.getName() + " has been defeated!"], this.#combatMenu); 
            console.log(target.getName() + " has been defeated!")
            target.setAnimation("died_"+target.getName());
            console.log(target.getAnimation())
        }
        
        //see if one side is completely dead
        var condition = this.checkBattle();
        
        if(condition != -1)
            this.time.delayedCall(999, this.endBattle, [condition], this); //if battle is over, end the battle
        else{    
            STATUS_STATE = "nothing"; //reset state
            this.time.delayedCall(2000, this.changeTurn, [], this);
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
            this.time.delayedCall(2000, this.changeTurn, null, this);
        }
    }

scanStuff()
{
    this.#combatMenu.targetOptionsOff();
    STATUS_STATE = 'nothing';
    this.#combatMenu.showScan(target)
    target = undefined; //reset target
    return;
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