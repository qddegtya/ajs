# AJS

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

# 关于

<!--ABOUT_START-->
🪄 Just another javascript utility library.
<!--ABOUT_END-->

# ✨ 概述

- 🌐 **主流 Javascript 运行时支持**
  - 完整支持 Node.js、Browser、Deno 等主流 JavaScript 运行时
  - 提供 UMD/CommonJS/ES Module 多模块规范支持
  - 零依赖实现，确保最大兼容性

- 📦 **模块化设计**
  - 支持按需引入
  - 完整的 Tree-shaking 支持
  - 独立的子模块发布支持

- 🛡️ **可靠性保证**
  - 完整的单元测试覆盖

- 🔄 **工程自动化**
  - 自动化的文档生成和同步
  - 自动化的版本管理和发布流程

- 💡 **开发者友好**
  - 详尽的 API 文档和使用示例
  - 完善的 Contributing 指南
  - 活跃的社区维护

- 📈 **持续维护**
  - 语义化版本控制
  - 及时的安全补丁

# 🌰 快速开始

<!--QUICK_START_START-->
## Examples

### 基础模块

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

### 高级模块

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

### 浏览器运行时相关

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

# 🎉 特性一览

<!--FEATURES_START-->
- Core
  - base: 基础核心模块，自定义类，支持类的私有属性、继承等特性
  - decorators: 常用装饰器，deprecate、mixin 等
  - Deferred: Deferred，维护异步模型状态
- DOM
  - h: DOM 创建操作的优雅封装
  - tags: 基于 h 封装常用 html tag 的快速创建方法
  - E: 增强版事件管理
  - UrlParser: 兼容性良好的 URL 解析器
- FP
  - compose: 同步组合
  - composeAsync: 异步组合
- Functional
  - intercepter: 支持同步、异步两种模式的通用函数拦截器
  - tryNext: 链式调用风格的 try
  - PS: 优雅的发布订阅实现
  - di: 简单实用的 DI 实现
- Future
  - TR: 支持依赖追踪，计算定义、组合的创新响应式
  - atom: 基于 TR 封装的、类似 Recoil Atom 的原子状态
  - selector: 基于 TR 封装的、类似 Recoil selector 的派生状态
  - eff: 基于迭代器特性实现的代数效应
  - tpl: 基于标签函数实现的简单实用模板引擎
- Mobile
  - UserAgent: User Agent 解析
  - device: 便捷的 UA 对象「设备属性」访问器
  - browser: 便捷的 UA 对象「浏览器属性」访问器
- Lang
  - MagicString: 支持链式调用的字符串不可变操作类
- Internal
  - is: 对象的类型运行时检查 (isArray, isObject, etc.)
  - assign: 安全的对象属性分配，可实现对象深拷贝等特性
  - hasOwnProp: 安全的对象自持属性嗅探
<!--FEATURES_END-->

# 📦 模块列表

<!--MODULES_START-->
## 可用模块

| 名称 | 描述 | 可按需引入的模块名 |
|---------|-------------|-------------|
| core | 核心基础包 | `xajs/core` |
| dom | 浏览器运行时相关包 | `xajs/dom` |
| fp | 函数式编程相关包 | `xajs/fp` |
| functional | 实用主义相关包 | `xajs/functional` |
| future | 高级及实验特性包 | `xajs/future` |
| internal | AJS 内部都在使用的实用工具包 | `xajs/internal` |
| lang | Javascript 语言特性扩展包 | `xajs/lang` |
| mobile | 移动端相关包 | `xajs/mobile` |

<details>
<summary>core</summary>

## core

核心基础包

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

</details>

<details>
<summary>dom</summary>

## dom

浏览器运行时相关包

### Examples

**DOM with Tags Helpers**

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
parser.setQueryParam('page', '2');
// 'https://example.com/new-path?q=search&tags[]=js&tags[]=dom&page=2'
```

</details>

<details>
<summary>fp</summary>

## fp

函数式编程相关包

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

</details>

<details>
<summary>functional</summary>

## functional

实用主义相关包

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

</details>

<details>
<summary>future</summary>

## future

高级及实验特性包

### Examples

**Reactive State Management**

```javascript
import { TR } from 'xajs/future';

// Create atomic states
const count1 = TR(1);
const count2 = TR(2);

// Create computed value
const sum = TR.compute((a, b) => a + b)(count1, count2);

// Create derived computation
const doubled = TR.compute(s => s * 2)(sum);

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

**Template Engine**

```javascript
import { tpl } from 'xajs/future';

// template
const template = tpl.exec(`<div>${name}<div>`, { name: 'AJS' });
```

</details>

<details>
<summary>internal</summary>

## internal

AJS 内部都在使用的实用工具包

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

</details>

<details>
<summary>lang</summary>

## lang

Javascript 语言特性扩展包

### Examples

**Basic String Operations**

```javascript
import { MagicString } from 'xajs/lang';

const str = MagicString('hello world');

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

</details>

<details>
<summary>mobile</summary>

## mobile

移动端相关包

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

</details>
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
