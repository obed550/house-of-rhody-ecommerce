import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const kids = await prisma.category.upsert({
    where: { name: 'Kids' },
    update: {},
    create: { name: 'Kids' },
  });

  const women = await prisma.category.upsert({
    where: { name: 'Women' },
    update: {},
    create: { name: 'Women' },
  });

  const men = await prisma.category.upsert({
    where: { name: 'Men' },
    update: {},
    create: { name: 'Men' },
  });

  const teens = await prisma.category.upsert({
    where: { name: 'Teens' },
    update: {},
    create: { name: 'Teens' },
  });

  const plusSize = await prisma.category.upsert({
    where: { name: 'Plus Size' },
    update: {},
    create: { name: 'Plus Size' },
  });

  const adults = await prisma.category.upsert({
    where: { name: 'Adults' },
    update: {},
    create: { name: 'Adults' },
  });

  // Create products
  const products = [
    {
      slug: 'royal-kids-set',
      name: 'Royal Kids Set',
      description: 'A stylish outfit for little princes and princesses. Perfect for special occasions.',
      price: 25000,
      stock: 15,
      image: '👗',
      featured: true,
      categoryId: kids.id,
    },
    {
      slug: 'classic-women-blazer',
      name: 'Classic Women Blazer',
      description: 'Tailored elegance for everyday confidence and smarter looks. Premium fabric blend.',
      price: 48000,
      stock: 10,
      image: '🧥',
      featured: true,
      categoryId: women.id,
    },
    {
      slug: 'executive-men-suit',
      name: 'Executive Men Suit',
      description: 'Formal everyday style with premium cuts and fabric. Perfect for boardroom and events.',
      price: 55000,
      stock: 8,
      image: '🕴️',
      featured: true,
      categoryId: men.id,
    },
    {
      slug: 'plus-size-evening-gown',
      name: 'Plus Size Evening Gown',
      description: 'Elegant dramatic look for special occasions and nights out. Luxurious fabric.',
      price: 64000,
      stock: 7,
      image: '🌸',
      featured: false,
      categoryId: plusSize.id,
    },
    {
      slug: 'street-teen-casual',
      name: 'Street Teen Casual',
      description: 'Modern streetwear with comfort and flair for daily use. Trendy and comfortable.',
      price: 22000,
      stock: 18,
      image: '🧢',
      featured: false,
      categoryId: teens.id,
    },
    {
      slug: 'royal-adult-dress',
      name: 'Royal Adult Dress',
      description: 'Elegant adult wear for weddings, church and formal events. Timeless beauty.',
      price: 39000,
      stock: 12,
      image: '✨',
      featured: false,
      categoryId: adults.id,
    },
    {
      slug: 'premium-kids-shirt',
      name: 'Premium Kids Shirt',
      description: 'Comfortable cotton shirt for kids. Available in multiple colors.',
      price: 15000,
      stock: 25,
      image: '👕',
      featured: false,
      categoryId: kids.id,
    },
    {
      slug: 'womens-summer-dress',
      name: 'Women Summer Dress',
      description: 'Light and breezy summer dress perfect for beach and casual outings.',
      price: 35000,
      stock: 12,
      image: '👗',
      featured: false,
      categoryId: women.id,
    },
    {
      slug: 'mens-casual-shirt',
      name: 'Men Casual Shirt',
      description: 'Versatile casual shirt for everyday wear. Premium cotton fabric.',
      price: 28000,
      stock: 20,
      image: '👔',
      featured: false,
      categoryId: men.id,
    },
    {
      slug: 'teen-hoodie',
      name: 'Teen Hoodie',
      description: 'Comfortable hoodie for teens. Perfect for casual wear and sports.',
      price: 18000,
      stock: 14,
      image: '🧥',
      featured: false,
      categoryId: teens.id,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { contact: '+2348000000000' },
    update: {},
    create: {
      name: 'Admin User',
      contact: '+2348000000000',
      passwordHash: adminPassword,
      role: 'ADMIN',
      isVerified: true,
    },
  });

  // Create demo customers
  const demoPassword = await bcrypt.hash('demo123', 10);
  const customer1 = await prisma.user.upsert({
    where: { contact: '+2348123456789' },
    update: {},
    create: {
      name: 'Ada Nwosu',
      contact: '+2348123456789',
      passwordHash: demoPassword,
      role: 'USER',
      isVerified: true,
    },
  });

  const customer2 = await prisma.user.upsert({
    where: { contact: '+2348034567890' },
    update: {},
    create: {
      name: 'Tobi Eze',
      contact: '+2348034567890',
      passwordHash: demoPassword,
      role: 'USER',
      isVerified: true,
    },
  });

  // Create demo orders
  const productIds = await prisma.product.findMany({
    select: { id: true },
    take: 6,
  });

  if (productIds.length > 0) {
    const order1 = await prisma.order.create({
      data: {
        userId: customer1.id,
        contact: customer1.contact,
        total: 96000,
        status: 'PAID',
        items: {
          create: [
            {
              productId: productIds[1].id,
              quantity: 2,
              price: 48000,
            },
          ],
        },
      },
    });

    await prisma.payment.create({
      data: {
        orderId: order1.id,
        provider: 'paystack',
        reference: `PAY-${Date.now()}`,
        amount: 96000,
        status: 'SUCCESS',
      },
    });

    const order2 = await prisma.order.create({
      data: {
        userId: customer2.id,
        contact: customer2.contact,
        total: 55000,
        status: 'SHIPPED',
        items: {
          create: [
            {
              productId: productIds[2].id,
              quantity: 1,
              price: 55000,
            },
          ],
        },
      },
    });

    await prisma.payment.create({
      data: {
        orderId: order2.id,
        provider: 'paystack',
        reference: `PAY-${Date.now() + 1}`,
        amount: 55000,
        status: 'SUCCESS',
      },
    });
  }

  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
