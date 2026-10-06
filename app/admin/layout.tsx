"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      router.push('/login');
      return;
    }

    const userData = JSON.parse(userStr);
    if (userData.role !== 'ADMIN') {
      router.push('/');
      return;
    }

    setUser(userData);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F7F1E7]">
      <nav className="bg-[#0E1B2A] text-[#F7F1E7] px-4 py-4 shadow-lg">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/admin" className="text-xl font-black">
            Admin Dashboard
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-sm">Welcome, {user.name}</span>
            <Link href="/" className="text-sm underline">
              View store
            </Link>
            <button onClick={handleLogout} className="text-sm text-[#C9A227] underline">
              Logout
            </button>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
