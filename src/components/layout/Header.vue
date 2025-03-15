<template>
  <header>
    <div class="header-top">
      <div class="logo">
        <router-link to="/">鞋类设计师展示平台</router-link>
      </div>
      <div class="search-box">
        <input type="text" placeholder="搜索设计师或作品..." v-model="searchQuery">
        <button><i class="search-icon">🔍</i></button>
      </div>
      <nav class="nav-top">
        <router-link to="/">首页</router-link>
        <router-link to="/designers">设计师</router-link>
        <router-link to="/about">关于我们</router-link>
      </nav>
    </div>
    
    <div class="header-bottom">
      <nav class="category-nav">
        <router-link to="/category/sports">运动鞋</router-link>
        <router-link to="/category/casual">休闲鞋</router-link>
        <router-link to="/category/formal">正装鞋</router-link>
        <router-link to="/category/boots">靴子</router-link>
        <router-link to="/category/sandals">凉鞋</router-link>
        <router-link to="/category/slippers">拖鞋</router-link>
        <div class="dropdown">
          <span class="dropdown-toggle">品牌 ▼</span>
          <div class="dropdown-menu">
            <router-link to="/brand/1">耐克</router-link>
            <router-link to="/brand/2">阿迪达斯</router-link>
            <router-link to="/brand/3">李宁</router-link>
            <router-link to="/brand/4">安踏</router-link>
            <router-link to="/brand/5">匡威</router-link>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const searchQuery = ref('');
</script>

<style scoped>
header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #333;
  color: white;
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
}

.search-box {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 20px;
  padding: 5px 10px;
  width: 300px;
}

.search-box input {
  flex: 1;
  border: none;
  padding: 5px;
  outline: none;
}

.search-box button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 5px;
}

.nav-top {
  display: flex;
  gap: 20px;
}

.nav-top a {
  color: white;
  text-decoration: none;
  padding: 5px 10px;
}

.nav-top a:hover, .nav-top a.router-link-active {
  background-color: #555;
  border-radius: 4px;
}

.header-bottom {
  padding: 10px 20px;
  background-color: #f5f5f5;
}

.category-nav {
  display: flex;
  justify-content: center;
  gap: 30px;
}

.category-nav a {
  color: #333;
  text-decoration: none;
  padding: 5px 0;
  position: relative;
}

.category-nav a:hover, .category-nav a.router-link-active {
  color: #0066cc;
}

.category-nav a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #0066cc;
}

.dropdown {
  position: relative;
  cursor: pointer;
}

.dropdown-toggle {
  padding: 5px 0;
  color: #333;
}

.dropdown:hover .dropdown-toggle {
  color: #0066cc;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 4px;
  min-width: 150px;
  z-index: 100;
  display: none;
  padding: 10px 0;
}

.dropdown:hover .dropdown-menu {
  display: block;
}

.dropdown-menu a {
  display: block;
  padding: 8px 15px;
  color: #333;
}

.dropdown-menu a:hover {
  background-color: #f5f5f5;
}
</style> 