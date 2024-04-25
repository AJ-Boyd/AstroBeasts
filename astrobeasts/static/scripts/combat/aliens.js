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
 * @property {number} maxHP
 * @property {number} currentHP
 * @property {number} maxExp
 * @property {number} currentExp
 * @property {number[]} stats //[ATK, DEF, SPD, DEX, LUK]
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
    getATK(){
        return this._alienDetails.stats[0];
    }
    getDEF(){
        return this._alienDetails.stats[1];
    }
    getSPD(){
        return this._alienDetails.stats[2];
    }
    getDEX(){
        return this._alienDetails.stats[3];
    }
    getLUK(){
        return this._alienDetails.stats[4];
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
        this._HPBar.animateHP(dam/this._alienDetails.maxHP, {callback});
        //this.updateHP(dam);

    }
    gainExp(exp){
        this._alienDetails.currentExp += exp;
        //on level up
        if(this._alienDetails.currentExp >= this._alienDetails.maxExp){
            this._alienDetails.level++;
            if(this._alienDetails.level > 11){
                this._alienDetails.level = 11;
            }else{
                console.log(this.getName() + " leveled up!")
                this.levelUp(); //only level up if they haven't reached max
                this._alienDetails.currentExp -= this._alienDetails.maxExp; //get remainder of exp points
                this._alienDetails.maxExp *= 2.1 //update max exp
                console.log(this.getName() + " new exp: " + this._alienDetails.currentExp + "/" + this._alienDetails.maxExp)
            }
        }
    }
    levelUp(){
        //increases each stat by 80-130
        for(var i = 0; i < this.getStats().length; i++){
            var x = this.getRand(80, 130); 
            this.getStats()[i] += x;
            console.log(this.getName() + " earned " + x + " stat points!")
            //if stats go over max bound, reset at max bound
            if(this.getStats()[i] > 2500){
                this.getStats()[i] = 2500;
            }
        }
    }

    //returns a random number between min and max, both inclusinve
    getRand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}