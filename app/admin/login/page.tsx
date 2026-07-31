'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Key, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@devibe.in');
  const [password, setPassword] = useState('DeVibe@Ahmedabad2026');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Predefined De Vibe Seller Credentials
    const validEmails = ['admin@devibe.in', 'seller@devibe.in', 'fulfillment@devibe.in'];
    const validPassword = 'DeVibe@Ahmedabad2026';

    if (validEmails.includes(email.trim().toLowerCase()) && password === validPassword) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('bahamut_admin_token', 'jwt_devibe_admin_token_2026');
        localStorage.setItem('bahamut_admin_user', email);
      }
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/orders');
      }, 800);
    } else {
      setError('Invalid credentials. Use email: admin@devibe.in and password: DeVibe@Ahmedabad2026');
    }
  };

  const fillDefaultCredentials = () => {
    setEmail('admin@devibe.in');
    setPassword('DeVibe@Ahmedabad2026');
    setError('');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-20 font-sans">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit mx-auto border border-blue-200 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
          </div>
          <span className="text-[10px] font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider inline-block">
            DE VIBE SELLER PORTAL
          </span>
          <h1 className="text-2xl font-black text-slate-900">Seller Dashboard Login</h1>
          <p className="text-xs text-slate-500 font-semibold">
            Order Fulfillment, AWB Shipping & AI Product Publisher
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-2xl text-xs font-bold text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Authentication successful. Redirecting to Seller Portal...</span>
          </div>
        )}

        {/* Credentials Display Box */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5 font-medium">
          <div className="flex items-center justify-between text-slate-700 font-black uppercase tracking-wider text-[10px]">
            <span>Official Seller Credentials</span>
            <button
              type="button"
              onClick={fillDefaultCredentials}
              className="text-blue-700 hover:underline font-extrabold"
            >
              Auto-Fill Credentials
            </button>
          </div>
          <p className="text-slate-600">
            Email: <strong className="text-slate-900 font-black">admin@devibe.in</strong>
          </p>
          <p className="text-slate-600">
            Password: <strong className="text-slate-900 font-black">DeVibe@Ahmedabad2026</strong>
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
              Seller Email Address *
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="admin@devibe.in"
              className="w-full min-h-[48px] px-3.5 text-xs font-semibold bg-white text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-700 uppercase tracking-widest mb-1">
              Secret Access Password *
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
              className="w-full min-h-[48px] px-3.5 text-xs font-semibold bg-white text-slate-900 border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full min-h-[52px] bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Lock className="w-4 h-4 text-emerald-400" /> Sign In to De Vibe Portal
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-500 font-semibold pt-2">
          © 2026 BahaMut Apparel. Marketed, billed, and fulfilled by De Vibe.
        </p>
      </div>
    </div>
  );
}
