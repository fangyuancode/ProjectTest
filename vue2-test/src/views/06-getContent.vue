<template>

  <div>
    导出试题
    <el-button @click="handleList">立即登陆</el-button>

  </div>

</template>
<script>
import { list1, list2, list3, list4 } from "@/assets/list";
const XLSX = require("xlsx");
export default {
  data() {
    return {};
  },
  methods: {
    handleList() {
      let list = [list1, list2, list3, list4].flat();
      console.log("list", list);
      let finArr = [];
      for (let i = 0; i < list.length; i++) {
        let arr = [];
        arr.push(list[i]._Title);
        list[i]._Answers.forEach((el) => {
          arr.push(el.label);
        });
        switch (list[i]._RightAnswerIndexD) {
          case "0":
            arr.push("A");
            break;
          case "1":
            arr.push("B");
            break;
          case "2":
            arr.push("C");
            break;
          case "3":
            arr.push("D");
            break;
        }
        finArr.push(arr);
      }
      let title = "题库导出";
      console.log(finArr);
      this.exportExcel(title, finArr);
    },
    //使用import有的属性无法找到
    exportExcel(filename, data) {
      let exc = XLSX.utils.book_new(); // 初始化一个excel文件
      let exc_data = XLSX.utils.aoa_to_sheet(data); // 传入数据 , 到excel
      // 将文档插入文件并定义名称
      XLSX.utils.book_append_sheet(exc, exc_data, filename);
      // 执行下载
      XLSX.writeFile(exc, filename + ".xlsx");
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>