"use client";

import React, { useState } from 'react';
import { Product, products, categories } from '../data/products';
import { 
  Star, 
  ShoppingCart, 
  Shield, 
  Check, 
  ChevronRight,
  Flame,
  Eye,
  CreditCard,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ProductDetailsPageProps {
  product: Product;
  onBack?: () => void;
}

export function ProductDetailsPage({ product, onBack }: ProductDetailsPageProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const onAddToCart = (product: Product) => {
    addToCart(product);
  };

  const onBuyNow = (product: Product) => {
    addToCart(product);
    router.push('/checkout');
  };

  // Calculate discount percentage
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Breadcrumbs
  const categoryName = categories[product.category as keyof typeof categories]?.name || product.category;

  // Related Products (Simulated by taking first 4 other products)
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/products?category=${product.category}`} className="hover:text-blue-600">{categoryName}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Left: Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Badge Overlay */}
              {product.badge && (
                 <div className="absolute top-0 left-0">
                    <div className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg transform -rotate-45 translate-y-4 -translate-x-3 shadow-lg w-20 text-center uppercase">
                        {product.badge}
                    </div>
                 </div> 
              )}
               {discountPercent > 0 && (
                <div className="absolute top-4 right-4 bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-sm">
                  -{discountPercent}%
                </div>
              )}
            </div>

            {/* Right: Info */}
            <div className="flex flex-col">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">({product.reviews} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-6">
                 {product.originalPrice && (
                  <span className="text-2xl text-gray-400 line-through mb-1">
                    ৳{product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-4xl font-bold text-green-600">
                  ৳{product.price.toFixed(2)}
                </span>
              </div>

              {/* Short Description */}
              <div className="mb-8">
                 {product.shortDescription && <p className="text-gray-700 font-medium mb-3">{product.shortDescription}</p>}
                 {product.highlights && product.highlights.length > 0 && (
                   <ul className="space-y-2">
                     {product.highlights.map((highlight, idx) => (
                         <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                             <span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                             {highlight}
                         </li>
                     ))}
                  </ul>
                 )}
              </div>

              {/* Stats Banners */}
              {product.soldLast23Hours && (
                <div className="space-y-3 mb-8">
                  <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center gap-3 text-green-800 text-sm">
                      <Flame className="w-5 h-5 text-green-600 fill-green-100" />
                      <span className="font-semibold">{product.soldLast23Hours} Items sold in last 23 hours</span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                 <div className="flex border border-gray-300 rounded-lg h-12 w-32">
                    <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-l-lg transition"
                    >
                        -
                    </button>
                    <input 
                        type="text" 
                        value={quantity} 
                        readOnly 
                        className="flex-1 text-center font-semibold text-gray-900 outline-none"
                    />
                    <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-r-lg transition"
                    >
                        +
                    </button>
                 </div>
                 
                 <button
                    onClick={() => onAddToCart(product)}
                    className="flex-1 bg-[#86EFAC] bg-opacity-80 hover:bg-opacity-100 text-green-900 font-bold h-12 rounded-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                  >
                    ADD TO CART
                  </button>
                  
                  <button
                    onClick={() => onBuyNow(product)}
                    className="flex-1 bg-black text-white font-bold h-12 rounded-lg hover:bg-gray-800 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                  >
                    Buy Now
                  </button>
              </div>

             {/* Watching Banner */}
             {product.peopleWatching && (
               <div className="bg-green-50 border border-green-100 rounded-lg p-3 flex items-center gap-3 text-green-800 text-sm mb-8">
                 <Eye className="w-5 h-5 text-green-600" />
                 <span className="font-semibold">{product.peopleWatching} People watching this product now!</span>
               </div>
             )}

            {/* Social Share */}
            {/* <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <span className="text-xs font-bold bg-gray-800 text-white px-3 py-1 rounded-full">ALL ({product.reviews + 20})</span>
                // {/* <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-600 font-medium border px-3 py-1 rounded-full">
                //     <Facebook className="w-3 h-3" /> FACEBOOK
                // </button> 
                 <button className="flex items-center gap-1 text-xs text-gray-600 hover:text-green-600 font-medium border px-3 py-1 rounded-full">
                    <Shield className="w-3 h-3" /> TRUSTPILOT
                </button>
            </div> */}

            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-12">
            <Tabs defaultValue="description">
                <div className="border-b px-0 md:px-8 w-full">
                    <div className="overflow-x-auto w-full px-4 md:px-0 scrollbar-hide">
                        <TabsList className="bg-transparent h-auto p-0 gap-4 md:gap-8 flex-nowrap justify-start min-w-max">
                            <TabsTrigger 
                                value="description" 
                                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-green-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-2 md:px-0 py-4 font-semibold text-gray-500 data-[state=active]:text-green-600 uppercase text-xs md:text-sm tracking-wide whitespace-nowrap"
                            >
                                Description
                            </TabsTrigger>
                            <TabsTrigger 
                                value="reviews" 
                                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-green-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-2 md:px-0 py-4 font-semibold text-gray-500 data-[state=active]:text-green-600 uppercase text-xs md:text-sm tracking-wide whitespace-nowrap"
                            >
                                Reviews ({product.reviews})
                            </TabsTrigger>
                             <TabsTrigger 
                                value="referral" 
                                className="bg-transparent border-b-2 border-transparent data-[state=active]:border-green-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-2 md:px-0 py-4 font-semibold text-gray-500 data-[state=active]:text-green-600 uppercase text-xs md:text-sm tracking-wide whitespace-nowrap"
                            >
                                Referral Program
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </div>
                
                <div className="p-6 md:p-8">
                    <TabsContent value="description" className="mt-0 space-y-8 animate-in fade-in-50 duration-300">
                        <div>
                             <p className="text-gray-600 leading-relaxed text-lg">{product.description}</p>
                             <h3 className="text-xl font-bold mt-4 mb-2">{product.name}</h3>
                             <div className="w-20 h-1 bg-green-500 rounded-full mb-6"></div>
                        </div>

                        {/* What you get section */}
                        {product.whatYouGet && product.whatYouGet.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-green-600 font-bold text-lg mb-1">What You will get ?</h4>
                                    <h3 className="text-xl font-bold mb-6">Best {product.highlights?.[0] || 'Value'}</h3>
                                    <p className="text-gray-600 mb-6 text-sm">
                                        Boost your efficiency and productivity with our premium digital assets. Tailored for professionals, students, and anyone seeking a productivity boost.
                                    </p>
                                    
                                    <div className="space-y-6">
                                        {product.whatYouGet.map((item, idx) => (
                                            <div key={idx} className="flex gap-4">
                                                <div className={`w-12 h-12 rounded-full flex-shrink-0 ${item.color || 'bg-green-100'}`}></div>
                                                <div>
                                                    <h5 className="font-bold text-gray-900">{item.title}</h5>
                                                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="hidden md:flex items-center justify-center bg-gray-50 rounded-xl p-8">
                                     <img src={product.image} alt={product.name} className="max-h-[400px] object-contain drop-shadow-2xl" />
                                </div>
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Reviews List */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-bold">{product.reviews} reviews for {product.name}</h3>
                                {product.reviewsList && product.reviewsList.length > 0 ? (
                                    product.reviewsList.map((review) => (
                                        <div key={review.id} className="border border-gray-100 rounded-xl p-6 bg-gray-50">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2 font-bold text-sm">
                                                    {review.author}
                                                    {review.verified && <span className="text-xs font-normal text-gray-500">(verified owner)</span>}
                                                </div>
                                                <span className="text-xs text-gray-500">{review.date}</span>
                                            </div>
                                             <div className="flex items-center mb-2">
                                              {[...Array(5)].map((_, i) => (
                                                <Star
                                                  key={i}
                                                  className={`w-3.5 h-3.5 ${
                                                    i < Math.floor(review.rating)
                                                      ? 'fill-yellow-400 text-yellow-400'
                                                      : 'text-gray-200'
                                                  }`}
                                                />
                                              ))}
                                            </div>
                                            <p className="text-gray-600 text-sm italic">"{review.content}"</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-500">No reviews yet.</p>
                                )}
                            </div>

                            {/* Add Review Form */}
                            <div>
                                <h3 className="text-lg font-bold mb-2">Add a review</h3>
                                <p className="text-xs text-gray-500 mb-6">Your email address will not be published. Required fields are marked *</p>
                                
                                <form className="space-y-4">
                                     <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your rating *</label>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star key={star} className="w-5 h-5 text-gray-300 hover:text-yellow-400 cursor-pointer transition-colors" />
                                            ))}
                                        </div>
                                     </div>
                                     
                                     <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Your review *</label>
                                        <textarea className="w-full h-32 rounded-lg border border-gray-200 p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none" placeholder="Write your review here..."></textarea>
                                     </div>

                                     <div className="grid grid-cols-2 gap-4">
                                         <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                            <input type="text" className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                                         </div>
                                         <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                            <input type="email" className="w-full rounded-lg border border-gray-200 p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none" />
                                         </div>
                                     </div>

                                     <div className="flex items-center gap-2">
                                        <input type="checkbox" id="save-info" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                        <label htmlFor="save-info" className="text-xs text-gray-500">Save my name, email, and website in this browser for the next time I comment.</label>
                                     </div>

                                     <button type="button" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-sm transition-colors uppercase">
                                        Submit
                                     </button>
                                </form>
                            </div>
                        </div>
                    </TabsContent>
                    
                    <TabsContent value="referral">
                        <div className="p-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-300">
                            <h3 className="font-bold text-gray-900 mb-2">Refer & Earn</h3>
                            <p className="text-gray-600">Share your referral link and earn 20% commission on every sale!</p>
                            <button className="mt-4 text-green-600 font-bold hover:underline">Join Referral Program</button>
                        </div>
                    </TabsContent>
                </div>
            </Tabs>
        </div>

        {/* Related Products */}
        <div>
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(related => (
                    <div key={related.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group">
                        <div className="relative aspect-video bg-gray-100">
                             <img src={related.image} alt={related.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                             {related.originalPrice && related.originalPrice > related.price && (
                                <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    -{Math.round(((related.originalPrice - related.price) / related.originalPrice) * 100)}%
                                </span>
                             )}
                              {related.badge && (
                                <span className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase">
                                    {related.badge}
                                </span>
                             )}
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-gray-900 mb-1 truncate">{related.name}</h3>
                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">{related.deliveryType === 'auto' ? 'Instant Delivery' : 'Manual Delivery'} - {related.category}</p>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                     {related.originalPrice && <span className="text-xs text-gray-400 line-through">৳{related.originalPrice}</span>}
                                    <span className="font-bold text-green-600">৳{related.price}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs font-bold">{related.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
        </div>
      </div>
    </div>
  );
}
