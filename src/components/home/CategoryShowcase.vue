<template>
  <div class="category-showcase">
    <h2 class="section-title">鞋类分类</h2>
    <div class="category-grid">
      <div v-for="(category, key) in categories" :key="key" class="category-card">
        <router-link :to="`/category/${key}`">
          <div class="category-image" :style="{ backgroundImage: `url(${category.image})` }"></div>
          <div class="category-info">
            <h3>{{ category.name }}</h3>
            <span class="category-count">{{ category.count }}个设计</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ShoeCategory } from '@/types';

const categories = ref({
  [ShoeCategory.SPORTS]: { 
    name: '运动鞋', 
    count: 42,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff'
  },
  [ShoeCategory.CASUAL]: { 
    name: '休闲鞋', 
    count: 28,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77'
  },
  [ShoeCategory.FORMAL]: { 
    name: '正装鞋', 
    count: 15,
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a'
  },
  [ShoeCategory.BOOTS]: { 
    name: '靴子', 
    count: 23,
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f'
  },
  'sandals': { 
    name: '凉鞋', 
    count: 18,
    image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b'
  },
  'slippers': { 
    name: '拖鞋', 
    count: 12,
    image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980'
  }
});
</script>

<style scoped>
.category-showcase {
  margin-bottom: 60px;
}

.section-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 30px;
  position: relative;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #0066cc;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
}

.category-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.category-card a {
  text-decoration: none;
  color: inherit;
}

.category-image {
  height: 180px;
  background-size: cover;
  background-position: center;
}

.category-info {
  padding: 15px;
  background-color: white;
}

.category-info h3 {
  margin: 0;
  margin-bottom: 5px;
  font-size: 1.2rem;
}

.category-count {
  color: #666;
  font-size: 0.9rem;
}
</style> 