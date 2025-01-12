const AJS = require('../src/index');
const di = AJS.functional.helper.di;

describe('DI Tests', () => {
  test('should correctly provide and inject class A', () => {
    // provide
    di.provide('clzA')(class A {
      constructor (a, b) {
        this.a = a;
        this.b = b;
      }
    });

    // inject
    const result = di.inject('clzA', 1, 2);
    
    // assertions
    expect(result).toBeDefined();
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
  });
});
