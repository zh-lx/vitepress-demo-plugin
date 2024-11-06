<template>
  <div>
    <div>Students List:</div>
    <ul>
      <li v-for="student in students" :key="student">{{ student }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { students } from './constant/students';
</script>

<style scoped></style>
