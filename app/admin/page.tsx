import Link from 'next/link';

const stats = [
  { label: 'Total sales', value: '₦4.8M' },
  { label: 'Orders today', value: '182' },
  { label: 'Customers', value: '1.2K' },
  { label: 'Pending payouts', value: '₦760K' },
];

const orders = [
  { id: 'HR-1024', customer: 'Ada Nwosu', status: 'Paid', amount: '₦48,000' },
  { id: 'HR-1025', customer: 'Tobi Eze', status: 'Processing', amount: '₦26,500' },
  { id: 'HR-1026', customer: 'Grace M.', status: 'Shipped', amount: '₦72,000' },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-rhody-cream p-6 text-rhody-navy">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-rhody-gold">Admin panel</p>
            <h1 className="font-display text-5xl font-black">House of Rhody dashboard</h1>
          </div>
          <Link href="/" className="rounded-full bg-rhody-navy px-5 py-3 font-bold text-rhody-cream">Storefront</Link>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[1.5rem] bg-white p-5 shadow-md">
              <div className="text-sm text-rhody-brown">{stat.label}</div>
              <div className="mt-2 text-3xl font-black">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="rounded-[1.5rem] bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Recent orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-xl bg-rhody-cream p-4">
                  <div>
                    <div className="font-bold">{order.id}</div>
                    <p className="text-sm text-rhody-brown">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-rhody-gold">{order.amount}</div>
                    <div className="text-sm text-rhody-brown">{order.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[1.5rem] bg-rhody-navy p-6 text-rhody-cream shadow-md">
              <h3 className="mb-3 text-xl font-bold">Payment settings</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <label className="block text-rhody-yellow">Paystack public key</label>
                  <input className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 p-2 text-white" placeholder="pk_test_..." />
                </div>
                <div>
                  <label className="block text-rhody-yellow">Stripe public key</label>
                  <input className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 p-2 text-white" placeholder="pk_live_..." />
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-white p-6 shadow-md">
              <h3 className="mb-3 text-xl font-bold">Quick actions</h3>
              <div className="space-y-3 text-sm">
                <button className="w-full rounded-full bg-rhody-gold px-4 py-3 font-bold text-rhody-navy">Add product</button>
                <button className="w-full rounded-full bg-rhody-navy px-4 py-3 font-bold text-rhody-cream">Manage inventory</button>
                <button className="w-full rounded-full border border-rhody-gold px-4 py-3 font-bold text-rhody-brown">Export sales</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
