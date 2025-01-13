import { compose, composeAsync } from '../index'

describe('Function Composition Tests', () => {
  test('should compose functions correctly', () => {
    const add1 = x => x + 1
    const multiply2 = x => x * 2
    const subtract3 = x => x - 3
    
    const composed = compose(add1, multiply2, subtract3)
    expect(composed(5)).toBe(5) // (5 - 3) * 2 + 1 = 5
  })
  
  test('should handle single function', () => {
    const add1 = x => x + 1
    expect(compose(add1)(1)).toBe(2)
  })
  
  test('should return identity for empty compose', () => {
    expect(compose()(5)).toBe(5)
  })
  
  test('should throw for non-function arguments', () => {
    expect(() => compose(1)).toThrow(TypeError)
  })
})

describe('Async Function Composition Tests', () => {
  test('should compose async functions correctly', async () => {
    const asyncAdd1 = async x => x + 1
    const asyncMultiply2 = async x => x * 2
    const asyncSubtract3 = async x => x - 3
    
    const composed = composeAsync(asyncAdd1, asyncMultiply2, asyncSubtract3)
    expect(await composed(5)).toBe(5)
  })

  test('should handle mixed sync and async functions', async () => {
    const add1 = x => x + 1
    const asyncMultiply2 = async x => x * 2
    
    const composed = composeAsync(add1, asyncMultiply2)
    expect(await composed(2)).toBe(5)
  })

  test('should handle errors in async composition', async () => {
    const errorFn = async () => { throw new Error('Test error') }
    const add1 = x => x + 1
    
    const composed = composeAsync(add1, errorFn)
    await expect(composed(1)).rejects.toThrow('Test error')
  })

  test('should return identity for empty async compose', async () => {
    expect(await composeAsync()(5)).toBe(5)
  })
})
