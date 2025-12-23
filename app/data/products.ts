export type ProductType = 'account' | 'subscription' | 'license-key' | 'download';
export type DeliveryType = 'auto' | 'manual';
export type BadgeType = 'Shared' | 'Personal' | 'Key Code' | 'Email Invite';

export interface SystemRequirement {
  os: string;
  ram: string;
  storage: string;
  processor?: string;
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
  description: string;
  features: string[];
  duration: string;
  warranty: string;
  systemRequirements?: SystemRequirement;
  installationGuide?: string[];
  stock: number;
  rating: number;
  reviews: number;
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
    items: ['ChatGPT', 'Claude', 'Midjourney', 'Jasper']
  },
  'creative-cloud': {
    name: 'Creative Cloud',
    items: ['Adobe Full Master Collection', 'Photoshop', 'Illustrator', 'Premiere Pro']
  },
  'productivity': {
    name: 'Productivity & Office',
    items: ['Microsoft 365', 'Windows 10/11 Keys', 'Google One Storage']
  },
  'dev-tools': {
    name: 'Dev Tools',
    items: ['GitHub Copilot', 'JetBrains All Products']
  },
  'security': {
    name: 'Security',
    items: ['NordVPN', 'Kaspersky', 'ExpressVPN']
  }
};

export const products: Product[] = [
  // AI Tools
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    category: 'ai-tools',
    price: 1200,
    originalPrice: 1500,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&q=80',
    badge: 'Shared',
    productType: 'account',
    deliveryType: 'auto',
    description: 'Access to GPT-4, faster response times, and priority access to new features.',
    features: [
      'Access to GPT-4 and GPT-4o',
      'Faster response times',
      'Priority access during peak times',
      'Access to advanced data analysis',
      'Browse, create, and use GPTs'
    ],
    duration: '30 Days',
    warranty: '30 Days Replacement Warranty',
    stock: 25,
    rating: 4.8,
    reviews: 342,
    installationGuide: [
      'You will receive email and password',
      'Go to chat.openai.com',
      'Click "Log In"',
      'Enter the provided credentials',
      'Start using ChatGPT Plus immediately'
    ]
  },
  {
    id: 'claude-pro',
    name: 'Claude Pro',
    category: 'ai-tools',
    price: 1100,
    image: 'https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=500&q=80',
    badge: 'Personal',
    productType: 'account',
    deliveryType: 'auto',
    description: 'Anthropic\'s advanced AI assistant with extended context and priority access.',
    features: [
      '5x more usage than free tier',
      'Priority access during high traffic',
      'Early access to new features',
      '100K token context window'
    ],
    duration: '30 Days',
    warranty: '30 Days Replacement Warranty',
    stock: 15,
    rating: 4.7,
    reviews: 198,
    installationGuide: [
      'Receive your login credentials via email',
      'Visit claude.ai',
      'Sign in with provided email and password',
      'Verify your session',
      'Enjoy Claude Pro features'
    ]
  },
  {
    id: 'midjourney',
    name: 'Midjourney Standard',
    category: 'ai-tools',
    price: 1800,
    originalPrice: 2200,
    image: 'https://images.unsplash.com/photo-1686191128892-c21c67423145?w=500&q=80',
    badge: 'Personal',
    productType: 'account',
    deliveryType: 'manual',
    description: 'AI image generation tool for creating stunning artwork and designs.',
    features: [
      '15 hrs Fast GPU time per month',
      'Unlimited Relaxed generations',
      'General commercial terms',
      'Access to member gallery',
      'Optional credit top ups'
    ],
    duration: '30 Days',
    warranty: '30 Days Warranty',
    stock: 8,
    rating: 4.9,
    reviews: 521,
    installationGuide: [
      'Join Discord if you haven\'t already',
      'We will send you server invite',
      'Access Midjourney bot',
      'Use /imagine command to create images',
      'Download your creations'
    ]
  },
  
  // Creative Cloud
  {
    id: 'adobe-master',
    name: 'Adobe Creative Cloud All Apps',
    category: 'creative-cloud',
    price: 800,
    originalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80',
    badge: 'Email Invite',
    productType: 'subscription',
    deliveryType: 'manual',
    description: 'Complete Adobe Creative Cloud suite with 20+ apps including Photoshop, Illustrator, Premiere Pro, and more.',
    features: [
      'Access to 20+ Creative Cloud apps',
      'Photoshop, Illustrator, Premiere Pro, After Effects',
      '100GB cloud storage',
      'Adobe Fonts',
      'Adobe Portfolio',
      'Regular updates'
    ],
    duration: '1 Year',
    warranty: '1 Year Replacement Warranty',
    systemRequirements: {
      os: 'Windows 10/11 or macOS 10.15+',
      ram: '8GB minimum, 16GB recommended',
      storage: '10GB available space',
      processor: 'Intel or AMD processor with 64-bit support'
    },
    stock: 12,
    rating: 4.9,
    reviews: 876,
    installationGuide: [
      'Provide your Adobe email on checkout',
      'You will receive team invitation within 30 minutes',
      'Accept invitation in your email',
      'Download Creative Cloud Desktop app',
      'Sign in and install apps you need'
    ]
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'creative-cloud',
    price: 450,
    originalPrice: 600,
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=500&q=80',
    badge: 'Email Invite',
    productType: 'subscription',
    deliveryType: 'manual',
    description: 'Industry-leading image editing and design software.',
    features: [
      'Advanced photo editing',
      'AI-powered features',
      'Cloud storage',
      'Mobile app access',
      'Adobe Fonts'
    ],
    duration: '1 Year',
    warranty: '1 Year Warranty',
    systemRequirements: {
      os: 'Windows 10/11 or macOS 10.15+',
      ram: '8GB minimum, 16GB recommended',
      storage: '4GB available space'
    },
    stock: 20,
    rating: 4.8,
    reviews: 1243,
    installationGuide: [
      'Enter your Adobe email during checkout',
      'Wait for team invitation (within 30 mins)',
      'Accept the invitation',
      'Download and install Photoshop',
      'Start creating'
    ]
  },
  {
    id: 'premiere-pro',
    name: 'Adobe Premiere Pro',
    category: 'creative-cloud',
    price: 450,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&q=80',
    badge: 'Email Invite',
    productType: 'subscription',
    deliveryType: 'manual',
    description: 'Professional video editing software for filmmakers and content creators.',
    features: [
      'Professional video editing',
      'Multi-cam editing',
      'VR support',
      'Auto Reframe',
      'Color grading tools'
    ],
    duration: '1 Year',
    warranty: '1 Year Warranty',
    systemRequirements: {
      os: 'Windows 10/11 or macOS 10.15+',
      ram: '16GB minimum, 32GB recommended',
      storage: '8GB available space',
      processor: 'Intel 6th Gen or newer'
    },
    stock: 15,
    rating: 4.7,
    reviews: 654,
    installationGuide: [
      'Provide Adobe email at checkout',
      'Receive invitation email',
      'Accept team invitation',
      'Install via Creative Cloud app',
      'Launch and start editing'
    ]
  },
  
  // Productivity & Office
  {
    id: 'microsoft-365',
    name: 'Microsoft 365 Family',
    category: 'productivity',
    price: 650,
    originalPrice: 850,
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=500&q=80',
    badge: 'Email Invite',
    productType: 'subscription',
    deliveryType: 'manual',
    description: 'Complete Microsoft Office suite for up to 6 users with 1TB OneDrive storage each.',
    features: [
      'Word, Excel, PowerPoint, Outlook',
      'Up to 6 users',
      '1TB OneDrive per user',
      'Advanced security',
      'Premium templates',
      'Works on PC, Mac, tablet, phone'
    ],
    duration: '1 Year',
    warranty: '1 Year Replacement Warranty',
    systemRequirements: {
      os: 'Windows 10/11 or macOS',
      ram: '4GB minimum',
      storage: '4GB available space'
    },
    stock: 30,
    rating: 4.8,
    reviews: 982,
    installationGuide: [
      'Provide your Microsoft email',
      'Accept family invitation',
      'Go to office.com',
      'Download and install Office apps',
      'Sign in to activate'
    ]
  },
  {
    id: 'windows-11-pro',
    name: 'Windows 11 Pro License Key',
    category: 'productivity',
    price: 350,
    originalPrice: 500,
    image: 'https://images.unsplash.com/photo-1629654291663-b91ad427698f?w=500&q=80',
    badge: 'Key Code',
    productType: 'license-key',
    deliveryType: 'auto',
    description: 'Genuine Windows 11 Pro activation key for lifetime use.',
    features: [
      'Lifetime activation',
      'Genuine Microsoft key',
      'BitLocker encryption',
      'Remote desktop',
      'Hyper-V virtualization',
      'Windows Update support'
    ],
    duration: 'Lifetime',
    warranty: 'Lifetime Warranty',
    systemRequirements: {
      os: 'Compatible with Windows 11',
      ram: '4GB minimum',
      storage: '64GB available space',
      processor: '1GHz 64-bit processor'
    },
    stock: 50,
    rating: 4.9,
    reviews: 1532,
    installationGuide: [
      'Go to Settings > Update & Security > Activation',
      'Click "Change product key"',
      'Enter the 25-character key provided',
      'Click "Next" and wait for activation',
      'Restart your computer'
    ]
  },
  {
    id: 'google-one-2tb',
    name: 'Google One 2TB Storage',
    category: 'productivity',
    price: 500,
    image: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=500&q=80',
    badge: 'Email Invite',
    productType: 'subscription',
    deliveryType: 'manual',
    description: 'Expand your Google storage across Drive, Gmail, and Photos.',
    features: [
      '2TB cloud storage',
      'Share with up to 5 family members',
      'Google experts support',
      'Extra member benefits',
      'VPN for multiple devices'
    ],
    duration: '1 Year',
    warranty: '1 Year Warranty',
    stock: 18,
    rating: 4.7,
    reviews: 445,
    installationGuide: [
      'Provide your Gmail address',
      'Accept family group invitation',
      'Open Google One app or web',
      'Confirm storage upgrade',
      'Start using 2TB storage'
    ]
  },
  
  // Dev Tools
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'dev-tools',
    price: 550,
    originalPrice: 700,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=500&q=80',
    badge: 'Personal',
    productType: 'account',
    deliveryType: 'auto',
    description: 'AI pair programmer that helps you write code faster with autocomplete suggestions.',
    features: [
      'AI-powered code completion',
      'Multiple language support',
      'IDE integration',
      'Context-aware suggestions',
      'Code explanation'
    ],
    duration: '30 Days',
    warranty: '30 Days Warranty',
    stock: 22,
    rating: 4.8,
    reviews: 567,
    installationGuide: [
      'Install GitHub Copilot extension in your IDE',
      'Sign in with provided GitHub account',
      'Authorize Copilot access',
      'Start coding with AI assistance',
      'Use Tab to accept suggestions'
    ]
  },
  {
    id: 'jetbrains-all',
    name: 'JetBrains All Products Pack',
    category: 'dev-tools',
    price: 1200,
    originalPrice: 1600,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=500&q=80',
    badge: 'Email Invite',
    productType: 'subscription',
    deliveryType: 'manual',
    description: 'Access to all JetBrains IDEs including IntelliJ IDEA, PyCharm, WebStorm, and more.',
    features: [
      'All JetBrains IDEs',
      'IntelliJ IDEA Ultimate',
      'PyCharm Professional',
      'WebStorm, PhpStorm',
      'Rider, CLion, GoLand',
      'Regular updates'
    ],
    duration: '1 Year',
    warranty: '1 Year Warranty',
    systemRequirements: {
      os: 'Windows, macOS, or Linux',
      ram: '8GB minimum, 16GB recommended',
      storage: '5GB available space'
    },
    stock: 10,
    rating: 4.9,
    reviews: 789,
    installationGuide: [
      'Provide your JetBrains account email',
      'Accept license invitation',
      'Download JetBrains Toolbox',
      'Sign in to activate',
      'Install IDEs you need'
    ]
  },
  
  // Security
  {
    id: 'nordvpn',
    name: 'NordVPN Premium',
    category: 'security',
    price: 400,
    originalPrice: 550,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=80',
    badge: 'Shared',
    productType: 'account',
    deliveryType: 'auto',
    description: 'Fast, secure VPN with 5500+ servers in 60 countries.',
    features: [
      '5500+ servers worldwide',
      'Up to 6 devices',
      'No logs policy',
      'Kill switch',
      'Threat Protection',
      '24/7 support'
    ],
    duration: '1 Year',
    warranty: '1 Year Replacement Warranty',
    stock: 35,
    rating: 4.7,
    reviews: 1876,
    installationGuide: [
      'Download NordVPN app',
      'Sign in with provided credentials',
      'Choose a server location',
      'Click Quick Connect',
      'Browse securely'
    ]
  },
  {
    id: 'kaspersky-total',
    name: 'Kaspersky Total Security',
    category: 'security',
    price: 300,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&q=80',
    badge: 'Key Code',
    productType: 'license-key',
    deliveryType: 'auto',
    description: 'Complete protection for your devices with antivirus, VPN, and password manager.',
    features: [
      'Antivirus & Anti-malware',
      'Firewall protection',
      'VPN included',
      'Password manager',
      'Parental controls',
      'Up to 5 devices'
    ],
    duration: '1 Year',
    warranty: '1 Year Warranty',
    systemRequirements: {
      os: 'Windows 10/11, macOS, Android, iOS',
      ram: '2GB minimum',
      storage: '1.5GB available space'
    },
    stock: 40,
    rating: 4.8,
    reviews: 1234,
    installationGuide: [
      'Download Kaspersky from official website',
      'Install the application',
      'Click "Activate" or "Enter activation code"',
      'Enter the provided license key',
      'Complete setup and run first scan'
    ]
  },
  {
    id: 'expressvpn',
    name: 'ExpressVPN Premium',
    category: 'security',
    price: 450,
    originalPrice: 600,
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=500&q=80',
    badge: 'Personal',
    productType: 'account',
    deliveryType: 'auto',
    description: 'Lightning-fast VPN with best-in-class encryption and privacy.',
    features: [
      'Ultra-fast speeds',
      '3000+ servers in 94 countries',
      'Up to 5 devices',
      'Split tunneling',
      '256-bit encryption',
      '24/7 live chat support'
    ],
    duration: '1 Year',
    warranty: '1 Year Warranty',
    stock: 25,
    rating: 4.9,
    reviews: 2341,
    installationGuide: [
      'Download ExpressVPN app',
      'Log in with credentials provided',
      'Select server location',
      'Press the power button to connect',
      'Enjoy secure browsing'
    ]
  }
];

export const bundles: Bundle[] = [
  {
    id: 'designer-bundle',
    name: 'Designer\'s Ultimate Bundle',
    products: ['photoshop', 'premiere-pro', 'midjourney'],
    discount: 20,
    price: 2160,
    originalPrice: 2700,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80'
  },
  {
    id: 'developer-bundle',
    name: 'Developer\'s Power Pack',
    products: ['github-copilot', 'chatgpt-plus', 'jetbrains-all'],
    discount: 15,
    price: 2550,
    originalPrice: 3000,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80'
  },
  {
    id: 'security-bundle',
    name: 'Complete Security Suite',
    products: ['nordvpn', 'kaspersky-total', 'expressvpn'],
    discount: 25,
    price: 900,
    originalPrice: 1200,
    image: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=500&q=80'
  }
];
