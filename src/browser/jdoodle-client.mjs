import lib from '../core/index';

const _api = (url, kwargs = {}) => new Promise((resolve, reject) => {
  const json = JSON.stringify(kwargs);
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

Object.defineProperty(lib.defaults, 'executeURL', {
  get() { return `${location.origin}${this.executePath}`; }
});

const rawExecute = ({
  url = lib.defaults.executeURL,
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

const execute = kwargs => rawExecute(kwargs).
  catch(err => ({
    error: `${err}`
  }));

Object.defineProperty(lib.defaults, 'creditSpentURL', {
  get() { return `${location.origin}${this.creditSpentPath}`; }
});

const rawCreditSpent = ({
  url = lib.defaults.creditSpentURL
} = {}) => _api(url);

const creditSpent = kwargs => rawCreditSpent(kwargs).
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
