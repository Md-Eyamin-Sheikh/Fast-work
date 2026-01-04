'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  PenSquare, 
  BookOpen, 
  PackagePlus,
  Package
} from 'lucide-react';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  label: string;
  icon: typeof LayoutDashboard;
  path: string;
}

// Admin navigation configuration
const adminNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { id: 'write-blog', label: 'Write', icon: PenSquare, path: '/admin/blogs/write' },
  { id: 'all-blogs', label: 'Blogs', icon: BookOpen, path: '/admin/blogs' },
  { id: 'add-product', label: 'Add', icon: PackagePlus, path: '/admin/products/add' },
  { id: 'all-products', label: 'Products', icon: Package, path: '/admin/products' },
];

export function AdminButtonNavbar() {
  const pathname = usePathname();

  // Only show in admin routes
  if (!pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-20 lg:hidden" />
      
      {/* Bottom Button Navigation - Admin Panel (Mobile & Tablet Only) */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-indigo-200/50 shadow-2xl"
        aria-label="Admin navigation"
      >
        {/* Gradient accent line at top - Admin theme (indigo-purple) */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600 opacity-90" />
        
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-2.5 sm:py-3">
          {/* Optimized 5-column grid for admin items */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.path || 
                              (item.path !== '/admin' && pathname.startsWith(item.path));
              const IconComponent = item.icon;
              
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className="relative flex flex-col items-center justify-center group"
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Enhanced Button Container - Admin Theme */}
                  <motion.div
                    className={`
                      relative flex flex-col items-center justify-center
                      w-full min-h-[64px] sm:min-h-[72px] md:min-h-[80px]
                      rounded-2xl sm:rounded-3xl transition-all duration-300
                      ${isActive 
                        ? 'bg-linear-to-br from-indigo-600 via-purple-600 to-indigo-700 shadow-xl shadow-indigo-500/40' 
                        : 'bg-indigo-50/80 hover:bg-indigo-100/90 active:bg-indigo-200/90 shadow-sm hover:shadow-md'
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
                            : 'text-indigo-700 group-hover:text-indigo-900'
                          }
                        `}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                    </div>
                    
                    {/* Label with better typography */}
                    <span 
                      className={`
                        mt-1.5 text-[11px] sm:text-xs font-medium transition-all duration-300
                        ${isActive 
                          ? 'text-white font-semibold tracking-wide' 
                          : 'text-indigo-700 group-hover:text-indigo-900'
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
