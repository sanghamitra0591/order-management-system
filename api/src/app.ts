import fastify from 'fastify';
import cors from '@fastify/cors';
import prismaPlugin from "./prisma";
import userRoutes from './routes/user';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';

export function buildApp() {
  const app = fastify({ logger: true });

  // Enable CORS and restrict allowed origin to your frontend URL
  app.register(cors, {
    origin: '*',  // Your frontend origin
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  });

  app.register(prismaPlugin);

  app.get('/healthz', async () => 'ok');
  app.register(userRoutes, { prefix: '/users' });
  app.register(productRoutes, { prefix: '/products' });
  app.register(orderRoutes, { prefix: '/orders' });

  return app;
}
