const string = Object.prototype.toString

export default (o) => {
  return string.call(o)
}
