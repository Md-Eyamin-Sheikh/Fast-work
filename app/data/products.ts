// Product Type Definition
export interface Product {
  id: string;
  name: string;
  category: string;
  productType: string;
  badge: string;
  price: number;
  originalPrice?: number;
  duration: string;
  deliveryType: 'auto' | 'manual';
  warranty: string;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  description: string;
  shortDescription?: string;
  highlights?: string[];
  soldLast23Hours?: number;
  peopleWatching?: number;
  tags?: string[];
  whatYouGet?: Array<{
    title: string;
    description: string;
    color?: string;
  }>;
  reviewsList?: Array<{
    id: string;
    author: string;
    rating: number;
    content: string;
    date: string;
    verified: boolean;
  }>;
  _id?: string;
}

// Bundle Type
export interface Bundle {
  id: string;
  name: string;
  products: string[];
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
}

// Categories
export const categories = {
  'ai-tools': {
    name: 'AI Tools',
    items: ['ChatGPT Plus', 'Midjourney', 'Claude Pro', 'Perplexity AI']
  },
  'creative-assets': {
    name: 'Creative Assets',
    items: ['Canva Pro', 'Adobe Creative Cloud', 'Figma Professional', 'Envato Elements']
  },
  'software': {
    name: 'Software',
    items: ['Microsoft Office', 'Windows Professional', 'Antivirus', 'Premium Tools']
  }
};

// Empty arrays - all data now comes from MongoDB
export const products: Product[] = [];
export const bundles: Bundle[] = [];
