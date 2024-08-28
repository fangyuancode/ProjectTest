// const fs = require("fs");
// const path = require('path');
// const filepath = './file/test.docx';

// console.log(__dirname + filepath);


// const AdmZip = require('adm-zip'); //引入查看zip文件的包
// const zip = new AdmZip("./file/test.docx"); //filePath为文件路径
// let contentXml = zip.readAsText("word/document.xml");//将document.xml读取为text内容；
// let str = "";
// contentXml.match(/<w:t>[\s\S]*?<\/w:t>/ig).forEach((item) => {
//   str += item.slice(5, -6)
// });
// console.log('str', str);
// fs.writeFile("../file/test.txt", str, (err) => {//将./2.txt替换为你要输出的文件路径
//   if (err) throw err;
// });








const text = "这是一个示例文本，包含一些括号：（）【】{} []。";

const regex = /(?:\(\s*\)|\[\s*\]|\{\s*\}|\【\s*\】|\《\s*\》)/g;

const matches = text.match(regex);

console.log(matches);