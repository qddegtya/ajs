# AJS
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

# About

<!--ABOUT_START-->
🚀 A modern JavaScript utility library with minimal footprint and high flexibility ⚡
<!--ABOUT_END-->

# ✨ Features

<!--FEATURES_START-->
- Core.base: Lightweight class system with inheritance and mixins
- Core.decorators: Method decorators including deprecation and mixin support
- Core.Deferred: Enhanced Promise with resolve/reject control
- DOM.h: Hyperscript function for virtual DOM creation
- DOM.tags: Helper functions for common HTML elements
- DOM.E: Event management with delegation and one-time binding
- DOM.UrlParser: Advanced URL parsing and manipulation
- Functional.intercepter: Function interception with before/after hooks
- Functional.tryNext: Chain-based error handling with fallbacks
- Functional.PS: Pub/sub system with namespacing
- Functional.di: Dependency injection with decorators
- Future.TR: Reactive state management with dependency tracking
- Future.atom: Atomic state container with key identification
- Future.selector: Derived state computation with caching
- Future.eff: Effect system with automatic cleanup
- Mobile.UserAgent: Advanced device and browser detection
- Mobile.device: Device type and vendor detection
- Mobile.browser: Browser and version identification
- Lang.MagicString: Immutable string operations with chaining
- Internal.is: Type checking utilities (isArray, isObject, etc.)
- Internal.assign: Safe object assignment with deep copy
- Internal.hasOwnProp: Safe property existence check
- Available exports: core, dom, fp, functional, future, internal, lang, mobile
<!--FEATURES_END-->

# 🌰 Quick Start

<!--QUICK_START_START-->
## Examples

### Class System and Events

```javascript
import { core, dom } from 'xajs';

const Component = core.base.Class({
  $extends: BaseComponent,

  $static: {
    defaultConfig: { theme: 'light' }
  },

  $ctor(config) {
    this.$super();
    this.config = { ...this.constructor.defaultConfig, ...config };
    this.handler = dom.E.delegate('.menu a', {
      click: (e, target) => {
        e.preventDefault();
        this.navigate(target.getAttribute('href'));
      }
    });
  }
});
```

### Reactive State Management

```javascript
import { future, functional } from 'xajs';

// Create atomic state
const todoAtom = future.TR.atom({
  key: 'todoAtom',
  default: { items: [], filter: 'all' }
});

// Create derived state
const filteredTodos = future.TR.selector({
  key: 'filteredTodos',
  get: ({ get }) => {
    const state = get(todoAtom);
    return state.items.filter(item =>
      state.filter === 'all'
        ? true
        : state.filter === 'completed'
          ? item.completed
          : !item.completed
    );
  }
});

// Create pub/sub communication
const { Puber, Suber } = functional.PS;
const todoService = new Puber('todos');
const todoView = new Suber('view');

todoView.rss(todoService, [
  {
    msg: 'todos:updated',
    handler: todos => filteredTodos.observe(renderTodos)
  }
]);
```

### Mobile and DOM Utilities

```javascript
import { mobile, dom } from 'xajs';

// Device detection
const ua = new mobile.UserAgent(navigator.userAgent);
if (ua.isMobile()) {
  if (ua.isOS('iOS')) {
    enableIOSFeatures();
  }
}

// DOM manipulation
const { div, nav, a } = dom.tags;
const menu = div({ className: 'menu' }, [
  nav(null, [a({ href: '#home' }, 'Home'), a({ href: '#about' }, 'About')])
]);

// URL parsing
const url = new dom.UrlParser(location.href);
console.log(url.query.page);
```
<!--QUICK_START_END-->

# 📦 Modules

<!--MODULES_START-->
## Available Modules

  | Module | Description | Import Path |
  |---------|-------------|-------------|
  | core | Provides the foundational architecture of AJS, featuring a lightweight class system with inheritance and mixins, basic decorators, and a promise-based deferred implementation. | `xajs/core` |
  | dom | High-performance DOM manipulation with virtual DOM support, optimized event delegation, and unified touch event handling. Features include efficient diffing, batched updates, mobile-first event optimization, and memory leak prevention. | `xajs/dom` |
  | fp | Core functional programming utilities focusing on pure function composition, point-free programming, and immutable data handling. Features optimized composition chains with async support and type safety. | `xajs/fp` |
  | functional | High-performance functional programming utilities focusing on function interception, promise-based operations, and dependency injection. Features include function composition, lazy evaluation, pub/sub patterns, and robust error handling. | `xajs/functional` |
  | future | Cutting-edge experimental features exploring next-generation JavaScript patterns. Includes reactive templates, advanced effect management, and innovative async patterns. Features fine-grained reactivity, automatic dependency tracking, and intelligent resource management. | `xajs/future` |
  | lang | Advanced string manipulation utilities with immutable operations and chainable transformations. Features include case conversion, trimming, pattern matching, and string interpolation. | `xajs/lang` |
  | mobile | Advanced mobile device detection and user agent parsing system. Features comprehensive device fingerprinting, vendor detection, and detailed browser capabilities analysis through modular parsers. Includes robust handling of edge cases and unknown devices. | `xajs/mobile` |

