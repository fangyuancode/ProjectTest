<template>
  <div class="pdf">
    <div id="printMe" style="background:red;">
      <p>葫芦娃，葫芦娃</p>
      <p>一根藤上七朵花 </p>
      <p>小小树藤是我家 啦啦啦啦 </p>
      <p>叮当当咚咚当当 浇不大</p>
      <p> 叮当当咚咚当当 是我家</p>
      <p> 啦啦啦啦</p>
      <p>...</p>
    </div>

    <button v-print="'#printMe'">Print local range</button>
  </div>
</template>
<script setup>
</script>
<style  scoped>
@page {
  size: auto A4 landscape;
  margin: 3mm;
}

@media print {
  body,
  html {
    height: initial;
    padding: 0px;
    margin: 0px;
  }
}
</style>