import { LucideIcon } from 'lucide-react';

export type ProductType = 'account' | 'subscription' | 'license-key' | 'download';
export type DeliveryType = 'auto' | 'manual';
export type BadgeType = 'Shared' | 'Personal' | 'Key Code' | 'Email Invite' | 'New' | 'Hot' | 'Best Seller';

export interface SystemRequirement {
  os: string;
  ram: string;
  storage: string;
  processor?: string;
}

export interface Review {
  id: string;
  author: string;
  verified: boolean;
  date: string;
  rating: number;
  content: string;
  title?: string;
  avatar?: string;
}

export interface WhatYouGetItem {
  title: string;
  description: string;
  icon?: string; // We'll map string to icon in component or just use color circles as in design
  color?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge: BadgeType;
  productType: ProductType;
  deliveryType: DeliveryType;
  
  // Data for Hero
  rating: number;
  reviews: number;
  soldLast23Hours: number;
  peopleWatching: number;
  shortDescription: string; // Bullet points in hero
  highlights: string[]; 

  // Data for Tabs
  description: string; // Main long description
  whatYouGet: WhatYouGetItem[];
  reviewsList: Review[];
  
  duration: string;
  warranty: string;
  systemRequirements?: SystemRequirement;
  installationGuide?: string[];
  stock: number;
}

export interface Bundle {
  id: string;
  name: string;
  products: string[];
  discount: number;
  price: number;
  originalPrice: number;
  image: string;
}

export const categories = {
  'ai-tools': {
    name: 'AI Tools',
    items: ['Midjourney', 'ChatGPT', 'Claude', 'Jasper']
  },
  'creative': {
    name: 'Creative Assets',
    items: ['Prompts', 'Templates', 'Fonts']
  },
  'software': {
    name: 'Software',
    items: ['Adobe', 'Microsoft', 'Antivirus']
  }
};

