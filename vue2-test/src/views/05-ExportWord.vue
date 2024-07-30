<template>
  <div>
    <h3>导出world</h3>
    <el-button @click="exportWord">点击导出word</el-button>
    <el-button @click="getPath">点击</el-button>

  </div>
</template>
<script>
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";
export default {
  name: "home",
  data() {
    return {
      dataJson: {
        a: "Minie",
        b: "John",
      },
    };
  },
  created() {},
  methods: {
    getPath() {
      let path = new URL("../../public/tag-example.docx", import.meta.url).href;
      console.log("path", path);
      return path;
    },
    // 点击导出word
    // 点击导出word
    exportWord() {
      let that = this;
      // 读取并获得模板文件的二进制内容
      JSZipUtils.getBinaryContent(this.getPath(), function (error, content) {
        // model.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
        console.log("content", content);
        // 抛出异常
        if (error) {
          throw error;
        }

        // 创建一个PizZip实例，内容为模板的内容
        let zip = new PizZip(content);
        // 创建并加载docxtemplater实例对象
        let doc = new docxtemplater().loadZip(zip);
        // 设置模板变量的值
        // doc.setData({
        //   users: [
        //     { name: "John", age: 22, phone: "+33653454343" },
        //     { name: "Mary", age: 25, phone: "+33666666666" },
        //   ],
        // });

        try {
          // 用模板变量的值替换所有模板变量
          doc.render({
            name: "序号",
            first_name:
              "1.当导体对磁场作相对运动而切割磁力线时，导体中便有感应电动势产生；当与回路相交链的磁通发生变化时，回路中也会有感应电动势产生。这是两种本质上不同的感应电动势。",
            last_name: "   (       )",
            phone: "试卷",
            description: "考试试卷",
          });
        } catch (error) {
          // 抛出异常
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties,
          };
          console.log(JSON.stringify({ error: e }));
          throw error;
        }

        // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        let out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, "test.docx");
      });
    },
  },
};
</script>
<style scoped>
</style>