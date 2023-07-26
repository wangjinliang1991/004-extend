'use strict'

const BAR = Symbol('Application#bar')

module.exports = {
  // 单例
  get bar() {
    if (!this[BAR]) {
      this[BAR] = Math.random()
    }
    return this[BAR];
  }
}