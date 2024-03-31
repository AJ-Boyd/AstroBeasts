
//BATTLE Options - TO DO: Make this reference the list of moves available
const ATTACK_LIST = Object.freeze({
    MOVE_1: 'Slash',
    MOVE_2: 'CrossSlash',
    MOVE_3: 'Bite',
    MOVE_4: 'Tackle',
});



//Run/Fight/Item/Scan - Should be CONSTANT?
const PLAYER_OPTIONS = Object.freeze({
    FIGHT: 'FIGHT',
    FLEE: 'FLEE',
    ITEM: 'ITEM',
    SCAN: 'SCAN',
});


export class CombatMenu {
    #scene;
    #battleOpt;
    #fightOpt;
    #battlePrompt; 
    #fightPrompt;
    #itemPrompt;
    #fightSlash;

    
    constructor(scene) {    
        this.#scene = scene;
        this.#createDialog();
        this.#createBattleOptions();
        this.#createFightOptions();
        this.#promptBattleOption();
        this.#promptFightOption();
        this.#promptItem();
        this.#Slashfight();
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
     this.#battleOpt = this.#scene.add.container(0,500, [
     this.#scene.add.image(40,52, 'leftkey').setScale(0.5),
     this.#scene.add.image(245,52, 'rightkey').setScale(0.5),
     this.#scene.add.image(110,20,'upkey').setScale(0.5),
     this.#scene.add.image(110,80,'downkey').setScale(0.5),
     this.#scene.add.text(
             125,15,
             PLAYER_OPTIONS.FIGHT, {
             color: 'red',
             fontSize: '20px',
             fontStyle: 'bold',
         }),
         this.#scene.add.text(
             55,43,
             PLAYER_OPTIONS.FLEE,{
             color:'red',
             fontSize: '20px',
             fontStyle: 'bold',
         }),
         this.#scene.add.text(
             180,43,
             PLAYER_OPTIONS.ITEM,{
             color:'red',
             fontSize: '20px',
             fontStyle: 'bold',
         }),
         this.#scene.add.text(
            125,70, 
             PLAYER_OPTIONS.SCAN,{
             color:'red',
             fontSize: '20px',
             fontStyle: 'bold',
         }),
     ]);

     this.battleOptionsOff();
     
 }

 //Create options for Player Moves
 #createFightOptions()
 {
  this.#fightOpt =  this.#scene.add.container(400,500, [
    this.#scene.add.text(55,22,ATTACK_LIST.MOVE_1, {
         color: 'black',
         fontSize: '18px',
         fontStyle: 'bold',
          }),
          this.#scene.add.text(55,55,ATTACK_LIST.MOVE_2,{
                color:'black',
                fontSize: '18px',
                fontStyle: 'bold',
            }),
            this.#scene.add.text(200,22,ATTACK_LIST.MOVE_3,{
                color:'black',
                fontSize: '18px',
                fontStyle: 'bold',
            }),
            this.#scene.add.text(200,55,ATTACK_LIST.MOVE_4,{
                color:'black',
                fontSize: '18px',
                fontStyle: 'bold',
            }),
     ])

     this.fightOptionsOff();
 
 }
 
 //Prompt for Run/Fight/Item
 
 #promptFightOption()
 {
  this.#fightPrompt =  this.#scene.add.container(0,500, [
    this.#scene.add.text(
         55,
         22,
         'What Do You Want To Do?',{
             color:'Blue',
             fontSize: '18px',
             fontStyle: 'bold',
         }),
     ])

     this.fightPromptOff();
}
 
 
 //Prompt for Battle Move
 
 #promptBattleOption()
 {
  this.#battlePrompt= this.#scene.add.container(400,500, [
    this.#scene.add.text(
         70,
         40,
         'Your Orders, Sir?',{
             color:'Blue',
             fontSize: '25px',
             fontStyle: 'bold',
         }),
     ])

     this.battlePromptOff();
 
 }

 #promptItem()
 {    
    this.#itemPrompt = this.#scene.add.container(400,500, [
        this.#scene.add.text(
             70,
             40,
             'You Used an Item',{
                 color:'Blue',
                 fontSize: '30px',
                 fontStyle: 'bold',
             }),
         ])

         this.itemPromptOff();

}

battleOptionsOn()
{
     //Add MenuOptions - Player Options container
         this.#battleOpt.setAlpha(1); 
}
battleOptionsOff()
{
     //Add MenuOptions - Player Options container
         this.#battleOpt.setAlpha(0);
}

battlePromptOn()
{
    this.#battlePrompt.setAlpha(1);  
}

battlePromptOff()
{
    this.#battlePrompt.setAlpha(0);  
}

fightOptionsOn()
{
 this.#fightOpt.setAlpha(1);

}
fightOptionsOff()
{
 this.#fightOpt.setAlpha(0);

}
fightPromptOn()
{
    this.#fightPrompt.setAlpha(1);

}

fightPromptOff()
{
    this.#fightPrompt.setAlpha(0);

}

managedInFightScene()
{
    this.battleOptionsOff();
    this.battlePromptOff();

    this.fightOptionsOn();
    this.fightPromptOn();  
}

managedInBattleScene()
{
    this.battleOptionsOn();
    this.fightOptionsOff();
    this.battlePromptOn();
    this.fightPromptOff();  
}

itemPromptOff()
{
    this.#itemPrompt.setAlpha(0);
}

itemPromptOn()
{
    this.#itemPrompt.setAlpha(1);
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
    }
    if (entry == 'SCAN')
    {
        console.log("YOU are SCANNING")
    }
    if (entry == 'ITEM')
    {
        console.log("ITEM")
       
        this.battlePromptOff();
        this.battleOptionsOff();
        this.itemPromptOn();
        

        this.#scene.time.delayedCall(3000, this.battleOptionsOn, null, this )
        this.#scene.time.delayedCall(3000, this.battlePromptOn, null, this)
        this.#scene.time.delayedCall(3000, this.itemPromptOff, null, this)


        this.item = this.#scene.add.sprite(615, 200, 'blueitem').setScale(3);
        this.item.anims.play('blueitem',true)
        
        return;
            
    }


}


playerFightInputSelect(entry)
{

    if(entry == 'slash'){

        this.fightOptionsOff();
        this.fightPromptOff();
        this.slashOn();

        this.#scene.time.delayedCall(1000, this.slashOff, null, this)
        this.#scene.time.delayedCall(1000, this.battleOptionsOn, null, this )
        this.#scene.time.delayedCall(1000, this.battlePromptOn, null, this)

            
        return; 
     }
   else
    {
        return;
     }

    
}


#Slashfight()
{
    this.#fightSlash = this.#scene.add.text(
        200,
        300,
        'SLlllllllllllllASH',{
            color:'Red',
            fontSize: '40px',
            fontStyle: 'bold italic',
        }),
    console.log("SLLLLLAAAASSSHHHH")

    this.slashOff();
}

slashOff()
{
    this.#fightSlash.setAlpha(0);
}
slashOn()
{
    this.#fightSlash.setAlpha(1);
}

}
