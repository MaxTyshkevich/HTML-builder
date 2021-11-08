const path = require('path');
const fs = require('fs');
const { readdir } = require('fs/promises');

(async () => {
  const stylesPath = path.join(__dirname, 'styles');

  let files = await readdir(stylesPath);
  files = files.filter((file) => path.extname(file) === '.css');

  const bundle = fs.createWriteStream(
    path.join(__dirname, 'project-dist', 'bundle.css')
  );

  files.forEach((file) => {
    fs.createReadStream(path.join(stylesPath, file), 'utf-8').pipe(bundle);
  });
})();
