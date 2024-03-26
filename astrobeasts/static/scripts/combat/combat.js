export class CombatScene extends Phaser.Scene {
    constructor() {
        super({
            key:CombatScene.name,
            active: true,
        });
        console.log(CombatScene.name);
    }





create() {



    //background
    console.log('create');

    this.add.image(
        this.scale.width/2,
        this.scale.height/2, 
        'background');

//create enemy alien

 this.enemy = this.add.sprite(600, 370, 'Icell').setScale(3);

//create our alien

 this.player = this.add.sprite(200, 370, 'Strikoh').setScale(4);


//Enemy Name
this.add.text(30,20,"Icell");

 //Player Name
 this.add.text(30,20,"Strikoh");



this.add.container(556, 318, []);

//idle animations for both
this.player.anims.play("idleStrike", true)
this.enemy.anims.play("idleIce", true)

}


update() {

console.log('update');







}


}