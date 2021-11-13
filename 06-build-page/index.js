const fs = require('fs/promises');
const path = require('path');

const pathProjectDist = path.join(__dirname, 'project-dist');
const pathComponent = path.join(__dirname, 'components');
const pathTemplate = path.join(__dirname, 'template.html');
const pathDestinationTemplate = path.join(pathProjectDist, 'template.html');

(async () => {
  await fs.rm(pathProjectDist, {
    recursive: true,
    force: true,
  });
  await fs.mkdir(pathProjectDist, { recursive: true });

  createHTML(pathComponent, pathTemplate, pathDestinationTemplate);
  createSyle(
    path.join(__dirname, 'styles'),
    path.join(pathProjectDist, 'style.css')
  );
  copyAssets(
    path.join(__dirname, 'assets'),
    path.join(pathProjectDist, 'assets')
  );
})();

async function createHTML(compPath, templatePath, destination) {
  let template = await fs.readFile(templatePath, 'utf-8');
  const readComponentDir = await fs.readdir(compPath);

  for (const file of readComponentDir) {
    const filePath = path.join(compPath, file);
    const stats = await fs.stat(filePath);

    if (stats.isFile()) {
      const name = path.parse(file).name;
      const ext = path.parse(file).ext;

      if (ext === '.html' && template.includes(`{{${name}}}`)) {
        const readFile = await fs.readFile(filePath, 'utf-8');

        template = template.replace(`{{${name}}}`, readFile);
      }
    }
  }

  await fs.writeFile(destination, template);
}

async function createSyle(src, destination) {
  const styleDir = await fs.readdir(src);
  let buildStyles;
  for (const file of styleDir) {
    const filePath = path.join(src, file);
    const stat = await fs.stat(filePath);

    if (stat.isFile()) {
      const ext = path.extname(filePath);

      if (ext === '.css') {
        const readFile = await fs.readFile(filePath, 'utf-8');
        buildStyles += readFile;
      }
    }
  }

  fs.writeFile(destination, buildStyles);
}

async function copyAssets(src, destination) {
  const stats = await fs.stat(src);

  if (stats.isDirectory()) {
    await fs.mkdir(destination);
    const includesFile = await fs.readdir(src);
    for (const item of includesFile) {
      copyAssets(path.join(src, item), path.join(destination, item));
    }
  } else {
    await fs.copyFile(src, destination);
  }
}
