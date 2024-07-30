const { defineConfig } = require('@vue/cli-service')
const path = require("path")
module.exports = defineConfig({
  transpileDependencies: true,
  // 配置Webpack模块解析的方式，使得你可以通过模块名字而不是相对路径来引入模块
  // resolve: {
  //   // 设置路径别名
  //   // alias: {
  //   //   '@': path.resolve('src'),
  //   //   '@public': path.resolve('public'),
  //   //   '@img': path.resolve('src/assets/images'),
  //   //   '@js': path.resolve('src/assets/scripts'),
  //   //   '@css': path.resolve('src/assets/styles')
  //   // }
  // }

})
