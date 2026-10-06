'use client';

import { useState } from 'react';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'Paystack',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const totalAmount = total + 2500 + Math.round(total * 0.07);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async () => {
    if (!form.name || !form.contact || !form.address || !form.city) {
      setMessage('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      if (form.paymentMethod === 'Paystack') {
        const res = await fetch('/api/payments/paystack', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: form.email,
            amount: totalAmount * 100,
            reference: `HR-${Date.now()}`,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Payment failed.');

        setMessage('Order placed successfully! Redirecting to payment...');
        setTimeout(() => {
          clear();
          // In production, redirect to Paystack payment page
          window.location.href = `/order-confirmation/${data.reference}`;
        }, 2000);
      } else if (form.paymentMethod === 'Bank transfer') {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contact: form.contact,
            items: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
            total: totalAmount,
          }),
        });

        const order = await res.json();
        if (!res.ok) throw new Error(order.error || 'Order creation failed.');

        setMessage('Order created! Please make bank transfer.');
        clear();
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F7F1E7]">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-black">Your cart is empty</h1>
          <Link href="/shop" className="rounded-full bg-[#C9A227] px-6 py-3 font-bold text-[#0E1B2A]">
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F1E7] p-6 text-[#0E1B2A]">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-8 shadow-xl">
        <h1 className="font-display text-4xl font-black">Secure checkout</h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.5fr]">
          <section className="space-y-6">
            <div className="rounded-[1.5rem] bg-[#F7F1E7] p-5">
              <h2 className="mb-4 text-2xl font-bold">Shipping information</h2>
              <div className="space-y-3">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#C9A227]/30 bg-white px-4 py-3"
                  placeholder="Full name"
                />
                <input
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#C9A227]/30 bg-white px-4 py-3"
                  placeholder="Phone number"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#C9A227]/30 bg-white px-4 py-3"
                  placeholder="Email address"
                />
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#C9A227]/30 bg-white px-4 py-3"
                  placeholder="Street address"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#C9A227]/30 bg-white px-4 py-3"
                    placeholder="City"
                  />
                  <input
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#C9A227]/30 bg-white px-4 py-3"
                    placeholder="Postal code"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-[#F7F1E7] p-5">
              <h2 className="mb-4 text-2xl font-bold">Payment method</h2>
              <div className="space-y-3">
                {['Paystack', 'Stripe', 'Flutterwave', 'PayPal', 'Bank transfer'].map((method) => (
                  <label key={method} className="flex items-center gap-3 rounded-xl bg-white p-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={form.paymentMethod === method}
                      onChange={handleChange}
                    />
                    <span className="font-semibold">{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <aside className="rounded-[1.5rem] bg-[#0E1B2A] p-6 text-[#F7F1E7] shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Order summary</h2>
            <div className="mb-4 max-h-64 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between border-b border-white/10 pb-3">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₦2,500</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₦{Math.round(total * 0.07).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-2xl font-black">
                <span>Total</span>
                <span>₦{totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-6 w-full rounded-full bg-[#C9A227] px-4 py-3 font-bold text-[#0E1B2A] disabled:opacity-60"
            >
              {loading ? 'Processing...' : 'Complete order'}
            </button>

            {message && <p className="mt-3 rounded-xl bg-white/10 p-3 text-sm">{message}</p>}
          </aside>
        </div>
      </div>
    </main>
  );
}
