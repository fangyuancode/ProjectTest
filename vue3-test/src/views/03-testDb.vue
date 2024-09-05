<template>
  <div class="home">
    <el-input v-model="personInfo.id"></el-input>
    <el-button type="primary" @click="addDbUser"> 添加</el-button>
    <el-button type="primary" @click="queryDbUser"> 查询</el-button>
  </div>
</template>
<script setup>
import IndexedDBService from "@/utils/indexdb";
import { ref, toRefs, toRaw, reactive } from "vue";
function queryDbUser() {
  let search = "ww";
  list(search);
}
//列表带查询分页
const list = async (search) => {
  const data = await IndexedDBService.getAllUsers(search);
  console.log("列表带查询分页", data);
};
const personInfo = reactive({ id: "5", name: "wwww", age: 23, height: 1.88 });
function addDbUser() {
  let obj = toRaw(personInfo);
  console.log("personInfo", obj);
  add(obj);
}
//新增
// const newItem = { id: "3", name: "李四", age: 23, height: 1.88 };

const add = async (newItem) => {
  await IndexedDBService.addUser(newItem);
};
// add(newItem);
//修改
const update = async (id) => {
  const data = await IndexedDBService.getUser(id);
  data.name = "123123";
  await IndexedDBService.updateUser(data);
};
//删除
const deleteItem = async (id) => {
  await IndexedDBService.deleteUser(id);
};
</script>
<style  scoped>
.home {
  margin-top: 20px;
}
</style>