import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

const pluginJson = json({
  preferConst: true
});
const pluginCopy = copy({
  'src/node/template.env': 'dist/template.env'
});

const config = [{
  external: ['https'],
  input: './src/index.node.js',
  output: {
    exports: 'auto',
    format: 'cjs',
    file: pkg.main,
    sourcemap: true
  },
  plugins: [
    pluginJson,
    pluginCopy
  ],
  watch: {
    include: 'src/**'
  }
}, {
  external: ['https'],
  input: './src/index.node.mjs',
  output: {
    format: 'es',
    file: pkg.module,
    sourcemap: true
  },
  plugins: [
    pluginJson,
    pluginCopy
  ],
  watch: {
    include: 'src/**'
  }
}, {
  input: './src/index.browser.js',
  output: {
    format: 'umd',
    file: pkg.browser,
    name: pkg.browserGlobal,
    sourcemap: true
  },
  plugins: [
    pluginJson
  ],
  watch: {
    include: 'src/**'
  }
}, {
  input: './src/index.browser.mjs',
  output: {
    format: 'es',
    file: pkg.browserModule,
    sourcemap: true
  },
  plugins: [
    pluginJson
  ],
  watch: {
    include: 'src/**'
  }
}];

export default config;
