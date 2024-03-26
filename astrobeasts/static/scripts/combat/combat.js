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

 this.add.sprite(600, 370, 'Icell').setScale(3);

//create our alien

 this.add.sprite(200, 370, 'Tyboar').setScale(4);




}


update() {

console.log('update');




}


}