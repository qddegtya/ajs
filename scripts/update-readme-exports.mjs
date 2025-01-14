import { ROOT_DIR, META_DIR, README_PATH, PLACEHOLDERS } from './helpers/config.mjs';
import { formatCode } from './helpers/formatter.mjs';
import { readFile, writeFile } from './helpers/fs.mjs';
import { generateFeatures, generateModulesContent } from './helpers/docs.mjs';
import { replaceContent } from './helpers/content.mjs';
import * as logger from './helpers/logger.mjs';
import path from 'path';

async function loadProjectMeta() {
  try {
    const packageJson = JSON.parse(
      await readFile(path.join(ROOT_DIR, 'package.json'), 'utf-8')
    );
    return {
      name: packageJson.name,
      description: packageJson.description
    };
  } catch (error) {
    logger.error('Failed to load package.json:', error);
    throw error;
  }
}

async function loadModulesMeta() {
  try {
    const indexPath = path.join(META_DIR, 'index.json');
    const content = await readFile(indexPath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    logger.error('Failed to load module metadata:', error);
    throw error;
  }
}

async function generateQuickStart(manifest) {
  if (!manifest?.examples?.length) {
    return '';
  }

  let content = '## Quick Start\n\n';
  for (const example of manifest.examples) {
    if (example.caption) {
      content += `### ${example.caption}\n\n`;
    }
    const formattedCode = await formatCode(example.code);
    content += '```javascript\n';
    content += formattedCode;
    content += '```\n\n';
  }

  return content;
}

async function updateReadme() {
  try {
    // Load metadata
    const [projectMeta, modulesMetas] = await Promise.all([
      loadProjectMeta(),
      loadModulesMeta()
    ]);

    // Find root module (index.js) metadata
    const rootModule = modulesMetas.find(meta => meta.path === 'index.js');
    if (!rootModule) {
      throw new Error('Root module metadata not found');
    }

    // Read existing README
    let readmeContent = await readFile(README_PATH, 'utf-8');

    // Generate and replace content
    const quickStart = await generateQuickStart(rootModule.info);
    const features = generateFeatures(rootModule.info);
    const modules = await generateModulesContent(modulesMetas);

    readmeContent = replaceContent(readmeContent, PLACEHOLDERS.QUICK_START, quickStart);
    readmeContent = replaceContent(readmeContent, PLACEHOLDERS.FEATURES, features);
    readmeContent = replaceContent(readmeContent, PLACEHOLDERS.MODULES, modules);

    // Write updated README
    await writeFile(README_PATH, readmeContent);

    logger.info('Successfully updated README.md');
  } catch (error) {
    logger.error('Failed to update README.md', error);
    process.exit(1);
  }
}

updateReadme();
