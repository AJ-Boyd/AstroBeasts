
export class HPBar {
   #scene;
   #HPcontainer;
   #fullhealth;
   #scaleY;
   #middle;
   #leftCap;
   #rightCap;

    /**
     * @param {number} x
     * @param {number} y
     * @param {Phaser.Scene} scene
     */
    constructor(scene,x,y)
    {
        this.#scene = scene;
        this.#fullhealth = 150;
        this.#scaleY = 0.7;
        this.#HPcontainer = this.#scene.add.container(x,y, [])
        this.#HPBarImage(x,y)
        this.#setHP(1);
        this.animateHP(0.2);
        
    }




    /**
     * @param {any} x
     * @param {any} y
     */

#HPBarImage(x , y) {
    
    this.#leftCap = this.#scene.add
        .image(x , y, 'leftcap')
        .setOrigin(0,0.5)
        .setScale(1,this.#scaleY);
    this.#middle = this.#scene.add
        .image(this.#leftCap.x +this.#leftCap.width, y, 'midhealth')
        .setOrigin(0,0.5)
        .setScale(1, this.#scaleY);
    this.#rightCap = this.#scene.add
        .image(this.#middle.x + this.#middle.displayWidth, y, 'rightcap')
        .setOrigin(0,0.5)
        .setScale(1,this.#scaleY);

        this.#HPcontainer.add([this.#leftCap, this.#middle, this.#rightCap ]); 

}

get container() {
    return this.#HPcontainer
}

#setHP(percent) {
    const width = this.#fullhealth*percent;

    this.#middle.displayWidth = width;
    this.#rightCap.x = this.#middle.x + this.#middle.displayWidth;

}


    /**
     * @param {number} percent
     */


animateHP(percent)
{

    const displayWidth = this.#fullhealth*percent;

    this.#scene.tweens.add({
        targets:this.#middle,
        displayWidth,
        duration: 2000,
        ease:  'Power1',
    });



}
}


     
 
