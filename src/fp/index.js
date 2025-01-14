/**
 * Functional Programming Core Module
 * 
 * @module fp
 * @description Core functional programming utilities focusing on pure function composition and immutable data handling.
 * 
 * @namespace FunctionalCore
 * @property {Object} composition - Pure function composition utilities
 * @property {Object} pointfree - Point-free programming support
 * @property {Object} currying - Function currying and partial application
 * @property {Object} immutable - Immutable data handling patterns
 * 
 * @example
 * import { compose } from 'xajs/fp'
 * 
 * // Create a pipeline of pure functions
 * const pipeline = compose(
 *   uppercase,
 *   trim,
 *   normalize
 * )
 * 
 * // Apply the transformation
 * const result = pipeline('  hello world  ')
 */

import { compose, composeAsync } from './compose'

export {
  compose,
  composeAsync
}
