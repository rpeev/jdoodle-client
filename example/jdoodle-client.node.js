#!/usr/bin/env node
'use strict';

const {config} = require('dotenv');
const jdoodle = require('jdoodle-client');

console.log(jdoodle);

(async () => {
  config();

  console.log(await jdoodle.execute());
  console.log(await jdoodle.creditSpent());
})();
