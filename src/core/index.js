/**
 * Core module providing fundamental building blocks for AJS
 * 
 * @module core
 * @description Provides the foundational architecture of AJS, featuring a 
 * lightweight class system with inheritance and mixins, basic decorators, 
 * and a promise-based deferred implementation.
 * 
 * @namespace ClassSystem
 * @property {Function} Class - Base class factory with $extends, $ctor, and $static support
 * @property {Function} $ctor - Constructor lifecycle hook for initialization
 * @property {Function} $extends - Inheritance support with super calls and static inheritance
 * @property {Function} $static - Static member definition with inheritance
 * @property {Function} $mixins - Mixin composition support for code reuse
 * 
 * @namespace Decorators
 * @property {Function} mixin - Class decorator for mixin application
 * @property {Function} deprecate - Method/property deprecation decorator with custom messages
 * 
 * @namespace Deferred
 * @property {Function} Deferred - Promise wrapper with resolve/reject control
 * @property {Function} done - Final promise chain handler with error propagation
 * @property {Function} isDone - Promise state check for completion status
 * 
 * @example <caption>Class Definition with Static Members</caption>
 * import { base } from 'xajs/core'
 * 
 * const MyComponent = base.Class({
 *   $extends: BaseComponent,
 *   
 *   // Static properties and methods
 *   $static: {
 *     defaultConfig: {
 *       theme: 'light'
 *     },
 *     create(config) {
 *       return new this({ ...this.defaultConfig, ...config })
 *     }
 *   },
 *   
 *   // Constructor
 *   $ctor(config) {
 *     this.$super() // Call parent constructor
 *     this.config = config
 *     this.state = { count: 0 }
 *   },
 *   
 *   // Instance methods
 *   increment() {
 *     this.state.count++
 *     this.emit('change', this.state.count)
 *   }
 * })
 * 
 * @example <caption>Mixin and Deprecation</caption>
 * import { decorators } from 'xajs/core'
 * 
 * // Define a mixin
 * const LoggerMixin = {
 *   log(msg) {
 *     console.log(`[${this.constructor.name}] ${msg}`)
 *   }
 * }
 * 
 * // Apply mixin and deprecate old methods
 * @decorators.mixin(LoggerMixin)
 * class MyService {
 *   @decorators.deprecate('Use newMethod() instead', { since: '2.0.0' })
 *   oldMethod() {
 *     return this.newMethod()
 *   }
 *   
 *   newMethod() {
 *     this.log('Operation started')
 *     return this.processData()
 *   }
 * }
 * 
 * @example <caption>Async Operations with Deferred</caption>
 * import { base } from 'xajs/core'
 * 
 * class DataLoader {
 *   async loadData(retryCount = 3) {
 *     const deferred = new base.Deferred()
 *     
 *     try {
 *       // Attempt to load data with retry
 *       for (let i = 0; i < retryCount; i++) {
 *         try {
 *           const response = await fetch('/api/data')
 *           if (!response.ok) throw new Error('API Error')
 *           const data = await response.json()
 *           return deferred.resolve(data)
 *         } catch (err) {
 *           if (i === retryCount - 1) throw err
 *           await new Promise(r => setTimeout(r, 1000 * (i + 1)))
 *         }
 *       }
 *     } catch (err) {
 *       deferred.reject(err)
 *     }
 *     
 *     return deferred
 *       .done() // Ensures unhandled rejections are thrown
 *   }
 *   
 *   isDataLoaded() {
 *     return this.loadData.isDone()
 *   }
 * }
 */

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
