// Track which warnings have been shown
const warningMap = new WeakMap();

/**
 * Decorator factory for marking methods or properties as deprecated
 * @param {string} [message] - Custom deprecation message
 * @returns {Function} Decorator function
 */
export function deprecate(message) {
  return function(target, key, descriptor) {
    const componentName = target.constructor ? target.constructor.name : 'Unknown';
    const defaultMessage = `Warning: ${componentName}.${key} is deprecated and will be removed in a future version.`;
    const warningMessage = message || defaultMessage;

    if (descriptor.value) {
      // For methods
      const original = descriptor.value;
      descriptor.value = function(...args) {
        showWarning(this, key, warningMessage);
        return original.apply(this, args);
      };
    } else if (descriptor.get || descriptor.set) {
      // For getters/setters
      const getter = descriptor.get;
      const setter = descriptor.set;

      if (getter) {
        descriptor.get = function() {
          showWarning(this, key, warningMessage);
          return getter.call(this);
        };
      }

      if (setter) {
        descriptor.set = function(value) {
          showWarning(this, key, warningMessage);
          setter.call(this, value);
        };
      }
    }

    return descriptor;
  };
}

/**
 * Shows the deprecation warning only once per instance/key combination
 * @param {Object} instance - Class instance
 * @param {string} key - Property or method name
 * @param {string} message - Warning message to show
 */
function showWarning(instance, key, message) {
  if (!warningMap.has(instance)) {
    warningMap.set(instance, new Set());
  }
  
  const warnings = warningMap.get(instance);
  if (!warnings.has(key)) {
    console.warn(message);
    warnings.add(key);
  }
}
