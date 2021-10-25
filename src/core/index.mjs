import {browserGlobal as name, version} from '../../package.json';

const tag = `${name}@${version}`;

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

const lib = {
  name,
  version,
  get [Symbol.toStringTag]() { return tag; },
  defaults
};

export default lib;
