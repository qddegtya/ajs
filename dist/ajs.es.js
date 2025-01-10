/** AJS (1.0.22): 💗 A collection of utility libraries used by @qddegtya */
const assign = function () {
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
    thisArg = null, dst = args[0], src = [args[1]];
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

const string = Object.prototype.toString;
var typeToString = o => {
  return string.call(o);
};

function isArray(obj) {
  return typeToString(obj) == '[object Array]';
}
function isObject(obj) {
  if (obj === null || typeof obj !== 'object') return false;
  return typeToString(obj) === '[object Object]';
}
function isFunction(obj) {
  const objType = typeToString(obj);
  return objType === '[object Function]' || objType === '[object AsyncFunction]' || objType === '[object GeneratorFunction]' || objType === '[object Proxy]';
}
function isBoolean(value) {
  return value === true || value === false || isObject(value) && typeToString(value) == '[object Boolean]';
}

var is = /*#__PURE__*/Object.freeze({
  __proto__: null,
  isArray: isArray,
  isFunction: isFunction,
  isObject: isObject,
  isBoolean: isBoolean
});

var hasOwnProp = (target, key) => {
  return Object.prototype.hasOwnProperty.call(target, key);
};



var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  assign: assign,
  is: is,
  hasOwnProp: hasOwnProp
});

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
 * // 可以利用闭包进行类私有属性/方法的定义
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
  let _processOptions = function (option) {
    let $parent = option.$parent,
      $ctor = option.$ctor,
      $static = option.$static || Object.create(null),
      $instance = Object.create(null),
      $prototype = Object.create(null);
    for (let k in option) {
      // 属性描述符在此时不能被访问
      if (Object.getOwnPropertyDescriptor(option, k)) continue;

      // 实例上不该访问到这些属性，但可以允许访问到 $ctor
      if (k === '$parent' || k === '$static') {
        continue;
      }

      // 实例属性/方法
      if (INSTANCE_PROPERTY_REGEXP.test(k)) {
        $instance[k] = option[k];
        continue;
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
    };
  };
  const {
    $parent,
    $ctor,
    $static,
    $instance,
    $prototype
  } = _processOptions(_options);
  let parentPrototype = typeof $parent === 'function' ? $parent.prototype : $parent;
  let AClass = function () {
    let __super_is_called__ = false,
      ins,
      superThis;

    // this.$super()
    this.$super = function () {
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
        throw new SyntaxError('You should call this.$super first before use `this`.');
      }
    }

    // 如果存在继承的情况
    // 处理 this.$super 引用
    if ($parent) {
      assign(this, this.$super, parentPrototype);
    }
    return ins;
  };

  // 处理继承
  // TODO: 数组的支持 (?)
  if ($parent) {
    AClass.prototype = Object.create(parentPrototype);
    AClass.prototype['$class'] = AClass;
  }

  // 处理原型挂载
  assign(AClass.prototype, $prototype);

  // 处理属性描述符
  for (let key in _options) {
    let desc = Object.getOwnPropertyDescriptor(_options, key);
    if (desc) {
      Object.defineProperty(AClass.prototype, key, desc);
    }
  }

  // 静态属性和方法的继承
  AClass.__proto__ = $parent;
  // 处理静态属性和方法
  assign(AClass, $static);

  // 标记
  AClass.$parent = $parent;
  AClass.$extends = function (option) {
    option.$parent = this;
    return ClassShape(option);
  };
  return AClass;
};

const Deferred = ClassShape(function () {
  return {
    $ctor: function () {
      // private
      this._done = false;
      const self = this;

      // promise 延迟执行容器
      this._promise = new Promise(function (resolve, reject) {
        self._resolve = resolve, self._reject = reject;
      });
    },
    resolve(o) {
      this._done = true;
      this._resolve(o);
    },
    reject(o) {
      this._done = true, this._reject(o);
    },
    get isDone() {
      return this._done;
    },
    then() {
      return Promise.prototype.then.apply(this._promise, arguments);
    },
    catch() {
      return Promise.prototype.catch.apply(this._promise, arguments);
    },
    done() {
      // 先将 onFulfill, onReject 扔入容器
      let promise = arguments.length ? this.promise.then.apply(this._promise, arguments) : this._promise;

      // 执行最后的 done 操作，模拟正常返回 undefined
      // 异常直接抛出，可由后续的 catch 继续捕获，但 done 不处理
      promise.then(void 0, function (err) {
        setTimeout(function () {
          throw err;
        }, 0);
      });
    }
  };
});

