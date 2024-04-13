/*
class for the Player
*/
import { Aliens } from "../combat/aliens";
export class Player{
    constructor(name, party, cred, xp, maxXP, lvl){
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
        this.battlesWon = 0
    }
}