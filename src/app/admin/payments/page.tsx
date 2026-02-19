"use client";

import AdminLayout from "@/components/admin/AdminLayout";
import { CreditCard, AlertCircle, CheckCircle, Clock } from "lucide-react";


import { useEffect, useState } from "react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/payments");
        if (res.ok) {
          const data = await res.json();
          setPayments(data);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="text-emerald-400" size={18} />;
      case "pending":
        return <Clock className="text-amber-400" size={18} />;
      case "failed":
        return <AlertCircle className="text-red-400" size={18} />;
      default:
        return null;
    }
  };

  // Derived payment metrics
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const collected30d = payments
    .filter((p) => new Date(p.date) >= thirtyDaysAgo)
    .reduce((acc, p) => acc + (p.amount || 0), 0);

  const successful = payments.filter((p) => p.status === "paid").length;
  const pending = payments.filter((p) => p.status === "pending").length;
  const failed = payments.filter((p) => p.status === "failed").length;

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Payment Management</h1>
            <p className="text-slate-400 mt-2">Track subscriptions and payment status</p>
          </header>

          {/* Payment Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <CreditCard className="text-emerald-400 mb-3" size={24} />
              <p className="text-3xl font-bold">£{(collected30d / 100).toLocaleString()}</p>
              <p className="text-sm text-slate-400">Collected (30d)</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <CheckCircle className="text-blue-400 mb-3" size={24} />
              <p className="text-3xl font-bold">{successful}</p>
              <p className="text-sm text-slate-400">Successful</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <Clock className="text-amber-400 mb-3" size={24} />
              <p className="text-3xl font-bold">{pending}</p>
              <p className="text-sm text-slate-400">Pending</p>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <AlertCircle className="text-red-400 mb-3" size={24} />
              <p className="text-3xl font-bold">{failed}</p>
              <p className="text-sm text-slate-400">Failed</p>
            </div>
          </div>

          {/* Recent Payments */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-700">
              <h3 className="font-bold text-lg">Recent Payments</h3>
            </div>
            <table className="w-full">
              <thead className="bg-slate-900/50 border-b border-slate-700">
                <tr className="text-slate-400 text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-4 text-left">Garage</th>
                  <th className="px-6 py-4 text-left">Amount</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {loading ? (
                  <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-500">Loading...</td></tr>
                ) : payments.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-10 text-center text-slate-500">No payments found.</td></tr>
                ) : payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-700/30">
                    <td className="px-6 py-4 font-medium">{payment.garage}</td>
                    <td className="px-6 py-4 font-mono">£{(payment.amount / 100).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(payment.status)}
                        <span className="capitalize text-sm">{payment.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{payment.date}</td>
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
