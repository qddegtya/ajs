/** AJS (1.0.3):  💗 A collection of utility libraries used by @qddegtya*/
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var assign = function assign() {
  var args = arguments,
      thisArg,
      src = [],
      dst; // dst only

  if (args.length === 1) {
    thisArg = null;
    dst = args[0];
    src = [];
  } // support dst src


  if (args.length === 2) {
    thisArg = null, dst = args[0], src = [args[1]];
  } // support thisArg dst [ src ]


  if (args.length >= 3) {
    thisArg = args[0];
    dst = args[1];
    src = Array.prototype.slice.call(args, 2);
  }

  for (var i = 0; i < src.length; i++) {
    var _o = src[i];

    for (var k in _o) {
      if (Object.prototype.hasOwnProperty.call(_o, k)) {
        var val = _o[k];

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
  return Object.prototype.toString.apply(obj) == '[object Array]';
}

var is = {
  isArray: isArray
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

var ClassShape = function ClassShape(option) {
  var INSTANCE_PROPERTY_REGEXP = /^\$_[^$_]+/;

  var _options = typeof option === 'function' ? option() : option;

  var _processOptions = function _processOptions(option) {
    var $parent = option.$parent,
        $ctor = option.$ctor,
        $static = option.$static || Object.create(null),
        $instance = Object.create(null),
        $prototype = Object.create(null);

    for (var k in option) {
      // 属性描述符在此时不能被访问
      if (Object.getOwnPropertyDescriptor(option, k)) continue; // 实例上不该访问到这些属性，但可以允许访问到 $ctor

      if (k === '$parent' || k === '$static') {
        continue;
      } // 实例属性/方法


      if (INSTANCE_PROPERTY_REGEXP.test(k)) {
        $instance[k] = option[k];
        continue;
      } // 原型


      $prototype[k] = option[k];
    }

    return {
      $parent: $parent,
      $ctor: $ctor,
      $static: $static,
      $instance: $instance,
      $prototype: $prototype
    };
  };

  var _processOptions2 = _processOptions(_options),
      $parent = _processOptions2.$parent,
      $ctor = _processOptions2.$ctor,
      $static = _processOptions2.$static,
      $instance = _processOptions2.$instance,
      $prototype = _processOptions2.$prototype;

  var parentPrototype = typeof $parent === 'function' ? $parent.prototype : $parent;

  var AClass = function AClass() {
    var __super_is_called__ = false,
        ins,
        superThis; // this.$super()

    this.$super = function () {
      __super_is_called__ = true;
      superThis = $parent.apply(this, arguments);
    }; // 处理实例属性


    assign(this, this, $instance); // 继承的情况下可以省略 $ctor

    if (!$ctor && $parent) {
      ins = $parent.apply(superThis || this, arguments);
    } else {
      ins = $ctor.apply(superThis || this, arguments); // 检查 super 调用

      if ($parent && !__super_is_called__ && typeof $parent === 'function') {
        throw new SyntaxError('You should call this.$super first before use `this`.');
      }
    } // 如果存在继承的情况
    // 处理 this.$super 引用


    if ($parent) {
      assign(this, this.$super, parentPrototype);
    }

    return ins;
  }; // 处理继承
  // TODO: 数组的支持 (?)


  if ($parent) {
    AClass.prototype = Object.create(parentPrototype);
    AClass.prototype['$class'] = AClass;
  } // 处理原型挂载


  assign(AClass.prototype, $prototype); // 处理属性描述符

  for (var key in _options) {
    var desc = Object.getOwnPropertyDescriptor(_options, key);

    if (desc) {
      Object.defineProperty(AClass.prototype, key, desc);
    }
  } // 静态属性和方法的继承


  AClass.__proto__ = $parent; // 处理静态属性和方法

  assign(AClass, $static); // 标记

  AClass.$parent = $parent;

  AClass.$extends = function (option) {
    option.$parent = this;
    return ClassShape(option);
  };

  return AClass;
};

var Deferred = ClassShape(function () {
  // private
  var _done = false,
      _promise,
      _resolve,
      _reject;

  return {
    $ctor: function $ctor() {
      // promise 延迟执行容器
      _promise = new Promise(function (resolve, reject) {
        _resolve = resolve, _reject = reject;
      });
    },
    resolve: function resolve(o) {
      _done = true;

      _resolve(o);
    },
    reject: function reject(o) {
      _done = true, _reject(o);
    },

    get isDone() {
      return _done;
    },

    then: function then() {
      return Promise.prototype.then.apply(_promise, arguments);
    },
    catch: function _catch() {
      return Promise.prototype.catch.apply(_promise, arguments);
    },
    done: function done() {
      // 先将 onFulfill, onReject 扔入容器
      var promise = arguments.length ? _promise.then.apply(_promise, arguments) : _promise; // 执行最后的 done 操作，模拟正常返回 undefined
      // 异常直接抛出，可由后续的 catch 继续捕获，但 done 不处理

      promise.then(void 0, function (err) {
        setTimeout(function () {
          throw err;
        }, 0);
      });
    }
  };
});

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var mixin = function mixin() {
  var mixins = arguments;

  var _hasOwnProperty = function _hasOwnProperty(target, key) {
    return Object.prototype.hasOwnProperty.call(target, key);
  };

  return function _mixin_decorate(target) {
    var _mixins;

    if (mixins.length === 0) {
      _mixins = [];
    } else if (mixins.length === 1 && typeof mixins === 'function') {
      _mixins = [];
      target = mixins[0];
    } else if (mixins.length === 1 && _typeof(mixins) === 'object') {
      _mixins = [mixins[0]];
    } else if (mixins.length > 1) {
      _mixins = mixins;
    } // handle


    for (var i = 0; i < _mixins.length; i++) {
      var _currentMixinSrc = _mixins[i];

      for (var k in _currentMixinSrc) {
        // when the mixin is X.prototype, we do not assign `X.prototype.constructor` property
        if (_hasOwnProperty(_currentMixinSrc, k) && k !== 'constructor') {
          if (!_hasOwnProperty(target.prototype, k)) {
            var desc = Object.getOwnPropertyDescriptor(_currentMixinSrc, k);

            if (desc) {
              Object.defineProperty(target.prototype, k, desc);
            } else {
              target.prototype[k] = _currentMixinSrc[k];
            }
          }
        }
      }
    }
  };
};

var base = {
  Class: ClassShape,
  Deferred: Deferred
};
var decorators = {
  mixin: mixin
};

var index = /*#__PURE__*/Object.freeze({
  base: base,
  decorators: decorators
});

// proxy: __call__

var IntercepterRunnerContainer = base.Class({
  $ctor: function $ctor(target) {
    this.target = target;
    this._before = [];
    this._after = [];
    this.target.intercepted = true;
  },
  before: function before(_before) {
    this._before.push(_before);

    return this;
  },
  after: function after(_after) {
    this._after.push(_after);

    return this;
  },

  get $asyncRunner() {
    var _self = this;

    return function () {
      var _this = this;

      var args = arguments,
          _continue = true;

      var _startChainInvoke = function _startChainInvoke(cbs, index) {
        index = index || 0;
        if (index >= cbs.length) return Promise.resolve(void 0);
        var _curCb = cbs[index],
            ret;
        return new Promise(function (resolve, reject) {
          try {
            // async function => Promise
            ret = _curCb.apply(_this, args);
            resolve(ret);
          } catch (error) {
            reject(error);
          }
        }).then(function (ret) {
          if (ret === false) return false;else if (is.isArray(ret)) args = ret; // continue

          return _startChainInvoke(cbs, index + 1);
        });
      };

      return _startChainInvoke(_self._before).then(function (res) {
        if (res === false) _continue = false;else return _self.target.apply(_this, args);
      }).then(function (res) {
        if (!_continue) return res; // 执行 ret 返回后，_after 不需要返回，因此直接 () => res 即可
        else _startChainInvoke(_self._after).then(function () {
            return res;
          });
      });
    };
  },

  get $runner() {
    var _self = this;

    return function () {
      var args = arguments,
          ret;

      for (var i = 0; i < _self._before.length; i++) {
        ret = _self._before[i].apply(this, args); // stop

        if (ret === false) return;else if (is.isArray(ret)) args = ret;
      }

      var res = _self.target.apply(this, args);

      for (var j = 0; j < _self._after.length; j++) {
        ret = _self._after[j].apply(this, args); // jump to res

        if (ret === false) break;else if (is.isArray(ret)) args = ret;
      }

      return res;
    };
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
 * .$runner
 *
 * _log('this is our msg')
 *
 *
 * @param target 被拦截的 function
 */

var intercepter = function intercepter(target) {
  if (target.intercepted) return;
  return new IntercepterRunnerContainer(target);
};

var PromisifyContainer = Deferred.$extends({
  $ctor: function $ctor(fun, thisArg, args) {
    this.$super();

    var _self = this;

    var _cb = function _cb(err, data) {
      if (err) _self.reject(err);

      _self.resolve(data);
    };

    var _newArgs = Array.prototype.slice.call(args).concat(_cb);

    fun.apply(thisArg, _newArgs);
  }
});

var promisify = function promisify(fun) {
  if (!(typeof fun === 'function')) {
    throw new SyntaxError('promisify must receive a node-callback-style function.');
  }

  return function () {
    var thisArg = this;
    return new PromisifyContainer(fun, thisArg, arguments);
  };
};

var helper = {
  intercepter: intercepter,
  promisify: promisify
};

var index$1 = /*#__PURE__*/Object.freeze({
  helper: helper
});

exports.core = index;
exports.functional = index$1;
/** Follow me: @qddegtya (https://github.com/qddegtya) */
