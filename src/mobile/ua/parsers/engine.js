import { BaseParser } from './base';

/**
 * 引擎解析器
 */
export class EngineParser extends BaseParser {
  static patterns = [
    { name: 'Webkit', regex: /WebKit\/(\d+(\.\d+)+)/i },
    { name: 'Gecko', regex: /Gecko\/(\d+)/i },
    { name: 'Trident', regex: /Trident\/(\d+(\.\d+)?)/i },
    { name: 'Presto', regex: /Presto\/(\d+(\.\d+)+)/i }
  ];

  parse() {
    const result = { name: '', version: '' };

    if (!this.ua) {
      return { engine: result };
    }

    for (const pattern of EngineParser.patterns) {
      const match = this.ua.match(pattern.regex);
      if (match) {
        result.name = pattern.name;
        result.version = match[1];
        break;
      }
    }

    return { engine: result };
  }

  getPriority() {
    return 90;
  }

  canParse() {
    return true;
  }
}
