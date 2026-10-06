"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/lib/auth';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        router.push('/login?redirect=/admin');
        return;
      }

      const user = localStorage.getItem('user');
      if (!user) {
        router.push('/login?redirect=/admin');
        return;
      }

      try {
        const userData = JSON.parse(user);

        // Verify user is admin and is Rhoda
        if (userData.role !== 'ADMIN' || userData.contact !== '0599861653') {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          router.push('/login?error=unauthorized');
          return;
        }

        setAuthenticated(true);
      } catch (error) {
        router.push('/login?error=invalid');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F1E7]">
        <div className="text-center">
          <div className="mb-4 text-4xl">⏳</div>
          <p className="text-[#4A2E1F] font-semibold">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
