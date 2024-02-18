const fs = require('fs');
const path = require('path');

const { getSvgFilesFromDir } = require('./utils');

function transformRawIcons(inputPath, outputPath) {
  const rawIconFiles = getSvgFilesFromDir(inputPath);
  if (rawIconFiles.length === 0) {
    console.info(
      `INFO: No raw files found in '${inputPath}' folder, skipping...`,
    );
    return;
  }

  rawIconFiles.forEach((file) => {
    console.info('- Transforming', file);
    const inputCode = fs.readFileSync(path.join(inputPath, file), {
      encoding: 'utf-8',
    });
    const transformedCode = transform(inputCode);
    fs.writeFileSync(path.join(outputPath, file), transformedCode);
  });
}

function transform(code) {
  let output = code;

  // Remove newlines and tabs.
  output = output.replace(/[\n\n\t\r]+/g, '');
  // Rename Figma auto-generated IDs.
  output = output
    .replace(/paint0_linear[\d_]+/g, 'gradient-back-active')
    .replace(/paint1_linear[\d_]+/g, 'gradient-front-active');

  // Replace predefined colors with CSS variables.
  output = output
    .replace(/#F2E4FF/g, 'var(--glass-icon-element)')
    .replace(/#B38FFF/g, 'var(--glass-icon-back-active-gradient-from)')
    .replace(/#5F27FF/g, 'var(--glass-icon-back-active-gradient-to)')
    .replace(/#B199FF/g, 'var(--glass-icon-front-active-gradient-from)')
    .replace(/#7747FF/g, 'var(--glass-icon-front-active-gradient-to)');
  // .replace(/#B38FFF/g, 'var(--glass-icon-back-active-gradient-from)')
  // .replace(/#5F27FF/g, 'var(--glass-icon-back-active-gradient-to)')
  // .replace(/white/g, 'var(--glass-icon-front-active-gradient-from)')
  // .replace(/#4000FF/g, 'var(--glass-icon-front-active-gradient-to)');

  // Duplicate linear gradients to create 'active' and 'hover' variants.
  // Explanation: It's important to have separate linearGradients for each icon state,
  //              because if we change colors for one gradient within SVG,
  //              it affects other instances of the same icon rendered on the screen.
  //              So in case you hover on "home" icon, it will appear hovered in other places as well,
  //              even if other places have "active" state.
  output = output.replace(
    /(\<linearGradient .+?\<\/linearGradient\>)/g,
    (match) => {
      return `${match}${match.replace(/active/g, 'hover')}`;
    },
  );

  // Remove opacity from fills and gradients.
  // TODO: This is temporary. Remove this when we figure out how to do blur effect on "front".
  output = output.replace(/(fill|stop)-opacity=".+?"/g, '');

  // Extract x, y and rotation as CSS variables for later use.
  output = output.replace(/\<rect id="back" (.+?)\>/g, (match) => {
    const x = (match.match(/x="(.+?)"/) || [])[1] || '0';
    const y = (match.match(/y="(.+?)"/) || [])[1] || '0';
    const rotate = (match.match(/rotate\(([\d.-]+)/) || [])[1] || '0';
    return match
      .replace(/ transform="rotate\(([\d.-]+)\s([\d.-]+)\s([\d.-]+)\)"/, '')
      .replace(
        /(\/\>|\>)$/,
        ` style="--x: ${x}px; --y: ${y}px; --rotate: ${rotate}deg;" $1`,
      );
  });

  // Add newlines for readability and better diffs.
  output = output.replace(/\>/g, '>\n');

  // Add comment with docs link.
  output = `
<!--
This is an auto-generated file. Do not modify.
If you want to add or update any Glass Icons, follow instructions from here:
https://communitycapitalnoumena.atlassian.net/wiki/spaces/NF/pages/1712488456/Glass+Icons
-->
${output}`;

  return output;
}

module.exports = transformRawIcons;
