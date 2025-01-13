import { BaseParser } from './base';

/**
 * 操作系统解析器
 */
export class OSParser extends BaseParser {
  static patterns = [
    { name: 'iOS', regex: /(?:iPhone|iPad|iPod).*OS (\d+[._]\d+)/i },
    { name: 'Android', regex: /Android (\d+(\.\d+)?)/i },
    { name: 'Windows', regex: /Windows NT (\d+(\.\d+)?)/i },
    { name: 'Mac OS', regex: /Mac OS X (\d+[._]\d+)/i },
    { name: 'Linux', regex: /Linux/i }
  ];

  parse() {
    const result = { name: '', version: '' };

    if (!this.ua) {
      return { os: result };
    }

    for (const pattern of OSParser.patterns) {
      const match = this.ua.match(pattern.regex);
      if (match) {
        result.name = pattern.name;
        result.version = match[1] ? match[1].replace('_', '.') : '';
        break;
      }
    }

    return { os: result };
  }

  getPriority() {
    return 80;
  }

  canParse() {
    return true;
  }
}
