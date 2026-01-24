
"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, Search, ShoppingCart, User, Menu, X, Wallet, LogOut, Sparkles, ShoppingBag } from 'lucide-react';
import { categories } from '../data/products';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface MegaMenuProps {
  cartCount?: number;
  // Deprecated: Auth is now handled via AuthContext, keeping for backward compat temporarily
  isAuthenticated?: boolean; 
  onLogout?: () => void;
}

export function MegaMenu({ cartCount }: MegaMenuProps) {
  const { user, signOut } = useAuth();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Use context state
  const isAuthenticated = !!user;

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

  const handleLogout = async () => {
    await signOut();
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Main Header */}
      <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24"> {/* Reduced mobile height */}
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 md:gap-4 group">
              <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center  border border-blue-100 shadow-sm group-hover:shadow-md transition-all duration-300 shrink-0">
                 <img src="https://i.postimg.cc/d19GKJPt/logo-removebg-preview-(1).png" alt="Victorians Academy" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <h1 className="font-bold text-lg md:text-2xl text-gray-900 tracking-tight group-hover:text-blue-600 transition-colors leading-tight">
                  <span className="md:hidden">Victorians</span>
                  <span className="hidden md:inline">Victorians Academy</span>
                </h1>
                <p className="text-[10px] md:text-xs font-semibold text-blue-600 uppercase tracking-wider md:tracking-widest leading-tight">
                  Trusted Digital Agency
                </p>
              </div>
            </Link>


            {/* Desktop Navigation - Simple Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link href="/" className={`text-sm font-semibold transition-colors px-4 py-2 rounded-full ${pathname === '/' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}>
                Home
              </Link>
              <Link href="/products" className={`text-sm font-semibold transition-colors px-4 py-2 rounded-full ${pathname === '/products' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}>
                Product
              </Link>
              <Link href="/about" className={`text-sm font-semibold transition-colors px-4 py-2 rounded-full ${pathname === '/about' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}>
                About Us
              </Link>
              <Link href="/contact" className={`text-sm font-semibold transition-colors px-4 py-2 rounded-full ${pathname === '/contact' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}>
                Contact
              </Link>
              <Link href="/blog" className={`text-sm font-semibold transition-colors px-4 py-2 rounded-full ${pathname === '/blog' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'}`}>
                Blog
              </Link>
            </nav>


            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 md:p-2.5 rounded-full transition-all ${searchOpen ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-600'}`}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 md:p-2.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:text-blue-600 transition-colors" />
                <AnimatePresence>
                  {cartCount !== undefined && cartCount > 0 && (
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

              {/* Wallet - Desktop & Tablet */}
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-full border border-emerald-100 hover:shadow-sm transition-all"
              >
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-bold">৳00</span>
              </Link>

              {/* User Profile Dropdown */}
              <div className="relative group ml-1 z-50">
                <button className="flex items-center gap-2 p-1 rounded-full border border-gray-200 hover:border-blue-300 transition-all focus:outline-none">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-colors overflow-hidden">
                    {isAuthenticated && user?.photoURL ? (
                       <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                    ) : (
                       <User className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full pt-4 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-black/5">
                    
                    {isAuthenticated ? (
                      // Authenticated View
                      <>
                        <div className="p-4 bg-linear-to-br from-blue-50 to-indigo-50 border-b border-gray-100">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full border-2 border-white shadow-sm overflow-hidden bg-gray-200 flex items-center justify-center">
                              {user?.photoURL ? (
                                <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-lg font-bold text-gray-500">{user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}</span>
                              )}
                            </div>
                            <div className="overflow-hidden">
                              <h4 className="font-bold text-gray-900 text-sm truncate">{user?.displayName || "User"}</h4>
                              <p className="text-xs text-gray-500 font-medium truncate">{user?.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-2">
{user?.email === 'admin123@gmail.com' && (
                          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                <Menu className="w-4 h-4" />
                            </div>
                            Dashboard
                          </Link>
                          )}
                          {/* <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                             <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                                <User className="w-4 h-4" />
                            </div>
                            My Profile
                          </Link> */}
                          {/* <Link href="/orders" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors">
                             <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                                <ShoppingBag className="w-4 h-4" />
                            </div>
                            My Orders
                          </Link> */}
                        </div>

                        <div className="p-2 border-t border-gray-50">
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          >
                             <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                                <LogOut className="w-4 h-4" />
                            </div>
                            Log Out
                          </button>
                        </div>
                      </>
                    ) : (
                      // Guest View
                      <div className="p-4 space-y-3">
                        <div className="text-center mb-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600">
                            <User className="w-6 h-6" />
                          </div>
                          <h4 className="font-bold text-gray-900">Welcome!</h4>
                          <p className="text-xs text-gray-500 mt-1">Sign in to manage your account</p>
                        </div>
                        <Link 
                          href="/admin/login" 
                          className="flex items-center justify-center w-full py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
                        >
                          Log In
                        </Link>
                        <Link 
                          href="/register" 
                          className="flex items-center justify-center w-full py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
                        >
                          Create Account
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>

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
                {/* Mobile Wallet - Authenticated Only */}
                {isAuthenticated && (
                  <div className="p-4 bg-linear-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100">
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
                )}

                <nav className="space-y-2">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${pathname === '/' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    Home
                    <ChevronDown className="-rotate-90 w-4 h-4" />
                  </Link>
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${pathname === '/products' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    Product
                    <ChevronDown className="-rotate-90 w-4 h-4" />
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${pathname === '/about' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    About Us
                    <ChevronDown className="-rotate-90 w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${pathname === '/contact' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    Contact
                    <ChevronDown className="-rotate-90 w-4 h-4" />
                  </Link>
                  <Link
                    href="/blog"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${pathname === '/blog' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-gray-50 text-gray-700'}`}
                  >
                    Blog
                    <ChevronDown className="-rotate-90 w-4 h-4" />
                  </Link>
                </nav>

                <div className="pt-6 border-t border-gray-100">
                    {isAuthenticated ? (
                       <button 
                         onClick={handleLogout}
                         className="w-full flex items-center justify-center gap-2 py-3 border-2 border-red-100 text-red-600 rounded-xl font-bold hover:bg-red-50 transition-colors"
                       >
                         <LogOut className="w-5 h-5" />
                         Log Out
                       </button>
                    ) : (
                      <div className="space-y-3">
                        <Link 
                           href="/admin/login"
                           onClick={() => setMobileMenuOpen(false)}
                           className="w-full flex items-center justify-center py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                        >
                           Log In
                        </Link>
                        <Link 
                           href="/register"
                           onClick={() => setMobileMenuOpen(false)}
                           className="w-full flex items-center justify-center py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                        >
                           Create Account
                        </Link>
                      </div>
                    )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
