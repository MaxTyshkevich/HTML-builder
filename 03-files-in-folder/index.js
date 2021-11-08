const { readdir } = require('fs/promises');
const { stat } = require('fs');

const path = require('path');
const pathDir = path.join(__dirname, 'secret-folder');

(async function () {
  let files = await readdir(pathDir, { withFileTypes: true });
  const filter = files.filter((file) => file.isFile());

  filter.forEach((item) => {
    stat(path.join(pathDir, item.name), (err, stats) => {
      let infoFile = item.name.split('.');
      console.log(
        infoFile[0] + ' - ' + infoFile[1] + ' - ' + stats.size / 1000 + ' kb'
      );
    });
  });
})();
