"use client";
import { useState } from "react";
const api = process.env.NEXT_PUBLIC_API_URL;

export default function Lookup() {
  const [id, setId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [err, setErr] = useState("");
  const submit = async (e:any) => {
    e.preventDefault(); setOrder(null); setErr("");
    const resp = await fetch(`${api}/orders/${id}`);
    if (!resp.ok) { setErr("Order not found."); return; }
    setOrder(await resp.json());
  };
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="font-bold text-lg mb-4">Order Lookup</h2>
      <form onSubmit={submit} className="flex gap-2 mb-4">
        <input className="border px-2 py-1 rounded" value={id} onChange={e=>setId(e.target.value)} placeholder="Order ID"/>
        <button className="btn-primary" type="submit">Lookup</button>
      </form>
      {err && <div className="text-red-600">{err}</div>}
      {order && (
        <div className="p-2 border rounded">
          <div>Order #{order.id}, Name: {order.user?.name}</div>
          <div>Status: {order.status}</div>
          <div>Payment: {order.paymentReceived ? "Yes" : "No"}</div>
          <div>Items: {order.items?.map((it:any) => `${it.product?.name} x${it.quantity}`).join(", ")}</div>
        </div>
      )}
    </div>
  );
}
