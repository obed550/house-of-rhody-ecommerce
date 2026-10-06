export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  featured?: boolean;
};

export type User = {
  id: string;
  name: string;
  contact: string;
  password: string;
  createdAt: string;
};

export type Order = {
  id: string;
  customerName: string;
  contact: string;
  total: number;
  status: 'Pending' | 'Paid' | 'Shipped';
  items: string[];
  createdAt: string;
};

export const products: Product[] = [
  {
    id: 'kids-set',
    slug: 'royal-kids-set',
    name: 'Royal Kids Set',
    category: 'Kids',
    description: 'A stylish outfit for little princes and princesses.',
    price: 25000,
    stock: 15,
    image: '👗',
    featured: true,
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
    featured: true,
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
    featured: true,
  },
  {
    id: 'evening-gown',
    slug: 'plus-size-evening-gown',
    name: 'Plus Size Evening Gown',
    category: 'Plus Size',
    description: 'Elegant dramatic look for special occasions and nights out.',
    price: 64000,
    stock: 7,
    image: '🌸',
  },
  {
    id: 'teen-casual',
    slug: 'street-teen-casual',
    name: 'Street Teen Casual',
    category: 'Teens',
    description: 'Modern streetwear with comfort and flair for daily use.',
    price: 22000,
    stock: 18,
    image: '🧢',
  },
  {
    id: 'adult-dress',
    slug: 'royal-adult-dress',
    name: 'Royal Adult Dress',
    category: 'Adults',
    description: 'Elegant adult wear for weddings, church and formal events.',
    price: 39000,
    stock: 12,
    image: '✨',
  },
];

export const orders: Order[] = [
  {
    id: 'HR-1024',
    customerName: 'Ada Nwosu',
    contact: '+2348123456789',
    total: 48000,
    status: 'Paid',
    items: ['Classic Women Blazer'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'HR-1025',
    customerName: 'Tobi Eze',
    contact: '+2348034567890',
    total: 26500,
    status: 'Pending',
    items: ['Street Teen Casual'],
    createdAt: new Date().toISOString(),
  },
  {
    id: 'HR-1026',
    customerName: 'Grace M.',
    contact: '+2348056789012',
    total: 72000,
    status: 'Shipped',
    items: ['Executive Men Suit'],
    createdAt: new Date().toISOString(),
  },
];

export const users: User[] = [];

export const featuredProducts = products.filter((product) => product.featured);

export function getAllProducts(): Product[] {
  return [...products];
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function addProduct(data: Omit<Product, 'id'>): Product {
  const newProduct: Product = {
    ...data,
    id: `${data.slug}-${Date.now()}`,
  };
  products.push(newProduct);
  return newProduct;
}

export function updateProduct(productId: string, updates: Partial<Product>): Product | undefined {
  const index = products.findIndex((product) => product.id === productId);
  if (index === -1) return undefined;

  products[index] = { ...products[index], ...updates };
  return products[index];
}

export function deleteProduct(productId: string): boolean {
  const index = products.findIndex((product) => product.id === productId);
  if (index === -1) return false;
  products.splice(index, 1);
  return true;
}

export function addUser(user: User): User {
  users.push(user);
  return user;
}

export function findUserByContact(contact: string): User | undefined {
  return users.find((user) => user.contact === contact);
}

export function listOrders(): Order[] {
  return [...orders];
}

export function createOrder(order: Order): Order {
  orders.unshift(order);
  return order;
}
