import Link from 'next/link';
import BrandLogo from '@/components/BrandLogo';
import InstallPwaButton from '@/components/InstallPwaButton';
import { featuredProducts } from '@/lib/data';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-rhody-cream text-rhody-navy">
      <header className="bg-rhody-navy text-rhody-cream py-5 shadow-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <BrandLogo compact />
            <div>
              <p className="text-xl font-black tracking-wide">HOUSE OF RHODY</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/signup">Sign up</Link>
            <Link href="/admin">Admin</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>

          <InstallPwaButton />
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-rhody-gold">Wear confidence</p>
            <h1 className="font-display text-5xl font-black leading-none text-rhody-navy md:text-7xl">
              Fashion for every age.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-rhody-brown">
              Premium garments crafted for kids, women, men, and family wardrobes. Tailored comfort, polished style, and everyday elegance.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/shop" className="rounded-full bg-rhody-gold px-6 py-3 font-bold text-rhody-navy shadow-lg transition hover:scale-[1.02]">
                Shop now
              </Link>
              <Link href="/signup" className="rounded-full bg-rhody-navy px-6 py-3 font-bold text-rhody-cream transition hover:opacity-95">
                Create account
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-rhody-blush via-rhody-cream to-rhody-yellow p-6 shadow-luxury">
            <div className="rounded-[2rem] border border-rhody-gold/40 bg-white/40 p-4 backdrop-blur-sm">
              <BrandLogo />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-rhody-navy py-16 text-rhody-cream">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-4xl font-black">Featured collections</h2>
            <Link href="/shop" className="text-rhody-yellow underline underline-offset-8">
              View all
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <article key={product.id} className="overflow-hidden rounded-[1.5rem] bg-white text-rhody-navy shadow-lg">
                <div className="flex h-72 items-center justify-center bg-gradient-to-br from-rhody-blush via-rhody-cream to-rhody-yellow">
                  <div className="text-6xl">{product.icon}</div>
                </div>
                <div className="p-5">
                  <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-rhody-gold">{product.category}</div>
                  <h3 className="text-2xl font-bold">{product.name}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-black">₦{product.price.toLocaleString()}</span>
                    <Link href={`/product/${product.slug}`} className="rounded-full bg-rhody-navy px-4 py-2 text-sm font-bold text-rhody-cream">
                      View item
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: 'Premium clothing', text: 'Curated apparel for every lifestyle and every age group.' },
            { title: 'Secure payments', text: 'Paystack, Stripe, Flutterwave and local transfer options supported.' },
            { title: 'Fast deliveries', text: 'Easy shipping and order updates through the customer dashboard.' },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.5rem] border border-rhody-gold/40 bg-white p-6 shadow-md">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rhody-gold text-xl font-black text-rhody-navy">
                ✦
              </div>
              <h3 className="mb-2 text-2xl font-bold">{item.title}</h3>
              <p className="text-rhody-brown">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
