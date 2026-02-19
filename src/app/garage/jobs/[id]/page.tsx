"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  DollarSign,
  Wrench,
  Plus,
  Trash2,
  Save,
  X,
  CheckCircle,
  Edit2,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { vehicleTitle } from "@/lib/vehicle";
import { formatUKDate } from "@/lib/uk-date";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";

// Predefined items for quick selection
const COMMON_LABOR = [
  { name: "Labor - Diagnostic", price: 5000 }, // £50
  { name: "Labor - MOT Inspection", price: 5000 },
  { name: "Labor - Oil Change", price: 3000 },
  { name: "Labor - Tire Change", price: 4000 },
  { name: "Labor - Brake Inspection", price: 3500 },
  { name: "Labor - General Repair", price: 6000 },
  { name: "Labor - Alignment", price: 8000 },
  { name: "Labor - Transmission Service", price: 10000 },
];

const COMMON_PARTS = [
  { name: "Oil Filter", price: 1500 }, // £15
  { name: "Air Filter", price: 2000 },
  { name: "Cabin Air Filter", price: 1800 },
  { name: "Brake Pads (Front)", price: 4000 },
  { name: "Brake Pads (Rear)", price: 3500 },
  { name: "Spark Plugs", price: 2500 },
  { name: "Tire (Standard)", price: 12000 },
  { name: "Battery", price: 8000 },
  { name: "Alternator", price: 15000 },
  { name: "Starter Motor", price: 12000 },
  { name: "Water Pump", price: 5500 },
  { name: "Radiator", price: 10000 },
];

const COMMON_SERVICES = [
  { name: "MOT Test", price: 5500 },
  { name: "Full Service", price: 15000 },
  { name: "Interim Service", price: 8000 },
  { name: "Air Conditioning Service", price: 6000 },
  { name: "Wheel Alignment", price: 8000 },
  { name: "Brake Fluid Flush", price: 4000 },
  { name: "Transmission Fluid Change", price: 7000 },
];

interface JobItem {
  id: string;
  type: "PART" | "LABOR" | "SERVICE";
  name: string;
  description: string | null;
  quantity: number;
  unitPricePence: number;
  totalPence: number;
  supplierCost: number | null;
  partNumber: string | null;
}

interface Vehicle {
  id: string;
  vrm: string;
  make: string;
  model: string;
  ownerName: string;
  ownerPhone: string | null;
  ownerEmail: string | null;
}

interface Job {
  id: string;
  jobNumber: string;
  type: string;
  status: string;
  description: string | null;
  bookedDate: string | null;
  startedAt: string | null;
  completedAt: string | null;
  estimatedHours: number | null;
  actualHours: number | null;
  laborRate: number | null;
  laborTotal: number;
  partsTotal: number;
  subtotal: number;
  vatRate?: number;
  vatAmount: number;
  total: number;
  notes: string | null;
  source?: string;
  vehicle: Vehicle;
  items: JobItem[];
  invoice: { id: string; invoiceNumber: string; status: string } | null;
}

