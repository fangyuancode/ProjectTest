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
    };
  },
  mounted() {
    this.getCookie();
  },
  methods: {
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
    handleLogin() {
      let code = 200;
      if (code == 200) {
        if (this.rememberPassword) {
          this.$cookie.set("username", this.loginForm.username, {
            expires: 3,
          });
          //  第二个参数为密钥，这里我设置为123456
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
};
</script>
 
 