import fs from 'fs/promises'
import * as logger from './logger.mjs'

// 文件读写操作
export async function readFile(filePath, encoding = 'utf-8') {
  try {
    logger.debug(`Reading file: ${filePath}`)
    return await fs.readFile(filePath, encoding)
  } catch (error) {
    logger.error(`Failed to read file: ${filePath}`, error)
    throw error
  }
}

export async function writeFile(filePath, content, encoding = 'utf-8') {
  try {
    logger.debug(`Writing to file: ${filePath}`)
    await fs.writeFile(filePath, content, encoding)
  } catch (error) {
    logger.error(`Failed to write file: ${filePath}`, error)
    throw error
  }
}

// JSON 文件操作
export async function readJson(filePath) {
  try {
    const content = await readFile(filePath)
    return JSON.parse(content)
  } catch (error) {
    logger.error(`Failed to parse JSON from file: ${filePath}`, error)
    throw error
  }
}

export async function writeJson(filePath, data) {
  try {
    const content = JSON.stringify(data, null, 2) + '\n'
    await writeFile(filePath, content)
  } catch (error) {
    logger.error(`Failed to write JSON to file: ${filePath}`, error)
    throw error
  }
}

// 目录操作
export async function mkdir(dirPath, options = { recursive: true }) {
  try {
    logger.debug(`Creating directory: ${dirPath}`)
    await fs.mkdir(dirPath, options)
  } catch (error) {
    if (error.code !== 'EEXIST') {
      logger.error(`Failed to create directory: ${dirPath}`, error)
      throw error
    }
  }
}

export async function rm(path, options = { recursive: true, force: true }) {
  try {
    logger.debug(`Removing path: ${path}`)
    await fs.rm(path, options)
  } catch (error) {
    if (error.code !== 'ENOENT') {
      logger.error(`Failed to remove path: ${path}`, error)
      throw error
    }
  }
}

export async function ensureDir(dirPath) {
  try {
    await fs.access(dirPath)
  } catch {
    logger.debug(`Creating directory: ${dirPath}`)
    await fs.mkdir(dirPath, { recursive: true })
  }
}

export async function listDir(dirPath) {
  try {
    logger.debug(`Listing directory: ${dirPath}`)
    return await fs.readdir(dirPath)
  } catch (error) {
    logger.error(`Failed to list directory: ${dirPath}`, error)
    throw error
  }
}

// 文件检查
export async function exists(path) {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

export async function isDirectory(path) {
  try {
    const stats = await fs.stat(path)
    return stats.isDirectory()
  } catch {
    return false
  }
}

export async function isFile(path) {
  try {
    const stats = await fs.stat(path)
    return stats.isFile()
  } catch {
    return false
  }
}
