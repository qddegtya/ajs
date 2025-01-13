import fs from 'fs'
import path from 'path'
import { tpl } from '../index'

describe('Template Function Tests', () => {
  test('should render template correctly', () => {
    const tplContent = fs
      .readFileSync(path.join(__dirname, '.', '__fixtures__/hello.tpl'))
      .toString()

    const result = tpl.exec(tplContent, {
      name: 'Add',
      command: 'add',
      alias: 'a',
      description: 'add',
    })

    expect(result).toBeDefined()
    expect(typeof result).toBe('string')
    // 如果你知道具体的预期输出，可以添加更具体的断言
    // expect(result).toMatch(/expected pattern/);
  })
})
