'use strict';

const path = require('path');
const LOAD_FILTER = Symbol('DemoEnvironment#loadFilter');

class DemoEnvironment {
  constructor(app) {
    this.app = app;
    this.coreLogger = app.loggers.coreLogger;
    this[LOAD_FILTER]();
  }

  addFilter(key, cb) {
    this.coreLogger.info(`add Filter: ${key}`);
    this[key] = cb;
  }

  //load `app/extend/demo.js`
  [LOAD_FILTER]() {
    for (const unit of this.app.loader.getLoadUnits()) {
      const filterPath = resolveModule(path.join(unit.path, 'app/extend/demo'));
      if (!filterPath) {
        continue;
      }
      const filters = this.app.loader.loadFile(filterPath) || {};
      for (const key of Object.keys(filters)) {
        this.addFilter(key, filters[key]);
      }
    }
  }

}

function resolveModule(filterPath) {
  try {
    return require.resolve(filterPath);
  } catch (e) {
    return undefined;
  }
}

module.exports = DemoEnvironment;