'use strict';

const DEMO = Symbol('app#demo');
const engine = require('../../lib/engine');

module.exports = {

  get demo() {
    if (!this[DEMO]) {
      this[DEMO] = engine(this);
    }
    return this[DEMO];
  }
};