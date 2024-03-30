const ATTACK_LIST = Object.freeze({
    Slash: 'Slash',
    CrossSlash: 'CrossSlash',
    Bite: 'Bite',
    Tackle: 'Tackle',
});

const PLAYER_OPTIONS = Object.freeze({
    FIGHT: 'FIGHT',
    FLEE: 'FLEE',
    ITEM: 'ITEM',
    SCAN: 'SCAN',
});
    
    
    export class CombatScene extends Phaser.Scene {
    constructor() {
        super({
            key:CombatScene.name,
            active: true,
        });
        console.log(CombatScene.name);
    }





create() {
   
    console.log('create - Combat');


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


//Enemy Name formatting
const enemyAlien = this.add.text(40,0, "TARKEEL", 
    {
        color: '#31b1e0',
        fontSize: '28px',
        fontStyle: 'bold italic',
    }
);

 //Player Name formatting
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
this.#createBattleOpt(),

//Add MenuOptions - Player Options container
this.add.container(0,500, [
     this.add.text(55,22,PLAYER_OPTIONS.FIGHT, {
        color: 'red',
        fontSize: '20px',
        fontStyle: 'bold',
     }),
    this.add.text(55,55,PLAYER_OPTIONS.FLEE,{
        color:'red',
        fontSize: '20px',
        fontStyle: 'bold',
    }),
    this.add.text(200,22,PLAYER_OPTIONS.ITEM,{
        color:'red',
        fontSize: '20px',
        fontStyle: 'bold',
    }),
    this.add.text(200,55,PLAYER_OPTIONS.SCAN,{
        color:'red',
        fontSize: '20px',
        fontStyle: 'bold',
    }),

]);

//Add MenuOptions - Fight Options Container
this.add.container(400,500, [
    this.add.text(55,22,ATTACK_LIST.Slash, {
    color: 'black',
    fontSize: '18px',
    fontStyle: 'bold',
     }),
       this.add.text(55,55,ATTACK_LIST.CrossSlash,{
           color:'black',
           fontSize: '18px',
           fontStyle: 'bold',
       }),
       this.add.text(200,22,ATTACK_LIST.Bite,{
           color:'black',
           fontSize: '18px',
           fontStyle: 'bold',
       }),
       this.add.text(200,55,ATTACK_LIST.Tackle,{
           color:'black',
           fontSize: '18px',
           fontStyle: 'bold',
       }),
]);


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


#createBattleOpt()
{
    const rHeight = 94; 
    
    this.add
        .rectangle(
        3, 
        this.scale.height-rHeight-3, //height-1/2 padding
        this.scale.width-6, //width minus padding
        rHeight, 
        0xede4f3,//sets background color for text box
        1
        ).setOrigin(0)
        .setStrokeStyle(6,0x00b2e3,1) //sets border on text box (6 pixels, color)

}



//#createStatus


update() {

console.log('update - Combat');


}




}
