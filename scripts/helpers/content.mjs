import { getIndentation, formatIndentation } from './formatter.mjs';
import * as logger from './logger.mjs';

export function replaceContent(content, placeholder, newContent) {
  const { start: startMarker, end: endMarker } = placeholder;
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    logger.warn(`Could not find markers for ${startMarker}`);
    return content;
  }

  // 获取缩进
  const indentation = getIndentation(content, startIndex);

  // 处理新内容
  const lines = newContent.trim().split('\n');
  const processedLines = lines.map((line, index) => {
    // 空行处理
    if (!line.trim()) {
      return '';
    }

    // 检查是否在代码块内
    const prevLines = lines.slice(0, index);
    const codeBlockMarkers = prevLines.filter(l => l.trim().startsWith('```')).length;
    const isInCodeBlock = codeBlockMarkers % 2 === 1;

    // 代码块内的内容保持原样
    if (isInCodeBlock) {
      return indentation + line;
    }

    // 特殊行处理（标题、列表项等）
    if (line.trim().startsWith('#') || 
        line.trim().startsWith('-') || 
        line.trim().startsWith('*') ||
        line.trim().startsWith('1.')) {
      return indentation + line.trim();
    }

    // 代码块标记处理
    if (line.trim().startsWith('```')) {
      return (index > 0 ? '\n' : '') + indentation + line.trim();
    }

    // 普通内容处理
    return indentation + '  ' + line.trim();
  });

  // 确保内容前后有空行，并且移除多余的空行
  const processedContent = processedLines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n');

  return content.slice(0, startIndex + startMarker.length) + '\n' +
    processedContent.trim() + '\n' +
    content.slice(endIndex);
}

export function validatePlaceholders(content, placeholders) {
  const missingPlaceholders = [];
  
  for (const [name, markers] of Object.entries(placeholders)) {
    const { start, end } = markers;
    if (!content.includes(start) || !content.includes(end)) {
      missingPlaceholders.push(name);
    }
  }
  
  if (missingPlaceholders.length > 0) {
    throw new Error(`Missing placeholders: ${missingPlaceholders.join(', ')}`);
  }
}

export function extractContentBetweenMarkers(content, startMarker, endMarker) {
  const startIndex = content.indexOf(startMarker);
  const endIndex = content.indexOf(endMarker);

  if (startIndex === -1 || endIndex === -1) {
    return null;
  }

  return content.slice(startIndex + startMarker.length, endIndex).trim();
}
