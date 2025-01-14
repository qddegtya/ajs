import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import moduleConfig from '../config/modules.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取现有的 package.json
const packageJsonPath = path.resolve(path.join(__dirname, '..', 'package.json'));
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

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
moduleConfig.modules.forEach(moduleName => {
  exports[`./${moduleName}`] = moduleConfig.createModuleExports(moduleName);
});

// 更新 package.json
packageJson.exports = exports;

// 写回文件
fs.writeFileSync(
  packageJsonPath,
  JSON.stringify(packageJson, null, 2) + '\n',
  'utf-8'
);

console.log('Successfully updated package.json exports configuration.');
