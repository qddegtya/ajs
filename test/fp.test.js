const AJS = require("../dist/ajs.cjs");

describe('AJS Function Composition Tests', () => {
  let logOutput = '';
  
  // Mock console.log
  beforeEach(() => {
    logOutput = '';
    console.log = jest.fn(str => {
      logOutput = str;
    });
  });

  const print = str => {
    console.log(str);
  };

  const addHello = str => {
    return "hello" + str;
  };

  test('compose function should combine print and addHello correctly', () => {
    const fn = AJS.fp.compose(
      addHello,
      print
    );

    fn("xiaoa");
    
    expect(logOutput).toBe("helloxiaoa");
  });
});
