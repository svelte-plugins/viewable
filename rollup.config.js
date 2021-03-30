import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const DEV = process.env.ROLLUP_WATCH;
const BUNDLE = process.env.BUNDLE === 'true';

export default () => {
  return ['es', 'umd'].map((format) => {
    const UMD = format === 'umd';

    return {
      input: pkg.svelte,
      output: {
        format,
        file: UMD ? pkg.main : pkg.module,
        name: UMD ? pkg.name : undefined,
      },
      plugins: [
        resolve(),
        commonjs(),
        svelte({
          compilerOptions: {
            dev: DEV,
            cssHash({ hash, css, name, filename }) {
              return `viewable-${hash(css)}`;
            }
          },
          emitCss: false,
        }),
        babel({
          "extensions": [".js", ".mjs", ".html", ".svelte"],
          "babelHelpers": "runtime",
          "exclude": ["/node_modules/**"],
          "presets": [
            [
              "@babel/preset-env",
              {
                "targets": "> 0.25%, not dead"
              }
            ]
          ],
          "plugins": [
            "@babel/plugin-syntax-dynamic-import",
            [
              "@babel/plugin-transform-runtime",
              {
                "useESModules": true
              }
            ]
          ]
        })
      ]
    };
  });
};
