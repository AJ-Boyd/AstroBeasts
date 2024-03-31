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
    this.add.image(
        this.scale.width/2,
        this.scale.height/2, 
        'background');

//create enemy alien

 this.enemy = this.add.sprite(600, 370, 'Tarkeel').setScale(3);

//create our alien

 this.player = this.add.sprite(200, 370, 'Strikoh').setScale(4);


 //idle animations for both
this.player.anims.play("idle_Tarkeel", true)
this.enemy.anims.play("idle_Strikoh", true)

//Enemy Name
const enemyAlien = this.add.text(50,0, "TARKEEL", 
    {
        color: '#31b1e0',
        fontSize: '28px',
        fontStyle: 'bold italic',
    }
);

 //Player Name
 const playerAlien = this.add.text(40,0,"STRIKOH", 
    {
        color: '#045eda',
        fontSize: '28px',
        fontStyle: 'bold italic',
    }
);

//Create container for Enemy health bar

this.add.container(600, 500, [
    this.add
    .image(0, 0,"healthback")
    .setOrigin(0),
    enemyAlien,
    this.#createHealth(34,34),
]);

//Create container for Player health bar
this.add.container(0, 20, [
    this.add
    .image(0, 0,"healthback")
    .setOrigin(0),
    playerAlien,
    this.#createHealth(34,34),
]);
}

#createHealth(x , y) {
    
    const leftCap = this.add
        .image(x , y, 'leftcap')
        .setOrigin(0,0.5);
    const middle = this.add
        .image(leftCap.x +leftCap.width, y, 'midhealth')
        .setOrigin(0,0.5);
        //Adjust for health bar
        middle.displayWidth = 0
    const rightCap = this.add
        .image(middle.x + middle.displayWidth, y, 'rightcap')
        .setOrigin(0,0.5);
    return this.add.container(x,y, [leftCap, middle , rightCap ])
} 





update() {

console.log('update - Combat');


}




}
