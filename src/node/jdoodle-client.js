import {request} from 'https';
import jdoodle from '../universal/base';

const _api = (url, opts) => {
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(opts);
    const req = request(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': json.length
      }
    }, res => {
      const buf = [];
      res.
        on('data', data => buf.push(String(data))).
        on('end', () => {
          // Wrap in a try-catch because JSON.parse might throw and
          // we're in an unprotected callback after the promise is created
          try { resolve(JSON.parse(buf.join(''))); }
          catch (err) { reject(err); }
        }).
        on('error', err => reject(err));
    }).on('error', err => reject(err));
    req.write(json);
    req.end();
  });
};

const rawExecute = ({
  endpoint = process.env.JDOODLE_ENDPOINT_EXECUTE || jdoodle.opts.executeEndpoint,
  clientId = process.env.JDOODLE_CLIENT_ID,
  clientSecret = process.env.JDOODLE_CLIENT_SECRET,
  language = jdoodle.opts.language,
  versionIndex = jdoodle.opts.versionIndex,
  stdin = jdoodle.opts.stdin,
  script = jdoodle.opts.script
} = {}) {
  return _api(endpoint, {
    clientId,
    clientSecret,
    language,
    versionIndex,
    stdin,
    script
  });
};

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
