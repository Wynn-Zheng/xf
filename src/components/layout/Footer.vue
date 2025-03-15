<template>
  <footer class="footer">
    <p>&copy; {{ currentYear }} 鞋类设计师展示平台. 保留所有权利.</p>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  padding: 15px 20px;
  background-color: #333;
  color: white;
  text-align: center;
}
</style> 