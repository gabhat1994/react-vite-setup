const Color = require('tinycolor2');
const StyleDictionary = require('style-dictionary');
const fs = require('fs-extra');

const webPath = `build/css/`;

function isColor(prop) {
  return prop.attributes.category === 'color';
}

// before this runs we should clean the directories we are generating files in
// to make sure they are ✨clean✨
console.log(`cleaning ${webPath}...`);
fs.removeSync(`${webPath}/main.css`);
fs.removeSync(`${webPath}/variables.css`);
fs.removeSync(`${webPath}/variables-dark.css`);

StyleDictionary.registerTransform({
  name: 'color/rgbcustom',
  type: 'value',
  matcher: isColor,
  transformer: function (prop) {
    if (typeof prop.value === 'string' && prop.value.charAt(0) === '#') {
      return Color(prop.value).toRgbString();
    }
    return prop.value;
  },
});

// Adding custom actions, transforms, and formats
const styleDictionary = StyleDictionary.extend({});

console.log(`☀️ Building light mode...`);
styleDictionary
  .extend({
    source: [
      // this is saying find any files in the tokens folder
      // that does not have .dark or .light, but ends in .json5
      `src/style-dictionary/tokens/**/*.light.json`,
    ],

    platforms: {
      css: {
        transforms: [
          'attribute/cti',
          'name/cti/kebab',
          'time/seconds',
          'content/icon',
          'size/rem',
          'color/css',
          'color/rgbcustom',
        ],
        buildPath: webPath,
        files: [
          {
            destination: `variables.css`,
            format: `css/variables`,
            options: {
              outputReferences: true,
            },
          },
        ],
      },
    },
  })
  .buildAllPlatforms();

// Dark Mode
// we will only build the files we need to, we don't need to rebuild all the files
console.log(`\n\n🌙 Building dark mode...`);
styleDictionary
  .extend({
    // Using the include array so that theme token overrides don't show
    // warnings in the console.
    include: [`src/style-dictionary/tokens/**/*.dark.json`],
    source: [`src/style-dictionary/tokens/**/*.dark.json`],
    platforms: {
      css: {
        transformGroup: `css`,
        buildPath: webPath,
        files: [
          {
            destination: `variables-dark.css`,
            format: `css/variables`,
            // only putting in the tokens from files with '.dark' in the filepath
            filter: (token) => token.filePath.indexOf(`.dark`) > -1,
            options: {
              outputReferences: true,
              selector: `[data-theme='dark']`,
            },
          },
        ],
      },
    },
  })
  .buildAllPlatforms();

console.log(`\n\n 🤖Merging files into one...`);
const buffer1 = fs.readFileSync('build/css/variables.css');
const buffer2 = fs.readFileSync('build/css/variables-dark.css');
const addToCalendar = fs.readFileSync('build/css/addToCalendar.css');
const cssString = `
@font-face {
  font-family: "Suisse Int'l";
  src: url('/build/fonts/SuisseIntl-Regular.otf'),
       url('/build/fonts/SuisseIntl-Regular.woff') format('woff'),
       url('/build/fonts/SuisseIntl-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Suisse Int'l";
  src: url('/build/fonts/SuisseIntl-SemiBold.otf'),
       url('/build/fonts/SuisseIntl-SemiBold.woff') format('woff'),
       url('/build/fonts/SuisseIntl-SemiBold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}

${buffer1}
${buffer2}
`;

fs.writeFileSync(`build/css/base.css`, cssString);
fs.writeFileSync(`build/css/addToCalendar.css`, addToCalendar);

fs.writeFileSync(`public/css/base.css`, cssString);
fs.writeFileSync(`public/css/addToCalendar.css`, addToCalendar);
