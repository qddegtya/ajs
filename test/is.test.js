const AJS = require('../dist/ajs.cjs')

// is array
console.log(AJS.internal.is.isArray([1, 2, 3]))

// is object
console.log(AJS.internal.is.isObject({a: 1, b: 2}))

// is function
console.log(AJS.internal.is.isFunction(async function testAsync() {}))

// is boolean
console.log(AJS.internal.is.isBoolean(true))
