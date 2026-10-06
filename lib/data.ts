import { Product } from '@/lib/data';

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  icon: string;
};

export const products: Product[] = [
  {
    id: 'kids-set',
    slug: 'royal-kids-set',
    name: 'Royal Kids Set',
    category: 'Kids',
    price: 25000,
    icon: '👗',
    description: 'A stylish outfit for little princes and princesses.',
  },
  {
    id: 'women-blazer',
    slug: 'classic-women-blazer',
    name: 'Classic Women Blazer',
    category: 'Women',
    price: 48000,
    icon: '🧥',
    description: 'Tailored elegance for everyday confidence and smarter looks.',
  },
  {
    id: 'men-suit',
    slug: 'executive-men-suit',
    name: 'Executive Men Suit',
    category: 'Men',
    price: 55000,
    icon: '🕴️',
    description: 'Formal everyday style with premium cuts and fabric.',
  },
  {
    id: 'evening-gown',
    slug: 'plus-size-evening-gown',
    name: 'Plus Size Evening Gown',
    category: 'Plus Size',
    price: 64000,
    icon: '👗',
    description: 'Elegant dramatic look for special occasions and nights out.',
  },
  {
    id: 'teen-casual',
    slug: 'street-teen-casual',
    name: 'Street Teen Casual',
    category: 'Teens',
    price: 22000,
    icon: '🧢',
    description: 'Modern streetwear with comfort and flair for daily use.',
  },
  {
    id: 'adult-dress',
    slug: 'royal-adult-dress',
    name: 'Royal Adult Dress',
    category: 'Adults',
    price: 39000,
    icon: '✨',
    description: 'Elegant adult wear for weddings, church and formal events.',
  },
];

export const featuredProducts = products.slice(0, 3);
