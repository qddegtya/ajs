import { helper } from '../index'
const { tryNext } = helper

describe('AJS.functional.helper.tryNext', () => {
  test('should execute the last successful handler in the chain', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    
    const _print = tryNext((msg) => {
      console.log(`i throw a error ${msg}`)
      throw new Error('i throw a error')
    })

    _print
      .tryNext((msg) => {
        console.log(`i throw a error too ${msg}`)
        throw new Error('i throw a error too')
      })
      .tryNext((msg) => {
        console.log(`i am the correct runner ${msg}`)
      })

    _print(': I am archer.')

    expect(consoleSpy).toHaveBeenCalledTimes(3)
    expect(consoleSpy).toHaveBeenNthCalledWith(1, 'i throw a error : I am archer.')
    expect(consoleSpy).toHaveBeenNthCalledWith(2, 'i throw a error too : I am archer.')
    expect(consoleSpy).toHaveBeenNthCalledWith(3, 'i am the correct runner : I am archer.')
    
    consoleSpy.mockRestore()
  })
})
