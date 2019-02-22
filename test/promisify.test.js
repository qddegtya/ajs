const AJS = require("../dist/ajs.cjs");

const readFile = AJS.functional.helper.promisify(require("fs").readFile);

readFile("./core.test.js", "utf-8").then(ret => {
  console.log(ret);
});

readFile("xxxx", "utf-8").catch(err => {
  console.log(err);
});
