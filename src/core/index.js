import Class from './class'
import Deferred from './Deferred'
import { mixin, deprecate } from './decorators'

const base = {
  Class,
  Deferred
}

const decorators = {
  mixin,
  deprecate
}

export {
  base,
  decorators
}
