import Class from './class'

const Deferred = Class(function() {
  // private
  let _done = false,
    _promise,
    _resolve,
    _reject

  return {
    $ctor: function() {
      // promise 延迟执行容器
      _promise = new Promise(function(resolve, reject) {
        (_resolve = resolve), (_reject = reject)
      })
    },

    resolve(o) {
      _done = true
      _resolve(o)
    },

    reject(o) {
      (_done = true), _reject(o)
    },

    get isDone() {
      return _done
    },

    then() {
      return Promise.prototype.then.apply(_promise, arguments)
    },

    catch() {
      return Promise.prototype.catch.apply(_promise, arguments)
    },

    done() {
      // 先将 onFulfill, onReject 扔入容器
      let promise = arguments.length
        ? _promise.then.apply(_promise, arguments)
        : _promise

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
