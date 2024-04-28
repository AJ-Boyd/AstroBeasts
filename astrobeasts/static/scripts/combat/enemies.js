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

        this.#createHPBar();

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

getMaxHP(){
    return this._enemyDetails.maxHP;
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
getATK(){
    return this._enemyDetails.stats[0];
}
getDEF(){
    return this._enemyDetails.stats[1];
}
getSPD(){
    return this._enemyDetails.stats[2];
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


#createHPBar()
{
    this._HPBar = new HPBar(this._scene, 10, 22);

    const enemyAlienName = this._scene.add.text(40,0, this._enemyDetails.name, 
    {
        color: '#31b1e0',
        fontSize: '28px',
        fontStyle: 'bold italic',
    }
    );


const hpImg = this._scene.add.image(0, 0,"healthback").setOrigin(0)


this._HPContainer = this._scene.add.container(550, 440, [

    hpImg,
    enemyAlienName,
    this._HPBar.container,
   
   
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
}