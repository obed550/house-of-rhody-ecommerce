"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/context/CartContext';

export default function Navbar() {
  const router = useRouter();
  const { items } = useCart();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) setUser(JSON.parse(userStr));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <header className="bg-[#0E1B2A] text-[#F7F1E7] py-5 shadow-lg sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-black tracking-wide">
          🏠 House of Rhody
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          {user?.role === 'ADMIN' && <Link href="/admin">Admin</Link>}
          {!user && <Link href="/login">Sign in</Link>}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <span className="text-2xl">🛒</span>
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm">{user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-full bg-[#C9A227] px-4 py-2 text-sm font-bold text-[#0E1B2A]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
