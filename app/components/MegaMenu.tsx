import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, ShoppingCart, User, Menu, X, Wallet, LogOut, Sparkles } from 'lucide-react';
import { categories } from '../data/products';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface MegaMenuProps {
  cartCount: number;
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export function MegaMenu({ cartCount, isAuthenticated, onLogout }: MegaMenuProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#4F46E5] via-[#3B82F6] to-[#7C3AED] text-white py-2.5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-xs md:text-sm font-medium"
          >
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            <span>Flash Sale: Get <span className="font-bold text-yellow-300">30% OFF</span> on Premium Bundles!</span>
          </motion.div>
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-blue-100">
            <Link href="/track-order" className="hover:text-white transition-colors">Track Order</Link>
            <Link href="/help" className="hover:text-white transition-colors">Help Center</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 bg-white rounded-full flex items-center justify-center p-1.5 border border-indigo-100 shadow-sm group-hover:shadow-md transition-all duration-300">
                 <img src="/logo.png" alt="Victorians Academy" className="w-full h-full object-contain" />
              </div>
              <div className="hidden md:block">
                <h1 className="font-bold text-xl text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors">Victorians Academy</h1>
                <p className="text-[10px] font-semibold text-blue-600 uppercase tracking-widest">Trusted Digital Agency</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {Object.entries(categories).map(([key, category]) => (
                <div
                  key={key}
                  className="relative group"
                  onMouseEnter={() => setHoveredCategory(key)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button className="flex items-center gap-1.5 py-2 text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                    {category.name}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${hoveredCategory === key ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {hoveredCategory === key && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-72"
                      >
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black/5">
                          <div className="p-1">
                            <h3 className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50/50">
                              Top {category.name}
                            </h3>
                            <div className="py-2">
                              {category.items.map((item) => (
                                <Link
                                  key={item}
                                  href={`/products?category=${key}&subcategory=${item.toLowerCase().replace(' ', '-')}`}
                                  onClick={() => setHoveredCategory(null)}
                                  className="block w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center justify-between group/item"
                                >
                                  {item}
                                  <ChevronDown className="-rotate-90 w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity text-blue-400" />
                                </Link>
                              ))}
                            </div>
                            <div className="p-2 border-t border-gray-50">
                               <Link
                                 href={`/products?category=${key}`}
                                 onClick={() => setHoveredCategory(null)}
                                 className="flex items-center justify-center gap-2 w-full py-2 text-xs font-bold text-blue-600 bg-blue-50/50 hover:bg-blue-50 rounded-lg transition-colors"
                               >
                                 View All
                                 <ChevronDown className="-rotate-90 w-3 h-3" />
                               </Link>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
              <Link
                href="/bundles"
                className={`text-sm font-semibold transition-colors px-4 py-2 rounded-full ${
                  pathname === '/bundles' 
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-200' 
                    : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                }`}
              >
                Bundle Offers 🔥
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2.5 rounded-full transition-all ${searchOpen ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-sm"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Wallet - Desktop */}
              <Link
                href="/dashboard"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full border border-emerald-100 hover:shadow-sm transition-all"
              >
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-bold">৳2,500</span>
              </Link>

              {/* User */}
              <Link
                href="/dashboard"
                className="p-1 rounded-full border border-gray-200 hover:border-blue-300 transition-all ml-1"
              >
                 <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <User className="w-5 h-5" />
                 </div>
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Search Bar Expand */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pb-6">
                  <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="search"
                      placeholder="Search for AI tools, software, subscriptions..."
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl transition-all outline-none text-gray-900 placeholder-gray-500 font-medium shadow-inner"
                      autoFocus
                    />
                    <button 
                        type="button"
                        onClick={() => setSearchOpen(false)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-gray-200 rounded-full hover:bg-gray-300 text-gray-600 text-xs"
                    >
                        ESC
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-y-auto max-h-[calc(100vh-80px)]"
            >
              <div className="px-4 py-6 space-y-6">
                {/* Mobile Wallet */}
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-800 font-medium flex items-center gap-2">
                        <Wallet className="w-5 h-5" /> Wallet Balance
                    </span>
                    <span className="text-2xl font-bold text-emerald-700">৳2,500</span>
                  </div>
                  <button className="w-full py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700">
                    Add Funds
                  </button>
                </div>

                <nav className="space-y-6">
                  {Object.entries(categories).map(([key, category]) => (
                    <div key={key}>
                      <h3 className="font-bold text-gray-900 text-lg mb-3 flex items-center gap-2">
                        {category.name}
                        <div className="h-px bg-gray-100 flex-1" />
                      </h3>
                      <ul className="space-y-2 pl-2 border-l-2 border-gray-100 ml-1">
                        {category.items.map((item) => (
                          <li key={item}>
                            <Link
                              href={`/products?category=${key}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-2 px-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium text-sm"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <Link
                    href="/bundles"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block p-4 bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-100 rounded-xl"
                  >
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">Bundle Offers</span>
                        <span className="text-xl">🔥</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Save up to 60% on premium packs</p>
                  </Link>
                </nav>

                <div className="pt-6 border-t border-gray-100">
                    <button className="w-full py-3 border-2 border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                        Log Out
                    </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
