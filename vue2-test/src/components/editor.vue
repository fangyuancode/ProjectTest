<template>
  <div class="editor n_b_r">
    <!-- 类名为做一些基本的边框设置 -->
    <Toolbar class="toolbar-container" :editor="editor" :defaultConfig="toolbarConfig" mode="default" />
    <!-- 高度外部页面可调,受制于插件,最小值为300px -->
    <!-- defaultConfig: 配置项 -->
    <!-- 方法 onCreated必须有, onChange可以没有,这里加是为了在外部页面取值-->
    <Editor :style="{ height }" class="editor-container" v-model="html" :defaultConfig="editorConfig" mode="default" @onCreated="onCreated" @onChange="onChange" />
  </div>
</template>
 
<script>
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
// 接口
// import { uploadImg } from "@/api/liftingCenter/index";

export default {
  name: "editor-component",
  props: {
    // 初始值
    initHtml: {
      type: String,
      default: "",
    },
    atItem: {
      type: Object,
      default: {},
    },
    // 是否只读
    readOnly: {
      type: Boolean,
      default: false,
    },
    // ........
    placeholder: {
      type: String,
      default: "请输入内容",
    },
    // 小于300px无效
    editorHeight: {
      type: String,
      default: "300px",
    },
  },
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      toolbarConfig: {
        // excludeKeys文档里有讲到: 一般用于大部分默认功能都需要, 只有少部分功能不需要, 用这个来排除
        // 查看全部功能使用:  this.editor.getAllMenuKeys()
        excludeKeys: ["insertVideo", "uploadVideo", "group-video"],
      },
      html: "",
      // 语义化的不写注释了好累
      autoFocus: false,
      editorConfig: {
        autoFocus: this.autoFocus,
        placeholder: this.placeholder,
        readOnly: this.readOnly,

        MENU_CONF: {
          uploadImage: {
            maxFileSize: 1 * 1024 * 1024,
            // 这个我理解的是上传文件个数..但我试了, 妹有用
            maxNumberOfFiles: 4,
            allowedFileTypes: [
              "image/jpeg",
              "image/jpg",
              "image/png",
              "image/svg",
              "image/gif",
              "image/webp",
            ],
            timeout: 6 * 1000,
            // 自定义上传图片的方法
            customUpload: (file, insertFn) => {
              this.uploadImage(file, insertFn);
            },
          },
        },
      },
    };
  },
  computed: {
    // 限制editor高度
    height() {
      return parseInt(this.editorHeight) < 300 ? "300px" : this.editorHeight;
    },
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor);
    },
    onChange() {
      // 输入框内值发生变化时需要向外传值
      this.$emit("change", this.html, this.atItem);
    },
    uploadImage(file, insertFn) {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("flag", "zsk");
      uploadImg(formData).then((res) => {
        // 接口返回的路径----将图片插入页面
        // insertFn是上面自定义上传的方法中传递的参数方法, 本身有仨参数
        // url, alt, href
        insertFn(
          process.env.VUE_APP_BASE_API + "/admin-api/" + res.data,
          file.name,
          process.env.VUE_APP_BASE_API + "/admin-api/" + res.data
        );
      });
    },
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy();
  },
  watch: {
    initHtml: {
      handler(value) {
        this.html = value;
        this.autoFocus = this.html === "";
      },
      immediate: true,
    },
  },
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
.editor {
  border: 1px solid #dcdfe6;
}
.editor-container {
  min-height: 300px;
  overflow-y: scroll;
}
.toolbar-container {
  border-bottom: 1px solid #dcdfe6;
  border-top: 1px solid transparent;
}
</style>