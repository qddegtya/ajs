/* eslint-disable no-console */
// @experimental
const TR = (o) => {
  let _o = typeof o === 'function' ? o() : o,
    getter = typeof o === 'function' ? o : null,
    notify = null,
    binds = [],
    preOldVal = null,
    preNewVal = null,
    latestVal = _o,
    disposed = false

  return {
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

    get() {
      return latestVal
    },

    observe(cb) {
      if (typeof cb !== 'function') {
        console.error('Observer callback must be a function')
        return this
      }
      
      notify = cb
      // 立即执行一次回调
      cb(latestVal)
      return this
    },

    change(m = (o) => o) {
      if (disposed) return
      
      try {
        const oldVal = _o
        const newVal = getter ? getter() : (_o = m(_o))
        
        latestVal = (newVal !== undefined && newVal !== null) ? newVal : oldVal
        
        // 值稳定性检查
        if (preOldVal === oldVal && preNewVal === newVal) return

        preOldVal = oldVal
        preNewVal = newVal

        // 深度优先遍历
        if (binds.length > 0) {
          binds.forEach((r) => r.change())
        }

        // 触发观察者回调
        notify && notify(latestVal)
      } catch (error) {
        console.error('Error in change:', error)
      }
    },

    dispose() {
      disposed = true
      binds.length = 0
      notify = null
    }
  }
}

TR.compute = (computation) => {
  return (...args) => {
    // 依赖
    const deps = new Set()
    let isDisposed = false

    const newR = TR(() => {
      if (isDisposed) return undefined
      deps.clear()
      return computation.apply(
        null,
        args.map(arg => {
          deps.add(arg)
          return arg.get()
        })
      )
    })

    // 添加依赖
    args.forEach(r => r.bind(newR))

    // 清理函数
    const dispose = () => {
      if (isDisposed) return
      isDisposed = true
      // 先解绑依赖
      deps.forEach(dep => dep.unbind(newR))
      deps.clear()
      // 最后处理自身
      newR.dispose()
    }

    return Object.assign(newR, { dispose })
  }
}

export default TR
