"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Refresh on component mount to get latest user data
    const handleRefresh = () => {
      window.location.reload();
    };

    // Listen for storage changes (logout from another tab)
    window.addEventListener('storage', handleRefresh);
    return () => window.removeEventListener('storage', handleRefresh);
  }, []);

  return <>{children}</>;
}
