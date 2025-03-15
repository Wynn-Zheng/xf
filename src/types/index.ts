// 设计师接口定义
export interface Designer {
  id: number;
  name: string;
  avatar: string;
  description: string;
  country: string;
  specialties: string[];
  contactInfo?: ContactInfo;
  portfolioItems: PortfolioItem[];
}

// 联系信息接口
export interface ContactInfo {
  email?: string;
  phone?: string;
  website?: string;
  socialMedia?: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
}

// 作品集项目接口
export interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  createdAt: Date;
  tags: string[];
}

// 鞋类类别枚举
export enum ShoeCategory {
  SPORTS = 'sports',
  CASUAL = 'casual',
  FORMAL = 'formal',
  BOOTS = 'boots'
}

// 路由参数接口
export interface CategoryParams {
  type: ShoeCategory;
}

export interface DesignerParams {
  id: string;
} 