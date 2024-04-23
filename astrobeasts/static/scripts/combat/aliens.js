//Base class for aliens
import { HPBar } from "./healthbar.js";
import { Move } from "./moves.js";

/** Define Object "Alien Config"
 * @typedef AlienConfig
 * @type {Object}
 * @property {Phaser.Scene} scene
 * @property {Alien} AlienDetails
 * */


/** Define Object "Alien"
 * @typedef Alien
 * @type {Object}
 * @property {string} name
 * @property {string} assets
 * @property {string} assetAnim
 * @property {number} maxHP
 * @property {number} currentHP
 * @property {number[]} stats //[ATK, DEF, SPD, LUK]
 * @property {string[]} moves // moves
 * @property {number} level
 * @property {boolean} isAlive
 * 
 * */

/**Define Object "coord" which is the coordinates of the alien 
 * @typedef coord
 * @type {Object}
 * @property {number} x
 * @property {number} y
 * */


 
export class Aliens {

 #hpText

    //identify with underscore as "should be private/protected"

    /** @protected @type {Phaser.Scene} */ 
    _scene;
    /** @protected @type {Alien} */ 
    _alienDetails;
     /** @protected @type {Phaser.GameObjects.Image} */ 
    _AlienGuy;
    /**
     * @type {any}
     */
    _HPBar;
    _HPContainer;

    /**
     * @param {AlienConfig} config
     * @param {coord} position
     */
    constructor(config, position)
    {
        this._scene = config.scene;
        this._alienDetails = config.AlienDetails;

        
        this.AlienGuy = this._scene.add.sprite(position.x, position.y, this._alienDetails.assets).setScale(2);
        this.AlienGuy.anims.play(this._alienDetails.assetAnim)

        this.#createHPBar();

       
        
    }


    getAlive(){
        return this._alienDetails.isAlive;
    }

    setAlive(v)
    {
        this._alienDetails.isAlive = v;
    }


    getName(){
        return this._alienDetails.name;
    }

getCurrentHP(){
    return this._alienDetails.currentHP;
}

getLevel(){
    return this._alienDetails.level;
}

getMoves(){
    return this._alienDetails.moves;
}

getStats()
{
    return this._alienDetails.stats;
}
takeDamage(damage, callback)
{
    console.log("It is", this._alienDetails.currentHP)
    console.log("you are subtracting", damage)
    var dam = this._alienDetails.currentHP -= damage;
    if (dam < 0){
        dam =0;
        this._alienDetails.isAlive = false;
    }

    var up = String(this._alienDetails.currentHP)
var low = String(this._alienDetails.maxHP)
var out = up + "/"+low;


    this.#hpText.setText(out)
    this._HPBar.animateHP(dam/this._alienDetails.maxHP, {callback});
   

}


#createHPBar()
{
this._HPBar = new HPBar(this._scene, 10, 22);

var up = String(this._alienDetails.currentHP)
var low = String(this._alienDetails.maxHP)
var out = up + "/"+low;

const playerAlienName = this._scene.add.text(5,0, this._alienDetails.name,
        {
            color: '#045eda',
            fontSize: '28px',
            fontStyle: 'bold italic',
        }
);

const hpImg = this._scene.add.image(0, 0,"healthback").setOrigin(0)

this.#hpText = this._scene.add.text (140, 5, out ,
    
    {
        color:'red',
        fontSize: '18px',
        fontStyle: 'Bold',
    }
    );



    this._HPContainer = this._scene.add.container(550, 440, 
    [
        hpImg,
        playerAlienName,
        this._HPBar.container,
        this.#hpText,
    ]                        
    ).setAlpha(0);




}

NameandHPon()
{

    this._HPContainer.setAlpha(1);
}
NameandHPoff()
{

    this._HPContainer.setAlpha(0);
}

//[ATK, DEF, SPD, LUK]


setATK(increment)
{
var st = []
st = this._alienDetails.stats

this._alienDetails.stats[0] = st+increment


}

setDEF(increment){
    var st = []
    st = this._alienDetails.stats
    
    this._alienDetails.stats[1] = st+increment


}

setSPD(increment)
{

    var st = []
    st = this._alienDetails.stats

    this._alienDetails.stats[2] = st+increment
}

setLUK(increment)
{

    var st = []
    st = this._alienDetails.stats
    this._alienDetails.stats[2] = st+increment

}


}