import {
  name as LIB_NAME,
  version as LIB_VERSION
} from '../../package.json';

const jdoodle = {
  get [Symbol.toStringTag]() {
    return LIB_NAME;
  },
  version: LIB_VERSION,
  defaultExecutePath: '/jdoodleExecute',
  defaultCreditSpentPath: '/jdoodleCreditSpent'
};

export default jdoodle;
