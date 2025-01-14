# AJS
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

## About

<!--ABOUT_START-->
A thoughtfully crafted JavaScript utility library that combines classical utilities with modern programming paradigms. It provides a rich set of tools while maintaining a minimal footprint and high flexibility.
<!--ABOUT_END-->

## ✨ Features

<!--FEATURES_START-->
- CoreUtilities.classSystem: Powerful class system with inheritance and mixins
- CoreUtilities.decorators: Flexible decorators for enhancing classes and methods
- CoreUtilities.promises: Promise utilities and deferred execution
- CoreUtilities.types: Type checking and object manipulation
- DOMManipulation.vdom: Lightweight virtual DOM implementation
- DOMManipulation.events: Event handling and delegation
- DOMManipulation.touch: Mobile-optimized touch events
- DOMManipulation.url: URL parsing and manipulation
- FunctionalProgramming.composition: Function composition and currying
- FunctionalProgramming.di: Dependency injection system
- FunctionalProgramming.pubsub: Pub/Sub event system
- FunctionalProgramming.promiseUtils: Promise-based utilities
- LanguageExtensions.string: Enhanced string manipulation
- LanguageExtensions.array: Advanced array operations
- LanguageExtensions.object: Object transformation utilities
- LanguageExtensions.typeConversion: Type conversion helpers
- Available exports: core, dom, fp, functional, future, internal, lang, mobile
<!--FEATURES_END-->

## 🚀 Quick Start

<!--QUICK_START_START-->
## Quick Start

### Class System

```javascript
import { Class } from 'xajs/core';
const MyClass = Class({
  $extends: ParentClass,
  $mixins: [SomeMixin],
  $ctor() {
    this.name = 'example';
  }
});
```

### DOM Manipulation

```javascript
import { h } from 'xajs/dom';
const vnode = h('div', { className: 'container' }, [
  h('h1', null, 'Hello AJS!'),
  h('button', { onClick: () => alert('Clicked!') }, 'Click Me')
]);
```

### Functional Programming

```javascript
import { helper } from 'xajs/functional';
const { tryNext } = helper;
const result = await tryNext([
  async () => await primaryAPI(),
  async () => await fallbackAPI()
]);
```
<!--QUICK_START_END-->

## 📦 Modules

<!--MODULES_START-->
## Available Modules

  | Module | Description | Import Path |
  |---------|-------------|-------------|
  | core | Provides the foundational building blocks of AJS, including a powerful class system, deferred promises, and decorators for enhancing classes and methods. | `xajs/core` |
  | dom | Provides a lightweight virtual DOM implementation and utilities for DOM manipulation and event handling, with special optimizations for mobile devices. | `xajs/dom` |
  | fp | Core functional programming utilities focusing on pure function composition and immutable data handling. | `xajs/fp` |
  | functional | Provides a comprehensive set of functional programming utilities including function composition, currying, dependency injection, pub/sub system, and promise utilities. | `xajs/functional` |
  | future | Experimental and cutting-edge features for next-generation JavaScript development. | `xajs/future` |
  | lang | Advanced language utilities for string manipulation and code generation. | `xajs/lang` |
  | mobile | Comprehensive utilities for mobile web development and device detection. | `xajs/mobile` |

### core

  Provides the foundational building blocks of AJS, including a powerful class system, deferred promises, and decorators for enhancing classes and methods.

### Features

- ClassSystem.inheritance: Advanced class inheritance with $extends and $mixins support
- ClassSystem.constructor: Constructor lifecycle management with $ctor
- ClassSystem.methods: Method overriding and super calls
- ClassSystem.static: Static and instance method support
- Decorators.functions: Function and class decorators
- Decorators.builtin: Built-in decorators like @mixin and @deprecate
- Decorators.factory: Custom decorator factory support
- Decorators.properties: Method and property decorators
- Deferred.promise: Promise-like interface with resolve/reject
- Deferred.progress: Progress tracking with notify
- Deferred.chain: Chainable then/catch/finally
- Deferred.cancel: Cancellation support
- Available exports: base, decorators

