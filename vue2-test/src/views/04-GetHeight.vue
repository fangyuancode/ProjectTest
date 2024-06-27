<template>
  <div>
    <h2>表单的高度：{{ firstHeight }}</h2>

    <div class="formstyle" v-resize="getDomHeight" id="first">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item><el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <h2>table的高度:{{ secondHeight }}</h2>
    <div class="table" id="second">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址">
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>
<script>
export default {
  directives: {
    // 使用局部注册指令的方式
    resize: {
      // 指令的名称
      // 在指令绑定到元素时执行的钩子函数
      // el：绑定指令的元素
      // binding：包含指令信息的对象
      bind(el, binding) {
        // el为绑定的元素，binding为绑定给指令的对象
        let width = "",
          height = "";
        function isReize() {
          // Window.getComputedStyle()方法返回一个对象，该对象在应用活动样式表并解析这些值可能包含的任何基本计算后报告元素的所有 CSS 属性的值。
          //  检查元素的实际样式尺寸是否发生变化
          const style = document.defaultView.getComputedStyle(el);
          console.log("style", style.height);
          if (width !== style.width || height !== style.height) {
            // 如果尺寸变化，则执行绑定给指令的回调函数（binding.value()）
            binding.value(); // 关键
          }
          // 更新存储的当前尺寸信息
          width = style.width;
          height = style.height;
        }
        // 使用 setInterval 定期检查元素尺寸变化
        el.__vueSetInterval__ = setInterval(isReize, 500);
        console.log("el", el.__vueSetInterval__);
      },
      unbind(el) {
        // 在指令与元素解绑时执行的钩子函数
        // 清除之前设置的定时器，防止内存泄漏
        clearInterval(el.__vueSetInterval__);
      },
    },
  },
  data() {
    return {
      formInline: {
        user: "",
        region: "",
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      firstHeight: "",
      secondHeight: "",
    };
  },
  methods: {
    getDomHeight() {
      //获取第一个div高度，第二个div距离头部高度
      this.firstHeight = document.getElementById("first").clientHeight;
      this.secondHeight = document.getElementById("second").clientHeight;
    },
    onSubmit() {
      console.log("submit!");
    },
  },
  mounted() {},
};
</script>
<style scoped>
.formstyle {
  margin: 0 auto;
  padding: 20px;
  border: 1px solid pink;
}
</style>