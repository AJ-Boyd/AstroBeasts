// /** Define Object "MoveDetails"
//  * @typedef MoveDetails
//  * @type {Object}
//  * @property {string} name
//  * @property {string} description
//  * @property {number} baseAttack
//  * @property {number} level // maybe not needed?
//  * @property {boolean} isSplash
//  * */

export class Move {
    // /**
    //  * @param {MoveDetails} details 
    //  */
    constructor(name, desc, base, lvl, splash) {
      /** @protected @type {string} */
      this._name = name;
      /** @protected @type {string} */
      this._description = desc;
      /** @protected @type {number} */
      this._baseAttack = base;
      /** @protected @type {number} */
      this._level = lvl;
      /** @protected @type {boolean} */
      this._isSplash = splash;
    }

// getters (don't know if already implemented elsewhere)
  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get baseAttack() {
    return this._baseAttack;
  }

  get level() {
    return this._level;
  }

  get isSplash() {
    return this._isSplash;
  }

// setters (don't know if already implemented elsewhere)
  set name(newName) {
    this._name = newName;
  }

  set description(newDescription) {
    this._description = newDescription;
  }

  set baseAttack(newBaseAttack) {
    this._baseAttack = newBaseAttack;
  }

  set level(newLevel) {
    this._level = newLevel;
  }

  set isSplash(newIsSplash) {
    this._isSplash = newIsSplash;
  }

  }