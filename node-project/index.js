const fs = require('fs');
const res = fs.createReadStream('./file/test.txt', { highWaterMark: 1024 });
const iconv = require('iconv-lite');

let chunks = [];
let size = 0;
res.on('data', function (chunk) {
  chunks.push(chunk);
  size += chunk.length;
});
res.on('end', function () {
  let buf = Buffer.concat(chunks, size);
  let str = iconv.decode(buf, 'utf8');
  // 输出
  console.log(str);
});




