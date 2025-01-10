import {
  version as LIB_VERSION,
  description as LIB_DESCRIPTION,
} from "./package.json";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

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
  plugins: [resolve(), babel()],
};
