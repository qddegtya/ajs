const AJS = require('../src/index');
const { Puber, Suber } = AJS.functional.helper.PS;

describe('Pub-Sub System Tests', () => {
  let p, s;
  let mockHandler;

  beforeEach(() => {
    p = new Puber('a-b', {});
    s = new Suber('b-a', {});
    mockHandler = jest.fn();
  });

  test('should handle pub-sub communication correctly', (done) => {
    p.addSuber(s);
    s.rss(p, [
      {
        msg: 'a',
        handler: (payload) => {
          mockHandler(payload);
          expect(payload).toBe('world');
          done();
        }
      }
    ]);

    p.pub('a', 'world');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
