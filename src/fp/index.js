/**
 * Functional Programming Core Module
 * 
 * @module fp
 * @description Core functional programming utilities focusing on pure function
 * composition, point-free programming, and immutable data handling. Features
 * optimized composition chains with async support and type safety.
 * 
 * @namespace FunctionalCore
 * @property {Object} composition - Function composition with type checking
 * @property {Object} pointfree - Point-free programming utilities
 * @property {Object} currying - Advanced function currying
 * @property {Object} immutable - Immutable data structures
 * 
 * @example <caption>Function Composition</caption>
 * import { compose, composeAsync } from 'xajs/fp'
 * 
 * // Synchronous composition
 * const enhance = compose(
 *   addTimestamp,
 *   validate,
 *   normalize
 * )
 * 
 * // With type checking
 * const result = enhance({ name: 'example' })
 * 
 * // Async composition with error handling
 * const pipeline = composeAsync(
 *   async data => {
 *     const validated = await validate(data)
 *     if (!validated.success) {
 *       throw new ValidationError(validated.errors)
 *     }
 *     return validated.data
 *   },
 *   async record => {
 *     const normalized = await normalize(record)
 *     return {
 *       ...normalized,
 *       timestamp: Date.now()
 *     }
 *   }
 * )
 * 
 * @example <caption>Point-free Programming</caption>
 * import { pipe, curry } from 'xajs/fp'
 * 
 * // Create a point-free data transformation
 * const processUser = pipe(
 *   prop('user'),
 *   when(hasRole('admin'), addAdminFlag),
 *   over(lensProp('permissions'), map(normalize)),
 *   assoc('lastAccess', Date.now())
 * )
 * 
 * // Apply the transformation
 * const result = processUser(response)
 */

import { compose, composeAsync } from './compose'

export {
  compose,
  composeAsync
}
