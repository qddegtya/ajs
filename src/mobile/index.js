/**
 * Mobile Development Module
 * 
 * @module mobile
 * @description Comprehensive utilities for mobile web development and device detection.
 * 
 * @namespace MobileUtilities
 * @property {Object} userAgent - User agent parsing and detection
 * @property {Object} events - Mobile-specific event handling
 * @property {Object} touch - Touch and gesture support
 * @property {Object} device - Device capability detection
 * @property {Object} responsive - Responsive design helpers
 * 
 * @example
 * import { ua } from 'xajs/mobile'
 * 
 * // Detect device and platform
 * const userAgent = ua.parse(navigator.userAgent)
 * 
 * if (userAgent.isIOS) {
 *   // iOS specific handling
 * } else if (userAgent.isAndroid) {
 *   // Android specific handling
 * }
 */

export * from './ua'