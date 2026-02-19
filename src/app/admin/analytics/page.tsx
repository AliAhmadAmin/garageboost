"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, BarChart } from "lucide-react";

import { useEffect, useState } from "react";

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: any;
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // Replace with your real API endpoint
        const res = await fetch("/api/admin/analytics");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Analytics & Reports</h1>
            <p className="text-slate-400 mt-2">Track business performance and growth metrics</p>
          </header>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {loading ? (
              <div className="col-span-4 text-center text-slate-500">Loading...</div>
            ) : stats.length === 0 ? (
              <div className="col-span-4 text-center text-slate-500">No analytics data found.</div>
            ) : stats.map((stat, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="text-blue-400" size={24} />
                  <span
                    className={`text-sm font-semibold ${
                      stat.trend === "up" ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Revenue Growth</h3>
              <div className="h-64 flex items-center justify-center text-slate-500">
                Chart: Monthly Revenue Trend
              </div>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Plan Distribution</h3>
              <div className="h-64 flex items-center justify-center text-slate-500">
                Chart: Trial vs Basic vs Pro
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}


