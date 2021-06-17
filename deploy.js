const fs = require('fs');
const archiver = require('archiver');
const { version } = require('./public/manifest.json');

const fileName = `Newt_${version}.zip`;

const output = fs.createWriteStream(__dirname + `/${fileName}`);
const archive = archiver('zip', {
  zlib: { level: 9 },
});

output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log(`Successfully created ${fileName}`);
});

archive.on('warning', function (err) {
  if (err.code === 'ENOENT') {
    console.warn(err);
  } else {
    throw err;
  }
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);
archive.directory('build/', false);
archive.finalize();
