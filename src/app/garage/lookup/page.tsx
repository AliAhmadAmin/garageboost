"use client";

import { useState, useEffect } from "react";
import {
  AlertTriangle,
  FileText,
  Plus,
  Search,
  X,
  Download,
  Mail,
  Check,
  Trash2,
  Edit2,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { vehicleTitle } from "@/lib/vehicle";
import { normalizeVRM, formatVRM } from "@/lib/vrm";
import { useToast } from "@/components/ui/Toast";
import { formatUKDate } from "@/lib/uk-date";

interface Advisory {
  text: string;
  category: string;
  estPricePence: number;
}

interface LookupResult {
  vrm: string;
  make: string;
  typeApproval?: string;
  model: string;
  firstReg: string;
  fuel: string;
  color: string;
  motStatus: string;
  motExpiry: string;
  taxStatus?: string;
  taxExpiry?: string | null;
  mileage: number;
  advisories: Advisory[];
}

interface QuoteItem {
  id?: string;
  type: string;
  name: string;
  description?: string;
  quantity: number;
  unitPricePence: number;
  totalPence: number;
  included: boolean;
}

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString().slice(0, 10);
};

export default function VehicleLookupPage() {
  const { addToast } = useToast();
  const [vrm, setVrm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [result, setResult] = useState<LookupResult | null>(null);
  const [garageId, setGarageId] = useState<string | null>(null);
  const [quoteVatRate, setQuoteVatRate] = useState(20);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  // ...existing code...
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [editableAdvisories, setEditableAdvisories] = useState<Advisory[]>([]);
  const [isEditingAdvisories, setIsEditingAdvisories] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [quoteCreated, setQuoteCreated] = useState<any>(null);
  const [selectedAction, setSelectedAction] = useState<"quote" | "crm" | null>(null);
  const [savingToCRM, setSavingToCRM] = useState(false);
  const [crmSuccess, setCrmSuccess] = useState(false);
  const [customerMode, setCustomerMode] = useState<"new" | "existing">("new");
  const [existingCustomers, setExistingCustomers] = useState<any[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  // Load garage ID on mount
  useEffect(() => {
    const loadGarageId = async () => {
      let resolvedGarageId: string | null = null;

      try {
        const cached = localStorage.getItem("garage-data");
        if (cached) {
          const parsed = JSON.parse(cached);
          resolvedGarageId = parsed?.id || null;
          setQuoteVatRate(parsed?.vatEnabled === false ? 0 : 20);
        }
      } catch (error) {
        resolvedGarageId = null;
      }

      if (!resolvedGarageId) {
        const res = await fetch("/api/garages/me");
        if (res.ok) {
          const garage = await res.json();
          if (garage?.id) {
            resolvedGarageId = garage.id;
            setQuoteVatRate(garage?.vatEnabled === false ? 0 : 20);
            try {
              localStorage.setItem("garage-data", JSON.stringify(garage));
            } catch (error) {
              // ignore storage failures
            }
          }
        }
      }

      if (resolvedGarageId) {
        setGarageId(resolvedGarageId);
        const customersRes = await fetch(`/api/garages/${resolvedGarageId}/customers`);
        if (customersRes.ok) {
          const customersData = await customersRes.json();
          setExistingCustomers(customersData);
        }
      }
    };
    loadGarageId();
  }, []);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!vrm) return;
    
    const normalizedVRM = normalizeVRM(vrm);
    setVrm(normalizedVRM);
    setLoading(true);
    setSearchError("");
    setResult(null);
    
    try {
      const response = await fetch("/api/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vrm: normalizedVRM }),
      });
      
      if (!response.ok) {
        if (response.status === 404) {
          setSearchError("❌ Vehicle not found. Please check the registration number and try again.");
        } else if (response.status === 400) {
          setSearchError("❌ Invalid registration number format.");
        } else {
          setSearchError("❌ Unable to look up vehicle. Please try again.");
        }
        return;
      }
      
      const data = await response.json();
      if (data.error) {
        setSearchError("❌ " + data.error);
        return;
      }
      
      setResult(data);
      setShowCustomerModal(false);
      setShowQuoteBuilder(false);
      setQuoteItems([]);
      setQuoteCreated(null);
      setCustomerDetails({ name: "", phone: "", email: "" });
    } catch (error) {
      console.error("Search error:", error);
      setSearchError("❌ Failed to search for vehicle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCustomerAndViewQuote = () => {
    // Only validate name/email for new customers
    if (customerMode !== "existing") {
      if (!customerDetails.name.trim()) {
        addToast("Please enter customer name", "error");
        return;
      }
      
      if (!customerDetails.email.trim()) {
        addToast("Please enter customer email", "error");
        return;
      }
    } else {
      // Validate customer selection for existing customers
      if (!selectedCustomerId) {
        addToast("Please select a customer", "error");
        return;
      }
    }

    // Initialize quote items from advisories + MOT
    const motPrice = 5485;
    const items: QuoteItem[] = [
      {
        type: "MOT",
        name: "MOT Test",
        description: "Annual MOT inspection",
        quantity: 1,
        unitPricePence: motPrice,
        totalPence: motPrice,
        included: true,
      },
      ...result!.advisories.map((advisory, idx) => ({
        id: `advisory-${idx}`,
        type: "ADVISORY",
        name: advisory.text,
        description: `Category: ${advisory.category}`,
        quantity: 1,
        unitPricePence: advisory.estPricePence,
        totalPence: advisory.estPricePence,
        included: true,
      })),
    ];

    setQuoteItems(items);
    setShowCustomerModal(false);
    setShowQuoteBuilder(true);
  };

  const saveCustomerToCRM = async (silent = false) => {
    // Validate based on customer mode
    if (customerMode === "existing") {
      if (!selectedCustomerId) {
        if (!silent) {
          addToast("Please select a customer", "error");
        }
        return false;
      }
    } else {
      // New customer - validate name and email
      if (!customerDetails.name.trim() || !customerDetails.email.trim()) {
        if (!silent) {
          addToast("Please enter customer name and email", "error");
        }
        return false;
      }
    }

    if (!result || !garageId) {
      if (!silent) {
        addToast("Missing vehicle or garage information", "error");
      }
      return false;
    }

    if (!silent) {
      setSavingToCRM(true);
    }

    try {
      // If using existing customer, get their details
      let customerName = customerDetails.name;
      let customerEmail = customerDetails.email;
      let customerPhone = customerDetails.phone;
      
      if (customerMode === "existing" && selectedCustomerId) {
        const existingCustomer = existingCustomers.find(c => c.id === selectedCustomerId);
        if (existingCustomer) {
          customerName = existingCustomer.name;
          customerEmail = existingCustomer.email;
          customerPhone = existingCustomer.phone || "";
        }
      }

      console.log("[Lookup] Saving customer to CRM:", { name: customerName, email: customerEmail });
      const response = await fetch(`/api/garages/${garageId}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          vehicleData: {
            vrm: result.vrm,
            make: result.make,
            typeApproval: (result as any).typeApproval ?? undefined,
            model: result.model,
            motExpiry: result.motExpiry,
            taxStatus: result.taxStatus || "Unknown",
            taxExpiry: result.taxExpiry || null,
            mileage: result.mileage,
          },
        }),
      });

      console.log("[Lookup] API Response status:", response.status);
      if (!response.ok) {
        const error = await response.json();
        console.error("[Lookup] API Error:", error);
        if (!silent) {
          throw new Error(error.error || "Failed to save customer");
        }
        return false;
      }

      const customer = await response.json();
      console.log("[Lookup] Customer saved successfully:", customer.id);

      if (!silent) {
        setCrmSuccess(true);
        setShowCustomerModal(false);

        setTimeout(() => {
          setCrmSuccess(false);
          setVrm("");
          setResult(null);
          setCustomerDetails({ name: "", phone: "", email: "" });
        }, 2000);
      }

      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("[Lookup] Error saving to CRM:", errorMsg, error);
      if (!silent) {
        addToast(`Failed to save customer: ${errorMsg}`, "error");
      }
      return false;
    } finally {
      if (!silent) {
        setSavingToCRM(false);
      }
    }
  };

  const handleSaveCustomerToCRM = async () => {
    await saveCustomerToCRM(false);
  };

  const toggleItemInclusion = (idx: number) => {
    const updated = [...quoteItems];
    updated[idx].included = !updated[idx].included;
    setQuoteItems(updated);
  };

  const updateItemPrice = (idx: number, newPrice: number) => {
    const updated = [...quoteItems];
    updated[idx].unitPricePence = newPrice;
    updated[idx].totalPence = Math.round(newPrice * updated[idx].quantity);
    setQuoteItems(updated);
  };

  const addCustomItem = () => {
    const newItem: QuoteItem = {
      type: "SERVICE",
      name: "New Service",
      description: "",
      quantity: 1,
      unitPricePence: 0,
      totalPence: 0,
      included: true,
    };
    setQuoteItems([...quoteItems, newItem]);
  };

  const removeItem = (idx: number) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== idx));
  };

  // Advisory editing functions
  const startEditingAdvisories = () => {
    if (result) {
      setEditableAdvisories([...result.advisories]);
      setIsEditingAdvisories(true);
    }
  };

  const cancelEditingAdvisories = () => {
    setIsEditingAdvisories(false);
    setEditableAdvisories([]);
  };

  const updateAdvisoryPrice = (idx: number, newPrice: number) => {
    const updated = [...editableAdvisories];
    updated[idx].estPricePence = newPrice;
    setEditableAdvisories(updated);
  };

  const updateAdvisoryText = (idx: number, newText: string) => {
    const updated = [...editableAdvisories];
    updated[idx].text = newText;
    setEditableAdvisories(updated);
  };

  const removeAdvisory = (idx: number) => {
    setEditableAdvisories(editableAdvisories.filter((_, i) => i !== idx));
  };

  const addCustomAdvisory = () => {
    const newAdvisory: Advisory = {
      text: "New Advisory",
      category: "Other",
      estPricePence: 5000,
    };
    setEditableAdvisories([...editableAdvisories, newAdvisory]);
  };

  const saveEditedAdvisories = async () => {
    if (!result || !garageId) return;

    try {
      // First, save the vehicle if it doesn't exist
      const vehicleResponse = await fetch("/api/vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vrm: result.vrm,
          make: result.make,
          typeApproval: (result as any).typeApproval ?? undefined,
          model: result.model,
          motExpiry: result.motExpiry,
          ownerName: "",
          ownerPhone: null,
          ownerEmail: null,
          mileage: result.mileage,
          garageId,
          advisories: editableAdvisories,
        }),
      });

      if (vehicleResponse.ok) {
        const vehicle = await vehicleResponse.json();
        // Update the result with edited advisories
        setResult({ ...result, advisories: editableAdvisories });
        setIsEditingAdvisories(false);
        addToast("Advisories saved successfully!", "success");
      } else {
        addToast("Failed to save advisories", "error");
      }
    } catch (error) {
      console.error("Error saving advisories:", error);
      addToast("Error saving advisories", "error");
    }
  };

  const calculateTotals = () => {
    const subtotal = quoteItems
      .filter((item) => item.included)
      .reduce((sum, item) => sum + item.totalPence, 0);
    const vat = Math.round(subtotal * (quoteVatRate / 100));
    return { subtotal, vat, total: subtotal + vat };
  };

  const handleCreateQuote = async () => {
    if (!result || !garageId) return;

    const { subtotal, vat, total } = calculateTotals();

    try {
      // Include only the items that are selected
      const selectedItems = quoteItems.filter((item) => item.included);

      const response = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicleVrm: result.vrm,
          vehicleMake: result.make,
          vehicleTypeApproval: (result as any).typeApproval ?? undefined,
          vehicleModel: result.model,
          motExpiry: result.motExpiry,
          mileage: result.mileage,
          garageId,
          customerName: customerDetails.name || "Draft Customer",
          customerPhone: customerDetails.phone || null,
          customerEmail: customerDetails.email || "draft@placeholder.local",
          items: selectedItems.map((item) => ({
            type: item.type,
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            unitPricePence: item.unitPricePence,
            totalPence: item.totalPence,
          })),
          notes: `Generated from VRM lookup on ${formatUKDate(new Date())}`,
        }),
      });

      if (!response.ok) {
        let error: any = {};
        try {
          error = await response.json();
        } catch (e) {
          const text = await response.text();
          error = { error: response.statusText, details: text };
        }
        const errorMsg = error.details ? `${error.error}: ${error.details}` : (error.error || response.statusText);
        addToast(`Error creating quote (${response.status}): ${errorMsg}`, "error");
        console.error("API Error Response:", { status: response.status, body: error });
        return;
      }

      const quote = await response.json();
      console.log("Quote created:", quote);
      setQuoteCreated(quote);
      await saveCustomerToCRM(true);
    } catch (error) {
      console.error("Error creating quote:", error);
      addToast(`Error creating quote: ${error instanceof Error ? error.message : String(error)}`, "error");
    }
  };

  // Health check PDF logic removed

  const handleSendEmailClick = () => {
    // Pre-populate with quote data if customer details are empty or draft
    if (quoteCreated && (!customerDetails.email || customerDetails.email === "draft@placeholder.local")) {
      setCustomerDetails({
        name: quoteCreated.customerName !== "Draft Customer" ? quoteCreated.customerName : "",
        email: quoteCreated.customerEmail !== "draft@placeholder.local" ? quoteCreated.customerEmail : "",
        phone: quoteCreated.customerPhone || "",
      });
    }
    setShowEmailModal(true);
  };

  const handleSendEmailWithDetails = async () => {
    if (!quoteCreated) return;
    
    if (!customerDetails.name.trim() || !customerDetails.email.trim()) {
      addToast("Please enter customer name and email", "error");
      return;
    }

    setSendingEmail(true);
    setShowEmailModal(false);
    
    try {
      // Update quote with customer details first
      const updateResponse = await fetch(`/api/quotes/${quoteCreated.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: customerDetails.name,
          customerEmail: customerDetails.email,
          customerPhone: customerDetails.phone || null,
        }),
      });

      if (!updateResponse.ok) {
        addToast("Error updating customer details", "error");
        setSendingEmail(false);
        return;
      }

      // Now send the email
      const response = await fetch(`/api/quotes/${quoteCreated.id}/email`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        addToast(`Quote sent to ${customerDetails.email}`, "success");
        // Update quote status to SENT
        await updateQuoteStatus("SENT");
      } else {
        addToast("Error sending email", "error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      addToast("Error sending email", "error");
    } finally {
      setSendingEmail(false);
    }
  };

  const updateQuoteStatus = async (newStatus: string, reason?: string) => {
    if (!quoteCreated) return;

    try {
      const response = await fetch(`/api/quotes/${quoteCreated.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          reason: reason,
          details: `Status changed to ${newStatus}`,
        }),
      });

      if (response.ok) {
        const updated = await response.json();
        setQuoteCreated(updated);
        addToast(`Quote status changed to ${newStatus}`, "success");
      } else {
        addToast("Error updating quote status", "error");
      }
    } catch (error) {
      console.error("Error updating quote status:", error);
      addToast("Error updating quote status", "error");
    }
  };

  const handleQuoteAccepted = () => {
    updateQuoteStatus("ACCEPTED", "Customer accepted the quote");
  };

  const handleQuoteDeclined = () => {
    const reason = window.prompt("Why was the quote declined?", "No reason provided");
    if (reason !== null) {
      updateQuoteStatus("DECLINED", reason);
    }
  };

  const handleSaveVehicle = async () => {
    if (!result || !garageId) return;
    
    // Validate customer details
    if (!customerDetails.name.trim()) {
      addToast("Please enter customer name", "error");
      return;
    }
    
    const response = await fetch("/api/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vrm: result.vrm,
        make: result.make,
        model: result.model,
        motExpiry: result.motExpiry,
        ownerName: customerDetails.name,
        ownerPhone: customerDetails.phone || null,
        ownerEmail: customerDetails.email || null,
        mileage: result.mileage,
        garageId,
        advisories: result.advisories.map((advisory) => ({
          text: advisory.text,
          category: advisory.category,
          estPricePence: advisory.estPricePence,
        })),
      }),
    });

    if (response.ok) {
      addToast("Customer saved successfully!", "success");
      setResult(null);
      setVrm("");
      setShowCustomerModal(false);
      setCustomerDetails({ name: "", phone: "", email: "" });
    }
  };

  const { subtotal, vat, total } = calculateTotals();
  const motPrice = 5485;

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="p-6 md:p-10 mb-8 border-none shadow-xl shadow-blue-50">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Vehicle Revenue Finder</h2>
          <p className="text-sm md:text-base text-slate-500 mt-2">Enter VRM to find jobs your customers aren&apos;t booking yet.</p>
        </div>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="ENTER VRM"
            className="flex-1 bg-yellow-400 border-2 border-slate-900 text-slate-900 px-4 md:px-6 py-3 md:py-4 rounded-xl text-xl md:text-2xl font-black text-center placeholder:text-slate-700 tracking-tighter uppercase"
            value={vrm}
            onChange={(event) => setVrm(event.target.value.toUpperCase())}
          />
          <button
            type="submit"
            className="bg-slate-900 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 min-h-13 md:min-h-15"
          >
            {loading ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Search size={20} />
            )}
            Search
          </button>
        </form>
        {searchError && (
          <div className="mt-4 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm md:text-base font-medium max-w-lg mx-auto">
            {searchError}
          </div>
        )}
      </Card>

      {result && !showCustomerModal && !showQuoteBuilder && !quoteCreated && !crmSuccess && (
        <>
          <Card className="animate-in fade-in slide-in-from-bottom-5 duration-500 mb-6">
            <div className="p-4 md:p-6 bg-slate-50 border-b border-slate-100">
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900">
                  {vehicleTitle(result as any)}
                </h3>
                <p className="text-xs md:text-sm text-slate-500 mt-1">
                  {result.vrm}{result.color && ` • ${result.color}`}{result.fuel && ` • ${result.fuel}`}{result.firstReg && ` • First Reg: ${result.firstReg}`}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  onClick={() => {
                    setSelectedAction("quote");
                    setShowCustomerModal(true);
                  }}
                  disabled={!garageId}
                  className="bg-blue-600 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-lg font-bold hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-60 text-sm md:text-base transition-all"
                >
                  <FileText size={18} /> Quote
                </button>
                <button
                  onClick={() => {
                    setSelectedAction("crm");
                    setShowCustomerModal(true);
                  }}
                  disabled={!garageId}
                  className="bg-emerald-600 text-white px-4 py-2.5 md:px-6 md:py-3 rounded-lg font-bold hover:bg-emerald-700 flex items-center justify-center gap-2 disabled:opacity-60 text-sm md:text-base transition-all"
                >
                  <Plus size={18} /> Add to CRM
                </button>
              </div>
            </div>
            <div className="p-4 md:p-8 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">MOT Status</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      new Date(result.motExpiry) > new Date() ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  />
                  <p className="text-base md:text-lg font-bold">{result.motStatus}</p>
                </div>
                <p className="text-xs md:text-sm text-slate-500">Expires: {formatDate(result.motExpiry)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Road Tax</p>
                <p className="text-base md:text-lg font-bold">{result.taxStatus || "Unknown"}</p>
                <p className="text-xs md:text-sm text-slate-500">
                  Expires: {result.taxExpiry ? formatDate(result.taxExpiry) : "Unknown"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Mileage</p>
                <p className="text-lg md:text-xl font-bold">{result.mileage.toLocaleString()} mi</p>
                <p className="text-xs md:text-sm text-slate-500">~7,400 mi/year</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Advisories Found</p>
                <p className="text-lg md:text-xl font-bold text-blue-600">{result.advisories.length}</p>
                <p className="text-xs md:text-sm text-slate-500">Potential work</p>
              </div>
              <div className="space-y-1 col-span-2 md:col-span-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. Total Revenue</p>
                <p className="text-lg md:text-xl font-bold text-emerald-600">
                  £{((motPrice + result.advisories.reduce((sum, a) => sum + a.estPricePence, 0)) / 100).toFixed(2)}
                </p>
                <p className="text-sm text-slate-500">MOT + Repairs</p>
              </div>
            </div>
          </Card>

          {result.advisories.length > 0 && (
            <Card className="mb-6">
              <div className="p-4 md:p-6 border-b border-slate-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
                      <AlertTriangle className="text-blue-500" size={20} />
                      Smart Advisory Analysis
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 mt-1">
                      {isEditingAdvisories
                        ? "Customize advisories before sending to customer"
                        : "These items were flagged in the last MOT and may need attention"}
                    </p>
                  </div>
                  {!isEditingAdvisories && (
                    <button
                      onClick={startEditingAdvisories}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                      <Edit2 size={16} /> Customize
                    </button>
                  )}
                </div>
              </div>
              <div className="p-4 md:p-6">
                {isEditingAdvisories ? (
                  <div className="space-y-3">
                    {editableAdvisories.map((advisory, index) => (
                      <div
                        key={index}
                        className="p-3 md:p-4 border-2 border-blue-200 rounded-lg bg-blue-50"
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4">
                          <div className="flex-1">
                            <div className="mb-2">
                              <label className="text-xs font-bold text-slate-600 block mb-1">
                                Service Description
                              </label>
                              <input
                                type="text"
                                value={advisory.text}
                                onChange={(e) =>
                                  updateAdvisoryText(index, e.target.value)
                                }
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-slate-900 text-sm"
                              />
                            </div>
                            <div className="mb-2">
                              <label className="text-xs font-bold text-slate-600 block mb-1">
                                Category
                              </label>
                              <input
                                type="text"
                                value={advisory.category}
                                readOnly
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-100 text-slate-600 text-xs"
                              />
                            </div>
                          </div>
                          <div className="flex items-end gap-2 md:flex-col md:min-w-28">
                            <div className="flex-1 md:w-full">
                              <label className="text-xs font-bold text-slate-600 block mb-1">
                                Est. Price (£)
                              </label>
                              <input
                                type="number"
                                value={(advisory.estPricePence / 100).toFixed(2)}
                                onChange={(e) =>
                                  updateAdvisoryPrice(
                                    index,
                                    parseFloat(e.target.value) * 100
                                  )
                                }
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-right font-semibold text-sm"
                              />
                            </div>
                            <button
                              onClick={() => removeAdvisory(index)}
                              className="text-red-500 hover:text-red-700 p-2"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                    <button
                      onClick={addCustomAdvisory}
                      className="w-full px-4 py-2 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 font-semibold hover:border-blue-500 hover:bg-blue-50 flex items-center justify-center gap-2"
                    >
                      <Plus size={18} /> Add Advisory/Service
                    </button>

                    <div className="flex gap-3 pt-4 border-t border-slate-200">
                      <button
                        onClick={cancelEditingAdvisories}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={saveEditedAdvisories}
                        className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 flex items-center justify-center gap-2"
                      >
                        <Check size={16} /> Save Advisories
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {result.advisories.map((advisory, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-blue-200 text-blue-900 text-xs font-bold px-2 py-1 rounded">
                              {advisory.category}
                            </span>
                          </div>
                          <p className="font-semibold text-slate-900">
                            {advisory.text}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-500">Est. Price</p>
                          <p className="text-xl font-bold text-emerald-600">
                            £{(advisory.estPricePence / 100).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          )}
        </>
      )}

      {/* Customer Details Modal */}
      {showCustomerModal && result && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Customer Details</h3>
              <button
                onClick={() => {
                  setShowCustomerModal(false);
                  setCustomerDetails({ name: "", phone: "", email: "" });
                  setCustomerMode("new");
                  setSelectedCustomerId(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Customer Selection Mode */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={customerMode === "existing"}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCustomerMode("existing");
                        setCustomerDetails({ name: "", phone: "", email: "" });
                      } else {
                        setCustomerMode("new");
                        setSelectedCustomerId(null);
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-semibold text-slate-700">
                    Add to existing customer ({existingCustomers.length} available)
                  </span>
                </label>

                {customerMode === "existing" && (
                  <select
                    value={selectedCustomerId || ""}
                    onChange={(e) => setSelectedCustomerId(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">-- Select customer --</option>
                    {existingCustomers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name} ({customer.email}) • {customer.vehicles?.length || 0} vehicle(s)
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Show form only for new customers */}
              {customerMode !== "existing" && (
                <>
                  <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                  placeholder="Enter customer name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={customerDetails.email}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
                </>
              )}
              
              {/* Vehicle Info - shown for both modes */}
              {result && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-slate-600">
                    <strong>Vehicle:</strong> {vehicleTitle(result as any)} ({result.vrm})
                  </p>
                </div>
              )}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowCustomerModal(false);
                    setCustomerDetails({ name: "", phone: "", email: "" });
                    setCustomerMode("new");
                    setSelectedCustomerId(null);
                    setSelectedAction(null);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                {selectedAction === "quote" && (
                  <button
                    onClick={handleSaveCustomerAndViewQuote}
                    disabled={!customerDetails.name.trim() || !customerDetails.email.trim()}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next: Build Quote
                  </button>
                )}
                {selectedAction === "crm" && (
                  <button
                    onClick={handleSaveCustomerToCRM}
                    disabled={
                      savingToCRM ||
                      (customerMode === "existing" 
                        ? !selectedCustomerId 
                        : !customerDetails.name.trim() || !customerDetails.email.trim())
                    }
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {savingToCRM ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check size={18} /> Save to CRM
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Email Customer Details Modal */}
      {showEmailModal && quoteCreated && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">Customer Details</h3>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-600 bg-blue-50 p-3 rounded-lg">
                Enter customer details to send quote <strong>{quoteCreated.quoteNumber}</strong>
              </p>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Customer Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerDetails.name}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                  placeholder="Enter customer name"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={customerDetails.email}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, email: e.target.value })}
                  placeholder="Enter email address"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={customerDetails.phone}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEmailWithDetails}
                  disabled={!customerDetails.name.trim() || !customerDetails.email.trim() || sendingEmail}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendingEmail ? "Sending..." : "Send Email"}
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Quote Builder */}
      {showQuoteBuilder && result && (
        <div className="space-y-6">
          <Card>
            <div className="p-6 bg-linear-to-r from-blue-600 to-indigo-600 text-white">
              <h3 className="text-2xl font-bold mb-2">Build Your Quote</h3>
              <p className="text-blue-100">Customize services for {customerDetails.name}</p>
            </div>
            <div className="p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {quoteItems.map((item, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <input
                            type="checkbox"
                            checked={item.included}
                            onChange={() => toggleItemInclusion(idx)}
                            className="w-5 h-5 accent-blue-600 cursor-pointer"
                          />
                          <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-900 rounded">
                            {item.type}
                          </span>
                        </div>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const updated = [...quoteItems];
                            updated[idx].name = e.target.value;
                            setQuoteItems(updated);
                          }}
                          className="w-full font-semibold text-slate-900 bg-transparent border-b border-slate-300 focus:outline-none focus:border-blue-600 mb-1"
                        />
                        <input
                          type="text"
                          value={item.description || ""}
                          onChange={(e) => {
                            const updated = [...quoteItems];
                            updated[idx].description = e.target.value;
                            setQuoteItems(updated);
                          }}
                          placeholder="Description (optional)"
                          className="w-full text-sm text-slate-500 bg-transparent border-b border-slate-200 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div className="text-right min-w-30">
                        <label className="text-xs text-slate-500 font-semibold">Price</label>
                        <div className="flex items-center gap-1">
                          <span className="text-slate-500">£</span>
                          <input
                            type="number"
                            value={(item.unitPricePence / 100).toFixed(2)}
                            onChange={(e) => updateItemPrice(idx, parseFloat(e.target.value) * 100)}
                            className="w-20 px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                          />
                        </div>
                      </div>
                      {idx > 0 && (
                        <button
                          onClick={() => removeItem(idx)}
                          className="text-red-500 hover:text-red-700 mt-6"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={addCustomItem}
                className="mt-4 w-full px-4 py-2 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 font-semibold hover:border-blue-500 hover:text-blue-600 flex items-center justify-center gap-2"
              >
                <Plus size={18} /> Add Custom Service
              </button>
            </div>
          </Card>

          {/* Quote Summary */}
          <Card>
            <div className="p-6 bg-slate-50 border-b border-slate-100">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-bold">Quote Summary</h3>
                {quoteVatRate === 0 && (
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full whitespace-nowrap">
                    VAT OFF
                  </span>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                {quoteItems
                  .filter((item) => item.included)
                  .map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-slate-700">{item.name}</span>
                      <span className="font-semibold">£{(item.totalPence / 100).toFixed(2)}</span>
                    </div>
                  ))}
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Subtotal:</span>
                  <span>£{(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">VAT ({quoteVatRate}%):</span>
                  <span>£{(vat / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-slate-200">
                  <span>Total:</span>
                  <span className="text-emerald-600">£{(total / 100).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowQuoteBuilder(false)}
                  className="flex-1 px-4 py-3 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  onClick={handleCreateQuote}
                  className="flex-1 px-4 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 flex items-center justify-center gap-2"
                >
                  <Check size={18} /> Create Quote
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Quote Created - Show Options */}
      {quoteCreated && (
        <Card className="animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className={`p-6 text-white ${
            quoteCreated.status === "ACCEPTED" ? "bg-linear-to-r from-emerald-600 to-teal-600" :
            quoteCreated.status === "DECLINED" ? "bg-linear-to-r from-rose-600 to-red-600" :
            quoteCreated.status === "SENT" ? "bg-linear-to-r from-blue-600 to-indigo-600" :
            "bg-linear-to-r from-emerald-600 to-teal-600"
          }`}>
            <h3 className="text-2xl font-bold mb-2">✓ Quote Created Successfully</h3>
            <p className="text-white/90">Quote #{quoteCreated.quoteNumber} for {customerDetails.name}</p>
          </div>
          <div className="p-8">
            {(quoteCreated.vatRate ?? 20) === 0 && (
              <div className="mb-4 inline-flex px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">
                VAT OFF
              </div>
            )}
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 uppercase font-semibold">Quote Number</p>
                <p className="text-lg font-bold mt-1">{quoteCreated.quoteNumber}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 uppercase font-semibold">Status</p>
                <p className={`text-lg font-bold mt-1 ${
                  quoteCreated.status === "ACCEPTED" ? "text-emerald-600" :
                  quoteCreated.status === "DECLINED" ? "text-rose-600" :
                  quoteCreated.status === "SENT" ? "text-blue-600" :
                  "text-yellow-600"
                }`}>
                  {quoteCreated.status}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 uppercase font-semibold">Valid Until</p>
                <p className="text-lg font-bold mt-1">{formatDate(quoteCreated.expiryDate)}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 uppercase font-semibold">Total Amount</p>
                <p className="text-lg font-bold mt-1 text-emerald-600">£{(quoteCreated.totalPence / 100).toFixed(2)}</p>
              </div>
            </div>

            {/* Quote Activity Timeline */}
            {quoteCreated.activities && quoteCreated.activities.length > 0 && (
              <div className="mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-3">Activity Log</h4>
                <div className="space-y-2">
                  {quoteCreated.activities.map((activity: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                      <div>
                        <p className="font-semibold text-slate-900">{activity.action}</p>
                        {activity.details && (
                          <p className="text-slate-600">{activity.details}</p>
                        )}
                        <p className="text-xs text-slate-500">{formatDate(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-slate-200 pt-6">
              <h4 className="font-bold text-slate-900 mb-4">Send to Customer</h4>
              <div className="space-y-3">
                {/* Health Check PDF download button removed */}
                <button
                  onClick={handleSendEmailClick}
                  disabled={sendingEmail}
                  className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  {sendingEmail ? "Sending..." : "Send Email"}
                </button>
              </div>
            </div>

            {quoteCreated.status !== "ACCEPTED" && quoteCreated.status !== "DECLINED" && (
              <div className="border-t border-slate-200 pt-6 mt-6">
                <h4 className="font-bold text-slate-900 mb-4">Quote Response Actions</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={handleQuoteAccepted}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 flex items-center justify-center gap-2"
                  >
                    <Check size={18} /> Mark as Accepted
                  </button>
                  <button
                    onClick={handleQuoteDeclined}
                    className="px-6 py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 flex items-center justify-center gap-2"
                  >
                    <X size={18} /> Mark as Declined
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setResult(null);
                  setVrm("");
                  setShowQuoteBuilder(false);
                  setQuoteCreated(null);
                  setCustomerDetails({ name: "", phone: "", email: "" });
                  setQuoteItems([]);
                }}
                className="flex-1 px-6 py-3 border border-slate-300 rounded-lg font-bold text-slate-700 hover:bg-slate-50"
              >
                New Search
              </button>
              <button
                onClick={() => {
                  // Navigate to CRM to see this quote
                  window.location.href = "/garage/customers";
                }}
                className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800"
              >
                View in CRM
              </button>
            </div>
          </div>
        </Card>
      )}

      {!result && !loading && (
        <Card className="p-12 text-center border-dashed border-2">
          <Search size={48} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-500 text-lg">Search for a vehicle to get started</p>
        </Card>
      )}
    </div>
  );
}
