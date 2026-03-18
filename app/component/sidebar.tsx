"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, LogOut, Bell } from "lucide-react";

export default function SidebarAdmin() {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/notifications");
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Notification fetch error:", error);
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);
  }, []);

  const menu = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Products", path: "/admin/productsadmin", icon: Package },
    { name: "Notifications", path: "/admin/notifications", icon: Bell },
  ];

  return (
    <div className="w-64 bg-[var(--accent)] text-white shadow-lg p-6 hidden md:block">

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-[var(--primary)] p-3 rounded-lg mb-8">
        Admin Panel
      </h2>

      {/* MENU */}
      <div className="space-y-4">
        {menu.map((item, index) => {
          const Icon = item.icon;
          const active = pathname === item.path;

          return (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center justify-between p-3 rounded-lg transition ${
                active
                  ? "bg-[var(--primary)] text-white"
                  : "text-white hover:bg-gray-200 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} />
                {item.name}
              </div>

              {/* Notification badge */}
              {item.name === "Notifications" && notifications.length > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {notifications.length}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* LOGOUT */}
      <button className="mt-10 flex items-center gap-3 text-red-400 hover:text-red-600 transition">
        <LogOut size={20} />
        Logout
      </button>

    </div>
  );
}
