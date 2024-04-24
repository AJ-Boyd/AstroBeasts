export class Move {
    constructor(name, desc, base, acc, lvl) {
      /** @protected @type {string} */
      this._name = name;
      /** @protected @type {string} */
      this._description = desc;
      /** @protected @type {number} */
      this._baseAttack = base;
      /**@protacted @type {number} */
      this._accuracy = acc;
      /** @protected @type {number} */
      this._level = lvl;
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

  get accuracy() {
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