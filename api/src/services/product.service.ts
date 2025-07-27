import { PrismaClient } from '@prisma/client';

export async function listProducts(prisma: PrismaClient) {
  return prisma.product.findMany();
}

export async function createProduct(prisma: PrismaClient, data: any) {
  return prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      stock: data.stock
    }
  });
}
