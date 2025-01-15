import { formatCode } from './formatter.mjs';
import { replaceContent } from './content.mjs';
import { PLACEHOLDERS } from './config.mjs';
import * as logger from './logger.mjs';

function cleanDescription(description, moduleName) {
  if (!description) {
    return '';
  }
  
  // 移除前后空格
  let cleanDesc = description.trim();
  
  // 如果描述为空，直接返回
  if (!cleanDesc) {
    return '';
  }
  
  // 如果描述以模块名开头，移除模块名
  if (moduleName && cleanDesc.toLowerCase().startsWith(moduleName.toLowerCase())) {
    cleanDesc = cleanDesc.substring(moduleName.length).trim();
  }
  
  // 移除多余的空格
  cleanDesc = cleanDesc.replace(/\s+/g, ' ');
  
  return cleanDesc;
}

function getModuleDescription(meta, moduleName) {
  // 如果没有 meta 或 info，返回默认描述
  if (!meta?.info) {
    return `${moduleName} module`;
  }

  const { description, namespaces, features } = meta.info;

  // 1. 优先使用模块描述
  if (description) {
    // 如果描述以模块名开头，移除模块名
    const cleanDesc = description.startsWith(moduleName) ? 
      description.substring(moduleName.length).trim() : description;
    return cleanDesc;
  }

  // 2. 尝试从命名空间获取描述
  if (namespaces && Object.keys(namespaces).length > 0) {
    const mainNamespace = Object.values(namespaces)[0];
    if (mainNamespace?.properties) {
      const mainProperty = Object.values(mainNamespace.properties)[0];
      if (mainProperty?.description) {
        return `Provides ${mainProperty.description.toLowerCase()}`;
      }
    }
  }

  // 3. 尝试从特性获取描述
  if (features?.length > 0) {
    const firstFeature = features[0];
    if (typeof firstFeature === 'string') {
      return firstFeature;
    }
    if (firstFeature?.description) {
      return `Provides ${firstFeature.description.toLowerCase()}`;
    }
  }

  // 4. 使用默认描述
  return `${moduleName} module`;
}

function generateSection(title, content) {
  return content ? `### ${title}\n\n${content.trim()}\n\n` : '';
}

export function generateFeatures(meta) {
  if (!meta?.info) {
    return '';
  }

  // 收集所有特性
  const features = new Set();
  
  // 不再从描述中提取特性，因为描述通常是模块的总体介绍
  // 只从命名空间和属性中提取特性
  if (meta.info.namespaces) {
    Object.entries(meta.info.namespaces).forEach(([namespace, data]) => {
      Object.entries(data.properties).forEach(([propName, prop]) => {
        features.add(`${namespace}.${propName}: ${prop.description}`);
      });
    });
  }
  
  // 添加明确定义的特性
  if (meta.info.features?.length) {
    meta.info.features.forEach(feature => {
      if (typeof feature === 'string' && !feature.includes(meta.info.name)) {
        // 确保特性不是模块名称的重复
        features.add(feature);
      } else if (feature.namespace && feature.property && feature.description) {
        features.add(`${feature.namespace}.${feature.property}: ${feature.description}`);
      }
    });
  }
  
  // 添加导出项
  if (meta.info.exports?.length) {
    const exports = meta.info.exports
      .filter(exp => !exp.startsWith('_')) // 过滤内部导出
      .sort();
    if (exports.length) {
      features.add(`Available exports: ${exports.join(', ')}`);
    }
  }

  // 转换为数组并格式化
  return Array.from(features)
    .filter(Boolean)
    .filter(feature => {
      // 过滤掉包含模块描述的特性
      const description = meta.info.description || '';
      return !description.includes(feature) && !feature.includes(description);
    })
    .map(feature => `- ${feature}`)
    .join('\n');
}

export function generateModulesTable(moduleMetas) {
  const headers = '## Available Modules\n\n| Module | Description | Import Path |\n|---------|-------------|-------------|\n';
  
  // 改进的模块过滤和处理逻辑
  const uniqueModules = new Map();
  
  moduleMetas
    .filter(meta => {
      const parts = meta.path.split('/');
      // 只处理直接位于模块根目录下的 index.js 文件
      return parts.length === 2 && parts[1] === 'index.js';
    })
    .forEach(meta => {
      const pathParts = meta.path.split('/');
      const moduleName = pathParts[0];
      
      // 跳过内部模块和根目录的 index.js
      if (moduleName.startsWith('_') || 
          moduleName === 'internal' || 
          meta.path === 'index.js') {
        return;
      }
      
      const description = meta.info?.description || '';
      uniqueModules.set(moduleName, {
        name: moduleName,
        description: cleanDescription(description, moduleName),
        importPath: moduleName
      });
    });

  const rows = Array.from(uniqueModules.values())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(module => {
      return `| ${module.name} | ${module.description} | \`xajs/${module.importPath}\` |`;
    })
    .join('\n');

  return headers + rows + '\n';
}

export async function generateModuleDetails(moduleMetas) {
  // 过滤和去重模块
  const uniqueModules = new Map();
  moduleMetas
    .filter(meta => !meta.path.includes('/ua/'))
    .forEach(meta => {
      const name = meta.path.split('/')[0];
      if (name === 'index.js') return; // Skip root index.js
      
      const isIndex = meta.path.endsWith('index.js');
      const moduleName = isIndex ? name : meta.path.replace(/\.js$/, '');
      
      if (!uniqueModules.has(moduleName) || isIndex) {
        const description = cleanDescription(meta.info?.description || '', moduleName);
        uniqueModules.set(moduleName, {
          ...meta,
          info: {
            ...meta.info,
            description
          }
        });
      }
    });

  const detailsPromises = Array.from(uniqueModules.values()).map(async meta => {
    const name = meta.path.split('/')[0];
    const sections = [];

    // 模块描述
    if (meta.info?.description) {
      sections.push(`## ${name}\n\n${meta.info.description.trim()}\n`);
    }

    // 特性列表
    if (meta.info?.features?.length) {
      sections.push(`### Features\n\n${generateFeatures(meta)}\n`);
    }

    // 示例代码
    if (meta.info?.examples?.length) {
      sections.push(`### Examples\n`);
      for (const example of meta.info.examples) {
        const code = await formatCode(example.code);
        if (example.caption) {
          sections.push(`**${example.caption}**\n`);
        }
        sections.push(`\`\`\`javascript\n${code.trim()}\n\`\`\`\n`);
      }
    }

    return sections.join('\n');
  });

  return (await Promise.all(detailsPromises)).join('\n');
}

export async function generateModulesContent(moduleMetas) {
  const table = generateModulesTable(moduleMetas);
  const details = await generateModuleDetails(moduleMetas);
  return `${table}\n${details}`.trim();
}

export { PLACEHOLDERS, replaceContent };
