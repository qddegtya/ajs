import Class from './class'
import Deferred from './Deferred'
import { mixin } from './decorators'

const base = {
  Class,
  Deferred
}

const decorators = {
  mixin
}

export {
  base,
  decorators
}