### Examples

**Class System with Inheritance**

```javascript
import { base } from 'xajs/core';
const MyClass = base.Class({
  $extends: ParentClass,
  $mixins: [SomeMixin],
  $ctor() {
    this.name = 'example';
  },
  method() {
    // Method implementation
  }
});
```

**Using Decorators**

```javascript
import { decorators } from 'xajs/core';
class Enhanced {
  enhancedMethod() {
    // Enhanced functionality
  }
}
```

### dom

  Provides a lightweight virtual DOM implementation and utilities for DOM manipulation and event handling, with special optimizations for mobile devices.

### Features

- VirtualDOM.implementation: Lightweight virtual DOM implementation
- VirtualDOM.diff: Efficient diff and patch algorithm
- VirtualDOM.lifecycle: Component lifecycle management
- VirtualDOM.events: Event delegation support
- EventHandling.management: Advanced event management
- EventHandling.delegation: Event delegation and bubbling
- EventHandling.touch: Mobile touch event optimization
- EventHandling.lifecycle: Event once and off support
- URLParsing.parser: Robust URL parsing and manipulation
- URLParsing.query: Query string handling
- URLParsing.path: Path normalization
- URLParsing.params: URL parameter extraction
- Available exports: E, UrlParser, h, tags

### Examples

**Virtual DOM Creation**

```javascript
import { h } from 'xajs/dom';
const vnode = h('div', { className: 'container' }, [
  h('h1', null, 'Hello AJS!'),
  h('p', null, 'Welcome to the future of JavaScript.')
]);
```

**Event Handling**

```javascript
import { E } from 'xajs/dom';
E.on(element, 'click', event => {
  console.log('Clicked:', event.target);
});
E.once(element, 'load', event => {
  console.log('Loaded once');
});
```

**URL Parsing**

```javascript
import { UrlParser } from 'xajs/dom';
const parser = new UrlParser('https://example.com/path?query=value');
console.log(parser.pathname); // '/path'
console.log(parser.query); // { query: 'value' }
```

### fp

  Core functional programming utilities focusing on pure function composition and immutable data handling.

### Features

- FunctionalCore.composition: Pure function composition utilities
- FunctionalCore.pointfree: Point-free programming support
- FunctionalCore.currying: Function currying and partial application
- FunctionalCore.immutable: Immutable data handling patterns
- Available exports: compose, composeAsync

### Examples

```javascript
import { compose } from 'xajs/fp';
// Create a pipeline of pure functions
const pipeline = compose(uppercase, trim, normalize);
// Apply the transformation
const result = pipeline('  hello world  ');
```

### functional

  Provides a comprehensive set of functional programming utilities including function composition, currying, dependency injection, pub/sub system, and promise utilities.

### Features

- FunctionComposition.interceptors: Advanced interceptors for function composition
- FunctionComposition.async: Support for async function composition
- FunctionComposition.errorHandling: Error handling in composition chains
- FunctionComposition.middleware: Middleware pattern support
- DependencyInjection.decorators: Decorator-based DI system
- DependencyInjection.resolution: Automatic dependency resolution
- DependencyInjection.circular: Circular dependency detection
- DependencyInjection.scoping: Scoped container support
- EventSystem.pubsub: Pub/Sub pattern implementation
- EventSystem.priority: Event prioritization
- EventSystem.async: Async event handling
- EventSystem.cancellation: Event cancellation
- PromiseUtilities.lazy: Promise-based lazy evaluation
- PromiseUtilities.interception: Promise chain interception
- PromiseUtilities.fallback: Fallback chain with tryNext
- PromiseUtilities.timeout: Timeout and retry support
- Available exports: helper

### Examples

**Function Composition**

