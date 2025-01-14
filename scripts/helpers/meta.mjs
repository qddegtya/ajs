import { parse } from '@babel/parser';
import traverseDefault from '@babel/traverse';
import { BABEL_PARSER_CONFIG, JSDOC_CONFIG } from './config.mjs';
import * as logger from './logger.mjs';

const traverse = traverseDefault.default;

function initializeJSDocInfo() {
  return {
    description: '',
    features: [],
    examples: [],
    see: [],
    exports: [],
    namespaces: {}
  };
}

function cleanDescription(description) {
  return description
    .replace(/^\s*[A-Z][^\n.!?]*[.!?]/, '') // Remove leading sentence if it starts with capital and ends with punctuation
    .trim();
}

function extractFeaturesFromDescription(description) {
  const features = [];
  const sentences = description.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  
  for (const sentence of sentences) {
    if (sentence.includes('provides') || 
        sentence.includes('supports') || 
        sentence.includes('enables') ||
        sentence.includes('allows') ||
        sentence.includes('featuring')) {
      features.push(sentence);
    }
  }
  
  return features;
}

function extractNamespaceInfo(comment) {
  const namespaces = {};
  const lines = comment.split('\n');
  let currentNamespace = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Extract namespace
    const namespaceMatch = trimmedLine.match(/@namespace\s+(\w+)/);
    if (namespaceMatch) {
      currentNamespace = namespaceMatch[1];
      namespaces[currentNamespace] = {
        name: currentNamespace,
        properties: {}
      };
      continue;
    }

    // Extract properties for current namespace
    const propertyMatch = trimmedLine.match(/@property\s+{([^}]+)}\s+(\w+)\s*-?\s*(.*)/);
    if (propertyMatch && currentNamespace) {
      const [, type, name, description] = propertyMatch;
      namespaces[currentNamespace].properties[name] = {
        type: type.trim(),
        name: name.trim(),
        description: description.trim()
      };
    }
  }

  return namespaces;
}

function parseJSDocComment(comment) {
  const info = initializeJSDocInfo();
  const blocks = [];
  let currentBlock = { type: 'description', content: [] };

  // 首先清理注释标记
  const cleanedComment = comment.split('\n')
    .map(line => line.trim().replace(/^\/\*\*|\*\/|\*\s*/, ''))
    .join('\n');

  // 分析注释块
  let lines = cleanedComment.split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    
    if (line.startsWith('@')) {
      // 保存当前块
      if (currentBlock.content.length > 0) {
        blocks.push(currentBlock);
      }
      
      const tagMatch = line.match(/^@(\w+)/);
      if (tagMatch) {
        const tag = tagMatch[1];
        currentBlock = {
          type: tag,
          content: [line.substring(tag.length + 1).trim()]
        };
        
        // 特殊处理 @example 块
        if (tag === 'example') {
          // 收集所有内容直到下一个块级标签
          i++;
          while (i < lines.length) {
            const nextLine = lines[i].trim();
            // 只有当遇到新的块级标签时才结束当前块
            if (nextLine.match(/^@\w+\s/)) {
              i--;  // 回退一行，让下一次循环处理新标签
              break;
            }
            currentBlock.content.push(nextLine);
            i++;
          }
        }
      }
    } else if (line) {
      currentBlock.content.push(line);
    }
    i++;
  }
  
  // 添加最后一个块
  if (currentBlock.content.length > 0) {
    blocks.push(currentBlock);
  }

  // 处理解析后的块
  for (const block of blocks) {
    switch (block.type) {
      case 'description':
        info.description = block.content.join('\n').trim();
        break;
      case 'example':
        // 提取 caption（如果存在）
        let caption = '';
        let code = block.content;
        
        // 检查第一行是否包含 caption
        if (block.content.length > 0) {
          const firstLine = block.content[0];
          const captionMatch = firstLine.match(/<caption>(.*?)<\/caption>/);
          if (captionMatch) {
            caption = captionMatch[1].trim();
            // 移除包含 caption 的第一行
            code = block.content.slice(1);
          }
        }
        
        info.examples.push({
          caption,
          code: code.join('\n').trim()
        });
        break;
      case 'feature':
        info.features.push(...block.content
          .filter(line => line.startsWith('-'))
          .map(line => line.substring(1).trim()));
        break;
      case 'see':
        const content = block.content.join(' ').trim();
        const match = content.match(/{@link\s+([^\s}]+)(?:\s+([^}]+))?}/) ||
                     content.match(/([^\s]+)(?:\s+(.+))?/);
        if (match) {
          info.see.push({
            url: match[1],
            text: match[2] || match[1]
          });
        }
        break;
    }
  }

  // 提取命名空间信息
  info.namespaces = extractNamespaceInfo(comment);

  return info;
}

function extractModuleInfo(code, moduleName) {
  logger.debug(`Extracting module info for: ${moduleName}`);

  const ast = parse(code, BABEL_PARSER_CONFIG);
  const info = {
    name: moduleName,
    description: '',
    features: [],
    examples: [],
    exports: [],
    related: [],
    see: []
  };

  // Extract module comments from the AST
  const comments = [];
  if (ast.comments) {
    comments.push(...ast.comments);
  }
  if (ast.program && ast.program.innerComments) {
    comments.push(...ast.program.innerComments);
  }
  if (ast.program && ast.program.leadingComments) {
    comments.push(...ast.program.leadingComments);
  }

  const moduleComments = comments.filter(
    comment => comment.type === 'CommentBlock' && comment.value.includes('@module')
  );

  if (moduleComments.length > 0) {
    const moduleInfo = parseJSDocComment(moduleComments[0].value);
    Object.assign(info, moduleInfo);
  }

  traverse(ast, {
    ExportNamedDeclaration(path) {
      handleExportDeclaration(path, info);
    },
    ExportDefaultDeclaration(path) {
      handleDefaultExport(path, info);
    },
    ImportDeclaration(path) {
      handleImportDeclaration(path, info);
    }
  });

  // Clean up and sort
  info.exports = [...new Set(info.exports)].sort();
  info.related = [...new Set(info.related)].sort();

  logger.debug(`Module info extracted successfully for: ${moduleName}`, { info });
  return info;
}

function handleExportDeclaration(path, info) {
  if (path.node.declaration) {
    if (path.node.declaration.type === 'VariableDeclaration') {
      path.node.declaration.declarations.forEach(decl => {
        if (decl.id.type === 'Identifier') {
          info.exports.push(decl.id.name);
        }
      });
    } else if (path.node.declaration.id) {
      info.exports.push(path.node.declaration.id.name);
    }
  }
  if (path.node.specifiers) {
    path.node.specifiers.forEach(specifier => {
      if (specifier.exported.type === 'Identifier') {
        info.exports.push(specifier.exported.name);
      }
    });
  }
}

function handleDefaultExport(path, info) {
  if (path.node.declaration.type === 'Identifier') {
    info.exports.push(path.node.declaration.name);
  }
}

function handleImportDeclaration(path, info) {
  const source = path.node.source.value;
  if (source.startsWith('./') || source.startsWith('../')) {
    const moduleName = source.split('/').filter(Boolean)[0];
    if (!info.related.includes(moduleName)) {
      info.related.push(moduleName);
    }
  }
}

export { parseJSDocComment, extractModuleInfo };
