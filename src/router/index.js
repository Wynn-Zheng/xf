import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import DesignerList from '@/views/DesignerList.vue'
import DesignerDetail from '@/views/DesignerDetail.vue'
import About from '@/views/About.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/designers',
      name: 'designers',
      component: DesignerList
    },
    {
      path: '/designers/:id',
      name: 'designer-detail',
      component: DesignerDetail,
      props: true
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/category/:type',
      name: 'category',
      component: DesignerList,
      props: true
    }
  ]
})

export default router 