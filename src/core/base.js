import pkg from '../../package.json';

const jdoodle = {
  get [Symbol.toStringTag]() { return pkg.browserGlobal; },
  version: pkg.version,
  opts: {
    executeEndpoint: 'https://api.jdoodle.com/v1/execute',
    executePath: '/jdoodleExecute',
    language: 'ruby',
    versionIndex: 3,
    stdin: 'Hi',
    script: 'puts "ruby #{RUBY_VERSION}: #{ARGF.read}"',
    creditSpentEndpoint: 'https://api.jdoodle.com/v1/credit-spent',
    creditSpentPath: '/jdoodleCreditSpent'
  }
};

export default jdoodle;
