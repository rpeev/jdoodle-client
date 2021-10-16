import pkg from '../../package.json';

const jdoodle = {
  get [Symbol.toStringTag]() {
    return pkg.browserGlobal;
  },
  version: pkg.version,
  opts: {
    executePath: '/jdoodleExecute',
    creditSpentPath: '/jdoodleCreditSpent'
  }
};

export default jdoodle;
