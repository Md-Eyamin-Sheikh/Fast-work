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

// Fallback products when MongoDB is unavailable
export const products: Product[] = [
  {
    id: 'chatgpt-plus-001',
    name: 'ChatGPT Plus',
    category: 'ai-tools',
    productType: 'Shared Account',
    badge: 'Shared',
    price: 1200,
    originalPrice: 1500,
    duration: '1 Month',
    deliveryType: 'auto',
    warranty: '30 Days Replacement',
    rating: 4.9,
    reviews: 1250,
    stock: 45,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
    description: 'Access to ChatGPT Plus with GPT-4, faster response times, and priority access during peak hours.'
  },
  {
    id: 'canva-pro-002',
    name: 'Canva Pro',
    category: 'creative-assets',
    productType: 'Personal Account',
    badge: 'Personal',
    price: 850,
    originalPrice: 1200,
    duration: '1 Month',
    deliveryType: 'manual',
    warranty: '15 Days Replacement',
    rating: 4.8,
    reviews: 980,
    stock: 30,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
    description: 'Premium Canva Pro account with unlimited design templates and features.'
  },
  {
    id: 'midjourney-003',
    name: 'Midjourney',
    category: 'ai-tools',
    productType: 'Email Invite',
    badge: 'Email Invite',
    price: 2500,
    originalPrice: 3000,
    duration: '1 Month',
    deliveryType: 'manual',
    warranty: '30 Days Replacement',
    rating: 4.9,
    reviews: 750,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1686191128892-8f1aeff4d605?w=400&h=300&fit=crop',
    description: 'Professional AI image generation with Midjourney access.'
  },
  {
    id: 'microsoft-office-004',
    name: 'Microsoft Office 365',
    category: 'software',
    productType: 'License Key',
    badge: 'Key Code',
    price: 1800,
    originalPrice: 2500,
    duration: '1 Year',
    deliveryType: 'auto',
    warranty: 'Lifetime Warranty',
    rating: 4.7,
    reviews: 1500,
    stock: 100,
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=400&h=300&fit=crop',
    description: 'Full Microsoft Office 365 suite with cloud storage.'
  },
  {
    id: 'figma-pro-005',
    name: 'Figma Professional',
    category: 'creative-assets',
    productType: 'Personal Account',
    badge: 'Personal',
    price: 1500,
    originalPrice: 2000,
    duration: '1 Month',
    deliveryType: 'manual',
    warranty: '30 Days Replacement',
    rating: 4.9,
    reviews: 680,
    stock: 25,
    image: 'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?w=400&h=300&fit=crop',
    description: 'Figma Professional plan with unlimited files and collaboration.'
  },
  {
    id: 'claude-pro-006',
    name: 'Claude Pro',
    category: 'ai-tools',
    productType: 'Shared Account',
    badge: 'Shared',
    price: 1300,
    originalPrice: 1600,
    duration: '1 Month',
    deliveryType: 'manual',
    warranty: '30 Days Replacement',
    rating: 4.8,
    reviews: 450,
    stock: 20,
    image: 'https://images.unsplash.com/photo-1655720033654-a4239dd42d10?w=400&h=300&fit=crop',
    description: 'Anthropic Claude Pro with extended context window.'
  }
];

export const bundles: Bundle[] = [
  {
    id: 'bundle-001',
    name: "Designer's Ultimate Bundle",
    products: ['canva-pro-002', 'figma-pro-005', 'midjourney-003'],
    price: 4200,
    originalPrice: 5200,
    discount: 20,
    image: '/bundles/designer-bundle.png'
  }
];
