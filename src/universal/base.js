import pkg from '../../package.json';

const jdoodle = {
  get [Symbol.toStringTag]() {
    return pkg.browserGlobal;
  },
  version: pkg.version,
  defaultExecutePath: '/jdoodleExecute',
  defaultCreditSpentPath: '/jdoodleCreditSpent'
};

export default jdoodle;
