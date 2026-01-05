"use client";

import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { products as staticProducts, bundles, categories } from '../data/products';
import { Product } from '../data/products';
import { ArrowRight, Zap, Shield, Clock, Headphones, Star, CheckCircle, Gift, Users, Trophy, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HomePageProps {
  initialProducts?: Product[];
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

export function HomePage({ initialProducts = [] }: HomePageProps) {
  // Use dynamic products if available, otherwise fall back to static data (mostly for dev/demo if DB empty)
  const displayProducts = initialProducts.length > 0 ? initialProducts : staticProducts;

  const featuredProducts = displayProducts.slice(0, 6);
  // Simple heuristic for flash sale if no explicit field exists, or use existing logic if compatible
  const flashSaleProducts = displayProducts.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4);

  const onAddToCart = (product: Product) => {
    console.log("Add to cart (Client Side):", product);
    // TODO: Implement actual cart logic (Context or State)
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        {/* Multi-layer gradient background for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" />
        <div className="absolute inset-0 bg-linear-to-tr from-transparent via-blue-100/30 to-indigo-100/40" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15]" />
        
        <div className="max-w-7xl mx-auto px-2 sm:px-6 pt-6 pb-6 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28 relative">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-20 items-center">
            
            {/* Left: Content */}
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-semibold mb-6 shadow-sm border border-blue-200/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                #1 Trusted Digital Marketplace in Bangladesh
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-gray-900 leading-[1.1]">
                Premium <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-purple-700">Digital Assets</span>
                <br className="hidden sm:block" /> At Unbeatable Prices
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Get instant access to ChatGPT, Adobe Creative Cloud, Microsoft 365, and premium VPNs. 100% Genuine & Official.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="flex flex-row sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-6">
                <Link
                  href="/products"
                  className="group w-full sm:w-auto px-2 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-1 hover:scale-[1.02] duration-300"
                >
                  Start Exploring
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                
              </motion.div>

              {/* Trust Badges - Enhanced */}
              <motion.div variants={fadeInUp} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 md:gap-6">
                <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
                   <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                     <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
                   </div>
                   <span className="font-semibold text-xs sm:text-sm text-gray-900 whitespace-nowrap">10,000+ Customers</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-300/50"></div>
                <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
                   <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                     <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
                   </div>
                   <span className="font-semibold text-xs sm:text-sm text-gray-900 whitespace-nowrap">Instant Delivery</span>
                </div>
                <div className="hidden sm:block w-px h-6 bg-gray-300/50"></div>
                <div className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200/50 shadow-sm hover:shadow-md transition-shadow">
                   <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                     <Headphones className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-600" />
                   </div>
                   <span className="font-semibold text-xs sm:text-sm text-gray-900 whitespace-nowrap">24/7 Support</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative">
                {/* Animated glow effect behind image - Multi-layer */}
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-3xl blur-3xl opacity-25 animate-pulse"></div>
                <div className="absolute -inset-2 bg-gradient-to-br from-indigo-300 to-blue-300 rounded-3xl blur-2xl opacity-20"></div>
                
                {/* Main image container */}
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-[6px] border-white/80 backdrop-blur-sm transform hover:scale-[1.02] transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.4)]">
                  <img
                    src="/hero-digital-transformation.jpg"
                    alt="Digital Transformation - Premium Digital Assets"
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* Gradient overlay for better blend */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent"></div>
                </div>

                {/* Floating badge - Hidden on mobile */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
                  className="hidden lg:block absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100/50 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Zap className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900 tracking-tight">42+</div>
                      <div className="text-sm font-medium text-gray-600">Premium Products</div>
                    </div>
                  </div>
                </motion.div>

                {/* Top right floating badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
                  className="hidden lg:block absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white rounded-2xl shadow-2xl px-5 py-3 hover:scale-105 transition-transform"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⚡</span>
                    <span className="font-bold text-sm tracking-wide">Instant Access</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
      

      {/* Stats Section */}
      <section className="bg-white py-4 md:py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-2">
          <div className="grid grid-cols-4 md:grid-cols-4 gap-0.5 md:gap-8">
            <div className="text-center group p-2 md:p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 md:h-10 md:w-10 text-blue-600" />
              </div>
              <h3 className="lg:text-2xl text-xl md:text-4xl font-bold text-gray-900 mb-1">15K+</h3>
              <p className="text-gray-500 text-sm md:text-lg">Active Users</p>
            </div>
            <div className="text-center group p-2 md:p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 md:h-10 md:w-10 text-green-600" />
              </div>
              <h3 className="lg:text-2xl text-xl md:text-4xl font-bold text-gray-900 mb-1">50K+</h3>
              <p className="text-gray-500 text-sm md:text-lg">Orders Completed</p>
            </div>
            <div className="text-center group p-2 md:p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-6 h-6 md:h-10 md:w-10 text-indigo-600" />
              </div>
              <h3 className="lg:text-2xl text-xl md:text-4xl font-bold text-gray-900 mb-1">4.9/5</h3>
              <p className="text-gray-500 text-sm md:text-lg">Customer Rating</p>
            </div>
            <div className="text-center group p-2 md:p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6 md:h-10 md:w-10 text-blue-600" />
              </div>
              <h3 className="lg:text-2xl text-xl md:text-4xl font-bold text-gray-900 mb-1">Top #1</h3>
              <p className="text-gray-500 text-sm md:text-lg">In Bangladesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid - Revised for visibility */}
      {/* <section className="py-4 md:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6 md:mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">Shop by Category</h2>
              <p className="text-gray-600 text-sm md:text-base lg:text-lg hidden sm:block">Explore our wide range of premium digital tools</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
            {Object.entries(categories).map(([key, category]) => (
              <Link
                key={key}
                href={`/products?category=${key}`}
                className="group relative overflow-hidden bg-white p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl border border-gray-100 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 right-0 p-2 md:p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-blue-600" />
                </div>
                <h3 className="font-bold text-sm md:text-base lg:text-lg text-gray-900 mb-2 md:mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {category.name}
                </h3>
                <div className="flex items-center justify-between mt-3 md:mt-4">
                  <span className="text-xs md:text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    {category.items.length} Items
                  </span>
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 group-hover:text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* Flash Sale */}
      {flashSaleProducts.length > 0 && (
        <section className="py-8 bg-gradient-to-r from-rose-50 to-orange-50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-200 rounded-full blur-[100px] opacity-30" />
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-12 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <Clock className="w-3 h-3" /> Limited Time
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Flash Sale ⚡</h2>
                <p className="text-gray-600 text-lg">Grab these unbeatable deals before they expire</p>
              </div>
              {/* <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl shadow-sm border border-red-100">
                <span className="text-sm text-gray-500 font-medium">Ends in:</span>
                <span className="font-mono text-xl font-bold text-red-600">05:23:45</span>
              </div> */}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
      <section className="py-8 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-6 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">How It Works</h2>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg">Get your premium tools in 3 simple steps</p>
          </div>
          
          {/* Mobile: Horizontal Scroll, Desktop: Grid */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
            <div className="flex gap-4 min-w-max">
              {[
                { 
                  icon: <Search className="w-5 h-5" />, 
                  title: "1. Choose Product", 
                  desc: "Browse our wide range of premium digital tools and select what you need.",
                  color: "bg-blue-100 text-blue-600"
                },
                { 
                  icon: <CreditCard className="w-5 h-5" />, 
                  title: "2. Secure Payment", 
                  desc: "Pay securely using Bkash, Nagad, or Rocket. Your transaction is 100% safe.",
                  color: "bg-indigo-100 text-indigo-600"
                },
                { 
                  icon: <Zap className="w-5 h-5" />, 
                  title: "3. Instant Access", 
                  desc: "Receive your credentials or license key instantly via email or dashboard.",
                  color: "bg-blue-100 text-blue-600"
                }
              ].map((step, idx) => (
                <div key={idx} className="flex-shrink-0 w-[280px] bg-white p-4 rounded-xl text-center shadow-md border border-gray-200 snap-center">
                  <div className={`w-12 h-12 ${step.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm`}>
                    {step.icon}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="absolute top-12 left-[20%] right-[20%] h-0.5 bg-linear-to-r from-blue-200 via-indigo-200 to-blue-200 border-t-2 border-dashed border-gray-200" />
            
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
                color: "bg-indigo-100 text-indigo-600"
              },
              { 
                icon: <Zap className="w-6 h-6" />, 
                title: "3. Instant Access", 
                desc: "Receive your credentials or license key instantly via email or dashboard.",
                color: "bg-blue-100 text-blue-600"
              }
            ].map((step, idx) => (
              <div key={idx} className="relative bg-white p-6 lg:p-8 rounded-2xl text-center hover:shadow-xl transition-shadow border border-gray-200 hover:border-blue-300 z-10">
                <div className={`w-14 h-14 lg:w-16 lg:h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm transform hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-base text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Scroll indicator for mobile */}
          <div className="md:hidden flex justify-center gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-4 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6 md:mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2  md:mb-3">Featured Products</h2>
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
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-indigo-800 rounded-3xl p-8 md:p-16 text-white overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[150px] opacity-20" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-400 rounded-full blur-[120px] opacity-20" />
            
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
      </section> */}

      {/* Testimonials */}
      <section className="py-8 md:py-16 lg:py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-6 md:mb-12 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-sm md:text-base lg:text-lg">Join thousands of satisfied customers</p>
          </div>

          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory">
            <div className="flex gap-4 min-w-max">
              {[
                { name: "Md. Karim", role: "Student", text: "Excellent service! Got my Office 365 subscription within minutes. Highly recommend!" },
                { name: "Sarah Ahmed", role: "Designer", text: "Best prices in Bangladesh. The Adobe Creative Cloud license works perfectly!" },
                { name: "Rafiq Hassan", role: "Developer", text: "Quick delivery and genuine products. Will definitely buy again!" }
              ].map((testimonial, idx) => (
                <div key={idx} className="flex-shrink-0 w-[280px] bg-white p-4 rounded-xl shadow-md border border-gray-200 snap-center">
                  <div className="flex items-center gap-1 text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8">
            {[
              { name: "Md. Karim", role: "Student", text: "Excellent service! Got my Office 365 subscription within minutes. Highly recommend!" },
              { name: "Sarah Ahmed", role: "Designer", text: "Best prices in Bangladesh. The Adobe Creative Cloud license works perfectly!" },
              { name: "Rafiq Hassan", role: "Developer", text: "Quick delivery and genuine products. Will definitely buy again!" }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 lg:p-8 rounded-2xl shadow-md hover:shadow-xl transition-shadow border border-gray-200">
                <div className="flex items-center gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400" />
                    ))}
                </div>
                <p className="text-base text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator for mobile */}
          <div className="md:hidden flex justify-center gap-2 mt-4">
            <div className="w-2 h-2 rounded-full bg-blue-600"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
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
