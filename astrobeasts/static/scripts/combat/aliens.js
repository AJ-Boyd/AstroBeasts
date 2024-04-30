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
 * @property {string} rarity
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

    /**
     * @param {AlienConfig} config
     * @param {coord} position
     */
    constructor(config, position)
    {
        this._scene = config.scene;
        this._alienDetails = config.AlienDetails;

        this.#createHPBar();

        this.AlienGuy = this._scene.add.sprite(position.x, position.y, this._alienDetails.assets).setScale(2);
        this.AlienGuy.anims.play(this._alienDetails.assetAnim)
    }

    //getters
    getAlive(){
        return this._alienDetails.isAlive;
    }
    getAnimation(){
        return this._alienDetails.assetAnim;
    }
    getName(){
        return this._alienDetails.name;
    }
    getRarity(){
        return this._alienDetails.rarity;
    }
    getCurrentHP(){
        return this._alienDetails.currentHP;
    }
    getMaxHP(){
        return this._alienDetails.maxHP;
    }
    getCurrentExp(){
        return this._alienDetails.currentExp;
    }
    getMaxExp(){
        return this._alienDetails.maxExp;
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
    getDetials(){
        return this._alienDetails;
    }

    //key setters
    setCurrentExp(e){
        this._alienDetails.currentExp = e
    }
    setMaxExp(e){
        this._alienDetails.maxExp = e
    }
    setStats(s){
        this._alienDetails.stats = s
    }
    setLevel(l){
        this._alienDetails.level = l;
    }
    setAlive(v)
    {
        this._alienDetails.isAlive = v;
    }
    setAnimation(a){
        this._alienDetails.assetAnim = a;
        this.AlienGuy.anims.play(this._alienDetails.assetAnim)
    }
    takeDamage(damage, callback)
    {
        console.log(this.getName(), "'s current HP:", this._alienDetails.currentHP)
        console.log("you are subtracting", damage)
        var dam = this._alienDetails.currentHP -= damage;
        if (dam < 0){
            dam =0;
            this._alienDetails.isAlive = false;
        }
        this._HPBar.animateHP(dam/this._alienDetails.maxHP, {callback});
        //this.updateHP(dam);

        var up = String(this._alienDetails.currentHP)
        var low = String(this._alienDetails.maxHP)
        var out = up + "/"+low;
        
        
        this.#hpText.setText(out)
        this._HPBar.animateHP(dam/this._alienDetails.maxHP, {callback});
        console.log(this.getName(), "now has", this.getCurrentHP(), " HP") 
        
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
        
        
        
            this._HPContainer = this._scene.add.container(20, 440, 
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
        
        
    gainExp(exp){
        this._alienDetails.currentExp += exp;
        //on level up
        if(this._alienDetails.currentExp >= this._alienDetails.maxExp){
            this._alienDetails.level++;
            if(this._alienDetails.level > 11){
                this._alienDetails.level = 11;
            }else{
                alert(this.getName() + " leveled up!")
                console.log(this.getName(), "leveled up!")
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
        alert(this.getName() + "'s new stats: " + this.getStats());
    }

    //returns a random number between min and max, both inclusinve
    getRand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    
}