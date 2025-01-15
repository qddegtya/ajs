import { readFile, writeFile } from './helpers/fs.mjs'
import { ROOT_DIR, META_DIR } from './helpers/config.mjs'
import path from 'path'
import * as logger from './helpers/logger.mjs'

async function generateSidebarConfig(meta) {
  // 找到主入口文件的 meta 信息
  const mainMeta = meta.find(item => item.path === 'index.js')
  if (!mainMeta?.info?.namespaces) {
    throw new Error('Main module namespaces not found')
  }
  
  // 从 namespaces 生成侧边栏
  const sidebar = Object.entries(mainMeta.info.namespaces)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([namespace, info]) => {
      // 获取该命名空间下的所有属性
      const items = Object.entries(info.properties)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([name]) => ({
          text: name,
          link: `/api/${namespace.toLowerCase()}/${name.toLowerCase()}`
        }))
      
      // 添加概览页
      items.unshift({
        text: 'Overview',
        link: `/api/${namespace.toLowerCase()}/`
      })
      
      return {
        text: namespace,
        items
      }
    })
  
  return sidebar
}

async function main() {
  try {
    // 读取 package.json
    const packageJson = JSON.parse(
      await readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8')
    )
    
    // 读取 meta 数据
    const metaPath = path.join(META_DIR, 'index.json')
    const meta = JSON.parse(await readFile(metaPath, 'utf-8'))
    
    // 生成侧边栏配置
    const sidebar = await generateSidebarConfig(meta)
    
    // 生成完整配置
    const config = {
      title: packageJson.name.toUpperCase(),
      description: packageJson.description,
      
      appearance: 'dark',
      
      themeConfig: {
        nav: [
          { text: 'API', link: '/api/' }
        ],
        
        sidebar: {
          '/api/': sidebar
        },
        
        socialLinks: [
          { icon: 'github', link: packageJson.repository.url.replace(/^git\+|\.git$/g, '') }
        ]
      }
    }
    
    // 写入配置文件
    const configPath = path.join(ROOT_DIR, 'docs/.vitepress/config.mjs')
    await writeFile(
      configPath,
      `export default ${JSON.stringify(config, null, 2)}\n`
    )
    
    logger.info('VitePress config generated successfully!')
  } catch (error) {
    logger.error('Failed to generate VitePress config:', error)
    process.exit(1)
  }
}

main()
