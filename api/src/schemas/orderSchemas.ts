import { z } from 'zod';

export const createOrderSchema = z.object({
  userId: z.number(),
  items: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number().min(1),
    })
  ),
});
