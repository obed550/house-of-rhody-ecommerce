import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - House of Rhody',
  description: 'Restricted admin dashboard',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
