import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/auth-middleware';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // const authResult = await authMiddleware(request);
   // if (!('isValid' in authResult)) {
    //  return authResult;
    //}

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const gender = searchParams.get('gender');
    const device = searchParams.get('device');
    const payment = searchParams.get('payment');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // Build Prisma where clause
    const where: any = {};

    if (category && category !== 'all') {
      where.productCategory = category;
    }
    if (gender && gender !== 'all') {
      where.gender = gender;
    }
    if (device && device !== 'all') {
      where.deviceType = device;
    }
    if (payment && payment !== 'all') {
      where.paymentMethod = payment;
    }
    if (startDate) {
      where.orderDate = { ...where.orderDate, gte: new Date(startDate) };
    }
    if (endDate) {
      where.orderDate = { ...where.orderDate, lte: new Date(endDate) };
    }

    // Fetch filtered orders
    const filteredOrders = await prisma.order.findMany({
      where,
    });

    // Calculate metrics
    const totalSales = filteredOrders.reduce((sum, order) => sum + order.sales, 0);
    const totalProfit = filteredOrders.reduce((sum, order) => sum + order.profit, 0);
    const orderCount = filteredOrders.length;
    const avgAging = orderCount > 0 ? filteredOrders.reduce((sum, order) => sum + order.aging, 0) / orderCount : 0;

    // Group data for charts
    const salesByCategory = Object.values(
      filteredOrders.reduce(
        (acc: any, order) => {
          if (!acc[order.productCategory]) {
            acc[order.productCategory] = { category: order.productCategory, sales: 0, profit: 0 };
          }
          acc[order.productCategory].sales += order.sales;
          acc[order.productCategory].profit += order.profit;
          return acc;
        },
        {}
      )
    );

    const salesByDevice = Object.values(
      filteredOrders.reduce(
        (acc: any, order) => {
          if (!acc[order.deviceType]) {
            acc[order.deviceType] = { name: order.deviceType, value: 0 };
          }
          acc[order.deviceType].value += order.sales;
          return acc;
        },
        {}
      )
    );

    const salesByGender = Object.values(
      filteredOrders.reduce(
        (acc: any, order) => {
          if (!acc[order.gender]) {
            acc[order.gender] = { name: order.gender, value: 0 };
          }
          acc[order.gender].value += order.sales;
          return acc;
        },
        {}
      )
    );

    const profitByPayment = Object.values(
      filteredOrders.reduce(
        (acc: any, order) => {
          if (!acc[order.paymentMethod]) {
            acc[order.paymentMethod] = { paymentMethod: order.paymentMethod, profit: 0, orderCount: 0 };
          }
          acc[order.paymentMethod].profit += order.profit;
          acc[order.paymentMethod].orderCount += 1;
          return acc;
        },
        {}
      )
    );

    const ordersByPriority = Object.values(
      filteredOrders.reduce(
        (acc: any, order) => {
          if (!acc[order.orderPriority]) {
            acc[order.orderPriority] = { name: order.orderPriority, value: 0 };
          }
          acc[order.orderPriority].value += 1;
          return acc;
        },
        {}
      )
    );

    // Get filter options
    const [categories, genders, devices, paymentMethods] = await Promise.all([
      prisma.order.findMany({
        distinct: ['productCategory'],
        select: { productCategory: true },
      }),
      prisma.order.findMany({
        distinct: ['gender'],
        select: { gender: true },
      }),
      prisma.order.findMany({
        distinct: ['deviceType'],
        select: { deviceType: true },
      }),
      prisma.order.findMany({
        distinct: ['paymentMethod'],
        select: { paymentMethod: true },
      }),
    ]);

    return NextResponse.json({
      data: {
        salesByCategory,
        salesByDevice,
        salesByGender,
        profitByPayment,
        ordersByPriority,
      },
      metrics: {
        totalSales,
        totalProfit,
        orderCount,
        avgAging,
      },
      filterOptions: {
        categories: categories.map((c) => c.productCategory),
        genders: genders.map((g) => g.gender),
        devices: devices.map((d) => d.deviceType),
        paymentMethods: paymentMethods.map((p) => p.paymentMethod),
      },
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
  }
}
