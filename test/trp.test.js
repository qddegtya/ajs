const AJS = require("../dist/ajs.cjs");

const TR = AJS.future.TR;

const count1 = TR(1);
const count2 = TR(2);

const plus = TR.compute((a, b) => {
  return a + b;
});

const plusCounter = plus(count1, count2);
const plusCounter2 = plus(plusCounter, count2);

plusCounter.observe((oldVal, newVal) => {
  console.log(oldVal, newVal);
});

plusCounter2.observe((oldVal, newVal) => {
  console.log(oldVal, newVal);
});

count2.change(() => 6);
