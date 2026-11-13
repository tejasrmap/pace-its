'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    // Check session
    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) {
          router.push('/admin/login');
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {
        router.push('/admin/login');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pace_user');
    }
    router.push('/admin/login');
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#073B60] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-600">Verifying administrator session...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: '📊' },
    { label: 'Pages (343)', href: '/admin/pages', icon: '📄' },
    { label: 'Admissions Enquiries', href: '/admin/admissions', icon: '🎓' },
    { label: 'Departments', href: '/admin/departments', icon: '🏛️' },
    { label: 'News & Ticker', href: '/admin/news', icon: '📢' },
    { label: 'Audit Trail', href: '/admin/audit-logs', icon: '🛡️' },
    { label: 'System Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-[#073B60] text-white h-16 flex items-center justify-between px-6 border-b border-[#052D49] shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#E9AC21] text-[#073B60] rounded-lg flex items-center justify-center font-bold text-lg font-serif shadow">
              P
            </div>
            <div>
              <span className="font-heading text-lg font-bold tracking-wide uppercase">PACE ITS</span>
              <span className="ml-2 text-xs bg-white/10 px-2 py-0.5 rounded text-amber-300 font-medium tracking-normal">ADMIN CMS</span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition flex items-center gap-1.5 font-medium border border-white/20"
          >
            <span>🌐 View Public Site</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>

          {user && (
            <div className="flex items-center gap-3 pl-3 border-l border-white/20">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold leading-tight">{user.name}</div>
                <div className="text-[10px] text-amber-300 font-medium">
                  {user.roles?.[0] || 'Administrator'}
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Sign Out"
                className="text-xs bg-red-600/80 hover:bg-red-600 text-white px-2.5 py-1.5 rounded transition font-medium"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Container with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-300 p-4 flex flex-col justify-between hidden md:flex shrink-0 border-r border-slate-800">
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
                Administration
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                        active
                          ? 'bg-[#E9AC21] text-[#073B60] font-bold shadow'
                          : 'hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
                Institutional Context
              </div>
              <div className="bg-slate-800/60 rounded-lg p-3 text-xs text-slate-400 space-y-1.5 border border-slate-800">
                <div className="flex justify-between">
                  <span>Autonomous Code:</span>
                  <span className="font-semibold text-slate-200">PACE</span>
                </div>
                <div className="flex justify-between">
                  <span>Accreditation:</span>
                  <span className="font-semibold text-emerald-400">NAAC A+</span>
                </div>
                <div className="flex justify-between">
                  <span>Affiliation:</span>
                  <span className="font-semibold text-slate-200">JNTUK</span>
                </div>
                <div className="flex justify-between">
                  <span>Canonical Routes:</span>
                  <span className="font-semibold text-amber-400">343 / 343</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-600 text-center border-t border-slate-800 pt-3">
            GT InnoX LLP © 2026<br />Institutional Platform v4.0
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

