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
        this.updateScore();
    }
    updateExpGained(xp){
        this.expGained += xp;
        this.updateScore();
    }
    updateCredits(c){
        this.credits += c
        if(this.credits < 0){
            this.credits = 0;
        }
        this.updateCreditsGained(c)
    }
    setCredits(c){
        this.credits = c;
        this.updateScore();
    }
    incrementLevel(){
        this.level++;
    }
    incrementBattle(){
        this.battlesWon++;
    }
    
    //accessors--just the ones we need
    getName(){
        return this.name;
    }
    getScore(){
        return this.score;
    }
    updateScore() {
        this.score = this.expGained + this.creditsGained;
    }
    getFinalScore() {
        return this.score;
    }
    getCreditsEarned(){
        return this.creditsGained;
    }
    getExpGained(){
        return this.expGained;
    }
    getLevel(){
        return this.level
    }
    getCredits(){
        return this.credits;
    }
    setScore(s) {
        this.score = s;
    }
    setLevel(lvl) {
       this.level = lvl;
    }
    
}