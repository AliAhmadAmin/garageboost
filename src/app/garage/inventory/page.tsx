"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { Plus, Package, AlertTriangle, TrendingUp, Edit2, Trash2, History } from "lucide-react";
import { getGarageId, formatPrice, poundsToPence, penceToPounds } from "@/lib/garage";
import { INVENTORY_CATEGORIES, TRANSACTION_TYPES, getTransactionTypeLabel } from "@/lib/constants";
import { formatUKDate } from "@/lib/uk-date";

type InventoryItem = {
  id: string;
  name: string;
  sku: string | null;
  category: string | null;
  brand: string | null;
  location: string | null;
  supplier: string | null;
  unitCostPence: number;
  unitPricePence: number;
  quantityOnHand: number;
  reorderLevel: number;
  isActive: boolean;
};

type Transaction = {
  id: string;
  type: string;
  quantity: number;
  unitCostPence: number | null;
  reference: string | null;
  notes: string | null;
  createdAt: string;
};

export default function InventoryPage() {
  const { addToast } = useToast();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "Parts",
    brand: "",
    location: "",
    supplier: "",
    unitCostPence: 0,
    unitPricePence: 0,
    quantityOnHand: 0,
    reorderLevel: 0,
    isActive: true,
  });
  const [transactionData, setTransactionData] = useState({
    type: "RECEIPT",
    quantity: 0,
    unitCostPence: 0,
    reference: "",
    notes: "",
  });

  const garageId =
    typeof window !== "undefined" ? JSON.parse(localStorage.getItem("garage-data") || "{}")?.id : null;

  useEffect(() => {
    if (garageId) {
      fetchItems();
    }
  }, [garageId]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/garages/${garageId}/inventory`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async (itemId: string) => {
    try {
      const res = await fetch(`/api/garages/${garageId}/inventory/${itemId}/transactions`);
      const data = await res.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      addToast("Name is required", "error");
      return;
    }

    try {
      const url = editingItem
        ? `/api/garages/${garageId}/inventory/${editingItem.id}`
        : `/api/garages/${garageId}/inventory`;

      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        addToast(error.error || "Failed to save item", "error");
        return;
      }

      addToast(editingItem ? "Item updated!" : "Item created!", "success");
      resetForm();
      fetchItems();
    } catch (error) {
      console.error("Error saving item:", error);
      addToast("Failed to save item", "error");
    }
  };

  const handleTransactionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedItem) return;

    try {
      const res = await fetch(`/api/garages/${garageId}/inventory/${selectedItem.id}/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      if (!res.ok) {
        const error = await res.json();
        addToast(error.error || "Failed to create transaction", "error");
        return;
      }

      addToast("Transaction recorded!", "success");
      setTransactionData({ type: "RECEIPT", quantity: 0, unitCostPence: 0, reference: "", notes: "" });
      setShowTransactionModal(false);
      fetchItems();
    } catch (error) {
      console.error("Error creating transaction:", error);
      addToast("Failed to create transaction", "error");
    }
  };

  const handleEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      sku: item.sku || "",
      category: item.category || "Parts",
      brand: item.brand || "",
      location: item.location || "",
      supplier: item.supplier || "",
      unitCostPence: item.unitCostPence,
      unitPricePence: item.unitPricePence,
      quantityOnHand: item.quantityOnHand,
      reorderLevel: item.reorderLevel,
      isActive: item.isActive,
    });
    setShowForm(true);
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm("Are you sure you want to deactivate this item?")) return;

    try {
      const res = await fetch(`/api/garages/${garageId}/inventory/${itemId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        addToast(error.error || "Failed to delete item", "error");
        return;
      }

      addToast("Item deactivated!", "success");
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      addToast("Failed to delete item", "error");
    }
  };

  const handleShowTransactions = async (item: InventoryItem) => {
    setSelectedItem(item);
    await fetchTransactions(item.id);
    setShowTransactionModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      sku: "",
      category: "Parts",
      brand: "",
      location: "",
      supplier: "",
      unitCostPence: 0,
      unitPricePence: 0,
      quantityOnHand: 0,
      reorderLevel: 0,
      isActive: true,
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const totalValue = items.reduce((sum, item) => sum + item.quantityOnHand * item.unitCostPence, 0);
  const lowStockItems = items.filter((item) => item.quantityOnHand <= item.reorderLevel && item.isActive);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading inventory...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track parts, supplies, and stock levels</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Item
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Total Value</p>
              <p className="text-3xl font-bold text-blue-600 mt-1">{formatPrice(totalValue)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Active Items</p>
              <p className="text-3xl font-bold text-slate-900 mt-1">{items.filter((i) => i.isActive).length}</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-emerald-600" size={24} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Low Stock</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{lowStockItems.length}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </Card>
      </div>

      {/* Item Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/40 bg-white/95 backdrop-blur">
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{editingItem ? "Edit Item" : "Add Item"}</h2>
                  <p className="text-sm text-slate-500 mt-1">Keep stock details accurate for smoother operations.</p>
                </div>
                <button onClick={resetForm} className="text-slate-400 hover:text-slate-600 text-xl" aria-label="Close">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">SKU</label>
                    <input
                      type="text"
                      value={formData.sku}
                      onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    >
                      {INVENTORY_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Brand</label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                      placeholder="e.g. Shelf A3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Supplier</label>
                    <input
                      type="text"
                      value={formData.supplier}
                      onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Cost Price (£)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={(formData.unitCostPence / 100).toFixed(2)}
                      onChange={(e) =>
                        setFormData({ ...formData, unitCostPence: Math.round(parseFloat(e.target.value || "0") * 100) })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Sell Price (£)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={(formData.unitPricePence / 100).toFixed(2)}
                      onChange={(e) =>
                        setFormData({ ...formData, unitPricePence: Math.round(parseFloat(e.target.value || "0") * 100) })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Quantity on Hand</label>
                    <input
                      type="number"
                      value={formData.quantityOnHand}
                      onChange={(e) => setFormData({ ...formData, quantityOnHand: parseInt(e.target.value || "0") })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Reorder Level</label>
                    <input
                      type="number"
                      value={formData.reorderLevel}
                      onChange={(e) => setFormData({ ...formData, reorderLevel: parseInt(e.target.value || "0") })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm">
                    {editingItem ? "Update" : "Create"} Item
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

      {/* Transaction Modal */}
      {showTransactionModal && selectedItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/40 bg-white/95 backdrop-blur">
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Transactions: {selectedItem.name}</h2>
                  <p className="text-sm text-slate-500 mt-1">Keep a clear record of stock movements.</p>
                </div>
                <button
                  onClick={() => setShowTransactionModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-xl"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleTransactionSubmit} className="space-y-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h3 className="font-semibold text-slate-900">New Transaction</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Type</label>
                    <select
                      value={transactionData.type}
                      onChange={(e) => setTransactionData({ ...transactionData, type: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    >
                      <option value="RECEIPT">Receipt</option>
                      <option value="ISSUE">Issue</option>
                      <option value="ADJUSTMENT">Adjustment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Quantity</label>
                    <input
                      type="number"
                      value={transactionData.quantity}
                      onChange={(e) => setTransactionData({ ...transactionData, quantity: parseInt(e.target.value || "0") })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Unit Cost (£)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={(transactionData.unitCostPence / 100).toFixed(2)}
                      onChange={(e) =>
                        setTransactionData({ ...transactionData, unitCostPence: Math.round(parseFloat(e.target.value || "0") * 100) })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Reference</label>
                  <input
                    type="text"
                    value={transactionData.reference}
                    onChange={(e) => setTransactionData({ ...transactionData, reference: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    placeholder="e.g. PO-123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Notes</label>
                  <textarea
                    value={transactionData.notes}
                    onChange={(e) => setTransactionData({ ...transactionData, notes: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    rows={2}
                  />
                </div>

                <button type="submit" className="w-full px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm">
                  Record Transaction
                </button>
              </form>

              <div className="space-y-2">
                <h3 className="font-semibold text-slate-900">Transaction History</h3>
                {transactions.length > 0 ? (
                  transactions.map((txn) => (
                    <div key={txn.id} className="p-3 border border-slate-200 rounded-lg text-sm bg-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <Badge variant={txn.type === "RECEIPT" ? "success" : txn.type === "ISSUE" ? "warning" : "default"}>
                            {txn.type}
                          </Badge>
                          <span className="ml-2 font-semibold text-slate-900">
                            {txn.quantity > 0 ? `+${txn.quantity}` : txn.quantity}
                          </span>
                          {txn.reference && <span className="ml-2 text-slate-500">({txn.reference})</span>}
                        </div>
                        <div className="text-slate-500">{formatUKDate(txn.createdAt)}</div>
                      </div>
                      {txn.notes && <div className="mt-1 text-slate-600">{txn.notes}</div>}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-slate-500 py-4">No transactions yet</div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Inventory Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">SKU</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Qty</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Cost</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.length > 0 ? (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">{item.sku || "-"}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{item.category || "-"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`font-semibold ${
                          item.quantityOnHand <= item.reorderLevel ? "text-red-600" : "text-slate-900"
                        }`}
                      >
                        {item.quantityOnHand}
                      </span>
                      {item.quantityOnHand <= item.reorderLevel && (
                        <AlertTriangle size={14} className="inline ml-1 text-red-600" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{formatPrice(item.unitCostPence)}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-600">{formatPrice(item.unitPricePence)}</td>
                    <td className="px-6 py-4">
                      <Badge variant={item.isActive ? "success" : "error"}>{item.isActive ? "Active" : "Inactive"}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleShowTransactions(item)}
                          className="p-1 text-purple-600 hover:bg-purple-50 rounded"
                          title="View Transactions"
                        >
                          <History size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                          title="Deactivate"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No inventory items yet. Click "Add Item" to get started.
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