### core

  Provides the foundational architecture of AJS, featuring a lightweight class system with inheritance and mixins, basic decorators, and a promise-based deferred implementation.

### Examples

**Class Definition with Static Members**

```javascript
import { base } from 'xajs/core';

const MyComponent = base.Class({
  $extends: BaseComponent,

  // Static properties and methods
  $static: {
    defaultConfig: {
      theme: 'light'
    },
    create(config) {
      return new this({ ...this.defaultConfig, ...config });
    }
  },

  // Constructor
  $ctor(config) {
    this.$super(); // Call parent constructor
    this.config = config;
    this.state = { count: 0 };
  },

  // Instance methods
  increment() {
    this.state.count++;
    this.emit('change', this.state.count);
  }
});
```

**Mixin and Deprecation**

```javascript
import { decorators } from 'xajs/core';

// Define a mixin
const LoggerMixin = {
  log(msg) {
    console.log(`[${this.constructor.name}] ${msg}`);
  }
};

// Apply mixin and deprecate old methods
@decorators.mixin(LoggerMixin)
class MyService {
  @decorators.deprecate('Use newMethod() instead', { since: '2.0.0' })
  oldMethod() {
    return this.newMethod();
  }

  newMethod() {
    this.log('Operation started');
    return this.processData();
  }
}
```

**Async Operations with Deferred**

```javascript
import { base } from 'xajs/core';

class DataLoader {
  async loadData(retryCount = 3) {
    const deferred = new base.Deferred();

    try {
      // Attempt to load data with retry
      for (let i = 0; i < retryCount; i++) {
        try {
          const response = await fetch('/api/data');
          if (!response.ok) throw new Error('API Error');
          const data = await response.json();
          return deferred.resolve(data);
        } catch (err) {
          if (i === retryCount - 1) throw err;
          await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        }
      }
    } catch (err) {
      deferred.reject(err);
    }

    return deferred.done(); // Ensures unhandled rejections are thrown
  }

  isDataLoaded() {
    return this.loadData.isDone();
  }
}
```

### dom

  High-performance DOM manipulation with virtual DOM support, optimized event delegation, and unified touch event handling. Features include efficient diffing, batched updates, mobile-first event optimization, and memory leak prevention.

### Examples

**Virtual DOM with Tags Helpers**

```javascript
import { h, tags } from 'xajs/dom';

// Using h function directly
const vnode = h('div', { className: 'container' }, [
  h('header', { key: 'header' }, [h('h1', null, 'Welcome')])
]);

// Using tags helpers (more concise)
const { div, header, h1, nav, a } = tags;

const menu = div({ className: 'container' }, [
  header({ key: 'header' }, [
    h1(null, 'Welcome'),
    nav({ className: 'menu' }, [
      a({ href: '#home' }, 'Home'),
      a({ href: '#about' }, 'About')
    ])
  ])
]);
```

**Advanced Event Handling**

```javascript
import { E } from 'xajs/dom';

// One-time event handling
E.once('window.load', () => {
  console.log('App loaded');
});

// Event sequence handling
E.once(
  'window.mouseover',
  'window.click',
  e => {
    console.log('Mouse over then clicked');
  },
  { capture: true }
);

// Efficient event delegation
const handler = E.delegate('.menu a', {
  click: (e, target) => {
    e.preventDefault();
    const href = target.getAttribute('href');
    router.navigate(href);
  },

  touchstart: (e, target) => {
    target.classList.add('active');
  },

  touchend: (e, target) => {
    target.classList.remove('active');
  }
});

// Automatic cleanup
E.cleanup(() => {
  handler.destroy();
});
```

**URL Parsing and Manipulation**

