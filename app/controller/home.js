'use strict';

const { Controller } = require('egg');

class HomeController extends Controller {
  async isIOS() {
    this.ctx.body = `isIOS: ${this.ctx.isIOS}`
  }

  async info() {
    this.ctx.body = `info from: ${this.app.demo.info} with ${this.app.bar}`
  }
}

module.exports = HomeController;
