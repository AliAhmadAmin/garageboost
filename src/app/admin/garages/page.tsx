"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/admin/AdminLayout";
import { Edit, Mail, Trash2, Search, Plus } from "lucide-react";
import { formatUKDate } from "@/lib/uk-date";

interface Garage {
  id: string;
  name: string;
  ownerName: string;
  plan: string;
  status: string;
  revenuePence: number;
  stripeCustomerId?: string;
  createdAt: string;
}

export default function GaragesPage() {
  const [garages, setGarages] = useState<Garage[]>([]);
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    loadGarages();
  }, []);

  const loadGarages = async () => {
    const res = await fetch("/api/garages?includeAll=true", { credentials: "include" });
    const data = await res.json();
    setGarages(data);
  };

  const filtered = garages.filter((g) => {
    const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.ownerName.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = filterPlan === "ALL" || g.plan === filterPlan;
    const matchesStatus = filterStatus === "ALL" || g.status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Garage Management</h1>
              <p className="text-slate-400 mt-2">View and manage all registered garages</p>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-semibold transition-colors">
              <Plus size={20} />
              Add Garage
            </button>
          </header>

          {/* Filters */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Search garages..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <select
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Plans</option>
                <option value="TRIAL">Trial</option>
                <option value="BASIC">Basic</option>
                <option value="PRO">Pro</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="TRIAL">Trial</option>
                <option value="OVERDUE">Overdue</option>
              </select>
            </div>
          </div>

          {/* Garages Table */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-slate-700">
                <tr className="text-slate-400 text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-4 text-left">Garage</th>
                  <th className="px-6 py-4 text-left">Owner</th>
                  <th className="px-6 py-4 text-left">Plan</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Revenue</th>
                  <th className="px-6 py-4 text-left">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filtered.map((garage) => (
                  <tr key={garage.id} className="hover:bg-slate-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/admin/garages/${garage.id}`} className="font-bold hover:text-blue-400">
                        {garage.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">{garage.ownerName}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                          garage.plan === "PRO"
                            ? "bg-blue-500/20 text-blue-400"
                            : garage.plan === "BASIC"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-slate-700 text-slate-400"
                        }`}
                      >
                        {garage.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            garage.status === "ACTIVE"
                              ? "bg-emerald-500"
                              : garage.status === "TRIAL"
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                        />
                        <span className="text-sm">{garage.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold">
                      £{(garage.revenuePence / 100).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-sm">
                      {formatUKDate(garage.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 justify-end">
                        <Link
                          href={`/admin/garages/${garage.id}`}
                          className="text-slate-400 hover:text-blue-400 transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <Link
                          href={`/admin/messages?garageId=${garage.id}`}
                          className="text-slate-400 hover:text-emerald-400 transition-colors"
                          title="Send Message"
                        >
                          <Mail size={18} />
                        </Link>
                        <button
                          className="text-slate-400 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <div className="py-12 text-center text-slate-500">
                No garages found matching your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
