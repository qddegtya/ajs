import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 自动扫描 src 目录获取所有模块
const scanModules = () => {
  const srcPath = path.resolve(path.join(__dirname, '..', 'src'));
  return fs.readdirSync(srcPath)
    .filter(item => {
      const itemPath = path.join(srcPath, item);
      // 确保是目录且包含 index.js
      return fs.statSync(itemPath).isDirectory() && 
             fs.existsSync(path.join(itemPath, 'index.js'));
    });
};

const createModuleExports = (moduleName) => ({
  browser: `./dist/${moduleName}/${moduleName}.umd.js`,
  import: `./dist/${moduleName}/${moduleName}.es.js`,
  require: `./dist/${moduleName}/${moduleName}.cjs.js`,
  default: `./dist/${moduleName}/${moduleName}.cjs.js`
});

export default {
  modules: scanModules(),
  createModuleExports
};
