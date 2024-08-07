<template>
  <div style="border: 1px solid #ccc;">

    <div v-for="(item,index) in list" :key="index">
      <div v-show="showIndex===item.index">

        <Toolbar style="border-bottom: 1px solid #ccc" :editor="item['editor'+item.index]" :defaultConfig="item['toolbarConfig'+item.index]" :mode="item['mode'+item.index]" />
      </div>
    </div>
    <!-- <Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" /> -->
    <div class="content">
      <div v-for="(item,index) in list" :key="index">
        <h4>{{item['title'+item.index]}}</h4>

        <Editor style="height: 100px; overflow-y: hidden;" v-model="item['html'+item.index]" :defaultConfig="item['defaultConfig'+item.index]" :mode="item['mode'+item.index]" @onCreated="onCreated(item,$event)" @onChange="onChange" @onDestroyed="onDestroyed" @onMaxLength="onMaxLength" @onFocus="onFocus(item,editor)" @onBlur="onBlur" @customAlert="customAlert" @customPaste="customPaste" />
      </div>

    </div>

  </div>
</template>
<script>
import "@wangeditor/editor/dist/css/style.css";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {},
      editorConfig: { placeholder: "请输入内容..." },
      mode: "default", // or 'simple'
      // 分割
      html1: "",
      editor1: null,
      toolbarConfig1: {},
      editorConfig1: { placeholder: "请输入内容..." },
      mode1: "default", // or 'simple'
      showIndex: 1,
      // 数据
      list: [
        {
          index: 1,
          title1: "标题一",
          editor1: "",
          html1: "",
          editorConfig1: { placeholder: "请输入内容..." },
          mode1: "default", // or 'simple'
          toolbarConfig1: {},
        },
        {
          index: 2,
          title2: "标题二",
          editor2: "",
          html2: "",
          editorConfig2: { placeholder: "请输入内容..." },
          mode2: "default", // or 'simple'
          toolbarConfig2: {},
        },
        {
          index: 3,
          title3: "标题三",
          editor3: "",
          html3: "",
          editorConfig3: { placeholder: "请输入内容..." },
          mode3: "default", // or 'simple'
          toolbarConfig3: {},
        },
      ],
      indextag: 1,
    };
  },
  computed: {},
  methods: {
    // onCreated(editor) {
    //   this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    // },
    onCreated(item, $event) {
      let editor = $event;
      this.list[item.index - 1]["editor" + item.index] = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
      console.log("onCreated", editor);
    },
    onChange(editor) {
      console.log("onChange", editor.children);
    },
    onDestroyed(editor) {
      console.log("onDestroyed", editor);
    },
    onMaxLength(editor) {
      console.log("onMaxLength", editor);
    },
    onFocus(item, editor) {
      this.indextag = item.index - 1; //list元素的下标
      console.log("item", item);

      console.log("onFocus", editor);
      this.showIndex = item.index;
    },
    onBlur(editor) {
      console.log("onBlur", editor);
    },
    customAlert(info, type) {
      window.alert(`customAlert in Vue demo\n${type}:\n${info}`);
    },
    customPaste(editor, event, callback) {
      console.log("ClipboardEvent 粘贴事件对象", event);
      // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
      // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
      // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

      // 自定义插入内容
      editor.insertText("xxx");

      // 返回 false ，阻止默认粘贴行为
      event.preventDefault();
      callback(false); // 返回值（注意，vue 事件的返回值，不能用 return）

      // 返回 true ，继续默认的粘贴行为
      // callback(true)
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //   this.html = "<p>模拟 Ajax 异步设置内容 HTML</p>";
    // }, 1500);
  },
  beforeDestroy() {
    const editor = this.list[this.indextag]["editor" + (this.indextag + 1)];
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
};
</script>
<style scoped>
.content {
  width: 100%;
  height: 300px;
  /* background-color: #fcfcfc; */
}
</style>