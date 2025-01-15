import { readFile, writeFile, mkdir } from './helpers/fs.mjs'
import { ROOT_DIR, META_DIR } from './helpers/config.mjs'
import { formatCode } from './helpers/formatter.mjs'
import path from 'path'
import * as logger from './helpers/logger.mjs'

async function loadProjectMeta() {
  const packageJson = JSON.parse(
    await readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8')
  )
  return {
    name: packageJson.name,
    description: packageJson.description
  }
}

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
  cleanDesc = cleanDesc.replace(/\\s+/g, ' ')
  
  return cleanDesc
}

async function formatExample(example) {
  if (typeof example === 'string') {
    return formatCode(example)
  }
  
  if (example.code) {
    return {
      ...example,
      code: await formatCode(example.code)
    }
  }
  
  return example
}

async function generateModuleDoc(moduleInfo, projectMeta) {
  const { path: modulePath, info } = moduleInfo
  const { description, exports = [], examples = [], features = [] } = info

  const lines = []
  
  // Add title
  const moduleName = path.basename(modulePath, '.js')
  const title = modulePath === 'index.js' ? projectMeta.name : 
    moduleName === 'index' ? path.basename(path.dirname(modulePath)) : 
      moduleName
  lines.push(`# ${title}`)
  lines.push('')

  // Add description
  const desc = modulePath === 'index.js' ? projectMeta.description : description
  if (desc) {
    lines.push(cleanDescription(desc, title))
    lines.push('')
  }

  // Add features
  if (features.length > 0) {
    lines.push('## Features')
    lines.push('')
    features.forEach(feature => {
      lines.push(`- ${feature}`)
    })
    lines.push('')
  }

  // Add exports
  if (exports.length > 0) {
    lines.push('## API Reference')
    lines.push('')
    exports.forEach(exp => {
      lines.push(`### \`${exp}\``)
      lines.push('')
      // TODO: Add export description from meta if available
      lines.push(`The \`${exp}\` function/property details will be added soon.`)
      lines.push('')
    })
  }

  // Add examples
  if (examples.length > 0) {
    lines.push('## Examples')
    lines.push('')
    
    for (const example of examples) {
      const formattedExample = await formatExample(example)
      
      if (typeof formattedExample === 'object') {
        // 使用 caption 作为标题
        if (formattedExample.caption) {
          lines.push(`### ${formattedExample.caption}`)
          lines.push('')
        }
        
        if (formattedExample.description) {
          lines.push(formattedExample.description)
          lines.push('')
        }
        
        if (formattedExample.code) {
          lines.push('```js')
          lines.push(formattedExample.code)
          lines.push('```')
          lines.push('')
        }
      } else {
        // 如果是字符串，直接作为代码示例
        lines.push('```js')
        lines.push(formattedExample)
        lines.push('```')
        lines.push('')
      }
    }
  }

  return lines.join('\n')
}

async function main() {
  try {
    // Read meta index
    const metaPath = path.join(META_DIR, 'index.json')
    const metaContent = await readFile(metaPath, 'utf-8')
    const meta = JSON.parse(metaContent)

    // Load project meta
    const projectMeta = await loadProjectMeta()

    // Create docs directories
    const docsDir = path.join(ROOT_DIR, 'docs/api')
    await mkdir(docsDir, { recursive: true })

    // Generate docs for each module
    for (const moduleInfo of meta) {
      const { path: modulePath } = moduleInfo
      const docPath = path.join(
        docsDir,
        modulePath.replace(/index\.js$/, 'index.md')
          .replace(/\.js$/, '.md')
      )

      // Create subdirectories
      await mkdir(path.dirname(docPath), { recursive: true })

      // Generate and write doc
      const docContent = await generateModuleDoc(moduleInfo, projectMeta)
      await writeFile(docPath, docContent)
    }

    logger.info('Documentation generated successfully!')
  } catch (error) {
    logger.error('Failed to generate documentation:', error)
    process.exit(1)
  }
}

main()
