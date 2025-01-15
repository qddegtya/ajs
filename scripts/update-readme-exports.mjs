import { ROOT_DIR, META_DIR, README_PATH, PLACEHOLDERS } from './helpers/config.mjs'
import { formatCode } from './helpers/formatter.mjs'
import { readFile, writeFile, listDir } from './helpers/fs.mjs'
import { generateFeatures, generateModulesContent } from './helpers/docs.mjs'
import { replaceContent } from './helpers/content.mjs'
import * as logger from './helpers/logger.mjs'
import path from 'path'

async function loadProjectMeta() {
  try {
    const packageJson = JSON.parse(
      await readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8')
    )
    return {
      name: packageJson.name,
      description: packageJson.description
    }
  } catch (error) {
    logger.error('Failed to load package.json:', error)
    throw error
  }
}

async function loadModulesMeta() {
  try {
    // 加载主索引文件
    const indexPath = path.join(META_DIR, 'index.json')
    const indexContent = await readFile(indexPath, 'utf-8')
    const indexMeta = JSON.parse(indexContent)

    // 加载所有模块的 meta 数据
    const modulesMetaDir = path.join(META_DIR, 'modules')
    const moduleFiles = await listDir(modulesMetaDir).catch(() => [])
    const modulesMeta = await Promise.all(
      moduleFiles.map(async file => {
        if (!file.endsWith('.json')) return null
        const content = await readFile(path.join(modulesMetaDir, file), 'utf-8').catch(() => '{}')
        try {
          return JSON.parse(content)
        } catch {
          return null
        }
      })
    )

    // 合并并去重
    const allMeta = [...indexMeta, ...modulesMeta.filter(Boolean)]
    const uniqueMeta = new Map()
    
    allMeta.forEach(meta => {
      if (!meta || !meta.path) return
      // 总是用最新的数据
      uniqueMeta.set(meta.path, meta)
    })

    return Array.from(uniqueMeta.values())
  } catch (error) {
    logger.error('Failed to load module metadata:', error)
    // 返回空数组而不是抛出错误，这样即使部分失败也能继续生成文档
    return []
  }
}

async function generateQuickStart(manifest) {
  if (!manifest?.examples?.length) {
    return ''
  }

  let content = '## Examples\n\n'
  for (const example of manifest.examples) {
    if (example.caption) {
      content += `### ${example.caption}\n\n`
    }
    const formattedCode = (await formatCode(example.code)).trim()
    content += '```javascript\n'
    content += formattedCode
    content += '\n```\n\n'
  }

  return content
}

async function updateReadme() {
  try {
    // 加载元数据
    const [projectMeta, modulesMetas] = await Promise.all([
      loadProjectMeta(),
      loadModulesMeta()
    ])

    // 查找根模块元数据
    const rootModule = modulesMetas.find(meta => meta.path === 'index.js') || {
      info: {
        description: projectMeta.description,
        features: [],
        examples: []
      }
    }

    // 读取现有的 README
    let readmeContent = await readFile(README_PATH, 'utf-8')

    // 生成并替换内容
    const quickStart = await generateQuickStart(rootModule.info)
    const features = generateFeatures(rootModule)
    const modules = await generateModulesContent(modulesMetas)

    // 更新占位符内容
    readmeContent = replaceContent(readmeContent, PLACEHOLDERS.QUICK_START, quickStart)
    readmeContent = replaceContent(readmeContent, PLACEHOLDERS.FEATURES, features)
    readmeContent = replaceContent(readmeContent, PLACEHOLDERS.MODULES, modules)
    readmeContent = replaceContent(readmeContent, PLACEHOLDERS.ABOUT, projectMeta.description)

    // 如果没有 ABOUT 占位符，添加它
    if (!readmeContent.includes('<!--ABOUT_START-->')) {
      const aboutContent = `\n\n## About\n\n<!--ABOUT_START-->\n${projectMeta.description}\n<!--ABOUT_END-->\n\n`
      readmeContent = readmeContent.replace('## Features', `${aboutContent}## Features`)
    }

    // 写入更新后的 README
    await writeFile(README_PATH, readmeContent)

    logger.info('Successfully updated README.md')
  } catch (error) {
    logger.error('Failed to update README.md:', error)
    process.exit(1)
  }
}

updateReadme()
