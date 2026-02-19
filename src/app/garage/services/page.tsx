"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

interface Service {
  id: string;
  name: string;
  description: string | null;
  category: string;
  durationMinutes: number;
  pricePence: number;
  depositRequired: boolean;
  depositPence: number;
  isActive: boolean;
  sortOrder: number;
}

const SERVICE_CATEGORIES = [
  "MOT",
  "SERVICE",
  "REPAIR",
  "DIAGNOSTIC",
  "TYRES",
  "BRAKES",
  "BATTERY",
  "EXHAUST",
  "CLUTCH",
  "SUSPENSION",
  "OTHER",
];

export default function ServicesPage() {
  const { addToast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "SERVICE",
    durationMinutes: 60,
    pricePence: 0,
    depositRequired: false,
    depositPence: 0,
    isActive: true,
    sortOrder: 0,
  });

  const garageId = typeof window !== "undefined" 
    ? JSON.parse(localStorage.getItem("garage-data") || "{}")?.id 
    : null;

  useEffect(() => {
    if (garageId) {
      fetchServices();
    }
  }, [garageId]);

  const fetchServices = async () => {
    try {
      const res = await fetch(`/api/garages/${garageId}/services`);
      const data = await res.json();
      setServices(data.services || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingService
        ? `/api/garages/${garageId}/services/${editingService.id}`
        : `/api/garages/${garageId}/services`;

      const method = editingService ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const error = await res.json();
        addToast(error.error || "Failed to save service", "error");
        return;
      }

      addToast(editingService ? "Service updated!" : "Service created!", "success");
      resetForm();
      fetchServices();
    } catch (error) {
      console.error("Error saving service:", error);
      addToast("Failed to save service", "error");
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || "",
      category: service.category,
      durationMinutes: service.durationMinutes,
      pricePence: service.pricePence,
      depositRequired: service.depositRequired,
      depositPence: service.depositPence,
      isActive: service.isActive,
      sortOrder: service.sortOrder,
    });
    setShowForm(true);
  };

  const handleDelete = async (serviceId: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const res = await fetch(`/api/garages/${garageId}/services/${serviceId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        addToast(error.error || "Failed to delete service", "error");
        return;
      }

      addToast("Service deleted!", "success");
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      addToast("Failed to delete service", "error");
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      const res = await fetch(`/api/garages/${garageId}/services/${service.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !service.isActive }),
      });

      if (!res.ok) {
        addToast("Failed to update service", "error");
        return;
      }

      fetchServices();
    } catch (error) {
      console.error("Error toggling service:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "SERVICE",
      durationMinutes: 60,
      pricePence: 0,
      depositRequired: false,
      depositPence: 0,
      isActive: true,
      sortOrder: 0,
    });
    setEditingService(null);
    setShowForm(false);
  };

  const formatPrice = (pence: number) => `£${(pence / 100).toFixed(2)}`;

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading services...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookable Services</h1>
          <p className="text-gray-600 mt-1">
            Manage services customers can book online
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add Service
        </button>
      </div>

      {/* Service Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/40 bg-white/95 backdrop-blur">
            <div className="p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/70 mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                  {editingService ? "Edit Service" : "Add Service"}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Add the details customers will see when booking.
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="text-slate-400 hover:text-slate-600 text-xl"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    required
                  >
                    {SERVICE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Duration (minutes) *
                    </label>
                    <input
                      type="number"
                      value={formData.durationMinutes}
                      onChange={(e) =>
                        setFormData({ ...formData, durationMinutes: parseInt(e.target.value) })
                      }
                      min="15"
                      step="15"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                      Price (£) *
                    </label>
                    <input
                      type="number"
                      value={formData.pricePence / 100}
                      onChange={(e) =>
                        setFormData({ ...formData, pricePence: Math.round(parseFloat(e.target.value) * 100) })
                      }
                      min="0"
                      step="0.01"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-3 p-4 bg-slate-50/80 rounded-xl border border-slate-100">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.depositRequired}
                      onChange={(e) =>
                        setFormData({ ...formData, depositRequired: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-slate-700">
                      Require Deposit
                    </span>
                  </label>

                  {formData.depositRequired && (
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">
                        Deposit Amount (£) *
                      </label>
                      <input
                        type="number"
                        value={formData.depositPence / 100}
                        onChange={(e) =>
                          setFormData({ ...formData, depositPence: Math.round(parseFloat(e.target.value) * 100) })
                        }
                        min="0"
                        step="0.01"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                        required={formData.depositRequired}
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData({ ...formData, isActive: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-semibold text-slate-700">
                      Active (visible for booking)
                    </span>
                  </label>
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
                  >
                    {editingService ? "Update Service" : "Create Service"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}

      {/* Services List */}
      {services.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">No services created yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="text-blue-600 hover:underline"
          >
            Add your first bookable service
          </button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {services.map((service) => (
            <Card key={service.id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{service.name}</h3>
                    <Badge variant={service.category === "MOT" ? "blue" : "gray"}>
                      {service.category}
                    </Badge>
                    {!service.isActive && (
                      <Badge variant="red">Inactive</Badge>
                    )}
                  </div>

                  {service.description && (
                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  )}

                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span>⏱️ {service.durationMinutes} min</span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(service.pricePence)}
                    </span>
                    {service.depositRequired && (
                      <span className="text-amber-600">
                        💰 Deposit: {formatPrice(service.depositPence)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(service)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      service.isActive
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {service.isActive ? "Active" : "Inactive"}
                  </button>
                  <button
                    onClick={() => handleEdit(service)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
