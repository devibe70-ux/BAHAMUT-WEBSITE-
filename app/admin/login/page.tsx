'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('bahamut.india@gmail.com');
  const [password, setPassword] = useState('DeVibe@Ahmedabad2026');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const performLogin = (userEmail: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bahamut_admin_token', 'jwt_devibe_admin_token_2026');
      localStorage.setItem('bahamut_admin_user', userEmail);
    }
    setSuccess(true);
    setTimeout(() => {
      router.push('/admin/orders');
    }, 500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validEmails = [
      'bahamut.india@gmail.com',
      'devibe70@gmail.com',
      'admin@devibe.in',
      'seller@devibe.in',
      'fulfillment@devibe.in',
      'admin'
    ];

    if (validEmails.includes(email.trim().toLowerCase()) || password.length >= 4) {
      performLogin(email);
    } else {
      setError('Please enter your seller email address or click "1-Click Direct Access" below.');
    }
  };

  const handleDirectOpenAccess = () => {
    performLogin('bahamut.india@gmail.com');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 font-sans">
      <div className="bg-white p-6 sm:p-8 border border-[#E5E5E5] space-y-6 shadow-sm">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="p-3 bg-[#F7F7F8] border border-[#E5E5E5] text-[#111111] w-fit mx-auto">
            <ShieldCheck className="w-8 h-8 text-[#111111]" />
          </div>
          <span className="text-[10px] font-bold text-[#111111] bg-[#F7F7F8] px-3 py-1 uppercase tracking-wider inline-block border border-[#E5E5E5]">
            DE VIBE SELLER PORTAL
          </span>
          <h1 className="text-2xl font-black text-[#111111]">Seller Dashboard Login</h1>
          <p className="text-xs text-[#666666] font-medium">
            Order Fulfillment, AWB Tracking, MyBillBook Sync & Product Feed Importer
          </p>
        </div>

        {/* 1-Click Open Access Button */}
        <div className="bg-[#F7F7F8] p-4 border border-[#E5E5E5] text-xs space-y-3">
          <div className="flex items-center justify-between text-[#111111] font-bold uppercase tracking-wider text-[10px]">
            <span>Open Access Mode Active</span>
            <span className="bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 border border-emerald-300">
              OPEN
            </span>
          </div>
          <p className="text-[#666666] leading-relaxed">
            Click below for instant 1-click access to your Seller Dashboard without password prompt:
          </p>
          <button
            type="button"
            onClick={handleDirectOpenAccess}
            className="w-full min-h-[48px] bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4" /> 1-Click Open Access to Seller Portal <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 p-3.5 text-xs font-bold text-rose-800">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Open access authenticated. Redirecting to Seller Portal...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 pt-2 border-t border-[#E5E5E5]">
          <div>
            <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest mb-1">
              Seller Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="bahamut.india@gmail.com"
              className="w-full min-h-[48px] px-3.5 text-xs font-semibold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full min-h-[48px] px-3.5 text-xs font-semibold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <button
            type="submit"
            className="w-full min-h-[52px] bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
          >
            <Lock className="w-4 h-4 text-white" /> Sign In to De Vibe Portal
          </button>
        </form>

        <p className="text-center text-[11px] text-[#666666] font-medium">
          Official Merchant: DE VIBE (Ambawadi, Ahmedabad - 380015)
        </p>
      </div>
    </div>
  );
}
