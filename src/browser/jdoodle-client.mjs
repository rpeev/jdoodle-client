import lib from '../core/jdoodle-client';

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

Object.defineProperty(jdoodle.defaults, 'executeURL', {
  get() { return `${location.origin}${this.executePath}`; }
});

const rawExecute = ({
  url = jdoodle.defaults.executeURL,
  language,
  versionIndex,
  stdin,
  script
} = {}) => _api(url, {
  language,
  versionIndex,
  stdin,
  script
});

const execute = opts => rawExecute(opts).
  catch(err => ({
    error: `${err}`
  }));

Object.defineProperty(jdoodle.defaults, 'creditSpentURL', {
  get() { return `${location.origin}${this.creditSpentPath}`; }
});

const rawCreditSpent = ({
  url = jdoodle.defaults.creditSpentURL
} = {}) => _api(url);

const creditSpent = opts => rawCreditSpent(opts).
  catch(err => ({
    error: `${err}`
  }));

Object.assign(lib, {
  rawExecute,
  execute,
  rawCreditSpent,
  creditSpent
});

export default lib;
