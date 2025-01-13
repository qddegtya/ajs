/**
 * @jest-environment jsdom
 */

import { E } from '../index'
const once = E.once

describe('DOM Module', () => {
  describe('E.once', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('should trigger once for same event', () => {
      const handler = jest.fn()
      const addSpy = jest.spyOn(window, 'addEventListener')
      const removeSpy = jest.spyOn(window, 'removeEventListener')

      once('window.click', handler)
      
      // 触发两次点击
      window.dispatchEvent(new Event('click'))
      window.dispatchEvent(new Event('click'))

      expect(handler).toHaveBeenCalledTimes(1)
      expect(addSpy).toHaveBeenCalledTimes(1)
      expect(removeSpy).toHaveBeenCalledTimes(1)
    })

    test('should handle different events sequence', () => {
      const handler = jest.fn()
      const addSpy = jest.spyOn(window, 'addEventListener')
      
      once('window.mouseover', 'window.click', handler)

      // 触发 mouseover 事件
      window.dispatchEvent(new Event('mouseover'))
      
      // 触发两次 click
      window.dispatchEvent(new Event('click'))
      window.dispatchEvent(new Event('click'))

      expect(handler).toHaveBeenCalledTimes(1)
      expect(addSpy).toHaveBeenCalledTimes(2)
    })

    test('should work with custom options', () => {
      const handler = jest.fn()
      const addSpy = jest.spyOn(window, 'addEventListener')
      const options = { capture: true }

      once('window.click', handler, options)

      expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function), options)
    })

    test('should handle invalid event target format', () => {
      const handler = jest.fn()
      const addSpy = jest.spyOn(window, 'addEventListener')
      
      // 测试无效的事件目标格式
      once(null, handler)
      once(undefined, handler)
      once({}, handler)
      
      expect(addSpy).not.toHaveBeenCalled()
    })
  })
})
