//Base class for enemies

import { HPBar } from "./healthbar.js";
import { Move } from "./moves.js";

/** Define Object "Enemy Config"
 * @typedef EnemyConfig
 * @type {Object}
 * @property {Phaser.Scene} scene
 * @property {EnemyDetails} enemyDetails
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
    enemyDetails;
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
        this.enemyDetails = config.enemyDetails;

        //this.EnemyGuy = this._scene.add.sprite(position.x, position.y, this._enemyDetails.assets).setScale(3);
        //this.EnemyGuy.anims.play(this._enemyDetails.assetAnim)
    }
}
