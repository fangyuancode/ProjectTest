
// import outputPDF from './printPdf'  //导入自定义指令

const directives = {  //汇总自定义指令
  outputPDF
}

export default {  //导出自定义指令
  install (app) {// 以安装的方式插到app中
    Object.keys(directives).forEach((key) => {    // 遍历directives对象的key
      app.directive(key, directives[key])  // 将每个directive注册到app中
    })
  }
}