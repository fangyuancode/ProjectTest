import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import JSZipUtils from "jszip-utils";
import PizZip from "pizzip";

export function downloadWithTemplate (path, data, fileName) {
  JSZipUtils.getBinaryContent(path, (error, content) => {
    if (error) throw error;

    const zip = new PizZip(content);
    const doc = new Docxtemplater().loadZip(zip);
    doc.setData({
      ...data.form,
      // 循环项参数
      list: data.list,
      outsideList: data.outsideList,
    });

    try {
      doc.render();
    } catch (error) {
      const e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
      };
      ElMessage.error("文件格式有误!");
      throw error;
    }
    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    saveAs(out, fileName);
  });
}

let data = {
  form: {
    title: "这是word标题",
    test: "这是表单1的数据",
    test1: "111",
    test2: 222,
    test3: 333,
  },
  outsideList: [
    {
      list: [
        {
          index: 0,
          table: "表格第一项",
          table1: "表格第二项",
          table2: "表格第三项",
        },
        {
          index: 1,
          table: "表格第一项",
          table1: "表格第二项",
          table2: "表格第三项",
        },
      ],
    },
    {
      list: [
        {
          index: 0,
          table: "表格第一项",
          table1: "表格第二项",
          table2: "表格第三项",
        },
        {
          index: 1,
          table: "表格第一项",
          table1: "表格第二项",
          table2: "表格第三项",
        },
      ],
    },
  ],
};

downloadWithTemplate("template.docx", data, "模板word.docx")
