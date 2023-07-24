'use strict';

const Environment = require('./environment');

module.exports = app => {
  return new Environment(app);
};