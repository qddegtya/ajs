import { is } from '../__internal__'
import { base } from '../core'

// TODO
// proxy: __call__

const IntercepterRunnerContainer = base.Class({
  $ctor: function(target) {
    this.target = target
    this._before = []
    this._after = []
    this.target.intercepted = true
  },

  before: function(_before) {
    this._before.push(_before)
    return this
  },

  after: function(_after) {
    this._after.push(_after)
    return this
  },

  get $asyncRunner() {
    let _self = this

    return function() {
      let args = arguments,
        _continue = true

      const _startChainInvoke = (cbs, index) => {
        index = index || 0

        if (index >= cbs.length) return Promise.resolve(void 0)

        let _curCb = cbs[index],
          ret

        return new Promise((resolve, reject) => {
          try {
            // async function => Promise
            ret = _curCb.apply(this, args)
            resolve(ret)
          } catch (error) {
            reject(error)
          }
        }).then(ret => {
          if (ret === false) return false
          else if (is.isArray(ret)) args = ret

          // continue
          return _startChainInvoke(cbs, index + 1)
        })
      }

      return _startChainInvoke(_self._before)
        .then(res => {
          if (res === false) _continue = false
          else return _self.target.apply(this, args)
        })
        .then(res => {
          if (!_continue) return res
          // 执行 ret 返回后，_after 不需要返回，因此直接 () => res 即可
          else _startChainInvoke(_self._after).then(() => res)
        })
    }
  },

  get $runner() {
    let _self = this

    return function() {
      let args = arguments,
        ret

      for (let i = 0; i < _self._before.length; i++) {
        ret = _self._before[i].apply(this, args)

        // stop
        if (ret === false) return
        else if (is.isArray(ret)) args = ret
      }

      let res = _self.target.apply(this, args)

      for (var j = 0; j < _self._after.length; j++) {
        ret = _self._after[j].apply(this, args)

        // jump to res
        if (ret === false) break
        else if (is.isArray(ret)) args = ret
      }

      return res
    }
  }
})

/**
 * @example
 *
 * // quick start
 * function log (msg) {
 *   console.log(msg)
 * }
 *
 * const _log = intercepter(log)
 * .before((msg) => {
 *   console.log('<====== before ======>')
 * })
 * .after((msg) => {
 *   console.log('<====== after ======>')
 * })
 * .$runner
 *
 * _log('this is our msg')
 *
 *
 * @param target 被拦截的 function
 */
const intercepter = target => {
  return target.intercepted
    ? target.intercepted
    : (target.intercepted = new IntercepterRunnerContainer(target))
}

export default intercepter
