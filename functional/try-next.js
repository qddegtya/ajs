const SENTRY_ERROR_MSG = '@@__JUST_ONE_SENTRY_ERROR__'

function tryNext(func) {
  let patchedFunc = (...args) => {
    try {
      func(...args)
      // sentry ^HAHA
      throw new Error(SENTRY_ERROR_MSG)
    } catch (error) {
      if (error.message === SENTRY_ERROR_MSG) {
        // noop
      } else {
        // !!!call next patched-FUNCTION when catch some error
        patchedFunc.nextChainFunc && patchedFunc.nextChainFunc(...args)
      }
    }
  }

  patchedFunc.tryNext = nextTryFunc => {
    patchedFunc.nextChainFunc = tryNext(nextTryFunc)
    return patchedFunc.nextChainFunc
  }

  return patchedFunc
}

export default tryNext
