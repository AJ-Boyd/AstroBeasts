import { Enemies } from "./enemies.js";

//BATTLE Options - TO DO: Make this reference the list of moves available

//Run/Fight/Item/Scan - Should be CONSTANT?
const PLAYER_OPTIONS = Object.freeze({
    FIGHT: 'FIGHT',
    FLEE: 'FLEE',
    ITEM: 'ITEM',
    SCAN: 'SCAN',
});

//UI positioning constants
const optCoords =  [
    [170, 15], //up
    [55, 43], //left
    [220, 43], //right
    [170, 70], //down
]
    
//text styles
const MessageTextStyle = {
    color:'Blue',
    fontSize: '22px',
    fontStyle: 'bold',
}

const StatsTable = {
    color:'green',
    fontSize: '20px',
    fontStyle: 'bold',
}


const MenuOptionsTextStyle = {
    color: 'red',
    fontSize: '20px',
    fontStyle: 'bold',
}

var lName
var lMoves = []

export class CombatMenu {
    //member variables
    #scene;
    #battleOpt;
    #fightOpt;
    #BattleText;
    #FightText;
    #fightSlash;
    #fightMessage;
    #targetOpt;
    #targetText;

    #RenderMessage  
    //_astromoves

    constructor(scene, alien)    
        {
        this.#scene = scene;

        this.lAlien = alien;
           
        lMoves = []

        this.#createDialog();
        this.#createBattleOptions();
        this.createFightOptions();
        this.createTargetOptions();
        this.#promptItem();
       // this.#Slashfight();

    }




 //Create the Dialog Box.
 #createDialog()
 {
     const rHeight = 94; 
     
     this.#scene.add
         .rectangle(
         3, 
         this.#scene.scale.height-rHeight-3, //height-1/2 padding
         this.#scene.scale.width-6, //width minus padding
         rHeight, 
         0xede4f3,//sets background color for text box
         1
         ).setOrigin(0)
         .setStrokeStyle(6,0x00b2e3,1) //sets border on text box (6 pixels, color)
 
 }
 
 //Create Run/Fight/Scan options. 
 #createBattleOptions()
 {
    this.#BattleText = this.#scene.add.text(400, 540, "Your Orders, Sir?", MessageTextStyle);
     
    this.#battleOpt = this.#scene.add.container(0,500, [
     this.#scene.add.image(40,52, 'leftkey').setScale(0.5),
     this.#scene.add.image(245,52, 'rightkey').setScale(0.5),
     this.#scene.add.image(110,20,'upkey').setScale(0.5),
     this.#scene.add.image(110,80,'downkey').setScale(0.5),

     this.#scene.add.text(125,15, PLAYER_OPTIONS.FIGHT, MenuOptionsTextStyle),
     this.#scene.add.text(55,43,PLAYER_OPTIONS.FLEE,MenuOptionsTextStyle),
     this.#scene.add.text(180,43,PLAYER_OPTIONS.ITEM, MenuOptionsTextStyle),
     this.#scene.add.text(125,70, PLAYER_OPTIONS.SCAN,MenuOptionsTextStyle),
     ]);

     this.battleOptionsOff();
     
 }

 //Create options for Player Moves
 createFightOptions()
 {
    lMoves = this.lAlien.getMoves()
    console.log(this.lAlien.getName())

  this.#FightText = this.#scene.add.text(55,540, `Select a Move for ${this.lAlien.getName()}`, MessageTextStyle)

  this.#fightOpt =  this.#scene.add.container(400,500, [
  this.#scene.add.image(40,52, 'leftkey').setScale(0.5),
  this.#scene.add.image(285,52, 'rightkey').setScale(0.5),
  this.#scene.add.image(150,20,'upkey').setScale(0.5),
  this.#scene.add.image(150,80,'downkey').setScale(0.5),

   this.#scene.add.text(170,15, lMoves[0], MenuOptionsTextStyle),
   this.#scene.add.text(55,43, lMoves[1],  MenuOptionsTextStyle),
   this.#scene.add.text(220,43, lMoves[2], MenuOptionsTextStyle),
   this.#scene.add.text(170,70, lMoves[3], MenuOptionsTextStyle),
  ]);

   this.fightOptionsOff();
 
 }

