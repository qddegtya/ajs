import { helper } from '../index'
const { PS: { Puber, Suber } } = helper

describe('Pub-Sub System Tests', () => {
  let p, s
  let mockHandler

  beforeEach(() => {
    p = new Puber('a-b', {})
    s = new Suber('b-a', {})

    p.addSuber(s)
    
    mockHandler = jest.fn()
  })

  test('should handle pub-sub correctly', () => {
    s.rss(p, [
      {
        msg: 'a',
        handler(payload) {
          mockHandler(payload)
        }
      }
    ])

    p.pub('a', 'world')
    expect(mockHandler).toHaveBeenCalledWith('world')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
