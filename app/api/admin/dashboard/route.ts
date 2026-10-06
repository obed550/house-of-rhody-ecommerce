import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_CONTACT = '0599861653';

export async function GET(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token) as any;
    if (!decoded || decoded.role !== 'ADMIN' || decoded.contact !== ADMIN_CONTACT) {
      return NextResponse.json({ error: 'Admin access denied' }, { status: 403 });
    }

    // Get dashboard stats
    const totalOrders = await prisma.order.count();
    const totalCustomers = await prisma.user.count({ where: { role: 'USER' } });
    const paidOrders = await prisma.order.count({ where: { status: 'PAID' } });

    const orders = await prisma.order.findMany({
      include: {
        items: { include: { product: true } },
        user: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    const totalSales = orders
      .filter((o) => o.status === 'PAID')
      .reduce((sum, o) => sum + o.total, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const ordersToday = orders.filter((o) => o.createdAt >= today).length;

    return NextResponse.json({
      stats: {
        totalSales: Math.floor(totalSales / 100),
        ordersToday,
        totalCustomers,
        totalOrders,
        paidOrders,
      },
      recentOrders: orders.map((o) => ({
        id: o.id,
        customerName: o.user?.name || o.contact,
        total: Math.floor(o.total / 100),
        status: o.status,
        date: o.createdAt.toISOString().split('T')[0],
      })),
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
