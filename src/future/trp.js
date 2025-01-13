 
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
    if (disposed) return _value
    
    try {
      const oldVal = _value
      const newVal = args[0]
      _value = typeof newVal === 'function' ? newVal(_value) : newVal
      
      // 值稳定性检查
      if (preOldVal === oldVal && preNewVal === _value) return _value

      preOldVal = oldVal
      preNewVal = _value

      // 深度优先遍历，确保绑定的值得到更新
      if (binds.length > 0) {
        binds.forEach((r) => r(_value)) // 直接传递新值
      }

      // 触发观察者回调
      notify && notify(_value)
      
      return _value
    } catch (error) {
      console.error('Error in setter:', error)
      return _value
    }
  }

  // 扩展方法
  return Object.assign(accessor, {
    bind(r) {
      if (!binds.includes(r)) {
        binds.push(r)
        r(_value) // 立即同步值
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

// 计算属性
TR.compute = (computation) => {
  return (...args) => {
    const deps = new Set()
    let isDisposed = false
    let lastValue

    const newR = TR(() => {
      if (isDisposed) return lastValue
      
      try {
        const values = args.map(arg => {
          deps.add(arg)
          return arg()
        })
        
        const result = computation.apply(null, values)
        lastValue = result
        return result
      } catch (error) {
        console.error('Error in computation:', error)
        return lastValue
      }
    })

    args.forEach(r => {
      r.bind(() => {
        if (!isDisposed) {
          const result = computation.apply(null, args.map(arg => arg()))
          newR(result)
        }
      })
    })

    // 初始计算
    const initialResult = computation.apply(null, args.map(arg => arg()))
    newR(initialResult)

    const dispose = () => {
      if (isDisposed) return
      isDisposed = true
      deps.forEach(dep => dep.unbind(newR))
      deps.clear()
    }

    return Object.assign(newR, { dispose })
  }
}

// 扩展 atom API
TR.atom = (config) => {
  const { key, default: defaultValue } = config
  const store = TR(defaultValue)
  store.key = key
  return store
}

// 扩展 selector API
TR.selector = (config) => {
  const { key, get } = config
  return (...args) => {
    const computed = TR.compute(get)(...args)
    computed.key = key
    return computed
  }
}

export default TR

// 为了支持具名导入
export const atom = TR.atom
export const selector = TR.selector
export const compute = TR.compute
