<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>

    <nav>
      <RouterLink to="/">主页</RouterLink>|
      <RouterLink to="/exportExcel">测试读取world</RouterLink> |
      <RouterLink to="/PrintPdf">打印pdf</RouterLink> |
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  width: 100%;
  margin: 0 auto;
}
</style>
