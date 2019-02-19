/**
 *
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
 * let B = A.$extends(function () {
 *   // private here
 *
 *   // return your option
 *   return {
 *
 *   }
 * })
 *
 * let b = B.$new()
 *
 */
const ClassShape = option => {
  let INSTANCE_PROPERTY_REGEXP = /^\$_[^$_]+/
  let _options = typeof option === 'function' ? option() : option

  let _assign = function(dst, src) {
    for (let k in src) {
      dst[k] = src[k]
    }
  }

  let _assignWithBind = function(thisArg, dst, src) {
    for (let k in src) {
      let val = src[k]
      if (typeof val === 'function') {
        dst[k] = val.bind(thisArg)
      } else {
        dst[k] = val
      }
    }
  }

  let _processOptions = function(option) {
    let $parent = option.$parent,
      $ctor = option.$ctor,
      $static = option.$static || Object.create(null),
      $instance = Object.create(null),
      $prototype = Object.create(null)

    for (let k in option) {
      // 实例上不该访问到这些属性，但可以允许访问到 $ctor
      if (k === '$parent' || k === '$static') {
        continue
      }

      // 实例属性/方法
      if (INSTANCE_PROPERTY_REGEXP.test(k)) {
        $instance[k] = option[k]
        continue
      }

      // 剩下的给原型
      $prototype[k] = option[k]
    }

    return {
      $parent,
      $ctor,
      $static,
      $instance,
      $prototype
    }
  }

  const { $parent, $ctor, $static, $instance, $prototype } = _processOptions(
    _options
  )

  // 父级原型
  let parentPrototype =
    typeof $parent === 'function' ? $parent.prototype : $parent

  let AClass = function() {
    let __super_is_called__ = false,
      ins,
      superThis

    // this.$super()
    this.$super = function() {
      __super_is_called__ = true
      superThis = $parent.apply(this, arguments)
    }

    // 继承的情况下可以省略 $ctor
    if (!$ctor && $parent) {
      ins = $parent.apply(superThis || this, arguments)
    } else {
      ins = $ctor.apply(superThis || this, arguments)

      // 检查 super 调用
      if ($parent && !__super_is_called__ && typeof $parent === 'function') {
        throw new Error('You should call this.$super first before use `this`.')
      }
    }

    // 如果存在继承的情况
    // 处理 this.$super.xx
    if ($parent) {
      _assignWithBind(this, this.$super, parentPrototype)
    }

    // 处理实例属性
    _assignWithBind(this, this, $instance)

    return ins
  }

  // 处理继承
  if ($parent) {
    AClass.prototype = Object.create(parentPrototype)
    AClass.prototype['$class'] = AClass
  }

  // 处理原型挂载
  _assign(AClass.prototype, $prototype)

  // 静态属性和方法的继承
  AClass.__proto__ = $parent
  // 处理静态属性和方法
  _assign(AClass, $static)

  // 标记
  AClass.$parent = $parent

  // chain
  AClass.$extends = function(option) {
    option.$parent = this
    return ClassShape(option)
  }

  // new
  AClass.$new = function() {
    return new AClass()
  }

  return AClass
}

module.exports = ClassShape
