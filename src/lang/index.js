/**
 * Language Enhancement Module
 * 
 * @module lang
 * @description Advanced language utilities for string manipulation and code generation.
 * 
 * @namespace LanguageUtilities
 * @property {Object} string - String manipulation and transformation
 * @property {Object} language - Enhanced JavaScript language features
 * @property {Object} generation - Code generation utilities
 * @property {Object} dsl - DSL support tools
 * 
 * @example
 * import { MagicString } from 'xajs/lang'
 * 
 * // Create a magic string for code manipulation
 * const code = new MagicString('function hello() { return "world" }')
 * 
 * // Manipulate the code
 * code
 *   .update(8, 13, 'greet')
 *   .append('hello()')
 * 
 * console.log(code.toString())
 * // Output: function greet() { return "world" }hello()
 */

import MagicString from './MagicString'

export {
  MagicString
}
