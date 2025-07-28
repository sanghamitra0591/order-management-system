"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
const api = process.env.NEXT_PUBLIC_API_URL;
export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState({ name:"", price:0, stock:1 });
  const [err, setErr] = useState("");
  useEffect(()=>{ fetch(`${api}/products`).then(r=>r.json()).then(setProducts); }, []);
  const submit = async (e:any) => {
    e.preventDefault();
    const res = await fetch(`${api}/products`,{
      method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form)
    }); if (!res.ok) { setErr("Failed"); return; }
    setErr("Success"); setForm({ name:"", price:0, stock:1 });
    fetch(`${api}/products`).then(r=>r.json()).then(setProducts);
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add Product</h2>
      <form className="mb-4 flex gap-3" onSubmit={submit}>
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name" className="border rounded px-2"/>
        <input type="number" min={1} value={form.price} onChange={e=>setForm({...form,price:Number(e.target.value)})} placeholder="Price" className="border rounded px-2"/>
        <input type="number" min={1} value={form.stock} onChange={e=>setForm({...form,stock:Number(e.target.value)})} placeholder="Stock" className="border rounded px-2"/>
        <Button type="submit">Add</Button>
        {err && <span className="text-red-600">{err}</span>}
      </form>
      <table className="border">
        <thead>
          <tr>
            <th>Name</th><th>Price</th><th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p:any)=><tr key={p.id}><td>{p.name}</td><td>${p.price}</td><td>{p.stock}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
