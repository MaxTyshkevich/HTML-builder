const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'destination.txt');

fs.writeFile(filePath, '', (err) => {
  if (err) throw err;
});

process.stdout.write('Hello! leave a message \n');

process.stdin.on('data', (data) => {
  let message = data.toString();

  if (message.trim() === 'exit') {
    process.exit();
  } else {
    fs.appendFile(filePath, message, (err) => {
      if (err) throw err;
    });
  }
});

process.on('exit', () =>
  process.stdout.write('Ничего не понял, но что-то получилось!')
);
