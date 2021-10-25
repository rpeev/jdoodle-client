import {browserGlobal, version} from '../../package.json';

const defaults = {
  executeEndpoint: 'https://api.jdoodle.com/v1/execute',
  executePath: '/jdoodle/api/execute',
  language: 'ruby',
  versionIndex: 0,
  stdin: '',
  script: 'puts "(ruby #{RUBY_VERSION}) Hi"',
  creditSpentEndpoint: 'https://api.jdoodle.com/v1/credit-spent',
  creditSpentPath: '/jdoodle/api/creditSpent'
};

const jdoodle = {
  get [Symbol.toStringTag]() { return browserGlobal; },
  version: version,
  defaults
};

export default jdoodle;
