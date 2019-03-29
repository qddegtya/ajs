export default (...fns) => {
  return function() {
    const args = arguments,
      _self = this

    if (!fns.length) {
      throw new Error('No function passed')
    }

    const initialVal = fns.splice(0, 1)[0].apply(_self, args)

    return fns.reduce((ret, cfn) => {
      return cfn.apply(_self, new Array(ret))
    }, initialVal)
  }
}
