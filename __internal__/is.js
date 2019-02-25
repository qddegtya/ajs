import typeToString from './typeToString'

function isArray(obj) {
  return typeToString(obj) == '[object Array]'
}

function isObject(obj) {
  const type = typeof obj
  return obj != null && (type == 'object' || type == 'function')
}

function isFunction(obj) {
  if (!isObject(obj)) return false

  const objType = typeToString(obj)
  return (
    objType === '[object Function]' ||
    objType === '[object AsyncFunction]' ||
    objType === '[object GeneratorFunction]' ||
    objType === '[object Proxy]'
  )
}

export { isArray, isFunction, isObject }
