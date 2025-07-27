import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function OrderDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [order, setOrder] = useState<any | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${api}/orders/${id}`)
      .then((res) => res.json())
      .then(setOrder);
  }, [id]);

  if (!order) return <div>Loading...</div>;
  return (
    <div style={{ padding: 24 }}>
      <h2>Order #{order.id}</h2>
      <p>Status: {order.status}</p>
      <h3>Items:</h3>
      <ul>
        {order.items?.map((it: any) => (
          <li key={it.id}>
            Product #{it.productId}: {it.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
