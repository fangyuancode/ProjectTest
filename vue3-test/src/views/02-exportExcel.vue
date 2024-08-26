<template>
  <div class="home">
    <div class="container" id="app">
      <div class="operation">
        <button class="btn" @click="uploadFile">上传word文件</button>
      </div>
      <br>
      <!-- 纯文字内容 -->
      <div v-if="wordData">{{wordData}}</div>
      <br>
      <!-- 文档预览容器 -->
      <div id="preview"></div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import mammoth from "mammoth";
import { exportExcel } from "@/utils/excel";
let docx = import.meta.glob("docx-preview");
//一般用这种形式就行了
// let docx = require("docx-preview");
import { renderAsync } from "docx-preview";
// console.log("docx", docx);
let wordData = ref("");
const uploadFile = (mark) => {
  let inputEle = document.createElement("input");
  inputEle.type = "file";
  inputEle.accept =
    ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  inputEle.click();
  inputEle.addEventListener("input", (event) => {
    onWord(event);
  });
};

const onWord = (event) => {
  // FileReader 接口允许 Web 应用程序异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容，使用 File 或 Blob 对象指定要读取的文件或数据。
  let reader = new FileReader();
  let file = event.target.files[0];
  let options = { inWrapper: false, ignoreWidth: true, ignoreHeight: true };
  renderAsync(file, document.getElementById("preview"), null, options);
  let fileName = file.name;
  if (file) {
    reader.onload = function (e) {
      const data = e.target.result;
      //extractRawText--转文字；
      mammoth
        .extractRawText({ arrayBuffer: data })
        .then(function (displayResult) {
          wordData.value = displayResult.value;
          // console.log("转文字", displayResult.value);
        })
        .done();
      //convertToHtml--转HTML；
      mammoth
        .convertToHtml({ arrayBuffer: data })
        .then(function (displayResult) {
          console.log("转HTML", displayResult);
          // DOMParser 可以将存储在字符串中的 XML 或 HTML 源代码解析为一个 DOM Document。
          let parser = new DOMParser();
          let doc = parser.parseFromString(displayResult.value, "text/html");
          // 获取所有的<p>标签
          let paragraphs = doc.body.getElementsByTagName("p");

          // 处理段落的数据，输出到excel中
          //handleExcelData(paragraphs);
        })
        .done();
      // convertToMarkdown--转Markdown 文档
      mammoth
        .convertToMarkdown({ arrayBuffer: data })
        .then(function (displayResult) {
          // console.log("转Markdown 文档", displayResult);
        })
        .done();
    };
    reader.readAsArrayBuffer(file);
  }
};
function handleExcelData(paragraphs) {
  let list = [];
  // console.log('paragraphs', paragraphs);
  let obj = {
    title: "",

    optionsArr: [],
    anser: "",
  };
  let tagIndex = 1;
  // 遍历并打印每个<p>标签的内容
  for (let i = 0; i < paragraphs.length; i++) {
    let str = paragraphs[i].textContent;
    // 判断是否含有括号
    // let flag = /\(|\)/.test(str);
    let flag = /\(\s*\)/.test(str);
    if (flag) {
      obj.title = paragraphs[i].textContent;
    }

    // 判断是否是选项
    let op = /^[A-Z]/.test(str);
    if (op) {
      obj.optionsArr.push(str);
    }

    if (str.includes("答案")) {
      // 判断是答案
      // console.log("str", str.replace(/[^a-zA-Z]/g, ""));
      // str.replace(/[^a-zA-Z]/g, "");
      obj.anser = str.replace(/[^a-zA-Z]/g, "");
      tagIndex = 2;
    }
    // 处理完一题后，将原来存储的数据置空
    if (tagIndex === 2) {
      list.push(obj);
      obj = {
        title: "",
        optionsArr: [],
        anser: "",
      };
      tagIndex = 1;
    }
  }
  // 这里最终处理的数据
  // console.log("list", list);
  handleExport(list);
}
// exportExcel准备导出excel
function handleExport(list) {
  let titleArr = [
    "目录",
    "题目类型",
    "大题题干",
    "小题题型",
    "小题题干",
    "正确答案",
    "答案解析",
    "难易度",
    "知识点",
    "标签",
    "	选项数",
    "选项A	",
    "选项B",
    "选项C",
    "选项D",
    "选项E",
    "选项F",
    "选项G",
    "选项H",
  ];
  console.log("list", list);
  let listArr = [];
  listArr.push(titleArr);
  let flag = false;
  list.forEach((el) => {
    let arr = new Array(titleArr.length); // 创建一个长度为5的数组
    if (!flag) {
      arr[0] = "/计算机程序设计";
      flag = true;
    } else {
      arr[0] = "";
    }

    arr[1] = "单选题";
    // 题干
    arr[2] = el.title;
    // 小题题型
    arr[3] = "";
    // 小题题干
    arr[4] = "";
    // 正确答案
    arr[5] = el.anser;

    arr[6] = ""; // 答案解析
    arr[7] = ""; // 难易度
    arr[8] = ""; // 知识点
    arr[9] = ""; // "标签"
    arr[10] = el.optionsArr.length; // "选项数",

    el.optionsArr.forEach((item, index) => {
      arr[10 + index + 1] = item;
    });
    listArr.push(arr);
  });
  console.log("listArr", listArr);
  exportExcel("单选题导出", listArr);
}

