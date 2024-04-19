const BACKGROUNDS= Object.freeze({
    FIRE: 'fire',
    FOREST: 'forest' ,
    //MOVE_3: 'Bite',
    //MOVE_4: 'Tackle',
});



export class RenderBackground {
    #scene;
    #backgroundImage;

    constructor(scene)
    {
        this.#scene = scene;

        this.#backgroundImage =this.#scene.add.image(this.#scene.scale.width/2,
        (this.#scene.scale.height/1.95 - 75), 
        BACKGROUNDS.FIRE).setAlpha(0);

        this.#backgroundImage =this.#scene.add.image(this.#scene.scale.width/2,
        (this.#scene.scale.height/1.95 - 75), 
        BACKGROUNDS.FOREST).setAlpha(0);

        var music = this.#scene.sound.add('fight1', {loop:true, volume:0.8, rate:0.8});
       // music.play();
    }
 


showFire()
{
    this.#backgroundImage.setTexture(BACKGROUNDS.FIRE).setAlpha(1);
}

//music for battle scene, slowed down and lower volume than raw file. 



showForest()
{
    this.#backgroundImage.setTexture(BACKGROUNDS.FOREST).setAlpha(1);
}



}