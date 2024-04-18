//Base class for alienz!
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
 * @property {number[]} stats //ATK, DEF, DEX, SPD, LUK
 * @property {Move[]} moves
 * @property {boolean} isAlive
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
    /** @public @type {Alien} */ 
    alienDetails;
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
        this.alienDetails = config.AlienDetails;
        
        console.log(this._scene)
        console.log(this.alienDetails.assets)

        this.AlienGuy = this._scene.add.sprite(position.x, position.y, this.alienDetails.assets).setScale(3);
        this.AlienGuy.anims.play(this.alienDetails.assetAnim)
    }
}
//create enemy alien and idle

   

//create our alien and idle

// this.player = this.add.sprite(200, 310, 'Strikoh').setScale(4);
// this.player.anims.play("idle_Strikoh", true)
