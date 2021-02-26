const AJS = require('../dist/ajs.cjs')

const { Puber, Suber } = AJS.functional.helper.PS

const p = new Puber('a-b', {})
const s = new Suber('b-a', {})

p.addSuber(s)
s.rss(p, [
  {
    msg: 'a',
    handler: (payload) => {
      console.log(`hello ${payload}.`)
    }
  }
])

setTimeout(() => {
  p.pub('a', 'world')
}, 1000)
