import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/store';

export async function GET() {
  return NextResponse.json({ products: getAllProducts() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const product = body;
    return NextResponse.json({ message: 'Saved product', product });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }
}
