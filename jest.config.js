module.exports = {
  // 测试文件的查找模式
  testMatch: ['**/__tests__/**/*.test.js'],
  
  // 测试环境
  testEnvironment: 'node',
  
  // 覆盖率收集
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/__tests__/**',
    '!**/node_modules/**'
  ],
  
  // 覆盖率报告目录
  coverageDirectory: 'coverage',
  
  // 在每次测试前清理模拟调用和实例
  clearMocks: true,
  
  // 转换配置
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  
  // 模块解析配置
  moduleDirectories: ['node_modules'],
  
  // 模块名称映射
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^../src/(.*)$': '<rootDir>/src/$1'
  },
  
  // 根目录
  rootDir: '.'
};
