import { helper } from '../index'
const { di } = helper

describe('DI Tests', () => {
  test('should correctly provide and inject class A', () => {
    // provide
    di.provide('clzA')(class A {
      constructor (a, b) {
        this.a = a
        this.b = b
      }
    })

    // inject
    const a = di.inject('clzA', 1, 2)
    expect(a.a).toBe(1)
    expect(a.b).toBe(2)
  })
})
