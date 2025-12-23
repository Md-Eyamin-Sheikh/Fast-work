import React, { useState } from 'react';
import { ChevronDown, Search, ShoppingCart, User, Menu, X, Wallet, LogOut } from 'lucide-react';
import { categories } from '../data/products';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you'd capture the input value and redirect
    // const query = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
    // router.push(`/products?search=${query}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      {/* Top Bar */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <p className="text-sm">🎉 Flash Sale: Up to 30% OFF on Selected Items | Limited Time Only!</p>
          <div className="hidden md:flex items-center gap-4 text-sm">
            <button className="hover:underline">Track Order</button>
            <button className="hover:underline">Help</button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden border border-gray-100">
               <img src="/logo.png" alt="Victorians Academy" className="w-full h-full object-contain" />
            </div>
            <div className="hidden md:block">
              <h1 className="font-bold text-xl text-gray-900">Victorians Academy</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">Trusted Agency</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {Object.entries(categories).map(([key, category]) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => setHoveredCategory(key)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <div className="flex items-center gap-1 py-2 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer">
                  {category.name}
                  <ChevronDown className="w-4 h-4" />
                </div>

                {/* Mega Menu Dropdown */}
                {hoveredCategory === key && (
                  <div className="absolute left-0 top-full pt-2 w-64">
                    <div className="bg-white rounded-lg shadow-2xl border p-4">
                      <h3 className="font-semibold text-sm text-gray-500 mb-3 uppercase">
                        {category.name}
                      </h3>
                      <ul className="space-y-2">
                        {category.items.map((item) => (
                          <li key={item}>
                            <Link
                              href={`/products?category=${key}&type=${item.toLowerCase().replace(' ', '-')}`}
                              onClick={() => setHoveredCategory(null)}
                              className="block w-full text-left px-3 py-2 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/products?category=${key}`}
                        onClick={() => setHoveredCategory(null)}
                        className="mt-3 block text-sm text-blue-600 hover:underline font-medium"
                      >
                        View All →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/bundles"
              className={`py-2 transition-colors ${
                pathname === '/bundles' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Bundle Offers 🔥
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Wallet - Desktop */}
            <Link
              href="/dashboard"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
            >
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-medium">৳2,500</span>
            </Link>

            {/* User */}
            <Link
              href="/dashboard"
              className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${
                pathname === '/dashboard' ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="search"
                placeholder="Search for AI tools, software, subscriptions..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
            {/* Wallet - Mobile */}
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-between px-4 py-3 bg-green-50 text-green-700 rounded-lg"
            >
              <span className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                <span className="font-medium">Wallet Balance</span>
              </span>
              <span className="font-bold">৳2,500</span>
            </Link>

            {Object.entries(categories).map(([key, category]) => (
              <div key={key}>
                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <ul className="space-y-1 ml-4">
                  {category.items.map((item) => (
                    <li key={item}>
                      <Link
                        href={`/products?category=${key}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
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
              className="block w-full text-left px-3 py-2 font-medium text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              Bundle Offers 🔥
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
