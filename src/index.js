/**
 * AJS - 🚀 A modern JavaScript utility library with minimal footprint and high flexibility ⚡
 * 
 * @module ajs
 * @description A modern, high-performance JavaScript utility library that combines 
 * functional programming with reactive patterns. Features include a lightweight class 
 * system, virtual DOM, pub/sub patterns, and comprehensive mobile device detection.
 * 
 * @namespace Core
 * @property {Object} base - Lightweight class system with inheritance and mixins
 * @property {Object} decorators - Method decorators including deprecation and mixin support
 * @property {Object} Deferred - Enhanced Promise with resolve/reject control
 * 
 * @namespace DOM
 * @property {Function} h - Hyperscript function for virtual DOM creation
 * @property {Object} tags - Helper functions for common HTML elements
 * @property {Object} E - Event management with delegation and one-time binding
 * @property {Class} UrlParser - Advanced URL parsing and manipulation
 * 
 * @namespace Functional
 * @property {Object} intercepter - Function interception with before/after hooks
 * @property {Object} tryNext - Chain-based error handling with fallbacks
 * @property {Object} PS - Pub/sub system with namespacing
 * @property {Object} di - Dependency injection with decorators
 * 
 * @namespace Future
 * @property {Object} TR - Reactive state management with dependency tracking
 * @property {Function} atom - Atomic state container with key identification
 * @property {Function} selector - Derived state computation with caching
 * @property {Object} eff - Effect system with automatic cleanup
 * 
 * @namespace Mobile
 * @property {Class} UserAgent - Advanced device and browser detection
 * @property {Object} device - Device type and vendor detection
 * @property {Object} browser - Browser and version identification
 * 
 * @namespace Lang
 * @property {Class} MagicString - Immutable string operations with chaining
 * 
 * @namespace Internal
 * @property {Object} is - Type checking utilities (isArray, isObject, etc.)
 * @property {Function} assign - Safe object assignment with deep copy
 * @property {Function} hasOwnProp - Safe property existence check
 * 
 * @example <caption>Class System and Events</caption>
 * import { core, dom } from 'xajs'
 * 
 * const Component = core.base.Class({
 *   $extends: BaseComponent,
 *   
 *   $static: {
 *     defaultConfig: { theme: 'light' }
 *   },
 *   
 *   $ctor(config) {
 *     this.$super()
 *     this.config = { ...this.constructor.defaultConfig, ...config }
 *     this.handler = dom.E.delegate('.menu a', {
 *       click: (e, target) => {
 *         e.preventDefault()
 *         this.navigate(target.getAttribute('href'))
 *       }
 *     })
 *   }
 * })
 * 
 * @example <caption>Reactive State Management</caption>
 * import { future, functional } from 'xajs'
 * 
 * // Create atomic state
 * const todoAtom = future.TR.atom({
 *   key: 'todoAtom',
 *   default: { items: [], filter: 'all' }
 * })
 * 
 * // Create derived state
 * const filteredTodos = future.TR.selector({
 *   key: 'filteredTodos',
 *   get: ({ get }) => {
 *     const state = get(todoAtom)
 *     return state.items.filter(item => 
 *       state.filter === 'all' ? true :
 *       state.filter === 'completed' ? item.completed :
 *       !item.completed
 *     )
 *   }
 * })
 * 
 * // Create pub/sub communication
 * const { Puber, Suber } = functional.PS
 * const todoService = new Puber('todos')
 * const todoView = new Suber('view')
 * 
 * todoView.rss(todoService, [{
 *   msg: 'todos:updated',
 *   handler: todos => filteredTodos.observe(renderTodos)
 * }])
 * 
 * @example <caption>Mobile and DOM Utilities</caption>
 * import { mobile, dom } from 'xajs'
 * 
 * // Device detection
 * const ua = new mobile.UserAgent(navigator.userAgent)
 * if (ua.isMobile()) {
 *   if (ua.isOS('iOS')) {
 *     enableIOSFeatures()
 *   }
 * }
 * 
 * // DOM manipulation
 * const { div, nav, a } = dom.tags
 * const menu = div({ className: 'menu' }, [
 *   nav(null, [
 *     a({ href: '#home' }, 'Home'),
 *     a({ href: '#about' }, 'About')
 *   ])
 * ])
 * 
 * // URL parsing
 * const url = new dom.UrlParser(location.href)
 * console.log(url.query.page)
 */

import * as core from './core'
import * as functional from './functional'
import * as fp from './fp'
import * as dom from './dom'
import * as internal from './internal'
import * as future from './future'
import * as lang from './lang'
import * as mobile from './mobile'

export { core, functional, fp, dom, internal, future, lang, mobile }
