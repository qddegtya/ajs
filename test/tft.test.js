const fs = require("fs");
const path = require("path");

const AJS = require("../dist/ajs.cjs");
const tpl = AJS.future.tpl;

const tplContent = fs
  .readFileSync(path.join(__dirname, "..", "_fixtures/hello.tpl"))
  .toString();

console.log(
  tpl.exec(tplContent, {
    clsName: "HelloWorldClass",
  })
);
