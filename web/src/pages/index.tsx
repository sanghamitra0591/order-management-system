import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>OMS Demo Frontend</h1>
      <ul>
        <li>
          <Link href="/orders">Orders List</Link>
        </li>
        <li>
          <Link href="/admin">Admin Dashboard</Link>
        </li>
      </ul>
    </div>
  );
}
