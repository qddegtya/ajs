import prettier from 'prettier';
import { PRETTIER_CONFIG } from './config.mjs';
import * as logger from './logger.mjs';

export async function formatCode(code, parser = 'babel') {
  logger.debug('Formatting code', {
    codePreview: code.slice(0, 50) + '...',
    parser,
    config: PRETTIER_CONFIG
  });

  try {
    const formattedCode = await prettier.format(code.trim(), {
      ...PRETTIER_CONFIG,
      parser
    });
    
    logger.debug('Code formatting successful', {
      resultPreview: formattedCode.slice(0, 50) + '...'
    });
    
    return formattedCode.trim();
  } catch (error) {
    logger.warn('Code formatting failed', error);
    return code.trim();
  }
}

export function formatIndentation(content, indentation = '') {
  return content
    .split('\n')
    .map(line => line.trim() ? indentation + line : '')
    .join('\n');
}

export function getIndentation(content, position) {
  const lastNewline = content.lastIndexOf('\n', position);
  if (lastNewline === -1) return '';
  const indentMatch = content.slice(lastNewline + 1, position).match(/^\s*/);
  return indentMatch ? indentMatch[0] : '';
}
