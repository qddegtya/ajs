const assign = function() {
  let args = arguments,
    thisArg,
    src = [],
    dst

  // dst only
  if (args.length === 1) {
    thisArg = null
    dst = args[0]
    src = []
  }

  // support dst src
  if (args.length === 2) {
    (thisArg = null), (dst = args[0]), (src = [ args[1] ])
  }

  // support thisArg dst [ src ]
  if (args.length >= 3) {
    thisArg = args[0]
    dst = args[1]
    src = Array.prototype.slice.call(args, 2)
  }

  for (let i = 0; i < src.length; i++) {
    let _o = src[i]
    for (let k in _o) {
      if (Object.prototype.hasOwnProperty.call(_o, k)) {
        let val = _o[k]
        if (typeof val === 'function' && thisArg) {
          dst[k] = val.bind(thisArg)
        } else {
          dst[k] = val
        }
      }
    }
  }
}

export default assign
