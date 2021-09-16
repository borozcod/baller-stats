import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'

const isProduction = process.env.NODE_ENV === 'production';
const homepage = process.env.PUBLIC_URL || 'http://localhost:3000';

export default {
  input: "src/index.js",
  output: [{
    file: "dist/static/bundle.js",
    format: "iife",
    sourcemap: true,
    plugins: [isProduction && terser()]
  }
  ],
  plugins: [
    isProduction && del({ targets: 'dist/*' }),
    json(),
    postcss({
      extract: 'main.css',
      extensions: ['.css']
    }),
    nodeResolve({
      browser: true,
      extensions: [".js"],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
      preventAssignment: true
    }),
    commonjs({
      include: ["node_modules/**"],
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ["@babel/preset-react"],
      babelHelpers: 'bundled'
    }),
    copy({
      targets: [
        {
          src: 'public/index.html',
          dest: 'dist',
          transform: (contents, filename) => contents.toString().replace(/%PUBLIC_URL%/g, homepage)
        }
      ]
    }),
    !isProduction && livereload(),
    !isProduction && serve({
      open: true,
      verbose: true,
      contentBase: ["dist"],
      host: "localhost",
      port: 3000,
    })
  ]
};