//UI for selecting targets

createTargetOptions()
{
    this.#targetText = this.#scene.add.text(55,540, "Select a target!", MessageTextStyle);
    
    this.#targetOpt = this.#scene.add.container(400, 500,
    [
        this.#scene.add.image(40,52, 'leftkey').setScale(0.5),
        this.#scene.add.image(320,52, 'rightkey').setScale(0.5),
        this.#scene.add.image(150,20,'upkey').setScale(0.5),
        this.#scene.add.image(150,80,'downkey').setScale(0.5),
    ]);

     for(var i = 0; i < 4; i++){
         const text = this.#scene.add.text(
             optCoords[i][0], optCoords[i][1], "", MenuOptionsTextStyle
         )
         this.#targetOpt.add(text)
     }
    this.targetOptionsOff();
}

setTargetOptions(targets){
    console.log(targets)

    var j = 0;
    for(var i = 0; i < this.#targetOpt.list.length; i++){
        var elem = this.#targetOpt.getAt(i);
        if(elem.type == "Text"){    
            console.log(targets[j])
            elem.setText(targets[j].getName())
            console.log(elem.text)
            j++;
            if(j == targets.length)
                return;
        }
    }
}
targetOptionsOff(){
    this.#targetOpt.setAlpha(0);
    this.#targetText.setAlpha(0);
}
targetOptionsOn(){
    this.#targetOpt.setAlpha(1);
    this.#targetText.setAlpha(1);
}

//Show Item Used Text
 #promptItem()
 {    

    this.#RenderMessage = this.#scene.add.text(300, 510, "blank", MessageTextStyle); 
    this.RenderMessageOff();

}

battleOptionsOn()
{
     //Add MenuOptions - Player Options container
         this.#battleOpt.setAlpha(1); 
         this.#BattleText.setAlpha(1);
}
battleOptionsOff()
{
     //Add MenuOptions - Player Options container
         this.#battleOpt.setAlpha(0);
         this.#BattleText.setAlpha(0);
}


fightOptionsOn()
{
 this.#fightOpt.setAlpha(1);
 this.#FightText.setAlpha(1);

}
fightOptionsOff()
{
 this.#fightOpt.setAlpha(0);
 this.#FightText.setAlpha(0);

}
setFightText(text){
    this.#FightText.setText(text)
}
//updates the arrow-key options
setFightOptions(newTexts){
    var j = 0;
    for(var i = 0; i < this.#fightOpt.list.length; i++){
        var elem = this.#fightOpt.getAt(i);
        console.log(elem.type)
        if(elem.type == "Text"){    
            console.log(newTexts[j])
            elem.setText(newTexts[j])
            console.log(elem.text)
            j++;
            if(j == newTexts.length)
                return;
        }
    }
}

managedInFightScene()
{
    this.battleOptionsOff();
    this.fightOptionsOn();
    

}

managedInBattleScene()
{
    this.battleOptionsOn();
    this.fightOptionsOff();


}

RenderMessageOff()
{
    this.#RenderMessage.setAlpha(0);
}

RenderMessageOn()
{
    this.#RenderMessage.setAlpha(1);
}

getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

playerInput(entry)
{
    if (entry == 'FIGHT')
    {
        this.managedInFightScene();
        return;
    }
    if (entry == 'FLEE')
    {
        console.log("YOU are FLEEING")
        //Return to main battle menu?
        this.#scene.scene.start("LoadHub")
        return;
        
    }
    if (entry == 'SCAN')
    {
        console.log("YOU are SCANNING")
        this.battleOptionsOff();
        return


    }
    if (entry == 'ITEM')
    {
        console.log("ITEM")
        
        this.battleOptionsOff();
        this.#RenderMessage.setText(`You Used An Item`).setFontSize('28px')
        this.RenderMessageOn();
        
        this.#scene.time.delayedCall(2500, this.battleOptionsOn, null, this )
        this.#scene.time.delayedCall(2500, this.RenderMessageOff, null, this)

        this.item = this.#scene.add.sprite(615, 200, 'blueitem').setScale(3);
        this.item.anims.play('blueitem',true)
        
        return;
            
    }


}


