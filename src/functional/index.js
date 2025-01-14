/**
 * Functional programming utilities and patterns
 * 
 * @module functional
 * @description Provides a comprehensive set of functional programming utilities including
 * function composition, currying, dependency injection, pub/sub system, and promise utilities.
 * 
 * @namespace FunctionComposition
 * @property {Object} interceptors - Advanced interceptors for function composition
 * @property {Object} async - Support for async function composition
 * @property {Object} errorHandling - Error handling in composition chains
 * @property {Object} middleware - Middleware pattern support
 * 
 * @namespace DependencyInjection
 * @property {Object} decorators - Decorator-based DI system
 * @property {Object} resolution - Automatic dependency resolution
 * @property {Object} circular - Circular dependency detection
 * @property {Object} scoping - Scoped container support
 * 
 * @namespace EventSystem
 * @property {Object} pubsub - Pub/Sub pattern implementation
 * @property {Object} priority - Event prioritization
 * @property {Object} async - Async event handling
 * @property {Object} cancellation - Event cancellation
 * 
 * @namespace PromiseUtilities
 * @property {Object} lazy - Promise-based lazy evaluation
 * @property {Object} interception - Promise chain interception
 * @property {Object} fallback - Fallback chain with tryNext
 * @property {Object} timeout - Timeout and retry support
 * 
 * @example <caption>Function Composition</caption>
 * import { helper } from 'xajs/functional'
 * 
 * const { intercepter } = helper
 * const enhance = intercepter.compose([
 *   addLogging,
 *   addValidation,
 *   addCaching
 * ])
 * 
 * @example <caption>Dependency Injection</caption>
 * import { helper } from 'xajs/functional'
 * 
 * const { di } = helper
 * 
 * @di.provide('config')
 * class Config {
 *   getApiUrl() { return 'https://api.example.com' }
 * }
 * 
 * @example <caption>Pub/Sub Pattern</caption>
 * import { helper } from 'xajs/functional'
 * 
 * const { PS } = helper
 * const events = new PS()
 * 
 * events.on('userUpdate', user => {
 *   console.log('User updated:', user)
 * })
 * 
 * events.emit('userUpdate', { id: 1, name: 'John' })
 * 
 * @see {@link https://ajs.dev/docs/functional Functional Module Documentation}
 */

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
