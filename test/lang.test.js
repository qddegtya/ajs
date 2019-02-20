const AJS = require("../dist/ajs.cjs");

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
  // 私有变量
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
      this.$_print(this.a + $privateA);
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

let b = new B("john");
console.log(B.foo);
console.log(B.bar);
B.test();
b.print();

let date = new MyDate("2019-01-02");
console.log(date.toFormat());

console.log(Object.getPrototypeOf(b) === B.prototype);

let c = new C();
c.test();
