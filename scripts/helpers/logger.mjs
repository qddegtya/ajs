import { LOG_CONFIG } from './config.mjs';

// 日志级别
export const LogLevel = LOG_CONFIG.levels;

let currentLogLevel = LOG_CONFIG.defaultLevel;

function formatMessage(level, message, context = {}) {
  const timestamp = new Date().toISOString();
  const contextStr = Object.keys(context).length 
    ? `\n${JSON.stringify(context, null, 2)}` 
    : '';
  return `[${timestamp}] [${level}] ${message}${contextStr}`;
}

export function setLogLevel(level) {
  currentLogLevel = level;
}

export function debug(message, context = {}) {
  if (currentLogLevel <= LogLevel.DEBUG) {
    console.debug(formatMessage('DEBUG', message, context));
  }
}

export function info(message, context = {}) {
  if (currentLogLevel <= LogLevel.INFO) {
    console.info(formatMessage('INFO', message, context));
  }
}

export function warn(message, context = {}) {
  if (currentLogLevel <= LogLevel.WARN) {
    console.warn(formatMessage('WARN', message, context));
  }
}

export function error(message, error = null, context = {}) {
  if (currentLogLevel <= LogLevel.ERROR) {
    const errorContext = error ? { 
      ...context, 
      error: error.message, 
      stack: error.stack 
    } : context;
    console.error(formatMessage('ERROR', message, errorContext));
  }
}
