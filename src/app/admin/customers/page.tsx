"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { Users, Search, Mail } from "lucide-react";
import Link from "next/link";

import { useEffect, useState } from "react";


interface Customer {
  id: string;
  name: string;
  garage: string;
  vehicles: number;
  lastActivity: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/customers");
        if (res.ok) {
          const data = await res.json();
          setCustomers(data);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.garage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Customer Overview</h1>
            <p className="text-slate-400 mt-2">View customers across all garages</p>
          </header>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search customers..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Customers Table */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-slate-700">
                <tr className="text-slate-400 text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-4 text-left">Customer</th>
                  <th className="px-6 py-4 text-left">Garage</th>
                  <th className="px-6 py-4 text-left">Vehicles</th>
                  <th className="px-6 py-4 text-left">Last Activity</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {loading ? (
                  <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-500">Loading...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-10 text-center text-slate-500">No customers found.</td></tr>
                ) : filtered.map((customer) => (
                  <tr key={customer.id} className="hover:bg-slate-700/30">
                    <td className="px-6 py-4 font-medium">{customer.name}</td>
                    <td className="px-6 py-4 text-slate-400">{customer.garage}</td>
                    <td className="px-6 py-4">{customer.vehicles}</td>
                    <td className="px-6 py-4 text-slate-400">{customer.lastActivity}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-blue-400">
                        <Mail size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
