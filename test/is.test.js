const AJS = require('../dist/ajs.cjs')

describe('AJS.internal.is', () => {
  test('isArray should correctly identify arrays', () => {
    expect(AJS.internal.is.isArray([1, 2, 3])).toBe(true)
    expect(AJS.internal.is.isArray([])).toBe(true)
    expect(AJS.internal.is.isArray({})).toBe(false)
  })

  test('isObject should correctly identify objects', () => {
    expect(AJS.internal.is.isObject({a: 1, b: 2})).toBe(true)
    expect(AJS.internal.is.isObject({})).toBe(true)
    expect(AJS.internal.is.isObject([])).toBe(false)
  })

  test('isFunction should correctly identify functions', () => {
    expect(AJS.internal.is.isFunction(async function testAsync() {})).toBe(true)
    expect(AJS.internal.is.isFunction(() => {})).toBe(true)
    expect(AJS.internal.is.isFunction({})).toBe(false)
  })

  test('isBoolean should correctly identify booleans', () => {
    expect(AJS.internal.is.isBoolean(true)).toBe(true)
    expect(AJS.internal.is.isBoolean(false)).toBe(true)
    expect(AJS.internal.is.isBoolean(1)).toBe(false)
  })
})
