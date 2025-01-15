/**
 * Functional programming utilities and patterns
 * 
 * @module functional
 * @description 实用主义相关包
 * 
 * @namespace FunctionComposition
 * @property {Object} intercepter - Function interception with before/after hooks
 * @property {Object} tryNext - Chain-based error handling with fallbacks
 * @property {Object} promisify - Convert callback-style functions to promises
 * @property {Object} sleep - Promise-based delay utilities
 * 
 * @namespace AsyncUtilities
 * @property {Object} PLazy - Lazy promise evaluation with caching
 * @property {Object} PS - Simple pub/sub event system with namespacing
 * @property {Object} retry - Automatic retry with exponential backoff
 * 
 * @namespace DependencyInjection
 * @property {Object} provide - Class-based dependency provider
 * @property {Object} inject - Dependency injection decorator
 * 
 * @example <caption>Function Interception (Sync & Async)</caption>
 * import { helper } from 'xajs/functional'
 * 
 * // Synchronous interception
 * const loggedFetch = helper.intercepter(fetch)
 *   .before(url => {
 *     console.log(`Fetching: ${url}`)
 *   })
 *   .after((url, response) => {
 *     console.log(`Completed: ${url} (${response.status})`)
 *   })
 *   .$runner
 * 
 * // Async interception
 * const cachedFetch = helper.intercepter(fetch)
 *   .before(async url => {
 *     const cached = await cache.get(url)
 *     if (cached) return cached
 *   })
 *   .after(async (url, response) => {
 *     await cache.set(url, response.clone())
 *   })
 *   .$asyncRunner
 * 
 * @example <caption>Pub/Sub System</caption>
 * import { helper } from 'xajs/functional'
 * 
 * const { PS: { Puber, Suber } } = helper
 * 
 * // Create publisher and subscriber
 * class DataService extends Puber {
 *   constructor() {
 *     super('data-service', {})
 *   }
 *   
 *   async fetchData() {
 *     const data = await fetch('/api/data')
 *     this.pub('data:updated', await data.json())
 *   }
 * }
 * 
 * class DataView extends Suber {
 *   constructor(service) {
 *     super('data-view', {})
 *     this.rss(service, [
 *       {
 *         msg: 'data:updated',
 *         handler: this.onDataUpdate.bind(this)
 *       }
 *     ])
 *   }
 *   
 *   onDataUpdate(data) {
 *     this.render(data)
 *   }
 * }
 * 
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
