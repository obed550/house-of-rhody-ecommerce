'use client';

import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, clear } = useCart();

  return (
    <main className="min-h-screen bg-[#F7F1E7] p-6 text-[#0E1B2A]">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-4xl font-black">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="mt-8 rounded-[1.5rem] bg-white p-8 text-center shadow-md">
            <p className="mb-4 text-lg">Your cart is empty</p>
            <Link href="/shop" className="rounded-full bg-[#C9A227] px-6 py-3 font-bold text-[#0E1B2A]">
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.4fr]">
            <section className="space-y-4">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-4 rounded-[1.5rem] bg-white p-5 shadow-md">
                  <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-[#efc9d1] via-[#f7f1e7] to-[#f4d35e] text-4xl">
                    {item.image}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-[#4A2E1F]">₦{item.price.toLocaleString()}</p>

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="rounded-lg bg-[#F7F1E7] px-3 py-1 font-bold"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="rounded-lg bg-[#F7F1E7] px-3 py-1 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-[#C9A227]">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="mt-2 text-sm text-red-500 underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </section>

            <aside className="rounded-[1.5rem] bg-[#0E1B2A] p-6 text-[#F7F1E7] shadow-md">
              <h2 className="mb-4 text-2xl font-bold">Order Summary</h2>
              <div className="space-y-3 border-b border-white/10 pb-4">
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
              </div>

              <div className="mt-4 flex justify-between text-2xl font-black">
                <span>Total</span>
                <span>₦{(total + 2500 + Math.round(total * 0.07)).toLocaleString()}</span>
              </div>

              <div className="mt-6 space-y-3">
                <Link href="/checkout" className="block rounded-full bg-[#C9A227] px-4 py-3 text-center font-bold text-[#0E1B2A]">
                  Proceed to checkout
                </Link>
                <button onClick={clear} className="w-full rounded-full border border-[#C9A227] px-4 py-3 font-bold text-[#C9A227]">
                  Clear cart
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
