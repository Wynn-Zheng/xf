import { defineStore } from 'pinia';
import type { Designer, ShoeCategory } from '@/types';

interface DesignersState {
  designers: Designer[];
  loading: boolean;
  error: string | null;
}

export const useDesignersStore = defineStore('designers', {
  state: (): DesignersState => ({
    designers: [],
    loading: false,
    error: null
  }),
  
  getters: {
    getDesignerById: (state) => (id: number) => {
      return state.designers.find(designer => designer.id === id) || null;
    },
    
    getDesignersByCategory: (state) => (category: ShoeCategory) => {
      return state.designers.filter(designer => 
        designer.portfolioItems.some(item => item.category === category)
      );
    }
  },
  
  actions: {
    async fetchDesigners() {
      this.loading = true;
      this.error = null;
      
      try {
        // 这里将来会从API获取设计师数据
        // const response = await fetch('/api/designers');
        // this.designers = await response.json();
        
        // 临时模拟数据
        await new Promise(resolve => setTimeout(resolve, 500));
        this.designers = [
          {
            id: 1,
            name: '张设计',
            avatar: '/images/avatars/designer1.jpg',
            description: '专注于运动鞋设计的创新设计师',
            country: '中国',
            specialties: ['运动鞋', '休闲鞋'],
            portfolioItems: [
              {
                id: 101,
                title: '动力跑鞋',
                description: '专为马拉松运动员设计的高性能跑鞋',
                imageUrl: '/images/portfolio/running-shoes.jpg',
                category: 'sports',
                createdAt: new Date('2023-01-15'),
                tags: ['跑步', '马拉松', '高性能']
              }
            ]
          }
        ];
      } catch (error) {
        this.error = '获取设计师数据失败';
        console.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
}); 