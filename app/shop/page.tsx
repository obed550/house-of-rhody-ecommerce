import Link from 'next/link';
import { products } from '@/lib/data';

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-rhody-cream text-rhody-navy">
      <header className="bg-rhody-navy px-4 py-6 text-rhody-cream">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="font-display text-3xl font-black">House of Rhody</Link>
          <nav className="flex gap-6 text-sm">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/checkout">Checkout</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-rhody-gold">All collections</p>
            <h1 className="font-display text-5xl font-black">Shop clothing</h1>
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-rhody-brown shadow-md">
            {products.length} products
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-[1.5rem] bg-white shadow-lg">
              <div className="flex h-64 items-center justify-center bg-gradient-to-br from-rhody-blush via-rhody-cream to-rhody-yellow text-6xl">
                {product.icon}
              </div>
              <div className="p-5">
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-rhody-gold">{product.category}</div>
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="mt-2 text-sm text-rhody-brown">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xl font-black">₦{product.price.toLocaleString()}</span>
                  <Link href={`/product/${product.slug}`} className="rounded-full bg-rhody-navy px-4 py-2 text-sm font-bold text-rhody-cream">
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
