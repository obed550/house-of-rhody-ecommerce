"use client";

import { useEffect, useState } from 'react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((res) => res.json())
      .then((data) => setOrders(data.orders || []));
  }, []);

  return (
    <main className="min-h-screen bg-rhody-cream p-6 text-rhody-navy">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-4xl font-black">Order management</h1>

        <div className="mt-8 overflow-hidden rounded-[1.5rem] bg-white shadow-md">
          <table className="w-full text-left">
            <thead className="bg-rhody-navy text-rhody-cream">
              <tr>
                <th className="p-4">Order</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Status</th>
                <th className="p-4">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-rhody-gold/20">
                  <td className="p-4 font-bold">{order.id}</td>
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4"><span className="rounded-full bg-rhody-gold px-2 py-1 text-xs font-bold text-rhody-navy">{order.status}</span></td>
                  <td className="p-4">₦{Number(order.total).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
