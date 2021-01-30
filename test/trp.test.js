const AJS = require("../dist/ajs.cjs");

const TR = AJS.future.TR;

const count1 = TR(1);
const count2 = TR(2);

const plus = TR.compute((a, b) => {
  return a + b;
});

const plusCounter = plus(count1, count2);
const plusCounter2 = plus(plusCounter, count2);

plusCounter.observe((val) => {
  console.log(val);
});

plusCounter2.observe((val) => {
  console.log(val);
});

// mobx official example
const arr = TR(["high prio", "medium prio", "low prio"]);

arr.observe((val) => {
  console.log(val);
});

setTimeout(() => {
  arr.change((arr) => {
    arr.push("prio: for fun");
  });
}, 1000);

console.log("before: ", count2.get());

count2.change(() => 6);

console.log("after: ", count2.get());
