/**
 * 从右到左组合多个函数
 * @param {...Function} fns - 要组合的函数列表
 * @returns {Function} 组合后的函数
 * @example
 * compose(f, g, h)(x) => f(g(h(x)))
 */
export const compose = (...fns) => {
  // 类型检查提前到函数开头
  fns.forEach(fn => {
    if (typeof fn !== 'function') {
      throw new TypeError('compose requires functions as arguments')
    }
  })

  // 边界情况：无函数传入
  if (fns.length === 0) {
    return arg => arg
  }
  
  // 边界情况：只有一个函数
  if (fns.length === 1) {
    return fns[0]
  }
  
  // 核心实现：从右到左归约函数
  return fns.reduce((f, g) => (...args) => f(g(...args)))
}

// 更高级的实现，支持异步函数
export const composeAsync = (...fns) => {
  if (fns.length === 0) {
    return arg => arg
  }
  
  return fns.reduce((f, g) => async (...args) => {
    return f(await g(...args))
  })
}
