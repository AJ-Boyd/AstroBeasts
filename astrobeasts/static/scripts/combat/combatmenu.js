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
        this.#createTargetOptions();
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

   this.#scene.add.text(170,15, "lMoves[0].name", MenuOptionsTextStyle),
   this.#scene.add.text(55,43, "lMoves[1].name", MenuOptionsTextStyle),
   this.#scene.add.text(220,43, "lMoves[2].name", MenuOptionsTextStyle),
   this.#scene.add.text(170,70, "lMoves[3].name", MenuOptionsTextStyle),
  ]);

   this.fightOptionsOff();
 
 }

//UI for selecting targets
#createTargetOptions(targets = []){
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
    console.log(targets)
    var j = 0;
    for(var i = 0; i < this.#targetOpt.list.length; i++){
        var elem = this.#targetOpt.getAt(i);
        console.log(elem.type)
        if(elem.type == "Text"){   
            if(targets[j] != undefined){
                console.log(targets[j])
                elem.setText(targets[j].getName())
                console.log(elem.text)
            }else{
                elem.setText("")
            }
            j++;
            
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

    this.#RenderMessage = this.#scene.add.text(300, 540, "blank", MessageTextStyle);
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
        console.log(elem.type)

        if(elem.type == "Text"){    
            if(moveObjs[j] != undefined){
                console.log(moveObjs[j].name)
                elem.setText(moveObjs[j].name)
                console.log(elem.text)
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
        this.#RenderMessage.setText(`You Used An Item`)
        this.RenderMessageOn();
        
        this.#scene.time.delayedCall(2500, this.battleOptionsOn, null, this )
        this.#scene.time.delayedCall(2500, this.RenderMessageOff, null, this)

        this.item = this.#scene.add.sprite(615, 200, 'blueitem').setScale(3);
        this.item.anims.play('blueitem', true)
        
        return;
            
    }


}


playerFightInputSelect(move, hit, remains)  
{

  //Step 1: Player Attacks
   
        this.fightOptionsOff(),
        
       
        this.#RenderMessage.setText(`${this.lAlien.getName()} Used ${move.name} \n and Dealt ${hit} Damage! ${remains} HP Left`); 
        this.RenderMessageOn();
        this.#scene.time.delayedCall(2000, this.RenderMessageOff, null, this )
    
     


    //     var attack = "WHOMP"
    //     this.#RenderMessage.setText(`Your Enemy Uses ${attack}`); 
    //     this.RenderMessageOn();      
    //     this.#scene.time.delayedCall(1000, this.RenderMessageOff, null, this )

    //     //Step 5: Reduce Player Life

    //     this.#RenderMessage.setText(`You have lost HP`); 
    //     this.RenderMessageOn();      
    //     this.#scene.time.delayedCall(1000, this.RenderMessageOff, null, this )
        
    //     //Step6: Check Player is still alive

    // // Step 7Return
    this.#scene.time.delayedCall(2000, this.battleOptionsOn, null, this )
    // return;
    

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


// #Slashfight()
// {
//     var hit = this.getRand(0,100);
//     console.log("hit:", hit)
//     if(hit <= 95){
//         console.log("attack lands!")
//         //attack target
//         // attack(attacker, target, move){
//         //     var d = this.calcDamage(attacker, move); //raw damage a move can do
//         //     var m = this.calcMitigation(target); //the percentage of damage that the target can mitigate
//         //     d *= 1-m;
//         //     return d;
//         // }
        
//         //this will have a fully fleshed out formula but for now this should always return 95
//         var d = this.attack(attacker, target, move);
        
//         //check critical
//         //this is also purely random; this will depend on player LUK later
//         var crit = this.getRand(0,100);
//         if(crit <= 5){
//             d *= 2; //if there's a critical hit, double the damage
//         }
// }

// slashOff()
// {
//     this.#fightSlash.setAlpha(0);
// }
// slashOn()
// {
//     this.#fightSlash.setAlpha(1);
// }





// //returns a random number between min and max, both inclusinve



  

// }
}
