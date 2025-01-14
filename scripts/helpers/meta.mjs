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
    see: []
  };
}

function handleTagLine(line, tag, context) {
  const { info, currentSection, currentFeature, currentExample, descriptionLines } = context;
  const content = line.substring(tag.length).trim();

  switch (tag) {
    case '@module':
      return { currentSection, currentFeature, currentExample };
    case '@description':
      if (content) descriptionLines.push(content);
      return { currentSection: 'description', currentFeature, currentExample };
    case '@feature':
      const newFeature = {
        title: content,
        items: []
      };
      info.features.push(newFeature);
      return { currentSection: 'feature', currentFeature: newFeature, currentExample };
    case '@example':
      const captionMatch = content.match(/<caption>([^<]+)<\/caption>/);
      const newExample = {
        caption: captionMatch ? captionMatch[1].trim() : '',
        code: ''
      };
      info.examples.push(newExample);
      return { currentSection: 'example', currentFeature, currentExample: newExample };
    case '@see':
      const linkMatch = content.match(/\{@link\s+([^\s}]+)(?:\s+([^}]+))?\}/);
      if (linkMatch) {
        const [_, url, text] = linkMatch;
        info.see.push({
          url: url.trim(),
          text: text ? text.trim() : url.trim()
        });
      }
      return { currentSection: null, currentFeature, currentExample };
    default:
      return { currentSection, currentFeature, currentExample };
  }
}

function handleContentLine(line, section, context) {
  const { descriptionLines, currentFeature, currentExample } = context;

  switch (section) {
    case 'description':
      descriptionLines.push(line);
      break;
    case 'feature':
      if (line.startsWith('-') && currentFeature) {
        currentFeature.items.push(line.substring(1).trim());
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

export function parseJSDocComment(comment) {
  const lines = comment.value.split('\n');
  const info = initializeJSDocInfo();
  let context = {
    info,
    currentSection: null,
    currentFeature: null,
    currentExample: null,
    descriptionLines: []
  };

  for (const line of lines) {
    const cleanLine = line.trim().replace(/^\*\s*/, '');
    if (!cleanLine) continue;

    if (cleanLine.startsWith('@')) {
      const tag = Object.keys(JSDOC_CONFIG.tags)
        .map(t => '@' + t)
        .find(t => cleanLine.startsWith(t));
      
      if (tag) {
        context = {
          ...context,
          ...handleTagLine(cleanLine, tag, context)
        };
      }
    } else {
      handleContentLine(cleanLine, context.currentSection, context);
    }
  }

  info.description = context.descriptionLines.join(' ').trim();
  info.examples = info.examples.map(example => ({
    ...example,
    code: example.code.trim()
  }));

  return info;
}

export async function extractModuleInfo(code, moduleName) {
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

  // 提取 JSDoc 注释
  const moduleComments = ast.comments.filter(comment => 
    comment.type === 'CommentBlock' && 
    comment.value.includes('@module')
  );

  if (moduleComments.length > 0) {
    const moduleInfo = parseJSDocComment(moduleComments[0]);
    Object.assign(info, moduleInfo);
  }

  // 提取导出
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

  // 清理和排序
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
