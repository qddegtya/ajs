/**
 * 创建一个 DOM 元素
 * @param {string} tag - 标签名
 * @param {Object} [attrs] - 属性对象
 * @param {...(Node|string)} children - 子元素或文本
 * @returns {HTMLElement} 创建的 DOM 元素
 */
export function h(tag, attrs, ...children) {
  // 创建元素
  const element = document.createElement(tag);

  // 处理属性
  if (attrs && typeof attrs === 'object') {
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'style' && typeof value === 'object') {
        // 处理样式对象
        Object.assign(element.style, value);
      } else if (key.startsWith('on') && typeof value === 'function') {
        // 处理事件监听器
        const eventName = key.slice(2).toLowerCase();
        element.addEventListener(eventName, value);
      } else if (key === 'className') {
        // 处理 class
        element.className = Array.isArray(value) ? value.join(' ') : value;
      } else if (key === 'dataset') {
        // 处理 data-* 属性
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else {
        // 处理其他属性
        element.setAttribute(key, value);
      }
    });
  }

  // 处理子元素
  children.flat(Infinity).forEach(child => {
    if (child !== null && child !== undefined) {
      element.appendChild(
        child instanceof Node ? child : document.createTextNode(String(child))
      );
    }
  });

  return element;
}

/**
 * 创建常用 HTML 元素的快捷方式
 */
export const tags = [
  'div', 'span', 'p', 'a', 'img', 'button', 'input',
  'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'form', 'label', 'select', 'option', 'textarea'
].reduce((acc, tag) => {
  acc[tag] = (attrs, ...children) => h(tag, attrs, ...children);
  return acc;
}, {});

export default h;