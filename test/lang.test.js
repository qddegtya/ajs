const AJS = require('../src/index')
const MagicString = AJS.lang.MagicString

describe('MagicString', () => {
  test('should capitalize string correctly', () => {
    const str = MagicString('abc')
    expect(str.capitalize()).toBe('Abc')
  })
})
