export default (target, key) => {
  return Object.prototype.hasOwnProperty.call(target, key)
}
