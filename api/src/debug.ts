// src/debug.ts
import Fastify from 'fastify'

const app = Fastify()

// You should see a red squiggly under "prisma" unless the type declaration is working:
app.prisma  // <-- hover here in your editor. If it says "any" or "does not exist", the type isn't loading
