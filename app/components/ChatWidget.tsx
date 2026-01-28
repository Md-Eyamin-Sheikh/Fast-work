'use client';

import { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Facebook, 
  Phone, 
  Mail, 
  Smartphone,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const contactOptions = [
    {
      id: 'facebook',
      label: 'Victorians Academy',
      subLabel: 'Reply in a few minutes.',
      icon: <Facebook className="w-5 h-5 text-white" />,
      iconBg: 'bg-blue-600',
      href: 'https://www.facebook.com/VictoriansAcademy/#',
      external: true
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      subLabel: 'Reply in a few minutes.',
      icon: <Smartphone className="w-5 h-5 text-white" />, // Using Smartphone as proxy for WhatsApp if custom icon not available easily, or use MessageCircle
      iconBg: 'bg-green-500',
      href: 'https://web.whatsapp.com/',
      external: true
    },
    // Adding a specific icon for WhatsApp if possible, or keeping generic. 
    // Lucide doesn't have brand icons by default other than generic ones usually, 
    // but Facebook is there. Let's check if we can approximate WhatsApp. 
    // Actually, let's use MessageCircle for "Direct Chat" and maybe construct a custom SVG for WhatsApp or just use a green phone/message icon.
    
    {
      id: 'direct',
      label: 'Direct Chat',
      subLabel: 'Reply in a few minutes.',
      icon: <MessageSquare className="w-5 h-5 text-white" />,
      iconBg: 'bg-indigo-500', 
      href: '#', // Placeholder or maybe a modal trigger? For now just a link or dead link as requested "Direct Chat"
      external: false
    },
    {
      id: 'email',
      label: 'Email',
      subLabel: 'Send us Email',
      icon: <Mail className="w-5 h-5 text-white" />,
      iconBg: 'bg-blue-500',
      href: 'mailto:victoriansacademy95@gmail.com',
      external: true
    },
    {
      id: 'call',
      label: 'Call Now!',
      subLabel: 'Call us 9 AM - 02 AM',
      icon: <Phone className="w-5 h-5 text-white" />,
      iconBg: 'bg-green-600',
      href: 'tel:01600107867',
      external: true
    }
  ];

  return (
    <div className="fixed bottom-24 lg:bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans">
      
      {/* Menu Content */}
      <div 
        className={`transition-all duration-300 transform origin-bottom-right ${
          isOpen 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-90 opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-2 w-[300px] border border-gray-100 mb-2">
           {/* Header/Welcome could go here if needed, but per screenshot it's just a list */}
           
           <div className="flex flex-col gap-1">
             {contactOptions.map((option) => (
               <a 
                 key={option.id}
                 href={option.href}
                 target={option.external ? '_blank' : undefined}
                 rel={option.external ? 'noopener noreferrer' : undefined}
                 className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
               >
                 <div className={`w-10 h-10 rounded-full ${option.iconBg} flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                   {option.icon}
                 </div>
                 <div>
                   <h4 className="font-bold text-gray-900 text-sm leading-tight">{option.label}</h4>
                   <p className="text-xs text-gray-500">{option.subLabel}</p>
                 </div>
               </a>
             ))}
           </div>

           <div className="mt-2 pt-2 border-t border-gray-100 text-center">
             <p className="text-[10px] text-gray-400">Powered by Victorians Academy</p>
           </div>
        </div>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={toggleOpen}
        className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-blue-600 rotate-90' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
        }`}
        aria-label="Toggle chat menu"
      >
        {isOpen ? (
          <X className="w-7 h-7 text-white" />
        ) : (
          <MessageCircle className="w-7 h-7 text-white" />
        )}
      </button>

      {/* Notification Badge Badge (Optional, to simulate '1' notification) */}
      {!isOpen && (
        <span className="absolute -top-1 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold border-2 border-white">
          1
        </span>
      )}
    </div>
  );
}
