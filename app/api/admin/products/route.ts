import { NextResponse } from 'next/server';
import { getAllProducts, addProduct, updateProduct, deleteProduct, listOrders } from '@/lib/store';

export async function GET() {
  return NextResponse.json({ products: getAllProducts(), orders: listOrders() });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const product = addProduct({
      slug: payload.slug,
      name: payload.name,
      category: payload.category,
      description: payload.description,
      price: Number(payload.price),
      stock: Number(payload.stock),
      image: payload.image || '👗',
      featured: Boolean(payload.featured),
    });

    return NextResponse.json({ message: 'Product created.', product });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}
