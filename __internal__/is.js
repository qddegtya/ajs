import typeToString from './typeToString'

function isArray(obj) {
  return typeToString(obj) == '[object Array]'
}

export {
  isArray
}