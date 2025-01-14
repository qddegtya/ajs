/**
 * AJS - A thoughtfully crafted JavaScript utility library
 * 
 * @module ajs
 * @description A thoughtfully crafted JavaScript utility library that combines classical utilities
 * with modern programming paradigms. It provides a rich set of tools while maintaining a minimal
 * footprint and high flexibility.
 * 
 * @namespace CoreUtilities
 * @property {Object} classSystem - Powerful class system with inheritance and mixins
 * @property {Object} decorators - Flexible decorators for enhancing classes and methods
 * @property {Object} promises - Promise utilities and deferred execution
 * @property {Object} types - Type checking and object manipulation
 * 
 * @namespace DOMManipulation
 * @property {Object} vdom - Lightweight virtual DOM implementation
 * @property {Object} events - Event handling and delegation
 * @property {Object} touch - Mobile-optimized touch events
 * @property {Object} url - URL parsing and manipulation
 * 
 * @namespace FunctionalProgramming
 * @property {Object} composition - Function composition and currying
 * @property {Object} di - Dependency injection system
 * @property {Object} pubsub - Pub/Sub event system
 * @property {Object} promiseUtils - Promise-based utilities
 * 
 * @namespace LanguageExtensions
 * @property {Object} string - Enhanced string manipulation
 * @property {Object} array - Advanced array operations
 * @property {Object} object - Object transformation utilities
 * @property {Object} typeConversion - Type conversion helpers
 * 
 * @example <caption>Class System</caption>
 * import { Class } from 'xajs/core';
 * 
 * const MyClass = Class({
 *   $extends: ParentClass,
 *   $mixins: [SomeMixin],
 *   
 *   $ctor() {
 *     this.name = 'example';
 *   }
 * });
 * 
 * @example <caption>DOM Manipulation</caption>
 * import { h } from 'xajs/dom';
 * 
 * const vnode = h('div', { className: 'container' }, [
 *   h('h1', null, 'Hello AJS!'),
 *   h('button', { onClick: () => alert('Clicked!') }, 'Click Me')
 * ]);
 * 
 * @example <caption>Functional Programming</caption>
 * import { helper } from 'xajs/functional';
 * 
 * const { tryNext } = helper;
 * const result = await tryNext([
 *   async () => await primaryAPI(),
 *   async () => await fallbackAPI()
 * ]);
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
