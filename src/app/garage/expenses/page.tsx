"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { Plus, DollarSign, TrendingDown, Calendar, Filter, Edit2, Trash2 } from "lucide-react";
import { getGarageId, formatPrice, poundsToPence, penceToPounds } from "@/lib/garage";
import { EXPENSE_CATEGORIES, PAYMENT_METHODS, EXPENSE_STATUSES, getPaymentMethodLabel } from "@/lib/constants";
import { formatUKDate } from "@/lib/uk-date";

type Expense = {
  id: string;
  title: string;
  category: string;
  amountPence: number;
  taxPence: number;
  vendor: string | null;
  paymentMethod: string | null;
  status: string;
  incurredAt: string;
  notes: string | null;
};

export default function ExpensesPage() {
  const { addToast } = useToast();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "Other",
    amountPence: 0,
    taxPence: 0,
    vendor: "",
    paymentMethod: "CARD",
    status: "PAID",
    incurredAt: new Date().toISOString().slice(0, 10),
    notes: "",
  });

  const garageId =
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("garage-data") || "{}")?.id : null;

  useEffect(() => {
    if (garageId) {
      fetchExpenses();
    }
  }, [garageId]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/garages/${garageId}/expenses`);
      const data = await res.json();
      setExpenses(data.expenses || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      addToast("Title is required", "error");
      return;
    }

    try {
      const url = editingExpense
        ? `/api/garages/${garageId}/expenses/${editingExpense.id}`
        : `/api/garages/${garageId}/expenses`;

      const method = editingExpense ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        addToast(error.error || "Failed to save expense", "error");
        return;
      }

      addToast(editingExpense ? "Expense updated!" : "Expense created!", "success");
      resetForm();
      fetchExpenses();
    } catch (error) {
      console.error("Error saving expense:", error);
      addToast("Failed to save expense", "error");
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      title: expense.title,
      category: expense.category,
      amountPence: expense.amountPence,
      taxPence: expense.taxPence,
      vendor: expense.vendor || "",
      paymentMethod: expense.paymentMethod || "CARD",
      status: expense.status,
      incurredAt: new Date(expense.incurredAt).toISOString().slice(0, 10),
      notes: expense.notes || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (expenseId: string) => {
    if (!confirm("Are you sure you want to delete this expense?")) return;

    try {
      const res = await fetch(`/api/garages/${garageId}/expenses/${expenseId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        addToast(error.error || "Failed to delete expense", "error");
        return;
      }

      addToast("Expense deleted!", "success");
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
      addToast("Failed to delete expense", "error");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "Other",
      amountPence: 0,
      taxPence: 0,
      vendor: "",
      paymentMethod: "CARD",
      status: "PAID",
      incurredAt: new Date().toISOString().slice(0, 10),
      notes: "",
    });
    setEditingExpense(null);
    setShowForm(false);
  };

  const totalExpenses = expenses
    .filter((e) => e.status === "PAID")
    .reduce((sum, e) => sum + e.amountPence + e.taxPence, 0);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading expenses...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expense Management</h1>
          <p className="text-gray-600 mt-1">Track and manage garage expenses</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Expense
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Total Expenses</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{formatPrice(totalExpenses)}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="text-red-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">This Month</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">
                {
                  expenses.filter((e) => {
                    const d = new Date(e.incurredAt);
                    const now = new Date();
                    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
                  }).length
                }
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Pending</p>
              <p className="text-3xl font-bold text-amber-600 mt-1">
                {expenses.filter((e) => e.status === "PENDING").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-amber-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Expense Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/40 bg-white/95 backdrop-blur">
            <div className="p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/70 mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{editingExpense ? "Edit Expense" : "Add Expense"}</h2>
                  <p className="text-sm text-slate-500 mt-1">Track costs for accurate profitability reporting.</p>
                </div>
                <button onClick={resetForm} className="text-slate-400 hover:text-slate-600 text-xl" aria-label="Close">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    >
                      {EXPENSE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    >
                      <option value="PAID">Paid</option>
                      <option value="PENDING">Pending</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Amount (£)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={(formData.amountPence / 100).toFixed(2)}
                      onChange={(e) =>
                        setFormData({ ...formData, amountPence: Math.round(parseFloat(e.target.value || "0") * 100) })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Tax (£)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={(formData.taxPence / 100).toFixed(2)}
                      onChange={(e) =>
                        setFormData({ ...formData, taxPence: Math.round(parseFloat(e.target.value || "0") * 100) })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Vendor</label>
                    <input
                      type="text"
                      value={formData.vendor}
                      onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Payment Method</label>
                    <select
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    >
                      {PAYMENT_METHODS.map((method) => (
                        <option key={method} value={method}>
                          {method.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={formData.incurredAt}
                    onChange={(e) => setFormData({ ...formData, incurredAt: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm">
                    {editingExpense ? "Update" : "Create"} Expense
                  </button>
                  <button type="button" onClick={resetForm} className="px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}

      {/* Expenses Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Vendor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.length > 0 ? (
                expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatUKDate(expense.incurredAt)}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{expense.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{expense.category}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{expense.vendor || "-"}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-red-600">
                      {formatPrice(expense.amountPence + expense.taxPence)}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={expense.status === "PAID" ? "success" : expense.status === "PENDING" ? "warning" : "error"}>
                        {expense.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(expense)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(expense.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No expenses recorded yet. Click "Add Expense" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
