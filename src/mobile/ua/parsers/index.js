/**
 * User Agent Parsers Collection
 * 
 * @module mobile/ua/parsers
 * 
 * @feature UA Parsers
 * - Modular parser architecture
 * - Extensible parsing rules
 * - High accuracy detection
 * - Customizable parsing strategies
 * 
 * @example
 * import { BrowserParser, OSParser } from 'xajs/mobile/ua/parsers'
 * 
 * const browserInfo = new BrowserParser().parse(userAgent)
 * const osInfo = new OSParser().parse(userAgent)
 * 
 * console.log({
 *   browser: browserInfo.name,
 *   version: browserInfo.version,
 *   os: osInfo.name,
 *   platform: osInfo.platform
 * })
 */

export * from './base'
export * from './browser'
export * from './engine'
export * from './os'
export * from './device'
