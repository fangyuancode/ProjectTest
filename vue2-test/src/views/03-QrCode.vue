<template>
  <div class="test">
    <div class="qrcode">
      <!-- 二维码 -->
      <div id="qrcode" ref="qrcode"></div>
    </div>
    <el-button @click="clearClick" size="small">清理</el-button>
    <el-button @click="reProducet" size="small">重新生成</el-button>
    <br>
    <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间">
    </el-date-picker>
    <br>
    <el-date-picker v-model="value2" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-DD HH:mm:ss">
    </el-date-picker>
  </div>

</template>
<script>
// 引用
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      value1: "2024-07-09T15:40:18",
      value2: "2024-07-01 15:40:18",
    };
  },
  methods: {
    reProducet() {
      this.qrcode.makeCode("hhhhh");
    },
    clearClick() {
      // console.log("清理", this.qrcode.clear);
      this.qrcode.clear();
    },
    creatQrCode() {
      let text = "https://juejin.cn/user/2305013721343703/posts";
      this.qrcode = new QRCode(this.$refs.qrcode, {
        text: text, //二维码内容字符串
        width: 128, //图像宽度
        height: 128, //图像高度
        colorDark: "#000000", //二维码前景色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.H, //容错级别
      });
    },
  },
  mounted() {
    this.creatQrCode();
  },
};
</script>

<style  scoped>
.qrcode {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
