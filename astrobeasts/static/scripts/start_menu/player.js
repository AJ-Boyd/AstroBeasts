/*
class for the Player
*/
import { Aliens } from "../combat/aliens.js";
export class Player{
    constructor(name, party, cred, xp, lvl, battlesWon, s){
        /**@public @type {string} */
        this.name = name;
        /**@public @type {Aliens[]} */
        this.party = party;
        /**@public @type {number} */
        this.credits = cred;
        /**@public @type {number} */
        this.expGained = xp;
        /**@public @type {number} */
        this.level = lvl;
        /**@public @type {number} */
        this.battlesWon = battlesWon;
        /**@public @type {number} */
        this.score = s; //a sum of exp earned and credits earned
        this.astrobeasts = party;
        this.creditsGained = 0;
    }

    //mutators--just the ones we need
    setName(name){
        this.name = name;
    }
    updateCreditsGained(c){
        this.creditsGained += c;
    }
    updateExpGained(xp){
        this.expGained += xp;
    }
    updateCredits(c){
        this.credits += c
        this.updateCreditsGained(c)
    }
    incrementLevel(){
        this.level++;
    }
    incrementBattle(){
        this.battlesWon++;
    }
    getScore(){
        return this.getExpGained() + this.getCreditsEarned();
    }

    //accessors--just the ones we need
    getCreditsEarned(){
        return this.creditsGained;
    }
    getExpGained(){
        return this.expGained;
    }
    getLevel(){
        return this.level
    }
}