import { BaseParser } from './base';

/**
 * 设备解析器
 */
export class DeviceParser extends BaseParser {
  static vendors = [
    { name: 'Apple', regex: /iPhone|iPad|iPod/i },
    { name: 'Samsung', regex: /Samsung|SM-|GT-|SCH-|SGH-/i },
    { name: 'Huawei', regex: /Huawei|HW-|Honor/i },
    { name: 'Xiaomi', regex: /MI[ -]|Redmi|POCO/i },
    { name: 'OPPO', regex: /OPPO|PAAM|PBBM|PBCM/i },
    { name: 'vivo', regex: /vivo/i }
  ];

  parse() {
    const result = { type: '', model: '', vendor: '' };

    if (!this.ua) {
      return { device: result };
    }

    // 设备类型检测
    if (/iPad/i.test(this.ua)) {
      result.type = 'tablet';
    } else if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(this.ua)) {
      result.type = 'mobile';
    } else if (/tablet|Nexus 7|Android(?!.*Mobile)/i.test(this.ua)) {
      result.type = 'tablet';
    } else if (/Mozilla|Chrome|Safari|Firefox|MSIE|Trident/i.test(this.ua)) {
      result.type = 'desktop';
    }

    // 设备厂商检测
    for (const vendor of DeviceParser.vendors) {
      if (vendor.regex.test(this.ua)) {
        result.vendor = vendor.name;
        break;
      }
    }

    // 设备型号检测
    this.parseModel(result);

    return { device: result };
  }

  parseModel(result) {
    const modelMatch = this.ua.match(/\((.*?)\)/);
    if (modelMatch) {
      const modelInfo = modelMatch[1].split(';').map(s => s.trim());
      
      if (result.vendor === 'Apple') {
        const model = modelInfo.find(s => /iPhone|iPad|iPod/.test(s));
        if (model) result.model = model;
      } else if (result.vendor === 'Huawei') {
        const model = modelInfo.find(s => /HW-|Honor/.test(s));
        if (model) result.model = model;
      } else if (result.vendor === 'Xiaomi') {
        const model = modelInfo.find(s => /MI[ -]|Redmi|POCO/.test(s));
        if (model) result.model = model;
      } else {
        const model = modelInfo.find(s => 
          s.includes(result.vendor) || 
          /SM-|GT-|SCH-|SGH-/.test(s)
        );
        if (model) result.model = model;
      }
    }

    // 备用提取方案
    if (!result.model) {
      if (result.vendor === 'Huawei') {
        const hwMatch = this.ua.match(/HW-([^;\s)]+)/i);
        if (hwMatch) result.model = hwMatch[0];
      } else if (result.vendor === 'Xiaomi') {
        const miMatch = this.ua.match(/(MI[ -][^;\s)]+|Redmi[^;\s)]+|POCO[^;\s)]+)/i);
        if (miMatch) result.model = miMatch[0];
      }
    }
  }

  getPriority() {
    return 70;
  }

  canParse() {
    return true;
  }
}
