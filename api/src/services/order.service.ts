import { PrismaClient } from '@prisma/client';

export async function listOrders(prisma: PrismaClient) {
  return prisma.order.findMany({
    include: { items: { include: { product: true } }, user: true }
  });
}

export async function createOrder(prisma: PrismaClient, data: any) {
  // TODO: validate stock and payment
  return prisma.order.create({
    data: {
      userId: data.userId,
      status: "PLACED",
      paymentReceived: false,
      items: {
        create: data.items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      }
    },
    include: { items: true }
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
