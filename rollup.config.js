import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import {main, module, browser, browserGlobal, browserModule} from './package.json';

const pluginJson = json({
  preferConst: true
});
const pluginCopy = copy({
  targets: [{
    src: 'src/node/template.env',
    dest: 'dist/'
  }]
});

const config = [{
  input: './src/node/bundle.mjs',
  external: ['https'],
  output: {
    file: module,
    format: 'es',
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
  input: './src/node/bundle.cjs.mjs',
  external: ['https'],
  output: {
    file: main,
    exports: 'auto',
    format: 'cjs',
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
  input: './src/browser/bundle.mjs',
  output: {
    file: browserModule,
    format: 'es',
    sourcemap: true
  },
  plugins: [
    pluginJson
  ],
  watch: {
    include: 'src/**'
  }
}, {
  input: './src/browser/bundle.umd.mjs',
  output: {
    file: browser,
    name: browserGlobal,
    format: 'umd',
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
