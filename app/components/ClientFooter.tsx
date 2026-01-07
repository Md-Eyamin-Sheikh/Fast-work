'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';

export function ClientFooter() {
  const pathname = usePathname();
  // Hide footer on specific routes
  const hideFooter = pathname === '/register' || pathname === '/admin/login';

  if (hideFooter) return null;

  return <Footer />;
}
