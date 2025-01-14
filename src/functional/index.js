/**
 * Functional programming utilities and patterns
 * 
 * @module functional
 * @description High-performance functional programming utilities focusing on 
 * function interception, promise-based operations, and dependency injection.
 * Features include function composition, lazy evaluation, pub/sub patterns,
 * and robust error handling.
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
 * @example <caption>Error Handling with tryNext</caption>
 * import { helper } from 'xajs/functional'
 * 
 * const { tryNext, sleep } = helper
 * 
 * // Chain of fallback strategies
 * const getData = tryNext([
 *   // Primary strategy: API call
 *   async () => {
 *     const response = await fetch('/api/data')
 *     if (!response.ok) throw new Error('API failed')
 *     return response.json()
 *   },
 *   // Fallback: Local cache
 *   async () => {
 *     const cached = await localStorage.getItem('api_data')
 *     if (!cached) throw new Error('Cache miss')
 *     return JSON.parse(cached)
 *   },
 *   // Last resort: Default data
 *   () => ({ status: 'offline', data: [] })
 * ])
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
 * @example <caption>Dependency Injection</caption>
 * import { helper } from 'xajs/functional'
 * 
 * const { di } = helper
 * 
 * // Define services with dependencies
 * @di.provide('logger')
 * class Logger {
 *   log(msg) { console.log(msg) }
 * }
 * 
 * @di.provide('api')
 * @di.inject(['logger'])
 * class ApiService {
 *   constructor(logger) {
 *     this.logger = logger
 *   }
 *   
 *   async fetch(url) {
 *     this.logger.log(`Fetching: ${url}`)
 *     return fetch(url).then(r => r.json())
 *   }
 * }
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
