/**
 * Functional Programming Core Module
 * 
 * @module fp
 * @description 函数式编程类库包
 * 
 * @namespace FunctionalCore
 * @property {Object} composition - Function composition with type checking
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
 */

import { compose, composeAsync } from './compose'

export {
  compose,
  composeAsync
}
