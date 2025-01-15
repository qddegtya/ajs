/**
 * Mobile Development Module
 * 
 * @module mobile
 * @description 移动端相关包
 * 
 * @namespace MobileUtilities
 * @property {Object} ua - User agent parsing system with priority-based parsers
 * @property {Object} device - Device type and vendor detection with fallbacks
 * @property {Object} browser - Browser and version identification with feature detection
 * @property {Object} engine - Rendering engine detection and capability analysis
 * 
 * @example <caption>Device Detection and Feature Support</caption>
 * import { UserAgent } from 'xajs/mobile'
 * 
 * // Initialize with current user agent
 * const ua = new UserAgent(navigator.userAgent)
 * 
 * // Comprehensive device check
 * if (ua.isMobile()) {
 *   // Mobile-specific optimizations
 *   if (ua.isOS('iOS')) {
 *     // iOS specific features
 *     if (parseFloat(ua.getResult().os.version) >= 14.5) {
 *       enableModernIOSFeatures()
 *     } else {
 *       enableLegacyIOSSupport()
 *     }
 *   } else if (ua.isOS('Android')) {
 *     const version = parseFloat(ua.getResult().os.version)
 *     if (version >= 10) {
 *       enableModernAndroidFeatures()
 *     } else {
 *       enableLegacyAndroidSupport()
 *     }
 *   }
 * } else if (ua.isTablet()) {
 *   // Tablet optimizations
 *   const { device } = ua.getResult()
 *   if (device.vendor === 'Apple' && device.model === 'iPad') {
 *     enableIPadFeatures()
 *   }
 * } else if (ua.isDesktop()) {
 *   // Desktop optimizations
 *   enableDesktopFeatures()
 * }
 * 
 * @example <caption>Browser and Engine Detection</caption>
 * import { UserAgent } from 'xajs/mobile'
 * 
 * const ua = new UserAgent(navigator.userAgent)
 * const { browser, engine } = ua.getResult()
 * 
 * // Comprehensive browser checks
 * if (ua.isBrowser('Chrome')) {
 *   const version = parseFloat(browser.version)
 *   if (version >= 90) {
 *     // Modern Chrome features
 *     enableProgressiveFeatures()
 *   } else if (version >= 80) {
 *     // Legacy but stable Chrome features
 *     enableBasicFeatures()
 *   } else {
 *     // Very old Chrome
 *     showBrowserUpdateNotice()
 *   }
 * } else if (ua.isBrowser('Safari')) {
 *   if (parseFloat(browser.version) >= 14) {
 *     if (engine.name === 'Webkit') {
 *       // Modern Safari + Webkit
 *       enableWebkitOptimizations()
 *     }
 *   } else {
 *     // Legacy Safari support
 *     enableLegacySafariSupport()
 *   }
 * }
 * 
 */

export * from './ua'