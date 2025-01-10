const AJS = require("../dist/ajs.cjs");
const sleep = AJS.functional.helper.sleep;

describe('Intercepter Tests', () => {
  // 同步拦截器测试
  test('should execute synchronous intercepter correctly', () => {
    const logSpy = jest.spyOn(console, 'log');
    function log(msg) {
      console.log(msg);
    }

    const _log = AJS.functional.helper
      .intercepter(log)
      .before(msg => {
        console.log(`<====== before: ${msg} ======>`);
      })
      .after(msg => {
        console.log(`<====== after: ${msg} ======>`);
      })
      .$runner;

    const testMsg = "this is our msg";
    _log(testMsg);

    expect(logSpy).toHaveBeenCalledTimes(3);
    expect(logSpy).toHaveBeenNthCalledWith(1, `<====== before: ${testMsg} ======>`);
    expect(logSpy).toHaveBeenNthCalledWith(2, testMsg);
    expect(logSpy).toHaveBeenNthCalledWith(3, `<====== after: ${testMsg} ======>`);
    
    logSpy.mockRestore();
  });

  // 异步拦截器测试
  test('should execute asynchronous intercepter correctly', async () => {
    const logSpy = jest.spyOn(console, 'log');
    
    async function logWithTimeout(t) {
      await sleep(t);
      console.log(`<====== ${t} ms 后输出 ======>`);
    }

    const _asyncLog = AJS.functional.helper
      .intercepter(logWithTimeout)
      .before(sleep)
      .$asyncRunner;

    const timeout = 100; // 使用较小的超时值加快测试
    await _asyncLog(timeout);

    expect(logSpy).toHaveBeenCalledWith(`<====== ${timeout} ms 后输出 ======>`);
    
    logSpy.mockRestore();
  }, 10000); // 设置更长的测试超时时间
});
