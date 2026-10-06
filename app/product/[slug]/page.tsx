import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/lib/data';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-rhody-cream p-6 text-rhody-navy">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-white p-8 shadow-luxury">
        <Link href="/shop" className="mb-6 inline-block text-rhody-gold underline underline-offset-8">← Back to shop</Link>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex h-[480px] items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-rhody-blush via-rhody-cream to-rhody-yellow text-8xl">
            {product.icon}
          </div>

          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-rhody-gold">{product.category}</div>
            <h1 className="font-display text-5xl font-black">{product.name}</h1>
            <p className="mt-4 text-lg text-rhody-brown">{product.description}</p>

            <div className="mt-6 space-y-3 text-rhody-brown">
              <p><span className="font-bold text-rhody-navy">Size:</span> S, M, L, XL</p>
              <p><span className="font-bold text-rhody-navy">Material:</span> Premium cotton blend</p>
              <p><span className="font-bold text-rhody-navy">Delivery:</span> 3-5 business days</p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="text-4xl font-black">₦{product.price.toLocaleString()}</span>
              <span className="text-xl text-rhody-brown line-through">₦{(product.price + 8000).toLocaleString()}</span>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="rounded-full bg-rhody-gold px-6 py-3 font-bold text-rhody-navy">Add to cart</button>
              <Link href="/checkout" className="rounded-full bg-rhody-navy px-6 py-3 font-bold text-rhody-cream">Buy now</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
