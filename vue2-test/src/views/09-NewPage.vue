<template>
  <div class="09-NewPage">
    <el-button @click="openNew(23)">打开新页面</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    openNew(id) {
      let routeUrl = this.$router.resolve({
        path: "/test1",
        query: {
          id: id,
        },
      });
      // window.open(routeUrl.href, "_blank");
      window.open(routeUrl.resolved.fullPath, "_blank");
    },
  },
};
</script>
<style scoped>
</style>