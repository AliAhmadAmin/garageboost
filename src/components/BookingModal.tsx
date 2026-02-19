"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatUKDateFromLocalDate } from "@/lib/uk-date";

interface Service {
  id: string;
  name: string;
  description: string | null;
  category: string;
  durationMinutes: number;
  pricePence: number;
  depositRequired: boolean;
  depositPence: number;
}

interface BookingModalProps {
  garageId: string;
  garageSlug?: string;
  garageName: string;
  useInternalServices?: boolean;
  initialService?: Service | null;
  onClose: () => void;
  onSuccess?: (bookingNumber: string) => void;
}

export default function BookingModal({
  garageId,
  garageSlug,
  garageName,
  useInternalServices = false,
  initialService = null,
  onClose,
  onSuccess,
}: BookingModalProps) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<"service" | "details" | "confirm" | "success">(
    initialService ? "details" : "service"
  );
  const [services, setServices] = useState<Service[]>([]);
  const [bookingResult, setBookingResult] = useState<{
    bookingNumber: string;
    requiresPayment: boolean;
    depositAmount?: number;
  } | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(initialService);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [initialServiceApplied, setInitialServiceApplied] = useState(false);
  const [vrmLookupLoading, setVrmLookupLoading] = useState(false);
  const [vrmLookupError, setVrmLookupError] = useState<string | null>(null);
  const [lookupData, setLookupData] = useState<{
    make?: string;
    model?: string;
    motExpiry?: string | null;
    taxExpiry?: string | null;
    taxStatus?: string | null;
    mileage?: number | null;
  } | null>(null);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    vehicleVrm: "",
    vehicleMake: "",
    vehicleModel: "",
    bookingDate: "",
    bookingTime: "09:00",
    notes: "",
    staffId: "",
  });

  useEffect(() => {
    fetchServices();
    fetchStaff();
    fetchGarageDetails();
  }, [garageSlug, garageId, useInternalServices]);

  useEffect(() => {
    if (initialService && !selectedService && !initialServiceApplied) {
      setSelectedService(initialService);
      setStep("details");
      setInitialServiceApplied(true);
    }
  }, [initialService, selectedService, initialServiceApplied]);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const [staffList, setStaffList] = useState<any[]>([]);
  const [garageDetails, setGarageDetails] = useState<any>(null);

  const fetchStaff = async () => {
    try {
      const res = await fetch(`/api/garages/${garageId}/staff`);
      const data = await res.json();
      setStaffList(data.staff || []);
    } catch (err) {
      console.error("Error fetching staff:", err);
    }
  };

  const fetchGarageDetails = async () => {
    try {
      const res = await fetch(`/api/garages/${garageId}`);
      const data = await res.json();
      setGarageDetails(data.garage || data);
    } catch (err) {
      console.error("Error fetching garage details:", err);
    }
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      if (useInternalServices) {
        const res = await fetch(`/api/garages/${garageId}/services?activeOnly=true`);
        const data = await res.json();
        setServices(data.services || []);
        return;
      }

      if (!garageSlug) {
        setServices([]);
        return;
      }

      const res = await fetch(`/api/garages/public/${garageSlug}/services`);
      const data = await res.json();
      setServices(data.services || []);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setBookingError(null);
    setStep("details");
  };

  const isValidVrm = (value: string) => {
    const compact = value.replace(/\s/g, "").toUpperCase();
    if (compact.length < 5 || compact.length > 8) return false;
    return /^[A-Z0-9]+$/.test(compact);
  };

  const handleVrmLookup = async () => {
    const vrm = formData.vehicleVrm.replace(/\s/g, "").toUpperCase();
    if (!vrm) {
      setVrmLookupError(null);
      return;
    }
    if (!isValidVrm(vrm)) {
      setVrmLookupError("Enter a valid registration number.");
      return;
    }

    setVrmLookupError(null);
    setVrmLookupLoading(true);

    try {
      const res = await fetch("/api/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vrm }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Vehicle lookup failed");
      }

      setFormData((prev) => ({
        ...prev,
        vehicleVrm: vrm,
        vehicleMake: data.make || prev.vehicleMake,
        vehicleModel: data.model || prev.vehicleModel,
      }));
      setLookupData({
        make: data.make || undefined,
        model: data.model || undefined,
        motExpiry: data.motExpiry || null,
        taxExpiry: data.taxExpiry || null,
        taxStatus: data.taxStatus || null,
        mileage: typeof data.mileage === "number" ? data.mileage : null,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Vehicle lookup failed";
      setVrmLookupError(message);
    } finally {
      setVrmLookupLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService) return;

    try {
      setSubmitting(true);
      setBookingError(null);

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          garageId,
          serviceId: selectedService.id,
          ...formData,
          vehicleData: {
            make: lookupData?.make || formData.vehicleMake || null,
            model: lookupData?.model || formData.vehicleModel || null,
            motExpiry: lookupData?.motExpiry || null,
            taxExpiry: lookupData?.taxExpiry || null,
            taxStatus: lookupData?.taxStatus || null,
            mileage: lookupData?.mileage ?? null,
          },
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Booking error:", error.error || "Failed to create booking");
        setBookingError(error.error || "Failed to create booking");
        return;
      }

      const { booking } = await res.json();

      // Set booking result and show success screen
      setBookingResult({
        bookingNumber: booking.bookingNumber,
        requiresPayment: selectedService.depositRequired,
        depositAmount: selectedService.depositPence,
      });
      setStep("success");
      
      // Call success callback if provided (internal use)
      if (onSuccess) {
        setTimeout(() => onSuccess(booking.bookingNumber), 500);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      setBookingError("Failed to create booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (pence: number) => `£${(pence / 100).toFixed(2)}`;

  const printContent = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const address = garageDetails?.address || "";
    const postcode = garageDetails?.postcode || "";
    const phone = garageDetails?.phone || "";
    const email = garageDetails?.email || "";

    const footerText = `${address}${postcode ? ", " + postcode : ""}${
      phone ? " | Phone: " + phone : ""
    }${email ? " | " + email : ""}`;

    const scheduledDateLabel = formatUKDateFromLocalDate(formData.bookingDate, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Booking Confirmation</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          @page {
            margin: 2.5cm 2cm;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 40px 20px 60px;
          }
          
          .content {
            max-width: 600px;
            margin: 0 auto;
          }
          
          .header {
            text-align: center;
            margin-bottom: 40px;
          }
          
          .status-icon {
            display: inline-block;
            width: 50px;
            height: 50px;
            background: #dcfce7;
            border-radius: 50%;
            text-align: center;
            line-height: 50px;
            font-size: 28px;
            margin-bottom: 15px;
          }
          
          h1 {
            font-size: 28px;
            margin-bottom: 10px;
          }
          
          .subtitle {
            color: #666;
            font-size: 14px;
            margin-bottom: 30px;
          }
          
          .booking-card {
            border: 1px solid #dbeafe;
            border-radius: 8px;
            padding: 20px;
            background: #f0f9ff;
            margin-bottom: 30px;
          }
          
          .booking-field {
            margin-bottom: 15px;
          }
          
          .booking-label {
            font-size: 12px;
            color: #666;
            margin-bottom: 4px;
          }
          
          .booking-value {
            font-size: 16px;
            font-weight: bold;
            color: #1e40af;
          }
          
          .booking-number {
            font-family: 'Courier New', monospace;
            font-size: 24px;
          }
          
          .info-section {
            margin-bottom: 20px;
            padding: 15px;
            border-left: 3px solid #bfdbfe;
            background: #f9fafb;
          }
          
          .info-title {
            font-weight: bold;
            color: #1f2937;
            font-size: 14px;
            margin-bottom: 5px;
          }
          
          .info-text {
            font-size: 13px;
            color: #555;
          }
          
          .footer-section {
            margin-top: 60px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            font-size: 12px;
            color: #999;
          }
          
          .garage-header {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 30px;
            color: #1f2937;
          }
          
          .garage-footer {
            position: fixed;
            bottom: 10mm;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 10px;
            color: #999;
            border-top: 1px solid #e5e7eb;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="garage-header">${garageName}</div>
        
        <div class="content">
          <div class="header">
            <div class="status-icon">✓</div>
            <h1>Booking Confirmed!</h1>
            <p class="subtitle">Your appointment has been successfully scheduled.</p>
          </div>
          
          <div class="booking-card">
            <div class="booking-field">
              <div class="booking-label">Booking Number</div>
              <div class="booking-value booking-number">${
                bookingResult?.bookingNumber
              }</div>
            </div>
            
            <div class="booking-field">
              <div class="booking-label">Scheduled For</div>
              <div class="booking-value">${scheduledDateLabel} at ${formData.bookingTime}</div>
            </div>
            
            <div class="booking-field">
              <div class="booking-label">Service</div>
              <div class="booking-value">${selectedService?.name}</div>
            </div>
          </div>
          
          <div class="info-section">
            <div class="info-title">📧 Confirmation Email</div>
            <div class="info-text">We'll send you a confirmation email with your booking details shortly.</div>
          </div>
          
          ${
            bookingResult?.requiresPayment
              ? `<div class="info-section">
            <div class="info-title">💳 Payment Required</div>
            <div class="info-text">A deposit of £${(
                bookingResult.depositAmount! / 100
              ).toFixed(
                2
              )} is required to confirm this booking. You'll receive a payment link in your email shortly.</div>
          </div>`
              : ""
          }
          
          <div class="info-section">
            <div class="info-title">📞 Need to Change Your Appointment?</div>
            <div class="info-text">Contact ${garageName} to reschedule or cancel your booking. You can reference your booking number above.</div>
          </div>
          
          <div class="footer-section">
            <p>Thank you for your business!</p>
          </div>
        </div>
        
        <div class="garage-footer">
          ${footerText}
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  // Generate time slots (9am - 5pm, 30min intervals)
  const timeSlots = [];
  for (let hour = 9; hour < 17; hour++) {
    timeSlots.push(`${String(hour).padStart(2, "0")}:00`);
    timeSlots.push(`${String(hour).padStart(2, "0")}:30`);
  }

  // Get min date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Get max date (3 months from now)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300 slide-in-from-bottom-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Book a Service</h2>
              <p className="text-gray-600">{garageName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Step 1: Select Service */}
          {step === "service" && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Choose a Service</h3>
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading services...</div>
              ) : services.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No services available for booking at this time.
                </div>
              ) : (
                <div className="space-y-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect(service)}
                      className="w-full p-4 border-2 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{service.name}</h4>
                            <Badge variant={service.category === "MOT" ? "blue" : "gray"}>
                              {service.category}
                            </Badge>
                          </div>
                          {service.description && (
                            <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>⏱️ {service.durationMinutes} min</span>
                            {service.depositRequired && (
                              <span className="text-amber-600">
                                💰 Deposit: {formatPrice(service.depositPence)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {formatPrice(service.pricePence)}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Fill Details */}
          {step === "details" && selectedService && (
            <form onSubmit={handleSubmit}>
              <div className="mb-5 p-4 md:p-5 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-slate-900">
                      {selectedService.name}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {selectedService.durationMinutes} minutes • {formatPrice(selectedService.pricePence)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setInitialServiceApplied(true);
                      setBookingError(null);
                      setSelectedService(null);
                      setStep("service");
                    }}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 underline-offset-4 hover:underline cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900">Your Details</h3>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={formData.customerName}
                      onChange={(e) =>
                        setFormData({ ...formData, customerName: e.target.value })
                      }
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      value={formData.customerEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, customerEmail: e.target.value })
                      }
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.customerPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, customerPhone: e.target.value })
                      }
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Vehicle Registration (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.vehicleVrm}
                      onChange={(e) =>
                        setFormData({ ...formData, vehicleVrm: e.target.value.toUpperCase() })
                      }
                      onBlur={handleVrmLookup}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., AB12 CDE"
                    />
                    {vrmLookupError && (
                      <p className="text-xs text-red-600 mt-1">{vrmLookupError}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assign Staff (optional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, staffId: "" })}
                        className={`px-3 py-2 rounded-lg border text-sm font-medium shadow-sm transition-colors ${
                          formData.staffId === ""
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:bg-slate-50"
                        }`}
                      >
                        Unassigned
                      </button>
                      {staffList.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, staffId: s.id })}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-left shadow-sm transition-colors ${
                            formData.staffId === s.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                          }`}
                        >
                          {s.avatarUrl ? (
                            <img
                              src={s.avatarUrl}
                              alt={s.name}
                              className="w-7 h-7 rounded-full object-cover border border-slate-200"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold border border-blue-200">
                              {s.name
                                ?.split(" ")
                                .map((n: string) => n.charAt(0))
                                .join("")
                                .toUpperCase()
                                .slice(0, 2)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-slate-900 truncate">
                              {s.name}
                            </div>
                            {s.role && (
                              <div className="text-[10px] text-slate-500 truncate">{s.role}</div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 md:p-5 shadow-sm">
                  <h3 className="text-base md:text-lg font-semibold text-slate-900">
                    Appointment Time
                  </h3>

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.bookingDate}
                      onChange={(e) =>
                        setFormData({ ...formData, bookingDate: e.target.value })
                      }
                      min={minDate}
                      max={maxDateStr}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <select
                      value={formData.bookingTime}
                      onChange={(e) =>
                        setFormData({ ...formData, bookingTime: e.target.value })
                      }
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </div>
                  </div>

                  {bookingError && (
                    <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {bookingError}
                    </div>
                  )}

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes (optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Any special requirements or information..."
                    />
                  </div>
                </div>

                {selectedService.depositRequired && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-900">
                      <strong>Deposit Required:</strong> A deposit of{" "}
                      {formatPrice(selectedService.depositPence)} is required to confirm this
                      booking. You'll be redirected to payment after submitting.
                    </p>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep("service")}
                    className="px-6 py-3 border border-slate-200 rounded-lg bg-white text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm disabled:opacity-50 cursor-pointer"
                  >
                    {submitting
                      ? "Creating booking..."
                      : selectedService.depositRequired
                      ? "Continue to Payment"
                      : "Confirm Booking"}
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* Step 4: Success Confirmation */}
          {step === "success" && bookingResult && (
            <div className="text-center py-8">
              {/* Success Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center animate-in fade-in zoom-in">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully scheduled.
              </p>

              {/* Booking Details Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-left">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Booking Number</p>
                  <p className="text-2xl font-bold text-blue-600 font-mono">
                    {bookingResult.bookingNumber}
                  </p>
                </div>
                {formData.bookingDate && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Scheduled For</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatUKDateFromLocalDate(formData.bookingDate, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      at {formData.bookingTime}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 mb-1">Service</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedService?.name}
                  </p>
                </div>
              </div>

              {/* Important Notices */}
              <div className="space-y-4 mb-8">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left">
                  <div className="flex gap-3">
                    <div className="text-xl">📧</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        Confirmation Email
                      </p>
                      <p className="text-sm text-gray-600">
                        We'll send you a confirmation email with your booking details shortly.
                      </p>
                    </div>
                  </div>
                </div>

                {bookingResult.requiresPayment && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left">
                    <div className="flex gap-3">
                      <div className="text-xl">💳</div>
                      <div>
                        <p className="font-semibold text-amber-900 text-sm mb-1">
                          Payment Required
                        </p>
                        <p className="text-sm text-amber-900 mb-3">
                          A deposit of £
                          {(bookingResult.depositAmount! / 100).toFixed(2)} is required to confirm
                          this booking. You'll receive a payment link in your email shortly.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-left">
                  <div className="flex gap-3">
                    <div className="text-xl">📞</div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        Need to Change Your Appointment?
                      </p>
                      <p className="text-sm text-gray-600">
                        Contact {garageName} to reschedule or cancel your booking. You can
                        reference your booking number above.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>,
    document.body
  );
}
