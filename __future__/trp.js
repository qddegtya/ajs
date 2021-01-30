// @experimental
const TR = (o) => {
  let _o = typeof o === 'function' ? o() : o,
    getter = typeof o === 'function' ? o : null,
    notify = null,
    binds = [],
    preOldVal = null,
    preNewVal = null,
    latestVal = _o

  return {
    bind(r) {
      binds.push(r)
    },

    get() {
      return latestVal
    },

    observe(cb) {
      notify = cb
      return this
    },

    change(m = (o) => o) {
      const oldVal = _o
      const newVal = getter ? getter() : (_o = m(_o))

      latestVal = newVal || oldVal

      // 值稳定
      if (preOldVal === oldVal && preNewVal === newVal) return

      preOldVal = oldVal
      preNewVal = newVal

      // 深度优先
      // TODO: 拓扑执行
      if (binds.length > 0) {
        binds.forEach((r) => r.change())
      }

      // 回溯
      notify && notify(latestVal)
    },
  }
}

TR.compute = (computation) => {
  return (...args) => {
    const newR = TR(() =>
      computation.apply(
        null,
        args.map((arg) => arg.get())
      )
    )

    // add deps
    args.forEach((r) => r.bind(newR))

    return newR
  }
}

export default TR
