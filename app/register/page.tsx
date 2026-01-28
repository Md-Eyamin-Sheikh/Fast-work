'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Lock, ArrowRight, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { LottieAnimation } from '../components/LottieAnimation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSocialLogin = async (provider: any) => {
    try {
        setLoading(true);
        setError('');
        const result = await signInWithPopup(auth, provider);
        // In a real app, verify or create user in DB
        console.log("Registered/LoggedIn user:", result.user);
        router.push('/'); // Redirect to home on success
    } catch (err: any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate registration logic for now (mock)
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden p-4">
       {/* Dynamic Background */}
       <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/30 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/30 rounded-full blur-[100px] animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-[1600px] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* Left Side - Animation */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-6">
             <div className="relative w-full max-w-lg aspect-square">
                 <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                 <LottieAnimation path="/Loti-animesun/Creat-account.json" className="relative z-10 w-full h-full" />
             </div>
             <div className="text-center space-y-2">
                 <h1 className="text-4xl font-bold text-white tracking-tight">Join Our Community</h1>
                 <p className="text-blue-200 text-lg">Create an account to start your learning journey.</p>
             </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full max-w-lg mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
            
            <div className="text-center mb-6 lg:hidden">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 mb-4 shadow-lg">
                <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h2>
                <p className="text-blue-200 text-sm">Join Victorians Academy today</p>
            </div>

            <div className="hidden lg:block text-center mb-8">
                 <h2 className="text-2xl font-bold text-white">Sign Up</h2>
                 <p className="text-gray-400 text-sm">Enter your details below</p>
            </div>

            {error && (
                <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <p className="text-red-200 text-sm">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-1 gap-4 mb-6">
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
            </div>

            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-400 backdrop-blur-md">Or Register with Email</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Personal/Business Switch (Visual Only) */}
                {/* <div className="bg-gray-900/30 p-1 rounded-xl flex gap-1 mb-6">
                    <button type="button" className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-white/10 text-white shadow-sm">
                        Personal
                    </button>
                    <button type="button" className="flex-1 py-1.5 text-xs font-semibold rounded-lg text-gray-400 hover:text-white transition-colors">
                        Business
                    </button>
                </div> */}

                <div className="space-y-1">
                <label className="text-xs font-medium text-blue-200 ml-1 uppercase tracking-wider">Full Name</label>
                <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within/input:text-blue-400 transition-colors" />
                    </div>
                    <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-300 outline-none hover:bg-gray-900/70"
                    placeholder="John Doe"
                    />
                </div>
                </div>

                <div className="space-y-1">
                <label className="text-xs font-medium text-blue-200 ml-1 uppercase tracking-wider">Email Address</label>
                <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within/input:text-blue-400 transition-colors" />
                    </div>
                    <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-300 outline-none hover:bg-gray-900/70"
                    placeholder="john@example.com"
                    />
                </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                    <label className="text-xs font-medium text-blue-200 ml-1 uppercase tracking-wider">Password</label>
                    <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within/input:text-blue-400 transition-colors" />
                        </div>
                        <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required
                        className="block w-full pl-11 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-300 outline-none hover:bg-gray-900/70"
                        placeholder="•••••••"
                        />
                    </div>
                    </div>
                    <div className="space-y-1">
                    <label className="text-xs font-medium text-blue-200 ml-1 uppercase tracking-wider">Confirm</label>
                    <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400 group-focus-within/input:text-blue-400 transition-colors" />
                        </div>
                        <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        required
                        className="block w-full pl-11 pr-4 py-3.5 bg-gray-900/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 transition-all duration-300 outline-none hover:bg-gray-900/70"
                        placeholder="•••••••"
                        />
                    </div>
                    </div>
                </div>

                <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-6"
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
            </div>
            
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
                    className="group inline-flex items-center gap-2 text-sm text-blue-300 hover:text-white transition-colors duration-300"
                >
                    <span className="flex items-center gap-1 font-semibold underline decoration-transparent group-hover:decoration-blue-400 underline-offset-4 transition-all">
                        Sign In instead <Sparkles className="w-3 h-3 text-indigo-300" />
                    </span>
                </Link>
            </div>

        </div>
      </div>
    </div>
  );
}
