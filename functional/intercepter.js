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

  // TODO: 支持异步
  // get getAsyncRunner () {},

  getRunner () {
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
 * .getRunner()
 *
 * _log('this is our msg')
 *
 *
 * @param target 被拦截的 function
 */
const intercepter = target => {
  if (target.intercepted) return
  return new IntercepterRunnerContainer(target)
}

export default intercepter
