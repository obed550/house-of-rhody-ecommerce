'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type DashboardStats = {
  totalSales: number;
  ordersToday: number;
  totalCustomers: number;
  pendingPayouts: number;
  recentOrders: any[];
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    ordersToday: 0,
    totalCustomers: 0,
    pendingPayouts: 0,
    recentOrders: [],
  });
  const [paystackKeys, setPaystackKeys] = useState({
    publicKey: '',
    secretKey: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/admin/dashboard');
        const data = await res.json();
        setStats(data);
        setPaystackKeys({
          publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '',
          secretKey: process.env.PAYSTACK_SECRET_KEY || '',
        });
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleSaveKeys = async () => {
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paystackKeys),
    });

    if (res.ok) {
      alert('Payment keys saved successfully!');
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F1E7] p-6 text-[#0E1B2A]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C9A227]">Admin panel</p>
            <h1 className="font-display text-5xl font-black">Dashboard</h1>
          </div>
          <Link href="/" className="rounded-full bg-[#0E1B2A] px-5 py-3 font-bold text-[#F7F1E7]">
            View storefront
          </Link>
        </div>

        {/* Stats grid */}
        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {[
            { label: 'Total sales', value: `₦${stats.totalSales.toLocaleString()}` },
            { label: 'Orders today', value: stats.ordersToday },
            { label: 'Customers', value: stats.totalCustomers },
            { label: 'Pending payouts', value: `₦${stats.pendingPayouts.toLocaleString()}` },
          ].map((stat) => (
            <div key={stat.label} className="rounded-[1.5rem] bg-white p-5 shadow-md">
              <div className="text-sm text-[#4A2E1F]">{stat.label}</div>
              <div className="mt-2 text-3xl font-black">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Recent orders section */}
          <section className="rounded-[1.5rem] bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent orders</h2>
              <Link href="/admin/orders" className="text-[#C9A227] underline underline-offset-4">
                View all
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-[#C9A227]/20">
                  <tr>
                    <th className="text-left font-bold">Order ID</th>
                    <th className="text-left font-bold">Customer</th>
                    <th className="text-left font-bold">Status</th>
                    <th className="text-right font-bold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-[#C9A227]/10">
                      <td className="py-3">
                        <span className="font-mono text-sm font-bold">{order.id}</span>
                      </td>
                      <td className="py-3">{order.customerName || order.contact}</td>
                      <td className="py-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            order.status === 'PAID'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'SHIPPED'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-bold">₦{order.total.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Settings sidebar */}
          <aside className="space-y-6">
            {/* Payment settings */}
            <div className="rounded-[1.5rem] bg-[#0E1B2A] p-6 text-[#F7F1E7] shadow-md">
              <h3 className="mb-4 text-xl font-bold">Payment settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="mb-2 block text-sm text-[#C9A227]">Paystack public key</label>
                  <input
                    value={paystackKeys.publicKey}
                    onChange={(e) => setPaystackKeys({ ...paystackKeys, publicKey: e.target.value })}
                    className="w-full rounded-lg border border-white/20 bg-white/5 p-2 text-white"
                    placeholder="pk_test_..."
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-[#C9A227]">Paystack secret key</label>
                  <input
                    value={paystackKeys.secretKey}
                    onChange={(e) => setPaystackKeys({ ...paystackKeys, secretKey: e.target.value })}
                    className="w-full rounded-lg border border-white/20 bg-white/5 p-2 text-white"
                    placeholder="sk_test_..."
                    type="password"
                  />
                </div>
                <button
                  onClick={handleSaveKeys}
                  className="w-full rounded-full bg-[#C9A227] px-4 py-2 font-bold text-[#0E1B2A]"
                >
                  Save keys
                </button>
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-[1.5rem] bg-white p-6 shadow-md">
              <h3 className="mb-4 text-xl font-bold">Quick actions</h3>
              <div className="space-y-3">
                <Link
                  href="/admin/products"
                  className="block rounded-full bg-[#C9A227] px-4 py-3 text-center font-bold text-[#0E1B2A]"
                >
                  Manage products
                </Link>
                <Link
                  href="/admin/orders"
                  className="block rounded-full bg-[#0E1B2A] px-4 py-3 text-center font-bold text-[#F7F1E7]"
                >
                  View all orders
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
