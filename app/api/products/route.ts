import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'House of Rhody products API is ready.',
    products: [
      {
        id: 'kids-set',
        name: 'Royal Kids Set',
        category: 'Kids',
        price: 25000,
        slug: 'royal-kids-set',
        icon: '👗',
        description: 'A comfortable and stylish kids outfit for event wear and special occasions.',
      },
      {
        id: 'women-blazer',
        name: 'Classic Women Blazer',
        category: 'Women',
        price: 48000,
        slug: 'classic-women-blazer',
        icon: '🧥',
        description: 'Elegant tailored piece for office, meetings, and classy dinners.',
      },
      {
        id: 'men-suit',
        name: 'Executive Men Suit',
        category: 'Men',
        price: 55000,
        slug: 'executive-men-suit',
        icon: '🕴️',
        description: 'Sharp executive look designed for confidence and comfort.',
      },
      {
        id: 'plus-size-gown',
        name: 'Plus Size Evening Gown',
        category: 'Plus Size',
        price: 64000,
        slug: 'plus-size-evening-gown',
        icon: '🌸',
        description: 'Graceful fit with premium texture and a feminine silhouette.',
      },
    ],
  });
}
