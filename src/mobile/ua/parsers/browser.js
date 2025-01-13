import { BaseParser } from './base';

/**
 * 浏览器解析器
 */
export class BrowserParser extends BaseParser {
  static patterns = [
    { name: 'Edge', regex: /Edge?\/(\d+(\.\d+)+)/i },
    { name: 'Chrome', regex: /Chrome\/(\d+(\.\d+)+)/i },
    { name: 'Firefox', regex: /Firefox\/(\d+(\.\d+)+)/i },
    { name: 'Safari', regex: /Version\/(\d+(\.\d+)+).+Safari/i },
    { name: 'IE', regex: /(?:MSIE |Trident\/.*rv:)(\d+(\.\d+)?)/i },
    { name: 'Opera', regex: /(?:Opera|OPR)\/(\d+(\.\d+)+)/i }
  ];

  parse() {
    const result = { name: '', version: '' };

    if (!this.ua) {
      return { browser: result };
    }

    for (const pattern of BrowserParser.patterns) {
      const match = this.ua.match(pattern.regex);
      if (match) {
        result.name = pattern.name;
        result.version = match[1];
        break;
      }
    }

    return { browser: result };
  }

  getPriority() {
    return 100;
  }

  canParse() {
    return true;
  }
}
