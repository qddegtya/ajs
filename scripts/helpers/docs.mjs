import { formatCode } from './formatter.mjs'
import { replaceContent } from './content.mjs'
import { PLACEHOLDERS } from './config.mjs'

function cleanDescription(description, moduleName) {
  if (!description) {
    return ''
  }
  
  // 移除前后空格
  let cleanDesc = description.trim()
  
  // 如果描述为空，直接返回
  if (!cleanDesc) {
    return ''
  }
  
  // 如果描述以模块名开头，移除模块名
  if (moduleName && cleanDesc.toLowerCase().startsWith(moduleName.toLowerCase())) {
    cleanDesc = cleanDesc.substring(moduleName.length).trim()
  }
  
  // 移除多余的空格
  cleanDesc = cleanDesc.replace(/\s+/g, ' ')
  
  return cleanDesc
}

export function generateFeatures(meta) {
  if (!meta?.info) {
    return ''
  }

  // 创建分组数据结构
  const groups = {
    namespaces: new Map(), // 命名空间分组
    standalone: []         // 独立特性
  }
  
  // 处理命名空间和属性
  if (meta.info.namespaces) {
    Object.entries(meta.info.namespaces).forEach(([namespace, data]) => {
      const features = []
      Object.entries(data.properties).forEach(([propName, prop]) => {
        features.push({
          text: `${propName}: ${prop.description}`,
          level: 1  // 在命名空间下缩进一级
        })
      })
      if (features.length > 0) {
        groups.namespaces.set(namespace, features)
      }
    })
  }
  
  // 处理明确定义的特性
  if (meta.info.features?.length) {
    meta.info.features.forEach(feature => {
      if (typeof feature === 'string' && !feature.includes(meta.info.name)) {
        // 独立特性
        groups.standalone.push({
          text: feature,
          level: 0
        })
      } else if (feature.namespace && feature.property && feature.description) {
        // 命名空间特性
        if (!groups.namespaces.has(feature.namespace)) {
          groups.namespaces.set(feature.namespace, [])
        }
        groups.namespaces.get(feature.namespace).push({
          text: `${feature.property}: ${feature.description}`,
          level: 1
        })
      }
    })
  }

  // 转换为扁平的特性列表，保持正确的层级结构
  const allFeatures = []
  
  // 添加命名空间分组的特性
  groups.namespaces.forEach((features, namespace) => {
    // 添加命名空间作为标题
    allFeatures.push({
      text: namespace,
      level: 0
    })
    // 添加该命名空间下的所有特性
    features.forEach(feature => {
      allFeatures.push(feature)
    })
  })
  
  // 添加独立特性
  groups.standalone.forEach(feature => {
    allFeatures.push(feature)
  })

  // 过滤掉与模块描述重复的特性
  const description = meta.info.description || ''
  const filteredFeatures = allFeatures.filter(feature => 
    !description.includes(feature.text) && !feature.text.includes(description)
  )

  return createNestedList(filteredFeatures)
}

function createNestedList(features) {
  const list = []
  let currentLevel = 0
  features.forEach(feature => {
    if (feature.level > currentLevel) {
      list.push('  '.repeat(feature.level - currentLevel) + '- ' + feature.text)
    } else if (feature.level < currentLevel) {
      list.push('  '.repeat(feature.level) + '- ' + feature.text)
    } else {
      list.push('- ' + feature.text)
    }
    currentLevel = feature.level
  })
  return list.join('\n')
}

export function generateModulesTable(moduleMetas) {
  const headers = '## 可用模块\n\n| 名称 | 描述 | 可按需引入的模块名 |\n|---------|-------------|-------------|\n'
  
  // 改进的模块过滤和处理逻辑
  const uniqueModules = new Map()
  
  moduleMetas
    .filter(meta => {
      const parts = meta.path.split('/')
      // 只处理直接位于模块根目录下的 index.js 文件
      return parts.length === 2 && parts[1] === 'index.js'
    })
    .forEach(meta => {
      const pathParts = meta.path.split('/')
      const moduleName = pathParts[0]
      
      // 跳过带 _ 的私有模块和根目录的 index.js
      if (moduleName.startsWith('_') || 
          meta.path === 'index.js') {
        return
      }
      
      const description = meta.info?.description || ''
      uniqueModules.set(moduleName, {
        name: moduleName,
        description: cleanDescription(description, moduleName),
        importPath: moduleName
      })
    })

  const rows = Array.from(uniqueModules.values())
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(module => {
      return `| ${module.name} | ${module.description} | \`xajs/${module.importPath}\` |`
    })
    .join('\n')

  return headers + rows + '\n'
}

export async function generateModuleDetails(moduleMetas) {
  // 过滤和去重模块
  const uniqueModules = new Map()
  moduleMetas
    .filter(meta => !meta.path.includes('/ua/'))
    .forEach(meta => {
      const name = meta.path.split('/')[0]
      if (name === 'index.js') return // Skip root index.js
      
      const isIndex = meta.path.endsWith('index.js')
      const moduleName = isIndex ? name : meta.path.replace(/\.js$/, '')
      
      if (!uniqueModules.has(moduleName) || isIndex) {
        const description = cleanDescription(meta.info?.description || '', moduleName)
        uniqueModules.set(moduleName, {
          ...meta,
          info: {
            ...meta.info,
            description
          }
        })
      }
    })

  const detailsPromises = Array.from(uniqueModules.values()).map(async meta => {
    const name = meta.path.split('/')[0]
    const sections = []

    // 模块描述
    if (meta.info?.description) {
      sections.push(`<details>\n<summary>${name}</summary>\n\n## ${name}\n\n${meta.info.description.trim()}\n`)
    }

    // 特性列表
    if (meta.info?.features?.length) {
      sections.push(`### Features\n\n${generateFeatures(meta)}\n`)
    }

    // 示例代码
    if (meta.info?.examples?.length) {
      sections.push('### Examples\n')
      for (const example of meta.info.examples) {
        const code = await formatCode(example.code)
        if (example.caption) {
          sections.push(`**${example.caption}**\n`)
        }
        sections.push(`\`\`\`javascript\n${code.trim()}\n\`\`\`\n`)
      }
    }

    // 添加 details 标签的结束标记
    sections.push('</details>\n')

    return sections.join('\n')
  })

  return (await Promise.all(detailsPromises)).join('\n')
}

export async function generateModulesContent(moduleMetas) {
  const table = generateModulesTable(moduleMetas)
  const details = await generateModuleDetails(moduleMetas)
  return `${table}\n${details}`.trim()
}

export { PLACEHOLDERS, replaceContent }
