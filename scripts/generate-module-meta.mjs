import { META_DIR, MODULES_META_DIR, SRC_DIR } from './helpers/config.mjs'
import { extractModuleInfo } from './helpers/meta.mjs'
import { readFile, writeFile, mkdir, rm } from './helpers/fs.mjs'
import * as logger from './helpers/logger.mjs'
import path from 'path'
import fs from 'fs/promises'

async function generateModuleMeta(modulePath) {
  const code = await readFile(modulePath, 'utf-8')
  const info = await extractModuleInfo(code, path.basename(modulePath))
  if (!info) return null

  const relativePath = path.relative(SRC_DIR, modulePath)
  const metaPath = path.join(MODULES_META_DIR, relativePath.replace(/\.js$/, '.json'))

  await mkdir(path.dirname(metaPath), { recursive: true })
  await writeFile(metaPath, JSON.stringify(info, null, 2))

  return info
}

async function generateAllMeta() {
  await cleanMetaDirectories()

  const processDirectory = async (dir) => {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    const results = []

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        if (!entry.name.startsWith('_') && !entry.name.startsWith('.')) {
          results.push(...(await processDirectory(fullPath)))
        }
      } else if (entry.name === 'index.js') {
        const info = await generateModuleMeta(fullPath)
        if (info) {
          results.push({
            path: path.relative(SRC_DIR, fullPath),
            info
          })
        }
      }
    }

    return results
  }

  const allMeta = await processDirectory(SRC_DIR)
  const indexPath = path.join(META_DIR, 'index.json')
  await writeFile(indexPath, JSON.stringify(allMeta, null, 2))

  return allMeta
}

async function cleanMetaDirectories() {
  try {
    await rm(META_DIR, { recursive: true, force: true })
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error
    }
  }

  await mkdir(META_DIR, { recursive: true })
  await mkdir(MODULES_META_DIR, { recursive: true })

  // Create .gitkeep to ensure the directory is tracked
  const gitkeepPath = path.join(META_DIR, '.gitkeep')
  await writeFile(gitkeepPath, '')
}

async function main() {
  try {
    await generateAllMeta()
    logger.info('Successfully generated module metadata')
  } catch (error) {
    logger.error('Failed to generate module metadata', error)
    process.exit(1)
  }
}

main()
