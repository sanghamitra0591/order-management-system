import { PrismaClient } from '@prisma/client';

interface OrderItemInput {
  productId: number;
  quantity: number;
}

interface CreateOrderInput {
  userId: number;
  paymentReceived?: boolean;
  items: OrderItemInput[];
}

export async function listOrders(prisma: PrismaClient) {
  return prisma.order.findMany({
    include: { items: { include: { product: true } }, user: true }
  });
}

export async function createOrder(prisma: PrismaClient, data: CreateOrderInput) {
  return prisma.$transaction(async (tx) => {
    for (const item of data.items) {
      // Lock and decrement stock
      const product = await tx.product.findUnique({ where: { id: item.productId } });
      if (!product || product.stock < item.quantity) {
        throw new Error('Stock unavailable');
      }
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }

    return tx.order.create({
      data: {
        userId: data.userId,
        status: 'PLACED',
        paymentReceived: data.paymentReceived ?? false,
        items: {
          create: data.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          }))
        }
      },
      include: { items: true }
    });
  });
}

export async function getOrder(prisma: PrismaClient, id: number) {
  return prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } }, user: true }
  });
}

export async function updateStatus(prisma: PrismaClient, id: number, status: string) {
  return prisma.order.update({
    where: { id },
    data: { status }
  });
}
