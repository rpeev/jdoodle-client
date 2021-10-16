import jdoodle from '../core/base';

const _api = (url, opts) => new Promise((resolve, reject) => {
  const json = JSON.stringify(opts);
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': json.length
    },
    body: json
  }).
    then(res => {
      if (res.ok) {
        res.json().
          then(json => resolve(json)).
          catch(err => reject(err));
      } else {
        reject(new Error(
          `HTTP Error: ${res.status} (${res.statusText}) ${res.url}`
        ));
      }
    }).
    catch(err => reject(new Error(
      `Network Error (cross-domain request?) (${err}) ${url}`
    )));
});

const rawExecute = ({
  endpoint = location.origin + jdoodle.opts.executePath,
  language,
  versionIndex,
  stdin,
  script
} = {}) => _api(endpoint, {
  language,
  versionIndex,
  stdin,
  script
});

const execute = opts => rawExecute(opts).
  catch(err => ({
    error: `${err}`
  }));

const rawCreditSpent = ({
  endpoint = location.origin + jdoodle.opts.creditSpentPath
} = {}) => _api(endpoint);

const creditSpent = opts => rawCreditSpent(opts).
  catch(err => ({
    error: `${err}`
  }));

Object.assign(jdoodle, {
  rawExecute,
  execute,
  rawCreditSpent,
  creditSpent
});

export default jdoodle;
