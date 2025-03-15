<template>
  <div class="designer-list">
    <h1>{{ categoryTitle }}</h1>
    <p>浏览我们精选的{{ categoryDescription }}设计师</p>
    
    <div v-if="loading" class="loading">
      正在加载设计师数据...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else-if="filteredDesigners.length === 0" class="no-results">
      没有找到符合条件的设计师
    </div>
    
    <div v-else class="designers-grid">
      <div v-for="designer in filteredDesigners" :key="designer.id" class="designer-card">
        <router-link :to="`/designers/${designer.id}`">
          <h3>{{ designer.name }}</h3>
          <p>{{ designer.country }}</p>
          <p>{{ designer.description }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useDesignersStore } from '@/stores/designers';
import type { ShoeCategory, CategoryParams } from '@/types';

const route = useRoute();
const store = useDesignersStore();

const loading = computed(() => store.loading);
const error = computed(() => store.error);

const categoryType = computed(() => (route.params as CategoryParams)?.type as ShoeCategory);

const categoryTitle = computed(() => {
  if (!categoryType.value) return '所有设计师';
  
  const titles: Record<ShoeCategory, string> = {
    sports: '运动鞋设计师',
    casual: '休闲鞋设计师',
    formal: '正装鞋设计师',
    boots: '靴子设计师'
  };
  
  return titles[categoryType.value] || '设计师';
});

const categoryDescription = computed(() => {
  if (!categoryType.value) return '';
  
  const descriptions: Record<ShoeCategory, string> = {
    sports: '运动鞋',
    casual: '休闲鞋',
    formal: '正装鞋',
    boots: '靴子'
  };
  
  return descriptions[categoryType.value] || '';
});

const filteredDesigners = computed(() => {
  if (!categoryType.value) return store.designers;
  return store.getDesignersByCategory(categoryType.value);
});

onMounted(() => {
  if (store.designers.length === 0) {
    store.fetchDesigners();
  }
});

watch(() => route.params, () => {
  // 路由参数改变时更新
}, { immediate: true });
</script>

<style scoped>
.designer-list {
  padding: 20px 0;
}

.designers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.designer-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  transition: transform 0.3s ease;
}

.designer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.designer-card a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.loading, .error, .no-results {
  margin: 40px 0;
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.error {
  color: #721c24;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}

.no-results {
  color: #856404;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
}
</style> 