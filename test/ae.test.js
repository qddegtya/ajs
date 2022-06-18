const AJS = require("../dist/ajs.cjs");

const eff = AJS.future.eff;

eff((perform, handle) => {
  handle(function* (handler) {
    if (handler === "read") {
      yield "read";
    } else if (handler === "write") {
      yield "write";
    }
  });

  const o1 = perform("read");
  const o2 = perform("write");

  console.log(o1, o2);
});
