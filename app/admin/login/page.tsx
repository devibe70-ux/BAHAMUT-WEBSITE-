'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@devibe.in');
  const [password, setPassword] = useState('admin123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('bahamut_admin_token', 'jwt_admin_secret_token_2026');
    }
    router.push('/admin/orders');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-20 font-sans">
      <div className="glass-card p-8 rounded-3xl space-y-6">
        <div className="text-center space-y-2">
          <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl w-fit mx-auto border border-blue-500/20 shadow-lg">
            <Shield className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-black text-white">De Vibe Seller Portal</h1>
          <p className="text-xs text-slate-400 font-medium">
            Order Fulfillment, AWB Generation & AI Cataloging
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[11px] font-black text-slate-300 uppercase tracking-widest mb-1">Admin Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full min-h-[48px] px-3.5 text-xs font-semibold bg-slate-900 text-white border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-slate-300 uppercase tracking-widest mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full min-h-[48px] px-3.5 text-xs font-semibold bg-slate-900 text-white border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full min-h-[52px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all glow-blue"
          >
            <Lock className="w-4 h-4 text-emerald-400" /> Sign In to Seller Dashboard
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-400 font-semibold">
          © 2026 BahaMut Apparel. Marketed, billed, and fulfilled by De Vibe.
        </p>
      </div>
    </div>
  );
}
