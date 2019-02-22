import Deferred from '../core/Deferred'

const PromisifyContainer = Deferred.$extends({
  $ctor: function(fun, thisArg, args) {
    this.$super()
    let _self = this

    const _cb = function(err, data) {
      if (err) _self.reject(err)
      _self.resolve(data)
    }

    const _newArgs = Array.prototype.slice.call(args).concat(_cb)
    fun.apply(thisArg, _newArgs)
  }
})

const promisify = fun => {
  if (!(typeof fun === 'function')) {
    throw new SyntaxError(
      'promisify must receive a node-callback-style function.'
    )
  }

  return function() {
    let thisArg = this
    return new PromisifyContainer(fun, thisArg, arguments)
  }
}

export default promisify
