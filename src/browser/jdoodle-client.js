import jdoodle from '../core/base';

const _api = (url, opts = {}) => new Promise((resolve, reject) => {
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

Object.defineProperty(jdoodle.opts, 'executeURL', {
  get() { return `${location.origin}${this.executePath}`; }
});

const rawExecute = ({
  endpoint = jdoodle.opts.executeURL,
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

Object.defineProperty(jdoodle.opts, 'creditSpentURL', {
  get() { return `${location.origin}${this.creditSpentPath}`; }
});

const rawCreditSpent = ({
  endpoint = jdoodle.opts.creditSpentURL
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
