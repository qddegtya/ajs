import { BrowserParser, EngineParser, OSParser, DeviceParser } from './parsers'

/**
 * UserAgent 解析器类
 * 支持注册自定义解析器
 */
export class UserAgent {
  static parsers = new Set([
    BrowserParser,
    EngineParser,
    OSParser,
    DeviceParser
  ])

  /**
   * @param {string} [userAgent] - UserAgent 字符串，如果不提供则使用 navigator.userAgent
   */
  constructor(userAgent) {
    this.ua = userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : '')
    this.result = {
      browser: { name: '', version: '' },
      os: { name: '', version: '' },
      device: { type: '', model: '', vendor: '' },
      engine: { name: '', version: '' }
    }
    if (this.ua) {
      this.parse()
    }
  }

  /**
   * 注册新的解析器
   * @param {typeof BaseParser} ParserClass - 解析器类
   */
  static registerParser(ParserClass) {
    UserAgent.parsers.add(ParserClass)
  }

  /**
   * 移除解析器
   * @param {typeof BaseParser} ParserClass - 解析器类
   */
  static unregisterParser(ParserClass) {
    UserAgent.parsers.delete(ParserClass)
  }

  /**
   * 解析 UserAgent 字符串
   * @private
   */
  parse() {
    // 获取所有解析器实例并按优先级排序
    const parsers = Array.from(UserAgent.parsers)
      .map(Parser => new Parser(this.ua))
      .sort((a, b) => b.getPriority() - a.getPriority())

    // 依次执行可用的解析器
    for (const parser of parsers) {
      if (parser.canParse()) {
        const result = parser.parse()
        Object.assign(this.result, result)
      }
    }
  }

  /**
   * 判断是否为移动设备
   * @returns {boolean}
   */
  isMobile() {
    return this.result.device.type === 'mobile'
  }

  /**
   * 判断是否为平板设备
   * @returns {boolean}
   */
  isTablet() {
    return this.result.device.type === 'tablet'
  }

  /**
   * 判断是否为桌面设备
   * @returns {boolean}
   */
  isDesktop() {
    return this.result.device.type === 'desktop'
  }

  /**
   * 判断是否为特定浏览器
   * @param {string} name - 浏览器名称
   * @returns {boolean}
   */
  isBrowser(name) {
    return this.result.browser.name.toLowerCase() === name.toLowerCase()
  }

  /**
   * 判断是否为特定操作系统
   * @param {string} name - 操作系统名称
   * @returns {boolean}
   */
  isOS(name) {
    return this.result.os.name.toLowerCase() === name.toLowerCase()
  }

  /**
   * 获取完整的解析结果
   * @returns {Object} 包含浏览器、操作系统、设备信息的对象
   */
  getResult() {
    return { ...this.result }
  }
}
