
export class healthBar {
    #scene;
   #healthbarcontainer;
   #fullhealth;
   #scaleY;
   #middle;
   #leftCap;
   #rightCap;

    constructor(scene,x,y)
    {
        this.#scene = scene;
        this.#fullhealth = 150;
        this.#scaleY = 0.7;
        this.#healthbarcontainer = this.#scene.add.container(x,y, [])
        this.#HPBarImage(x,y)
        this.#setHP(0.1);
    }




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

        this.#healthbarcontainer.add([this.#leftCap, this.#middle, this.#rightCap ]); 

}

get container() {
    return this.#healthbarcontainer
}

#setHP(percent = 1) {
    const width = this.#fullhealth*percent;

    this.#middle.displayWidth = width;
    this.#rightCap.x = this.#middle.x + this.#middle.displayWidth;

}


animateHP(percent, input)
{

    const width = this.#fullhealth*percent;

    this.#scene.tweens.add({
        targets:this.#middle,
        displayWidth: width,
        duration: 1000,
        ease:  Phaser.Math.Easing.Sine.Out,
        onUpdate: () => {
            this.#rightCap.x = this.#middle.x + this.#middle.displayWidth;
            const isVisible = this.#middle.displayWidth >0;
            this.#leftCap = isVisible;
            this.#middle = isVisible;
            this.#rightCap = isVisible;
        },
        onComplete: options?.callback,
    });



}
}


     
 
