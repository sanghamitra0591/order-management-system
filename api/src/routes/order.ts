import { FastifyPluginAsync } from 'fastify';
import { createOrderSchema } from '../schemas/orderSchemas';
import * as orderService from '../services/order.service';

const orderRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async (req, reply) => {
    const orders = await orderService.listOrders(app.prisma);
    reply.send(orders);
  });

  app.post('/', async (req, reply) => {
    try {
      // Validate request body with Zod
      const data = createOrderSchema.parse(req.body);

      // Pass validated data to service
      const order = await orderService.createOrder(app.prisma, data);

      reply.code(201).send(order);
    } catch (err) {
      // Catch zod validation errors
      if (err instanceof Error && 'errors' in err) {
        return reply.status(400).send({ error: err.errors });
      }
      // Other errors become 500
      app.log.error(err);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

  app.get('/:id', async (req, reply) => {
    const { id } = req.params as any;
    const order = await orderService.getOrder(app.prisma, Number(id));
    if (!order) return reply.code(404).send({ error: 'Order not found' });
    reply.send(order);
  });

  app.patch('/:id/status', async (req, reply) => {
    const { id } = req.params as any;
    const { status } = req.body as any;
    const updated = await orderService.updateStatus(app.prisma, Number(id), status);
    reply.send(updated);
  });
};

export default orderRoutes;