```javascript
import { UrlParser } from 'xajs/dom';

// Create parser instance
const parser = new UrlParser(
  'https://example.com/path?q=search&tags[]=js&tags[]=dom'
);

// Basic URL parts
console.log(parser.protocol); // 'https:'
console.log(parser.hostname); // 'example.com'
console.log(parser.pathname); // '/path'

// Advanced query handling
const query = parser.query;
console.log(query.q); // 'search'
console.log(query.tags); // ['js', 'dom']

// URL manipulation
parser.pathname = '/new-path';
parser.addQuery('page', '2');
console.log(parser.toString());
// 'https://example.com/new-path?q=search&tags[]=js&tags[]=dom&page=2'
```

### fp

  Core functional programming utilities focusing on pure function composition, point-free programming, and immutable data handling. Features optimized composition chains with async support and type safety.

### Examples

**Function Composition**

```javascript
import { compose, composeAsync } from 'xajs/fp';

// Synchronous composition
const enhance = compose(addTimestamp, validate, normalize);

// With type checking
const result = enhance({ name: 'example' });

// Async composition with error handling
const pipeline = composeAsync(
  async data => {
    const validated = await validate(data);
    if (!validated.success) {
      throw new ValidationError(validated.errors);
    }
    return validated.data;
  },
  async record => {
    const normalized = await normalize(record);
    return {
      ...normalized,
      timestamp: Date.now()
    };
  }
);
```

**Point-free Programming**

```javascript
import { pipe, curry } from 'xajs/fp';

// Create a point-free data transformation
const processUser = pipe(
  prop('user'),
  when(hasRole('admin'), addAdminFlag),
  over(lensProp('permissions'), map(normalize)),
  assoc('lastAccess', Date.now())
);

// Apply the transformation
const result = processUser(response);
```

### functional

  High-performance functional programming utilities focusing on function interception, promise-based operations, and dependency injection. Features include function composition, lazy evaluation, pub/sub patterns, and robust error handling.

### Examples

**Function Interception (Sync & Async)**

```javascript
import { helper } from 'xajs/functional';

// Synchronous interception
const loggedFetch = helper
  .intercepter(fetch)
  .before(url => {
    console.log(`Fetching: ${url}`);
  })
  .after((url, response) => {
    console.log(`Completed: ${url} (${response.status})`);
  }).$runner;

// Async interception
const cachedFetch = helper
  .intercepter(fetch)
  .before(async url => {
    const cached = await cache.get(url);
    if (cached) return cached;
  })
  .after(async (url, response) => {
    await cache.set(url, response.clone());
  }).$asyncRunner;
```

**Error Handling with tryNext**

```javascript
import { helper } from 'xajs/functional';

const { tryNext, sleep } = helper;

// Chain of fallback strategies
const getData = tryNext([
  // Primary strategy: API call
  async () => {
    const response = await fetch('/api/data');
    if (!response.ok) throw new Error('API failed');
    return response.json();
  },
  // Fallback: Local cache
  async () => {
    const cached = await localStorage.getItem('api_data');
    if (!cached) throw new Error('Cache miss');
    return JSON.parse(cached);
  },
  // Last resort: Default data
  () => ({ status: 'offline', data: [] })
]);
```

**Pub/Sub System**

```javascript
import { helper } from 'xajs/functional';

const {
  PS: { Puber, Suber }
} = helper;

// Create publisher and subscriber
class DataService extends Puber {
  constructor() {
    super('data-service', {});
  }

  async fetchData() {
    const data = await fetch('/api/data');
    this.pub('data:updated', await data.json());
  }
}

class DataView extends Suber {
  constructor(service) {
    super('data-view', {});
    this.rss(service, [
      {
        msg: 'data:updated',
        handler: this.onDataUpdate.bind(this)
      }
    ]);
  }

  onDataUpdate(data) {
    this.render(data);
  }
}
```

**Dependency Injection**

```javascript
import { helper } from 'xajs/functional';

const { di } = helper;

// Define services with dependencies
@di.provide('logger')
class Logger {
  log(msg) {
    console.log(msg);
  }
}

@di.provide('api')
@di.inject(['logger'])
class ApiService {
  constructor(logger) {
    this.logger = logger;
  }

  async fetch(url) {
    this.logger.log(`Fetching: ${url}`);
    return fetch(url).then(r => r.json());
  }
}
```

### future

  Cutting-edge experimental features exploring next-generation JavaScript patterns. Includes reactive templates, advanced effect management, and innovative async patterns. Features fine-grained reactivity, automatic dependency tracking, and intelligent resource management.

### Examples

**Reactive State Management**

