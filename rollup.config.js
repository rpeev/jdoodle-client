import copy from 'rollup-plugin-copy';
import json from 'rollup-plugin-json';

import pkg from './package.json';

const pluginCopy = copy({
  'src/node/template.env': 'dist/template.env'
});
const pluginJson = json({
  preferConst: true
});

const config = [{
  external: ['https'],
  input: './src/index.node.js',
  output: {
    format: 'cjs',
    file: pkg.main,
    sourcemap: true
  },
  plugins: [
    pluginCopy,
    pluginJson
  ],
  watch: {
    include: 'src/**'
  }
}, {
  input: './src/index.browser.js',
  output: {
    format: 'umd',
    file: pkg.browser,
    name: pkg.name,
    sourcemap: true
  },
  plugins: [
    pluginJson
  ],
  watch: {
    include: 'src/**'
  }
}, {
  external: ['https'],
  input: './src/index.node.mjs',
  output: {
    format: 'es',
    file: pkg.main_module,
    sourcemap: true
  },
  plugins: [
    pluginCopy,
    pluginJson
  ],
  watch: {
    include: 'src/**'
  }
}, {
  input: './src/index.browser.mjs',
  output: {
    format: 'es',
    file: pkg.module,
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
