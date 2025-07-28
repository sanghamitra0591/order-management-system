"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const api = process.env.NEXT_PUBLIC_API_URL;

function exportCSV(data:any[]) {
  const header = ['Order ID','User','Status','Paid','Created At','Items'];
  const rows = data.map(o => [
    o.id, o.user?.name, o.status, o.paymentReceived ? "Yes" : "No", new Date(o.createdAt).toLocaleString(),
    o.items?.map((it:any)=> `${it.product?.name} x${it.quantity}`).join("; ")
  ]);
  const csv = [header].concat(rows).map(r=>r.join(",")).join("\n");
  const blob = new Blob([csv],{type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');a.href=url; a.download='orders.csv'; a.click();
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    fetch(`${api}/orders?search=${encodeURIComponent(search)}`)
      .then(r=>r.json()).then(setOrders);
  }, [search]);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="mb-4 flex gap-2">
        <Input placeholder="Search orders…" value={search} onChange={e=>setSearch(e.target.value)}/>
        <Button onClick={()=>exportCSV(orders)}>Export CSV</Button>
      </div>
      <table className="min-w-full border rounded bg-white">
        <thead><tr>
          <th className="p-2">Order#</th>
          <th className="p-2">User</th>
          <th className="p-2">Status</th>
          <th className="p-2">Paid</th>
          <th className="p-2">Progress</th>
        </tr></thead>
        <tbody>
        {orders.map((o:any) => (
          <tr key={o.id} className="border-t">
            <td className="p-2">{o.id}</td>
            <td className="p-2">{o.user?.name || o.user?.email}</td>
            <td className="p-2">{o.status}</td>
            <td className="p-2">{o.paymentReceived ? "Yes" : "No"}</td>
            <td className="p-2">
              <StatusSelect status={o.status} orderId={o.id} />
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

// Dropdown for updating status inline
function StatusSelect({ status, orderId }: { status: string; orderId: number }) {
  const [val, setVal] = useState(status);
  const api = process.env.NEXT_PUBLIC_API_URL;
  const handleset = async (e:any) => {
    setVal(e.target.value);
    await fetch(`${api}/orders/${orderId}/status`, {
      method:"PATCH",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ status: e.target.value })
    });
  };
  return (
    <select value={val} onChange={handleset} className="border rounded px-2 py-1">
      {["PLACED","PICKED","SHIPPED","DELIVERED"].map(s=><option key={s}>{s}</option>)}
    </select>
  );
}
