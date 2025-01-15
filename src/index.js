/**
 * AJS
 * 
 * @module ajs
 * @description 🪄 Just another javascript utility library.
 * 
 * @namespace Core
 * @property {Object} base - 基础核心模块，自定义类，支持类的私有属性、继承等特性
 * @property {Object} decorators - 常用装饰器，deprecate、mixin 等
 * @property {Object} Deferred - Deferred，维护异步模型状态
 * 
 * @namespace DOM
 * @property {Function} h - DOM 创建操作的优雅封装
 * @property {Object} tags - 基于 h 封装常用 html tag 的快速创建方法
 * @property {Object} E - 增强版事件管理
 * @property {Class} UrlParser - 兼容性良好的 URL 解析器
 * 
 * @namespace Functional
 * @property {Object} intercepter - 支持同步、异步两种模式的通用函数拦截器
 * @property {Object} tryNext - 链式调用风格的 try
 * @property {Object} PS - 优雅的发布订阅实现
 * @property {Object} di - 简单实用的 DI 实现
 * 
 * @namespace Future
 * @property {Object} TR - 支持依赖追踪，计算定义、组合的创新响应式
 * @property {Function} atom - 基于 TR 封装的、类似 Recoil Atom 的原子状态
 * @property {Function} selector - 基于 TR 封装的、类似 Recoil selector 的派生状态
 * @property {Object} eff - 基于迭代器特性实现的代数效应
 * @property {Object} tpl - 基于自定义字符串函数实现的简单模板引擎
 * 
 * @namespace Mobile
 * @property {Class} UserAgent - User Agent 解析
 * @property {Object} device - 便捷的 UA 对象「设备属性」访问器
 * @property {Object} browser - 便捷的 UA 对象「浏览器属性」访问器
 * 
 * @namespace Lang
 * @property {Class} MagicString - 支持链式调用的字符串不可变操作类
 * 
 * @namespace Internal
 * @property {Object} is - 对象的类型运行时检查 (isArray, isObject, etc.)
 * @property {Function} assign - 安全对象深拷贝及属性分配
 * @property {Function} hasOwnProp - 安全对象属性嗅探
 * 
 * @example <caption>基础模块</caption>
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
 * @example <caption>高级模块</caption>
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
 * @example <caption>浏览器运行时相关</caption>
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
