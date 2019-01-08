# JDoodle API Client

JavaScript [JDoodle API](https://www.jdoodle.com/compiler-api/docs) client

## Distribution

### Unpkg - [https://unpkg.com/jdoodle-client@latest/dist/](https://unpkg.com/jdoodle-client@latest/dist/)

- Example .env file for configuring node side endpoints and credentials - [https://unpkg.com/jdoodle-client@latest/dist/template.env](https://unpkg.com/jdoodle-client@latest/dist/template.env)
- Node module (CJS) - [https://unpkg.com/jdoodle-client@latest/dist/jdoodle-client.node.js](https://unpkg.com/jdoodle-client@latest/dist/jdoodle-client.node.js)
- Browser bundle (UMD) - [https://unpkg.com/jdoodle-client@latest/dist/jdoodle-client.browser.js](https://unpkg.com/jdoodle-client@latest/dist/jdoodle-client.browser.js)
- Node ES module - [https://unpkg.com/jdoodle-client@latest/dist/jdoodle-client.node.mjs](https://unpkg.com/jdoodle-client@latest/dist/jdoodle-client.node.mjs)
- Bundlers/browsers ES module - [https://unpkg.com/jdoodle-client@latest/dist/jdoodle-client.browser.mjs](https://unpkg.com/jdoodle-client@latest/dist/jdoodle-client.browser.mjs)

## Install

### Node

```bash
npm install jdoodle-client
```

All distribution files are in `node_modules/jdoodle-client/dist/`

### Browser

```html
<script src="https://unpkg.com/jdoodle-client@latest/dist/jdoodle-client.browser.js"></script>
```

## Use

### Node

```javascript
const jdoodle = require('jdoodle-client');

// Load JDOODLE_XXX process.env values for configuring endpoints and
// credentials from .env file. This prevents putting personal key info
// into version control. Example template.env is available in the dist folder
require('dotenv').load();

// Use the jdoodle object, example server code (using Koa) might look like that:
httpRouter.post(jdoodle.defaultExecutePath, async ctx => {
  ctx.body = await jdoodle.execute(ctx.request.body);
});

httpRouter.post(jdoodle.defaultCreditSpentPath, async ctx => {
  ctx.body = await jdoodle.creditSpent();
});
```

### Browser

```javascript
// Use the jdoodle (window.jdoodle) object, example browser code might look like that:
(() => { 'use strict';
  const elem = id => document.getElementById(id);
  const on = (t, e, h) => t.addEventListener(e, h);
  const ready = h => on(document, 'DOMContentLoaded', h);

  ready(() => {
    on(elem('execute'), 'click', async () => {
      // Gather language, versionIndex, stdin, script from UI elements

      let json = await jdoodle.execute({
        language,
        versionIndex: Number(versionIndex) || 0,
        stdin,
        script
      });

      // Use returned json
    });

    on(elem('creditSpent'), 'click', async () => {
      let json = await jdoodle.creditSpent();

      // Use returned json
    });
  });
})();
```

### ES module

```javascript
// Node
import jdoodle from 'jdoodle-client/dist/jdoodle-client.node';

// Bundlers
import jdoodle from 'jdoodle-client';

// Use the imports
```

## API

The following properties/functions are available through the **jdoodle** namespace object returned from `require('jdoodle-client')` on node or available as `window.jdoodle` in the browser (the ES module has the namespace object as default export):

- `version` - library version
- `execute([opts])` - execute code, the opts are:
    - `endpoint` - node: JDoodle API endpoint, browser: your server endpoint
    - `clientId` - (node only) JDoodle clientId, set via .env
    - `clientSecret` - (node only) JDoodle clientSecret, set via .env
    - `language` - language code
    - `versionIndex` - language version code ([details about language and versionIndex codes](https://www.jdoodle.com/compiler-api/docs))
    - `stdin` - standard input
    - `script` - program source
- `creditSpent([opts])` - check spent credit, the opts are:
    - `endpoint` - node: JDoodle API endpoint, browser: your server endpoint
    - `clientId` - (node only) JDoodle clientId, set via .env
    - `clientSecret` - (node only) JDoodle clientSecret, set via .env

    All opts have defaults so just calling the functions is a quick test if things are properly set up, the return value is a promise resolving to JSON even in the presence of errors (containing limited information about the error), for more control use the `callExecuteAPI` and `callCreditSpentAPI` variants with appropriate error handling either via promise then-catch chain or try-catch block with async/await

See [the example repo](https://github.com/rpeev/jdoodle-client-example) for complete code example (the relevant code is in `app.js`, `layout.pug` and `index.pug`)
