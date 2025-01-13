const once = function(pre, current, handler, options) {
  const args = Array.prototype.slice.call(arguments)

  if (args.length === 2) {
    handler = current
    options = undefined
    current = pre
  } else if (args.length === 3 && typeof current === 'function') {
    options = handler
    handler = current
    current = pre
  }

  // TODO: 根据 EventTarget 生成正则
  const TARGET_EV_REGEXP = /(.*)\.(.*)/
  const _getEventTargetTuple = et => {
    if (!et || typeof et !== 'string') return []
    return TARGET_EV_REGEXP.test(et)
      ? et.match(TARGET_EV_REGEXP).slice(1, 3)
      : []
  }

  const _getTarget = target => {
    return target === 'window' ? window : window[target]
  }

  const [_1, preEvent, preTarget = _getTarget(_1)] = _getEventTargetTuple(pre)
  const [
    _2,
    currentEvent,
    currentTarget = _getTarget(_2)
  ] = _getEventTargetTuple(current)

  const isSameTe = pre === current

  const _outerHandler = e1 => {
    const _proxyHandler = e2 => {
      handler.call(this, e2)
      currentTarget.removeEventListener(
        currentEvent,
        isSameTe ? _outerHandler : _proxyHandler,
        options
      )
    }

    if (isSameTe) return _proxyHandler.call(this, e1)

    currentTarget &&
      currentEvent &&
      currentTarget.addEventListener(currentEvent, _proxyHandler, options)
  }

  preTarget &&
    preEvent &&
    preTarget.addEventListener(preEvent, _outerHandler, options)
}

export { once }
