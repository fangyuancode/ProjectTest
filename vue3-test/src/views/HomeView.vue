<template>
  <textarea v-model="question"></textarea>
  <br />
  <button @click="handleSubmit">向 AI 提问</button>
  <br />
  <textarea v-model="answer"></textarea>
</template>

<script setup>
import { onMounted, ref } from "vue";

let AI = null;
const question = ref("");
const answer = ref("");

onMounted(async () => {
  AI = await window.model.createTextSession();
});

const handleSubmit = async () => {
  const data = await AI.prompt(question.value);
  answer.value = data;
};
</script>