```javascript
import { TR } from 'xajs/future';
const { atom, selector, compute } = TR;

// Create atomic states
const count1 = TR(1);
const count2 = TR(2);

// Create computed value
const sum = compute((a, b) => a + b)(count1, count2);

// Create derived computation
const doubled = compute(s => s * 2)(sum);

// Observe changes
sum.observe(val => console.log('Sum:', val)); // 3
doubled.observe(val => console.log('Double:', val)); // 6

// Update source values
count1(v => v + 1); // Sum: 4, Double: 8
count2(6); // Sum: 8, Double: 16

// Cleanup
sum.dispose();
doubled.dispose();
```

**Advanced State with Atoms**

```javascript
import { TR } from 'xajs/future';
const { atom, selector } = TR;

// Create base atom
const todoAtom = atom({
  key: 'todoAtom',
  default: {
    items: [],
    filter: 'all'
  }
});

// Create derived selectors
const filteredTodos = selector({
  key: 'filteredTodos',
  get: ({ get }) => {
    const state = get(todoAtom);
    switch (state.filter) {
      case 'completed':
        return state.items.filter(item => item.completed);
      case 'active':
        return state.items.filter(item => !item.completed);
      default:
        return state.items;
    }
  }
});

const todoStats = selector({
  key: 'todoStats',
  get: ({ get }) => {
    const items = get(todoAtom).items;
    return {
      total: items.length,
      completed: items.filter(item => item.completed).length,
      active: items.filter(item => !item.completed).length
    };
  }
});

// Use selectors
filteredTodos.observe(todos => {
  renderTodoList(todos);
});

todoStats.observe(stats => {
  updateStatusBar(stats);
});
```

**Effect System with Cleanup**

```javascript
import { eff } from 'xajs/future';

// Create reactive effect
const cleanup = eff.effect(() => {
  const subscription = api.subscribe(data => {
    processData(data);
  });

  // Effect cleanup
  return () => {
    subscription.unsubscribe();
  };
});

// Reactive template with automatic updates
const template = eff.template`
<div class="user-card">
<h2>${() => user.name}</h2>
<p>${() => user.bio}</p>
<div class="stats">
${() =>
  user.stats
    .map(
      stat => `
<div class="stat">
<strong>${stat.label}</strong>
<span>${stat.value}</span>
</div>
`
    )
    .join('')}
</div>
</div>
`;

// Cleanup when done
cleanup();
```

### internal

  Core internal utilities providing type checking, object manipulation, and shared helper functions. Features comprehensive type detection and safe object operations with performance optimization.

### Examples

**Type Checking**

```javascript
import { is } from 'xajs/internal';

// Array checks
console.log(is.isArray([1, 2, 3])); // true
console.log(is.isArray({})); // false

// Object checks
console.log(is.isObject({})); // true
console.log(is.isObject([])); // false

// Function checks
console.log(is.isFunction(() => {})); // true
console.log(is.isFunction(async () => {})); // true
console.log(is.isFunction(function* () {})); // true

// Boolean checks
console.log(is.isBoolean(true)); // true
console.log(is.isBoolean(1)); // false
```

**Safe Object Operations**

```javascript
import { assign, hasOwnProp } from 'xajs/internal';

// Safe object assignment
const base = { a: 1, b: { c: 2 } };
const extension = { b: { d: 3 }, e: 4 };

const result = assign({}, base, extension);
console.log(result);
// {
//   a: 1,
//   b: { c: 2, d: 3 },
//   e: 4
// }

// Safe property checks
if (hasOwnProp(result, 'b')) {
  console.log('Property exists:', result.b);
}
```

**Type-Safe Operations**

```javascript
import { is, assign } from 'xajs/internal';

function safeUpdate(target, source) {
  // Type validation
  if (!is.isObject(target) || !is.isObject(source)) {
    throw new TypeError('Both arguments must be objects');
  }

  // Safe assignment with type checking
  const result = assign({}, target);

  for (const key in source) {
    if (hasOwnProp(source, key)) {
      const value = source[key];

      // Type-specific handling
      if (is.isArray(value)) {
        result[key] = [...value];
      } else if (is.isObject(value)) {
        result[key] = safeUpdate({}, value);
      } else {
        result[key] = value;
      }
    }
  }

  return result;
}
```

### lang

  Advanced string manipulation utilities with immutable operations and chainable transformations. Features include case conversion, trimming, pattern matching, and string interpolation.

### Examples

**Basic String Operations**

