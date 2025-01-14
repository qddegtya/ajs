/**
 * Core module providing fundamental building blocks for AJS
 * 
 * @module core
 * @description Provides the foundational building blocks of AJS, including a powerful class system,
 * deferred promises, and decorators for enhancing classes and methods.
 * 
 * @namespace ClassSystem
 * @property {Object} inheritance - Advanced class inheritance with $extends and $mixins support
 * @property {Object} constructor - Constructor lifecycle management with $ctor
 * @property {Object} methods - Method overriding and super calls
 * @property {Object} static - Static and instance method support
 * 
 * @namespace Decorators
 * @property {Object} functions - Function and class decorators
 * @property {Object} builtin - Built-in decorators like @mixin and @deprecate
 * @property {Object} factory - Custom decorator factory support
 * @property {Object} properties - Method and property decorators
 * 
 * @namespace Deferred
 * @property {Object} promise - Promise-like interface with resolve/reject
 * @property {Object} progress - Progress tracking with notify
 * @property {Object} chain - Chainable then/catch/finally
 * @property {Object} cancel - Cancellation support
 * 
 * @example <caption>Class System with Inheritance</caption>
 * import { base } from 'xajs/core'
 * 
 * const MyClass = base.Class({
 *   $extends: ParentClass,
 *   $mixins: [SomeMixin],
 *   
 *   $ctor() {
 *     this.name = 'example'
 *   },
 *   
 *   method() {
 *     // Method implementation
 *   }
 * })
 * 
 * @example <caption>Using Decorators</caption>
 * import { decorators } from 'xajs/core'
 * 
 * @decorators.mixin
 * class Enhanced {
 *   enhancedMethod() {
 *     // Enhanced functionality
 *   }
 * }
 * 
 * @see {@link https://ajs.dev/docs/core Core Module Documentation}
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
