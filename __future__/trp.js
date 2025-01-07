/* eslint-disable no-console */
// @experimental
const TR = (initialValue) => {
  let _value = typeof initialValue === 'function' ? initialValue() : initialValue
  let notify = null
  let binds = []
  let preOldVal = null
  let preNewVal = null
  let disposed = false

  // 创建代理函数
  const accessor = (...args) => {
    // getter
    if (args.length === 0) {
      return _value
    }
    // setter
    if (disposed) return
    
    try {
      const oldVal = _value
      const newVal = args[0]
      _value = typeof newVal === 'function' ? newVal(_value) : newVal
      
      // 值稳定性检查
      if (preOldVal === oldVal && preNewVal === _value) return

      preOldVal = oldVal
      preNewVal = _value

      // 深度优先遍历
      if (binds.length > 0) {
        binds.forEach((r) => r())
      }

      // 触发观察者回调
      notify && notify(_value)
    } catch (error) {
      console.error('Error in setter:', error)
    }
  }

  // 扩展方法
  return Object.assign(accessor, {
    bind(r) {
      if (!binds.includes(r)) {
        binds.push(r)
      }
    },

    unbind(r) {
      const index = binds.indexOf(r)
      if (index > -1) {
        binds.splice(index, 1)
      }
    },

    observe(cb) {
      if (typeof cb !== 'function') {
        console.error('Observer callback must be a function')
        return this
      }
      
      notify = cb
      // 立即执行一次回调
      cb(_value)
      return this
    },

    dispose() {
      disposed = true
      binds.length = 0
      notify = null
    }
  })
}

// 计算属性的实现也相应调整
TR.compute = (computation) => {
  return (...args) => {
    const deps = new Set()
    let isDisposed = false

    const newR = TR(() => {
      if (isDisposed) return undefined
      deps.clear()
      return computation.apply(
        null,
        args.map(arg => {
          deps.add(arg)
          return arg()  // 使用新的调用方式
        })
      )
    })

    // 添加依赖
    args.forEach(r => r.bind(newR))

    // 清理函数
    const dispose = () => {
      if (isDisposed) return
      isDisposed = true
      deps.forEach(dep => dep.unbind(newR))
      deps.clear()
      newR.dispose()
    }

    return Object.assign(newR, { dispose })
  }
}

export default TR
