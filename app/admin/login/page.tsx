'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, Mail, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { auth, googleProvider } from '../../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { LottieAnimation } from '../../components/LottieAnimation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSocialLogin = async (provider: any) => {
    try {
      setLoading(true);
      setError('');
      const result = await signInWithPopup(auth, provider);
      
      // Store admin info
      const userEmail = result.user.email || 'admin@victorians.com';
      const userName = result.user.displayName || result.user.email?.split('@')[0] || 'Admin';
      
      localStorage.setItem('adminEmail', userEmail);
      localStorage.setItem('adminName', userName);
      localStorage.setItem('lastLogin', new Date().toISOString());
      
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store admin info in localStorage for dashboard
      localStorage.setItem('adminEmail', email);
      localStorage.setItem('adminName', email.split('@')[0] || 'Admin');
      localStorage.setItem('lastLogin', new Date().toISOString());

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden p-4">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/30 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/30 rounded-full blur-[100px] animate-pulse delay-1000"></div>
          <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-blue-500/20 rounded-full blur-[80px] animate-pulse delay-2000"></div>
      </div>

      <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* Left Side - Animation */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-6">
             <div className="relative w-full max-w-lg aspect-square">
                 <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
                 <LottieAnimation path="/Loti-animesun/Creat-account.json" className="relative z-10 w-full h-full" />
             </div>
             <div className="text-center space-y-2">
                 <h1 className="text-4xl font-bold text-white tracking-tight">Welcome Back!</h1>
                 <p className="text-blue-200 text-lg">Manage your dashboard and orders efficiently.</p>
             </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full max-w-md mx-auto">
            {/* Glass Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="text-center mb-8">
                {/* <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg transform group-hover:scale-105 transition-transform duration-300">
               
                <LottieAnimation path="/Loti-animesun/Creat-account.json" className="relative z-10 w-full h-full" />
                </div> */}
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Admin Login</h2>
                <p className="text-blue-200 text-sm">Enter your credentials to access the panel</p>
            </div>
            
            {error && (
                <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <p className="text-red-200 text-sm">{error}</p>
                </div>
            )}

            {/* <div className="grid grid-cols-1 gap-4 mb-6">
                <button
                onClick={() => handleSocialLogin(googleProvider)}
                type="button"
                className="flex items-center justify-center gap-2 py-3 px-4 bg-white text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all duration-300 shadow-md"
                >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
                </button>
            </div> */}

            {/* <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400 backdrop-blur-md">Or Login with Email</span>
                </div>
            </div> */}
            <div className="lg:hidden w-full max-w-[200px] mx-auto aspect-square mb-6 relative">
                 <LottieAnimation path="/Loti-animesun/Creat-account.json" className="w-full h-full" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                <label className="text-xs font-medium text-blue-200 ml-1 uppercase tracking-wider">Email Address</label>
                <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within/input:text-blue-400 transition-colors" />
                    </div>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-300 outline-none hover:bg-gray-900/70"
                    placeholder="admin@example.com"
                    />
                </div>
                </div>

                <div className="space-y-1">
                <label className="text-xs font-medium text-blue-200 ml-1 uppercase tracking-wider">Password</label>
                <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within/input:text-blue-400 transition-colors" />
                    </div>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-300 outline-none hover:bg-gray-900/70"
                    placeholder="•••••••"
                    />
                </div>
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                {loading ? (
                    <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Authenticating...
                    </>
                ) : (
                    <>
                    Access Dashboard
                    <ArrowRight className="w-5 h-5" />
                    </>
                )}
                </button>
            </form>
            
            {/* <div className="mt-8 text-center space-y-4 relative z-10">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-transparent text-gray-400 backdrop-blur-md">Or</span>
                    </div>
                </div>
                
                <Link 
                    href="/register" 
                    className="group inline-flex items-center gap-2 text-sm text-blue-300 hover:text-white transition-colors duration-300"
                >
                    <span>Don&apos;t have an account?</span>
                    <span className="flex items-center gap-1 font-semibold underline decoration-transparent group-hover:decoration-blue-400 underline-offset-4 transition-all">
                        Register Now <Sparkles className="w-3 h-3 text-yellow-300" />
                    </span>
                </Link>
            </div> */}

            </div>
        </div>
      </div>
    </div>
  );
}
