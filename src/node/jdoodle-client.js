import {request} from 'https';
import jdoodle from '../universal/base';

function _callAPI(url, opts) {
  return new Promise((resolve, reject) => {
    const content = JSON.stringify(opts);
    const req = request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': content.length
      }
    }, res => {
      const received = [];
      res.
        on('data', data => received.push(String(data))).
        on('end', () => {
          // Wrap in a try-catch because JSON.parse might throw and
          // we're in an unprotected callback after the promise is created
          try { resolve(JSON.parse(received.join(''))); }
          catch (err) { reject(err); }
        }).
        on('error', err => reject(err));
    }).on('error', err => reject(err));
    req.write(content);
    req.end();
  });
}

function callExecuteAPI({
  endpoint = process.env.JDOODLE_ENDPOINT_EXECUTE ||
    'https://api.jdoodle.com/v1/execute',
  clientId = process.env.JDOODLE_CLIENT_ID,
  clientSecret = process.env.JDOODLE_CLIENT_SECRET,
  language = 'ruby',
  versionIndex = 2,
  stdin = 'Hi',
  script = 'puts "ruby \#{RUBY_VERSION}: \#{ARGF.read}"'
} = {}) {
  return _callAPI(endpoint, {
    clientId,
    clientSecret,
    language,
    versionIndex,
    stdin,
    script
  });
}

function callCreditSpentAPI({
  endpoint = process.env.JDOODLE_ENDPOINT_CREDIT_SPENT ||
    'https://api.jdoodle.com/v1/credit-spent',
  clientId = process.env.JDOODLE_CLIENT_ID,
  clientSecret = process.env.JDOODLE_CLIENT_SECRET
} = {}) {
  return _callAPI(endpoint, {
    clientId,
    clientSecret
  });
}

const execute = opts => callExecuteAPI(opts).
  catch(err => ({error: `${err}`, statusCode: 500}));

const creditSpent = opts => callCreditSpentAPI(opts).
  catch(err => ({error: `${err}`, statusCode: 500}));

Object.assign(jdoodle, {
  callExecuteAPI,
  callCreditSpentAPI,
  execute,
  creditSpent
});

export default jdoodle;
