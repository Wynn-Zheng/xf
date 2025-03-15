<template>
  <div class="home">
    <!-- 轮播图 -->
    <HomeCarousel />
    
    <!-- 分类展示 -->
    <CategoryShowcase />
    
    <!-- 精选设计师 -->
    <div class="featured-section">
      <h2 class="section-title">精选设计师</h2>
      
      <div v-if="loading" class="loading">
        正在加载设计师数据...
      </div>
      
      <div v-else-if="error" class="error">
        {{ error }}
      </div>
      
      <div v-else class="designers-grid">
        <div v-for="designer in designers" :key="designer.id" class="designer-card">
          <router-link :to="`/designers/${designer.id}`">
            <div class="designer-avatar" :style="{ backgroundImage: `url(${designer.avatar})` }"></div>
            <div class="designer-info">
              <h3>{{ designer.name }}</h3>
              <p class="designer-country">{{ designer.country }}</p>
              <p class="designer-desc">{{ designer.description }}</p>
              <div class="designer-specialties">
                <span v-for="(specialty, index) in designer.specialties" :key="index">
                  {{ specialty }}
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      
      <div class="view-all-container">
        <router-link to="/designers" class="btn-view-all">查看全部设计师</router-link>
      </div>
    </div>
    
    <!-- 最新动态 -->
    <div class="news-section">
      <h2 class="section-title">最新动态</h2>
      <div class="news-grid">
        <div v-for="(news, index) in newsItems" :key="index" class="news-card">
          <div class="news-image" :style="{ backgroundImage: `url(${news.image})` }"></div>
          <div class="news-content">
            <span class="news-date">{{ news.date }}</span>
            <h3>{{ news.title }}</h3>
            <p>{{ news.summary }}</p>
            <a href="#" class="news-link">阅读更多</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useDesignersStore } from '@/stores/designers';
import HomeCarousel from '@/components/home/HomeCarousel.vue';
import CategoryShowcase from '@/components/home/CategoryShowcase.vue';

const store = useDesignersStore();

const designers = computed(() => store.designers);
const loading = computed(() => store.loading);
const error = computed(() => store.error);

const newsItems = ref([
  {
    title: '2023全球鞋类设计大赛即将开幕',
    date: '2023-09-15',
    summary: '一年一度的全球鞋类设计大赛将于下月在米兰举行，来自全球的设计师将展示他们的最新作品。',
    image: 'https://images.unsplash.com/photo-1600054800747-be294a6a0d26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    title: '环保材料在鞋类设计中的应用',
    date: '2023-09-10',
    summary: '越来越多的设计师开始关注环保材料在鞋类设计中的应用，本文探讨了这一趋势。',
    image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    title: '3D打印技术革新鞋类制造',
    date: '2023-09-05',
    summary: '3D打印技术如何改变传统鞋类制造流程，带来个性化定制的新可能。',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
]);

onMounted(() => {
  store.fetchDesigners();
});
</script>

<style scoped>
.home {
  padding-bottom: 60px;
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

.featured-section {
  margin-bottom: 60px;
}

.designers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.designer-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: white;
}

.designer-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.designer-card a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.designer-avatar {
  height: 200px;
  background-size: cover;
  background-position: center;
  background-color: #f5f5f5;
}

.designer-info {
  padding: 20px;
}

.designer-info h3 {
  margin: 0;
  margin-bottom: 5px;
  font-size: 1.3rem;
}

.designer-country {
  color: #666;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.designer-desc {
  color: #333;
  margin-bottom: 15px;
  line-height: 1.4;
}

.designer-specialties {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.designer-specialties span {
  display: inline-block;
  padding: 3px 10px;
  background-color: #f0f0f0;
  border-radius: 15px;
  font-size: 0.8rem;
  color: #555;
}

.loading, .error {
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

.view-all-container {
  text-align: center;
  margin-top: 30px;
}

.btn-view-all {
  display: inline-block;
  padding: 10px 25px;
  background-color: transparent;
  color: #0066cc;
  text-decoration: none;
  border: 2px solid #0066cc;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-view-all:hover {
  background-color: #0066cc;
  color: white;
}

.news-section {
  margin-bottom: 40px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.news-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.news-image {
  height: 180px;
  background-size: cover;
  background-position: center;
}

.news-content {
  padding: 20px;
}

.news-date {
  color: #666;
  font-size: 0.9rem;
}

.news-content h3 {
  margin: 10px 0;
  font-size: 1.2rem;
}

.news-content p {
  color: #555;
  margin-bottom: 15px;
  line-height: 1.5;
}

.news-link {
  color: #0066cc;
  text-decoration: none;
  font-weight: 500;
}

.news-link:hover {
  text-decoration: underline;
}
</style> 