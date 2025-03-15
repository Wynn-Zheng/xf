<template>
  <div class="designer-detail">
    <h1>设计师详情</h1>
    <!-- 未来添加设计师详情内容 -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { Designer, DesignerParams } from '@/types';

const route = useRoute();
const designer = ref<Designer | null>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const id = (route.params as DesignerParams).id;
    // 这里将来会从API获取设计师数据
    // const response = await fetch(`/api/designers/${id}`);
    // designer.value = await response.json();
    
    // 临时模拟数据
    setTimeout(() => {
      designer.value = {
        id: parseInt(id),
        name: '示例设计师',
        avatar: '/images/avatars/designer1.jpg',
        description: '这是一个示例设计师的详细介绍...',
        country: '中国',
        specialties: ['运动鞋', '休闲鞋'],
        portfolioItems: []
      };
      loading.value = false;
    }, 500);
  } catch (err) {
    error.value = '加载设计师信息时出错';
    loading.value = false;
    console.error(err);
  }
});
</script>

<style scoped>
.designer-detail {
  padding: 20px;
}
</style> 