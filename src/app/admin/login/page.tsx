'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Store basic info for UI
      if (typeof window !== 'undefined') {
        localStorage.setItem('pace_user', JSON.stringify(data.user));
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const setDemoCredentials = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-[#073B60] text-[#E9AC21] rounded-2xl flex items-center justify-center font-serif text-3xl font-extrabold shadow-lg border-2 border-[#E9AC21]">
            P
          </div>
        </div>
        <h2 className="text-center font-heading text-3xl font-bold tracking-tight text-[#073B60] uppercase">
          PACE ITS Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          PACE Institute of Technology & Sciences (Autonomous)
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl sm:px-10 border border-slate-200">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-2">
              <svg className="w-5 h-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                Institutional Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pace.ac.in"
                  className="block w-full px-4 py-2.5 rounded-lg border border-slate-300 shadow-sm focus:border-[#073B60] focus:ring-2 focus:ring-[#073B60]/20 text-slate-800 text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full px-4 py-2.5 rounded-lg border border-slate-300 shadow-sm focus:border-[#073B60] focus:ring-2 focus:ring-[#073B60]/20 text-slate-800 text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-[#073B60] hover:bg-[#052D49] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#073B60] transition-colors disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Sign In to Admin Portal'}
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Quick Role Login (Pre-Configured Accounts)
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setDemoCredentials('admin@pace.ac.in', 'PaceAdmin@2026!')}
                className="p-2 border border-slate-200 rounded hover:bg-slate-50 text-left font-medium text-slate-700"
              >
                <div className="font-bold text-[#073B60]">Super Admin</div>
                <div className="text-[11px] text-slate-500">admin@pace.ac.in</div>
              </button>
              <button
                type="button"
                onClick={() => setDemoCredentials('admissions@pace.ac.in', 'Admit@2026!')}
                className="p-2 border border-slate-200 rounded hover:bg-slate-50 text-left font-medium text-slate-700"
              >
                <div className="font-bold text-[#073B60]">Admissions Cell</div>
                <div className="text-[11px] text-slate-500">admissions@pace.ac.in</div>
              </button>
              <button
                type="button"
                onClick={() => setDemoCredentials('principal@pace.ac.in', 'Principal@2026!')}
                className="p-2 border border-slate-200 rounded hover:bg-slate-50 text-left font-medium text-slate-700"
              >
                <div className="font-bold text-[#073B60]">Principal</div>
                <div className="text-[11px] text-slate-500">principal@pace.ac.in</div>
              </button>
              <button
                type="button"
                onClick={() => setDemoCredentials('editor@pace.ac.in', 'Editor@2026!')}
                className="p-2 border border-slate-200 rounded hover:bg-slate-50 text-left font-medium text-slate-700"
              >
                <div className="font-bold text-[#073B60]">Content Editor</div>
                <div className="text-[11px] text-slate-500">editor@pace.ac.in</div>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-[#073B60] inline-flex items-center gap-1 font-medium"
            >
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

