const AJS = require('../dist/ajs.cjs');

const di = AJS.functional.helper.di;

// provide
di.provide('clzA')(class A {
  constructor (a, b) {
    this.a = a;
    this.b = b;
  }
});

// inject
console.log(di.inject('clzA', 1, 2));
