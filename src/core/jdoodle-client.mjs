import {browserGlobal, version} from '../../package.json';

const jdoodle = {
  get [Symbol.toStringTag]() { return browserGlobal; },
  version: version,
  defaults: {
    executeEndpoint: 'https://api.jdoodle.com/v1/execute',
    executePath: '/jdoodleExecute',
    language: 'ruby',
    versionIndex: 0,
    stdin: '',
    script: 'puts "(ruby #{RUBY_VERSION}) Hi"',
    creditSpentEndpoint: 'https://api.jdoodle.com/v1/credit-spent',
    creditSpentPath: '/jdoodleCreditSpent'
  }
};

export default jdoodle;
