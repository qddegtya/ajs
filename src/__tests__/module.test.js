/**
 * @jest-environment node
 */

describe('AJS Module System', () => {
  describe('Package Imports', () => {
    test('should import main package correctly', async () => {
      const ajs = await import('../../dist/ajs.es.js')
      expect(ajs).toBeDefined()
      // 验证主要的导出是否存在
      expect(ajs.core).toBeDefined()
      expect(ajs.dom).toBeDefined()
      expect(ajs.fp).toBeDefined()
    })

    test('should import core package correctly', async () => {
      const core = await import('../../dist/core/core.es.js')
      expect(core).toBeDefined()
      // 验证核心功能是否存在
      expect(core.base).toBeDefined()
      expect(core.decorators).toBeDefined()
    })

    test('should import dom package correctly', async () => {
      const dom = await import('../../dist/dom/dom.es.js')
      expect(dom).toBeDefined()
      // 验证 DOM 相关功能是否存在
      expect(dom.h).toBeDefined()
      expect(typeof dom.h).toBe('function')
    })

    test('should import mobile package correctly', async () => {
      const mobile = await import('../../dist/mobile/mobile.es.js')
      expect(mobile).toBeDefined()
      expect(mobile.UserAgent).toBeDefined()
    })

    test('should import fp package correctly', async () => {
      const fp = await import('../../dist/fp/fp.es.js')
      expect(fp).toBeDefined()
      expect(fp.compose).toBeDefined()
    })
  })

  describe('Package Exports', () => {
    test('all packages should have correct exports', async () => {
      const packages = [
        '../../dist/ajs.es.js',
        '../../dist/core/core.es.js',
        '../../dist/dom/dom.es.js',
        '../../dist/mobile/mobile.es.js',
        '../../dist/fp/fp.es.js',
        '../../dist/functional/functional.es.js',
        '../../dist/internal/internal.es.js',
        '../../dist/future/future.es.js',
        '../../dist/lang/lang.es.js'
      ]

      for (const pkg of packages) {
        const module = await import(pkg)
        expect(module).toBeDefined()
        expect(Object.keys(module).length).toBeGreaterThan(0)
      }
    })
  })

  describe('Cross Package Dependencies', () => {
    test('core package should be independent', async () => {
      const core = await import('../../dist/core/core.es.js')
      expect(core).toBeDefined()
      // core 包应该是独立的，不依赖其他包
      expect(core.base).toBeDefined()
      expect(core.decorators).toBeDefined()
    })

    test('dom package should work with core', async () => {
      const dom = await import('../../dist/dom/dom.es.js')
      const core = await import('../../dist/core/core.es.js')
      expect(dom).toBeDefined()
      expect(core).toBeDefined()
      // DOM 包可能会用到 core 的功能
      expect(dom.h).toBeDefined()
      expect(core.base).toBeDefined()
    })
  })

  describe('Package Interface Consistency', () => {
    test('all packages should have named exports', async () => {
      const packages = [
        '../../dist/ajs.es.js',
        '../../dist/core/core.es.js',
        '../../dist/dom/dom.es.js',
        '../../dist/mobile/mobile.es.js',
        '../../dist/fp/fp.es.js'
      ]

      for (const pkg of packages) {
        const module = await import(pkg)
        // 检查是否都使用命名导出
        expect(Object.keys(module).length).toBeGreaterThan(0)
        expect(typeof module).toBe('object')
        // 确保没有使用默认导出
        expect(module).not.toHaveProperty('default')
      }
    })
  })
})
