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

  // 处理新内容，保持适当的缩进
  const lines = newContent.split('\n');
  const processedLines = lines.map((line, index) => {
    // 空行处理
    if (!line.trim()) {
      return '';
    }

    // 检查是否在代码块内
    const prevLines = lines.slice(0, index);
    const codeBlockMarkers = prevLines.filter(l => l.trim().startsWith('```')).length;
    const isInCodeBlock = codeBlockMarkers % 2 === 1;

    // 代码块内的内容不缩进
    if (isInCodeBlock) {
      return line;
    }

    // 代码块标记和标题的特殊处理
    if (line.trim().startsWith('```') || line.trim().startsWith('#')) {
      // 代码块开始标记前添加空行
      if (line.trim().startsWith('```')) {
        return '\n' + indentation + line;
      }
      return indentation + line;
    }

    // 其他内容添加额外缩进
    return indentation + '  ' + line;
  });

  // 确保内容前后有空行
  const processedContent = processedLines.join('\n');
  return content.slice(0, startIndex + startMarker.length) + '\n\n' +
    processedContent + '\n\n' +
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
