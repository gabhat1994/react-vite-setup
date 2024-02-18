const fs = require('fs');
const path = require('path');

function getSvgFilesFromDir(dirPath) {
  return fs
    .readdirSync(dirPath)
    .filter((file) => path.extname(file) === '.svg');
}

module.exports = {
  getSvgFilesFromDir,
};
