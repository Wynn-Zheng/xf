<template>
  <div class="carousel">
    <div class="carousel-container" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div 
        v-for="(slide, index) in slides" 
        :key="index" 
        class="carousel-slide"
        :style="{ backgroundImage: `url(${slide.image})` }"
      >
        <div class="slide-content">
          <h2>{{ slide.title }}</h2>
          <p>{{ slide.description }}</p>
          <router-link :to="slide.link" class="btn-explore">探索更多</router-link>
        </div>
      </div>
    </div>
    
    <div class="carousel-indicators">
      <span 
        v-for="(slide, index) in slides" 
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="setCurrentSlide(index)"
      ></span>
    </div>
    
    <button class="carousel-control prev" @click="prevSlide">❮</button>
    <button class="carousel-control next" @click="nextSlide">❯</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const slides = ref([
  {
    title: '2023年最新运动鞋设计',
    description: '探索顶尖设计师的革命性运动鞋设计',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    link: '/category/sports'
  },
  {
    title: '商务正装鞋新趋势',
    description: '优雅与舒适的完美结合',
    image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
    link: '/category/formal'
  },
  {
    title: '秋冬靴子系列',
    description: '时尚保暖兼备的设计精品',
    image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    link: '/category/boots'
  }
]);

const currentIndex = ref(0);
let intervalId: number | null = null;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
};

const setCurrentSlide = (index: number) => {
  currentIndex.value = index;
};

const startAutoSlide = () => {
  intervalId = window.setInterval(() => {
    nextSlide();
  }, 5000);
};

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});
</script>

<style scoped>
.carousel {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 40px;
}

.carousel-container {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.5s ease;
}

.carousel-slide {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  background-size: cover;
  background-position: center;
}

.slide-content {
  position: absolute;
  bottom: 60px;
  left: 60px;
  max-width: 500px;
  color: white;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.slide-content h2 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.slide-content p {
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.btn-explore {
  display: inline-block;
  padding: 10px 20px;
  background-color: #0066cc;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-explore:hover {
  background-color: #004c99;
}

.carousel-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

.carousel-indicators span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background-color 0.3s;
}

.carousel-indicators span.active {
  background-color: white;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.carousel-control:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.carousel-control.prev {
  left: 20px;
}

.carousel-control.next {
  right: 20px;
}
</style> 