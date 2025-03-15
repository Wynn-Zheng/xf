<template>
  <aside class="sidebar">
    <div class="sidebar-section">
      <div class="section-header" @click="toggleCategory">
        <h3>鞋类分类</h3>
        <span class="toggle-icon">{{ isCategoryOpen ? '▼' : '►' }}</span>
      </div>
      <transition name="slide">
        <ul v-if="isCategoryOpen">
          <li v-for="(category, key) in categories" :key="key">
            <router-link :to="`/category/${key}`" :class="{ active: activeCategoryType === key }">
              {{ category.name }}
              <span class="count">({{ category.count }})</span>
            </router-link>
          </li>
        </ul>
      </transition>
    </div>

    <div class="sidebar-section">
      <div class="section-header" @click="toggleBrands">
        <h3>品牌</h3>
        <span class="toggle-icon">{{ isBrandsOpen ? '▼' : '►' }}</span>
      </div>
      <transition name="slide">
        <div v-if="isBrandsOpen" class="filter-group">
          <div v-for="brand in brands" :key="brand.id" class="checkbox-item">
            <input 
              type="checkbox" 
              :id="`brand-${brand.id}`" 
              :value="brand.id" 
              v-model="selectedBrands"
            >
            <label :for="`brand-${brand.id}`">{{ brand.name }}</label>
          </div>
        </div>
      </transition>
    </div>

    <div class="sidebar-section">
      <div class="section-header" @click="toggleStyles">
        <h3>设计风格</h3>
        <span class="toggle-icon">{{ isStylesOpen ? '▼' : '►' }}</span>
      </div>
      <transition name="slide">
        <div v-if="isStylesOpen" class="filter-group">
          <div v-for="style in styles" :key="style.id" class="checkbox-item">
            <input 
              type="checkbox" 
              :id="`style-${style.id}`" 
              :value="style.id" 
              v-model="selectedStyles"
            >
            <label :for="`style-${style.id}`">{{ style.name }}</label>
          </div>
        </div>
      </transition>
    </div>

    <div class="sidebar-section">
      <div class="section-header">
        <h3>地区</h3>
      </div>
      <div class="filter-control">
        <select v-model="selectedRegion" class="region-select">
          <option value="">所有地区</option>
          <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
        </select>
      </div>
    </div>

    <div class="sidebar-actions">
      <button class="btn-filter" @click="applyFilters">应用筛选</button>
      <button class="btn-clear" @click="clearFilters">清除筛选</button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ShoeCategory } from '@/types';

const route = useRoute();
const router = useRouter();

// 折叠状态
const isCategoryOpen = ref(true);
const isBrandsOpen = ref(true);
const isStylesOpen = ref(false);

// 类别配置
const categories = ref({
  [ShoeCategory.SPORTS]: { name: '运动鞋', count: 42 },
  [ShoeCategory.CASUAL]: { name: '休闲鞋', count: 28 },
  [ShoeCategory.FORMAL]: { name: '正装鞋', count: 15 },
  [ShoeCategory.BOOTS]: { name: '靴子', count: 23 },
  'sandals': { name: '凉鞋', count: 18 },
  'slippers': { name: '拖鞋', count: 12 }
});

// 品牌列表
const brands = ref([
  { id: 1, name: '耐克' },
  { id: 2, name: '阿迪达斯' },
  { id: 3, name: '李宁' },
  { id: 4, name: '安踏' },
  { id: 5, name: '匡威' },
  { id: 6, name: '彪马' },
  { id: 7, name: '新百伦' }
]);

// 设计风格
const styles = ref([
  { id: 1, name: '极简主义' },
  { id: 2, name: '复古' },
  { id: 3, name: '未来科技' },
  { id: 4, name: '街头潮流' },
  { id: 5, name: '高端奢华' }
]);

// 地区列表
const regions = ref(['中国', '美国', '欧洲', '日本', '韩国', '其他']);

// 选中状态
const selectedBrands = ref<number[]>([]);
const selectedStyles = ref<number[]>([]);
const selectedRegion = ref('');

// 当前活动的类别
const activeCategoryType = computed(() => {
  const params = route.params;
  return params.type ? params.type.toString() : '';
});

// 折叠切换方法
const toggleCategory = () => {
  isCategoryOpen.value = !isCategoryOpen.value;
};

const toggleBrands = () => {
  isBrandsOpen.value = !isBrandsOpen.value;
};

const toggleStyles = () => {
  isStylesOpen.value = !isStylesOpen.value;
};

// 应用筛选
const applyFilters = () => {
  // 这里可以实现筛选逻辑
  console.log('应用筛选:', {
    brands: selectedBrands.value,
    styles: selectedStyles.value,
    region: selectedRegion.value
  });
  
  // 仅作为示例 - 后续可以整合到实际路由或状态管理中
  const query = {
    ...(selectedBrands.value.length > 0 && { brands: selectedBrands.value.join(',') }),
    ...(selectedStyles.value.length > 0 && { styles: selectedStyles.value.join(',') }),
    ...(selectedRegion.value && { region: selectedRegion.value })
  };
  
  router.push({ path: route.path, query });
};

// 清除筛选
const clearFilters = () => {
  selectedBrands.value = [];
  selectedStyles.value = [];
  selectedRegion.value = '';
  
  router.push({ path: route.path });
};

// 监听路由变化
watch(() => route.query, (newQuery) => {
  // 如果URL中有筛选参数，恢复筛选状态
  if (newQuery.brands) {
    const brandsArray = (newQuery.brands as string).split(',').map(Number);
    selectedBrands.value = brandsArray;
  }
  
  if (newQuery.styles) {
    const stylesArray = (newQuery.styles as string).split(',').map(Number);
    selectedStyles.value = stylesArray;
  }
  
  if (newQuery.region) {
    selectedRegion.value = newQuery.region as string;
  }
}, { immediate: true });
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #f5f5f5;
  padding: 20px;
  border-right: 1px solid #e0e0e0;
  height: 100%;
  overflow-y: auto;
}

.sidebar-section {
  margin-bottom: 24px;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
}

.sidebar-section:last-child {
  border-bottom: none;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.section-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.toggle-icon {
  font-size: 12px;
  color: #666;
  transition: transform 0.3s;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 10px;
}

.sidebar a {
  color: #333;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.sidebar a:hover, .sidebar a.active {
  background-color: #e6e6e6;
  color: #0066cc;
}

.count {
  color: #888;
  font-size: 0.9em;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px 0;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.checkbox-item input[type="checkbox"] {
  cursor: pointer;
}

.checkbox-item label {
  cursor: pointer;
  font-size: 14px;
  color: #444;
}

.filter-control {
  margin-top: 10px;
}

.region-select {
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
}

.sidebar-actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.btn-filter, .btn-clear {
  padding: 8px 15px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-filter {
  background-color: #1a73e8;
  color: white;
  flex: 2;
}

.btn-filter:hover {
  background-color: #1557b0;
}

.btn-clear {
  background-color: #f1f1f1;
  color: #333;
  flex: 1;
}

.btn-clear:hover {
  background-color: #ddd;
}

/* 动画效果 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
  max-height: 300px;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style> 