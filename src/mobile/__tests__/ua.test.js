import { UserAgent } from '../index'

describe('UserAgent', () => {
  describe('Browser Detection', () => {
    test('should detect Chrome browser', () => {
      const ua = new UserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      )
      const result = ua.getResult()
      expect(result.browser.name).toBe('Chrome')
      expect(result.browser.version).toBe('91.0.4472.124')
      expect(ua.isBrowser('Chrome')).toBe(true)
    })

    test('should detect Firefox browser', () => {
      const ua = new UserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0'
      )
      const result = ua.getResult()
      expect(result.browser.name).toBe('Firefox')
      expect(result.browser.version).toBe('89.0')
      expect(ua.isBrowser('Firefox')).toBe(true)
    })

    test('should detect Safari browser', () => {
      const ua = new UserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15'
      )
      const result = ua.getResult()
      expect(result.browser.name).toBe('Safari')
      expect(result.browser.version).toBe('14.1.1')
      expect(ua.isBrowser('Safari')).toBe(true)
    })
  })

  describe('OS Detection', () => {
    test('should detect Windows OS', () => {
      const ua = new UserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      )
      const result = ua.getResult()
      expect(result.os.name).toBe('Windows')
      expect(result.os.version).toBe('10.0')
      expect(ua.isOS('Windows')).toBe(true)
    })

    test('should detect iOS', () => {
      const ua = new UserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1'
      )
      const result = ua.getResult()
      expect(result.os.name).toBe('iOS')
      expect(result.os.version).toBe('14.6')
      expect(ua.isOS('iOS')).toBe(true)
    })

    test('should detect Android', () => {
      const ua = new UserAgent(
        'Mozilla/5.0 (Linux; Android 11; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
      )
      const result = ua.getResult()
      expect(result.os.name).toBe('Android')
      expect(result.os.version).toBe('11')
      expect(ua.isOS('Android')).toBe(true)
    })
  })

  describe('Device Detection', () => {
    test('should detect mobile device', () => {
      const ua = new UserAgent(
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1'
      )
      const result = ua.getResult()
      expect(result.device.type).toBe('mobile')
      expect(result.device.vendor).toBe('Apple')
      expect(result.device.model).toBe('iPhone')
      expect(ua.isMobile()).toBe(true)
    })

    test('should detect tablet device', () => {
      const ua = new UserAgent(
        'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1'
      )
      const result = ua.getResult()
      expect(result.device.type).toBe('tablet')
      expect(result.device.vendor).toBe('Apple')
      expect(result.device.model).toBe('iPad')
      expect(ua.isTablet()).toBe(true)
    })

    test('should detect desktop device', () => {
      const ua = new UserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15'
      )
      const result = ua.getResult()
      expect(result.device.type).toBe('desktop')
      expect(ua.isDesktop()).toBe(true)
    })
  })

  describe('Engine Detection', () => {
    test('should detect Webkit engine', () => {
      const ua = new UserAgent(
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15'
      )
      const result = ua.getResult()
      expect(result.engine.name).toBe('Webkit')
      expect(result.engine.version).toBe('605.1.15')
    })

    test('should detect Gecko engine', () => {
      const ua = new UserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0'
      )
      const result = ua.getResult()
      expect(result.engine.name).toBe('Gecko')
      expect(result.engine.version).toBe('20100101')
    })
  })

  describe('Edge Cases', () => {
    test('should handle empty UA string', () => {
      const ua = new UserAgent('')
      const result = ua.getResult()
      expect(result.browser.name).toBe('')
      expect(result.os.name).toBe('')
      expect(result.device.type).toBe('')
    })

    test('should handle unknown browser', () => {
      const ua = new UserAgent('Unknown Browser')
      const result = ua.getResult()
      expect(result.browser.name).toBe('')
      expect(result.browser.version).toBe('')
    })

    test('should handle unknown OS', () => {
      const ua = new UserAgent('Unknown OS')
      const result = ua.getResult()
      expect(result.os.name).toBe('')
      expect(result.os.version).toBe('')
    })
  })

  describe('Modern Mobile Devices', () => {
    test('should detect Samsung device', () => {
      const ua = new UserAgent(
        'Mozilla/5.0 (Linux; Android 11; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
      )
      const result = ua.getResult()
      expect(result.device.vendor).toBe('Samsung')
      expect(result.device.model).toBe('SM-G998B')
    })

    test('should detect Huawei device', () => {
      const ua = new UserAgent(
        'Mozilla/5.0 (Linux; Android 10; HW-P40) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
      )
      const result = ua.getResult()
      expect(result.device.vendor).toBe('Huawei')
      expect(result.device.model).toBe('HW-P40')
    })

    test('should detect Xiaomi device', () => {
      const ua = new UserAgent(
        'Mozilla/5.0 (Linux; Android 11; Redmi Note 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36'
      )
      const result = ua.getResult()
      expect(result.device.vendor).toBe('Xiaomi')
      expect(result.device.model).toBe('Redmi Note 10')
    })
  })
})
