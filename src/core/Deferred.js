import Class from './class'

const Deferred = Class(function() {
  return {
    $ctor: function() {
      // private
      this._done = false
      const self = this

      // promise 延迟执行容器
      this._promise = new Promise(function(resolve, reject) {
        (self._resolve = resolve), (self._reject = reject)
      })
    },

    resolve(o) {
      this._done = true
      this._resolve(o)
    },

    reject(o) {
      (this._done = true), this._reject(o)
    },

    get isDone() {
      return this._done
    },

    then() {
      return Promise.prototype.then.apply(this._promise, arguments)
    },

    catch() {
      return Promise.prototype.catch.apply(this._promise, arguments)
    },

    done() {
      // 先将 onFulfill, onReject 扔入容器
      let promise = arguments.length
        ? this.promise.then.apply(this._promise, arguments)
        : this._promise

      // 执行最后的 done 操作，模拟正常返回 undefined
      // 异常直接抛出，可由后续的 catch 继续捕获，但 done 不处理
      promise.then(void 0, function(err) {
        setTimeout(function() {
          throw err
        }, 0)
      })
    }
  }
})

export default Deferred
