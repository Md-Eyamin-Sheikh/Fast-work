// Bottom Navigation Component - Adapted for Next.js with your project's primary colors

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, Plus, Sparkles, User } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: typeof Home;
  path: string;
  highlight?: boolean;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'blog', label: 'Blog', icon: Calendar, path: '/blog' },
  { id: 'create', label: 'Create', icon: Plus, path: '/admin/blogs/write' },
  { id: 'ai-assistant', label: 'AI Help', icon: Sparkles, highlight: true, path: '/ai-assistant' },
  { id: 'profile', label: 'Profile', icon: User, path: '/profile' }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path || pathname.startsWith(item.path + '/');
          const IconComponent = item.icon;
          
          return (
            <Link
              key={item.id}
              href={item.path}
              className={`relative flex flex-col items-center justify-center py-2 px-3 min-h-[64px] transition-all duration-300 ${
                item.highlight && !isActive
                  ? 'text-blue-600'  // Primary color for highlight
                  : isActive 
                  ? 'text-blue-600'  // Primary color when active
                  : 'text-gray-600 hover:text-gray-900'
              } ${isActive ? 'scale-110' : 'scale-100'}`}
              aria-label={item.label}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full" />
              )}
              
              {/* AI Badge/Glow effect */}
              {item.highlight && !isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-blue-100/50 to-transparent rounded-xl" />
              )}
              
              <div className={`relative ${isActive && item.highlight ? 'animate-pulse' : ''}`}>
                <IconComponent 
                  className={`w-6 h-6 mb-1 transition-transform ${isActive ? 'scale-110' : ''}`}
                  fill={isActive ? 'currentColor' : 'none'}
                />
                {item.highlight && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                )}
              </div>
              <span className={`text-xs font-medium ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
