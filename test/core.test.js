const AJS = require("../src/index");
const EventEmitter = require('events');

let MyDate = AJS.core.base.Class(function() {
  let formatDate = function(date) {
    return "格式化日期";
  };

  return {
    $parent: Date,

    toFormat: function(format_str) {
      return formatDate(this, format_str);
    }
  };
});

let A = AJS.core.base.Class(function() {
  // 类私有变量
  let $privateA = "xiaoa";

  return {
    $ctor: function(name) {
      this.a = 1;
      this.name = name;

      this.$_print('调用');
    },

    $static: {
      foo: 1,
      test: function() {
        console.log("this is a test.");
      }
    },

    $_a: 1,

    print: function() {
      this.$_print($privateA);  // 修改这里，只输出私有变量
    },

    $_print: function(msg) {
      console.log(msg);
    }
  };
});

const B = A.$extends({
  $static: {
    bar: 2
  },

  print: function() {
    this.$super.print();
    console.log("this is " + this.name);
  }
});

const C = AJS.core.base.Class({
  $parent: {
    on: function() {
      console.log("on");
    }
  },

  $ctor: function(name) {
    this.name = name;
  },

  test: function() {
    this.on();
  }
});

// mixin
AJS.core.decorators.mixin(EventEmitter.prototype)(A);

describe('AJS Core Tests', () => {
  describe('Class B', () => {
    let b;
    
    beforeEach(() => {
      b = new B("john");
    });

    test('should inherit static properties from class A', () => {
      expect(B.foo).toBe(1);
      expect(B.bar).toBe(2);
    });

    test('should execute static method test()', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      B.test();
      expect(consoleSpy).toHaveBeenCalledWith("this is a test.");
      consoleSpy.mockRestore();
    });

    test('should correctly execute print method', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      b.print();
      expect(consoleSpy).toHaveBeenCalledWith("xiaoa");
      expect(consoleSpy).toHaveBeenCalledWith("this is john");
      consoleSpy.mockRestore();
    });

    test('should have correct prototype chain', () => {
      expect(Object.getPrototypeOf(b)).toBe(B.prototype);
    });
  });

  describe('MyDate', () => {
    test('should format date correctly', () => {
      const date = new MyDate("2019-01-02");
      expect(date.toFormat()).toBe("格式化日期");
    });
  });

  describe('Class C', () => {
    test('should execute parent method through inheritance', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      const c = new C();
      c.test();
      expect(consoleSpy).toHaveBeenCalledWith("on");
      consoleSpy.mockRestore();
    });
  });
});
