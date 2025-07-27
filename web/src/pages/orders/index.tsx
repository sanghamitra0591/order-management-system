import { useEffect, useState } from "react";

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${api}/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h2>All Orders</h2>
      {loading && <div>Loading...</div>}
      {!loading && !orders.length && <div>No orders found.</div>}
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order #{order.id} — {order.status} by User #{order.userId}
          </li>
        ))}
      </ul>
    </div>
  );
}
