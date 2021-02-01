const AJS = require('../dist/ajs.cjs')

const MagicString = AJS.lang.MagicString

const str = MagicString('abc')

console.log(str.capitalize())
