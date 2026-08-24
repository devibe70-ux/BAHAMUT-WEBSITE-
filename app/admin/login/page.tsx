'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validEmails = [
      'bahamut.india@gmail.com',
      'devibe70@gmail.com',
      'admin@devibe.in',
      'seller@devibe.in'
    ];
    const validPassword = 'DeVibe@2026!';

    const inputEmail = email.trim().toLowerCase();

    if ((validEmails.includes(inputEmail) || inputEmail === 'admin') && (password === validPassword || password === 'DeVibe@Ahmedabad2026')) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('bahamut_admin_token', 'jwt_devibe_admin_token_2026');
        localStorage.setItem('bahamut_admin_user', inputEmail);
      }
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/orders');
      }, 500);
    } else {
      setError('Access denied. Invalid merchant email or secret passcode.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 font-sans">
      <div className="bg-white p-6 sm:p-8 border border-[#E5E5E5] space-y-6 shadow-sm">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="p-3 bg-[#F7F7F8] border border-[#E5E5E5] text-[#111111] w-fit mx-auto">
            <ShieldCheck className="w-8 h-8 text-[#111111]" />
          </div>
          <h1 className="text-2xl font-black text-[#111111]">Private Merchant Portal</h1>
          <p className="text-xs text-[#666666] font-medium">
            Restricted Access • Authorized Merchant Administration Only
          </p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 p-3.5 text-xs font-bold text-rose-800">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 border border-emerald-200 p-3.5 text-xs font-bold text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Authenticated successfully. Redirecting to Merchant Portal...</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest mb-1">
              Merchant Email *
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Merchant Email"
              className="w-full min-h-[48px] px-3.5 text-xs font-semibold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-[#111111] uppercase tracking-widest mb-1">
              Secret Merchant Passcode *
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••••••"
              className="w-full min-h-[48px] px-3.5 text-xs font-semibold bg-[#F7F7F8] text-[#111111] border border-[#E5E5E5] focus:outline-none focus:border-[#111111]"
            />
          </div>

          <button
            type="submit"
            className="w-full min-h-[52px] bg-[#111111] hover:bg-black text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all"
          >
            <Lock className="w-4 h-4 text-white" /> Secure Merchant Login
          </button>
        </form>

        <p className="text-center text-[11px] text-[#666666] font-medium pt-2">
          Protected Portal &copy; 2026 DE VIBE. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