interface NewItem {
  type: "PART" | "LABOR" | "SERVICE";
  name: string;
  description: string;
  quantity: number | string;
  unitPricePence: number | string;
  partNumber?: string;
  supplierCost?: number;
}

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addToast } = useToast();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showEditJob, setShowEditJob] = useState(false);

  const [editJobData, setEditJobData] = useState({
    status: "",
    description: "",
    actualHours: "0",
    notes: "",
  });

  const [newItem, setNewItem] = useState<NewItem>({
    type: "LABOR",
    name: "",
    description: "",
    quantity: "1",
    unitPricePence: "5000",
  });

  const getItemsForType = () => {
    if (newItem.type === "LABOR") return COMMON_LABOR;
    if (newItem.type === "PART") return COMMON_PARTS;
    if (newItem.type === "SERVICE") return COMMON_SERVICES;
    return [];
  };

  useEffect(() => {
    loadJob();
  }, [id]);

  // Refresh job data when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadJob();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [id]);

  const loadJob = async () => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (!res.ok) throw new Error("Failed to load job");
      const data = await res.json();
      setJob(data);
      setEditJobData({
        status: data.status,
        description: data.description || "",
        actualHours: String(data.actualHours || 0),
        notes: data.notes || "",
      });
    } catch (error) {
      console.error("Error loading job:", error);
      addToast("Failed to load job details", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateJob = async () => {
    if (!job) return;
    setUpdating(true);

    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editJobData,
          actualHours: parseFloat(String(editJobData.actualHours)) || 0,
        }),
      });

      if (!res.ok) throw new Error("Failed to update job");
      
      await loadJob();
      setShowEditJob(false);
      addToast("Job updated successfully!", "success");
    } catch (error) {
      console.error("Error updating job:", error);
      addToast("Failed to update job", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleAddItem = async () => {
    if (!job || !newItem.name.trim()) {
      addToast("Please enter an item name", "error");
      return;
    }

    setUpdating(true);

    try {
      const itemToAdd = {
        ...newItem,
        quantity: parseFloat(String(newItem.quantity)) || 1,
        unitPricePence: parseInt(String(newItem.unitPricePence)) || 5000,
      };
      
      const res = await fetch(`/api/jobs/${job.id}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [itemToAdd] }),
      });

      if (!res.ok) throw new Error("Failed to add item");

      await loadJob();
      setNewItem({
        type: "LABOR",
        name: "",
        description: "",
        quantity: "1",
        unitPricePence: "5000",
      });
      setShowAddItem(false);
      addToast("Item added successfully!", "success");
    } catch (error) {
      console.error("Error adding item:", error);
      addToast("Failed to add item", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!job) return;

    setUpdating(true);

    try {
      const res = await fetch(`/api/jobs/${job.id}/items?itemId=${itemId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete item");

      await loadJob();
      addToast("Item removed successfully!", "success");
    } catch (error) {
      console.error("Error deleting item:", error);
      addToast("Failed to remove item", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleGenerateInvoice = async () => {
    if (!job || job.invoice || job.status !== "DONE") {
      addToast("Job must be completed (DONE) before generating invoice", "error");
      return;
    }

    setUpdating(true);

    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job.id }),
      });

      if (!res.ok) throw new Error("Failed to generate invoice");

      const invoice = await res.json();
      addToast("Invoice generated successfully!", "success");
      router.push(`/garage/invoices/${invoice.id}`);
    } catch (error) {
      console.error("Error generating invoice:", error);
      addToast("Failed to generate invoice", "error");
    } finally {
      setUpdating(false);
    }
  };

  const handleQuickStatusChange = async (newStatus: string) => {
    if (!job) return;
    
    setUpdating(true);
    try {
      const updates: any = { status: newStatus };
      
      if (newStatus === "DOING" && !job.startedAt) {
        updates.startedAt = new Date().toISOString();
      }
      
      if (newStatus === "DONE" && !job.completedAt) {
        updates.completedAt = new Date().toISOString();
      }

      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Failed to update status");
      
      await loadJob();
      
      // Auto-generate invoice when marked as DONE
      if (newStatus === "DONE" && !job.invoice) {
        await handleGenerateInvoice();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      addToast("Failed to update status", "error");
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      TODO: "bg-blue-100 text-blue-800 border-blue-300",
      DOING: "bg-orange-100 text-orange-800 border-orange-300",
      DONE: "bg-green-100 text-green-800 border-green-300",
      // Legacy statuses (for backwards compatibility)
      BOOKED: "bg-blue-100 text-blue-800 border-blue-300",
      IN_PROGRESS: "bg-orange-100 text-orange-800 border-orange-300",
      COMPLETED: "bg-green-100 text-green-800 border-green-300",
      INVOICED: "bg-purple-100 text-purple-800 border-purple-300",
      PAID: "bg-emerald-100 text-emerald-800 border-emerald-300",
      CANCELLED: "bg-red-100 text-red-800 border-red-300",
    };
    return styles[status as keyof typeof styles] || "bg-slate-100 text-slate-700";
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      TODO: <Clock size={16} />,
      DOING: <Wrench size={16} />,
      DONE: <CheckCircle size={16} />,
      // Legacy
      BOOKED: <Clock size={16} />,
      IN_PROGRESS: <Wrench size={16} />,
      COMPLETED: <CheckCircle size={16} />,
      INVOICED: <FileText size={16} />,
      PAID: <DollarSign size={16} />,
      CANCELLED: <X size={16} />,
    };
    return icons[status as keyof typeof icons] || <Clock size={16} />;
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      TODO: "Scheduled",
      DOING: "Working On It",
      DONE: "Complete",
      // Legacy
      BOOKED: "Booked",
      IN_PROGRESS: "In Progress",
      COMPLETED: "Completed",
      INVOICED: "Invoiced",
      PAID: "Paid",
      CANCELLED: "Cancelled",
    };
    return labels[status as keyof typeof labels] || status;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-slate-600">Job not found</p>
        <Link
          href="/garage/jobs"
          className="mt-4 inline-block text-blue-600 hover:text-blue-700"
        >
          ← Back to Jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/garage/jobs"
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900">{job.jobNumber}</h1>
              <div className={`relative inline-flex items-center rounded-full border-2 px-3 py-1 text-sm font-bold ${getStatusBadge(job.status)}`}>
                <select
                  value={job.status}
                  onChange={(event) => {
                    if (event.target.value !== job.status) {
                      handleQuickStatusChange(event.target.value);
                    }
                  }}
                  disabled={updating}
                  className="appearance-none bg-transparent pr-6 text-inherit focus:outline-none"
                  aria-label="Change job status"
                >
                  {[
                    { value: "TODO", label: "Scheduled" },
                    { value: "DOING", label: "Working On It" },
                    { value: "DONE", label: "Complete" },
                    { value: job.status, label: getStatusLabel(job.status) },
                  ]
                    .filter(
                      (option, index, self) =>
                        self.findIndex((item) => item.value === option.value) === index
                    )
                    .map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                </select>
                <span className="pointer-events-none absolute right-2">▾</span>
              </div>
              {job.source === "ONLINE_BOOKING" && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full" title="Created from online booking">
                  🌐 Online Booking
                </span>
              )}
            </div>
            <p className="text-slate-500 mt-1">
              {job.type} - {job.vehicle.vrm} ({vehicleTitle(job.vehicle)})
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          {!showEditJob && (
            <button
              onClick={() => setShowEditJob(true)}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg font-semibold flex items-center gap-2"
            >
              <Edit2 size={18} />
              Edit Job
            </button>
          )}
          {job.status === "DONE" && !job.invoice && (
            <button
              onClick={handleGenerateInvoice}
              disabled={updating}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-lg font-semibold flex items-center gap-2"
            >
              <FileText size={18} />
              Generate Invoice
            </button>
          )}
          {job.invoice && (
            <Link
              href={`/garage/invoices/${job.invoice.id}`}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold flex items-center gap-2"
            >
              <FileText size={18} />
              View Invoice
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Edit Job Form */}
          {showEditJob && (
            <Card className="p-6 border-2 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">Edit Job Details</h2>
                <button
                  onClick={() => setShowEditJob(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Status
                  </label>
                  <select
                    value={editJobData.status}
                    onChange={(e) =>
                      setEditJobData({ ...editJobData, status: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                  >
                    <option value="TODO">To Do (Scheduled)</option>
                    <option value="DOING">Working On It</option>
                    <option value="DONE">Complete</option>
                  </select>
                  <p className="text-sm text-slate-500 mt-1">
                    💡 Tip: Use "Start Job" and "Mark as Done" buttons above for quick updates
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Actual Hours
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    value={editJobData.actualHours}
                    onChange={(e) =>
                      setEditJobData({
                        ...editJobData,
                        actualHours: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editJobData.description}
                    onChange={(e) =>
                      setEditJobData({ ...editJobData, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Internal Notes
                  </label>
                  <textarea
                    value={editJobData.notes}
                    onChange={(e) =>
                      setEditJobData({ ...editJobData, notes: e.target.value })
                    }
                    rows={2}
                    className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={handleUpdateJob}
                  disabled={updating}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  {updating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save size={20} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </Card>
          )}

          {/* Job Details */}
          <Card className="p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Job Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Job Type</p>
                <p className="font-semibold text-slate-900">{job.type}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Booked Date</p>
                <p className="font-semibold text-slate-900">
                  {job.bookedDate ? formatUKDate(job.bookedDate) : "Not set"}
                </p>
              </div>
              {job.startedAt && (
                <div>
                  <p className="text-sm text-slate-600">Start Date</p>
                  <p className="font-semibold text-slate-900">
                    {formatUKDate(job.startedAt)}
                  </p>
                </div>
              )}
              {job.completedAt && (
                <div>
                  <p className="text-sm text-slate-600">Completed Date</p>
                  <p className="font-semibold text-slate-900">
                    {formatUKDate(job.completedAt)}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-slate-600">Estimated Hours</p>
                <p className="font-semibold text-slate-900">
                  {job.estimatedHours || "Not set"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Actual Hours</p>
                <p className="font-semibold text-slate-900">
                  {job.actualHours || "Not set"}
                </p>
              </div>
            </div>

            {job.description && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-2">Description</p>
                <p className="text-slate-900">{job.description}</p>
              </div>
            )}

            {job.notes && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600 mb-2">Internal Notes</p>
                <p className="text-slate-700 italic">{job.notes}</p>
              </div>
            )}
          </Card>

          {/* Items */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Parts & Labor</h2>
              {!showAddItem && job.status !== "COMPLETED" && job.status !== "INVOICED" && job.status !== "PAID" && (
                <button
                  onClick={() => setShowAddItem(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Item
                </button>
              )}
            </div>

            {/* Add Item Form */}
            {showAddItem && (
              <div className="mb-6 p-4 bg-slate-50 border-2 border-blue-500 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-slate-900">Add New Item</h3>
                  <button
                    onClick={() => setShowAddItem(false)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Type
                    </label>
                    <select
                      value={newItem.type}
                      onChange={(e) => {
                        const type = e.target.value as NewItem["type"];
                        setNewItem({ ...newItem, type, name: "", unitPricePence: "5000" });
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    >
                      <option value="LABOR">Labor</option>
                      <option value="PART">Part</option>
                      <option value="SERVICE">Service</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Item
                    </label>
                    <select
                      value={newItem.name}
                      onChange={(e) => {
                        const selectedName = e.target.value;
                        const item = getItemsForType().find(i => i.name === selectedName);
                        setNewItem({ 
                          ...newItem, 
                          name: selectedName,
                          unitPricePence: String(item?.price || 5000)
                        });
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                    >
                      <option value="">Select item...</option>
                      {getItemsForType().map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={newItem.quantity}
                      onChange={(e) =>
                        setNewItem({ ...newItem, quantity: e.target.value || "1" })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Unit Price (£)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={parseInt(String(newItem.unitPricePence)) / 100 || ""}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          unitPricePence: e.target.value ? String(Math.round(parseFloat(e.target.value) * 100)) : "0",
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Description (Optional)
                    </label>
                    <input
                      type="text"
                      value={newItem.description}
                      onChange={(e) =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleAddItem}
                  disabled={updating || !newItem.name}
                  className="mt-4 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  {updating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus size={20} />
                      Add Item
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Items List */}
            {job.items.length > 0 ? (
              <div className="space-y-3">
                {job.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between p-4 bg-white border-2 border-slate-200 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span
                          className={`px-2 py-1 text-xs font-bold rounded ${
                            item.type === "LABOR"
                              ? "bg-blue-100 text-blue-700"
                              : item.type === "PART"
                              ? "bg-green-100 text-green-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {item.type}
                        </span>
                        <span className="font-semibold text-slate-900">{item.name}</span>
                      </div>
                      {item.description && (
                        <p className="text-sm text-slate-600">{item.description}</p>
                      )}
                      <p className="text-sm text-slate-500 mt-1">
                        {item.quantity} x £{(item.unitPricePence / 100).toFixed(2)} = £
                        {(item.totalPence / 100).toFixed(2)}
                      </p>
                    </div>
                    {job.status !== "COMPLETED" && job.status !== "INVOICED" && job.status !== "PAID" && (
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        disabled={updating}
                        className="ml-4 text-red-600 hover:text-red-700 disabled:text-red-400 p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500">
                No items added yet.
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Customer</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-600">Name</p>
                <p className="font-semibold text-slate-900">{job.vehicle.ownerName}</p>
              </div>
              {job.vehicle.ownerPhone && (
                <div>
                  <p className="text-sm text-slate-600">Phone</p>
                  <a
                    href={`tel:${job.vehicle.ownerPhone}`}
                    className="font-semibold text-blue-600 hover:text-blue-700"
                  >
                    {job.vehicle.ownerPhone}
                  </a>
                </div>
              )}
              {job.vehicle.ownerEmail && (
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <a
                    href={`mailto:${job.vehicle.ownerEmail}`}
                    className="font-semibold text-blue-600 hover:text-blue-700 break-all"
                  >
                    {job.vehicle.ownerEmail}
                  </a>
                </div>
              )}
            </div>
          </Card>

          {/* Vehicle Info */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Vehicle</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-600">Registration</p>
                <p className="font-bold text-slate-900 text-lg">{job.vehicle.vrm}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Make & Model</p>
                <p className="font-semibold text-slate-900">
                  {vehicleTitle(job.vehicle)}
                </p>
              </div>
            </div>
          </Card>

          {/* Financial Summary */}
          <Card className="p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Financial Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-slate-700">
                <span>Labor:</span>
                <span className="font-semibold">£{(job.laborTotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Parts:</span>
                <span className="font-semibold">£{(job.partsTotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-700 pt-3 border-t border-slate-200">
                <span>Subtotal:</span>
                <span className="font-semibold">£{(job.subtotal / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>VAT ({job.vatRate ?? 20}%):</span>
                <span className="font-semibold">£{(job.vatAmount / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-900 pt-3 border-t-2 border-slate-300">
                <span>Total:</span>
                <span>£{(job.total / 100).toFixed(2)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
