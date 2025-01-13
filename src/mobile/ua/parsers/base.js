/**
 * 基础解析器接口
 * @interface
 */
export class BaseParser {
  /**
   * @param {string} ua - UserAgent 字符串
   */
  constructor(ua) {
    this.ua = ua
  }

  /**
   * 解析 UserAgent
   * @returns {Object} 解析结果
   */
  parse() {
    throw new Error('Method not implemented')
  }

  /**
   * 获取解析器优先级
   * @returns {number} 优先级，数字越大优先级越高
   */
  getPriority() {
    return 0
  }

  /**
   * 检查是否可以处理该 UserAgent
   * @returns {boolean} 是否可以处理
   */
  canParse() {
    return false
  }
}
