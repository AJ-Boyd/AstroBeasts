import { Enemy } from "./enemies.js";

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
    [170, 15],
    [55, 43],
    [220, 43],
    [170, 70],
]
    
//text styles
const MessageTextStyle = {
    color:'Blue',
    fontSize: '22px',
    fontStyle: 'bold',
    align: "center"
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
    #itemOpt;
    #targetOpt;


    #BattleText;
    #FightText;
    #itemText;
    #targetText;

    #fightSlash;
    #fightMessage;
    
    #RenderMessage

    constructor(scene, alien, items)    
        {
        this.#scene = scene;
        this.lAlien = alien;
        console.log("lAlien in constructor: " + this.lAlien)
        
        lMoves = []

        this.lItems = items;

        this.#createDialog();
        this.#createBattleOptions();

        this.createFightOptions();
        this.createTargetOptions();
        this.createItemOptions();

        this.#promptItem();
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
 
 initialize(attacker)
 {
    attacker.getName()
    this.#RenderMessage.setText(`${attacker.getName()}'s Turn!`).setFontSize('25px').setDisplayOrigin(0, -10); 
    this.RenderMessageOn();
    this.#scene.time.delayedCall(1000, this.RenderMessageOff, null, this )
    this.#scene.time.delayedCall(3000, this.battleOptionsOn, null, this )
}
 
 //Create Run/Fight/Scan options. 
 #createBattleOptions()
 {
    console.log("lAlien: " + this.lAlien)
    this.#BattleText = this.#scene.add.text(400, 540, `What will ${this.lAlien.getName()} do?`, MessageTextStyle);
     
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
  

  this.#FightText = this.#scene.add.text(55,540, `Select a Move for ${this.lAlien.getName()}`, MessageTextStyle)

  this.#fightOpt =  this.#scene.add.container(400,500, [
  this.#scene.add.image(40,52, 'leftkey').setScale(0.5),
  this.#scene.add.image(285,52, 'rightkey').setScale(0.5),
  this.#scene.add.image(150,20,'upkey').setScale(0.5),
  this.#scene.add.image(150,80,'downkey').setScale(0.5),

   this.#scene.add.text(170,15, "lMoves[0].name", MenuOptionsTextStyle),
   this.#scene.add.text(55,43, "lMoves[1].name", MenuOptionsTextStyle),
   this.#scene.add.text(220,43, "lMoves[2].name", MenuOptionsTextStyle),
   this.#scene.add.text(170,70, "lMoves[3].name", MenuOptionsTextStyle),
  ]);

   this.fightOptionsOff();
 
 }

//UI for selecting targets
createTargetOptions(targets = []){
    this.#targetText = this.#scene.add.text(55,540, "Select a target!", MessageTextStyle);
    this.#targetOpt = this.#scene.add.container(400, 500,
    [
        this.#scene.add.image(40,52, 'leftkey').setScale(0.5),
        this.#scene.add.image(285,52, 'rightkey').setScale(0.5),
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
   

    var j = 0;
    for(var i = 0; i < this.#targetOpt.list.length; i++){
        var elem = this.#targetOpt.getAt(i);
       
        if(elem.type == "Text"){    
           
            elem.setText(targets[j].getName())
         
            j++;
            if(j == targets.length)
                return;
            
        }
    }
}

createItemOptions()
{
    this.#itemText = this.#scene.add.text(55,540, "Select an Item", MessageTextStyle);
   
    this.#itemOpt = this.#scene.add.container(400, 500,
    [
        this.#scene.add.text(170,15, " -- ", MenuOptionsTextStyle),
        this.#scene.add.text(55,43, " -- ",  MenuOptionsTextStyle),
        this.#scene.add.text(220,43, "--", MenuOptionsTextStyle),
        this.#scene.add.text(170,70, "--", MenuOptionsTextStyle),
        
        this.#scene.add.image(40,52, 'leftkey').setScale(0.5),
        this.#scene.add.image(320,52, 'rightkey').setScale(0.5),
        this.#scene.add.image(150,20,'upkey').setScale(0.5),
        this.#scene.add.image(150,80,'downkey').setScale(0.5),
   
    ]);
    // for(var i = 0; i < 4; i++){
    //     const text = this.#scene.add.text(
    //         optCoords[i][0], optCoords[i][1], " ", MenuOptionsTextStyle
    //     )
    //     this.#itemOpt.add(text)
    // }
    this.itemOptionsOff();
}

