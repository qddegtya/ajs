const fs = require("fs");
const path = require("path");
const AJS = require("../dist/ajs.cjs");
const tpl = AJS.future.tpl;

describe('Template Function Tests', () => {
  test('should render template correctly', () => {
    const tplContent = fs
      .readFileSync(path.join(__dirname, "..", "_fixtures/hello.tpl"))
      .toString();

    const result = tpl.exec(tplContent, {
      name: "Add",
      command: "add",
      alias: "a",
      description: "add",
    });

    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
    // 如果你知道具体的预期输出，可以添加更具体的断言
    // expect(result).toMatch(/expected pattern/);
  });
});
