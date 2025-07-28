# Order Management System

A modern full-stack Order Management System built with **Next.js + React (frontend)** and **Fastify + Prisma + TypeScript (backend)**. This project supports order placement, order management, user & product management, and real-time stock control.

## 🚀 Live Demo

- **Frontend:** [https://order-management-system-kt59spjqg.vercel.app]  
- **Backend API:** [https://library-server-1-q7il.onrender.com]

## 🛠️ Technologies Used

- **Frontend:**  
  - Next.js 14+ with Turbopack (Webpack fallback enabled for production stability)  
  - React 18+ with TypeScript  
  - Tailwind CSS v4+ with shadcn/ui components  
  - PostCSS with new Tailwind PostCSS plugin  
  - fetch API for backend communication

- **Backend:**  
  - Fastify server with TypeScript  
  - Prisma ORM with PostgreSQL/MySQL (configure your DB)  
  - REST API built with Fastify plugin architecture  
  - CORS enabled for frontend-backend communication  
  - Robust error handling and input validation  
  - Transaction-safe order placement with stock locking  
   
- **Dev Tools:**  
  - ts-node-dev for backend development  
  - ESLint, Prettier (configurable)  

## 📋 Features

### Frontend

- Responsive UI with Next.js + Tailwind CSS  
- Admin Dashboard: User, Product, Order management  
- Customer Views: Place orders, view own orders  
- Real-time stock checks and validation  
- Search and filter orders by status or user  
- CSV export of orders list  
- Role-based access (optional based on `isAdmin` flag)  

### Backend

- Fastify REST API with Prisma ORM  
- User CRUD operations (create, read, update)  
- Product CRUD with stock management  
- Order transactions that lock stock and validate inventory  
- Pagination and filtering support for orders  
- CORS enabled for smooth frontend communication  
- Strong TypeScript typings including Fastify module augmentation for Prisma integration  

## 📦 Project Structure

/api # Backend Fastify + Prisma backend
/src
/routes # REST API routes: user, product, order
/types # TypeScript custom declarations (Fastify augmentation)
prisma.ts # Prisma plugin for Fastify
server.ts # Backend server bootstrap
/web # Frontend Next.js React app
/src
/components # UI components (shadcn/ui)
/pages # Next.js pages
/styles # Tailwind CSS global styles
next.config.js
postcss.config.js


## 🧑💻 Local Development Setup

### Prerequisites

- Node.js 18.x or 20.x (recommended)
- npm or yarn
- Database setup for Prisma (PostgreSQL/MySQL)
- [nvm](https://github.com/nvm-sh/nvm) (optional but recommended)

### Backend Setup

cd api
npm install
Add your .env with DB connection string

npx prisma migrate dev # Run migrations
npm run build # Compile TypeScript
npm start # Run compiled server

- For development with hot reload:  
npm run dev

### Frontend Setup

cd web
npm install
Create .env.local and add:

NEXT_PUBLIC_API_URL=http://localhost:4000

npm run dev

### Prisma DB Migrations

cd api
npx prisma migrate dev # Applies migrations and generates Prisma Client
npx prisma generate # Regenerate Prisma Client after schema changes

## 🔧 Key Configurations

- **Fastify CORS:** Allows requests from `http://localhost:3000`.
- **Fastify Instance Augmentation:** Types are extended so `app.prisma` is typed as `PrismaClient`.
- **Tailwind CSS v4+:** Uses `@tailwindcss/postcss` plugin, disables Turbopack to avoid known issues by setting `turbo: false` in `next.config.js`.
- **Order Transactions:** Safe stock decrement via Prisma $transaction.
- **Error Handling:** Proper HTTP responses with clear messages.

## 📖 Usage Instructions

1. Open the frontend at `http://localhost:3000`.  
2. Admins can manage users, products, and orders.  
3. Customers can place orders and view their order status.  
4. Orders reflect real-time stock changes and errors with insufficient inventory.  
5. Admins can export orders to CSV from the dashboard.

## 🐞 Troubleshooting

- **Backend TS errors about `prisma` on Fastify:** Confirm module augmentation `src/types/fastify.d.ts` is present and included in `tsconfig.json`.  
- **Frontend Tailwind build issues:** Check `next.config.js` disables Turbopack (`turbo: false`) and `postcss.config.js` uses `@tailwindcss/postcss`.  
- **Fetch failures:** Verify backend is running, CORS configured, and API URLs correct.  
- **Render Deployment:** Set backend root directory to `api`, build command to `npm install && npm run build`, and publish directory to your build output `dist`.

## 📞 Contact / Support

For questions, suggestions, or issues, please contact:

**Your Name**  
Email: your.email@example.com  
GitHub: https://github.com/sanghamitra0591

---

**Thank you for checking out the Order Management System!** 🚀
