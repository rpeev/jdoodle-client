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

function callExecuteAPI({
  endpoint = `${location.origin}${jdoodle.defaultExecutePath}`,
  language,
  versionIndex,
  stdin,
  script
} = {}) {
  return _callAPI(endpoint, {
    language,
    versionIndex,
    stdin,
    script
  });
}

function callCreditSpentAPI({
  endpoint = `${location.origin}${jdoodle.defaultCreditSpentPath}`
} = {}) {
  return _callAPI(endpoint);
}

const execute = opts => callExecuteAPI(opts).
  catch(err => ({error: `${err}`}));

const creditSpent = opts => callCreditSpentAPI(opts).
  catch(err => ({error: `${err}`}));

Object.assign(jdoodle, {
  callExecuteAPI,
  callCreditSpentAPI,
  execute,
  creditSpent
});

export default jdoodle;
