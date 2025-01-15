import globals from 'globals'
import js from '@eslint/js'
import babelParser from '@babel/eslint-parser'

export default [
  // 全局忽略配置
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      'rollup.config.mjs',
      'docs/**'
    ]
  },
  // 基础配置
  {
    files: ['src/**/*.js', 'scripts/**/*.{js,mjs}'],
    ignores: ['src/**/__tests__/**', 'src/**/*.test.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
          ],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'linebreak-style': ['error', 'unix'],
      'semi': ['error', 'never'],
    },
  },

  // 脚本目录配置
  {
    files: ['scripts/**/*.{js,mjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
          ],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // 测试文件的特殊配置
  {
    files: ['src/**/__tests__/**/*.js', 'src/**/*.test.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
          ],
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest, // 添加 Jest 全局变量
        ...globals.es2022
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-undef': 'off',        // 测试文件中允许使用全局变量
      'no-console': 'off',      // 测试文件中允许使用 console
      'no-unused-vars': 'off',  // 测试文件中完全禁用未使用变量的警告
      'max-nested-callbacks': ['error', 5],  // 限制嵌套的测试用例数量
    },
  },
]
