const mixin = function mixin() {
  let mixins = arguments

  let _hasOwnProperty = function(target, key) {
    return Object.prototype.hasOwnProperty.call(target, key)
  }

  return function _mixin_decorate(target) {
    let _mixins

    if (mixins.length === 0) {
      _mixins = []
    } else if (mixins.length === 1 && typeof mixins === 'function') {
      _mixins = []
      target = mixins[0]
    } else if (mixins.length === 1 && typeof mixins === 'object') {
      _mixins = [ mixins[0] ]
    } else if (mixins.length > 1) {
      _mixins = mixins
    }

    // handle
    for (let i = 0; i < _mixins.length; i++) {
      let _currentMixinSrc = _mixins[i]

      for (let k in _currentMixinSrc) {
        // when the mixin is X.prototype, we do not assign `X.prototype.constructor` property
        if (_hasOwnProperty(_currentMixinSrc, k) && k !== 'constructor') {
          if (!_hasOwnProperty(target.prototype, k)) {
            let desc = Object.getOwnPropertyDescriptor(_currentMixinSrc, k)

            if (desc) {
              Object.defineProperty(target.prototype, k, desc)
            } else {
              target.prototype[k] = _currentMixinSrc[k]
            }
          }
        }
      }
    }
  }
}

export default mixin
