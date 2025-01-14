/**
 * DOM manipulation and event handling utilities
 * 
 * @module dom
 * @description High-performance DOM manipulation with virtual DOM support,
 * optimized event delegation, and unified touch event handling. Features include
 * efficient diffing, batched updates, mobile-first event optimization, and
 * memory leak prevention.
 * 
 * @namespace VirtualDOM
 * @property {Function} h - Hyperscript function for creating virtual DOM elements
 * @property {Object} tags - Helper functions for common HTML elements
 * @property {Object} diff - Optimized diff algorithm with key tracking
 * @property {Object} lifecycle - Component lifecycle with hooks
 * 
 * @namespace EventHandling
 * @property {Object} E - Unified event management system
 * @property {Function} E.once - One-time event binding with cleanup
 * @property {Function} E.delegate - Event delegation with filters
 * @property {Object} touch - Mobile touch event normalization
 * 
 * @namespace URLParsing
 * @property {Class} UrlParser - Advanced URL parsing and manipulation
 * @property {Object} query - Query string handling with arrays
 * @property {Object} path - Path normalization and resolution
 * 
 * @example <caption>Virtual DOM with Tags Helpers</caption>
 * import { h, tags } from 'xajs/dom'
 * 
 * // Using h function directly
 * const vnode = h('div', { className: 'container' }, [
 *   h('header', { key: 'header' }, [
 *     h('h1', null, 'Welcome')
 *   ])
 * ])
 * 
 * // Using tags helpers (more concise)
 * const { div, header, h1, nav, a } = tags
 * 
 * const menu = div({ className: 'container' }, [
 *   header({ key: 'header' }, [
 *     h1(null, 'Welcome'),
 *     nav({ className: 'menu' }, [
 *       a({ href: '#home' }, 'Home'),
 *       a({ href: '#about' }, 'About')
 *     ])
 *   ])
 * ])
 * 
 * @example <caption>Advanced Event Handling</caption>
 * import { E } from 'xajs/dom'
 * 
 * // One-time event handling
 * E.once('window.load', () => {
 *   console.log('App loaded')
 * })
 * 
 * // Event sequence handling
 * E.once(
 *   'window.mouseover',
 *   'window.click',
 *   (e) => {
 *     console.log('Mouse over then clicked')
 *   },
 *   { capture: true }
 * )
 * 
 * // Efficient event delegation
 * const handler = E.delegate('.menu a', {
 *   click: (e, target) => {
 *     e.preventDefault()
 *     const href = target.getAttribute('href')
 *     router.navigate(href)
 *   },
 *   
 *   touchstart: (e, target) => {
 *     target.classList.add('active')
 *   },
 *   
 *   touchend: (e, target) => {
 *     target.classList.remove('active')
 *   }
 * })
 * 
 * // Automatic cleanup
 * E.cleanup(() => {
 *   handler.destroy()
 * })
 * 
 * @example <caption>URL Parsing and Manipulation</caption>
 * import { UrlParser } from 'xajs/dom'
 * 
 * // Create parser instance
 * const parser = new UrlParser('https://example.com/path?q=search&tags[]=js&tags[]=dom')
 * 
 * // Basic URL parts
 * console.log(parser.protocol)  // 'https:'
 * console.log(parser.hostname)  // 'example.com'
 * console.log(parser.pathname)  // '/path'
 * 
 * // Advanced query handling
 * const query = parser.query
 * console.log(query.q)         // 'search'
 * console.log(query.tags)      // ['js', 'dom']
 * 
 * // URL manipulation
 * parser.pathname = '/new-path'
 * parser.addQuery('page', '2')
 * console.log(parser.toString())
 * // 'https://example.com/new-path?q=search&tags[]=js&tags[]=dom&page=2'
 */

import * as E from './E'
import h, { tags } from './h'
import { UrlParser } from './url'

export {
  E,
  h,
  tags,
  UrlParser
}
