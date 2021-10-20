import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy';
import pkg from './package.json';

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
  input: './src/index.node.js',
  external: ['https'],
  output: {
    file: pkg.main,
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
  input: './src/index.node.mjs',
  external: ['https'],
  output: {
    file: pkg.module,
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
  input: './src/index.browser.js',
  output: {
    file: pkg.browser,
    name: pkg.browserGlobal,
    format: 'umd',
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
    file: pkg.browserModule,
    format: 'es',
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
