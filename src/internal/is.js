import typeToString from './typeToString'

function isArray(obj) {
  return typeToString(obj) == '[object Array]'
}

function isObject(obj) {
  if (obj === null || typeof obj !== 'object') return false
  return typeToString(obj) === '[object Object]'
}

function isFunction(obj) {
  const objType = typeToString(obj)
  return (
    objType === '[object Function]' ||
    objType === '[object AsyncFunction]' ||
    objType === '[object GeneratorFunction]' ||
    objType === '[object Proxy]'
  )
}

function isBoolean(value) {
  return value === true || value === false ||
    (isObject(value) && typeToString(value) == '[object Boolean]')
}

export { isArray, isFunction, isObject, isBoolean }
