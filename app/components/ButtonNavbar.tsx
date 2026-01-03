'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Package, 
  BookOpen, 
  ShoppingCart, 
  User 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  icon: typeof Home;
  path: string;
  badge?: number;
}

// Navigation configuration - easily customizable
const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'products', label: 'Products', icon: Package, path: '/products' },
  { id: 'blog', label: 'Blog', icon: BookOpen, path: '/blog' },
  { id: 'cart', label: 'Cart', icon: ShoppingCart, path: '/cart', badge: 0 }, // Badge can be dynamic
  { id: 'profile', label: 'Profile', icon: User, path: '/dashboard' },
];

export function ButtonNavbar() {
  const pathname = usePathname();

  return (
    <>
      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-20 lg:hidden" />
      
      {/* Bottom Button Navigation - Mobile & Tablet Only */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl"
        aria-label="Mobile navigation"
      >
        {/* Gradient accent line at top with shimmer effect */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 via-indigo-600 to-blue-600 opacity-90" />
        
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2.5 sm:py-3">
          {/* Optimized 5-column grid for perfect spacing */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
            {navItems.map((item) => {
              const isActive = pathname === item.path || 
                              (item.path !== '/' && pathname.startsWith(item.path));
              const IconComponent = item.icon;
              
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className="relative flex flex-col items-center justify-center group"
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Enhanced Button Container */}
                  <motion.div
                    className={`
                      relative flex flex-col items-center justify-center
                      w-full min-h-[64px] sm:min-h-[72px] md:min-h-[80px]
                      rounded-2xl sm:rounded-3xl transition-all duration-300
                      ${isActive 
                        ? 'bg-linear-to-br from-blue-600 via-blue-600 to-indigo-600 shadow-xl shadow-blue-500/40' 
                        : 'bg-gray-50/80 hover:bg-gray-100/90 active:bg-gray-200/90 shadow-sm hover:shadow-md'
                      }
                    `}
                    whileTap={{ scale: 0.90 }}
                    whileHover={{ scale: isActive ? 1 : 1.03 }}
                    transition={{ type: "spring", stiffness: 450, damping: 20 }}
                  >
                    {/* Icon with enhanced sizing */}
                    <div className="relative">
                      <IconComponent 
                        className={`
                          w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8
                          transition-all duration-300
                          ${isActive 
                            ? 'text-white drop-shadow-lg' 
                            : 'text-gray-700 group-hover:text-gray-900'
                          }
                        `}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      
                      {/* Enhanced Notification Badge */}
                      {item.badge !== undefined && item.badge > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-2 -right-2 min-w-[20px] h-[20px] px-1.5 
                                     bg-linear-to-br from-red-500 to-red-600 
                                     rounded-full flex items-center justify-center
                                     shadow-lg shadow-red-500/60 ring-2 ring-white"
                        >
                          <span className="text-[11px] sm:text-xs font-bold text-white">
                            {item.badge > 99 ? '99+' : item.badge}
                          </span>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Label with better typography */}
                    <span 
                      className={`
                        mt-1.5 text-[11px] sm:text-xs font-medium transition-all duration-300
                        ${isActive 
                          ? 'text-white font-semibold tracking-wide' 
                          : 'text-gray-600 group-hover:text-gray-900'
                        }
                      `}
                    >
                      {item.label}
                    </span>
                    
                    {/* Enhanced active indicator glow */}
                    {isActive && (
                      <>
                        <motion.div
                          className="absolute inset-0 bg-linear-to-t from-white/20 to-transparent rounded-2xl sm:rounded-3xl pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                        {/* Subtle pulse effect on active button */}
                        <motion.div
                          className="absolute inset-0 bg-white/10 rounded-2xl sm:rounded-3xl pointer-events-none"
                          animate={{ 
                            opacity: [0.1, 0.2, 0.1],
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
        
        {/* Safe area for devices with bottom notch/home indicator */}
        <div className="h-safe-area-inset-bottom bg-white/95" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} />
      </nav>
    </>
  );
}
