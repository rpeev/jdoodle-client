import {request} from 'https';
import lib from '../core/jdoodle-client';

const _api = (url, kwargs = {}) => new Promise((resolve, reject) => {
  const json = JSON.stringify(kwargs);
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

const rawExecute = ({
  url = process.env.JDOODLE_EXECUTE_ENDPOINT || jdoodle.defaults.executeEndpoint,
  clientId = process.env.JDOODLE_CLIENT_ID,
  clientSecret = process.env.JDOODLE_CLIENT_SECRET,
  language = jdoodle.defaults.language,
  versionIndex = jdoodle.defaults.versionIndex,
  stdin = jdoodle.defaults.stdin,
  script = jdoodle.defaults.script
} = {}) => _api(url, {
  clientId,
  clientSecret,
  language,
  versionIndex,
  stdin,
  script
});

const execute = kwargs => rawExecute(kwargs).
  catch(err => ({
    error: `${err}`,
    statusCode: 500
  }));

const rawCreditSpent = ({
  url = process.env.JDOODLE_CREDIT_SPENT_ENDPOINT || jdoodle.defaults.creditSpentEndpoint,
  clientId = process.env.JDOODLE_CLIENT_ID,
  clientSecret = process.env.JDOODLE_CLIENT_SECRET
} = {}) => _api(url, {
  clientId,
  clientSecret
});

const creditSpent = kwargs => rawCreditSpent(kwargs).
  catch(err => ({
    error: `${err}`,
    statusCode: 500
  }));

Object.assign(lib, {
  rawExecute,
  execute,
  rawCreditSpent,
  creditSpent
});

export default lib;