playerFightInputSelect(name, hit, remains)  
{

  //Step 1: Player Attacks
   
        this.fightOptionsOff(),
        
       
        this.#RenderMessage.setText(`${this.lAlien.getName()} Used ${name}\nand Dealt ${hit} Damage!\n${remains} HP Left`).setFontSize('25px').setDisplayOrigin(0, -10); 
        this.RenderMessageOn();
        this.#scene.time.delayedCall(2000, this.RenderMessageOff, null, this )
    
     

    this.#scene.time.delayedCall(2000, this.battleOptionsOn, null, this )
   
    

}

enemyAttacks(attackerName, attackerMove, friendlyName, damage, friendlyHP)
{

  //Step 1: Player Attacks
   
        this.fightOptionsOff(),
        
       
        this.#RenderMessage.setText(`It's ${attackerName}'s turn`); 
        this.RenderMessageOn();
        this.#scene.time.delayedCall(1500, this.RenderMessageOff, null, this )
        this.#RenderMessage.setText(`${attackerName} performed ${attackerMove} on \t ${friendlyName} and did ${damage} damage!`); 
        this.RenderMessageOn();
        this.#scene.time.delayedCall(2000, this.RenderMessageOff, null, this )
        this.#RenderMessage.setText(`${friendlyName} now has ${friendlyHP} remaining!`); 
        this.RenderMessageOn();
        this.#scene.time.delayedCall(1500, this.RenderMessageOff, null, this )

        this.#scene.time.delayedCall(2000, this.battleOptionsOn, null, this )
}

missRender(name)
{
 
        this.fightOptionsOff(),
        
       
        this.#RenderMessage.setText(`${name} Missed!!`); 
        this.RenderMessageOn();
        this.#scene.time.delayedCall(1500, this.RenderMessageOff, null, this )
        this.#scene.time.delayedCall(2000, this.battleOptionsOn, null, this )
    }
    

    
deathnotice(name)
{
 
        this.fightOptionsOff(),
        
       
        this.#RenderMessage.setText(`${name} is defeated`); 
        this.RenderMessageOn();
        this.#scene.time.delayedCall(1500, this.RenderMessageOff, null, this )
        this.#scene.time.delayedCall(2000, this.battleOptionsOn, null, this )
    }

setAlien(alien){
    this.lAlien = alien;
}



showScan(enemy)
{
    enemy.NameandHPon(); //This is not working for some reason
    var stats = [];
    stats = enemy.getStats();
    this.targetOptionsOff()
    this.#RenderMessage.setText(`${enemy.getName()} is being scanned!`); 
    this.RenderMessageOn();
    this.#scene.time.delayedCall(1500, this.RenderMessageOff, null, this )
    //[ATK, DEF, SPD, LUK]
    this.#RenderMessage.setText(`${enemy.getName()}'s Stats: 
                 ATK: ${stats[0]}       DEF: ${stats[1]}       
                 SPD: ${stats[2]}       LVL: ${enemy.getLevel()}
                 LUK: ${stats[3]}       HP:  ${enemy.getCurrentHP()}
                 
     `) .setFontSize('25px')
        .setScale(0.8)
        .setDisplayOrigin(0,0);

    this.RenderMessageOn();
    this.#scene.time.delayedCall(1500, this.RenderMessageOff, null, this )
    this.#scene.time.delayedCall(1500, enemy.NameandHPoff(), null, this)
    this.#scene.time.delayedCall(1600, this.battleOptionsOn, null, this )

}

}
