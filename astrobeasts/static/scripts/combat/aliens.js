//Base class for alienz!

/**
 * @typedef AlienConfig
 * @type {Object}
 * @property {Phaser.Scene} scene
 * @property {Alien} AlienDetails
 * */


/**
 * @typedef Alien
 * @type {Object}
 * @property {string} name
 * @property {string} assets
 * @property {string} assetAnim
 * @property {number} maxHp
 * @property {number} currentHp
 * @property {number} baseAttack
 * @property {string[]} attackOptions
 * 
 * */

/**
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
     /** @protected @type {healthBar} */ 
    _healthBar

    /**
     * @param {AlienConfig} config
     * @param {coord} position
     */
    constructor(config, position)
    {
        this._scene = config.scene;
        this._alienDetails = config.AlienDetails;

        this._healthBar = new this._scene,34,34)

        this.AlienGuy = this._scene.add.sprite(position.x, position.y, this._alienDetails.assets).setScale(3);
        this.AlienGuy.anims.play(this._alienDetails.assetAnim)
    }
}
//create enemy alien and idle

   

//create our alien and idle

    this.player = this.add.sprite(200, 310, 'Strikoh').setScale(4);
    this.player.anims.play("idle_Strikoh", true)
