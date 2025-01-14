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
  // 移除重复的模块名称
  return description.replace(/\b\w+\s+-\s+.*?\s+\1\s+/g, '')
    // 清理多余的空格
    .replace(/\s+/g, ' ')
    // 修复标点符号
    .replace(/\s*([,.!?])\s*/g, '$1 ')
    .trim();
}

function extractFeaturesFromDescription(description) {
  const features = [];
  const sentences = description.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  
  for (const sentence of sentences) {
    // 如果句子描述了一个功能或特性
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

function handleTagLine(line, tag, context) {
  const { info, currentSection, currentFeature, currentExample, descriptionLines } = context;
  const content = line.substring(tag.length).trim();

  switch (tag) {
    case '@module':
      // 不要在描述中添加模块名
      return { currentSection: 'description', currentFeature, currentExample };
    case '@description':
      if (content) descriptionLines.push(content);
      return { currentSection: 'description', currentFeature, currentExample };
    case '@feature':
      if (content) {
        info.features.push(content);
      }
      return { currentSection: 'feature', currentFeature: null, currentExample };
    case '@example':
      const newExample = {
        caption: content.replace(/<caption>(.*?)<\/caption>/, '$1').trim(),
        code: ''
      };
      info.examples.push(newExample);
      return { currentSection: 'example', currentFeature, currentExample: newExample };
    case '@see':
      if (content) {
        // 修复 {@link url text} 格式
        const match = content.match(/{@link\s+([^\s}]+)(?:\s+([^}]+))?}/) ||
                     content.match(/([^\s]+)(?:\s+(.+))?/);
        if (match) {
          info.see.push({
            url: match[1],
            text: match[2] || match[1]
          });
        }
      }
      return { currentSection: null, currentFeature, currentExample };
    default:
      return { currentSection, currentFeature, currentExample };
  }
}

function handleContentLine(line, section, context) {
  const { descriptionLines, currentExample } = context;

  switch (section) {
    case 'description':
      descriptionLines.push(line);
      break;
    case 'feature':
      if (line.startsWith('-')) {
        context.info.features.push(line.substring(1).trim());
      }
      break;
    case 'example':
      if (!line.startsWith('@') && currentExample) {
        currentExample.code += line + '\n';
      }
      break;
    default:
      if (!line.startsWith('@')) {
        descriptionLines.push(line);
      }
  }
}

function parseJSDocComment(comment) {
  const info = initializeJSDocInfo();
  const descriptionLines = [];
  let context = {
    info,
    currentSection: null,
    currentFeature: null,
    currentExample: null,
    descriptionLines
  };

  // Extract namespaces first
  info.namespaces = extractNamespaceInfo(comment);

  const lines = comment.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim().replace(/^\*\s*/, '');
    if (!trimmedLine) continue;

    // Handle tag lines
    if (trimmedLine.startsWith('@')) {
      const tagMatch = trimmedLine.match(/^@(\w+)/);
      if (tagMatch) {
        const tag = '@' + tagMatch[1];
        const result = handleTagLine(trimmedLine, tag, context);
        Object.assign(context, result);
      }
    } else if (context.currentSection) {
      handleContentLine(trimmedLine, context.currentSection, context);
    }
  }

  // Process collected description
  info.description = cleanDescription(descriptionLines.join(' '));
  
  // Extract additional features from namespaces
  Object.entries(info.namespaces).forEach(([namespace, data]) => {
    Object.entries(data.properties).forEach(([propName, prop]) => {
      info.features.push({
        namespace,
        property: propName,
        type: prop.type,
        description: prop.description
      });
    });
  });

  return info;
}

export function extractModuleInfo(code, moduleName) {
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

export { parseJSDocComment };
