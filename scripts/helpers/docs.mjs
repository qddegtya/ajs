import { formatCode } from './formatter.mjs';
import { replaceContent } from './content.mjs';
import { PLACEHOLDERS } from './config.mjs';
import * as logger from './logger.mjs';

function generateSection(title, content) {
  return content ? `### ${title}\n\n${content}\n\n` : '';
}

export function generateFeatures(manifest) {
  if (!manifest?.namespaces?.length) {
    return '';
  }

  return manifest.namespaces
    .map(namespace => {
      const title = namespace.title ? `### ${namespace.title}\n\n` : '';
      const items = namespace.properties?.length
        ? namespace.properties.map(prop => `- ${prop.description}`).join('\n') + '\n\n'
        : '';
      return title + items;
    })
    .join('');
}

export function generateModulesTable(moduleMetas) {
  const headers = '| Module | Description | Import Path |\n|---------|-------------|-------------|\n';
  
  const rows = moduleMetas.map(meta => {
    const description = meta.description 
      ? meta.description.split(/[。.]\s+/).slice(0, 2).join('. ') 
      : '';
    const name = meta.path.split('/')[0];
    return `| ${name} | ${description} | \`xajs/${name}\` |`;
  }).join('\n');

  return headers + rows;
}

export async function generateModuleDetails(moduleMetas) {
  const detailsPromises = moduleMetas.map(async meta => {
    const name = meta.path.split('/')[0];
    const sections = [
      generateSection(name, meta.info.description),
      meta.info.namespaces?.length > 0 && generateSection('Key Features',
        meta.info.namespaces.map(namespace => {
          const title = `**${namespace.title}**\n`;
          const items = namespace.properties?.length
            ? namespace.properties.map(prop => `- ${prop.description}`).join('\n')
            : '';
          return title + items;
        }).join('\n\n')
      ),
      meta.info.examples?.length > 0 && generateSection('Examples',
        await Promise.all(meta.info.examples.map(async example => {
          const caption = example.caption ? `**${example.caption}**\n\n` : '';
          const code = await formatCode(example.code);
          return `${caption}\`\`\`javascript\n${code}\n\`\`\`\n\n`;
        }))
      )
    ].filter(Boolean);

    return sections.join('');
  });

  return (await Promise.all(detailsPromises)).join('\n');
}

export async function generateModulesContent(moduleMetas) {
  const table = generateModulesTable(moduleMetas);
  const details = await generateModuleDetails(moduleMetas);
  return `${table}\n\n${details}`;
}

export { PLACEHOLDERS, replaceContent };
