/**
 * URL 正则表达式，用于解析 URL 的各个部分
 * 格式: [protocol://][username:password@]hostname[:port][/path][?query][#hash]
 */
const URL_REGEX = /^(?:([^:/?#]+):\/\/)?(?:([^:@]*):?([^:@]*)@)?([^:/?#]*)(?::(\d*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?$/

/**
 * 解析查询字符串
 * @param {string} queryString - 要解析的查询字符串
 * @returns {Object} 解析后的查询参数对象
 */
function parseQueryString(queryString) {
  const params = {}
  if (!queryString) return params

  queryString.split('&').forEach(param => {
    if (!param) return
    const [key, ...values] = param.split('=')
    const value = values.join('=') // 处理值中包含 = 的情况
    const decodedKey = decodeURIComponent(key)
    const decodedValue = value ? decodeURIComponent(value) : ''

    if (decodedKey) {
      if (params[decodedKey]) {
        params[decodedKey] = Array.isArray(params[decodedKey])
          ? [...params[decodedKey], decodedValue]
          : [params[decodedKey], decodedValue]
      } else {
        params[decodedKey] = decodedValue
      }
    }
  })

  return params
}

/**
 * 将对象序列化为查询字符串
 * @param {Object} params - 要序列化的对象
 * @returns {string} 序列化后的查询字符串
 */
function stringifyQueryParams(params) {
  if (!params || typeof params !== 'object') return ''

  return Object.entries(params)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return value
          .map(v => `${encodeURIComponent(key)}=${encodeURIComponent(v ?? '')}`)
          .join('&')
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value ?? '')}`
    })
    .join('&')
}

/**
 * 检查 URL 是否有效
 * @param {string} url - 要检查的 URL
 * @returns {boolean} 是否有效
 */
function isValidUrl(url) {
  // 空 URL 是有效的
  if (!url) return true

  // 检查是否包含非法字符（允许更多特殊字符）
  if (url.match(/[^\x21-\x7E]/)) {
    return false
  }

  // 检查协议部分
  const protocolIndex = url.indexOf('://')
  if (protocolIndex !== -1) {
    const protocol = url.substring(0, protocolIndex)
    // 检查协议格式
    if (!protocol.match(/^[a-zA-Z][a-zA-Z0-9+.-]*$/)) {
      return false
    }
    // 检查协议后的部分是否为空
    if (url.length <= protocolIndex + 3) {
      return false
    }
  }

  // 提取主机部分
  let hostPart = url
  if (protocolIndex !== -1) {
    hostPart = url.substring(protocolIndex + 3)
  }

  // 检查认证信息
  const atIndex = hostPart.indexOf('@')
  if (atIndex !== -1) {
    const authPart = hostPart.substring(0, atIndex)
    const colonCount = (authPart.match(/:/g) || []).length
    // 认证信息中最多只能有一个冒号（用于分隔用户名和密码）
    if (colonCount > 1) {
      return false
    }
    hostPart = hostPart.substring(atIndex + 1)
  }

  // 检查主机和端口
  const pathIndex = hostPart.indexOf('/')
  const queryIndex = hostPart.indexOf('?')
  const hashIndex = hostPart.indexOf('#')
  let endIndex = hostPart.length
  if (pathIndex !== -1) endIndex = Math.min(endIndex, pathIndex)
  if (queryIndex !== -1) endIndex = Math.min(endIndex, queryIndex)
  if (hashIndex !== -1) endIndex = Math.min(endIndex, hashIndex)

  const host = hostPart.substring(0, endIndex)
  const colonCount = (host.match(/:/g) || []).length
  // 主机部分最多只能有一个冒号（用于分隔主机名和端口）
  if (colonCount > 1) {
    return false
  }

  return true
}

/**
 * URL 解析器类
 */
export class UrlParser {
  /**
   * @param {string} url - 要解析的 URL
   */
  constructor(url) {
    this.parse(url || '')
  }

  /**
   * 解析 URL
   * @param {string} url - 要解析的 URL
   * @private
   * @throws {Error} 当 URL 格式无效时抛出错误
   */
  parse(url) {
    if (!isValidUrl(url)) {
      throw new Error('Invalid URL format')
    }

    const matches = URL_REGEX.exec(url)
    if (!matches) {
      throw new Error('Invalid URL format')
    }

    const [
      ,
      protocol,
      username,
      password,
      hostname,
      port,
      path,
      query,
      hash
    ] = matches

    // 检查端口格式
    if (port && !/^\d+$/.test(port)) {
      throw new Error('Invalid URL format')
    }

    this.protocol = protocol || ''
    this.username = username || ''
    this.password = password || ''
    this.hostname = hostname || ''
    this.port = port || ''
    this.path = path || ''
    this.query = query || ''
    this.hash = hash || ''
    this.queryParams = parseQueryString(this.query)
  }

  /**
   * 获取完整的 URL
   * @returns {string} 完整的 URL
   */
  toString() {
    let url = ''

    // 添加协议
    if (this.protocol) {
      url += `${this.protocol}://`
    }

    // 添加主机部分
    if (this.hostname) {
      if (this.username) {
        url += this.username
        if (this.password) {
          url += `:${this.password}`
        }
        url += '@'
      }
      url += this.hostname
      if (this.port) {
        url += `:${this.port}`
      }
    }

    // 添加路径
    url += this.path

    // 添加查询参数
    const queryString = stringifyQueryParams(this.queryParams)
    if (queryString) {
      url += `?${queryString}`
    }

    // 添加哈希
    if (this.hash) {
      url += `#${this.hash}`
    }

    return url
  }

  /**
   * 设置查询参数
   * @param {string} key - 参数名
   * @param {string|string[]} value - 参数值
   * @returns {UrlParser} 当前实例，支持链式调用
   */
  setQueryParam(key, value) {
    this.queryParams[key] = value
    return this
  }

  /**
   * 获取查询参数
   * @param {string} key - 参数名
   * @returns {string|string[]|undefined} 参数值
   */
  getQueryParam(key) {
    return this.queryParams[key]
  }

  /**
   * 删除查询参数
   * @param {string} key - 要删除的参数名
   * @returns {UrlParser} 当前实例，支持链式调用
   */
  removeQueryParam(key) {
    delete this.queryParams[key]
    return this
  }

  /**
   * 解析相对路径
   * @param {string} relativePath - 相对路径
   * @returns {UrlParser} 新的 URL 解析器实例
   */
  resolve(relativePath) {
    if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
      return new UrlParser(relativePath)
    }

    const base = this.toString()
    const baseUrl = base.split('#')[0].split('?')[0]
    const isAbsolute = relativePath.startsWith('/')

    let newPath
    if (isAbsolute) {
      newPath = relativePath
    } else {
      const basePath = baseUrl.endsWith('/')
        ? baseUrl
        : baseUrl.substring(0, baseUrl.lastIndexOf('/') + 1)
      newPath = basePath.replace(/^[^/]*:\/\/[^/]+/, '') + relativePath
    }

    // 处理 ../
    const parts = newPath.split('/')
    const stack = []
    for (const part of parts) {
      if (part === '..') {
        stack.pop()
      } else if (part !== '.' && part !== '') {
        stack.push(part)
      }
    }

    const finalPath = '/' + stack.join('/')
    return new UrlParser(
      `${this.protocol}://${this.hostname}${this.port ? ':' + this.port : ''}${finalPath}`
    )
  }

  /**
   * 克隆当前实例
   * @returns {UrlParser} 新的 URL 解析器实例
   */
  clone() {
    return new UrlParser(this.toString())
  }
}
