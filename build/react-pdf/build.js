const fs = require('fs-extra');

fs.copyFile(
  './node_modules/pdfjs-dist/build/pdf.worker.min.js',
  'public/pdf.worker.js',
);
