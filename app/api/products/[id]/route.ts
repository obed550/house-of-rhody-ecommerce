import { NextResponse } from 'next/server';
import { getAllProducts, getProductBySlug, updateProduct, deleteProduct } from '@/lib/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (slug) {
    const product = getProductBySlug(slug);
    return NextResponse.json(product ?? null);
  }

  return NextResponse.json(getAllProducts());
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const product = updateProduct(body.id, body);
    return NextResponse.json({ message: 'Product updated.', product });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Product id is required.' }, { status: 400 });
    }

    const deleted = deleteProduct(id);
    return NextResponse.json({ success: deleted });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
