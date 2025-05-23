import { Nav, NavLink } from "@/components/Nav";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <Nav>
      <NavLink href="/admin">Dashboard</NavLink>
      <NavLink href="/admin/products">Products</NavLink>
      <NavLink href="/admin/users">Users</NavLink>
      <NavLink href="/admin/orders">Orders</NavLink>
    </Nav>
    <div className="w-full px-4 my-6">{children}</div>
  </>
}