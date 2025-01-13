# AJS
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

> 💗 A modern, lightweight JavaScript utility library with functional programming support and experimental features

## About

AJS is a thoughtfully crafted JavaScript utility library that combines classical utilities with modern programming paradigms. It provides a rich set of tools while maintaining a minimal footprint and high flexibility.

## ✨ Features

- **Core Utilities**
  - Powerful Class system with inheritance and mixins support
  - Flexible Deferred implementation for better async control
  - Robust decorators system

- **Functional Programming**
  - First-class support for functional programming patterns
  - Advanced interceptors for function composition
  - Dependency injection system
  - Pub/Sub pattern implementation
  - Promise utilities including promisification
  - Lazy evaluation support

- **DOM & Mobile**
  - Efficient DOM manipulation utilities
  - Mobile-specific optimizations and helpers
  - Event handling with advanced features like `once`

- **Experimental Features** 🧪
  - Template rendering engine
  - Reactive programming utilities
  - Advanced effect system
  - Cutting-edge async patterns

## 🚀 Quick Start

### Installation

```bash
npm install xajs@latest
```

### Usage

#### Full Package Import

```javascript
// Import the entire AJS library
import { core, functional, fp, dom } from 'xajs'

// Use core functionality
const MyClass = core.base.Class({
  $ctor() {
    this.name = 'ajs'
  }
})

// Use functional utilities
const logged = functional.helper.intercepter(fn)
  .before(args => console.log('Before:', args))
  .after(args => console.log('After:', args))
  .$runner
```

#### Module Import (Recommended)

```javascript
// Import only what you need
import { base } from 'xajs/core'
import { h } from 'xajs/dom'
import { compose } from 'xajs/fp'
import { TR } from 'xajs/future'

// Use Class system
const Component = base.Class({
  render() {
    return h('div', { className: 'component' }, 'Hello AJS!')
  }
})

// Use functional programming
const pipeline = compose(fn1, fn2, fn3)

// Use reactive features
const count = TR(0)
count.observe(val => console.log('count changed:', val))
```

### Supported Modules

AJS supports independent imports for these modules:

* xajs/core - Core functionality (Class, decorators)
* xajs/functional - Functional programming tools
* xajs/fp - Functional programming paradigms
* xajs/dom - DOM manipulation tools
* xajs/mobile - Mobile utilities
* xajs/internal - Internal utilities
* xajs/future - Experimental features
* xajs/lang - Language enhancements

Each module is independent and can be imported separately, providing:

* 🚀 Minimal bundle size
* 📦 Better code splitting
* 🔥 Faster loading
* 🎯 Precise dependency management

## 🎯 Design Philosophy

- **Lightweight**: Focused on providing essential utilities without bloat
- **Modular**: Well-organized modules for selective importing
- **Flexible**: Adaptable to different programming styles and patterns
- **Future-Ready**: Experimental features for exploring next-gen JavaScript patterns

## 🚀 Innovation

AJS stands out by seamlessly combining traditional utility functions with modern programming concepts:

- Innovative class system that enforces proper inheritance patterns
- Advanced functional programming tools that maintain code clarity
- Experimental features that push the boundaries of JavaScript capabilities
- Smart integration of reactive programming concepts

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/all-contributors/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/773248?v=4" width="100px;" alt="Archer (炽宇)"/><br /><sub><b>Archer (炽宇)</b></sub>](http://xiaoa.name)<br />[💻](https://github.com/qddegtya/ajs/commits?author=qddegtya "Code") [🚇](#infra-qddegtya "Infrastructure (Hosting, Build-Tools, etc)") [🚧](#maintenance-qddegtya "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
