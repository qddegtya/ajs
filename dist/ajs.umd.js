/** AJS (1.0.19): 💗 A collection of utility libraries used by @qddegtya */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.AJS = {}));
}(this, (function (exports) { 'use strict';

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

  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct.bind();
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var string = Object.prototype.toString;
  var typeToString = (function (o) {
    return string.call(o);
  });

  function isArray(obj) {
    return typeToString(obj) == '[object Array]';
  }

  function isObject(obj) {
    var type = _typeof(obj);

    return obj != null && (type == 'object' || type == 'function');
  }

  function isFunction(obj) {
    if (!isObject(obj)) return false;
    var objType = typeToString(obj);
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

  var hasOwnProp = (function (target, key) {
    return Object.prototype.hasOwnProperty.call(target, key);
  });



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
    return {
      $ctor: function $ctor() {
        // private
        this._done = false;
        var self = this; // promise 延迟执行容器

        this._promise = new Promise(function (resolve, reject) {
          self._resolve = resolve, self._reject = reject;
        });
      },
      resolve: function resolve(o) {
        this._done = true;

        this._resolve(o);
      },
      reject: function reject(o) {
        this._done = true, this._reject(o);
      },

      get isDone() {
        return this._done;
      },

      then: function then() {
        return Promise.prototype.then.apply(this._promise, arguments);
      },
      "catch": function _catch() {
        return Promise.prototype["catch"].apply(this._promise, arguments);
      },
      done: function done() {
        // 先将 onFulfill, onReject 扔入容器
        var promise = arguments.length ? this.promise.then.apply(this._promise, arguments) : this._promise; // 执行最后的 done 操作，模拟正常返回 undefined
        // 异常直接抛出，可由后续的 catch 继续捕获，但 done 不处理

        promise.then(void 0, function (err) {
          setTimeout(function () {
            throw err;
          }, 0);
        });
      }
    };
  });

  var mixin = function mixin() {
    var mixins = arguments;
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
          if (hasOwnProp(_currentMixinSrc, k) && k !== 'constructor') {
            if (!hasOwnProp(target.prototype, k)) {
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

  var index$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    base: base,
    decorators: decorators
  });

  // proxy: __call__

  var IntercepterRunnerContainer = base.Class({
    $ctor: function $ctor(target) {
      this.target = target;
      this._before = [];
      this._after = [];
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
            if (ret === false) return false;else if (isArray(ret)) args = ret; // continue

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

          if (ret === false) return;else if (isArray(ret)) args = ret;
        }

        var res = _self.target.apply(this, args);

        for (var j = 0; j < _self._after.length; j++) {
          ret = _self._after[j].apply(this, args); // jump to res

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

  var intercepter = function intercepter(target) {
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

  var sleep = (function (ms) {
    // eslint-disable-next-line
    return new Promise(function (a, _) {
      setTimeout(a, ms);
    });
  });

  var SENTRY_ERROR_MSG = '@@__JUST_ONE_SENTRY_ERROR__';

  function tryNext(func) {
    var patchedFunc = function patchedFunc() {
      try {
        func.apply(void 0, arguments); // sentry ^HAHA

        throw new Error(SENTRY_ERROR_MSG);
      } catch (error) {
        if (error.message === SENTRY_ERROR_MSG) ; else {
          // !!!call next patched-FUNCTION when catch some error
          patchedFunc.nextChainFunc && patchedFunc.nextChainFunc.apply(patchedFunc, arguments);
        }
      }
    };

    patchedFunc.tryNext = function (nextTryFunc) {
      patchedFunc.nextChainFunc = tryNext(nextTryFunc);
      return patchedFunc.nextChainFunc;
    };

    return patchedFunc;
  }

  // promise is not lazy
  // @see https://github.com/sindresorhus/p-lazy
  var PLazy = /*#__PURE__*/function (_Promise) {
    _inherits(PLazy, _Promise);

    var _super = _createSuper(PLazy);

    function PLazy(executor) {
      var _this;

      _classCallCheck(this, PLazy);

      _this = _super.call(this, function (resolve) {
        resolve();
      });
      _this._executor = executor;
      _this._promise = null;
      return _this;
    }

    _createClass(PLazy, [{
      key: "then",
      value: function then(onFulfilled, onRejected) {
        this._promise = this._promise || new Promise(this._executor);
        return this._promise.then(onFulfilled, onRejected);
      }
    }, {
      key: "catch",
      value: function _catch(onRejected) {
        this._promise = this._promise || new Promise(this._executor);
        return this._promise["catch"](onRejected);
      }
    }], [{
      key: "from",
      value: function from(fn) {
        return new PLazy(function (resolve) {
          resolve(fn());
        });
      }
    }]);

    return PLazy;
  }( /*#__PURE__*/_wrapNativeSuper(Promise));

  // class Suber
  var Suber = /*#__PURE__*/function () {
    function Suber(name, context) {
      _classCallCheck(this, Suber);

      this.name = name;
      this._context = context;
      this._pubers = {};
    }

    _createClass(Suber, [{
      key: "rss",
      value: function rss(puber, _rss) {
        // TODO
        // check rss
        if (!(puber instanceof Puber)) {
          throw new Error('puber must be instanceof Puber.');
        }

        var _currentPuber = this._pubers[puber.name];
        _rss = Array.isArray(_rss) ? _rss : [_rss];

        if (_currentPuber) {
          _currentPuber.rss.concat(_rss);
        } else {
          this._pubers[puber.name] = {
            puber: puber,
            rss: _rss
          };
        }

        return this;
      }
    }]);

    return Suber;
  }(); // class Puber


  var Puber = /*#__PURE__*/function () {
    function Puber(name, context) {
      _classCallCheck(this, Puber);

      this.name = name;
      this._context = context;
      this._subers = {};
    }

    _createClass(Puber, [{
      key: "addSuber",
      value: function addSuber(suber) {
        if (this._subers[suber.name]) {
          throw new Error('This suber has already exists, it can not rss [' + this.name + '] again.');
        }

        this._subers[suber.name] = suber;
      }
    }, {
      key: "pub",
      value: function pub(msg, payload) {
        var _this = this;

        var _loop = function _loop(suberKey) {
          // find self
          var self = _this._subers[suberKey]._pubers[_this.name]; // find cache handler

          var cacheHandler = self.cacheRss && self.cacheRss[msg];

          if (cacheHandler) {
            cacheHandler.call(self._context, payload);
          } else {
            self.rss.forEach(function (rss) {
              if (rss.msg === msg) {
                // exec first
                rss.handler.call(self._context, payload); // create cache area

                if (!self.cacheRss) {
                  self.cacheRss = {};
                } // add cache


                self.cacheRss[msg] = rss.handler;
              }
            });
          }
        };

        for (var suberKey in this._subers) {
          _loop(suberKey);
        }
      }
    }]);

    return Puber;
  }();

  var PS = {
    Puber: Puber,
    Suber: Suber
  };

  var Dep = function Dep() {
    var graph = {};

    var Node = function Node(clz) {
      var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return {
        clz: clz,
        deps: deps
      };
    };

    return {
      set: function set(k, clz) {
        graph[k] = Node(clz);
      },
      // TODO
      addDep: function addDep() {},
      get: function get(k) {
        return graph[k].clz;
      }
    };
  };

  var dep = Dep();
  var provide = function provide() {
    var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return function (Clz) {
      if (!namespace) throw new Error('[@arice/di]: provide need a namespace.');
      dep.set(namespace, Clz);
      return Clz;
    };
  };
  var injectFactory = function injectFactory() {
    var singleton = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return function () {
      var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (!namespace) throw new Error('[@arice/di]: inject need a namespace.');
      var Clz = dep.get(namespace);

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return singleton ? Clz : _construct(Clz, args);
    };
  };
  var inject = injectFactory();
  inject.singleton = injectFactory(true);

  var helper = {
    intercepter: intercepter,
    promisify: promisify,
    sleep: sleep,
    tryNext: tryNext,
    PLazy: PLazy,
    PS: PS,
    di: {
      provide: provide,
      inject: inject
    }
  };

  var index$2 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    helper: helper
  });

  var compose = (function () {
    for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
      fns[_key] = arguments[_key];
    }

    return function () {
      var args = arguments,
          _self = this;

      if (!fns.length) {
        throw new Error('No function passed');
      }

      var initialVal = fns.splice(0, 1)[0].apply(_self, args);
      return fns.reduce(function (ret, cfn) {
        return cfn.apply(_self, new Array(ret));
      }, initialVal);
    };
  });



  var index$3 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    compose: compose
  });

  var once = function once(pre, current, handler, options) {
    var _this = this;

    var args = Array.prototype.slice.call(arguments);

    if (args.length === 2) {
      handler = current;
      current = pre;
    } // TODO: 根据 EventTarget 生成正则


    var TARGET_EV_REGEXP = /(.*)\.(.*)/;

    var _getEventTargetTuple = function _getEventTargetTuple(et) {
      return TARGET_EV_REGEXP.test(et) ? et.match(TARGET_EV_REGEXP).slice(1, 3) : [];
    };

    var _getTarget = function _getTarget(target) {
      return target === 'window' ? window : window[target];
    };

    var _getEventTargetTuple2 = _getEventTargetTuple(pre),
        _getEventTargetTuple3 = _slicedToArray(_getEventTargetTuple2, 3),
        _1 = _getEventTargetTuple3[0],
        preEvent = _getEventTargetTuple3[1],
        _getEventTargetTuple4 = _getEventTargetTuple3[2],
        preTarget = _getEventTargetTuple4 === void 0 ? _getTarget(_1) : _getEventTargetTuple4;

    var _getEventTargetTuple5 = _getEventTargetTuple(current),
        _getEventTargetTuple6 = _slicedToArray(_getEventTargetTuple5, 3),
        _2 = _getEventTargetTuple6[0],
        currentEvent = _getEventTargetTuple6[1],
        _getEventTargetTuple7 = _getEventTargetTuple6[2],
        currentTarget = _getEventTargetTuple7 === void 0 ? _getTarget(_2) : _getEventTargetTuple7;

    var isSameTe = pre === current;

    var _outerHandler = function _outerHandler(e1) {
      var _proxyHandler = function _proxyHandler(e2) {
        handler.call(_this, e2);
        currentTarget.removeEventListener(currentEvent, isSameTe ? _outerHandler : _proxyHandler, options);
      };

      if (isSameTe) return _proxyHandler.call(_this, e1);
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

  // @experimental
  var TR = function TR(o) {
    var _o = typeof o === 'function' ? o() : o,
        getter = typeof o === 'function' ? o : null,
        notify = null,
        binds = [],
        preOldVal = null,
        preNewVal = null,
        latestVal = _o,
        disposed = false;

    return {
      bind: function bind(r) {
        if (!binds.includes(r)) {
          binds.push(r);
        }
      },
      unbind: function unbind(r) {
        var index = binds.indexOf(r);

        if (index > -1) {
          binds.splice(index, 1);
        }
      },
      get: function get() {
        return latestVal;
      },
      observe: function observe(cb) {
        notify = cb; // 立即执行一次回调

        cb(latestVal);
        return this;
      },
      change: function change() {
        var m = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (o) {
          return o;
        };
        if (disposed) return;
        var oldVal = _o;
        var newVal = getter ? getter() : _o = m(_o);
        latestVal = newVal || oldVal; // 值稳定性检查

        if (preOldVal === oldVal && preNewVal === newVal) return;
        preOldVal = oldVal;
        preNewVal = newVal; // 深度优先遍历

        if (binds.length > 0) {
          binds.forEach(function (r) {
            return r.change();
          });
        } // 触发观察者回调


        notify && notify(latestVal);
      },
      dispose: function dispose() {
        disposed = true;
        binds.length = 0;
        notify = null;
      }
    };
  };

  TR.compute = function (computation) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // 依赖
      var deps = new Set();
      var isDisposed = false;
      var newR = TR(function () {
        if (isDisposed) return undefined;
        deps.clear();
        return computation.apply(null, args.map(function (arg) {
          deps.add(arg);
          return arg.get();
        }));
      }); // 添加依赖

      args.forEach(function (r) {
        return r.bind(newR);
      }); // 清理函数

      var dispose = function dispose() {
        if (isDisposed) return;
        isDisposed = true; // 先解绑依赖

        deps.forEach(function (dep) {
          return dep.unbind(newR);
        });
        deps.clear(); // 最后处理自身

        newR.dispose();
      };

      return Object.assign(newR, {
        dispose: dispose
      });
    };
  };

  // @experimental
  // Simple template engine based on Tag Function.
  // eslint-disable-next-line
  var T = function T(ctx) {
    return function (strings) {
      for (var _len = arguments.length, keys = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        keys[_key - 1] = arguments[_key];
      }

      return function () {
        for (var _len2 = arguments.length, values = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          values[_key2] = arguments[_key2];
        }

        var dict = values[values.length - 1] || {};
        var result = [strings[0]];
        keys.forEach(function (key, i) {
          var value = Number.isInteger(key) ? values[key] : dict[key];
          result.push(value, strings[i + 1]);
        });
        return result.join('');
      };
    };
  };

  var tpl = {};

  tpl.exec = function (tplStr, ctx) {
    var e = new Function('T', 'ctx', ['return T(ctx)`', tplStr, '`;'].join(''));
    return e(T, ctx)(ctx);
  };

  var ae = (function (entry) {
    var watcher;

    var handle = function handle(watch) {
      watcher = function watcher(handler) {
        return watch(handler);
      };
    };

    var perform = function perform(handler) {
      var ge = watcher(handler);
      return ge.next().value;
    };

    entry(perform, handle);
  });



  var index$5 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    TR: TR,
    tpl: tpl,
    eff: ae
  });

  var MagicString = function MagicString(str) {
    var _string = str;
    if (typeof _string !== 'string') throw new Error('Must be a string.');
    return {
      capitalize: function capitalize() {
        return "".concat(str.charAt(0).toUpperCase()).concat(str.slice(1));
      }
    };
  };



  var index$6 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    MagicString: MagicString
  });

  exports.core = index$1;
  exports.dom = index$4;
  exports.fp = index$3;
  exports.functional = index$2;
  exports.future = index$5;
  exports.internal = index;
  exports.lang = index$6;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
/** Follow me: @qddegtya (https://github.com/qddegtya) */
