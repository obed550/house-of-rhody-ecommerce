export const products = [
  {
    id: 'kids-set',
    slug: 'royal-kids-set',
    name: 'Royal Kids Set',
    category: 'Kids',
    description: 'A stylish outfit for little princes and princesses.',
    price: 25000,
    stock: 15,
    image: '👗',
  },
  {
    id: 'women-blazer',
    slug: 'classic-women-blazer',
    name: 'Classic Women Blazer',
    category: 'Women',
    description: 'Tailored elegance for everyday confidence and smarter looks.',
    price: 48000,
    stock: 10,
    image: '🧥',
  },
  {
    id: 'men-suit',
    slug: 'executive-men-suit',
    name: 'Executive Men Suit',
    category: 'Men',
    description: 'Formal everyday style with premium cuts and fabric.',
    price: 55000,
    stock: 8,
    image: '🕴️',
  },
];

export const paymentConfig = {
  paystack: {
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || 'pk_test_demo',
    secretKey: process.env.PAYSTACK_SECRET_KEY || 'sk_test_demo',
  },
  stripe: {
    publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || 'pk_test_demo',
    secretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_demo',
  },
};
