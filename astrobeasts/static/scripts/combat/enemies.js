//Base class for enemies

import { HPBar } from "./healthbar.js";
import { Move } from "./moves.js";

/** Define Object "Enemy Config"
 * @typedef EnemyConfig
 * @type {Object}
 * @property {Phaser.Scene} scene
 * @property {EnemyDetails} EnemyDetails
 * */


/** Define Object "EnemyDetails"
 * @typedef EnemyDetails
 * @type {Object}
 * @property {string} name
 * @property {string} assets
 * @property {string} assetAnim
 * @property {number} maxHP
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


 
export class Enemy {

    //identify with underscore as "should be private/protected"

    /** @protected @type {Phaser.Scene} */ 
    _scene;
    /** @public @type {EnemyDetails} */ 
    _enemyDetails;
     /** @protected @type {Phaser.GameObjects.Image} */ 
    _EnemyGuy;
    /**
     * @type {any}
     */
    _HPBar;

    /**
     * @param {EnemyConfig} config
     * @param {coord} position
     */
    constructor(config, position)
    {
        this._scene = config.scene;
        this._enemyDetails = config.EnemyDetails;

        this._HPBar = new  HPBar(this._scene, 10, 22);

        this.EnemyGuy = this._scene.add.sprite(position.x, position.y, this._enemyDetails.assets).setScale(3);
        this.EnemyGuy.anims.play(this._enemyDetails.assetAnim)
    }


    getAlive(){
        return this._enemyDetails.isAlive;
    }

    setAlive(v)
    {
        this._enemyDetails.isAlive = v;
    }


    getName(){
        return this._enemyDetails.name;
    }

getCurrentHP(){
    return this._enemyDetails.currentHP;
}

getLevel(){
    return this._enemyDetails.level;
}

getMoves(){
    return this._enemyDetails.moves;
}

getStats()
{
    return this._enemyDetails.stats;
}
takeDamage(damage, callback)
{
    console.log("It is", this._enemyDetails.currentHP)
    console.log("you are subtracting", damage)
    var dam = this._enemyDetails.currentHP -= damage;
    if (dam < 0){
        dam =0;
        this._enemyDetails.isAlive = false;
    }
    this._HPBar.animateHP(dam/this._enemyDetails.maxHP, {callback});
   

}

}