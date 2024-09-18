<template>
  <div class="container">
    <div class="title">This is a Vue counter</div>
    <div class="btn-container">
      <button class="btn" @click="increment">+1</button>
      <button class="btn" @click="decrement">-1</button>
    </div>
    <div>Current count: {{ count }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const count = ref<number>(0);

const increment = () => {
  count.value++;
};

const decrement = () => {
  count.value--;
};
</script>

<style scoped>
.container {
  font-family: 'PingFang SC', 'Microsoft YaHei', 'SimHei', 'SimSun',
    'sans-serif';
  font-size: 14px;
  line-height: 20px;
}
.title {
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
}
.btn-container {
  display: flex;
  align-items: center;
  column-gap: 24px;
}
.btn {
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  font-size: 14px;
  border-radius: 4px;
  line-height: 20px;
  padding: 4px 16px;
  margin: 12px 0;
}
</style>
