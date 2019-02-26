const AJS = require("../dist/ajs.cjs");

const sleep = AJS.functional.helper.sleep

// quick start
function log(msg) {
  console.log(msg);
}

async function logWithTimeout(t) {
  await sleep(t);
  console.log(`<====== ${t} ms 后输出 ======>`);
}

const _log = AJS.functional.helper
  .intercepter(log)
  .before(msg => {
    console.log(`<====== before: ${msg} ======>`);
  })
  .after(msg => {
    console.log(`<====== after: ${msg} ======>`);
  })
  .$runner;

const _asyncLog = AJS.functional.helper
  .intercepter(logWithTimeout)
  .before(sleep)
  .$asyncRunner;

async function testAsyncLog(t) {
  await _asyncLog(t);
}

testAsyncLog(3000);

// _log("this is our msg");
