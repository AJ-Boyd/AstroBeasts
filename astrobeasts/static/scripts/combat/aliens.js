//Base class for alienz!!
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
 * @property {number} maxHp
 * @property {number} currentHP
 * @property {number[]} stats //[ATK, DEF, SPD]
 * @property {Move[]} moves // moves
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

    /**
     * @param {AlienConfig} config
     * @param {coord} position
     */
    constructor(config, position)
    {
        this._scene = config.scene;
        this._alienDetails = config.AlienDetails;

        this._HPBar = new  HPBar(this._scene, 10, 22);

        this.AlienGuy = this._scene.add.sprite(position.x, position.y, this._alienDetails.assets).setScale(2);
        this.AlienGuy.anims.play(this._alienDetails.assetAnim)
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
    this._HPBar.animateHP(dam/this._alienDetails.maxHp, {callback});
    //this.updateHP(dam);

}

// updateHP(dam)
//     {
//         console.log("WHat is it:" , this._alienDetails.currentHP)

//     }

}
