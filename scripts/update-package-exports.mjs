import { fileURLToPath } from 'url';
import path from 'path';
import { modules, createModuleExports } from '../config/modules.config.mjs';
import { readJson, writeJson } from './helpers/fs.mjs';
import * as logger from './helpers/logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateExports() {
  try {
    // 读取现有的 package.json
    const packageJsonPath = path.resolve(path.join(__dirname, '..', 'package.json'));
    const packageJson = await readJson(packageJsonPath);

    // 构建新的 exports 配置
    const exports = {
      '.': {
        browser: './dist/ajs.umd.js',
        require: './dist/ajs.cjs.js',
        import: './dist/ajs.es.js',
        default: './dist/ajs.cjs.js'
      }
    };

    // 为每个模块添加导出配置
    modules.forEach(moduleName => {
      exports[`./${moduleName}`] = createModuleExports(moduleName);
    });

    // 更新 package.json
    packageJson.exports = exports;

    // 写回文件
    await writeJson(packageJsonPath, packageJson);

    logger.info('Successfully updated package.json exports configuration.');
  } catch (error) {
    logger.error('Failed to update package.json exports configuration', error);
    process.exit(1);
  }
}

updateExports();
