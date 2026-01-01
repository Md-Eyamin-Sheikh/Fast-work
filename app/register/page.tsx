
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Loader2, Sparkles, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate registration logic for now (mock)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    // In a real app we'd post to an API
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 relative overflow-hidden">
       {/* Dynamic Background */}
       <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/30 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/30 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-lg p-8 relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-pink-500 to-orange-500 mb-4 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
               <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h2>
            <p className="text-pink-200 text-sm">Join Victorians Academy today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-gray-900/30 p-1 rounded-xl flex gap-1 mb-6">
                <button type="button" className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-white/10 text-white shadow-sm">
                    Personal
                </button>
                <button type="button" className="flex-1 py-1.5 text-xs font-semibold rounded-lg text-gray-400 hover:text-white transition-colors">
                    Business
                </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-indigo-200 ml-1 uppercase tracking-wider">Full Name</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within/input:text-pink-400 transition-colors" />
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent placeholder-gray-500 transition-all duration-300 outline-none hover:bg-gray-900/70"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-indigo-200 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within/input:text-pink-400 transition-colors" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent placeholder-gray-500 transition-all duration-300 outline-none hover:bg-gray-900/70"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                <label className="text-xs font-medium text-indigo-200 ml-1 uppercase tracking-wider">Password</label>
                <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within/input:text-pink-400 transition-colors" />
                    </div>
                    <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent placeholder-gray-500 transition-all duration-300 outline-none hover:bg-gray-900/70"
                    placeholder="•••••••"
                    />
                </div>
                </div>
                <div className="space-y-1">
                <label className="text-xs font-medium text-indigo-200 ml-1 uppercase tracking-wider">Confirm</label>
                <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within/input:text-pink-400 transition-colors" />
                    </div>
                    <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    required
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent placeholder-gray-500 transition-all duration-300 outline-none hover:bg-gray-900/70"
                    placeholder="•••••••"
                    />
                </div>
                </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-linear-to-r from-pink-600 to-orange-600 hover:from-pink-500 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-6"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center space-y-4 relative z-10">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-transparent text-gray-400 backdrop-blur-md">Already a member?</span>
                </div>
            </div>
            
            <Link 
                href="/admin/login" 
                className="group inline-flex items-center gap-2 text-sm text-pink-300 hover:text-white transition-colors duration-300"
            >
                 <span className="flex items-center gap-1 font-semibold underline decoration-transparent group-hover:decoration-pink-400 underline-offset-4 transition-all">
                    Sign In instead <Sparkles className="w-3 h-3 text-orange-300" />
                 </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