export const products: Product[] = [
  {
    id: 'midjourney-prompts-1200',
    name: 'Best 1200+ Midjourney Prompts Commands',
    category: 'ai-tools',
    price: 100,
    originalPrice: 1500,
    image: 'https://images.unsplash.com/photo-1686191128892-c21c67423145?w=600&q=80', // Placeholder
    badge: 'New',
    productType: 'download',
    deliveryType: 'auto',
    rating: 5,
    reviews: 13,
    soldLast23Hours: 45,
    peopleWatching: 85,
    stock: 999,
    duration: 'Lifetime',
    warranty: 'Money Back Guarantee',
    shortDescription: 'The best Ultimate Midjourney 1200+ prompts with resell rights mega bundle!',
    highlights: [
      'Copy and paste Prompts',
      '15+ category Design',
      '1200+ Midjourney',
      'Best Midjourney Prompts with resell rights'
    ],
    description: 'If you are looking for the best prompts to increase your design skill then you have come to the right place, because we are providing the Best 1200+ Midjourney Prompts Commands, designed to your imagination. Whether you\'re an aspiring writer, an artist seeking inspiration, or someone looking to infuse excitement into your daily routine, these prompts are your gateway to boundless creativity. Immerse yourself in a world where ideas flow effortlessly, and watch your creativity flourish.',
    whatYouGet: [
      {
        title: 'Cyberpunk, Anime, Optical Illusions',
        description: 'Covering various industries, tones, and purposes, our prompts make your design more eye catching',
        color: 'bg-green-200' 
      },
      {
        title: 'Art Nouveau, Abstract Art, Pop Art',
        description: 'The Best 1200+ Midjourney Prompts Commands are more than just prompts; they are a bridge to a vibrant community',
        color: 'bg-emerald-600'
      },
      {
        title: 'Concept Art, Dark Fantasy, more',
        description: 'From brainstorming sessions to project planning, these prompts add a dynamic twist to your daily activities',
        color: 'bg-green-100'
      }
    ],
    reviewsList: [
      {
        id: 'r1',
        author: 'David Brown',
        verified: true,
        date: 'July 21, 2023',
        rating: 5,
        content: 'Fast Delivery, khub valo laglo.',
        title: 'Fast Delivery'
      },
      {
        id: 'r2',
        author: 'Hasan Ali',
        verified: false,
        date: 'November 23, 2023',
        rating: 5,
        content: 'I\'m loving these prompts. Everything was well organized into categories and shipping was very fast.'
      },
      {
        id: 'r3',
        author: 'Siti Rahman',
        verified: true,
        date: 'January 12, 2024',
        rating: 5,
        content: 'Notun kisu sikhe valo laglo.'
      }
    ]
  },
  {
    id: 'chatgpt-prompt-pack',
    name: 'Ultimate ChatGPT Prompt Pack',
    category: 'ai-tools',
    price: 150,
    originalPrice: 2000,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
    badge: 'Hot',
    productType: 'download',
    deliveryType: 'auto',
    rating: 4.8,
    reviews: 42,
    soldLast23Hours: 120,
    peopleWatching: 200,
    stock: 999,
    duration: 'Lifetime',
    warranty: 'Tested & Verified',
    shortDescription: 'Master ChatGPT with 5000+ copy-paste prompts for every niche.',
    highlights: [
      'Marketing & Sales Prompts',
      'Coding & Debugging Helpers',
      'Email Writing Templates',
      'Content Creation Ideas'
    ],
    description: 'Unlock the full potential of ChatGPT with our massive library of prompts. Stop wasting time figuring out what to say and start getting results immediately.',
    whatYouGet: [
      {
        title: 'Marketing Supremacy',
        description: 'Create high-converting ad copy, emails, and landing pages in seconds.',
        color: 'bg-blue-200'
      },
      {
        title: 'Coding Wizardry',
        description: 'Debug code, write documentation, and generate snippets faster than ever.',
        color: 'bg-indigo-600'
      }
    ],
    reviewsList: [
        {
            id: 'r4', author: 'Mike R.', verified: true, date: 'Feb 10, 2024', rating: 5, content: 'Saved me hours of work!'
        }
    ]
  },
  {
    id: 'ai-video-builder',
    name: 'AI Video Builder - AI Video Editing',
    category: 'ai-tools',
    price: 450,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80',
    badge: 'Best Seller',
    productType: 'subscription',
    deliveryType: 'auto',
    rating: 4.9,
    reviews: 89,
    soldLast23Hours: 67,
    peopleWatching: 150,
    stock: 50,
    duration: '1 Year',
    warranty: 'Support Included',
    shortDescription: 'Create professional videos in minutes with AI-powered tools.',
    highlights: [
      'Text to Video Generation',
      'Auto-Subtitle Generator',
      'AI Voiceovers (30+ Languages)',
      'No Watermark Export'
    ],
    description: 'Revolutionize your content creation process. Simply type your script, select a style, and let the AI generate a high-quality video for you.',
    whatYouGet: [
      {
        title: 'Unlimited Exports',
        description: 'Create as many videos as you need without restrictions.',
        color: 'bg-purple-200'
      }
    ],
    reviewsList: []
  },
  {
    id: 'adobe-creative-cloud',
    name: 'Adobe Creative Cloud (All Apps)',
    category: 'software',
    price: 699,
    originalPrice: 3999,
    image: 'https://images.unsplash.com/photo-1595675024853-0f3ec9098ac7?w=600&q=80',
    badge: 'Hot',
    productType: 'subscription',
    deliveryType: 'manual',
    rating: 5,
    reviews: 210,
    soldLast23Hours: 15,
    peopleWatching: 45,
    stock: 10,
    duration: '1 Year',
    warranty: 'Full Warranty',
    shortDescription: 'Get the entire collection of 20+ creative desktop and mobile apps.',
    highlights: [
      'Photoshop, Illustrator, Premiere Pro',
      '100GB Cloud Storage',
      'Instant Updates',
      'Official License'
    ],
    description: 'The ultimate creative toolkit. From photo editing to video production, UI design to social media, Creative Cloud has everything you need.',
    whatYouGet: [
        { title: 'Industry Standard Tools', description: 'Access the same tools used by professionals worldwide.', color: 'bg-red-100'}
    ],
    reviewsList: []
  },
  {
    id: 'ai-wizard-seo',
    name: 'AI Wizard - Awesome Builders',
    category: 'ai-tools',
    price: 600,
    originalPrice: 2700,
    image: 'https://images.unsplash.com/photo-1639322537228-ad71c4295843?w=600&q=80',
    badge: 'New',
    productType: 'subscription',
    deliveryType: 'auto',
    rating: 4.6,
    reviews: 25,
    soldLast23Hours: 30,
    peopleWatching: 60,
    stock: 100,
    duration: 'Lifetime Access',
    warranty: '7 Day Refund',
    shortDescription: 'Boost your SEO with AI-driven insights and content generation.',
    highlights: [
      'Keyword Research',
      'Competitor Analysis',
      'Content Optimization',
      'Rank Tracking'
    ],
    description: 'Dominate search results with AI Wizard. Our advanced algorithms analyze the web to give you the competitive edge you need.',
    whatYouGet: [
        { title: 'Data-Driven Insights', description: 'Make informed decisions based on real-time data.', color: 'bg-green-100'}
    ],
    reviewsList: []
  },
  {
    id: 'chatgpt-1600',
    name: 'Best 1600+ ChatGPT AI Tools',
    category: 'ai-tools',
    price: 250, // Corrected price from 250000 to be realistic based on similar items
    originalPrice: 320,
    image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=600&q=80',
    badge: 'Key Code',
    productType: 'download',
    deliveryType: 'auto',
    rating: 4.9,
    reviews: 111,
    soldLast23Hours: 85,
    peopleWatching: 12,
    stock: 500,
    duration: 'Lifetime',
    warranty: 'Instant Download',
    shortDescription: 'A massive collection of AI tools for every purpose.',
    highlights: [
      '1600+ Curated Tools',
      'Categorized by Usecase',
      'Updated Monthly',
      'Lifetime Access'
    ],
    description: 'Stop searching for the right AI tool. We have curated the best 1600+ AI tools across various categories including writing, design, video, audio, and more.',
    whatYouGet: [
        { title: 'Time Saver', description: 'Find the perfect tool in seconds.', color: 'bg-gray-200'}
    ],
    reviewsList: []
  },
  {
    id: 'nordvpn-premium',
    name: 'NordVPN Premium Account',
    category: 'software',
    price: 350,
    originalPrice: 900,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
    badge: 'Best Seller',
    productType: 'account',
    deliveryType: 'auto',
    rating: 4.8,
    reviews: 305,
    soldLast23Hours: 55,
    peopleWatching: 92,
    stock: 45,
    duration: '1 Year',
    warranty: '1 Year Warranty',
    shortDescription: 'Secure your internet connection with the world\'s leading VPN.',
    highlights: [
      '6000+ Servers',
      'Double VPN',
      'No Logs Policy',
      '6 Devices supported'
    ],
    description: 'Experience true internet freedom and privacy with NordVPN. Protect yourself from hackers and snoops while accessing content from anywhere.',
    whatYouGet: [
        { title: 'Privacy First', description: 'Your data is safe with military-grade encryption.', color: 'bg-blue-300'}
    ],
    reviewsList: []
  },
  {
    id: 'canva-pro',
    name: 'Canva Pro Lifetime',
    category: 'creative',
    price: 150,
    originalPrice: 500,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80',
    badge: 'Shared',
    productType: 'account',
    deliveryType: 'manual',
    rating: 4.9,
    reviews: 512,
    soldLast23Hours: 210,
    peopleWatching: 350,
    stock: 50,
    duration: 'Lifetime',
    warranty: 'Replacement Guarantee',
    shortDescription: 'Design anything, publish anywhere with Canva Pro.',
    highlights: [
      'Unlimited Premium Content',
      'Background Remover',
      'Magic Resize',
      'Brand Kit'
    ],
    description: 'Get access to premium templates, images, and tools. Perfect for social media managers, entrepreneurs, and students.',
    whatYouGet: [
        { title: 'Unlimited Creativity', description: 'No limits on your designs.', color: 'bg-purple-300'}
    ],
    reviewsList: []
  },
  {
    id: 'windows-11-pro',
    name: 'Windows 11 Pro Key',
    category: 'software',
    price: 300,
    originalPrice: 2000,
    image: 'https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=600&q=80',
    badge: 'Key Code',
    productType: 'license-key',
    deliveryType: 'auto',
    rating: 5,
    reviews: 1024,
    soldLast23Hours: 98,
    peopleWatching: 40,
    stock: 999,
    duration: 'Lifetime',
    warranty: 'Official Microsoft Key',
    shortDescription: 'Activate Windows 11 Pro permanently.',
    highlights: [
      'Retail Key',
      'Global Activation',
      'Official Updates',
      'Instant Delivery'
    ],
    description: 'Genuine license key for Windows 11 Pro. Upgrade your PC to the latest operating system and enjoy enhanced performance and security.',
    whatYouGet: [
        { title: 'Genuine Software', description: 'Passes all Microsoft validation checks.', color: 'bg-sky-200'}
    ],
    reviewsList: []
  },
  {
    id: 'office-365',
    name: 'Microsoft Office 365 Pro',
    category: 'software',
    price: 400,
    originalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=600&q=80',
    badge: 'Email Invite',
    productType: 'account',
    deliveryType: 'manual',
    rating: 4.7,
    reviews: 67,
    soldLast23Hours: 25,
    peopleWatching: 55,
    stock: 30,
    duration: '1 Year',
    warranty: 'Full Support',
    shortDescription: 'Word, Excel, PowerPoint, and 1TB OneDrive.',
    highlights: [
      '5 Devices (PC/Mac/Mobile)',
      '1TB Cloud Storage',
      'Latest AI Features',
      'Offline Access'
    ],
    description: 'Get work done with the standard in office productivity. Collaborate in real-time and access your files from anywhere.',
    whatYouGet: [
        { title: 'Productivity Powerhouse', description: 'All the tools you need for school or work.', color: 'bg-orange-100'}
    ],
    reviewsList: []
  }
];

export const bundles: Bundle[] = [
  {
    id: 'designer-bundle',
    name: 'Designer\'s Ultimate Bundle',
    products: ['midjourney-prompts-1200', 'canva-pro'],
    discount: 20,
    price: 200,
    originalPrice: 250,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80'
  }
];

export type { Product as ProductInterface };

