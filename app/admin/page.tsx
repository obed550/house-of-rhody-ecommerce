"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminGuard } from '@/components/AdminGuard';

interface DashboardData {
  stats: {
    totalSales: number;
    ordersToday: number;
    totalCustomers: number;
    totalOrders: number;
    paidOrders: number;
  };
  recentOrders: Array<{
    id: string;
    customerName: string;
    total: number;
    status: string;
    date: string;
  }>;
}

function AdminDashboardContent() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/admin/dashboard');
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Error loading dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#F7F1E7]">
      {/* Header */}
      <header className="bg-[#0E1B2A] text-[#F7F1E7] px-4 py-4 shadow-lg sticky top-0 z-50">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black">🏠 Admin Dashboard</h1>
            <p className="text-sm text-[#C9A227]">House of Rhody</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">👋 {user?.name || 'Admin'}</span>
            <button
              onClick={handleLogout}
              className="text-sm bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#4A2E1F] font-semibold">⏳ Loading dashboard...</p>
          </div>
        ) : data ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-[#C9A227]">
                <p className="text-[#4A2E1F] text-sm font-semibold mb-2">Total Sales</p>
                <p className="text-3xl font-black text-[#0E1B2A]">₦{data.stats.totalSales.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500">
                <p className="text-[#4A2E1F] text-sm font-semibold mb-2">Orders Today</p>
                <p className="text-3xl font-black text-green-600">{data.stats.ordersToday}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-blue-500">
                <p className="text-[#4A2E1F] text-sm font-semibold mb-2">Total Orders</p>
                <p className="text-3xl font-black text-blue-600">{data.stats.totalOrders}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
                <p className="text-[#4A2E1F] text-sm font-semibold mb-2">Customers</p>
                <p className="text-3xl font-black text-purple-600">{data.stats.totalCustomers}</p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-orange-500">
                <p className="text-[#4A2E1F] text-sm font-semibold mb-2">Paid Orders</p>
                <p className="text-3xl font-black text-orange-600">{data.stats.paidOrders}</p>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-[#0E1B2A] text-[#F7F1E7] px-6 py-4">
                <h2 className="text-lg font-bold">📋 Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#F7F1E7] border-b-2 border-[#C9A227]">
                    <tr>
                      <th className="px-6 py-3 text-left font-semibold text-[#4A2E1F]">Order ID</th>
                      <th className="px-6 py-3 text-left font-semibold text-[#4A2E1F]">Customer</th>
                      <th className="px-6 py-3 text-left font-semibold text-[#4A2E1F]">Date</th>
                      <th className="px-6 py-3 text-left font-semibold text-[#4A2E1F]">Amount</th>
                      <th className="px-6 py-3 text-left font-semibold text-[#4A2E1F]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentOrders.map((order, idx) => (
                      <tr key={order.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#F7F1E7]'}>
                        <td className="px-6 py-4 font-mono text-xs text-[#4A2E1F]">
                          {order.id.slice(0, 8)}
                        </td>
                        <td className="px-6 py-4 text-[#4A2E1F]">{order.customerName}</td>
                        <td className="px-6 py-4 text-[#4A2E1F]">{order.date}</td>
                        <td className="px-6 py-4 font-bold text-[#0E1B2A]">₦{order.total.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              order.status === 'PAID'
                                ? 'bg-green-100 text-green-700'
                                : order.status === 'SHIPPED'
                                  ? 'bg-blue-100 text-blue-700'
                                  : order.status === 'DELIVERED'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-red-600 font-semibold">❌ Failed to load dashboard</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <AdminDashboardContent />
    </AdminGuard>
  );
}
