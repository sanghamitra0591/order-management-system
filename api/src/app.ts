import fastify from 'fastify';
import { prismaPlugin } from './plugins/prisma';
import orderRoutes from './routes/order';
import productRoutes from './routes/product';
import userRoutes from './routes/user';
import cors from '@fastify/cors';

export function buildApp() {
    const app = fastify({ logger: true });

    app.register(prismaPlugin); // Prisma Client on app


    app.register(cors, {
        origin: 'http://localhost:3000', // or '*' for dev/test
        methods: ['GET', 'POST', 'PATCH', 'OPTIONS']
    });


    app.get('/healthz', async () => 'ok');

    app.register(userRoutes, { prefix: '/users' });
    app.register(productRoutes, { prefix: '/products' });
    app.register(orderRoutes, { prefix: '/orders' });

    return app;
}