setItemOptions()
{
    const items = this.#scene.registry.get('inventory_items')

    const equippedItems = items.filter(items => items.isEquipped);
    const equippedItemsCount = equippedItems.length
    var j = 0;
    for(var j = 0; j < 4; j++)
    {
        var elem = this.#itemOpt.getAt(j);
        var dis = " -- ";

        if( j < equippedItemsCount)
        {
            dis = equippedItems[j].name
        }

        if(elem.type == "Text"){    
             elem.setText(dis)        
        }
        
    }
    return
}
   

targetOptionsOff(){
    this.#targetOpt.setAlpha(0);
    this.#targetText.setAlpha(0);
}
targetOptionsOn(){
    this.#targetOpt.setAlpha(1);
    this.#targetText.setAlpha(1);
}


itemOptionsOff(){
    this.#itemOpt.setAlpha(0);
    this.#itemText.setAlpha(0);
}
itemOptionsOn(){
   this.#itemOpt.setAlpha(1);
   this.#itemText.setAlpha(1);
}

//Show Text
 #promptItem()
 {    
    this.#RenderMessage = this.#scene.add.text(320, 520, "blank", MessageTextStyle); 
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
setFightOptions(moveObjs){
    var j = 0;
    console.log("setting move options")
    for(var i = 0; i < this.#fightOpt.list.length; i++){
        var elem = this.#fightOpt.getAt(i);

        if(elem.type == "Text"){    
            if(moveObjs[j] != undefined){
                elem.setText(moveObjs[j].getName())
            }else{
                elem.setText("")
            }
            j++;
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
//prints message to console
setRenderMessage(text){
    this.RenderMessageOn();
    this.#RenderMessage.setText(text);
    this.#scene.time.delayedCall(2000, this.RenderMessageOff, null, this)
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
        this.#scene.scene.start("MainMenu")
        return;
        
    }
    if (entry == 'SCAN')
    {
        console.log("YOU are SCANNING")
    }
    if (entry == 'ITEM')
    {
        console.log("ITEM")
        this.battleOptionsOff();       
        return
            
    }


}


playerFightInputSelect(move, target, hit, remains)  
{

  //Step 1: Player Attacks
   
        this.fightOptionsOff();
        this.battleOptionsOff();
        this.#RenderMessage.setText(`${this.lAlien.getName()} used ${move.getName()} on ${target.getName()}\n and dealt ${hit} damage! ${remains} HP left`).setDisplayOrigin(190, 0); 
        this.RenderMessageOn();
        this.#scene.time.delayedCall(2000, this.RenderMessageOff, null, this)
        this.#scene.time.delayedCall(2000, this.battleOptionsOn, null, this)
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
 
        this.fightOptionsOff();
        this.#RenderMessage.setText(`${name} is defeated`); 
        this.RenderMessageOn();
        this.#scene.time.delayedCall(1500, this.RenderMessageOff, null, this )
        this.#scene.time.delayedCall(2000, this.battleOptionsOn, null, this )
    }

showEndMsg(msg){
    this.fightOptionsOff();
    this.battleOptionsOff();
    this.#RenderMessage.setText(msg).setFontSize("20px").setDisplayOrigin( 150, 0);
    this.RenderMessageOn();
}

setAlien(alien){
    this.lAlien = alien;
    this.#BattleText.setText(`What will ${this.lAlien.getName()} do?`);
    
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
    this.#RenderMessage.setText(`${enemy.getName()}'s Stats:\n ATK: ${stats[0]}       DEF: ${stats[1]}\nSPD: ${stats[2]}       LVL: ${enemy.getLevel()}\nHP:  ${enemy.getCurrentHP()}
                 
     `) .setFontSize('25px')
        .setScale(0.8)
        .setDisplayOrigin(50,20);

    this.RenderMessageOn();
    this.#scene.time.delayedCall(1500, this.RenderMessageOff, null, this )
    this.#scene.time.delayedCall(1500, enemy.NameandHPoff(), null, this)
    this.#scene.time.delayedCall(1600, this.battleOptionsOn, null, this )

}

attackerError(text)
{
 
        this.fightOptionsOff(),
        
       
        this.#RenderMessage.setText(text); 
        this.RenderMessageOn();
        this.#scene.time.delayedCall(1500, this.RenderMessageOff, null, this )
        this.#scene.time.delayedCall(2000, this.battleOptionsOn, null, this )
}





}
