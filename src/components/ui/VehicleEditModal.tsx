"use client";

import { useState, useEffect } from "react";
import { X, AlertCircle } from "lucide-react";
import { Card } from "./Card";

interface Vehicle {
  id: string;
  vrm: string;
  make: string;
  model: string;
  typeApproval?: string | null;
  ownerName: string;
  ownerPhone?: string;
  ownerEmail?: string;
  customerId?: string | null;
  motExpiry: string;
  mileage?: number;
  taxExpiry?: string | null;
  taxStatus?: string | null;
  batteryInstallDate?: string | null;
  batteryBrand?: string | null;
  batteryVoltage?: number | null;
  batteryCCA?: number | null;
  batteryHealth?: number | null;
  batteryLastChecked?: string | null;
  tyreFrontLeftDepth?: number | null;
  tyreFrontRightDepth?: number | null;
  tyreRearLeftDepth?: number | null;
  tyreRearRightDepth?: number | null;
  tyreSize?: string | null;
  tyreBrand?: string | null;
  tyreLastChecked?: string | null;
}

interface VehicleEditModalProps {
  isOpen: boolean;
  vehicle: Vehicle | null;
  onClose: () => void;
  onSave: (vehicle: Vehicle) => Promise<void>;
}

export function VehicleEditModal({ isOpen, vehicle, onClose, onSave }: VehicleEditModalProps) {
  const createEmptyVehicle = (): Vehicle => ({
    id: "",
    vrm: "",
    make: "",
    model: "",
    typeApproval: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    customerId: null,
    motExpiry: "",
    mileage: 0,
    taxExpiry: "",
    taxStatus: "",
    batteryInstallDate: "",
    batteryBrand: "",
    batteryVoltage: undefined,
    batteryCCA: undefined,
    batteryHealth: undefined,
    batteryLastChecked: "",
    tyreFrontLeftDepth: undefined,
    tyreFrontRightDepth: undefined,
    tyreRearLeftDepth: undefined,
    tyreRearRightDepth: undefined,
    tyreSize: "",
    tyreBrand: "",
    tyreLastChecked: "",
  });

  const [formData, setFormData] = useState<Vehicle>(
    vehicle || createEmptyVehicle()
  );
  const [initialFormData, setInitialFormData] = useState<Vehicle>(vehicle || createEmptyVehicle());
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form data when vehicle prop changes
  useEffect(() => {
    if (vehicle) {
      // normalize values for editing: trim and apply sensible casing
      const titleCase = (s: string) =>
        s
          .trim()
          .toLowerCase()
          .split(/\s+/)
          .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : ""))
          .join(" ");

      const normalizedVehicle = {
        ...vehicle,
        make: (vehicle.make || "").toUpperCase(),
        typeApproval: vehicle.typeApproval ? String(vehicle.typeApproval).toUpperCase() : "",
        model: vehicle.model ? (vehicle.model.toLowerCase() === "unknown" ? "Unknown" : titleCase(vehicle.model)) : "",
        ownerName: vehicle.ownerName ? titleCase(vehicle.ownerName) : "",
      };
      setFormData(normalizedVehicle);
      setInitialFormData(normalizedVehicle);
      setErrors({});
    }
  }, [vehicle]);

  if (!isOpen || !vehicle) return null;

  const hasUnsavedChanges = JSON.stringify(formData) !== JSON.stringify(initialFormData);

  const handleDiscard = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.vrm.trim()) newErrors.vrm = "VRM is required";
    if (!formData.make.trim()) newErrors.make = "Make is required";
    if (!formData.model.trim()) newErrors.model = "Model is required";
    if (!formData.ownerName.trim()) newErrors.ownerName = "Owner name is required";
    if (!formData.motExpiry) newErrors.motExpiry = "MOT expiry date is required";
    if (formData.ownerEmail && !formData.ownerEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.ownerEmail = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      // final normalization before save
      const normalize = (s?: string | null) => (s ? s.trim() : "");
      const titleCase = (s: string) =>
        s
          .trim()
          .toLowerCase()
          .split(/\s+/)
          .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1) : ""))
          .join(" ");

      const payload = {
        ...formData,
        make: normalize(formData.make).toUpperCase(),
        typeApproval: normalize(formData.typeApproval).toUpperCase() || undefined,
        model:
          normalize(formData.model).toLowerCase() === "unknown"
            ? "Unknown"
            : titleCase(normalize(formData.model)),
        ownerName: titleCase(normalize(formData.ownerName)),
        motExpiry: formData.motExpiry ?? undefined,
        taxExpiry: formData.taxExpiry ?? undefined,
      } as Vehicle;

      console.log("[VehicleEditModal] Submitting payload:", { 
        id: payload.id,
        customerId: payload.customerId,
        ownerName: payload.ownerName,
        ownerEmail: payload.ownerEmail,
        ownerPhone: payload.ownerPhone
      });

      await onSave(payload);
      onClose();
    } catch (error) {
      setErrors({ submit: "Failed to save vehicle. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const daysUntilMOT = formData.motExpiry
    ? Math.ceil((new Date(formData.motExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end md:items-center justify-center md:p-4 animate-in fade-in duration-200">
      <Card className="w-full md:max-w-2xl h-full md:h-auto md:max-h-[90vh] flex flex-col shadow-2xl md:rounded-xl rounded-none animate-in fade-in zoom-in-95 slide-in-from-bottom duration-300 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between bg-linear-to-r from-blue-600 to-blue-700 p-4 md:p-6 border-b border-blue-800 shrink-0">
          <div className="min-w-0 flex-1 mr-2">
            <h2 className="text-lg md:text-2xl font-bold text-white truncate">Edit Vehicle & Customer</h2>
            <p className="text-blue-100 text-xs md:text-sm mt-1 line-clamp-1">Update vehicle details and customer information</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-blue-200 hover:text-white transition-colors p-2 hover:bg-blue-600 rounded-lg shrink-0 touch-manipulation min-h-11 min-w-11 flex items-center justify-center"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        <form id="vehicle-edit-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6 space-y-4 md:space-y-6 pb-24 md:pb-6">
          {/* Error Alert */}
          {errors.submit && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 p-4 rounded-lg">
              <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
              <p className="text-red-700 font-medium">{errors.submit}</p>
            </div>
          )}

          {/* Vehicle Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-200">
              <div className="w-1 h-6 bg-blue-600 rounded"></div>
              <h3 className="text-lg font-bold text-slate-900">Vehicle Information</h3>
            </div>

            {/* VRM */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Registration Number (VRM) <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.vrm}
                onChange={(e) => {
                  setFormData({ ...formData, vrm: e.target.value.toUpperCase() });
                  setErrors({ ...errors, vrm: "" });
                }}
                className={`w-full px-4 py-2.5 border-2 rounded-lg font-bold text-lg text-center tracking-wider bg-white focus:outline-none transition-colors ${
                  errors.vrm ? "border-red-500 bg-red-50" : "border-slate-300 focus:border-blue-500"
                }`}
                placeholder="AB12CDE"
              />
              {errors.vrm && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.vrm}</p>}
            </div>

            {/* Make and Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Make <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.make}
                  onChange={(e) => {
                    setFormData({ ...formData, make: e.target.value });
                    setErrors({ ...errors, make: "" });
                  }}
                  className={`w-full px-4 py-2.5 border-2 rounded-lg bg-white focus:outline-none transition-colors ${
                    errors.make ? "border-red-500 bg-red-50" : "border-slate-300 focus:border-blue-500"
                  }`}
                  placeholder="Toyota"
                />
                {errors.make && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.make}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Model <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => {
                    setFormData({ ...formData, model: e.target.value });
                    setErrors({ ...errors, model: "" });
                  }}
                  className={`w-full px-4 py-2.5 border-2 rounded-lg bg-white focus:outline-none transition-colors ${
                    errors.model ? "border-red-500 bg-red-50" : "border-slate-300 focus:border-blue-500"
                  }`}
                  placeholder="Corolla"
                />
                {errors.model && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.model}</p>}
              </div>
            </div>

            {/* Type Approval */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Type Approval</label>
              <input
                type="text"
                value={formData.typeApproval || ""}
                onChange={(e) => setFormData({ ...formData, typeApproval: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="M1"
              />
            </div>

            {/* Mileage and MOT Expiry */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Mileage (miles)</label>
                <input
                  type="number"
                  value={formData.mileage || ""}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value ? parseInt(e.target.value) : undefined })}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="45000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  MOT Expiry <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.motExpiry ? formData.motExpiry.split("T")[0] : ""}
                    onChange={(e) => {
                      setFormData({ ...formData, motExpiry: e.target.value });
                      setErrors({ ...errors, motExpiry: "" });
                    }}
                    className={`w-full px-4 py-2.5 border-2 rounded-lg bg-white focus:outline-none transition-colors ${
                      errors.motExpiry ? "border-red-500 bg-red-50" : "border-slate-300 focus:border-blue-500"
                    }`}
                  />
                  {daysUntilMOT !== null && (
                    <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-1 rounded ${
                      daysUntilMOT < 7 ? "bg-red-100 text-red-700" :
                      daysUntilMOT < 30 ? "bg-amber-100 text-amber-700" :
                      "bg-emerald-100 text-emerald-700"
                    }`}>
                      {daysUntilMOT}d
                    </span>
                  )}
                </div>
                {errors.motExpiry && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.motExpiry}</p>}
              </div>
            </div>
          </div>

          {/* Road Tax Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-200">
              <div className="w-1 h-6 bg-emerald-600 rounded"></div>
              <h3 className="text-lg font-bold text-slate-900">Road Tax (RFL)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tax Status</label>
                <select
                  value={formData.taxStatus || ""}
                  onChange={(e) => setFormData({ ...formData, taxStatus: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                >
                  <option value="">Unknown</option>
                  <option value="Taxed">Taxed</option>
                  <option value="SORN">SORN</option>
                  <option value="Untaxed">Untaxed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tax Expiry</label>
                <input
                  type="date"
                  value={formData.taxExpiry ? formData.taxExpiry.split("T")[0] : ""}
                  onChange={(e) => setFormData({ ...formData, taxExpiry: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Customer Details Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-200">
              <div className="w-1 h-6 bg-blue-600 rounded"></div>
              <h3 className="text-lg font-bold text-slate-900">Customer Details</h3>
            </div>

            {/* Owner Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Customer Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={formData.ownerName}
                onChange={(e) => {
                  setFormData({ ...formData, ownerName: e.target.value });
                  setErrors({ ...errors, ownerName: "" });
                }}
                className={`w-full px-4 py-2.5 border-2 rounded-lg bg-white focus:outline-none transition-colors ${
                  errors.ownerName ? "border-red-500 bg-red-50" : "border-slate-300 focus:border-blue-500"
                }`}
                placeholder="John Doe"
              />
              {errors.ownerName && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.ownerName}</p>}
            </div>

            {/* Phone and Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.ownerPhone || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, ownerPhone: e.target.value });
                    setErrors({ ...errors, ownerPhone: "" });
                  }}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="07123 456789"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.ownerEmail || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, ownerEmail: e.target.value });
                    setErrors({ ...errors, ownerEmail: "" });
                  }}
                  className={`w-full px-4 py-2.5 border-2 rounded-lg bg-white focus:outline-none transition-colors ${
                    errors.ownerEmail ? "border-red-500 bg-red-50" : "border-slate-300 focus:border-blue-500"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.ownerEmail && <p className="text-red-600 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.ownerEmail}</p>}
              </div>
            </div>
          </div>

          {/* Battery Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-200">
              <div className="w-1 h-6 bg-amber-600 rounded"></div>
              <h3 className="text-lg font-bold text-slate-900">Battery</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Brand</label>
                <input
                  type="text"
                  value={formData.batteryBrand || ""}
                  onChange={(e) => setFormData({ ...formData, batteryBrand: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Bosch"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Install Date</label>
                <input
                  type="date"
                  value={formData.batteryInstallDate ? formData.batteryInstallDate.split("T")[0] : ""}
                  onChange={(e) => setFormData({ ...formData, batteryInstallDate: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Voltage (V)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.batteryVoltage ?? ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    batteryVoltage: e.target.value ? Number(e.target.value) : undefined,
                  })}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="12.6"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">CCA</label>
                <input
                  type="number"
                  value={formData.batteryCCA ?? ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    batteryCCA: e.target.value ? Number(e.target.value) : undefined,
                  })}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="650"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Health (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.batteryHealth ?? ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    batteryHealth: e.target.value ? Number(e.target.value) : undefined,
                  })}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="85"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Last Checked</label>
              <input
                type="date"
                value={formData.batteryLastChecked ? formData.batteryLastChecked.split("T")[0] : ""}
                onChange={(e) => setFormData({ ...formData, batteryLastChecked: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Tyres Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-200">
              <div className="w-1 h-6 bg-slate-800 rounded"></div>
              <h3 className="text-lg font-bold text-slate-900">Tyres</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Tyre Size</label>
                <input
                  type="text"
                  value={formData.tyreSize || ""}
                  onChange={(e) => setFormData({ ...formData, tyreSize: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-slate-700 transition-colors"
                  placeholder="205/55R16"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Brand</label>
                <input
                  type="text"
                  value={formData.tyreBrand || ""}
                  onChange={(e) => setFormData({ ...formData, tyreBrand: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-slate-700 transition-colors"
                  placeholder="Michelin"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">FL (mm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.tyreFrontLeftDepth ?? ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    tyreFrontLeftDepth: e.target.value ? Number(e.target.value) : undefined,
                  })}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-slate-700 transition-colors"
                  placeholder="4.2"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">FR (mm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.tyreFrontRightDepth ?? ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    tyreFrontRightDepth: e.target.value ? Number(e.target.value) : undefined,
                  })}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-slate-700 transition-colors"
                  placeholder="4.0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">RL (mm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.tyreRearLeftDepth ?? ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    tyreRearLeftDepth: e.target.value ? Number(e.target.value) : undefined,
                  })}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-slate-700 transition-colors"
                  placeholder="3.8"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">RR (mm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.tyreRearRightDepth ?? ""}
                  onChange={(e) => setFormData({
                    ...formData,
                    tyreRearRightDepth: e.target.value ? Number(e.target.value) : undefined,
                  })}
                  className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-slate-700 transition-colors"
                  placeholder="3.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Last Checked</label>
              <input
                type="date"
                value={formData.tyreLastChecked ? formData.tyreLastChecked.split("T")[0] : ""}
                onChange={(e) => setFormData({ ...formData, tyreLastChecked: e.target.value })}
                className="w-full px-4 py-2.5 border-2 border-slate-300 rounded-lg bg-white focus:outline-none focus:border-slate-700 transition-colors"
              />
            </div>
          </div>
          </div>
        </form>

        {/* Sticky Unsaved Changes Action Bar */}
        {hasUnsavedChanges && (
          <div className="sticky bottom-0 border-t border-slate-200 bg-white/95 backdrop-blur-sm p-4 md:p-6 shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-700">You have unsaved changes</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDiscard}
                  disabled={loading}
                  className="px-4 md:px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg font-semibold transition-colors text-sm md:text-base disabled:opacity-60"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  form="vehicle-edit-form"
                  disabled={loading}
                  className="px-4 md:px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white rounded-lg font-semibold transition-all disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
