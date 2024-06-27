<template>
  <div id="app">
    <nav>
      <router-link to="/">echarts树形图结构配置</router-link> |
      <router-link to="/about">记住密码</router-link> |
      <router-link to="/test">二维码生成</router-link> |
      <router-link to="/getheight">获取元素高度</router-link> |

    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

nav {
  padding: 20px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
