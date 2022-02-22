const fs = require('fs');

const targetFile = './img/m1.png';
const NUM = 30;

for (let i = 0; i < NUM; i++) {
  fs.copyFileSync(targetFile, `./img/m${i + 2}.png`);
}
