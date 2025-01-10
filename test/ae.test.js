const AJS = require("../dist/ajs.cjs");
const eff = AJS.future.eff;

describe('Effect Handler Tests', () => {
  let consoleOutput;

  beforeEach(() => {
    consoleOutput = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleOutput.mockRestore();
  });

  test('should handle read and write effects correctly', () => {
    eff((perform, handle) => {
      handle(function* (handler) {
        if (handler === "read") {
          yield "read";
        } else if (handler === "write") {
          yield "write";
        }
      });

      const o1 = perform("read");
      const o2 = perform("write");

      console.log(o1, o2);
    });

    expect(consoleOutput).toHaveBeenCalledWith("read", "write");
  });
});
