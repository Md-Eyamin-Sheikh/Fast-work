// Blog Type Definition
export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  _id?: string;
}

// Sample Blogs
export const blogs: Blog[] = [
  {
    id: 'blog-001',
    title: 'Top 10 AI Tools Every Freelancer Needs in 2024',
    slug: 'top-10-ai-tools-freelancer-2024',
    content: '<h1>Top 10 AI Tools Every Freelancer Needs in 2024</h1><p>Discover the essential AI tools that will supercharge your freelancing career and boost productivity...</p><h2>1. ChatGPT Plus</h2><p>The most powerful AI assistant for content creation, coding, and research.</p><h2>2. Midjourney</h2><p>Create stunning AI-generated images for your projects.</p>',
    excerpt: 'Discover the essential AI tools that will supercharge your freelancing career and boost productivity in 2024.',
    featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    author: 'Umar Faruk',
    category: 'AI Tools',
    tags: ['AI', 'Freelancing', 'Productivity', 'Tools'],
    status: 'published',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 'blog-002',
    title: 'ChatGPT Plus vs Free Version: Is It Worth the Upgrade?',
    slug: 'chatgpt-plus-vs-free-worth-upgrade',
    content: '<h1>ChatGPT Plus vs Free Version</h1><p>A comprehensive comparison to help you decide if upgrading to ChatGPT Plus is right for you...</p><h2>Speed and Performance</h2><p>ChatGPT Plus users get priority access even during peak times.</p>',
    excerpt: 'A comprehensive comparison to help you decide if upgrading to ChatGPT Plus is right for your needs.',
    featuredImage: 'https://images.unsplash.com/photo-1676911809746-7b02ed3e9ff1?w=800',
    author: 'Umar Faruk',
    category: 'AI Tools',
    tags: ['ChatGPT', 'AI', 'Comparison', 'Review'],
    status: 'published',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12'
  },
  {
    id: 'blog-003',
    title: 'Complete Canva Pro Tutorial for Beginners',
    slug: 'complete-canva-pro-tutorial-beginners',
    content: '<h1>Complete Canva Pro Tutorial</h1><p>Learn how to create professional designs with Canva Pro...</p><h2>Getting Started</h2><p>First, access all premium templates and features.</p>',
    excerpt: 'Master Canva Pro with this step-by-step tutorial covering all essential features for creating stunning designs.',
    featuredImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
    author: 'Umar Faruk',
    category: 'Creative Assets',
    tags: ['Canva', 'Design', 'Tutorial', 'Graphics'],
    status: 'published',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 'blog-004',
    title: 'How to Use Midjourney: Complete Guide for AI Art',
    slug: 'how-to-use-midjourney-complete-guide',
    content: '<h1>Midjourney Complete Guide</h1><p>Create breathtaking AI-generated artwork with Midjourney...</p><h2>Writing Effective Prompts</h2><p>The key to great AI art is mastering prompt writing.</p>',
    excerpt: 'Learn how to create breathtaking AI-generated artwork with this comprehensive Midjourney guide.',
    featuredImage: 'https://images.unsplash.com/photo-1686191128892-6077d54c2796?w=800',
    author: 'Umar Faruk',
    category: 'AI Tools',
    tags: ['Midjourney', 'AI Art', 'Tutorial', 'Creative'],
    status: 'published',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: 'blog-005',
    title: 'Microsoft Office 365 vs Google Workspace: Which is Better?',
    slug: 'microsoft-office-365-vs-google-workspace',
    content: '<h1>Office 365 vs Google Workspace</h1><p>Compare the two leading productivity suites to find the best fit for your needs...</p>',
    excerpt: 'An in-depth comparison of Microsoft Office 365 and Google Workspace to help you choose the right productivity suite.',
    featuredImage: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800',
    author: 'Umar Faruk',
    category: 'Software',
    tags: ['Microsoft', 'Productivity', 'Comparison', 'Office'],
    status: 'published',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: 'blog-006',
    title: 'Best Figma Plugins for UI/UX Designers in 2024',
    slug: 'best-figma-plugins-ui-ux-designers-2024',
    content: '<h1>Best Figma Plugins 2024</h1><p>Boost your design workflow with these essential Figma plugins...</p>',
    excerpt: 'Discover the must-have Figma plugins that will transform your UI/UX design workflow in 2024.',
    featuredImage: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800',
    author: 'Umar Faruk',
    category: 'Creative Assets',
    tags: ['Figma', 'Design', 'Plugins', 'UI/UX'],
    status: 'published',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03'
  },
  {
    id: 'blog-007',
    title: '10 Ways to Save Money on Premium Software Subscriptions',
    slug: '10-ways-save-money-premium-software',
    content: '<h1>Save Money on Software</h1><p>Smart strategies to access premium tools affordably...</p>',
    excerpt: 'Learn smart strategies to access premium software tools without breaking the bank.',
    featuredImage: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
    author: 'Umar Faruk',
    category: 'Tips & Tricks',
    tags: ['Savings', 'Software', 'Budget', 'Tips'],
    status: 'published',
    createdAt: '2023-12-28',
    updatedAt: '2023-12-28'
  },
  {
    id: 'blog-008',
    title: 'Claude AI vs ChatGPT: Which AI Assistant is Right for You?',
    slug: 'claude-ai-vs-chatgpt-comparison',
    content: '<h1>Claude AI vs ChatGPT</h1><p>Compare the strengths and weaknesses of two leading AI assistants...</p>',
    excerpt: 'Comprehensive comparison between Claude AI and ChatGPT to help you choose the best AI assistant.',
    featuredImage: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800',
    author: 'Umar Faruk',
    category: 'AI Tools',
    tags: ['Claude', 'ChatGPT', 'AI', 'Comparison'],
    status: 'draft',
    createdAt: '2023-12-25',
    updatedAt: '2023-12-25'
  },
  {
    id: 'blog-009',
    title: 'Building a Freelance Business with AI Tools',
    slug: 'building-freelance-business-ai-tools',
    content: '<h1>Freelancing with AI</h1><p>How AI tools can help you scale your freelance business...</p>',
    excerpt: 'Discover how AI tools can help you build and scale a successful freelance business in the digital age.',
    featuredImage: 'https://images.unsplash.com/photo-1556761175-b4136c1f24ca?w=800',
    author: 'Umar Faruk',
    category: 'Business',
    tags: ['Freelancing', 'AI', 'Business', 'Growth'],
    status: 'draft',
    createdAt: '2023-12-22',
    updatedAt: '2023-12-22'
  },
  {
    id: 'blog-010',
    title: 'The Ultimate Guide to Notion for Productivity',
    slug: 'ultimate-guide-notion-productivity',
    content: '<h1>Notion Productivity Guide</h1><p>Master Notion to organize your entire life and work...</p>',
    excerpt: 'Master Notion with this ultimate guide to boost your productivity and organize your life effectively.',
    featuredImage: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800',
    author: 'Umar Faruk',
    category: 'Productivity',
    tags: ['Notion', 'Productivity', 'Organization', 'Tools'],
    status: 'published',
    createdAt: '2023-12-20',
    updatedAt: '2023-12-20'
  },
  {
    id: 'blog-011',
    title: 'How to Get Started with Adobe Creative Cloud',
    slug: 'get-started-adobe-creative-cloud',
    content: '<h1>Adobe Creative Cloud Guide</h1><p>Everything you need to know to start creating with Adobe...</p>',
    excerpt: 'A beginner-friendly guide to getting started with Adobe Creative Cloud and all its powerful apps.',
    featuredImage: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800',
    author: 'Umar Faruk',
    category: 'Creative Assets',
    tags: ['Adobe', 'Design', 'Tutorial', 'Creative'],
    status: 'published',
    createdAt: '2023-12-18',
    updatedAt: '2023-12-18'
  },
  {
    id: 'blog-012',
    title: 'Protecting Your Online Business: Essential Security Tools',
    slug: 'protecting-online-business-security-tools',
    content: '<h1>Business Security Tools</h1><p>Essential tools to keep your online business safe and secure...</p>',
    excerpt: 'Learn about essential security tools and practices to protect your online business from threats.',
    featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800',
    author: 'Umar Faruk',
    category: 'Security',
    tags: ['Security', 'Business', 'Protection', 'Tools'],
    status: 'published',
    createdAt: '2023-12-15',
    updatedAt: '2023-12-15'
  },
];

