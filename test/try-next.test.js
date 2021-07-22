const AJS = require('../dist/ajs.cjs')

// try-next is lazy
const _print = AJS.functional.helper
.tryNext((msg) => {
  console.log(`i throw a error ${msg}`)
  throw new Error('i throw a error')
})

_print.tryNext((msg) => {
  console.log(`i throw a error ${msg}`)
  throw new Error('i throw a error too')
})
.tryNext((msg) => {
  console.log(`i am the correct runner ${msg}`)
});

_print(': I am archer.');