const mixin = function mixin() {
  let mixins = arguments;
  return function _mixin_decorate(target) {
    let _mixins;
    if (mixins.length === 0) {
      _mixins = [];
    } else if (mixins.length === 1 && typeof mixins === 'function') {
      _mixins = [];
      target = mixins[0];
    } else if (mixins.length === 1 && typeof mixins === 'object') {
      _mixins = [mixins[0]];
    } else if (mixins.length > 1) {
      _mixins = mixins;
    }

    // handle
    for (let i = 0; i < _mixins.length; i++) {
      let _currentMixinSrc = _mixins[i];
      for (let k in _currentMixinSrc) {
        // when the mixin is X.prototype, we do not assign `X.prototype.constructor` property
        if (hasOwnProp(_currentMixinSrc, k) && k !== 'constructor') {
          if (!hasOwnProp(target.prototype, k)) {
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
  };
};

const base = {
  Class: ClassShape,
  Deferred
};
const decorators = {
  mixin
};

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  base: base,
  decorators: decorators
});

// TODO
// proxy: __call__

const IntercepterRunnerContainer = base.Class({
  $ctor: function (target) {
    this.target = target;
    this._before = [];
    this._after = [];
  },
  before: function (_before) {
    this._before.push(_before);
    return this;
  },
  after: function (_after) {
    this._after.push(_after);
    return this;
  },
  get $asyncRunner() {
    let _self = this;
    return function () {
      let args = arguments,
        _continue = true;
      const _startChainInvoke = (cbs, index) => {
        index = index || 0;
        if (index >= cbs.length) return Promise.resolve(void 0);
        let _curCb = cbs[index],
          ret;
        return new Promise((resolve, reject) => {
          try {
            // async function => Promise
            ret = _curCb.apply(this, args);
            resolve(ret);
          } catch (error) {
            reject(error);
          }
        }).then(ret => {
          if (ret === false) return false;else if (isArray(ret)) args = ret;

          // continue
          return _startChainInvoke(cbs, index + 1);
        });
      };
      return _startChainInvoke(_self._before).then(res => {
        if (res === false) _continue = false;else return _self.target.apply(this, args);
      }).then(res => {
        if (!_continue) return res;
        // 执行 ret 返回后，_after 不需要返回，因此直接 () => res 即可
        else _startChainInvoke(_self._after).then(() => res);
      });
    };
  },
  get $runner() {
    let _self = this;
    return function () {
      let args = arguments,
        ret;
      for (let i = 0; i < _self._before.length; i++) {
        ret = _self._before[i].apply(this, args);

        // stop
        if (ret === false) return;else if (isArray(ret)) args = ret;
      }
      let res = _self.target.apply(this, args);
      for (var j = 0; j < _self._after.length; j++) {
        ret = _self._after[j].apply(this, args);

        // jump to res
        if (ret === false) break;else if (isArray(ret)) args = ret;
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
const intercepter = target => {
  return new IntercepterRunnerContainer(target);
};

const PromisifyContainer = Deferred.$extends({
  $ctor: function (fun, thisArg, args) {
    this.$super();
    let _self = this;
    const _cb = function (err, data) {
      if (err) _self.reject(err);
      _self.resolve(data);
    };
    const _newArgs = Array.prototype.slice.call(args).concat(_cb);
    fun.apply(thisArg, _newArgs);
  }
});
const promisify = fun => {
  if (!(typeof fun === 'function')) {
    throw new SyntaxError('promisify must receive a node-callback-style function.');
  }
  return function () {
    let thisArg = this;
    return new PromisifyContainer(fun, thisArg, arguments);
  };
};

var sleep = ms => {
  // eslint-disable-next-line
  return new Promise((a, _) => {
    setTimeout(a, ms);
  });
};

const SENTRY_ERROR_MSG = '@@__JUST_ONE_SENTRY_ERROR__';
function tryNext(func) {
  let patchedFunc = (...args) => {
    try {
      func(...args);
      // sentry ^HAHA
      throw new Error(SENTRY_ERROR_MSG);
    } catch (error) {
      if (error.message === SENTRY_ERROR_MSG) ; else {
        // !!!call next patched-FUNCTION when catch some error
        patchedFunc.nextChainFunc && patchedFunc.nextChainFunc(...args);
      }
    }
  };
  patchedFunc.tryNext = nextTryFunc => {
    patchedFunc.nextChainFunc = tryNext(nextTryFunc);
    return patchedFunc.nextChainFunc;
  };
  return patchedFunc;
}

// promise is not lazy
// @see https://github.com/sindresorhus/p-lazy
class PLazy extends Promise {
  constructor(executor) {
    super(resolve => {
      resolve();
    });
    this._executor = executor;
    this._promise = null;
  }
  static from(fn) {
    return new PLazy(resolve => {
      resolve(fn());
    });
  }
  then(onFulfilled, onRejected) {
    this._promise = this._promise || new Promise(this._executor);
    return this._promise.then(onFulfilled, onRejected);
  }
  catch(onRejected) {
    this._promise = this._promise || new Promise(this._executor);
    return this._promise.catch(onRejected);
  }
}

// class Suber
class Suber {
  constructor(name, context) {
    this.name = name;
    this._context = context;
    this._pubers = {};
  }
  rss(puber, rss) {
    // TODO
    // check rss

    if (!(puber instanceof Puber)) {
      throw new Error('puber must be instanceof Puber.');
    }
    const _currentPuber = this._pubers[puber.name];
    rss = Array.isArray(rss) ? rss : [rss];
    if (_currentPuber) {
      _currentPuber.rss.concat(rss);
    } else {
      this._pubers[puber.name] = {
        puber: puber,
        rss: rss
      };
    }
    return this;
  }
}

// class Puber
class Puber {
  constructor(name, context) {
    this.name = name;
    this._context = context;
    this._subers = {};
  }
  addSuber(suber) {
    if (this._subers[suber.name]) {
      throw new Error('This suber has already exists, it can not rss [' + this.name + '] again.');
    }
    this._subers[suber.name] = suber;
  }
  pub(msg, payload) {
    for (let suberKey in this._subers) {
      // find self
      const self = this._subers[suberKey]._pubers[this.name];

      // find cache handler
      const cacheHandler = self.cacheRss && self.cacheRss[msg];
      if (cacheHandler) {
        cacheHandler.call(self._context, payload);
      } else {
        self.rss.forEach(rss => {
          if (rss.msg === msg) {
            // exec first
            rss.handler.call(self._context, payload);

            // create cache area
            if (!self.cacheRss) {
              self.cacheRss = {};
            }

            // add cache
            self.cacheRss[msg] = rss.handler;
          }
        });
      }
    }
  }
}
const PS = {
  Puber,
  Suber
};

const Dep = () => {
  let graph = {};
  const Node = (clz, deps = []) => {
    return {
      clz,
      deps
    };
  };
  return {
    set(k, clz) {
      graph[k] = Node(clz);
    },
    // TODO
    addDep() {},
    get(k) {
      return graph[k].clz;
    }
  };
};
const dep = Dep();
const provide = (namespace = '') => Clz => {
  if (!namespace) throw new Error('[@arice/di]: provide need a namespace.');
  dep.set(namespace, Clz);
  return Clz;
};
const injectFactory = (singleton = false) => (namespace = '', ...args) => {
  if (!namespace) throw new Error('[@arice/di]: inject need a namespace.');
  const Clz = dep.get(namespace);
  return singleton ? Clz : new Clz(...args);
};
const inject = injectFactory();
inject.singleton = injectFactory(true);

const helper = {
  intercepter,
  promisify,
  sleep,
  tryNext,
  PLazy,
  PS,
  di: {
    provide,
    inject
  }
};

var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  helper: helper
});

var compose = (...fns) => {
  return function () {
    const args = arguments,
      _self = this;
    if (!fns.length) {
      throw new Error('No function passed');
    }
    const initialVal = fns.splice(0, 1)[0].apply(_self, args);
    return fns.reduce((ret, cfn) => {
      return cfn.apply(_self, new Array(ret));
    }, initialVal);
  };
};



var index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  compose: compose
});

const once = function (pre, current, handler, options) {
  const args = Array.prototype.slice.call(arguments);
  if (args.length === 2) {
    handler = current;
    current = pre;
  }

  // TODO: 根据 EventTarget 生成正则
  const TARGET_EV_REGEXP = /(.*)\.(.*)/;
  const _getEventTargetTuple = et => {
    return TARGET_EV_REGEXP.test(et) ? et.match(TARGET_EV_REGEXP).slice(1, 3) : [];
  };
  const _getTarget = target => {
    return target === 'window' ? window : window[target];
  };
  const [_1, preEvent, preTarget = _getTarget(_1)] = _getEventTargetTuple(pre);
  const [_2, currentEvent, currentTarget = _getTarget(_2)] = _getEventTargetTuple(current);
  const isSameTe = pre === current;
  const _outerHandler = e1 => {
    const _proxyHandler = e2 => {
      handler.call(this, e2);
      currentTarget.removeEventListener(currentEvent, isSameTe ? _outerHandler : _proxyHandler, options);
    };
    if (isSameTe) return _proxyHandler.call(this, e1);
    currentTarget && currentEvent && currentTarget.addEventListener(currentEvent, _proxyHandler, options);
  };
  preTarget && preEvent && preTarget.addEventListener(preEvent, _outerHandler, options);
};

var E = /*#__PURE__*/Object.freeze({
  __proto__: null,
  once: once
});



var index$4 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  E: E
});

/* eslint-disable no-console */
// @experimental
const TR = initialValue => {
  let _value = typeof initialValue === 'function' ? initialValue() : initialValue;
  let notify = null;
  let binds = [];
  let preOldVal = null;
  let preNewVal = null;
  let disposed = false;

  // 创建代理函数
  const accessor = (...args) => {
    // getter
    if (args.length === 0) {
      return _value;
    }
    // setter
    if (disposed) return _value;
    try {
      const oldVal = _value;
      const newVal = args[0];
      _value = typeof newVal === 'function' ? newVal(_value) : newVal;

      // 值稳定性检查
      if (preOldVal === oldVal && preNewVal === _value) return _value;
      preOldVal = oldVal;
      preNewVal = _value;

      // 深度优先遍历，确保绑定的值得到更新
      if (binds.length > 0) {
        binds.forEach(r => r(_value)); // 直接传递新值
      }

      // 触发观察者回调
      notify && notify(_value);
      return _value;
    } catch (error) {
      console.error('Error in setter:', error);
      return _value;
    }
  };

  // 扩展方法
  return Object.assign(accessor, {
    bind(r) {
      if (!binds.includes(r)) {
        binds.push(r);
        r(_value); // 立即同步值
      }
    },
    unbind(r) {
      const index = binds.indexOf(r);
      if (index > -1) {
        binds.splice(index, 1);
      }
    },
    observe(cb) {
      if (typeof cb !== 'function') {
        console.error('Observer callback must be a function');
        return this;
      }
      notify = cb;
      // 立即执行一次回调
      cb(_value);
      return this;
    },
    dispose() {
      disposed = true;
      binds.length = 0;
      notify = null;
    }
  });
};

// 计算属性
TR.compute = computation => {
  return (...args) => {
    const deps = new Set();
    let isDisposed = false;
    let lastValue;
    const newR = TR(() => {
      if (isDisposed) return lastValue;
      try {
        const values = args.map(arg => {
          deps.add(arg);
          return arg();
        });
        const result = computation.apply(null, values);
        lastValue = result;
        return result;
      } catch (error) {
        console.error('Error in computation:', error);
        return lastValue;
      }
    });
    args.forEach(r => {
      r.bind(() => {
        if (!isDisposed) {
          const result = computation.apply(null, args.map(arg => arg()));
          newR(result);
        }
      });
    });

    // 初始计算
    const initialResult = computation.apply(null, args.map(arg => arg()));
    newR(initialResult);
    const dispose = () => {
      if (isDisposed) return;
      isDisposed = true;
      deps.forEach(dep => dep.unbind(newR));
      deps.clear();
    };
    return Object.assign(newR, {
      dispose
    });
  };
};

// 扩展 atom API
TR.atom = config => {
  const {
    key,
    default: defaultValue
  } = config;
  const store = TR(defaultValue);
  store.key = key;
  return store;
};

// 扩展 selector API
TR.selector = config => {
  const {
    key,
    get
  } = config;
  return (...args) => {
    const computed = TR.compute(get)(...args);
    computed.key = key;
    return computed;
  };
};

// @experimental
// Simple template engine based on Tag Function.

// eslint-disable-next-line
const T = ctx => (strings, ...keys) => {
  return (...values) => {
    const dict = values[values.length - 1] || {};
    const result = [strings[0]];
    keys.forEach((key, i) => {
      const value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  };
};
const tpl = {};
tpl.exec = (tplStr, ctx) => {
  const e = new Function('T', 'ctx', ['return T(ctx)`', tplStr, '`;'].join(''));
  return e(T, ctx)(ctx);
};

var ae = entry => {
  let watcher;
  const handle = watch => {
    watcher = handler => watch(handler);
  };
  const perform = handler => {
    const ge = watcher(handler);
    return ge.next().value;
  };
  entry(perform, handle);
};



var index$5 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  TR: TR,
  tpl: tpl,
  eff: ae
});

const MagicString = str => {
  let _string = str;
  if (typeof _string !== 'string') throw new Error('Must be a string.');
  return {
    capitalize() {
      return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
    }
  };
};



var index$6 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  MagicString: MagicString
});

export { index$1 as core, index$4 as dom, index$3 as fp, index$2 as functional, index$5 as future, index as internal, index$6 as lang };
/** Follow me: @qddegtya (https://github.com/qddegtya) */
