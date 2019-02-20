/** AJS (1.0.0):  💗 A collection of utility libraries used by @qddegtya*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const assign = function() {
  let args = arguments,
    thisArg,
    src = [],
    dst;

  // dst only
  if (args.length === 1) {
    thisArg = null;
    dst = args[0];
    src = [];
  }

  // support dst src
  if (args.length === 2) {
    (thisArg = null), (dst = args[0]), (src = [ args[1] ]);
  }

  // support thisArg dst [ src ]
  if (args.length >= 3) {
    thisArg = args[0];
    dst = args[1];
    src = Array.prototype.slice.call(args, 2);
  }

  for (let i = 0; i < src.length; i++) {
    let _o = src[i];
    for (let k in _o) {
      if (Object.prototype.hasOwnProperty.call(_o, k)) {
        let val = _o[k];
        if (typeof val === 'function' && thisArg) {
          dst[k] = val.bind(thisArg);
        } else {
          dst[k] = val;
        }
      }
    }
  }
};

/**
 *
 * // Class 定义
 * let A = ajs.lang.base.Class({
 *   $parent: Base
 *   $ctor: () => {
 *     // super
 *     this.$super()
 *   },
 *   $static: {
 *     foo: 1,
 *     bar: 2,
 *     test () {
 *
 *     }
 *   },
 *
 *   $_foo: 1,
 *
 *   $_printFoo () {
 *
 *   }
 *
 *   test () {
 *
 *   }
 * })
 *
 * // 支持直接传入 function
 * // 可以利用闭包进行私有属性/方法的支持
 * let B = A.$extends(function () {
 *   // private here
 *
 *   // return your option
 *   return {
 *
 *   }
 * })
 *
 * // 创建实例
 * let b = B.$new()
 *
 */

const ClassShape = option => {
  let INSTANCE_PROPERTY_REGEXP = /^\$_[^$_]+/;
  let _options = typeof option === 'function' ? option() : option;

  let _processOptions = function(option) {
    let $parent = option.$parent,
      $ctor = option.$ctor,
      $static = option.$static || Object.create(null),
      $instance = Object.create(null),
      $prototype = Object.create(null);

    for (let k in option) {
      // 实例上不该访问到这些属性，但可以允许访问到 $ctor
      if (k === '$parent' || k === '$static') {
        continue
      }

      // 实例属性/方法
      if (INSTANCE_PROPERTY_REGEXP.test(k)) {
        $instance[k] = option[k];
        continue
      }

      // 原型
      $prototype[k] = option[k];
    }

    return {
      $parent,
      $ctor,
      $static,
      $instance,
      $prototype
    }
  };

  const { $parent, $ctor, $static, $instance, $prototype } = _processOptions(
    _options
  );

  let parentPrototype =
    typeof $parent === 'function' ? $parent.prototype : $parent;

  let AClass = function() {
    let __super_is_called__ = false,
      ins,
      superThis;

    // this.$super()
    this.$super = function() {
      __super_is_called__ = true;
      superThis = $parent.apply(this, arguments);
    };

    // 处理实例属性
    assign(this, this, $instance);

    // 继承的情况下可以省略 $ctor
    if (!$ctor && $parent) {
      ins = $parent.apply(superThis || this, arguments);
    } else {
      ins = $ctor.apply(superThis || this, arguments);

      // 检查 super 调用
      if ($parent && !__super_is_called__ && typeof $parent === 'function') {
        throw new SyntaxError('You should call this.$super first before use `this`.')
      }
    }

    // 如果存在继承的情况
    // 处理 this.$super 引用
    if ($parent) {
      assign(this, this.$super, parentPrototype);
    }

    return ins
  };

  // 处理继承
  // TODO: 数组的支持 (?)
  if ($parent) {
    AClass.prototype = Object.create(parentPrototype);
    AClass.prototype['$class'] = AClass;
  }

  // 处理原型挂载
  assign(AClass.prototype, $prototype);

  // 静态属性和方法的继承
  AClass.__proto__ = $parent;
  // 处理静态属性和方法
  assign(AClass, $static);

  // 标记
  AClass.$parent = $parent;

  AClass.$extends = function(option) {
    option.$parent = this;
    return ClassShape(option)
  };

  return AClass
};

// import decorators from './decorators'

const base = {
  Class: ClassShape
};

var index = /*#__PURE__*/Object.freeze({
  base: base
});

exports.core = index;
/** Follow me: @qddegtya (https://github.com/qddegtya) */
