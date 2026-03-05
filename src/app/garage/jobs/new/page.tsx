"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Plus, X, Save, ArrowLeft, UserCircle2, ChevronDown, Package, Search, Car, Check, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";

interface Vehicle {
  id: string;
  vrm: string;
  make: string;
  model: string;
  ownerName: string;
  ownerPhone?: string;
  ownerEmail?: string;
}

interface Staff {
  id: string;
  name: string;
  role: string;
  active: boolean;
  avatarUrl?: string | null;
}

interface InventoryItem {
  id: string;
  name: string;
  sku: string | null;
  category: string | null;
  unitPricePence: number;
  quantityOnHand: number;
  reorderLevel: number;
}

interface Garage {
  id: string;
}

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
  type: "PART" | "LABOR" | "SERVICE";
  name: string;
  description: string;
  quantity: number | string;
  unitPricePence: number | string;
  totalPence: number;
  supplierCost?: number;
  partNumber?: string;
  fromInventory?: boolean;
  inventoryItemId?: string;
}

export default function NewJobPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const vehiclePickerRef = useRef<HTMLDivElement>(null);
  const inventoryPickerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [refreshingVehicles, setRefreshingVehicles] = useState(false);
  const [garageId, setGarageId] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [showInventoryPicker, setShowInventoryPicker] = useState(false);
  const [showVehiclePicker, setShowVehiclePicker] = useState(false);
  const [vehicleSearch, setVehicleSearch] = useState("");
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [vrmLookup, setVrmLookup] = useState("");
  const [lookingUpVrm, setLookingUpVrm] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [vehicleDataFromVrm, setVehicleDataFromVrm] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    vehicleId: "",
    type: "SERVICE",
    status: "TODO",
    description: "",
    bookedDate: new Date().toISOString().split("T")[0],
    estimatedHours: "1",
    laborRate: 5000, // £50 per hour
    assignedToId: "",
    notes: "",
  });

  const [items, setItems] = useState<JobItem[]>([]);
  const [useCustomItem, setUseCustomItem] = useState(false);
  const [newItem, setNewItem] = useState<JobItem>({
    type: "LABOR",
    name: "",
    description: "",
    quantity: "1",
    unitPricePence: "5000",
    totalPence: 5000,
  });

  const getItemsForType = () => {
    if (newItem.type === "LABOR") return COMMON_LABOR;
    if (newItem.type === "PART") return COMMON_PARTS;
    if (newItem.type === "SERVICE") return COMMON_SERVICES;
    return [];
  };

  useEffect(() => {
    loadData();
  }, []);

  // Refresh data when window gains focus or becomes visible
  useEffect(() => {
    const handleFocus = () => {
      loadData();
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        loadData();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibility);
    
    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Close dropdowns on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowInventoryPicker(false);
        setShowVehiclePicker(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (vehiclePickerRef.current && !vehiclePickerRef.current.contains(event.target as Node)) {
        setShowVehiclePicker(false);
      }
      if (inventoryPickerRef.current && !inventoryPickerRef.current.contains(event.target as Node)) {
        setShowInventoryPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleVrmLookup = async () => {
    if (!vrmLookup.trim()) {
      addToast("Please enter a VRM", "error");
      return;
    }

    setLookingUpVrm(true);
    try {
      const res = await fetch(`/api/lookup/vrm?vrm=${encodeURIComponent(vrmLookup)}`);
      const data = await res.json();

      if (res.ok && data.vehicle) {
        // Save vehicle data for later
        setVehicleDataFromVrm(data.vehicle);
        // Show success message
        addToast(`Vehicle Found! ${data.vehicle.make} ${data.vehicle.model} - ${vrmLookup}. Now enter customer details below.`, "success");
      } else {
        addToast(data.error || "Vehicle not found in DVSA database", "error");
      }
    } catch (error) {
      console.error("VRM lookup error:", error);
      addToast("Failed to lookup VRM. Please enter details manually.", "error");
    } finally {
      setLookingUpVrm(false);
    }
  };

  const handleSaveNewCustomer = async () => {
    if (!newCustomerData.name.trim() || !newCustomerData.email.trim()) {
      addToast("Please enter customer name and email", "error");
      return;
    }

    if (!vehicleDataFromVrm) {
      addToast("Please lookup vehicle VRM first", "error");
      return;
    }

    if (!garageId) {
      addToast("Garage not loaded", "error");
      return;
    }

    setLoading(true);
    try {
      // Create customer with vehicle via CRM API
      const response = await fetch(`/api/garages/${garageId}/customers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCustomerData.name,
          email: newCustomerData.email,
          phone: newCustomerData.phone,
          vehicleData: {
            vrm: vrmLookup.toUpperCase(),
            make: vehicleDataFromVrm.make,
            model: vehicleDataFromVrm.model,
            motExpiry: vehicleDataFromVrm.motExpiryDate || new Date().toISOString().split('T')[0],
            mileage: 0,
          },
        }),
      });

      const result = await response.json();

      if (response.ok && result.customer) {
        addToast(`Customer and vehicle added successfully! ${newCustomerData.name} - ${result.customer.email}`, "success");
        
        // Get the newly created vehicle from the response
        const newVehicle = result.customer.vehicles?.find((v: any) => v.vrm === vrmLookup.toUpperCase());
        
        // Reload vehicles list
        await loadData();

        // Switch to existing customer mode and auto-select the newly created vehicle
        setIsNewCustomer(false);
        if (newVehicle) {
          setFormData(prev => ({ ...prev, vehicleId: newVehicle.id }));
        }

        // Reset form
        setVrmLookup("");
        setVehicleDataFromVrm(null);
        setNewCustomerData({ name: "", email: "", phone: "" });
      } else {
        addToast(result.error || "Failed to add customer", "error");
      }
    } catch (error) {
      console.error("Failed to add customer:", error);
      addToast("Failed to add customer. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

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

      setGarageId(resolvedGarage?.id || null);

      if (resolvedGarage) {
        // Load vehicles with no-cache to ensure fresh data
        const vehiclesRes = await fetch(`/api/vehicles?garageId=${resolvedGarage.id}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        });
        const vehiclesData = await vehiclesRes.json();
        setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);

        // Load staff (mechanics)
        const staffRes = await fetch(`/api/garages/${resolvedGarage.id}/staff`);
        const staffData = await staffRes.json();
        setStaff(staffData.staff?.filter((s: Staff) => s.active) || []);

        // Load inventory
        const inventoryRes = await fetch(`/api/garages/${resolvedGarage.id}/inventory?activeOnly=true`);
        const inventoryData = await inventoryRes.json();
        setInventory(inventoryData.items || []);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
      setVehicles([]);
      setStaff([]);
      setInventory([]);
    }
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) {
      addToast("Please enter an item name", "error");
      return;
    }

    const quantity = parseFloat(String(newItem.quantity)) || 1;
    const unitPrice = parseInt(String(newItem.unitPricePence)) || 5000;
    const totalPence = Math.round(quantity * unitPrice);
    
    setItems([...items, { 
      ...newItem, 
      quantity,
      unitPricePence: unitPrice,
      totalPence 
    }]);
    
    setNewItem({
      type: "LABOR",
      name: "",
      description: "",
      quantity: "1",
      unitPricePence: "5000",
      totalPence: 5000,
    });
    setUseCustomItem(false);
  };

  const handleAddInventoryItem = (item: InventoryItem) => {
    if (item.quantityOnHand <= 0) {
      addToast(`${item.name} is out of stock!`, "error");
      return;
    }

    const newJobItem: JobItem = {
      type: "PART",
      name: item.name,
      description: item.category || "",
      quantity: 1,
      unitPricePence: item.unitPricePence,
      totalPence: item.unitPricePence,
      fromInventory: true,
      inventoryItemId: item.id,
    };

    setItems([...items, newJobItem]);
    setShowInventoryPicker(false);
    
    // Show success feedback
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn z-50';
    notification.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <span><strong>${item.name}</strong> added to job</span>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotals = () => {
    const laborTotal = items
      .filter((item) => item.type === "LABOR")
      .reduce((sum, item) => sum + item.totalPence, 0);
    
    const partsTotal = items
      .filter((item) => item.type === "PART")
      .reduce((sum, item) => sum + item.totalPence, 0);

    const subtotal = laborTotal + partsTotal;
    const vat = Math.round(subtotal * 0.2);
    const total = subtotal + vat;

    return { laborTotal, partsTotal, subtotal, vat, total };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vehicleId) {
      addToast("Please select a vehicle", "error");
      return;
    }

    if (!garageId) {
      addToast("No garage found", "error");
      return;
    }

    setLoading(true);

    try {
      // Create job
      const jobRes = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          estimatedHours: parseFloat(String(formData.estimatedHours)) || 1,
          assignedToId: formData.assignedToId || null,
          garageId,
        }),
      });

      if (!jobRes.ok) {
        let errorMessage = "Failed to create job";
        try {
          const errorData = await jobRes.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If JSON parsing fails, use status text
          errorMessage = jobRes.statusText || errorMessage;
        }
        console.error("Job creation failed:", errorMessage);
        throw new Error(errorMessage);
      }

      const job = await jobRes.json();

      // Add items if any
      if (items.length > 0) {
        const itemsRes = await fetch(`/api/jobs/${job.id}/items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });

        if (!itemsRes.ok) {
          throw new Error("Failed to add items");
        }
      }

      addToast("Job created successfully!", "success");
      router.push(`/garage/jobs/${job.id}`);
    } catch (error) {
      console.error("Error creating job:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to create job. Please try again.";
      addToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const selectedVehicle = vehicles.find((v) => v.id === formData.vehicleId);
  const totals = calculateTotals();

  const getJobTypeClasses = (value: string, selected: boolean) => {
    if (!selected) {
      return {
        wrapper: "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50",
        text: "text-slate-700",
        check: "text-slate-500",
      };
    }

    if (value === "MOT") {
      return {
        wrapper: "border-violet-400 bg-violet-50",
        text: "text-violet-900",
        check: "text-violet-600",
      };
    }

    if (value === "SERVICE") {
      return {
        wrapper: "border-blue-400 bg-blue-50",
        text: "text-blue-900",
        check: "text-blue-600",
      };
    }

    if (value === "REPAIR") {
      return {
        wrapper: "border-amber-400 bg-amber-50",
        text: "text-amber-900",
        check: "text-amber-600",
      };
    }

    return {
      wrapper: "border-emerald-400 bg-emerald-50",
      text: "text-emerald-900",
      check: "text-emerald-600",
    };
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4">
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
            <h1 className="text-2xl font-bold text-slate-900">Create New Job</h1>
            <p className="text-slate-500 text-sm mt-0.5">Add service, repair, or MOT job</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Job Details */}
        <Card className="p-4 md:p-5">
          <h2 className="text-lg font-bold text-slate-900 mb-3">Job Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Type Toggle */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border-2 border-slate-200">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!isNewCustomer}
                    onChange={() => setIsNewCustomer(false)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div className="flex items-center gap-2">
                    <Car className="text-blue-600" size={16} />
                    <span className="font-semibold text-slate-900 text-sm">Existing Customer</span>
                  </div>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={isNewCustomer}
                    onChange={() => setIsNewCustomer(true)}
                    className="w-4 h-4 text-green-600"
                  />
                  <div className="flex items-center gap-2">
                    <Plus className="text-green-600" size={16} />
                    <span className="font-semibold text-slate-900 text-sm">New Customer</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Vehicle Selection - Existing Customer */}
            {!isNewCustomer && (
              <div className="md:col-span-2 relative" ref={vehiclePickerRef}>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Select Vehicle <span className="text-red-600">*</span>
                </label>
                
                {/* Selected Vehicle Display (read-only view) */}
                {formData.vehicleId && !showVehiclePicker && (
                  <div 
                    onClick={() => setShowVehiclePicker(true)}
                    className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg bg-white hover:border-blue-400 transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-yellow-400 border-2 border-slate-900 rounded px-2 py-0.5 font-bold text-xs">
                        {selectedVehicle?.vrm}
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-slate-900 text-sm leading-tight">
                          {selectedVehicle?.make} {selectedVehicle?.model}
                        </div>
                        <div className="text-xs text-slate-500">
                          {selectedVehicle?.ownerName}
                        </div>
                      </div>
                    </div>
                    <X 
                      className="text-slate-400 hover:text-red-600" 
                      size={16}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData({ ...formData, vehicleId: "" });
                        setVehicleSearch("");
                      }}
                    />
                  </div>
                )}

                {/* Search Input Field */}
                {(!formData.vehicleId || showVehiclePicker) && (
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10" size={16} />
                    <input
                      type="text"
                      value={vehicleSearch}
                      onChange={(e) => {
                        setVehicleSearch(e.target.value);
                        setShowVehiclePicker(true);
                      }}
                      onFocus={() => setShowVehiclePicker(true)}
                      placeholder="Search for a vehicle..."
                      className="w-full pl-10 pr-10 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-sm"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        setRefreshingVehicles(true);
                        await loadData();
                        setRefreshingVehicles(false);
                        addToast("Vehicles refreshed", "success");
                      }}
                      disabled={refreshingVehicles}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded transition-colors disabled:opacity-50"
                      title="Refresh vehicle list"
                    >
                      <RefreshCw className={`text-slate-600 ${refreshingVehicles ? 'animate-spin' : ''}`} size={16} />
                    </button>
                  </div>
                )}

                {/* Vehicle Picker Dropdown */}
                {showVehiclePicker && (
                  <div className="absolute z-50 mt-1.5 w-full bg-white border-2 border-blue-300 rounded-lg shadow-2xl">
                    {/* Vehicle List */}
                    <div className="max-h-64 overflow-y-auto p-1.5 space-y-1">
                      {vehicles
                        .filter(v => 
                          vehicleSearch === "" ? true :
                          v.vrm.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
                          v.ownerName.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
                          `${v.make} ${v.model}`.toLowerCase().includes(vehicleSearch.toLowerCase())
                        )
                        .slice(0, vehicleSearch ? 50 : 8)
                        .map((vehicle) => (
                          <button
                            key={vehicle.id}
                            type="button"
                            onClick={() => {
                              setFormData({ ...formData, vehicleId: vehicle.id });
                              setShowVehiclePicker(false);
                              setVehicleSearch("");
                            }}
                            className={`w-full text-left p-2 rounded-lg transition-colors flex items-center gap-2.5 group ${
                              formData.vehicleId === vehicle.id
                                ? 'bg-blue-50 border-2 border-blue-300'
                                : 'hover:bg-blue-50 border-2 border-transparent'
                            }`}
                          >
                            <div className="bg-yellow-400 border-2 border-slate-900 rounded px-2 py-0.5 font-bold text-xs shrink-0">
                              {vehicle.vrm}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`font-semibold truncate text-sm leading-tight ${
                                formData.vehicleId === vehicle.id ? 'text-blue-900' : 'text-slate-900'
                              }`}>
                                {vehicle.make} {vehicle.model}
                              </div>
                              <div className="text-xs text-slate-500 truncate">{vehicle.ownerName}</div>
                            </div>
                            {formData.vehicleId === vehicle.id && (
                              <Check className="text-blue-600 shrink-0" size={16} />
                            )}
                          </button>
                        ))}
                      
                      {vehicles.filter(v => 
                        vehicleSearch === "" ? false :
                        v.vrm.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
                        v.ownerName.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
                        `${v.make} ${v.model}`.toLowerCase().includes(vehicleSearch.toLowerCase())
                      ).length === 0 && vehicleSearch && (
                        <div className="text-center py-6 text-slate-500">
                          <Car className="mx-auto mb-2" size={24} />
                          <p className="font-medium">No vehicles found</p>
                          <p className="text-xs mt-1">Try searching with different keywords</p>
                        </div>
                      )}
                    </div>

                    {/* Show count */}
                    <div className="p-1.5 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 text-center">
                      {vehicleSearch ? 
                        `Showing ${vehicles.filter(v => 
                          v.vrm.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
                          v.ownerName.toLowerCase().includes(vehicleSearch.toLowerCase()) ||
                          `${v.make} ${v.model}`.toLowerCase().includes(vehicleSearch.toLowerCase())
                        ).length} results` :
                        `Showing ${Math.min(8, vehicles.length)} of ${vehicles.length} vehicles (search to see more)`
                      }
                    </div>
                  </div>
                )}
                
                {selectedVehicle && (
                  <div className="mt-2 px-3 py-2.5 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <div className="min-w-0">
                        <span className="text-slate-500 font-medium">Customer:</span>
                        <p className="font-semibold text-slate-900 text-sm leading-tight truncate">{selectedVehicle.ownerName}</p>
                      </div>
                      {selectedVehicle.ownerPhone && (
                        <div className="min-w-0">
                          <span className="text-slate-500 font-medium">Phone:</span>
                          <p className="font-semibold text-slate-900 text-sm leading-tight truncate">{selectedVehicle.ownerPhone}</p>
                        </div>
                      )}
                      {selectedVehicle.ownerEmail && (
                        <div className="min-w-0 flex-1">
                          <span className="text-slate-500 font-medium">Email:</span>
                          <p className="font-semibold text-slate-900 text-sm truncate">{selectedVehicle.ownerEmail}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* New Customer - VRM Lookup */}
            {isNewCustomer && (
              <div className="md:col-span-2 space-y-3">
                {/* Step 1: VRM Lookup */}
                {!vehicleDataFromVrm && (
                  <div className="p-3 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex items-start gap-2.5 mb-2">
                      <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
                        <Plus className="text-white" size={18} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">Step 1: Lookup Vehicle</h3>
                        <p className="text-xs text-slate-600 mt-0.5">Enter registration to fetch DVSA data automatically</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={vrmLookup}
                        onChange={(e) => setVrmLookup(e.target.value.toUpperCase())}
                        placeholder="e.g. AB12 CDE"
                        className="flex-1 px-3 py-2.5 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 font-bold text-center text-base uppercase"
                        maxLength={8}
                      />
                      <button
                        type="button"
                        onClick={handleVrmLookup}
                        disabled={lookingUpVrm || !vrmLookup.trim()}
                        className="px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-semibold text-sm flex items-center gap-2"
                      >
                        {lookingUpVrm ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Looking up...
                          </>
                        ) : (
                          <>
                            <Search size={16} />
                            Lookup
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
                      💡 <span>This will fetch make, model, colour from DVSA database</span>
                    </p>
                  </div>
                )}

                {/* Step 2: Customer Details Form (appears after VRM lookup) */}
                {vehicleDataFromVrm && (
                  <div className="space-y-3">
                    {/* Vehicle Info Card */}
                    <div className="p-3 bg-linear-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center">
                            <Check className="text-white" size={18} />
                          </div>
                          <div>
                            <h3 className="font-bold text-green-900">Vehicle Found</h3>
                            <p className="text-xs text-green-700">{vehicleDataFromVrm.make} {vehicleDataFromVrm.model}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setVehicleDataFromVrm(null);
                            setVrmLookup("");
                          }}
                          className="text-green-700 hover:text-green-900 text-sm font-medium"
                        >
                          Change VRM
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-green-700 font-medium">VRM:</span>
                          <div className="bg-yellow-400 border-2 border-slate-900 rounded px-2 py-0.5 font-bold inline-block mt-1 text-xs">
                            {vrmLookup}
                          </div>
                        </div>
                        <div>
                          <span className="text-green-700 font-medium">Colour:</span>
                          <p className="font-semibold text-slate-900">{vehicleDataFromVrm.colour || 'N/A'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Customer Form */}
                    <div className="p-3 bg-white border-2 border-green-200 rounded-lg">
                      <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                        Enter Customer Details
                      </h3>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Customer Name <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="text"
                            value={newCustomerData.name}
                            onChange={(e) => setNewCustomerData({ ...newCustomerData, name: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                            placeholder="John Smith"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Email <span className="text-red-600">*</span>
                          </label>
                          <input
                            type="email"
                            value={newCustomerData.email}
                            onChange={(e) => setNewCustomerData({ ...newCustomerData, email: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Phone (Optional)
                          </label>
                          <input
                            type="tel"
                            value={newCustomerData.phone}
                            onChange={(e) => setNewCustomerData({ ...newCustomerData, phone: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-green-500 text-sm"
                            placeholder="07000 123456"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={handleSaveNewCustomer}
                          disabled={loading || !newCustomerData.name || !newCustomerData.email}
                          className="w-full px-4 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2"
                        >
                          {loading ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Plus size={16} />
                              Add Customer & Vehicle
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Helper Text */}
                {!vehicleDataFromVrm && (
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
                    <strong>💡 Tip:</strong> If the customer already exists, switch to "Existing Customer" above.
                  </div>
                )}
              </div>
            )}

            {/* Job Type */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Job Type <span className="text-red-600">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {[
                  { value: 'MOT', label: 'MOT', icon: '🔍', color: 'purple' },
                  { value: 'SERVICE', label: 'Service', icon: '🔧', color: 'blue' },
                  { value: 'REPAIR', label: 'Repair', icon: '🔨', color: 'orange' },
                  { value: 'DIAGNOSTIC', label: 'Diagnostic', icon: '💻', color: 'green' },
                ].map((type) => (
                  (() => {
                    const selected = formData.type === type.value;
                    const classes = getJobTypeClasses(type.value, selected);
                    return (
                  <label
                    key={type.value}
                    className={`relative flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-colors ${classes.wrapper}`}
                  >
                    <input
                      type="radio"
                      name="jobType"
                      value={type.value}
                      checked={formData.type === type.value}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="sr-only"
                      required
                    />
                    <span className="text-base">{type.icon}</span>
                    <span className={`font-semibold text-sm ${classes.text}`}>
                      {type.label}
                    </span>
                    {selected && (
                      <Check className={`ml-auto ${classes.check}`} size={14} />
                    )}
                  </label>
                    );
                  })()
                ))}
              </div>
            </div>

            {/* Assigned Mechanic - Checkbox Style */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Assign Mechanic
              </label>
              <div className="space-y-2">
                {/* Unassigned Option */}
                <label
                  className={`relative flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-colors ${
                    formData.assignedToId === ""
                      ? 'border-slate-500 bg-slate-50'
                      : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="mechanic"
                    value=""
                    checked={formData.assignedToId === ""}
                    onChange={(e) => setFormData({ ...formData, assignedToId: e.target.value })}
                    className="sr-only"
                  />
                  <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                    <UserCircle2 className="text-slate-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold text-sm ${
                      formData.assignedToId === "" ? 'text-slate-900' : 'text-slate-700'
                    }`}>
                      Unassigned
                    </div>
                    <div className="text-xs text-slate-500">No mechanic assigned yet</div>
                  </div>
                  {formData.assignedToId === "" && (
                    <Check className="ml-auto text-slate-600" size={14} />
                  )}
                </label>

                {/* Staff Members */}
                {staff.map((s) => (
                  <label
                    key={s.id}
                    className={`relative flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-colors ${
                      formData.assignedToId === s.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="mechanic"
                      value={s.id}
                      checked={formData.assignedToId === s.id}
                      onChange={(e) => setFormData({ ...formData, assignedToId: e.target.value })}
                      className="sr-only"
                    />
                    {s.avatarUrl ? (
                      <img
                        src={s.avatarUrl}
                        alt={s.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-blue-200 shrink-0"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0 ${
                        formData.assignedToId === s.id
                          ? 'bg-blue-600 text-white border-blue-700'
                          : 'bg-blue-100 text-blue-700 border-blue-200'
                      }`}>
                        {s.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2)}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className={`font-semibold text-sm ${
                        formData.assignedToId === s.id ? 'text-blue-900' : 'text-slate-900'
                      }`}>
                        {s.name}
                      </div>
                      <div className="text-xs text-slate-500">{s.role}</div>
                    </div>
                    {formData.assignedToId === s.id && (
                      <Check className="ml-auto text-blue-600" size={14} />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Booked Date */}
            {/* Booked Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Booked Date
              </label>
              <input
                type="date"
                value={formData.bookedDate}
                onChange={(e) => setFormData({ ...formData, bookedDate: e.target.value })}
                className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            {/* Estimated Hours */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Estimated Hours
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={formData.estimatedHours}
                onChange={(e) =>
                  setFormData({ ...formData, estimatedHours: e.target.value })
                }
                className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                placeholder="Describe the work to be done..."
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Internal Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full px-3 py-2.5 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm"
                placeholder="Internal notes (not visible to customer)..."
              />
            </div>
          </div>
        </Card>

        {/* Items Section - Always Visible */}
        <Card className="p-0 overflow-hidden">
          {/* Header */}
          <div className="w-full px-4 py-3 bg-linear-to-r from-slate-800 to-slate-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 bg-white/20 rounded-lg">
                <Package className="text-white" size={20} />
              </div>
              <div className="text-left">
                <h2 className="text-base font-bold">Parts & Labor</h2>
                <p className="text-xs text-slate-300">{items.length} item{items.length !== 1 ? 's' : ''} • Total: £{(totals.laborTotal + totals.partsTotal) / 100 >= 0 ? ((totals.laborTotal + totals.partsTotal) / 100).toFixed(2) : '0.00'}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowInventoryPicker(!showInventoryPicker);
              }}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold flex items-center gap-2 text-xs transition-all"
            >
              <Package size={14} />
              Add From Stock
            </button>
          </div>

          {/* Inventory Picker Modal */}
          {showInventoryPicker && (
            <div ref={inventoryPickerRef} className="px-4 py-3 border-b border-b-slate-200 bg-linear-to-br from-green-50 to-emerald-50 border-l-4 border-l-green-400 animate-fadeIn">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2 text-sm">
                <Package className="text-green-600" size={18} />
                Add from Inventory
              </h3>

              {/* Search Bar */}
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="🔍 Search parts by name, SKU, or category..."
                  className="w-full px-3 py-2.5 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-500 bg-white shadow-sm text-sm"
                  onChange={(e) => {
                    const search = e.target.value.toLowerCase();
                  }}
                />
              </div>

              {/* Inventory Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                {inventory.length > 0 ? (
                  inventory.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleAddInventoryItem(item)}
                      className="group text-left p-3 bg-white border-2 border-green-200 rounded-lg hover:border-green-500 hover:shadow-sm transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="font-bold text-slate-900 truncate">{item.name}</div>
                          {item.sku && (
                            <div className="text-xs text-slate-600 font-mono mt-1">SKU: {item.sku}</div>
                          )}
                          <div className={`text-sm font-semibold px-2 py-1 rounded-full mt-2 inline-block ${
                            item.quantityOnHand === 0
                              ? "bg-red-100 text-red-700"
                              : item.quantityOnHand <= item.reorderLevel
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                          }`}>
                            {item.quantityOnHand === 0 ? "OUT" : `${item.quantityOnHand} stock`}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-700">£{(item.unitPricePence / 100).toFixed(2)}</div>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-8 text-slate-500">
                    <Package className="mx-auto mb-2 text-slate-300" size={32} />
                    <p className="font-medium">No inventory items</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Add Item Form - Always Visible */}
          <div className="px-4 py-4 border-b border-slate-200 bg-slate-50">
              <div className="space-y-3">
                {/* Row 1: Type and Item */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Type Select */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-2">Type</label>
                    <select
                      value={newItem.type}
                      onChange={(e) => {
                        const type = e.target.value as JobItem["type"];
                        setNewItem({ ...newItem, type, name: "", unitPricePence: "5000" });
                        setUseCustomItem(false);
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white font-medium"
                    >
                      <option value="LABOR">🔧 Labor</option>
                      <option value="PART">📦 Part</option>
                      <option value="SERVICE">⚙️ Service</option>
                    </select>
                  </div>

                  {/* Item Name Select */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 mb-2">Item</label>
                    {!useCustomItem ? (
                      <select
                        value={newItem.name}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          if (selectedValue === "__CUSTOM__") {
                            setUseCustomItem(true);
                            setNewItem({ ...newItem, name: "", unitPricePence: "5000" });
                          } else {
                            const item = getItemsForType().find(i => i.name === selectedValue);
                            setNewItem({ 
                              ...newItem, 
                              name: selectedValue,
                              unitPricePence: String(item?.price || 5000)
                            });
                          }
                        }}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                      >
                        <option value="">Select item...</option>
                        {getItemsForType().map((item) => (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                        <option value="__CUSTOM__" className="font-semibold text-blue-600">
                          ➕ Add Custom Item
                        </option>
                      </select>
                    ) : (
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={newItem.name}
                          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                          placeholder={`Custom ${newItem.type.toLowerCase()}...`}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setUseCustomItem(false);
                            setNewItem({ ...newItem, name: "" });
                          }}
                          className="text-xs text-slate-500 hover:text-slate-700 underline"
                        >
                          Back to predefined items
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 2: Qty, Price, Add Button */}
                <div className="flex flex-col md:flex-row gap-3 items-start md:items-end">
                  {/* Quantity */}
                  <div className="w-full md:w-40">
                    <label className="block text-xs font-semibold text-slate-600 mb-2">Qty</label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const current = parseInt(String(newItem.quantity)) || 1;
                          setNewItem({ ...newItem, quantity: Math.max(1, current - 1).toString() });
                        }}
                        className="px-3 py-2 bg-slate-300 hover:bg-slate-400 rounded font-bold text-slate-900 transition-colors shrink-0"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={newItem.quantity}
                        onChange={(e) => {
                          const val = e.target.value;
                          const numVal = parseInt(val) || 1;
                          setNewItem({ ...newItem, quantity: Math.max(1, numVal).toString() });
                        }}
                        className="flex-1 px-2 py-2 border border-slate-300 rounded text-center font-semibold text-sm min-w-0"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const current = parseInt(String(newItem.quantity)) || 1;
                          setNewItem({ ...newItem, quantity: (current + 1).toString() });
                        }}
                        className="px-3 py-2 bg-slate-300 hover:bg-slate-400 rounded font-bold text-slate-900 transition-colors shrink-0"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="w-full md:w-40">
                    <label className="block text-xs font-semibold text-slate-600 mb-2">Price (£)</label>
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
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 font-medium"
                    />
                  </div>

                  {/* Add Button */}
                  <div className="w-full md:flex-1">
                    <button
                      type="button"
                      onClick={handleAddItem}
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <Plus size={16} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

          {/* Added Items List */}
          <div className="p-4">
            {items.length > 0 ? (
              <div className="space-y-2.5">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-3 bg-white border-2 border-slate-200 hover:border-slate-300 rounded-lg transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 text-xs font-bold rounded-full ${
                            item.type === "LABOR"
                              ? "bg-blue-100 text-blue-700"
                              : item.type === "PART"
                              ? "bg-green-100 text-green-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {item.type === "LABOR" ? "🔧" : item.type === "PART" ? "📦" : "⚙️"} {item.type}
                        </span>
                        <span className="font-semibold text-slate-900 text-sm">{item.name}</span>
                        {item.fromInventory && (
                          <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-1 rounded border border-green-300">
                            📦 Stock
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-sm text-slate-600 mt-2">{item.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 ml-3">
                      <div className="text-right">
                        <div className="text-xs text-slate-600">{item.quantity} × £{(Number(item.unitPricePence) / 100).toFixed(2)}</div>
                        <div className="font-bold text-slate-900 text-base">£{(item.totalPence / 100).toFixed(2)}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Totals */}
                <div className="mt-4 pt-4 border-t-2 border-slate-200 space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">Labor:</span>
                    <span className="font-semibold">£{(totals.laborTotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">Parts:</span>
                    <span className="font-semibold">£{(totals.partsTotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">Subtotal:</span>
                    <span className="font-semibold">£{((totals.laborTotal + totals.partsTotal) / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-700 pt-2 border-t border-slate-200">
                    <span className="font-bold">Total (inc. VAT):</span>
                    <span className="font-bold text-base text-blue-600">£{(totals.total / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Package className="mx-auto text-slate-300 mb-2" size={36} />
                <p className="text-slate-600 font-medium">No items added yet</p>
                <p className="text-xs text-slate-500 mt-1">Click the header to add parts or labor to this job</p>
              </div>
            )}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Link
            href="/garage/jobs"
            className="flex-1 px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg font-semibold text-sm text-center transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || !formData.vehicleId}
            className="flex-1 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save size={16} />
                Create Job
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
