//Base class for enemies

import { HPBar } from "healthbar.js";

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
 * @property {number} maxHp
 * @property {number} currentHp
 * @property {string[]} stats
 * @property {string[]} attackOptions // moves
 * @property {number} level
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
    /** @protected @type {EnemyDetails} */ 
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

        this.EnemyGuy = this._scene.add.sprite(position.x, position.y, this._enemyDetails.assets).setScale(3);
        this.EnemyGuy.anims.play(this._enemyDetails.assetAnim)
    }
}
