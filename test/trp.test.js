const AJS = require("../dist/ajs.cjs");
const TR = AJS.future.TR;
const { atom, selector, compute } = AJS.future.TR;

describe('TR Basic Operations', () => {
  test('should compute sum of two TR values', () => {
    const count1 = TR(1);
    const count2 = TR(2);
    const plus = TR.compute((a, b) => a + b);
    
    const plusCounter = plus(count1, count2);
    const plusCounter2 = plus(plusCounter, count2);
    
    let result1, result2;
    plusCounter.observe(val => { result1 = val; });
    plusCounter2.observe(val => { result2 = val; });
    
    expect(result1).toBe(3);
    expect(result2).toBe(5);
  });

  test('should handle array updates', (done) => {
    const arr = TR(["high prio", "medium prio", "low prio"]);
    let result;
    
    arr.observe(val => { result = val; });

    setTimeout(() => {
      arr(prev => [...prev, "prio: for fun"]);
      expect(result).toEqual(["high prio", "medium prio", "low prio", "prio: for fun"]);
      done();
    }, 1000);
  });

  test('should update count2 value', () => {
    const count2 = TR(2);
    expect(count2()).toBe(2);
    count2(6);
    expect(count2()).toBe(6);
  });

  test('should dispose observer', () => {
    const disposableCounter = TR(10);
    let result;
    const observer = val => { result = val; };
    disposableCounter.observe(observer);
    disposableCounter(v => v + 5);
    expect(result).toBe(15);
    disposableCounter.dispose();
    disposableCounter(v => v + 10);
    expect(result).toBe(15); // 这次改变不会触发观察者
  });

  test('should bind and unbind TR values', () => {
    const source = TR(100);
    const dependent = TR(200);
    source.bind(dependent);
    expect(dependent()).toBe(100);
    source(v => v + 50);
    expect(dependent()).toBe(150);
    source.unbind(dependent);
    source(v => v + 100);
    expect(dependent()).toBe(150); // dependent 不会再响应这个变化
  });

  test('should initialize with function', () => {
    const fnCounter = TR(() => 1000);
    expect(fnCounter()).toBe(1000);
    fnCounter(v => v + 1);
    expect(fnCounter()).toBe(1001);
  });

  test('should maintain value stability', () => {
    const stableCounter = TR(1);
    expect(stableCounter()).toBe(1);
    stableCounter(v => v);
    expect(stableCounter()).toBe(1); // 相同的值不会触发更新
    stableCounter(v => v + 1);
    expect(stableCounter()).toBe(2);
  });

  test('should dispose compute', () => {
    const num1 = TR(5);
    const num2 = TR(10);
    const sum = TR.compute((a, b) => a + b)(num1, num2);
    expect(sum()).toBe(15);
    num1(v => v + 1);
    expect(sum()).toBe(16);
    sum.dispose();
    num1(v => v + 1);
    expect(sum()).toBe(16); // 不会再触发计算
  });

  test('should work with atom and selector', () => {
    // atom 测试
    const countAtom = atom({
      key: 'countAtom',
      default: 1
    });
    expect(countAtom()).toBe(1);
    countAtom(2);
    expect(countAtom()).toBe(2);

    // selector 测试
    const doubleSelector = selector({
      key: 'doubleSelector',
      get: (num) => num * 2
    });
    const doubleCount = doubleSelector(countAtom);
    let result;
    doubleCount.observe(val => { result = val; });
    expect(result).toBe(4);
    countAtom(3);
    expect(result).toBe(6);
  });

  test('should compose atom with selector', () => {
    const baseAtom = atom({
      key: 'baseAtom',
      default: 10
    });

    const multiplierSelector = selector({
      key: 'multiplierSelector',
      get: (num) => num * 3
    });

    const addSelector = selector({
      key: 'addSelector',
      get: (num) => num + 5
    });

    const multiplied = multiplierSelector(baseAtom);
    const final = addSelector(multiplied);

    let result;
    final.observe(val => { result = val; });
    expect(result).toBe(35); // (10 * 3) + 5

    baseAtom(20);
    expect(result).toBe(65); // (20 * 3) + 5
  });

  test('should handle atom disposal', () => {
    const testAtom = atom({
      key: 'testAtom',
      default: 5
    });

    const testSelector = selector({
      key: 'testSelector',
      get: (num) => num + 1
    });

    const derived = testSelector(testAtom);
    let result;
    derived.observe(val => { result = val; });
    expect(result).toBe(6);
    
    derived.dispose();
    testAtom(10);
    expect(result).toBe(6); // 值不应该更新
  });
});
