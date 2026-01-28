'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, ShieldCheck } from 'lucide-react';

export function Footer() {
  const pathname = usePathname();
  
  // Hide footer in admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }
  
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-[1600px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white rounded-full  flex items-center justify-center overflow-hidden">
                 <img src="https://i.postimg.cc/d19GKJPt/logo-removebg-preview-(1).png" alt="Victorians Academy" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Victorians Academy</h3>
                <p className="text-xs text-gray-400">Trusted Agency in Bangladesh</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Your Trusted Agency in Bangladesh. We provide 100% official & genuine online tools to support your business growth. Trusted by professionals, powered by authenticity.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Call Us</p>
                  <p className="font-medium text-white">+880 1600-107867</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email Us</p>
                  <p className="font-medium text-white">victoriansacademy95@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Location</p>
                  <p className="font-medium text-white">Belervita, Balabari Hat, Chilmari, Kurigram</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                   Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                   Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Official Info</h3>
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
               <div className="flex items-center gap-2 mb-4 text-green-400">
                  <ShieldCheck className="w-6 h-6" />
                  <span className="font-bold">Verified Business</span>
               </div>
               <ul className="space-y-3 text-sm">
                  <li className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">DBID</span>
                    <span className="font-mono text-white">715297335</span>
                  </li>
                  <li className="flex justify-between border-b border-gray-700 pb-2">
                    <span className="text-gray-400">Trade License</span>
                    <span className="font-mono text-white text-xs">19984910983000406</span>
                  </li>
                  <li className="f flex justify-between pt-1">
                     <span className="text-gray-400">BSCIC Reg</span>
                     <span className="font-mono text-white">-</span>
                  </li>
               </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Victorians Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
