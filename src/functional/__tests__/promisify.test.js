const AJS = require("../../index");
const fs = require("fs");
const path = require("path");

describe('AJS.functional.helper.promisify', () => {
  const readFile = AJS.functional.helper.promisify(fs.readFile);

  test('should successfully read an existing file', async () => {
    const filePath = path.join(__dirname, ".", "di.test.js");
    const content = await readFile(filePath, "utf-8");
    expect(content).toBeTruthy();
    expect(typeof content).toBe('string');
  });

  test('should handle error when reading non-existing file', async () => {
    expect.assertions(1);
    try {
      await readFile("xxxx", "utf-8");
    } catch (err) {
      // 使用 error.name 进行比较，而不是 instanceof
      expect(err.name).toBe('Error');
      // 或者使用 constructor.name
      // expect(err.constructor.name).toBe('Error');
    }
  });
});
