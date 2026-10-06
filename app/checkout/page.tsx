import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-rhody-cream p-6 text-rhody-navy">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-8 shadow-luxury">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-rhody-gold">Secure checkout</p>
            <h1 className="font-display text-5xl font-black">Checkout</h1>
          </div>
          <Link href="/shop" className="rounded-full bg-rhody-navy px-5 py-3 font-bold text-rhody-cream">Continue shopping</Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="space-y-6">
            <div className="rounded-[1.5rem] bg-rhody-cream p-5">
              <h2 className="mb-4 text-2xl font-bold">Shipping address</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <input className="rounded-xl bg-white p-3" placeholder="First name" />
                <input className="rounded-xl bg-white p-3" placeholder="Last name" />
                <input className="md:col-span-2 rounded-xl bg-white p-3" placeholder="Street address" />
                <input className="rounded-xl bg-white p-3" placeholder="City" />
                <input className="rounded-xl bg-white p-3" placeholder="Postal code" />
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-rhody-cream p-5">
              <h2 className="mb-4 text-2xl font-bold">Payment methods</h2>
              <div className="space-y-3">
                {['Paystack', 'Stripe', 'Flutterwave', 'PayPal', 'Bank transfer'].map((method) => (
                  <label key={method} className="flex items-center gap-3 rounded-xl bg-white p-3">
                    <input type="radio" name="payment" defaultChecked={method === 'Paystack'} />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          <aside className="rounded-[1.5rem] bg-rhody-navy p-6 text-rhody-cream">
            <h2 className="mb-4 text-2xl font-bold">Order summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between"><span>Royal Kids Set</span><span>₦25,000</span></div>
              <div className="flex justify-between"><span>Classic Women Blazer</span><span>₦48,000</span></div>
              <div className="flex justify-between border-t border-white/10 pt-3"><span>Subtotal</span><span>₦73,000</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>₦3,500</span></div>
              <div className="flex justify-between text-xl font-black"><span>Total</span><span>₦76,500</span></div>
            </div>
            <button className="mt-6 w-full rounded-full bg-rhody-gold px-4 py-3 font-bold text-rhody-navy">Pay now</button>
          </aside>
        </div>
      </div>
    </main>
  );
}
