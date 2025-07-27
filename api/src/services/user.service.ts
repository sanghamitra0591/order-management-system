import { PrismaClient } from '@prisma/client';

export async function listUsers(prisma: PrismaClient) {
  return prisma.user.findMany({
    include: { orders: true }
  });
}

export async function getUser(prisma: PrismaClient, id: number) {
  return prisma.user.findUnique({
    where: { id },
    include: { orders: true }
  });
}

export async function createUser(prisma: PrismaClient, data: any) {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email
      // Add more fields if needed
    }
  });
}
