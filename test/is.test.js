const AJS = require('../dist/ajs.cjs')

// is array
console.log(AJS.is.isArray([1, 2, 3]))

// is object
console.log(AJS.is.isObject({a: 1, b: 2}))

// is function
console.log(AJS.is.isFunction(async function testAsync() {}))

// is boolean
console.log(AJS.is.isBoolean(true))
