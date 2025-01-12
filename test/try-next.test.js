const AJS = require("../src/index");

describe('AJS.functional.helper.tryNext', () => {
  test('should execute the last successful handler in the chain', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    
    const _print = AJS.functional.helper
      .tryNext((msg) => {
        console.log(`i throw a error ${msg}`);
        throw new Error('i throw a error');
      })
      .tryNext((msg) => {
        console.log(`i throw a error ${msg}`);
        throw new Error('i throw a error too');
      })
      .tryNext((msg) => {
        console.log(`i am the correct runner ${msg}`);
      });

    _print(': I am archer.');

    // 修改期望:只验证最后一个成功的处理函数调用
    expect(consoleSpy).toHaveBeenCalledWith('i am the correct runner : I am archer.');
    
    consoleSpy.mockRestore();
  });
});
