/**
 * Experimental Features Module
 * 
 * @module future
 * @description 高级及实验特性包
 * 
 * @namespace ReactiveSystem
 * @property {Function} TR - Reactive value creation with dependency tracking
 * @property {Function} atom - Atomic state container with key identification
 * @property {Function} selector - Derived state computation with caching
 * @property {Function} compute - Multi-source computation with auto-cleanup
 * 
 * @namespace TemplateEngine
 * @property {Function} tft - Template function transformer
 * 
 * @example <caption>Reactive State Management</caption>
 * import { TR } from 'xajs/future'
 * 
 * // Create atomic states
 * const count1 = TR(1)
 * const count2 = TR(2)
 * 
 * // Create computed value
 * const sum = TR.compute((a, b) => a + b)(count1, count2)
 * 
 * // Create derived computation
 * const doubled = TR.compute(s => s * 2)(sum)
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
 * @example <caption>Template Engine</caption>
 * import { tpl } from 'xajs/future'
 * 
 * // template
 * const template = tpl`
 *   <div class="user-card">
 *     <h2>${a}</h2>
 *     <p>${b}</p>
 *     <div class="stats">
 *       ${c}
 *     </div>
 *   </div>
 * `
 * 
 */

import TR from './trp'
import tpl from './tft'
import eff from './ae'

export {
  TR,
  tpl,
  eff
}
