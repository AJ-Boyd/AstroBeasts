//Base class for enemies

import { HPBar } from "./healthbar.js";
import { Move } from "./moves.js";

/** Define Object "Enemy Config"
 * @typedef EnemyConfig
 * @type {Object}
 * @property {Phaser.Scene} scene
 * @property {Enemy} EnemyDetails
 * */


/** Define Object "EnemyDetails"
 * @typedef Enemy
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


 
export class Enemies {

    //identify with underscore as "should be private/protected"

    /** @protected @type {Phaser.Scene} */ 
    _scene;
    /** @public @type {Enemy} */ 
    _EnemyDetails;
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
        this.enemyDetails = config.EnemyDetails;

        this.EnemyGuy = this._scene.add.sprite(position.x, position.y, this.enemyDetails.assets).setScale(3);
        this.EnemyGuy.anims.play(this.enemyDetails.assetAnim)
    }
}