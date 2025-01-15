import path from 'path'
import { fileURLToPath } from 'url'

const scriptsDirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.join(scriptsDirname, '../..')
const META_DIR = path.join(ROOT_DIR, '.meta')
const MODULES_META_DIR = path.join(META_DIR, 'modules')
const SRC_DIR = path.join(ROOT_DIR, 'src')
const PACKAGE_JSON_PATH = path.join(ROOT_DIR, 'package.json')
const README_PATH = path.join(ROOT_DIR, 'README.md')

// 统一的 prettier 配置
export const PRETTIER_CONFIG = {
  semi: true,
  singleQuote: true,
  trailingComma: 'none',
  printWidth: 80,
  tabWidth: 2,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  embeddedLanguageFormatting: 'auto',
  proseWrap: 'preserve'
}

// 统一的 babel 解析器配置
export const BABEL_PARSER_CONFIG = {
  sourceType: 'module',
  plugins: ['jsx', 'typescript', 'decorators-legacy']
}

// 日志配置
export const LOG_CONFIG = {
  levels: {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
  },
  defaultLevel: 1
}

// JSDoc 解析配置
export const JSDOC_CONFIG = {
  tags: {
    module: true,
    description: true,
    feature: true,
    example: true,
    see: true
  },
  sections: ['description', 'feature', 'example']
}

// README 占位符配置
export const PLACEHOLDERS = {
  ABOUT: {
    start: '<!--ABOUT_START-->',
    end: '<!--ABOUT_END-->'
  },
  FEATURES: {
    start: '<!--FEATURES_START-->',
    end: '<!--FEATURES_END-->'
  },
  QUICK_START: {
    start: '<!--QUICK_START_START-->',
    end: '<!--QUICK_START_END-->'
  },
  MODULES: {
    start: '<!--MODULES_START-->',
    end: '<!--MODULES_END-->'
  }
}

export {
  ROOT_DIR,
  META_DIR,
  MODULES_META_DIR,
  SRC_DIR,
  PACKAGE_JSON_PATH,
  README_PATH
}