// if (file) {
//   reader.onload = function (e) {
//     const data = e.target.result;
//     // console.log('data', data);
//     // 转文字
//     mammoth
//       .extractRawText({ arrayBuffer: data })
//       .then(function (displayResult) {
//         wordData.value = displayResult.value;
//         // console.log('转文字', displayResult.value);
//       })
//       .done();
//     // 转HTML
//     mammoth
//       .convertToHtml({ arrayBuffer: data })
//       .then(function (displayResult) {
//         console.log("转HTML", displayResult);
//         let parser = new DOMParser();
//         let doc = parser.parseFromString(displayResult.value, "text/html");

//         // 获取所有的<p>标签
//         let paragraphs = doc.body.getElementsByTagName("p");

//         // 遍历并打印每个<p>标签的内容
//         let list = [];
//         // console.log('paragraphs', paragraphs);
//         let obj = {
//           title: "",
//           titleInfo: "",
//           optionsArr: [],
//           anser: "",
//         };
//         let tagIndex = 1;
//         for (let i = 0; i < paragraphs.length; i++) {
//           if (i === 6) {
//             console.log("iii", i);
//             console.log(paragraphs[i].textContent);
//           }
//           let str = paragraphs[i].textContent;
//           // 判断是否含有括号
//           // let flag = /\(|\)/.test(str);
//           let flag = /\(\s*\)/.test(str);
//           if (flag) {
//             obj.title = paragraphs[i].textContent;
//           }
//           // // 判断是否含有罗马数字
//           // if (containsRomanNumeral(paragraphs[i].textContent)) {
//           //   obj.titleInfo = obj.titleInfo + paragraphs[i].textContent;
//           // }
//           // 判断是否是选项
//           let op = /^[A-Z]/.test(str);
//           if (op) {
//             obj.optionsArr.push(str);
//           }

//           if (str.includes("答案")) {
//             // 判断是答案
//             obj.anser = str[str.length - 1];
//             tagIndex = 2;
//           }

//           if (tagIndex === 2) {
//             list.push(obj);
//             obj = {
//               title: "",

//               optionsArr: [],
//               anser: "",
//             };
//             tagIndex = 1;
//           }
//         }
//         console.log("list", list);
//       })
//       .done();
//     // 转 Markdown 文档。
//     mammoth
//       .convertToMarkdown({ arrayBuffer: data })
//       .then(function (displayResult) {
//         // console.log('转Markdown 文档', displayResult);
//       })
//       .done();
//   };
//   reader.readAsArrayBuffer(file);
// }
</script>
<style scoped>
.container {
  padding: 0 50px;
}

.operation {
  padding: 20px;
}

.btn {
  min-width: 50px;
  font-size: 20px;
  color: #fff;
  background: #118ee9;
  margin: 0 20px 0 0;
  padding: 8px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
}

.item {
  width: 350px;
  box-sizing: border-box;
  padding: 4px 14px 4px 14px;
  color: #000;
  font-size: 12px;
  background: #fff;
}
</style>