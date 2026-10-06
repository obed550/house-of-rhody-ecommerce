"use client";

import { useEffect, useState } from 'react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({
    slug: '',
    name: '',
    category: 'Kids',
    description: '',
    price: '0',
    stock: '0',
    image: '👗',
  });

  useEffect(() => {
    fetch('/api/admin/products')
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []));
  }, []);

  const submit = async () => {
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const result = await res.json();
    if (res.ok) {
      setProducts((prev) => [...prev, result.product]);
      setForm({ slug: '', name: '', category: 'Kids', description: '', price: '0', stock: '0', image: '👗' });
    }
  };

  return (
    <main className="min-h-screen bg-rhody-cream p-6 text-rhody-navy">
      <div className="mx-auto max-w-6xl space-y-8">
        <h1 className="font-display text-4xl font-black">Admin product management</h1>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="rounded-[1.5rem] bg-white p-5 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Products</h2>
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between rounded-xl bg-rhody-cream p-3">
                  <div>
                    <div className="font-bold">{product.name}</div>
                    <div className="text-sm text-rhody-brown">{product.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-rhody-gold">₦{Number(product.price).toLocaleString()}</div>
                    <div className="text-sm text-rhody-brown">Stock: {product.stock}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="rounded-[1.5rem] bg-rhody-navy p-5 text-rhody-cream shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Add product</h2>
            <div className="space-y-3">
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" className="w-full rounded-xl bg-white/5 p-3 text-white" />
              <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="product-slug" className="w-full rounded-xl bg-white/5 p-3 text-white" />
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-xl bg-white/5 p-3 text-white">
                <option className="text-rhody-navy">Kids</option>
                <option className="text-rhody-navy">Women</option>
                <option className="text-rhody-navy">Men</option>
                <option className="text-rhody-navy">Teens</option>
                <option className="text-rhody-navy">Adults</option>
              </select>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="min-h-24 w-full rounded-xl bg-white/5 p-3 text-white" />
              <div className="grid grid-cols-2 gap-3">
                <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" className="w-full rounded-xl bg-white/5 p-3 text-white" />
                <input value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="Stock" className="w-full rounded-xl bg-white/5 p-3 text-white" />
              </div>
              <button onClick={submit} className="w-full rounded-full bg-rhody-gold px-4 py-3 font-bold text-rhody-navy">Save product</button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
