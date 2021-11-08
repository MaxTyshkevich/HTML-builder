const path = require('path');
const fs = require('fs');
const fsPromises = fs.promises;

(async function () {
  const source = path.join(__dirname, 'files');
  const target = path.join(__dirname, 'files-copy');

  await fsPromises.mkdir(target, {
    recursive: true,
  });

  fs.readdir(source, (err, files) => {
    if (err) console.error(err);
    else {
      files.forEach((file) => {
        fsPromises.copyFile(
          path.join(source, file),
          path.join(target, file),
          fs.constants.COPYFILE_FICLONE
        );
      });
    }
  });
})();
