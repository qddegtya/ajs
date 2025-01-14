/**
 * DOM manipulation and event handling utilities
 * 
 * @module dom
 * @description Provides a lightweight virtual DOM implementation and utilities for DOM manipulation
 * and event handling, with special optimizations for mobile devices.
 * 
 * @namespace VirtualDOM
 * @property {Object} implementation - Lightweight virtual DOM implementation
 * @property {Object} diff - Efficient diff and patch algorithm
 * @property {Object} lifecycle - Component lifecycle management
 * @property {Object} events - Event delegation support
 * 
 * @namespace EventHandling
 * @property {Object} management - Advanced event management
 * @property {Object} delegation - Event delegation and bubbling
 * @property {Object} touch - Mobile touch event optimization
 * @property {Object} lifecycle - Event once and off support
 * 
 * @namespace URLParsing
 * @property {Object} parser - Robust URL parsing and manipulation
 * @property {Object} query - Query string handling
 * @property {Object} path - Path normalization
 * @property {Object} params - URL parameter extraction
 * 
 * @example <caption>Virtual DOM Creation</caption>
 * import { h } from 'xajs/dom'
 * 
 * const vnode = h('div', { className: 'container' }, [
 *   h('h1', null, 'Hello AJS!'),
 *   h('p', null, 'Welcome to the future of JavaScript.')
 * ])
 * 
 * @example <caption>Event Handling</caption>
 * import { E } from 'xajs/dom'
 * 
 * E.on(element, 'click', event => {
 *   console.log('Clicked:', event.target)
 * })
 * 
 * E.once(element, 'load', event => {
 *   console.log('Loaded once')
 * })
 * 
 * @example <caption>URL Parsing</caption>
 * import { UrlParser } from 'xajs/dom'
 * 
 * const parser = new UrlParser('https://example.com/path?query=value')
 * console.log(parser.pathname) // '/path'
 * console.log(parser.query)    // { query: 'value' }
 * 
 * @see {@link https://ajs.dev/docs/dom DOM Module Documentation}
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
