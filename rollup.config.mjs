import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
const { version: LIB_VERSION, description: LIB_DESCRIPTION } = pkg;

const LIB_NAME = `AJS`;
const AUTHOR_NAME = `qddegtya`;

// 生成主包的 banner
const createMainBanner = () => ({
  banner: `/** ${LIB_NAME} (${LIB_VERSION}): ${LIB_DESCRIPTION} */`,
  footer: `/** Follow me: @${AUTHOR_NAME} (https://github.com/${AUTHOR_NAME}) */`,
});

// 生成子模块的 banner
const createModuleBanner = (moduleName) => ({
  banner: `/** ${LIB_NAME}.${moduleName} (${LIB_VERSION}): ${LIB_DESCRIPTION} */`,
  footer: `/** Follow me: @${AUTHOR_NAME} (https://github.com/${AUTHOR_NAME}) */`,
});

const basePlugins = [
  json({
    preferConst: true,
    compact: true,
    namedExports: true
  }), 
  resolve(), 
  babel({
    babelHelpers: 'bundled'
  })
];

// 主包配置
const mainConfig = {
  input: "./src/index.js",
  output: [
    {
      ...createMainBanner(),
      name: LIB_NAME,
      file: "dist/ajs.cjs.js",
      format: "cjs",
    },
    {
      ...createMainBanner(),
      name: LIB_NAME,
      file: "dist/ajs.umd.js",
      format: "umd",
    },
    {
      ...createMainBanner(),
      name: LIB_NAME,
      file: "dist/ajs.es.js",
      format: "es",
    },
  ],
  plugins: basePlugins,
};

// 子模块配置
const modules = [
  'core',
  'mobile',
  'dom',
  'fp',
  'functional',
  'internal',
  'future',
  'lang'
];

const moduleConfigs = modules.map(mod => ({
  input: `./src/${mod}/index.js`,
  output: [
    {
      ...createModuleBanner(mod),
      file: `dist/${mod}/${mod}.es.js`,
      format: 'es',
    },
    {
      ...createModuleBanner(mod),
      file: `dist/${mod}/${mod}.cjs.js`,
      format: 'cjs',
    },
    {
      ...createModuleBanner(mod),
      file: `dist/${mod}/${mod}.umd.js`,
      format: 'umd',
      name: `${LIB_NAME}_${mod.toUpperCase()}`
    }
  ],
  plugins: basePlugins,
  // 外部依赖处理
  external: [
    // 将其他模块标记为外部依赖
    ...modules.filter(m => m !== mod).map(m => `xajs/${m}`),
    // 添加其他可能的外部依赖
    /^@babel\/runtime/
  ]
}));

export default [mainConfig, ...moduleConfigs];
