"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { formatUKDate } from "@/lib/uk-date";

interface Garage {
  id: string;
  name: string;
  ownerName: string;
  plan: string;
  status: string;
  revenuePence: number;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  paymentsSummary?: {
    count: number;
    totalPence: number;
    lastPaidAt: string | null;
  };
  payments?: Array<{
    id: string;
    amountPence: number;
    currency: string;
    stripeInvoiceId: string;
    paidAt: string;
  }>;
}

export default function EditGaragePage() {
  const params = useParams();
  const router = useRouter();
  const [garage, setGarage] = useState<Garage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    ownerName: "",
    plan: "TRIAL",
    status: "TRIAL",
    revenuePence: 0,
  });

  useEffect(() => {
    loadGarage();
  }, [params.id]);

  const loadGarage = async () => {
    try {
      const res = await fetch(`/api/garages/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setGarage(data);
        setFormData({
          name: data.name,
          ownerName: data.ownerName,
          plan: data.plan,
          status: data.status,
          revenuePence: data.revenuePence,
        });
      }
    } catch (error) {
      console.error("Failed to load garage:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await fetch(`/api/garages/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Garage updated successfully!");
        router.push("/admin/garages");
      } else {
        alert("Failed to update garage");
      }
    } catch (error) {
      alert("Failed to update garage");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this garage? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/garages/${params.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Garage deleted successfully!");
        router.push("/admin/garages");
      } else {
        alert("Failed to delete garage");
      }
    } catch (error) {
      alert("Failed to delete garage");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-8 flex items-center justify-center">
          <div className="text-slate-400">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  if (!garage) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Garage Not Found</h2>
            <Link href="/admin/garages" className="text-blue-400 hover:text-blue-300">
              ← Back to Garages
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link
              href="/admin/garages"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Garages
            </Link>
          </div>

          <header className="mb-8">
            <h1 className="text-3xl font-bold">Edit Garage</h1>
            <p className="text-slate-400 mt-2">Update garage details and subscription settings</p>
          </header>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="space-y-6">
              {/* Garage Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Garage Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Owner Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Owner Name *
                </label>
                <input
                  type="text"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Plan */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Plan
                </label>
                <select
                  value={formData.plan}
                  onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="TRIAL">Trial</option>
                  <option value="BASIC">Basic</option>
                  <option value="PRO">Pro</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="TRIAL">Trial</option>
                  <option value="ACTIVE">Active</option>
                  <option value="OVERDUE">Overdue</option>
                </select>
              </div>

              {/* Revenue */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  SaaS Revenue (£)
                </label>
                <input
                  type="number"
                  value={formData.revenuePence / 100}
                  onChange={(e) =>
                    setFormData({ ...formData, revenuePence: Math.round(parseFloat(e.target.value || "0") * 100) })
                  }
                  step="0.01"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  readOnly
                />
                <p className="text-xs text-slate-500 mt-2">Calculated from successful Stripe payments.</p>
              </div>

              {/* Stripe Info (Read-only) */}
              {garage.stripeCustomerId && (
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
                  <h3 className="font-semibold text-sm mb-3 text-slate-300">Stripe Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Customer ID:</span>
                      <span className="font-mono text-slate-300">{garage.stripeCustomerId}</span>
                    </div>
                    {garage.stripeSubscriptionId && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Subscription ID:</span>
                        <span className="font-mono text-slate-300">{garage.stripeSubscriptionId}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {garage.paymentsSummary && (
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
                  <h3 className="font-semibold text-sm mb-3 text-slate-300">Payment History</h3>
                  <div className="grid gap-3 sm:grid-cols-3 text-sm">
                    <div>
                      <p className="text-slate-400">Payments received</p>
                      <p className="text-lg font-semibold text-white">{garage.paymentsSummary.count}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Total collected</p>
                      <p className="text-lg font-semibold text-white">£{(garage.paymentsSummary.totalPence / 100).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Last payment</p>
                      <p className="text-lg font-semibold text-white">
                        {garage.paymentsSummary.lastPaidAt ? formatUKDate(garage.paymentsSummary.lastPaidAt) : "-"}
                      </p>
                    </div>
                  </div>

                  {garage.payments && garage.payments.length > 0 && (
                    <div className="mt-4 border-t border-slate-700 pt-4">
                      <div className="grid grid-cols-3 text-xs uppercase tracking-wide text-slate-400">
                        <span>Date</span>
                        <span>Amount</span>
                        <span>Invoice</span>
                      </div>
                      <div className="mt-2 space-y-2">
                        {garage.payments.map((payment) => (
                          <div key={payment.id} className="grid grid-cols-3 text-sm text-slate-200">
                            <span>{formatUKDate(payment.paidAt)}</span>
                            <span>
                              £{(payment.amountPence / 100).toFixed(2)} {payment.currency.toUpperCase()}
                            </span>
                            <span className="font-mono text-xs text-slate-400">{payment.stripeInvoiceId}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-8 pt-6 border-t border-slate-700">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Save size={18} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
