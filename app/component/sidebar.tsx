"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, LogOut } from "lucide-react";

export default function SidebarAdmin() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Products", path: "@/admin/productsadmin", icon: Package },
  ];

  return (
    <div className="w-64 bg-white shadow-lg p-6 hidden md:block">
      <h2 className="text-2xl font-bold  text-[var(--primary)] p-3 rounded-lg mb-8">
        Admin Panel
      </h2>

      <div className="space-y-4">
        {menu.map((item, index) => {
          const Icon = item.icon;
          const active = pathname === item.path;

          return (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-3 p-3 rounded-lg transition ${
                active
                  ? "bg-[var(--primary)] text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </div>

      <button className="mt-10 flex items-center gap-3 text-red-500 hover:text-red-700">
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
}