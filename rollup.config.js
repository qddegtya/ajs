import { version as LIB_VERSION, description as LIB_DESCRIPTION } from './package.json'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'

const LIB_NAME = `AJS`
const AUTHOR_NAME = `qddegtya`

export default {
  input: './index.js',
  output: {
    file: 'dist/ajs.cjs.js',
    format: 'cjs',
    name: LIB_NAME,
    banner: `/** ${LIB_NAME} (${LIB_VERSION}):  ${LIB_DESCRIPTION}*/`,
    footer: `/** Follow me: @${AUTHOR_NAME} (https://github.com/${AUTHOR_NAME}) */`
  },
  plugins: [
    resolve(),
    babel()
  ]
}
