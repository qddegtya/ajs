/** AJS (1.0.2):  💗 A collection of utility libraries used by @qddegtya*/
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

function isArray(obj) {
  return Object.prototype.toString.apply(obj) == '[object Array]'
}

const is = {
  isArray
};

/**
 *
 * // Class 定义
 * let A = AJS.core.base.Class({
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

const mixin = function mixin() {
  let mixins = arguments;

  let _hasOwnProperty = function(target, key) {
    return Object.prototype.hasOwnProperty.call(target, key)
  };

  return function _mixin_decorate(target) {
    let _mixins;

    if (mixins.length === 0) {
      _mixins = [];
    } else if (mixins.length === 1 && typeof mixins === 'function') {
      _mixins = [];
      target = mixins[0];
    } else if (mixins.length === 1 && typeof mixins === 'object') {
      _mixins = [ mixins[0] ];
    } else if (mixins.length > 1) {
      _mixins = mixins;
    }

    // handle
    for (let i = 0; i < _mixins.length; i++) {
      let _currentMixinSrc = _mixins[i];

      for (let k in _currentMixinSrc) {
        // when the mixin is X.prototype, we do not assign `X.prototype.constructor` property
        if (_hasOwnProperty(_currentMixinSrc, k) && k !== 'constructor') {
          if (!_hasOwnProperty(target.prototype, k)) {
            let desc = Object.getOwnPropertyDescriptor(_currentMixinSrc, k);

            if (desc) {
              Object.defineProperty(target.prototype, k, desc);
            } else {
              target.prototype[k] = _currentMixinSrc[k];
            }
          }
        }
      }
    }
  }
};

const base = {
  Class: ClassShape
};

const decorators = {
  mixin
};

var index = /*#__PURE__*/Object.freeze({
  base: base,
  decorators: decorators
});

// TODO
// proxy: __call__

const IntercepterRunnerContainer = base.Class({
  $ctor: function(target) {
    this.target = target;
    this._before = [];
    this._after = [];
    this.target.intercepted = true;
  },

  before: function(_before) {
    this._before.push(_before);
    return this
  },

  after: function(_after) {
    this._after.push(_after);
    return this
  },

  // TODO: 支持异步
  // get getAsyncRunner () {},

  getRunner () {
    let _self = this;

    return function() {
      let args = arguments,
        ret;

      for (let i = 0; i < _self._before.length; i++) {
        ret = _self._before[i].apply(this, args);

        // stop
        if (ret === false) return
        else if (is.isArray(ret)) args = ret;
      }

      let res = _self.target.apply(this, args);

      for (var j = 0; j < _self._after.length; j++) {
        ret = _self._after[j].apply(this, args);

        // jump to res
        if (ret === false) break
        else if (is.isArray(ret)) args = ret;
      }

      return res
    }
  }
});

/**
 * @example
 *
 * // quick start
 * function log (msg) {
 *   console.log(msg)
 * }
 *
 * const _log = intercepter(log)
 * .before((msg) => {
 *   console.log('<====== before ======>')
 * })
 * .after((msg) => {
 *   console.log('<====== after ======>')
 * })
 * .getRunner()
 *
 * _log('this is our msg')
 *
 *
 * @param target 被拦截的 function
 */
const intercepter = target => {
  if (target.intercepted) return
  return new IntercepterRunnerContainer(target)
};

const helper = {
  intercepter
};

var index$1 = /*#__PURE__*/Object.freeze({
  helper: helper
});

exports.core = index;
exports.functional = index$1;
/** Follow me: @qddegtya (https://github.com/qddegtya) */
