import React from 'react';
import { ProductCard } from './ProductCard';
import { products, bundles, categories } from '../data/products';
import { Product } from '../data/products';
import { ArrowRight, Zap, Shield, Clock, Headphones, Star, CheckCircle, Gift, Users, Trophy, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HomePageProps {
  onAddToCart: (product: Product) => void;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function HomePage({ onAddToCart }: HomePageProps) {
  const featuredProducts = products.slice(0, 6);
  const flashSaleProducts = products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        
        <div className="max-w-7xl mx-auto px-4 pt-20 pb-24 md:pt-32 md:pb-32 relative">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              #1 Trusted Digital Marketplace in Bangladesh
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900 leading-tight">
              Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Digital Assets</span> <br />
              At Unbeatable Prices
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get instant access to ChatGPT, Adobe Creative Cloud, Microsoft 365, and premium VPNs. 100% Genuine & Official.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
              >
                Start Exploring
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/bundles"
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                View Bundles
                <Gift className="w-5 h-5 text-purple-600" />
              </Link>
            </motion.div>

            {/* Trusted By / Stats Preview */}
            <motion.div variants={fadeInUp} className="mt-16 pt-8 border-t border-gray-200/60 flex flex-wrap justify-center gap-8 md:gap-16 text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                 <CheckCircle className="w-5 h-5 text-green-500" />
                 <span>10,000+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-2">
                 <CheckCircle className="w-5 h-5 text-green-500" />
                 <span>Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                 <CheckCircle className="w-5 h-5 text-green-500" />
                 <span>24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">15K+</h3>
              <p className="text-gray-500 text-sm">Active Users</p>
            </div>
            <div className="text-center group p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">50K+</h3>
              <p className="text-gray-500 text-sm">Orders Completed</p>
            </div>
            <div className="text-center group p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">4.9/5</h3>
              <p className="text-gray-500 text-sm">Customer Rating</p>
            </div>
            <div className="text-center group p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">Top #1</h3>
              <p className="text-gray-500 text-sm">In Bangladesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid - Revised for visibility */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Shop by Category</h2>
              <p className="text-gray-600 text-lg">Explore our wide range of premium digital tools</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(categories).map(([key, category]) => (
              <Link
                key={key}
                href={`/products?category=${key}`}
                className="group relative overflow-hidden bg-white p-6 rounded-2xl border border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    {category.items.length} Items
                  </span>
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <ArrowRight className="w-4 h-4 text-blue-600 group-hover:text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      {flashSaleProducts.length > 0 && (
        <section className="py-20 bg-gradient-to-r from-rose-50 to-orange-50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-200 rounded-full blur-[100px] opacity-30" />
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <Clock className="w-3 h-3" /> Limited Time
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Flash Sale ⚡</h2>
                <p className="text-gray-600 text-lg">Grab these unbeatable deals before they expire</p>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-sm border border-red-100">
                <span className="text-sm text-gray-500 font-medium">Ends in:</span>
                <span className="font-mono text-xl font-bold text-red-600">05:23:45</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSaleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust / How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Get your premium tools in 3 simple steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 border-t-2 border-dashed border-gray-200" />
            
            {[
              { 
                icon: <Search className="w-6 h-6" />, 
                title: "1. Choose Product", 
                desc: "Browse our wide range of premium digital tools and select what you need.",
                color: "bg-blue-100 text-blue-600"
              },
              { 
                icon: <CreditCard className="w-6 h-6" />, 
                title: "2. Secure Payment", 
                desc: "Pay securely using Bkash, Nagad, or Rocket. Your transaction is 100% safe.",
                color: "bg-purple-100 text-purple-600"
              },
              { 
                icon: <Zap className="w-6 h-6" />, 
                title: "3. Instant Access", 
                desc: "Receive your credentials or license key instantly via email or dashboard.",
                color: "bg-green-100 text-green-600"
              }
            ].map((step, idx) => (
              <div key={idx} className="relative bg-white p-8 rounded-2xl text-center hover:shadow-xl transition-shadow border border-gray-100 z-10">
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm transform hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Featured Products</h2>
              <p className="text-gray-600 text-lg">Hand-picked best sellers for you</p>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
            >
              View More
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-semibold text-gray-900 shadow-sm"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bundle Offers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-3xl p-8 md:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[150px] opacity-20" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500 rounded-full blur-[120px] opacity-20" />
            
            <div className="relative z-10 mb-12 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Unbeatable Bundle Offers 🎁</h2>
              <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
                Save up to 60% when you buy our curated bundles. Perfect for designers, agencies, and productivity enthusiasts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {bundles.map((bundle) => (
                <div key={bundle.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all group">
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={bundle.image}
                      alt={bundle.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-sm shadow-md">
                      Save {bundle.discount}%
                    </div>
                  </div>
                  <h3 className="font-bold text-xl mb-2">{bundle.name}</h3>
                  <p className="text-sm text-blue-100 mb-6">{bundle.products.length} Premium Tools Included</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-blue-200 line-through">৳{bundle.originalPrice}</p>
                      <p className="text-2xl font-bold text-white">৳{bundle.price}</p>
                    </div>
                    <Link
                      href="/bundles"
                      className="px-4 py-2 bg-white text-blue-900 rounded-lg font-bold hover:bg-blue-50 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loved by Professionals</h2>
            <p className="text-gray-600 text-lg">See what our community has to say about us</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               { name: "Rafiqul Islam", role: "Graphic Designer", text: "Victorians Academy is a lifesaver! I got my Adobe subscription instantly. Highly recommended." },
               { name: "Sarah Ahmed", role: "Content Creator", text: "Best prices in the market. The support team helped me set up my ChatGPT Plus account in minutes." },
               { name: "Tanvir Hasan", role: "Software Engineer", text: "Genuine products and instant delivery. I've bought multiple Windows keys and they all work perfectly." }
             ].map((review, i) => (
               <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                 <div className="flex gap-1 mb-4">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                 </div>
                 <p className="text-gray-600 mb-6 leading-relaxed">"{review.text}"</p>
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                     {review.name[0]}
                   </div>
                   <div>
                     <h4 className="font-bold text-gray-900">{review.name}</h4>
                     <p className="text-xs text-gray-500">{review.role}</p>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-20" />
             
             <div className="relative z-10">
               <h2 className="text-3xl font-bold text-white mb-4">Join Our Newsletter</h2>
               <p className="text-gray-400 mb-8 max-w-lg mx-auto">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
               
               <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                 <input 
                   type="email" 
                   placeholder="Enter your email address" 
                   className="flex-1 px-6 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/50">
                   Subscribe
                 </button>
               </form>
               <p className="text-xs text-gray-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper components for icons to reduce imports
function Search(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

function CreditCard(props: any) {
  return (
    <svg 
      {...props} 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}
