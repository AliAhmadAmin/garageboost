"use client";

import { useEffect, useState } from "react";
import { Trash2, Edit, Send, FileText, Mail, X, History } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { vehicleTitle } from "@/lib/vehicle";
import { VehicleEditModal } from "@/components/ui/VehicleEditModal";
import { CustomerTimeline } from "@/components/CustomerTimeline";
import { useToast, ToastContainer } from "@/components/ui/Toast";
import { getErrorMessage } from "@/lib/api-error";
import { formatUKDate } from "@/lib/uk-date";

interface Vehicle {
  id: string;
  customerId?: string | null;
  vrm: string;
  make: string;
  model: string;
  motExpiry: string;
  taxExpiry?: string | null;
  taxStatus?: string | null;
  ownerName: string;
  ownerPhone?: string;
  ownerEmail?: string;
  advisories?: Array<{ estPricePence: number }>;
  mileage?: number;
  createdAt?: string;
}

interface Quote {
  id: string;
  quoteNumber: string;
  status: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  totalPence: number;
  sentAt?: string;
  respondedAt?: string;
  respondedStatus?: string;
  createdAt: string;
  vehicle: {
    vrm: string;
    make: string;
    model: string;
  };
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source?: string;
  vehicles: Vehicle[];
  createdAt: string;
}

interface Garage {
  id: string;
}

interface DeleteCustomerTarget {
  id: string;
  name: string;
  vehiclesCount: number;
}

const getMOTStatus = (motExpiry: string) => {
  const expiry = new Date(motExpiry);
  const today = new Date();
  const daysRemaining = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysRemaining < 0) {
    return { status: "EXPIRED", daysRemaining: 0, color: "text-red-600", bgColor: "bg-red-50", badge: "text-red-700 bg-red-100" };
  } else if (daysRemaining < 14) {
    return { status: "URGENT", daysRemaining, color: "text-amber-600", bgColor: "bg-amber-50", badge: "text-amber-700 bg-amber-100" };
  } else {
    return { status: "VALID", daysRemaining, color: "text-emerald-600", bgColor: "bg-emerald-50", badge: "text-emerald-700 bg-emerald-100" };
  }
};

