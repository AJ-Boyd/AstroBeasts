export class Move {
    constructor(name, desc, base, acc, lvl) {
      /** @protected @type {string} */
      this._name = name;
      /** @protected @type {string} */
      this._description = desc;
      /** @protected @type {number} */
      this._baseAttack = base; //this is a number bewteen 30 and 110
      /**@protacted @type {number} */
      this._accuracy = acc; //this is a number between 50 and 100
      /** @protected @type {number} */
      this._level = lvl;
    }

// getters (don't know if already implemented elsewhere)...
  getName() {
    return this._name;
  }

  getDescription() {
    return this._description;
  }

  getBaseAttack() {
    return this._baseAttack;
  }

  getLevel() {
    return this._level;
  }

  getAccuracy() {
    return this._accuracy;
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