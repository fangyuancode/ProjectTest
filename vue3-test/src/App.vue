<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>

    <nav>
      <RouterLink to="/">主页</RouterLink>|
      <RouterLink to="/exportExcel">测试读取world</RouterLink> |
      <RouterLink to="/printPdf">打印pdf</RouterLink> |
      <RouterLink to="/testDb">测试indexDb</RouterLink> |
      <RouterLink to="/joint">测试 joint</RouterLink> |

      <!-- joint -->
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  width: 800px;
  margin: 0 auto;
}
</style>
