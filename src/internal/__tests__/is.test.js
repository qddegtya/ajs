import { is } from '../index'

describe('AJS.internal.is', () => {
  test('isArray should correctly identify arrays', () => {
    expect(is.isArray([1, 2, 3])).toBe(true)
    expect(is.isArray([])).toBe(true)
    expect(is.isArray({})).toBe(false)
  })

  test('isObject should correctly identify objects', () => {
    expect(is.isObject({a: 1, b: 2})).toBe(true)
    expect(is.isObject({})).toBe(true)
    expect(is.isObject([])).toBe(false)
  })

  test('isFunction should correctly identify functions', () => {
    expect(is.isFunction(async function testAsync() {})).toBe(true)
    expect(is.isFunction(() => {})).toBe(true)
    expect(is.isFunction({})).toBe(false)
  })

  test('isBoolean should correctly identify booleans', () => {
    expect(is.isBoolean(true)).toBe(true)
    expect(is.isBoolean(false)).toBe(true)
    expect(is.isBoolean(1)).toBe(false)
  })
})
