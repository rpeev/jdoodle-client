import {request} from 'https';
import jdoodle from '../core/base';

const _api = (url, opts = {}) => new Promise((resolve, reject) => {
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

const rawExecute = ({
  url = process.env.JDOODLE_EXECUTE_ENDPOINT || jdoodle.opts.executeEndpoint,
  clientId = process.env.JDOODLE_CLIENT_ID,
  clientSecret = process.env.JDOODLE_CLIENT_SECRET,
  language = jdoodle.opts.language,
  versionIndex = jdoodle.opts.versionIndex,
  stdin = jdoodle.opts.stdin,
  script = jdoodle.opts.script
} = {}) => _api(url, {
  clientId,
  clientSecret,
  language,
  versionIndex,
  stdin,
  script
});

const execute = opts => rawExecute(opts).
  catch(err => ({
    error: `${err}`,
    statusCode: 500
  }));

const rawCreditSpent = ({
  url = process.env.JDOODLE_CREDIT_SPENT_ENDPOINT || jdoodle.opts.creditSpentEndpoint,
  clientId = process.env.JDOODLE_CLIENT_ID,
  clientSecret = process.env.JDOODLE_CLIENT_SECRET
} = {}) => _api(url, {
  clientId,
  clientSecret
});

const creditSpent = opts => rawCreditSpent(opts).
  catch(err => ({
    error: `${err}`,
    statusCode: 500
  }));

Object.assign(jdoodle, {
  rawExecute,
  execute,
  rawCreditSpent,
  creditSpent
});

export default jdoodle;
