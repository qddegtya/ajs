const AJS = require("../dist/ajs.cjs");

// quick start
function log (msg) {
  console.log(msg)
}

const _log = AJS.functional.helper.intercepter(log)
.before((msg) => {
  console.log(`<====== before: ${msg} ======>`)
})
.after((msg) => {
  console.log(`<====== before: ${msg} ======>`)
})
.getRunner()

_log('this is our msg')
