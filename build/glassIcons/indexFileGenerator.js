const fs = require('fs');
const path = require('path');

const { getSvgFilesFromDir } = require('./utils');

function createIndexFile(inputPath, indexFilePath, assetsImportAlias) {
  const files = getSvgFilesFromDir(inputPath);
  const iconNames = files.map((file) => path.parse(file).name);

  const code = `
/**
 * This is an auto-generated file. Do not modify.
 * If you want to add or update any Glass Icons, follow instructions from here:
 * https://communitycapitalnoumena.atlassian.net/wiki/spaces/NF/pages/1712488456/Glass+Icons
 */

${iconNames
  .map(
    (iconName) =>
      `import { ReactComponent as ${iconName} } from '${assetsImportAlias}/${iconName}.svg';`,
  )
  .join('\n')}

export const glassIcons = {
  ${iconNames.map((name) => `${name},`).join('\n  ')}
} as const;

export type GlassIconName = keyof typeof glassIcons;
`;

  fs.writeFileSync(indexFilePath, code);
}

module.exports = createIndexFile;
