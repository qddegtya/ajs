const AJS = require("../dist/ajs.cjs");

const print = str => {
  console.log(str);
};

const addHello = str => {
  return "hello" + str;
};

const fn = AJS.fp.compose(
  addHello,
  print
);

fn("xiaoa");