export default function CRMPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [garage, setGarage] = useState<Garage | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"customers" | "quotes">("customers");
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [quoteForm, setQuoteForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    status: "DRAFT",
  });
  const [isSavingQuote, setIsSavingQuote] = useState(false);
  const [isDeletingQuote, setIsDeletingQuote] = useState<string | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState<string | null>(null);
  const [isDeletingCustomer, setIsDeletingCustomer] = useState<string | null>(null);
  const [deleteCustomerTarget, setDeleteCustomerTarget] = useState<DeleteCustomerTarget | null>(null);
  const [isSendingReminder, setIsSendingReminder] = useState<string | null>(null);
  const [isSendingTaxReminder, setIsSendingTaxReminder] = useState<string | null>(null);
  const [isCheckingRecalls, setIsCheckingRecalls] = useState<string | null>(null);
  const [isGeneratingHealthCheck, setIsGeneratingHealthCheck] = useState<string | null>(null);
  const [timelineCustomerId, setTimelineCustomerId] = useState<string | null>(null);
  const [timelineCustomer, setTimelineCustomer] = useState<any | null>(null);
  const [isTimelineLoading, setIsTimelineLoading] = useState(false);
  const [openContactMenuId, setOpenContactMenuId] = useState<string | null>(null);
  const [openRemindMenuId, setOpenRemindMenuId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState<"all" | "manual" | "online">("all");
  const [motFilter, setMotFilter] = useState<"all" | "expired" | "urgent" | "valid">("all");
  const { toasts, addToast, removeToast } = useToast();

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenContactMenuId(null);
      setOpenRemindMenuId(null);
    };

    if (openContactMenuId || openRemindMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openContactMenuId, openRemindMenuId]);

  useEffect(() => {
    const loadData = async () => {
      try {
        let resolvedGarage: Garage | null = null;
        const storedGarage = typeof window !== "undefined"
          ? localStorage.getItem("garage-data")
          : null;

        if (storedGarage) {
          try {
            const parsed = JSON.parse(storedGarage) as Garage;
            if (parsed?.id) {
              const garageRes = await fetch(`/api/garages/${parsed.id}`);
              if (garageRes.ok) {
                resolvedGarage = await garageRes.json();
              }
            }
          } catch (error) {
            console.warn("Failed to parse stored garage data:", error);
          }
        }

        if (!resolvedGarage) {
          const garageRes = await fetch("/api/garages/me");
          const garageData: Garage | { error?: string } = await garageRes.json();
          resolvedGarage = "id" in garageData ? garageData : null;
        }
        setGarage(resolvedGarage);

        if (resolvedGarage) {
          // Load customers
          const customersRes = await fetch(`/api/garages/${resolvedGarage.id}/customers`);
          const customersData = await customersRes.json();
          setCustomers(Array.isArray(customersData) ? customersData : []);

          const vehiclesRes = await fetch(`/api/vehicles?garageId=${resolvedGarage.id}`);
          const vehiclesData = await vehiclesRes.json();
          setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);

          const quotesRes = await fetch(`/api/quotes?garageId=${resolvedGarage.id}`);
          const quotesData = await quotesRes.json();
          setQuotes(Array.isArray(quotesData) ? quotesData : []);
        }
      } catch (error) {
        addToast("Failed to load customers and quotes", "error");
        setCustomers([]);
        setVehicles([]);
        setQuotes([]);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [addToast]);

  const handleDeleteVehicle = async (customerId: string, vehicleId: string) => {
    if (!confirm("⚠️ Remove this vehicle?\n\nThe customer and their other vehicles (if any) will remain in your system.")) return;
    
    try {
      setIsDeleteLoading(vehicleId);
      const response = await fetch(`/api/vehicles/delete?id=${vehicleId}`, { method: "DELETE" });
      
      if (!response.ok) {
        throw new Error("Failed to delete vehicle");
      }
      
      // Update customers list
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === customerId
            ? { ...c, vehicles: c.vehicles.filter((v) => v.id !== vehicleId) }
            : c
        )
      );
      addToast("Vehicle removed successfully", "success");
    } catch (error) {
      addToast(`Failed to delete vehicle: ${getErrorMessage(error)}`, "error");
    } finally {
      setIsDeleteLoading(null);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) return;

    setDeleteCustomerTarget({
      id: customer.id,
      name: customer.name,
      vehiclesCount: customer.vehicles.length,
    });
  };

  const confirmDeleteCustomer = async () => {
    if (!deleteCustomerTarget) return;

    try {
      setIsDeletingCustomer(deleteCustomerTarget.id);
      const response = await fetch(`/api/garages/${garage?.id}/customers/${deleteCustomerTarget.id}`, { method: "DELETE" });
      
      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }
      
      setCustomers((prev) => prev.filter((c) => c.id !== deleteCustomerTarget.id));
      setDeleteCustomerTarget(null);
      addToast("Customer deleted successfully", "success");
    } catch (error) {
      addToast(`Failed to delete customer: ${getErrorMessage(error)}`, "error");
    } finally {
      setIsDeletingCustomer(null);
    }
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
  };

  const handleOpenTimeline = async (customerId: string) => {
    if (!garage?.id) {
      addToast("Garage not found. Please refresh and try again.", "error");
      return;
    }

    try {
      setIsTimelineLoading(true);
      setTimelineCustomerId(customerId);
      const response = await fetch(
        `/api/garages/${garage.id}/customers/${customerId}/timeline`
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("[CRM] Timeline API error:", response.status, errorData);
        throw new Error(errorData.error || `Failed to load timeline (${response.status})`);
      }

      const data = await response.json();
      console.log("[CRM] Timeline loaded successfully:", data);
      setTimelineCustomer(data);
    } catch (error) {
      console.error("[CRM] Timeline error:", error);
      addToast(`Failed to load timeline: ${getErrorMessage(error)}`, "error");
    } finally {
      setIsTimelineLoading(false);
    }
  };

  const handleCloseTimeline = () => {
    setTimelineCustomerId(null);
    setTimelineCustomer(null);
  };

  const getFilteredCustomers = () => {
    return customers.filter((customer) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        (customer.phone?.toLowerCase().includes(searchLower)) ||
        customer.vehicles.some(v => v.vrm.toLowerCase().includes(searchLower));

      if (!matchesSearch) return false;

      // Source filter
      if (sourceFilter === "manual" && customer.source === "ONLINE_BOOKING") return false;
      if (sourceFilter === "online" && customer.source !== "ONLINE_BOOKING") return false;

      // MOT filter  
      if (motFilter !== "all") {
        const hasMatchingMOT = customer.vehicles.some(v => {
          const motStatus = getMOTStatus(v.motExpiry);
          if (motFilter === "expired") return motStatus.status === "EXPIRED";
          if (motFilter === "urgent") return motStatus.status === "URGENT";
          if (motFilter === "valid") return motStatus.status === "VALID";
          return true;
        });
        if (!hasMatchingMOT) return false;
      }

      return true;
    });
  };

  const handleSendReminder = async (id: string) => {
    try {
      addToast("Clicked MOT Remind", "info");
      setIsSendingReminder(id);
      const response = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId: id,
          channel: "EMAIL",
          scheduledFor: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.details || errorData.error || "Failed to send reminder";
        throw new Error(errorMsg);
      }

      addToast("Reminder sent successfully!", "success");
    } catch (error) {
      addToast(`Failed to send reminder: ${getErrorMessage(error)}`, "error");
    } finally {
      setIsSendingReminder(null);
    }
  };

  const handleSendTaxReminder = async (id: string) => {
    try {
      addToast("Clicked Tax Remind", "info");
      setIsSendingTaxReminder(id);
      const response = await fetch("/api/reminders/tax", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId: id,
          channel: "EMAIL",
          scheduledFor: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.details || errorData.error || "Failed to send tax reminder";
        throw new Error(errorMsg);
      }

      addToast("Road tax reminder sent!", "success");
    } catch (error) {
      addToast(`Failed to send tax reminder: ${getErrorMessage(error)}`, "error");
    } finally {
      setIsSendingTaxReminder(null);
    }
  };

  const handleCheckRecalls = async (vehicleId: string) => {
    try {
      addToast("Clicked Recalls", "info");
      setIsCheckingRecalls(vehicleId);
      const response = await fetch("/api/recalls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vehicleId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.details || errorData.error || "Failed to check recalls";
        throw new Error(errorMsg);
      }

      const result = await response.json();
      addToast(`Recall check complete. New recalls: ${result.added || 0}`, "success");
    } catch (error) {
      addToast(`Recall check failed: ${getErrorMessage(error)}`, "error");
    } finally {
      setIsCheckingRecalls(null);
    }
  };

  const handleGenerateHealthCheck = async (vehicleId: string) => {
    if (!garage?.id) {
      addToast("Garage not found", "error");
      return;
    }

    try {
      setIsGeneratingHealthCheck(vehicleId);
      const response = await fetch("/api/health-checks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleId,
          garageId: garage.id,
          checkedBy: "Garage Team",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.details || errorData.error || "Failed to generate health check";
        throw new Error(errorMsg);
      }

      const created = await response.json();
      window.open(`/api/health-checks/${created.id}/pdf`, "_blank");
      addToast("Health check PDF generated", "success");
    } catch (error) {
      addToast(`Health check failed: ${getErrorMessage(error)}`, "error");
    } finally {
      setIsGeneratingHealthCheck(null);
    }
  };

  const handleSaveVehicle = async (updatedVehicle: Vehicle): Promise<void> => {
    if (!garage) return;
    
    try {
      let updatedCustomer: any = null;

      // Update customer details if this vehicle is linked to a customer
      if (updatedVehicle.customerId) {
        const customerRes = await fetch(`/api/garages/${garage.id}/customers/${updatedVehicle.customerId}`, {
          method: "PATCH",
          headers: { 
            "Content-Type": "application/json",
            "Cache-Control": "no-cache, no-store, must-revalidate"
          },
          body: JSON.stringify({
            name: updatedVehicle.ownerName,
            email: updatedVehicle.ownerEmail,
            phone: updatedVehicle.ownerPhone,
          }),
        });

        if (!customerRes.ok) {
          const errorData = await customerRes.json().catch(() => ({}));
          console.error("[CRM] Customer update error:", errorData);
        } else {
          updatedCustomer = await customerRes.json();
        }
      }

      // Update vehicle details
      const vehicleRes = await fetch(`/api/vehicles/${updatedVehicle.id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate"
        },
        body: JSON.stringify(updatedVehicle),
      });

      if (!vehicleRes.ok) {
        throw new Error("Failed to update vehicle");
      }

      const updated = await vehicleRes.json();
      setVehicles((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
      
      // Update customers with fresh response data (avoid cache)
      if (updatedCustomer) {
        setCustomers((prev) => 
          prev.map((c) => c.id === updatedCustomer.id ? updatedCustomer : c)
        );
      } else {
        // Fallback: refresh all customers with cache-busting
        const customersRes = await fetch(`/api/garages/${garage.id}/customers?t=${Date.now()}`, {
          headers: { "Cache-Control": "no-cache, no-store, must-revalidate" }
        });
        if (customersRes.ok) {
          const customersData = await customersRes.json();
          setCustomers(customersData);
        }
      }
      
      addToast("Vehicle and customer updated successfully", "success");
      setEditingVehicle(null);
    } catch (error) {
      addToast(`Failed to update vehicle: ${getErrorMessage(error)}`, "error");
    }
  };

  const handleRespondToQuote = async (quoteId: string, accepted: boolean) => {
    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: accepted ? "ACCEPTED" : "DECLINED",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quote");
      }

      const updated = await response.json();
      setQuotes((prev) => prev.map((q) => (q.id === quoteId ? updated : q)));
      addToast(`Quote ${accepted ? "accepted" : "declined"}`, "success");
    } catch (error) {
      addToast(`Failed to update quote: ${getErrorMessage(error)}`, "error");
    }
  };

  const openQuoteEditor = (quote: Quote) => {
    setEditingQuote(quote);
    setQuoteForm({
      customerName: quote.customerName || "",
      customerEmail: quote.customerEmail || "",
      customerPhone: quote.customerPhone || "",
      status: quote.status || "DRAFT",
    });
  };

  const handleSaveQuote = async () => {
    if (!editingQuote) return;

    if (!quoteForm.customerName.trim() || !quoteForm.customerEmail.trim()) {
      addToast("Customer name and email are required", "error");
      return;
    }

    try {
      setIsSavingQuote(true);
      const response = await fetch(`/api/quotes/${editingQuote.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: quoteForm.customerName,
          customerEmail: quoteForm.customerEmail,
          customerPhone: quoteForm.customerPhone || null,
          status: quoteForm.status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update quote");
      }

      const updated = await response.json();
      setQuotes((prev) => prev.map((q) => (q.id === updated.id ? updated : q)));
      addToast("Quote updated", "success");
      setEditingQuote(null);
    } catch (error) {
      addToast(`Failed to update quote: ${getErrorMessage(error)}`, "error");
    } finally {
      setIsSavingQuote(false);
    }
  };

  const handleDeleteQuote = async (quoteId: string) => {
    if (!confirm("Are you sure you want to delete this quote?")) return;

    try {
      setIsDeletingQuote(quoteId);
      const response = await fetch(`/api/quotes/${quoteId}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Failed to delete quote");
      }

      setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
      addToast("Quote deleted", "success");
    } catch (error) {
      addToast(`Failed to delete quote: ${getErrorMessage(error)}`, "error");
    } finally {
      setIsDeletingQuote(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Customers</h2>
        <p className="text-slate-500">Manage all your customers and their vehicles</p>
      </header>

      <VehicleEditModal
        isOpen={!!editingVehicle}
        vehicle={editingVehicle}
        onClose={() => setEditingVehicle(null)}
        onSave={handleSaveVehicle}
      />

      {deleteCustomerTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md rounded-xl bg-white shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Delete customer?</h3>
              <p className="text-sm text-slate-600 mt-1">
                You are deleting <span className="font-semibold">{deleteCustomerTarget.name}</span> permanently.
              </p>
            </div>

            <div className="p-5 text-sm text-slate-700">
              <p className="font-semibold text-amber-700 mb-2">This will remove:</p>
              <ul className="space-y-1 list-disc pl-5">
                <li>Customer contact details</li>
                <li>All vehicles ({deleteCustomerTarget.vehiclesCount})</li>
                <li>Quotes and related history</li>
              </ul>
              <p className="mt-3 text-red-600 font-semibold">This action cannot be undone.</p>
            </div>

            <div className="p-4 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                onClick={() => setDeleteCustomerTarget(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
                disabled={isDeletingCustomer === deleteCustomerTarget.id}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteCustomer}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-60"
                disabled={isDeletingCustomer === deleteCustomerTarget.id}
              >
                {isDeletingCustomer === deleteCustomerTarget.id ? "Deleting..." : "Delete customer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <Card className="p-3 md:p-4">
        <div className="space-y-2">
          {/* Search Input */}
          <div>
            <input
              type="text"
              placeholder="Search by name, email, phone, or VRM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Source</label>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value as any)}
                className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
              >
                <option value="all">All Customers</option>
                <option value="manual">Manual Entry</option>
                <option value="online">Online Booking</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">MOT Status</label>
              <select
                value={motFilter}
                onChange={(e) => setMotFilter(e.target.value as any)}
                className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-blue-500 transition-colors text-sm"
              >
                <option value="all">All Status</option>
                <option value="valid">✓ Valid</option>
                <option value="urgent">⏰ Urgent (14d)</option>
                <option value="expired">⚠️ Expired</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {/* Tab Navigation */}
      <Card className="p-0 border-b border-slate-200">
        <div className="flex gap-0">
          <button
            onClick={() => setActiveTab("customers")}
            className={`flex-1 px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "customers"
                ? "border-blue-600 text-blue-600 bg-blue-50"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Customers ({getFilteredCustomers().length})
          </button>
          <button
            onClick={() => setActiveTab("quotes")}
            className={`flex-1 px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === "quotes"
                ? "border-blue-600 text-blue-600 bg-blue-50"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Quotes ({quotes.length})
          </button>
        </div>
      </Card>

      {/* Customers Tab */}
      {activeTab === "customers" && (
        <Card>
          {getFilteredCustomers().length > 0 ? (
            <div className="divide-y divide-slate-100">
              {getFilteredCustomers().map((customer) => (
                <div key={customer.id} className="p-4 md:p-6 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0">
                  {/* Customer Header */}
                  <div className="hidden">
                    <div className="flex items-start sm:items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-blue-600 font-bold text-base sm:text-lg">{customer.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-slate-900 text-base sm:text-lg truncate">{customer.name}</h3>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-500 break-all">{customer.email} • {customer.vehicles.length} vehicle{customer.vehicles.length !== 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </div>



                  {/* Vehicles */}
                  {customer.vehicles.length > 0 && (
                    <div className="space-y-2">
                      {customer.vehicles.map((vehicle) => {
                        const motInfo = getMOTStatus(vehicle.motExpiry);
                        return (
                          <div key={vehicle.id} className={`${motInfo.bgColor} rounded-lg p-3 md:p-4 border-l-4 ${motInfo.status === "EXPIRED" ? "border-red-600" : motInfo.status === "URGENT" ? "border-amber-600" : "border-emerald-600"}`}>
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <div className="flex items-start gap-2 min-w-0 flex-1">
                                <span className="bg-yellow-400 border-2 border-slate-900 rounded px-2 py-1 font-bold text-xs sm:text-sm shrink-0">
                                  {vehicle.vrm}
                                </span>
                                <div className="min-w-0 flex-1">
                                  <p className="font-semibold text-slate-900 text-sm sm:text-base">
                                    {vehicleTitle(vehicle)}
                                  </p>
                                  <p className="text-xs text-slate-500 truncate">{vehicle.ownerName}{customer.source === "ONLINE_BOOKING" && <span className="ml-1">🌐</span>}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  onClick={() => handleEditVehicle(vehicle)}
                                  className="text-blue-600 hover:text-blue-700 p-1.5 rounded hover:bg-blue-100 transition-colors"
                                  title="Edit vehicle & customer details"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteCustomer(customer.id)}
                                  disabled={isDeletingCustomer === customer.id}
                                  className="text-red-600 hover:text-white hover:bg-red-600 disabled:text-red-400 disabled:bg-transparent p-1.5 rounded transition-colors"
                                  title="Delete customer and all vehicles"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-3 text-sm">
                              <div>
                                <p className="text-xs text-slate-600 font-semibold">
                                  MOT Expires <span className={motInfo.color}>
                                    ({motInfo.status === "EXPIRED" ? "⚠️ EXPIRED" : motInfo.status === "URGENT" ? `⏰ ${motInfo.daysRemaining}d` : `✓ ${motInfo.daysRemaining}d`})
                                  </span>
                                </p>
                                <p className={`font-semibold text-xs sm:text-sm text-slate-500`}>{formatUKDate(vehicle.motExpiry)}</p>
                              </div>
                              <div>
                                <p className="text-xs text-slate-600 font-semibold">
                                  Road Tax {vehicle.taxStatus && (
                                    <span className={vehicle.taxStatus === "Taxed" ? "text-emerald-600" : vehicle.taxStatus === "Untaxed" ? "text-red-600" : "text-slate-600"}>
                                      ({vehicle.taxStatus})
                                    </span>
                                  )}
                                </p>
                                <p className="font-semibold text-xs sm:text-sm text-slate-500">
                                  {vehicle.taxExpiry ? `Expires: ${formatUKDate(vehicle.taxExpiry)}` : "No expiry date"}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-200">
                              {/* Contact Button with Dropdown */}
                              <div className="flex-1 relative z-20">
                                <button
                                  onClick={() => {
                                    setOpenContactMenuId(openContactMenuId === vehicle.id ? null : vehicle.id);
                                    setOpenRemindMenuId(null);
                                  }}
                                  className="w-full px-2 sm:px-3 py-2 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition-colors text-center"
                                >
                                  📞 Contact
                                </button>
                                {openContactMenuId === vehicle.id && (
                                  <div className="absolute bottom-full left-0 mb-2 bg-white border border-slate-300 rounded shadow-xl z-50 w-full" onClick={(e) => e.stopPropagation()}>
                                    {vehicle.ownerPhone && (
                                      <a
                                        href={`tel:${vehicle.ownerPhone}`}
                                        className="block w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 border-b border-slate-200 first:rounded-t last:rounded-b"
                                        onMouseDown={e => {
                                          e.preventDefault();
                                          window.open(`tel:${vehicle.ownerPhone}`);
                                          setOpenContactMenuId(null);
                                        }}
                                      >
                                        📞 {vehicle.ownerPhone}
                                      </a>
                                    )}
                                    {vehicle.ownerEmail && (
                                      <a
                                        href={`mailto:${vehicle.ownerEmail}`}
                                        className="block w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 first:rounded-t last:rounded-b"
                                        onMouseDown={e => {
                                          e.preventDefault();
                                          window.open(`mailto:${vehicle.ownerEmail}`);
                                          setOpenContactMenuId(null);
                                        }}
                                      >
                                        ✉️ {vehicle.ownerEmail}
                                      </a>
                                    )}
                                  </div>
                                )}
                              </div>

                              {/* Remind Button with Dropdown */}
                              <div className="flex-1 relative z-20">
                                <button
                                  onClick={() => {
                                    setOpenRemindMenuId(openRemindMenuId === vehicle.id ? null : vehicle.id);
                                    setOpenContactMenuId(null);
                                  }}
                                  className="w-full px-2 sm:px-3 py-2 bg-emerald-600 text-white text-xs font-semibold rounded hover:bg-emerald-700 transition-colors text-center"
                                >
                                  🔔 Remind
                                </button>
                                {openRemindMenuId === vehicle.id && (
                                  <div className="absolute bottom-full left-0 mb-2 bg-white border border-slate-300 rounded shadow-xl z-50 w-full" onClick={(e) => e.stopPropagation()}>
                                    <button
                                      onMouseDown={e => {
                                        e.preventDefault();
                                        handleSendReminder(vehicle.id);
                                        setOpenRemindMenuId(null);
                                      }}
                                      disabled={isSendingReminder === vehicle.id}
                                      className="block w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-emerald-50 border-b border-slate-200 disabled:opacity-50 first:rounded-t"
                                      title="Send MOT reminder"
                                    >
                                      {isSendingReminder === vehicle.id ? "Sending..." : "📬 MOT Remind"}
                                    </button>
                                    <button
                                      onMouseDown={e => {
                                        e.preventDefault();
                                        handleSendTaxReminder(vehicle.id);
                                        setOpenRemindMenuId(null);
                                      }}
                                      disabled={isSendingTaxReminder === vehicle.id}
                                      className="block w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-emerald-50 border-b border-slate-200 disabled:opacity-50"
                                      title="Send tax reminder"
                                    >
                                      {isSendingTaxReminder === vehicle.id ? "Sending..." : "🧾 Tax Remind"}
                                    </button>
                                    {/* Recall button removed as requested */}
                                  </div>
                                )}
                              </div>

                              {/* Health PDF Button removed */}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* No vehicles message */}
                  {customer.vehicles.length === 0 && (
                    <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
                      <p className="text-slate-500 font-medium">No vehicles registered for this customer</p>
                      <p className="text-sm text-slate-400 mt-1">Use Vehicle Lookup to add their first vehicle</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              {customers.length === 0 ? (
                <>
                  <p className="text-slate-500 mb-2">No customers yet</p>
                  <p className="text-sm text-slate-400">
                    Use the Vehicle Lookup feature to add customers to your CRM
                  </p>
                </>
              ) : (
                <>
                  <p className="text-slate-500 mb-2">No matches found</p>
                  <p className="text-sm text-slate-400">
                    Try adjusting your search or filters
                  </p>
                </>
              )}
            </div>
          )}
        </Card>
      )}

      {/* Quotes Tab */}
      {activeTab === "quotes" && (
      <Card>
        <div className="p-4 md:p-6 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 flex items-center gap-2">
            <FileText size={20} className="md:w-6 md:h-6" />
            Quote History
          </h3>
          <p className="text-slate-500 text-xs md:text-sm mt-1">Track all quotes sent to customers</p>
        </div>
        {quotes.length > 0 ? (
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900 whitespace-nowrap">Quote #</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900 whitespace-nowrap">Customer</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900 whitespace-nowrap">Vehicle</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900 whitespace-nowrap">Amount</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900 whitespace-nowrap">Status</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900 whitespace-nowrap">Created</th>
                    <th className="px-3 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900 whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
              <tbody className="divide-y divide-slate-100">
                {quotes.map((quote) => {
                  const statusColors: { [key: string]: string } = {
                    DRAFT: "bg-slate-100 text-slate-700",
                    SENT: "bg-blue-100 text-blue-700",
                    ACCEPTED: "bg-emerald-100 text-emerald-700",
                    DECLINED: "bg-red-100 text-red-700",
                    EXPIRED: "bg-orange-100 text-orange-700",
                  };

                  return (
                    <tr key={quote.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-sm font-bold text-blue-600">{quote.quoteNumber}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{quote.customerName}</p>
                        {quote.customerEmail && (
                          <p className="text-xs text-slate-500">{quote.customerEmail}</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {vehicleTitle(quote.vehicle)} ({quote.vehicle.vrm})
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-emerald-600 font-bold">£{(quote.totalPence / 100).toFixed(2)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-full ${
                            statusColors[quote.status] || "bg-gray-100"
                          }`}
                        >
                          {quote.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {formatUKDate(quote.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openQuoteEditor(quote)}
                            className="text-slate-600 hover:text-slate-800 p-1 rounded hover:bg-slate-100 transition-colors"
                            title="Edit quote"
                          >
                            <Edit size={16} />
                          </button>
                          {quote.status === "SENT" && (
                            <>
                              <button
                                onClick={() => handleRespondToQuote(quote.id, true)}
                                className="text-emerald-600 hover:text-emerald-700 p-1 rounded hover:bg-emerald-50 transition-colors"
                                title="Accept quote"
                              >
                                <span className="text-sm font-bold">✓</span>
                              </button>
                              <button
                                onClick={() => handleRespondToQuote(quote.id, false)}
                                className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                                title="Decline quote"
                              >
                                <span className="text-sm font-bold">✕</span>
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => {
                              window.open(`/api/quotes/${quote.id}/pdf`, "_blank");
                            }}
                            className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors"
                            title="View PDF"
                          >
                            <FileText size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteQuote(quote.id)}
                            disabled={isDeletingQuote === quote.id}
                            className="text-red-600 hover:text-red-700 disabled:text-red-400 p-1 rounded hover:bg-red-50 transition-colors"
                            title="Delete quote"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center">
            <p className="text-slate-500 text-lg">No quotes yet. Generate your first quote from the lookup tool.</p>
          </div>
        )}
      </Card>
      )}

      {editingQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Edit Quote</h3>
                <p className="text-xs text-slate-500">{editingQuote.quoteNumber}</p>
              </div>
              <button
                onClick={() => setEditingQuote(null)}
                className="text-slate-400 hover:text-slate-600"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={quoteForm.customerName}
                  onChange={(e) => setQuoteForm((prev) => ({ ...prev, customerName: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={quoteForm.customerEmail}
                  onChange={(e) => setQuoteForm((prev) => ({ ...prev, customerEmail: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={quoteForm.customerPhone}
                  onChange={(e) => setQuoteForm((prev) => ({ ...prev, customerPhone: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
                <select
                  value={quoteForm.status}
                  onChange={(e) => setQuoteForm((prev) => ({ ...prev, status: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="SENT">SENT</option>
                  <option value="ACCEPTED">ACCEPTED</option>
                  <option value="DECLINED">DECLINED</option>
                  <option value="EXPIRED">EXPIRED</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setEditingQuote(null)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveQuote}
                  disabled={isSavingQuote}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSavingQuote ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {timelineCustomerId && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-auto px-4 py-10">
          <div className="w-full max-w-5xl">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Customer Timeline</h2>
                  <p className="text-sm text-slate-500">
                    {timelineCustomer?.name || "Loading customer..."}
                  </p>
                </div>
                <button
                  onClick={handleCloseTimeline}
                  className="text-slate-500 hover:text-slate-700"
                  title="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {isTimelineLoading && (
                <div className="text-center py-16 text-slate-500">Loading timeline...</div>
              )}

              {!isTimelineLoading && timelineCustomer && (
                <CustomerTimeline
                  customer={timelineCustomer}
                  showHeader={false}
                  className="border-none shadow-none p-0"
                />
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
