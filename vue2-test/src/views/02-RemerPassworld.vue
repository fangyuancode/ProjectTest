<template>
  <div>
    <el-form :label-position="labelPosition" label-width="80px" :model="loginForm">
      <el-form-item label="名称">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
    </el-form>
    <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
    <br>
    <el-button @click="handleLogin">立即登陆</el-button>

    <div class="content">
      <div v-for="item in list">
        <div v-show="showIndex===item.index">
          {{ item.title }}</div>
      </div>

    </div>
  </div>
</template>
 
<script>
import CryptoJS from "crypto-js";
export default {
  name: "Login",
  data() {
    return {
      labelPosition: "right",

      rememberPassword: true,
      loginForm: {
        username: "",
        password: "",
      },
      // feng
      showIndex: 1,
      list: [
        {
          index: 1,
          title: "标题一",
          editor: "",
          htmltag: "",
          eeditorConfig: { placeholder: "请输入内容..." },
          mode: "default", // or 'simple'
          toolbarConfig: {},
        },
        {
          index: 2,
          title: "标题二",
          editor: "",
          htmltag: "",
          editorConfig: { placeholder: "请输入内容..." },
          mode: "default", // or 'simple'
          toolbarConfig: {},
        },
        {
          index: 3,
          title: "标题三",
          editor: "",
          htmltag: "",
          editorConfig: { placeholder: "请输入内容..." },
          mode: "default", // or 'simple'
          toolbarConfig: {},
        },
      ],
    };
  },
  mounted() {
    this.getCookie();
  },
  methods: {
    // 页面挂载时，判断密码是否存在。
    getCookie() {
      this.loginForm.username = this.$cookie.get("username");
      if (this.$cookie.get("password")) {
        //解密
        this.loginForm.password = CryptoJS.AES.decrypt(
          this.$cookie.get("password"),
          "246521"
        ).toString(CryptoJS.enc.Utf8);
      } else {
        this.loginForm.username = "";
      }
    },
    // 点击登录时，保存账号密码，且对密码进行加密存储。
    handleLogin() {
      let code = 200;
      if (code == 200) {
        if (this.rememberPassword) {
          this.$cookie.set("username", this.loginForm.username, {
            expires: 3,
          }); //创建有效期为3天的cookie
          //  第二个参数为密钥，这里我设置为246521
          this.$cookie.set(
            "password",
            CryptoJS.AES.encrypt(this.loginForm.password, "246521"),
            { expires: 3 }
          );
        } else {
          this.$cookie.remove("username");
          this.$cookie.remove("password");
        }
        this.$router.push("/test");
      }
    },
  },
  watch: {
    "$route.path": {
      handler(newValue, oldval) {
        console.log("老路由信息", oldval); //老路由信息
        console.log("新路由信息", newValue); //新路由信息
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
 
 