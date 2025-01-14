/**
 * Experimental Features Module
 * 
 * @module future
 * @description Cutting-edge experimental features exploring next-generation JavaScript
 * patterns. Includes reactive templates, advanced effect management, and innovative
 * async patterns. Features fine-grained reactivity, automatic dependency tracking,
 * and intelligent resource management.
 * 
 * @namespace ReactiveSystem
 * @property {Function} TR - Reactive value creation with dependency tracking
 * @property {Function} atom - Atomic state container with key identification
 * @property {Function} selector - Derived state computation with caching
 * @property {Function} compute - Multi-source computation with auto-cleanup
 * 
 * @namespace TemplateEngine
 * @property {Function} trp - Reactive template engine with fine-grained updates
 * @property {Function} tft - Template function transformer
 * @property {Function} eff - Effect system with automatic cleanup
 * 
 * @example <caption>Reactive State Management</caption>
 * import { TR } from 'xajs/future'
 * const { atom, selector, compute } = TR
 * 
 * // Create atomic states
 * const count1 = TR(1)
 * const count2 = TR(2)
 * 
 * // Create computed value
 * const sum = compute((a, b) => a + b)(count1, count2)
 * 
 * // Create derived computation
 * const doubled = compute(s => s * 2)(sum)
 * 
 * // Observe changes
 * sum.observe(val => console.log('Sum:', val))     // 3
 * doubled.observe(val => console.log('Double:', val)) // 6
 * 
 * // Update source values
 * count1(v => v + 1) // Sum: 4, Double: 8
 * count2(6)          // Sum: 8, Double: 16
 * 
 * // Cleanup
 * sum.dispose()
 * doubled.dispose()
 * 
 * @example <caption>Advanced State with Atoms</caption>
 * import { TR } from 'xajs/future'
 * const { atom, selector } = TR
 * 
 * // Create base atom
 * const todoAtom = atom({
 *   key: 'todoAtom',
 *   default: {
 *     items: [],
 *     filter: 'all'
 *   }
 * })
 * 
 * // Create derived selectors
 * const filteredTodos = selector({
 *   key: 'filteredTodos',
 *   get: ({ get }) => {
 *     const state = get(todoAtom)
 *     switch (state.filter) {
 *       case 'completed':
 *         return state.items.filter(item => item.completed)
 *       case 'active':
 *         return state.items.filter(item => !item.completed)
 *       default:
 *         return state.items
 *     }
 *   }
 * })
 * 
 * const todoStats = selector({
 *   key: 'todoStats',
 *   get: ({ get }) => {
 *     const items = get(todoAtom).items
 *     return {
 *       total: items.length,
 *       completed: items.filter(item => item.completed).length,
 *       active: items.filter(item => !item.completed).length
 *     }
 *   }
 * })
 * 
 * // Use selectors
 * filteredTodos.observe(todos => {
 *   renderTodoList(todos)
 * })
 * 
 * todoStats.observe(stats => {
 *   updateStatusBar(stats)
 * })
 * 
 * @example <caption>Effect System with Cleanup</caption>
 * import { eff } from 'xajs/future'
 * 
 * // Create reactive effect
 * const cleanup = eff.effect(() => {
 *   const subscription = api.subscribe(data => {
 *     processData(data)
 *   })
 *   
 *   // Effect cleanup
 *   return () => {
 *     subscription.unsubscribe()
 *   }
 * })
 * 
 * // Reactive template with automatic updates
 * const template = eff.template`
 *   <div class="user-card">
 *     <h2>${() => user.name}</h2>
 *     <p>${() => user.bio}</p>
 *     <div class="stats">
 *       ${() => user.stats.map(stat => `
 *         <div class="stat">
 *           <strong>${stat.label}</strong>
 *           <span>${stat.value}</span>
 *         </div>
 *       `).join('')}
 *     </div>
 *   </div>
 * `
 * 
 * // Cleanup when done
 * cleanup()
 */

import TR from './trp'
import tpl from './tft'
import eff from './ae'

export {
  TR,
  tpl,
  eff
}
