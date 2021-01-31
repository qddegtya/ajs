// @experimental
// Simple template engine based on Tag Function.

// eslint-disable-next-line
const T = ctx => (strings, ...keys) => {
  return (...values) => {
    const dict = values[values.length - 1] || {}

    if (keys.length !== Object.keys(dict).length) {
      throw new Error('please check params.')
    }

    const result = [strings[0]]
    keys.forEach((key, i) => {
      const value = Number.isInteger(key) ? values[key] : dict[key]
      result.push(value, strings[i + 1])
    })
    return result.join('')
  }
}

const tpl = {}

tpl.exec = (tplStr, ctx) => {
  const e = new Function('T', 'ctx', ['return T(ctx)`', tplStr, '`;'].join(''))

  return e(T, ctx)(ctx)
}

export default tpl
