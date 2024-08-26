
let obj = [
  {
    anser: "",
    optionsArr: [],
    title: "1.《信息系统安全等级保护实施指南》将(  )作为实施等级保护的第一项重要内容。"
  },
  {
    anser: "",
    optionsArr: ['A.安全定级'],
    title: ""
  },
  {
    anser: "",
    optionsArr: ['B.安全评估'],
    title: ""
  },
  {
    anser: "A",
    optionsArr: '',
    title: ""
  },
]
let arr = [{
  anser: "A",
  optionsArr: ['A.安全定级', 'B.安全评估'],
  title: "1.《信息系统安全等级保护实施指南》将(  )作为实施等级保护的第一项重要内容。"
},]

const data = [
  {
    anser: "",
    optionsArr: [],
    title: "1.《信息系统安全等级保护实施指南》将(  )作为实施等级保护的第一项重要内容。"
  },
  {
    anser: "",
    optionsArr: ['A.安全定级'],
    title: ""
  },
  {
    anser: "",
    optionsArr: ['B.安全评估'],
    title: ""
  },
  {
    anser: "A",
    optionsArr: '',
    title: ""
  },
];

function processData (data) {
  if (!data.length) return [];

  let title = data[0].title; // 假设第一个对象包含题目  
  let optionsArr = [];
  let anser = '';

  // 遍历数组，收集选项和答案  
  for (let i = 0; i < data.length; i++) {
    if (data[i].optionsArr && data[i].optionsArr.length > 0) {
      // 合并选项  
      optionsArr = optionsArr.concat(data[i].optionsArr);
    }
    if (data[i].anser && data[i].anser.trim() !== '') {
      // 找到答案（这里假设答案只会出现一次，并且是最后一个有效的anser字段）  
      anser = data[i].anser;
    }
  }

  // 构造新的数组对象  
  return [{
    anser: anser,
    optionsArr: optionsArr,
    title: title
  }];
}

const processedData = processData(data);
console.log(processedData);


