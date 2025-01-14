/**
 * Internal Utilities Module
 * 
 * @module internal
 * @description Core internal utilities providing type checking, object manipulation,
 * and shared helper functions. Features comprehensive type detection and safe
 * object operations with performance optimization.
 * 
 * @namespace TypeChecking
 * @property {Object} is - Type checking utilities
 * @property {Function} is.isArray - Array type check
 * @property {Function} is.isObject - Object type check
 * @property {Function} is.isFunction - Function type check
 * @property {Function} is.isBoolean - Boolean type check
 * 
 * @namespace ObjectUtilities
 * @property {Function} assign - Safe object assignment with deep copy
 * @property {Function} hasOwnProp - Safe property existence check
 * 
 * @example <caption>Type Checking</caption>
 * import { is } from 'xajs/internal'
 * 
 * // Array checks
 * console.log(is.isArray([1, 2, 3]))  // true
 * console.log(is.isArray({}))         // false
 * 
 * // Object checks
 * console.log(is.isObject({}))        // true
 * console.log(is.isObject([]))        // false
 * 
 * // Function checks
 * console.log(is.isFunction(() => {}))            // true
 * console.log(is.isFunction(async () => {}))      // true
 * console.log(is.isFunction(function* () {}))     // true
 * 
 * // Boolean checks
 * console.log(is.isBoolean(true))     // true
 * console.log(is.isBoolean(1))        // false
 * 
 * @example <caption>Safe Object Operations</caption>
 * import { assign, hasOwnProp } from 'xajs/internal'
 * 
 * // Safe object assignment
 * const base = { a: 1, b: { c: 2 } }
 * const extension = { b: { d: 3 }, e: 4 }
 * 
 * const result = assign({}, base, extension)
 * console.log(result)
 * // {
 * //   a: 1,
 * //   b: { c: 2, d: 3 },
 * //   e: 4
 * // }
 * 
 * // Safe property checks
 * if (hasOwnProp(result, 'b')) {
 *   console.log('Property exists:', result.b)
 * }
 * 
 * @example <caption>Type-Safe Operations</caption>
 * import { is, assign } from 'xajs/internal'
 * 
 * function safeUpdate(target, source) {
 *   // Type validation
 *   if (!is.isObject(target) || !is.isObject(source)) {
 *     throw new TypeError('Both arguments must be objects')
 *   }
 *   
 *   // Safe assignment with type checking
 *   const result = assign({}, target)
 *   
 *   for (const key in source) {
 *     if (hasOwnProp(source, key)) {
 *       const value = source[key]
 *       
 *       // Type-specific handling
 *       if (is.isArray(value)) {
 *         result[key] = [...value]
 *       } else if (is.isObject(value)) {
 *         result[key] = safeUpdate({}, value)
 *       } else {
 *         result[key] = value
 *       }
 *     }
 *   }
 *   
 *   return result
 * }
 */

import assign from './assign'
import * as is from './is'
import hasOwnProp from './hasOwnProp'

export {
  assign,
  is,
  hasOwnProp
}
