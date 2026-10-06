import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const totalSales = orders
      .filter((o) => o.status === 'PAID')
      .reduce((sum, o) => sum + o.total, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ordersToday = orders.filter((o) => o.createdAt >= today).length;

    const customers = await prisma.user.count({ where: { role: 'USER' } });

    const pendingPayouts = orders
      .filter((o) => o.status === 'PAID')
      .reduce((sum, o) => sum + Math.round(o.total * 0.95), 0);

    return NextResponse.json({
      totalSales,
      ordersToday,
      totalCustomers: customers,
      pendingPayouts,
      recentOrders: orders.map((o) => ({
        id: o.id,
        customerName: o.contact,
        total: o.total,
        status: o.status,
      })),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch dashboard data.' }, { status: 500 });
  }
}
