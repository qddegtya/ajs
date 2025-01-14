/**
 * Internal Utilities Module
 * 
 * @module internal
 * @description Core internal utilities and helper functions used across the library.
 * 
 * @namespace InternalUtilities
 * @property {Object} typeChecking - Type checking and validation utilities
 * @property {Object} objectUtils - Object property manipulation helpers
 * @property {Object} helpers - Common internal helper functions
 * @property {Object} shared - Shared utilities used across other modules
 * 
 * @example
 * import { is, assign } from 'xajs/internal'
 * 
 * // Type checking
 * if (is.string(value)) {
 *   // Handle string type
 * }
 * 
 * // Safe object assignment
 * const merged = assign({}, source, {
 *   newProp: 'value'
 * })
 */

import assign from './assign'
import * as is from './is'
import hasOwnProp from './hasOwnProp'

export {
  assign,
  is,
  hasOwnProp
}
