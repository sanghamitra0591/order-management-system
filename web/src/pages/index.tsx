import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold">Order Management System</h1>
      <div className="space-x-6">
        <Link href="/orders" className="btn-primary">Place/View Orders</Link>
        <Link href="/admin" className="btn-primary">Admin Dashboard</Link>
        <Link href="/lookup" className="btn-primary">Customer Order Lookup</Link>
      </div>
    </main>
  );
}
