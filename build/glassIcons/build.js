const path = require('path');

const createIndexFile = require('./indexFileGenerator');
const transformRawIcons = require('./rawIconTransformer');

const GLASS_ICONS_DIR = path.resolve('./src/assets/glass-icons');

console.info('[1/2] Raw icons transformation');
transformRawIcons(path.join(GLASS_ICONS_DIR, 'raw'), GLASS_ICONS_DIR);

console.info('[2/2] Generating index.ts file');
createIndexFile(
  path.join(GLASS_ICONS_DIR),
  path.join(GLASS_ICONS_DIR, 'index.ts'),
  '@/assets/glass-icons',
);
