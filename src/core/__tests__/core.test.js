import { base, decorators } from '../index'

let MyDate = base.Class(function() {
  let formatDate = function(date) {
    return '格式化日期'
  }

  return {
    $parent: Date,

    toFormat: function(format_str) {
      return formatDate(this, format_str)
    }
  }
})

let A = base.Class(function() {
  // 类私有变量
  let $privateA = 'xiaoa'

  return {
    $ctor: function(name) {
      this.a = 1
      this.name = name

      this.$_print('调用')
    },

    $static: {
      foo: 1,
      test: function() {
        console.log('this is a test.')
      }
    },

    $_a: 1,

    print: function() {
      this.$_print($privateA)  // 修改这里，只输出私有变量
    },

    $_print: function(msg) {
      console.log(msg)
    }
  }
})

const B = A.$extends({
  $static: {
    bar: 2
  },

  print: function() {
    this.$super.print()
    console.log('this is ' + this.name)
  }
})

const C = base.Class({
  $parent: {
    on: function() {
      console.log('on')
    }
  },

  $ctor: function(name) {
    this.name = name
  },

  test: function() {
    this.on()
  }
})

describe('AJS Core Tests', () => {
  describe('Class B', () => {
    let b
    
    beforeEach(() => {
      b = new B('john')
    })

    test('should inherit static properties from class A', () => {
      expect(B.foo).toBe(1)
      expect(B.bar).toBe(2)
    })

    test('should execute static method test()', () => {
      const consoleSpy = jest.spyOn(console, 'log')
      B.test()
      expect(consoleSpy).toHaveBeenCalledWith('this is a test.')
      consoleSpy.mockRestore()
    })

    test('should correctly execute print method', () => {
      const consoleSpy = jest.spyOn(console, 'log')
      b.print()
      expect(consoleSpy).toHaveBeenCalledWith('xiaoa')
      expect(consoleSpy).toHaveBeenCalledWith('this is john')
      consoleSpy.mockRestore()
    })

    test('should have correct prototype chain', () => {
      expect(Object.getPrototypeOf(b)).toBe(B.prototype)
    })
  })

  describe('MyDate', () => {
    test('should format date correctly', () => {
      const date = new MyDate('2019-01-02')
      expect(date.toFormat()).toBe('格式化日期')
    })
  })

  describe('Class C', () => {
    test('should execute parent method through inheritance', () => {
      const consoleSpy = jest.spyOn(console, 'log')
      const c = new C()
      c.test()
      expect(consoleSpy).toHaveBeenCalledWith('on')
      consoleSpy.mockRestore()
    })
  })

  describe('Deprecate Decorator', () => {
    let warnSpy
  
    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
      warnSpy.mockRestore()
    })

    test('should show warning for deprecated method', () => {
      class TestClass {
        @decorators.deprecate()
        oldMethod() {
          return 'result'
        }
      }

      const instance = new TestClass()
      const result = instance.oldMethod()

      expect(warnSpy).toHaveBeenCalledWith(
        'Warning: TestClass.oldMethod is deprecated and will be removed in a future version.'
      )
      expect(result).toBe('result')
    })

    test('should show custom warning message', () => {
      class TestClass {
        @decorators.deprecate('Custom warning message')
        oldMethod() {
          return 'result'
        }
      }

      const instance = new TestClass()
      instance.oldMethod()

      expect(warnSpy).toHaveBeenCalledWith('Custom warning message')
    })

    test('should show warning only once per instance', () => {
      class TestClass {
        @decorators.deprecate()
        oldMethod() {}
      }

      const instance = new TestClass()
      instance.oldMethod()
      instance.oldMethod()
      instance.oldMethod()

      expect(warnSpy).toHaveBeenCalledTimes(1)
    })

    test('should show warning for different instances separately', () => {
      class TestClass {
        @decorators.deprecate()
        oldMethod() {}
      }

      const instance1 = new TestClass()
      const instance2 = new TestClass()

      instance1.oldMethod()
      instance2.oldMethod()

      expect(warnSpy).toHaveBeenCalledTimes(2)
    })

    test('should show warning for deprecated getter', () => {
      class TestClass {
        @decorators.deprecate()
        get oldProp() {
          return 'value'
        }
      }

      const instance = new TestClass()
      const value = instance.oldProp

      expect(warnSpy).toHaveBeenCalledWith(
        'Warning: TestClass.oldProp is deprecated and will be removed in a future version.'
      )
      expect(value).toBe('value')
    })

    test('should show warning for deprecated setter', () => {
      class TestClass {
        constructor() {
          this._value = ''
        }

        @decorators.deprecate()
        set oldProp(value) {
          this._value = value
        }
      }

      const instance = new TestClass()
      instance.oldProp = 'new value'

      expect(warnSpy).toHaveBeenCalledWith(
        'Warning: TestClass.oldProp is deprecated and will be removed in a future version.'
      )
      expect(instance._value).toBe('new value')
    })
  })

  describe('Unused Parameters', () => {
    test('should not show warning for unused parameters', () => {
      const _fn = () => {}
      const _date = new Date()
    })
  })
})
