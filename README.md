# AJS
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

## About

<!--ABOUT_START-->
A thoughtfully crafted JavaScript utility library that combines classical utilities with modern programming paradigms. It provides a rich set of tools while maintaining a minimal footprint and high flexibility.
<!--ABOUT_END-->

## ✨ Features

<!--FEATURES_START-->

### CoreUtilities

  - Powerful class system with inheritance and mixins
  - Flexible decorators for enhancing classes and methods
  - Promise utilities and deferred execution
  - Type checking and object manipulation

### DOMManipulation

  - Lightweight virtual DOM implementation
  - Event handling and delegation
  - Mobile-optimized touch events
  - URL parsing and manipulation

### FunctionalProgramming

  - Function composition and currying
  - Dependency injection system
  - Pub/Sub event system
  - Promise-based utilities

### LanguageExtensions

  - Enhanced string manipulation
  - Advanced array operations
  - Object transformation utilities
  - Type conversion helpers



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
});```

### DOM Manipulation

```javascript
  import { h } from 'xajs/dom';
  const vnode = h('div', { className: 'container' }, [
    h('h1', null, 'Hello AJS!'),
    h('button', { onClick: () => alert('Clicked!') }, 'Click Me')
  ]);```

### Functional Programming


```javascript
import { helper } from 'xajs/functional';
const { tryNext } = helper;
const result = await tryNext([
  async () => await primaryAPI(),
  async () => await fallbackAPI()
]);```



<!--QUICK_START_END-->

## 📦 Modules

<!--MODULES_START-->

  | Module | Description | Import Path |
  |---------|-------------|-------------|
  | core |  | `xajs/core` |
  | dom |  | `xajs/dom` |
  | fp |  | `xajs/fp` |
  | functional |  | `xajs/functional` |
  | future |  | `xajs/future` |
  | index.js |  | `xajs/index.js` |
  | internal |  | `xajs/internal` |
  | lang |  | `xajs/lang` |
  | mobile |  | `xajs/mobile` |
  | mobile |  | `xajs/mobile` |
  | mobile |  | `xajs/mobile` |

### core

  Core module providing fundamental building blocks for AJS Provides the foundational building blocks of AJS, including a powerful class system, deferred promises, and decorators for enhancing classes and methods.

### Key Features

  **ClassSystem**
  - Advanced class inheritance with $extends and $mixins support
  - Constructor lifecycle management with $ctor
  - Method overriding and super calls
  - Static and instance method support

  **Decorators**
  - Function and class decorators
  - Built-in decorators like @mixin and @deprecate
  - Custom decorator factory support
  - Method and property decorators

  **Deferred**
  - Promise-like interface with resolve/reject
  - Progress tracking with notify
  - Chainable then/catch/finally
  - Cancellation support

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

  ,**Using Decorators**


```javascript
import { decorators } from 'xajs/core';
class Enhanced {
  enhancedMethod() {
    // Enhanced functionality
  }
}
```




### dom

  DOM manipulation and event handling utilities Provides a lightweight virtual DOM implementation and utilities for DOM manipulation and event handling, with special optimizations for mobile devices.

### Key Features

  **VirtualDOM**
  - Lightweight virtual DOM implementation
  - Efficient diff and patch algorithm
  - Component lifecycle management
  - Event delegation support

  **EventHandling**
  - Advanced event management
  - Event delegation and bubbling
  - Mobile touch event optimization
  - Event once and off support

  **URLParsing**
  - Robust URL parsing and manipulation
  - Query string handling
  - Path normalization
  - URL parameter extraction

### Examples

  **Virtual DOM Creation**


```javascript
import { h } from 'xajs/dom';
const vnode = h('div', { className: 'container' }, [
  h('h1', null, 'Hello AJS!'),
  h('p', null, 'Welcome to the future of JavaScript.')
]);
```

  ,**Event Handling**


```javascript
import { E } from 'xajs/dom';
E.on(element, 'click', event => {
  console.log('Clicked:', event.target);
});
E.once(element, 'load', event => {
  console.log('Loaded once');
});
```

  ,**URL Parsing**


```javascript
import { UrlParser } from 'xajs/dom';
const parser = new UrlParser('https://example.com/path?query=value');
console.log(parser.pathname); // '/path'
console.log(parser.query); // { query: 'value' }
```




### fp

  Functional Programming Core Module Core functional programming utilities focusing on pure function composition and immutable data handling.

### Key Features

  **FunctionalCore**
  - Pure function composition utilities
  - Point-free programming support
  - Function currying and partial application
  - Immutable data handling patterns

### Examples


```javascript
import { compose } from 'xajs/fp';
// Create a pipeline of pure functions
const pipeline = compose(uppercase, trim, normalize);
// Apply the transformation
const result = pipeline('  hello world  ');
```




### functional

  Functional programming utilities and patterns Provides a comprehensive set of functional programming utilities including function composition, currying, dependency injection, pub/sub system, and promise utilities.

### Key Features

  **FunctionComposition**
  - Advanced interceptors for function composition
  - Support for async function composition
  - Error handling in composition chains
  - Middleware pattern support

  **DependencyInjection**
  - Decorator-based DI system
  - Automatic dependency resolution
  - Circular dependency detection
  - Scoped container support

  **EventSystem**
  - Pub/Sub pattern implementation
  - Event prioritization
  - Async event handling
  - Event cancellation

  **PromiseUtilities**
  - Promise-based lazy evaluation
  - Promise chain interception
  - Fallback chain with tryNext
  - Timeout and retry support

### Examples

  **Function Composition**


```javascript
import { helper } from 'xajs/functional';
const { intercepter } = helper;
const enhance = intercepter.compose([addLogging, addValidation, addCaching]);
```

  ,**Dependency Injection**


```javascript
import { helper } from 'xajs/functional';
const { di } = helper;
class Config {
  getApiUrl() {
    return 'https://api.example.com';
  }
}
```

  ,**Pub/Sub Pattern**


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

  Experimental Features Module Experimental and cutting-edge features for next-generation JavaScript development.

### Key Features

  **ExperimentalFeatures**
  - Template rendering engine with reactive updates
  - Advanced effect system for side-effect management
  - Reactive programming utilities and patterns
  - Next-generation async patterns and control
  - Cutting-edge JavaScript features exploration

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




### index.js

  AJS - A thoughtfully crafted JavaScript utility library A thoughtfully crafted JavaScript utility library that combines classical utilities with modern programming paradigms. It provides a rich set of tools while maintaining a minimal footprint and high flexibility.

### Key Features

  **CoreUtilities**
  - Powerful class system with inheritance and mixins
  - Flexible decorators for enhancing classes and methods
  - Promise utilities and deferred execution
  - Type checking and object manipulation

  **DOMManipulation**
  - Lightweight virtual DOM implementation
  - Event handling and delegation
  - Mobile-optimized touch events
  - URL parsing and manipulation

  **FunctionalProgramming**
  - Function composition and currying
  - Dependency injection system
  - Pub/Sub event system
  - Promise-based utilities

  **LanguageExtensions**
  - Enhanced string manipulation
  - Advanced array operations
  - Object transformation utilities
  - Type conversion helpers

### Examples

  **Class System**


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

  ,**DOM Manipulation**


```javascript
import { h } from 'xajs/dom';
const vnode = h('div', { className: 'container' }, [
  h('h1', null, 'Hello AJS!'),
  h('button', { onClick: () => alert('Clicked!') }, 'Click Me')
]);
```

  ,**Functional Programming**


```javascript
import { helper } from 'xajs/functional';
const { tryNext } = helper;
const result = await tryNext([
  async () => await primaryAPI(),
  async () => await fallbackAPI()
]);
```




### internal

  Internal Utilities Module Core internal utilities and helper functions used across the library.

### Key Features

  **InternalUtilities**
  - Type checking and validation utilities
  - Object property manipulation helpers
  - Common internal helper functions
  - Shared utilities used across other modules

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

  Language Enhancement Module Advanced language utilities for string manipulation and code generation.

### Key Features

  **LanguageUtilities**
  - String manipulation and transformation
  - Enhanced JavaScript language features
  - Code generation utilities
  - DSL support tools

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

  Mobile Development Module Comprehensive utilities for mobile web development and device detection.

### Key Features

  **MobileUtilities**
  - User agent parsing and detection
  - Mobile-specific event handling
  - Touch and gesture support
  - Device capability detection
  - Responsive design helpers

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




### mobile

  User Agent Parser Module - Comprehensive user agent parsing - Browser and version detection - Operating system identification - Device type recognition - Engine and rendering capabilities detection

### Examples


```javascript
import { UserAgent } from 'xajs/mobile/ua';
const ua = new UserAgent(navigator.userAgent);
console.log({
  browser: ua.getBrowser(),
  os: ua.getOS(),
  device: ua.getDevice(),
  engine: ua.getEngine()
});
```




### mobile

  User Agent Parsers Collection - Modular parser architecture - Extensible parsing rules - High accuracy detection - Customizable parsing strategies

### Examples


```javascript
import { BrowserParser, OSParser } from 'xajs/mobile/ua/parsers';
const browserInfo = new BrowserParser().parse(userAgent);
const osInfo = new OSParser().parse(userAgent);
console.log({
  browser: browserInfo.name,
  version: browserInfo.version,
  os: osInfo.name,
  platform: osInfo.platform
});
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
