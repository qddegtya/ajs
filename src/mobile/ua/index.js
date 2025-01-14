/**
 * User Agent Parser Module
 * 
 * @module mobile/ua
 * 
 * @feature User Agent Analysis
 * - Comprehensive user agent parsing
 * - Browser and version detection
 * - Operating system identification
 * - Device type recognition
 * - Engine and rendering capabilities detection
 * 
 * @example
 * import { UserAgent } from 'xajs/mobile/ua'
 * 
 * const ua = new UserAgent(navigator.userAgent)
 * 
 * console.log({
 *   browser: ua.getBrowser(),
 *   os: ua.getOS(),
 *   device: ua.getDevice(),
 *   engine: ua.getEngine()
 * })
 */

export { UserAgent } from './UserAgent'
export { BrowserParser, EngineParser, OSParser, DeviceParser } from './parsers'
export { BaseParser } from './parsers/base'
