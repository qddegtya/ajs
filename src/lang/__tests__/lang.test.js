import { MagicString } from '../index'

describe('Language Utilities Tests', () => {
  test('should capitalize string correctly', () => {
    const str = MagicString('abc')
    expect(str.capitalize()).toBe('Abc')
  })
})
