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
  arr((prev) => [...prev, "prio: for fun"]);
}, 1000);

console.log("before: ", count2());

count2(6);

console.log("after: ", count2());

// dispose & unbind
console.log("\n=== Testing dispose functionality ===");
const disposableCounter = TR(10);
const observer = (val) => console.log('disposable value:', val);
disposableCounter.observe(observer);
disposableCounter(v => v + 5);
disposableCounter.dispose();
disposableCounter(v => v + 10); // 这次改变不会触发观察者

console.log("\n=== Testing bind/unbind functionality ===");
const source = TR(100);
const dependent = TR(200);
source.bind(dependent);
console.log('Before source change:', dependent());
source(v => v + 50);
console.log('After source change:', dependent());
source.unbind(dependent);
source(v => v + 100); // dependent 不会再响应这个变化

console.log("\n=== Testing function initialization ===");
const fnCounter = TR(() => 1000);
console.log('Function initialized value:', fnCounter());
fnCounter(v => v + 1);
console.log('After change:', fnCounter());

console.log("\n=== Testing value stability ===");
const stableCounter = TR(1);
console.log('Initial value:', stableCounter());
stableCounter(v => v); // 相同的值不会触发更新
stableCounter(v => v + 1);
console.log('After real change:', stableCounter());

console.log("\n=== Testing compute dispose ===");
const num1 = TR(5);
const num2 = TR(10);
const sum = TR.compute((a, b) => a + b)(num1, num2);
console.log('Initial sum:', sum());
num1(v => v + 1);
console.log('Sum after change:', sum());
sum.dispose();
num1(v => v + 1); // 不会再触发计算
console.log('Sum after dispose and change:', sum());
