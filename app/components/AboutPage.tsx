'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Phone, Mail, Award, Users, Shield, Zap } from 'lucide-react';

export function AboutPage() {
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 py-20">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="max-w-4xl mx-auto px-4 relative">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Victorians Academy</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-700 font-medium">
              Your Trusted Agency
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12"
        >
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            We are Bangladesh's leading online tools provider agency, committed to delivering <span className="font-bold text-blue-600">100% official & genuine services</span> that empower freelancers, entrepreneurs, and businesses to thrive in today's digital world. At Victorians Academy, trust and authenticity are at the core of everything we do.
          </p>

          {/* Who We Are */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-600" />
              Who We Are
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Founded by <span className="font-bold text-gray-900">Umar Faruk (Founder & CEO)</span>, Victorians Academy was built on the vision of creating a reliable hub where professionals can access premium online tools without hassle or risk. Over the <span className="font-bold text-blue-600">6 years</span>, we have become a trusted name for thousands of clients who rely on us for safe, secure, and authentic services.
            </p>
          </div>

          {/* What We Offer */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Award className="w-8 h-8 text-blue-600" />
              What We Offer
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Premium Online Tools</h3>
                <p className="text-gray-700">Access essential tools for SEO, marketing, video editing, design, productivity, and more.</p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">100% Official & Verified Services</h3>
                <p className="text-gray-700">No shortcuts, no third-party risks—just genuine solutions.</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Dedicated Customer Support</h3>
                <p className="text-gray-700">Personalized guidance to help you choose the right tools for your needs.</p>
              </div>
              <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Affordable & Transparent Pricing</h3>
                <p className="text-gray-700">High-quality services at fair rates designed to support freelancers and businesses.</p>
              </div>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              Why Choose Victorians Academy?
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700 font-medium">100% Genuine & Official Services</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700 font-medium">Trusted by Professionals Across Bangladesh</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700 font-medium">Quick Delivery & Reliable Support</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-700 font-medium">A Long-Term Partner in Your Growth</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100 text-center">
            <p className="text-xl text-gray-800 font-medium italic">
              "At Victorians Academy, we don't just provide tools—we provide the confidence to grow, create, and succeed."
            </p>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 md:p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <Phone className="w-6 h-6" />
              <div>
                <p className="text-sm text-blue-100">Phone</p>
                <p className="text-lg font-bold">01600107867</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <Mail className="w-6 h-6" />
              <div>
                <p className="text-sm text-blue-100">Email</p>
                <p className="text-lg font-bold break-all">victoriansacademy95@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8">
            <div className="text-center mb-6">
              <p className="text-xl font-bold mb-2">Regards</p>
              <p className="text-2xl font-bold">Umar Faruk</p>
              <p className="text-blue-100">Founder & CEO, Victorians Academy</p>
            </div>

            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm space-y-2 text-sm">
              <p className="flex justify-between">
                <span className="text-blue-100">Trade License No:</span>
                <span className="font-mono font-bold">19984910983000385</span>
              </p>
              <p className="flex justify-between">
                <span className="text-blue-100">DBID:</span>
                <span className="font-mono font-bold">715297335</span>
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
