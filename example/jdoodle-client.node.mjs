#!/usr/bin/env node

import {config} from 'dotenv';
import jdoodle from 'jdoodle-client';

console.log(jdoodle);

config();

console.log(await jdoodle.execute());
console.log(await jdoodle.creditSpent());
