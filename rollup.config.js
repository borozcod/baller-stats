import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';
import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  input: "src/index.js",
  output: [{
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: true,
  },
  {
    file: "dist/bundle.min.js",
    format: "iife",
    plugins: [terser()]
  }
  ],
  plugins: [
    json(),
    postcss({
      extract: true,
      extensions: ['.css', '.scss']
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
    !isProduction && serve({
      open: true,
      verbose: true,
      contentBase: ["", "public"],
      host: "localhost",
      port: 3000,
    }),
    !isProduction && livereload({ watch: "dist" }),
  ]
};