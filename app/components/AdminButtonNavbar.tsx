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

  // Only show in admin routes, exclude login
  if (!pathname?.startsWith('/admin') || pathname === '/admin/login') {
    return null;
  }

  return (
    <>
      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-20 lg:hidden" />
      
      {/* Bottom Button Navigation - Admin Panel (Mobile & Tablet Only) */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-xl border-t border-gray-200 shadow-2xl"
        aria-label="Admin navigation"
      >
        {/* Professional gradient accent line - Primary blue-indigo */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-600 via-indigo-600 to-blue-600" />
        
        <div className="max-w-[1600px] mx-auto px-2 sm:px-4 py-2.5 sm:py-3">
          {/* Optimized 5-column grid for admin items */}
          <div className="grid grid-cols-5 gap-1.5 sm:gap-2.5">
            {adminNavItems.map((item) => {
              // Exact match or subpath match, but prioritize exactness
              const isExactMatch = pathname === item.path;
              const isSubPath = item.path !== '/admin' && pathname?.startsWith(item.path);
              
              // Prevent "Blogs" (/admin/blogs) from being active when "Write" (/admin/blogs/write) is active
              const isActive = isExactMatch || (
                isSubPath && !adminNavItems.some(
                  other => other !== item && other.path.length > item.path.length && pathname?.startsWith(other.path)
                )
              );
              const IconComponent = item.icon;
              
              return (
                <Link
                  key={item.id}
                  href={item.path}
                  className="relative flex flex-col items-center justify-center group"
                  aria-label={item.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Professional Button Container - Primary Theme */}
                  <motion.div
                    className={`
                      relative flex flex-col items-center justify-center
                      w-full min-h-[64px] sm:min-h-[72px] md:min-h-[80px]
                      rounded-2xl sm:rounded-3xl transition-all duration-300
                      ${isActive 
                        ? 'bg-linear-to-br from-blue-600 via-indigo-600 to-blue-700 shadow-xl shadow-blue-500/50' 
                        : 'bg-gray-50 hover:bg-blue-50 active:bg-blue-100 shadow-sm hover:shadow-md border border-gray-200 hover:border-blue-200'
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
                            : 'text-gray-700 group-hover:text-blue-600'
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
                          : 'text-gray-700 group-hover:text-blue-600'
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
