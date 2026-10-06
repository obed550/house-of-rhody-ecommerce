import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'House of Rhody',
  description: 'Fashion for every age. House of Rhody sells premium clothing for all ages and families.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: '/logo.svg',
    apple: '/logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
