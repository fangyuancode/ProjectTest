<template>

  <div>
    导出试题
    <el-button @click="handleList">导出题库</el-button>

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
        if (arr.length === 3) {
          arr.push("");
        }

        let anser = list[i]._RightAnswerIndexD;
        // 处理多选
        if (anser instanceof Array) {
          // 使用map方法将每个元素映射到对应的字母
          let mappedArr = arr.map(function (item, index) {
            // 字符'A'的ASCII码是65，因此我们通过加上index（0, 1, 2...）来获取对应的字母
            // console.log("parseInt", parseInt(item, 10));
            return String.fromCharCode(65 + parseInt(item, 10));
          });
          console.log("mappedArr", mappedArr);
          // 使用join方法将数组转换成字符串
          let result = mappedArr.join("");
          arr.push(result);
          // 单选的情况
        } else {
          switch (anser) {
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
        }

        finArr.push(arr);
      }
      let title = "题库导出";
      console.log(finArr);
      // this.exportExcel(title, finArr);
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