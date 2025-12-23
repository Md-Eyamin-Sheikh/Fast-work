export interface PurchasedProduct {
  orderId: string;
  productId: string;
  productName: string;
  purchaseDate: string;
  expiryDate: string;
  credentials?: {
    email?: string;
    password?: string;
  };
  licenseKey?: string;
  downloadLink?: string;
  status: 'active' | 'expired' | 'processing';
  replacementHistory: {
    date: string;
    reason: string;
  }[];
}

export interface SupportTicket {
  id: string;
  orderId: string;
  productName: string;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  responses: {
    from: 'user' | 'support';
    message: string;
    timestamp: string;
  }[];
}

export interface UserData {
  name: string;
  email: string;
  walletBalance: number;
  purchasedProducts: PurchasedProduct[];
  tickets: SupportTicket[];
}

export const mockUser: UserData = {
  name: 'Rafiqul Islam',
  email: 'rafiq@example.com',
  walletBalance: 2500,
  purchasedProducts: [
    {
      orderId: 'ORD-2024-001',
      productId: 'chatgpt-plus',
      productName: 'ChatGPT Plus',
      purchaseDate: '2024-11-20',
      expiryDate: '2024-12-20',
      credentials: {
        email: 'user_chatgpt_001@tempmail.com',
        password: 'SecurePass@2024'
      },
      status: 'active',
      replacementHistory: []
    },
    {
      orderId: 'ORD-2024-002',
      productId: 'adobe-master',
      productName: 'Adobe Creative Cloud All Apps',
      purchaseDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'active',
      replacementHistory: [
        {
          date: '2024-06-10',
          reason: 'Invitation expired, new invite sent'
        }
      ]
    },
    {
      orderId: 'ORD-2024-003',
      productId: 'windows-11-pro',
      productName: 'Windows 11 Pro License Key',
      purchaseDate: '2024-02-10',
      expiryDate: 'Lifetime',
      licenseKey: 'VK7JG-NPHTM-C97JM-9MPGT-3V66T',
      status: 'active',
      replacementHistory: []
    },
    {
      orderId: 'ORD-2024-004',
      productId: 'nordvpn',
      productName: 'NordVPN Premium',
      purchaseDate: '2023-12-01',
      expiryDate: '2024-12-01',
      credentials: {
        email: 'nord_user_554@tempmail.com',
        password: 'VPN@Secure2023'
      },
      status: 'expired',
      replacementHistory: []
    }
  ],
  tickets: [
    {
      id: 'TKT-001',
      orderId: 'ORD-2024-001',
      productName: 'ChatGPT Plus',
      subject: 'Account not working',
      message: 'The ChatGPT account credentials are not working. Getting "incorrect password" error.',
      status: 'resolved',
      createdAt: '2024-11-22',
      responses: [
        {
          from: 'user',
          message: 'The ChatGPT account credentials are not working. Getting "incorrect password" error.',
          timestamp: '2024-11-22 10:30 AM'
        },
        {
          from: 'support',
          message: 'We apologize for the inconvenience. We are checking the account and will provide a replacement shortly.',
          timestamp: '2024-11-22 11:15 AM'
        },
        {
          from: 'support',
          message: 'Your account has been replaced with new credentials. Please check your dashboard.',
          timestamp: '2024-11-22 12:00 PM'
        }
      ]
    }
  ]
};
