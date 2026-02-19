"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Coins,
  Clock,
  TrendingUp,
  Edit,
  Mail,
} from "lucide-react";

interface Garage {
  id: string;
  name: string;
  ownerName: string;
  plan: "TRIAL" | "BASIC" | "PRO";
  status: "ACTIVE" | "OVERDUE" | "TRIAL";
  revenuePence: number;
}

export default function SuperAdminDashboard() {
  const [garages, setGarages] = useState<Garage[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/garages");
      const data = await res.json();
      setGarages(data);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    if (!query) return garages;
    return garages.filter((garage) =>
      `${garage.name} ${garage.ownerName}`.toLowerCase().includes(query.toLowerCase())
    );
  }, [garages, query]);

  const revenue = garages.reduce((acc, g) => acc + g.revenuePence, 0);
  const trials = garages.filter((g) => g.status === "TRIAL").length;
  const churn = 1.2;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-slate-400 mt-2">Real-time metrics and business insights</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: "Total Garages",
              val: garages.length.toString(),
              icon: Building2,
              color: "text-blue-400",
            },
            {
              label: "Monthly Revenue",
              val: `£${(revenue / 100).toLocaleString()}`,
              icon: Coins,
              color: "text-emerald-400",
            },
            {
              label: "Active Trials",
              val: trials.toString(),
              icon: Clock,
              color: "text-amber-400",
            },
            {
              label: "Churn Rate",
              val: `${churn}%`,
              icon: TrendingUp,
              color: "text-rose-400",
            },
          ].map((stat, index) => (
            <div key={index} className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
              <stat.icon className={`${stat.color} mb-4`} size={24} />
              <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">
                {stat.label}
              </p>
              <h3 className="text-3xl font-bold mt-1">{stat.val}</h3>
            </div>
          ))}
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <h3 className="font-bold text-xl">All Garages</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search garages..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <table className="w-full text-left">
            <thead className="text-slate-500 text-xs uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">Garage Name</th>
                <th className="px-6 py-4">Owner</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Revenue Gen</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filtered.map((garage) => (
                <tr key={garage.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 font-bold">{garage.name}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{garage.ownerName}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        garage.plan === "PRO" ? "bg-blue-500/20 text-blue-400" : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      {garage.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-sm">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          garage.status === "ACTIVE" ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                      />
                      {garage.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold">
                    £{(garage.revenuePence / 100).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <Link
                        href={`/admin/garages/${garage.id}`}
                        className="text-slate-500 hover:text-blue-400"
                        title="Edit Garage"
                      >
                        <Edit size={18} />
                      </Link>
                      <Link
                        href={`/admin/messages?garageId=${garage.id}`}
                        className="text-slate-500 hover:text-emerald-400"
                        title="Send Message"
                      >
                        <Mail size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    No garages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
