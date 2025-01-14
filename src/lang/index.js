/**
 * Language Enhancement Module
 * 
 * @module lang
 * @description Advanced string manipulation utilities with immutable operations
 * and chainable transformations. Features include case conversion, trimming,
 * pattern matching, and string interpolation.
 * 
 * @namespace StringUtilities
 * @property {Class} MagicString - Immutable string wrapper with chainable operations
 * @property {Function} capitalize - First character capitalization
 * @property {Function} trim - Whitespace removal with custom characters
 * @property {Function} replace - Pattern replacement with function support
 * 
 * @example <caption>Basic String Operations</caption>
 * import { MagicString } from 'xajs/lang'
 * 
 * const str = MagicString('  hello world  ')
 * 
 * // Chain multiple operations
 * const result = str
 *   .trim()
 *   .capitalize()
 *   .replace(/world/, 'AJS')
 * 
 * console.log(result)  // 'Hello AJS'
 * console.log(str)     // Original string unchanged
 * 
 * @example <caption>Advanced Pattern Matching</caption>
 * import { MagicString } from 'xajs/lang'
 * 
 * const text = MagicString('user.name.first')
 * 
 * // Replace with callback
 * const result = text.replace(/\w+/g, (match, index) => {
 *   if (index === 0) return match
 *   return match.toUpperCase()
 * })
 * 
 * console.log(result)  // 'user.NAME.FIRST'
 * 
 * @example <caption>String Transformation</caption>
 * import { MagicString } from 'xajs/lang'
 * 
 * const template = MagicString('Hello, ${name}!')
 * 
 * // Interpolate values
 * const greeting = template.replace(/\${(\w+)}/g, (_, key) => ({
 *   name: 'AJS User'
 * }[key] || ''))
 * 
 * console.log(greeting)  // 'Hello, AJS User!'
 */

import MagicString from './MagicString'

export {
  MagicString
}
