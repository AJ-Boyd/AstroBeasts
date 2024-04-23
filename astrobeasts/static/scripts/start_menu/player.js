/*
class for the Player
*/
import { Aliens } from "../combat/aliens.js";
export class Player{
    constructor(name, party, cred, xp, maxXP, lvl, battlesWon, s){
        /**@public @type {string} */
        this.name = name;
        /**@public @type {Aliens[]} */
        this.party = party;
        /**@public @type {number} */
        this.credits = cred;
        /**@public @type {number} */
        this.currentExp = xp;
        /**@public @type {number} */
        this.maxExp = maxXP;
        /**@public @type {number} */
        this.level = lvl;
        /**@public @type {number} */
        this.battlesWon = battlesWon;
        /**@public @type {number} */
        this.score = s; //a sum of exp earned and credits earned
        this.astrobeasts = party;
    }
}