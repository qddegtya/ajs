import intercepter from './intercepter'
import promisify from './promisify'
import sleep from './sleep'
import tryNext from './try-next'
import PLazy from './lazy-p'
import PS from './pub-sub'
import { provide, inject } from './di'

const helper = {
  intercepter,
  promisify,
  sleep,
  tryNext,
  PLazy,
  PS,
  di: {
    provide,
    inject
  }
}

export {
  helper
}