```javascript
import { helper } from 'xajs/functional';
const { intercepter } = helper;
const enhance = intercepter.compose([addLogging, addValidation, addCaching]);
```

**Dependency Injection**

```javascript
import { helper } from 'xajs/functional';
const { di } = helper;
class Config {
  getApiUrl() {
    return 'https://api.example.com';
  }
}
```

**Pub/Sub Pattern**

```javascript
import { helper } from 'xajs/functional';
const { PS } = helper;
const events = new PS();
events.on('userUpdate', user => {
  console.log('User updated:', user);
});
events.emit('userUpdate', { id: 1, name: 'John' });
```

### future

  Experimental and cutting-edge features for next-generation JavaScript development.

### Features

- ExperimentalFeatures.templates: Template rendering engine with reactive updates
- ExperimentalFeatures.effects: Advanced effect system for side-effect management
- ExperimentalFeatures.reactive: Reactive programming utilities and patterns
- ExperimentalFeatures.async: Next-generation async patterns and control
- ExperimentalFeatures.experimental: Cutting-edge JavaScript features exploration
- Available exports: TR, eff, tpl

### Examples

```javascript
import { trp, ae } from 'xajs/future';
// Create a template with reactive properties
const template = trp`
<div>
<h1>${state.title}</h1>
<p>${state.content}</p>
</div>
`;
// Use advanced effects
ae.effect(() => {
  // Side effects automatically tracked and cleaned up
  const subscription = api.subscribe(data => {
    state.update(data);
  });
  return () => subscription.unsubscribe();
});
```

### internal

  Core internal utilities and helper functions used across the library.

### Features

- InternalUtilities.typeChecking: Type checking and validation utilities
- InternalUtilities.objectUtils: Object property manipulation helpers
- InternalUtilities.helpers: Common internal helper functions
- InternalUtilities.shared: Shared utilities used across other modules
- Available exports: assign, hasOwnProp, is

### Examples

```javascript
import { is, assign } from 'xajs/internal';
// Type checking
if (is.string(value)) {
  // Handle string type
}
// Safe object assignment
const merged = assign({}, source, {
  newProp: 'value'
});
```

### lang

  Advanced language utilities for string manipulation and code generation.

### Features

- LanguageUtilities.string: String manipulation and transformation
- LanguageUtilities.language: Enhanced JavaScript language features
- LanguageUtilities.generation: Code generation utilities
- LanguageUtilities.dsl: DSL support tools
- Available exports: MagicString

### Examples

```javascript
import { MagicString } from 'xajs/lang';
// Create a magic string for code manipulation
const code = new MagicString('function hello() { return "world" }');
// Manipulate the code
code.update(8, 13, 'greet').append('hello()');
console.log(code.toString());
// Output: function greet() { return "world" }hello()
```

### mobile

  Comprehensive utilities for mobile web development and device detection.

### Features

- MobileUtilities.userAgent: User agent parsing and detection
- MobileUtilities.events: Mobile-specific event handling
- MobileUtilities.touch: Touch and gesture support
- MobileUtilities.device: Device capability detection
- MobileUtilities.responsive: Responsive design helpers

### Examples

```javascript
import { ua } from 'xajs/mobile';
// Detect device and platform
const userAgent = ua.parse(navigator.userAgent);
if (userAgent.isIOS) {
  // iOS specific handling
} else if (userAgent.isAndroid) {
  // Android specific handling
}
```
<!--MODULES_END-->

## 🤝 Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a Pull Request to the project.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ✨ Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/773248?v=4" width="100px;" alt="Archer (炽宇)"/><br /><sub><b>Archer (炽宇)</b></sub>](http://xiaoa.name)<br />[💻](https://github.com/qddegtya/ajs/commits?author=qddegtya "Code") [🚇](#infra-qddegtya "Infrastructure (Hosting, Build-Tools, etc)") [🚧](#maintenance-qddegtya "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
