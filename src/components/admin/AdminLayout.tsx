"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Settings,
  BarChart3,
  Users,
  CreditCard,
  Bell,
  LogOut,
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in and has admin role
    const user = localStorage.getItem("user");
    
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const userData = JSON.parse(user);
      if (userData.role !== "ADMIN" && userData.role !== "SUPER_ADMIN") {
        router.push("/garage/dashboard");
        return;
      }
      setIsAuthenticated(true);
    } catch (error) {
      router.push("/login");
      return;
    }

    // Verify session server-side in case localStorage is stale
    (async () => {
      try {
        const res = await fetch("/api/admin/config");
        if (!res.ok && (res.status === 401 || res.status === 403)) {
          localStorage.removeItem("user");
          router.push("/login");
          return;
        }
      } catch (e) {
        // network error — let the client continue; dev server might be down
      }
      setIsLoading(false);
    })();
  }, [router]);

  useEffect(() => {
    // Intercept fetch globally in the admin UI to handle session expiry (401/403)
    const originalFetch = window.fetch;

    window.fetch = async (...args: Parameters<typeof fetch>) => {
      try {
        const res = await originalFetch(...args);
        if (res && (res.status === 401 || res.status === 403)) {
          try {
            localStorage.removeItem("user");
          } catch (e) {}
          router.push("/login");
        }
        return res;
      } catch (err) {
        // Network or other error — rethrow after optional handling
        throw err;
      }
    };

    return () => {
      // restore original fetch
      try {
        window.fetch = originalFetch;
      } catch (e) {}
    };
  }, [router]);

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout?")) {
      return;
    }

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      localStorage.removeItem("user");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Building2, label: "Garages", href: "/admin/garages" },
    { icon: MessageSquare, label: "Messages", href: "/admin/messages" },
    { icon: Users, label: "Customers", href: "/admin/customers" },
    { icon: CreditCard, label: "Payments", href: "/admin/payments" },
    { icon: BarChart3, label: "Analytics", href: "/admin/analytics" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-blue-400">Garage Boost</h1>
          <p className="text-xs text-slate-500 mt-1">Platform Admin</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all w-full"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
