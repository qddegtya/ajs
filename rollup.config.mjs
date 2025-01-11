import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const { version: LIB_VERSION, description: LIB_DESCRIPTION } = pkg;

const LIB_NAME = `AJS`;
const AUTHOR_NAME = `qddegtya`;

const baseOutput = {
  name: LIB_NAME,
  banner: `/** ${LIB_NAME} (${LIB_VERSION}): ${LIB_DESCRIPTION} */`,
  footer: `/** Follow me: @${AUTHOR_NAME} (https://github.com/${AUTHOR_NAME}) */`,
};

export default {
  input: "./src/index.js",
  output: [
    {
      ...baseOutput,
      file: "dist/ajs.cjs.js",
      format: "cjs",
    },
    {
      ...baseOutput,
      file: "dist/ajs.umd.js",
      format: "umd",
    },
    {
      ...baseOutput,
      file: "dist/ajs.es.js",
      format: "es",
    },
  ],
  plugins: [
    json({
      preferConst: true,
      compact: true,
      namedExports: true
    }), 
    resolve(), 
    babel({
      babelHelpers: 'bundled'
    })
  ],
};
