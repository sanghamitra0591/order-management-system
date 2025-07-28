"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const api = process.env.NEXT_PUBLIC_API_URL;

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [form, setForm] = useState({
    userId: "", items: [{ productId: "", quantity: 1 }], paymentReceived: false
  });
  const [err, setErr] = useState("");

  // Initial list fetch
  useEffect(() => {
    fetch(`${api}/orders`).then(r=>r.json()).then(setOrders);
    fetch(`${api}/products`).then(r=>r.json()).then(setProducts);
    fetch(`${api}/users`).then(r=>r.json()).then(setUsers);
  }, []);

  const onSubmit = async (e:any) => {
    e.preventDefault(); setErr("");
    const body = {
      userId: Number(form.userId),
      items: form.items.map(it=>({ productId: Number(it.productId), quantity: Number(it.quantity) })),
      paymentReceived: form.paymentReceived
    };
    const resp = await fetch(`${api}/orders`, {
      method: "POST", headers: { "Content-Type":"application/json" }, body: JSON.stringify(body)
    });
    if (!resp.ok) { setErr("Failed: " + (await resp.text())); return; }
    setErr("Order placed!"); // refresh/clear as needed
  };
  return (
    <div>
      <h2 className="font-bold mb-4">Place Order</h2>
      <form className="p-4 bg-gray-50 border rounded mb-8 w-full max-w-lg" onSubmit={onSubmit}>
        <label>User:&nbsp;
          <select value={form.userId} onChange={e=>setForm({...form, userId:e.target.value})}>
            <option value="">-- select --</option>
            {users.map((u:any) => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
        </label>
        <div>
          Product/Qty:
          {form.items.map((it, i) => (
            <div key={i}>
              <select value={it.productId} onChange={e=>{
                const items = [...form.items];
                items[i].productId = e.target.value;
                setForm({...form, items});
              }}>
                <option value="">-- select --</option>
                {products.map((p:any) => <option value={p.id} key={p.id}>{p.name} (${p.price})</option>)}
              </select>
              <input type="number" min={1} value={it.quantity}
                onChange={e=>{
                  const items = [...form.items];
                  items[i].quantity = Number(e.target.value);
                  setForm({...form, items});
                }}/>
              {form.items.length > 1 && <Button size="sm" variant="ghost" type="button" onClick={()=>{
                setForm({...form, items: form.items.filter((_,idx)=>idx!==i)});
              }}>Remove</Button>}
            </div>
          ))}
          <Button size="sm" variant="outline" type="button"
            onClick={()=>setForm({...form, items: [...form.items, {productId:"", quantity:1}]})}>
            Add Another Product
          </Button>
        </div>
        <div className="mt-2">
          <label><input type="checkbox" checked={form.paymentReceived}
            onChange={e=>setForm({...form,paymentReceived:!form.paymentReceived})}
          /> Payment Received?</label>
        </div>
        <Button className="mt-4" type="submit">Submit Order</Button>
        {err && <div className="mt-2 text-red-600">{err}</div>}
      </form>
      <h2 className="font-bold mb-2">Recent Orders</h2>
      <ul>
        {orders.slice(0,10).map((o:any)=>
          <li key={o.id}>
            [#{o.id}] {o.user?.name} | {o.status} | Items: {o.items?.map((it:any)=>`${it.product?.name} x${it.quantity}`).join(", ")}
          </li>
        )}
      </ul>
    </div>
  );
}