```javascript
import { MagicString } from 'xajs/lang';

const str = MagicString('  hello world  ');

// Chain multiple operations
const result = str.trim().capitalize().replace(/world/, 'AJS');

console.log(result); // 'Hello AJS'
console.log(str); // Original string unchanged
```

**Advanced Pattern Matching**

```javascript
import { MagicString } from 'xajs/lang';

const text = MagicString('user.name.first');

// Replace with callback
const result = text.replace(/\w+/g, (match, index) => {
  if (index === 0) return match;
  return match.toUpperCase();
});

console.log(result); // 'user.NAME.FIRST'
```

**String Transformation**

```javascript
import { MagicString } from 'xajs/lang';

const template = MagicString('Hello, ${name}!');

// Interpolate values
const greeting = template.replace(
  /\${(\w+)}/g,
  (_, key) =>
    ({
      name: 'AJS User'
    })[key] || ''
);

console.log(greeting); // 'Hello, AJS User!'
```

### mobile

  Advanced mobile device detection and user agent parsing system. Features comprehensive device fingerprinting, vendor detection, and detailed browser capabilities analysis through modular parsers. Includes robust handling of edge cases and unknown devices.

### Examples

**Device Detection and Feature Support**

```javascript
import { UserAgent } from 'xajs/mobile';

// Initialize with current user agent
const ua = new UserAgent(navigator.userAgent);

// Comprehensive device check
if (ua.isMobile()) {
  // Mobile-specific optimizations
  if (ua.isOS('iOS')) {
    // iOS specific features
    if (parseFloat(ua.getResult().os.version) >= 14.5) {
      enableModernIOSFeatures();
    } else {
      enableLegacyIOSSupport();
    }
  } else if (ua.isOS('Android')) {
    const version = parseFloat(ua.getResult().os.version);
    if (version >= 10) {
      enableModernAndroidFeatures();
    } else {
      enableLegacyAndroidSupport();
    }
  }
} else if (ua.isTablet()) {
  // Tablet optimizations
  const { device } = ua.getResult();
  if (device.vendor === 'Apple' && device.model === 'iPad') {
    enableIPadFeatures();
  }
} else if (ua.isDesktop()) {
  // Desktop optimizations
  enableDesktopFeatures();
}
```

**Browser and Engine Detection**

```javascript
import { UserAgent } from 'xajs/mobile';

const ua = new UserAgent(navigator.userAgent);
const { browser, engine } = ua.getResult();

// Comprehensive browser checks
if (ua.isBrowser('Chrome')) {
  const version = parseFloat(browser.version);
  if (version >= 90) {
    // Modern Chrome features
    enableProgressiveFeatures();
  } else if (version >= 80) {
    // Legacy but stable Chrome features
    enableBasicFeatures();
  } else {
    // Very old Chrome
    showBrowserUpdateNotice();
  }
} else if (ua.isBrowser('Safari')) {
  if (parseFloat(browser.version) >= 14) {
    if (engine.name === 'Webkit') {
      // Modern Safari + Webkit
      enableWebkitOptimizations();
    }
  } else {
    // Legacy Safari support
    enableLegacySafariSupport();
  }
}
```

**Edge Cases and Unknown Devices**

```javascript
import { UserAgent } from 'xajs/mobile';

function detectDevice(userAgent = '') {
  const ua = new UserAgent(userAgent);
  const result = ua.getResult();

  // Handle empty or invalid UA strings
  if (!userAgent) {
    return {
      type: 'unknown',
      capabilities: getDefaultCapabilities()
    };
  }

  // Handle unknown browsers
  if (!result.browser.name) {
    // Fallback to engine detection
    if (result.engine.name) {
      return {
        type: 'generic',
        engine: result.engine.name,
        capabilities: detectEngineCapabilities(result.engine)
      };
    }
  }

  // Handle unknown devices
  if (!result.device.type) {
    // Fallback to screen size detection
    return {
      type: detectDeviceTypeFromScreen(),
      capabilities: detectCapabilitiesFromScreen()
    };
  }

  return result;
}
```
<!--MODULES_END-->

# 🤝 Contributing

Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a Pull Request to the project.

# 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# ✨ Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/773248?v=4" width="100px;" alt="Archer (炽宇)"/><br /><sub><b>Archer (炽宇)</b></sub>](http://xiaoa.name)<br />[💻](https://github.com/qddegtya/ajs/commits?author=qddegtya "Code") [🚇](#infra-qddegtya "Infrastructure (Hosting, Build-Tools, etc)") [🚧](#maintenance-qddegtya "Maintenance") |
| :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
