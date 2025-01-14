/**
 * Experimental Features Module
 * 
 * @module future
 * @description Experimental and cutting-edge features for next-generation JavaScript development.
 * 
 * @namespace ExperimentalFeatures
 * @property {Object} templates - Template rendering engine with reactive updates
 * @property {Object} effects - Advanced effect system for side-effect management
 * @property {Object} reactive - Reactive programming utilities and patterns
 * @property {Object} async - Next-generation async patterns and control
 * @property {Object} experimental - Cutting-edge JavaScript features exploration
 * 
 * @example
 * import { trp, ae } from 'xajs/future'
 * 
 * // Create a template with reactive properties
 * const template = trp`
 *   <div>
 *     <h1>${state.title}</h1>
 *     <p>${state.content}</p>
 *   </div>
 * `
 * 
 * // Use advanced effects
 * ae.effect(() => {
 *   // Side effects automatically tracked and cleaned up
 *   const subscription = api.subscribe(data => {
 *     state.update(data)
 *   })
 *   return () => subscription.unsubscribe()
 * })
 */

import TR from './trp'
import tpl from './tft'
import eff from './ae'

export {
  TR,
  tpl,
  eff
}
