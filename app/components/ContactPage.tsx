'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Clock, CheckCircle, Facebook, Youtube, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function ContactPage() {
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
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Touch</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              At Victorians Academy, we believe communication is the key to building trust. Whether you have a question about our services, need support with a tool, or want to explore how we can help your business grow—we're always here to listen and assist.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <Phone className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <a href="tel:01600107867" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                    01600107867
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <Mail className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <a href="mailto:victoriansacademy95@gmail.com" className="text-lg font-bold text-gray-900 hover:text-indigo-600 transition-colors break-all">
                    victoriansacademy95@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                <Clock className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Business Hours</p>
                  <p className="text-lg font-bold text-gray-900">Saturday – Friday</p>
                  <p className="text-gray-700">10:00 AM – 12:00 AM</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-3">
                <MessageCircle className="w-6 h-6" />
                <h3 className="text-xl font-bold">Live Chat Support</h3>
              </div>
              <p className="text-blue-100 mb-4">
                Our support team is ready to guide you with quick and reliable responses.
              </p>
              <button className="w-full bg-white text-blue-600 font-bold py-3 rounded-lg hover:bg-blue-50 transition-colors">
                Start Live Chat
              </button>
            </div>
          </motion.div>

          {/* Why Contact Us & Social */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Why Contact Us */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Contact Victorians Academy?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-700 font-medium">100% Genuine & Official Services</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-700 font-medium">Fast & Friendly Support</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-700 font-medium">Expert Guidance on Choosing the Right Tools</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-700 font-medium">Trusted Online Tools Provider in Bangladesh</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Let's Connect Online</h2>
              <p className="text-blue-100 mb-6">
                Stay updated with our latest services, offers, and resources:
              </p>
              
              <div className="space-y-4">
                <Link
                  href="https://www.facebook.com/VictoriansAcademy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all group"
                >
                  <div className="bg-white/20 p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Facebook className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Facebook Page</p>
                    <p className="text-sm text-blue-100">Follow us for updates</p>
                  </div>
                </Link>

                <Link
                  href="https://www.youtube.com/c/UMARFARUKOfficialChannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all group"
                >
                  <div className="bg-white/20 p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Youtube className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">YouTube Channel</p>
                    <p className="text-sm text-blue-100">Watch tutorials & guides</p>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            At <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Victorians Academy</span> – Your Trusted Agency
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            Your growth is our mission. Reach out today—we'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:01600107867"
              className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Us Now
            </a>
            <a
              href="mailto:victoriansacademy95@gmail.com"
              className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-200 rounded-xl font-semibold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Send Email
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
