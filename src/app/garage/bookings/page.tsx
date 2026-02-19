"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import BookingModal from "@/components/BookingModal";
import { Badge } from "@/components/ui/Badge";
import { useToast, ToastContainer } from "@/components/ui/Toast";
import { formatUKDate } from "@/lib/uk-date";
import { Calendar, Clock, User, Phone, Mail, Car, CheckCircle, XCircle, Wrench } from "lucide-react";

interface Booking {
  id: string;
  bookingNumber: string;
  status: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleVrm: string | null;
  vehicleMake: string | null;
  vehicleModel: string | null;
  bookingDate: string;
  bookingTime: string;
  notes: string | null;
  depositPaid: boolean;
  depositPence: number;
  convertedToJob: boolean;
  createdAt: string;
  service: {
    name: string;
    category: string;
    pricePence: number;
    durationMinutes: number;
  };
    staff?: {
      id: string;
      name: string;
      role?: string;
    } | null;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("ALL");
  const [garageInfo, setGarageInfo] = useState<{ id: string; slug?: string; name?: string } | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [convertBooking, setConvertBooking] = useState<Booking | null>(null);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    const loadGarageInfo = async () => {
      try {
        const cached = localStorage.getItem("garage-data");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed?.id) {
            setGarageInfo({ id: parsed.id, slug: parsed.slug, name: parsed.name });
            return;
          }
        }
      } catch (error) {
        // ignore
      }

      try {
        const res = await fetch("/api/garages");
        if (res.ok) {
          const garages = await res.json();
          if (Array.isArray(garages) && garages[0]?.id) {
            const garage = garages[0];
            setGarageInfo({ id: garage.id, slug: garage.slug, name: garage.name });
            try {
              localStorage.setItem("garage-data", JSON.stringify(garage));
            } catch (error) {
              // ignore
            }
          }
        }
      } catch (error) {
        console.error("Error loading garage:", error);
      }
    };

    loadGarageInfo();
  }, []);

  useEffect(() => {
    if (garageInfo?.id) {
      fetchBookings();
    }
  }, [garageInfo?.id, filter]);

  // Auto-refresh every 15 seconds to catch new online bookings
  useEffect(() => {
    if (!garageInfo?.id) return;

    const interval = setInterval(() => {
      fetchBookings();
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [garageInfo?.id, filter]);

  // Refresh when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && garageInfo?.id) {
        fetchBookings();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [garageInfo?.id, filter]);

  const fetchBookings = async () => {
    try {
      if (!garageInfo?.id) return;

      const url = filter === "ALL"
        ? `/api/garages/${garageInfo.id}/bookings`
        : `/api/garages/${garageInfo.id}/bookings?status=${filter}`;

      const res = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async (bookingId: string) => {
    if (!confirm("Confirm this booking?")) return;

    try {
      // Optimistic update
      setBookings((prev) => prev.map(b => 
        b.id === bookingId ? { ...b, status: "CONFIRMED" } : b
      ));

      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CONFIRMED" }),
      });

      if (!res.ok) {
        // Revert on error
        fetchBookings();
        addToast("Failed to confirm booking", "error");
        return;
      }

      addToast("Booking confirmed successfully!", "success");
      // Refresh to ensure consistency
      setTimeout(() => fetchBookings(), 300);
    } catch (error) {
      console.error("Error confirming booking:", error);
      fetchBookings();
      addToast("Failed to confirm booking", "error");
    }
  };

  const handleCancel = async (bookingId: string) => {
    const reason = prompt("Cancel reason (optional):");
    if (reason === null) return; // User clicked cancel

    try {
      // Optimistic update
      setBookings((prev) => prev.map(b => 
        b.id === bookingId ? { ...b, status: "CANCELLED" } : b
      ));

      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "CANCELLED",
          cancellationReason: reason || "Cancelled by garage",
        }),
      });

      if (!res.ok) {
        // Revert on error
        fetchBookings();
        addToast("Failed to cancel booking", "error");
        return;
      }

      addToast("Booking cancelled successfully", "success");
      setTimeout(() => fetchBookings(), 300);
    } catch (error) {
      console.error("Error cancelling booking:", error);
      fetchBookings();
      addToast("Failed to cancel booking", "error");
    }
  };

  const handleComplete = async (bookingId: string) => {
    if (!confirm("Mark this booking as completed?")) return;

    try {
      // Optimistic update
      setBookings((prev) => prev.map(b => 
        b.id === bookingId ? { ...b, status: "COMPLETED" } : b
      ));

      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "COMPLETED" }),
      });

      if (!res.ok) {
        // Revert on error
        fetchBookings();
        addToast("Failed to complete booking", "error");
        return;
      }

      addToast("Booking marked as completed!", "success");
      setTimeout(() => fetchBookings(), 300);
    } catch (error) {
      console.error("Error completing booking:", error);
      fetchBookings();
      addToast("Failed to complete booking", "error");
    }
  };

  const handleConvertToJob = async (bookingId: string) => {
    setShowConvertModal(false);

    try {
      // Optimistically hide the booking from the list
      setBookings((prev) => prev.map(b => 
        b.id === bookingId ? { ...b, convertedToJob: true } : b
      ));

      const res = await fetch(`/api/bookings/${bookingId}/convert-to-job`, {
        method: "POST",
      });

      if (!res.ok) {
        const error = await res.json();
        // Revert optimistic update on error
        setBookings((prev) => prev.map(b => 
          b.id === bookingId ? { ...b, convertedToJob: false } : b
        ));
        addToast(error.error || "Failed to convert booking to job", "error");
        return;
      }

      const { job } = await res.json();
      addToast(`Booking converted to job ${job.jobNumber}. View it in the Jobs section.`, "success", 5000);
      
      // Wait a moment for DB to update, then refresh
      setTimeout(() => {
        fetchBookings();
      }, 500);
    } catch (error) {
      console.error("Error converting booking to job:", error);
      // Revert optimistic update on error
      setBookings((prev) => prev.map(b => 
        b.id === bookingId ? { ...b, convertedToJob: false } : b
      ));
      addToast("Failed to convert booking to job", "error");
    }
  };

  const openConvertModal = (booking: Booking) => {
    setConvertBooking(booking);
    setShowConvertModal(true);
  };

  const formatDate = (dateStr: string) =>
    formatUKDate(dateStr, {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatPrice = (pence: number) => `£${(pence / 100).toFixed(2)}`;

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "blue" | "green" | "amber" | "red" | "gray"> = {
      PENDING: "amber",
      CONFIRMED: "blue",
      COMPLETED: "green",
      CANCELLED: "red",
      NO_SHOW: "gray",
    };
    return <Badge variant={variants[status] || "gray"}>{status}</Badge>;
  };

  const filterOptions = [
    { label: "All", value: "ALL" },
    { label: "Pending", value: "PENDING" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Completed", value: "COMPLETED" },
    { label: "Cancelled", value: "CANCELLED" },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading bookings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600 mt-1">Manage customer appointments</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
        >
          New Booking
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              filter === option.value
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {bookings.filter(b => !b.convertedToJob).length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500 mb-4">No bookings found</p>
          <p className="text-sm text-gray-400">
            {filter === "ALL"
              ? "Customers can book services through your public garage page"
              : `No ${filter.toLowerCase()} bookings`}
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {bookings.filter(b => !b.convertedToJob).map((booking) => (
            <Card key={booking.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {booking.bookingNumber}
                  </h3>
                  {getStatusBadge(booking.status)}
                  {booking.depositPaid && (
                    <Badge variant="green">Deposit Paid</Badge>
                  )}
                    {booking.staff && (
                      <div className="ml-3 text-sm text-slate-600">Assigned: {booking.staff.name}</div>
                    )}
                </div>
                <div className="flex gap-2">
                  {booking.status === "PENDING" && (
                    <button
                      onClick={() => handleConfirm(booking.id)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium flex items-center gap-1"
                    >
                      <CheckCircle size={16} />
                      Confirm
                    </button>
                  )}
                  {(booking.status === "PENDING" || booking.status === "CONFIRMED") && (
                    <>
                      <button
                        onClick={() => handleComplete(booking.id)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 text-sm font-medium flex items-center gap-1"
                      >
                        <CheckCircle size={16} />
                        Complete
                      </button>
                      <button
                        onClick={() => handleCancel(booking.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 text-sm font-medium flex items-center gap-1"
                      >
                        <XCircle size={16} />
                        Cancel
                      </button>
                    </>
                  )}
                  {booking.status === "CONFIRMED" && !booking.convertedToJob && (
                    <button
                      onClick={() => openConvertModal(booking)}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 text-sm font-medium flex items-center gap-1"
                    >
                      <Wrench size={16} />
                      Convert to Job
                    </button>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Service</h4>
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">{booking.service.name}</p>
                    <p className="text-sm text-gray-600">
                      {booking.service.category} • {booking.service.durationMinutes} min
                    </p>
                    <p className="text-sm font-semibold text-blue-600">
                      {formatPrice(booking.service.pricePence)}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Customer</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{booking.customerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      <a href={`tel:${booking.customerPhone}`} className="text-blue-600 hover:underline">
                        {booking.customerPhone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} />
                      <a href={`mailto:${booking.customerEmail}`} className="text-blue-600 hover:underline">
                        {booking.customerEmail}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Appointment</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{formatDate(booking.bookingDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>{booking.bookingTime}</span>
                    </div>
                    {(booking.vehicleVrm || booking.vehicleMake) && (
                      <div className="flex items-center gap-2">
                        <Car size={14} />
                        <span>
                          {booking.vehicleVrm || ""} {booking.vehicleMake} {booking.vehicleModel}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {booking.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-semibold text-gray-700">Notes:</p>
                  <p className="text-sm text-gray-600 mt-1">{booking.notes}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}

      {showCreateModal && garageInfo?.id && (
        <BookingModal
          garageId={garageInfo.id}
          garageSlug={garageInfo.slug}
          garageName={garageInfo.name || "Garage"}
          useInternalServices
          onClose={() => setShowCreateModal(false)}
          onSuccess={(bookingNumber) => {
            setShowCreateModal(false);
            addToast(`Booking ${bookingNumber} created successfully!`, "success");
            fetchBookings();
          }}
        />
      )}

      {showConvertModal && convertBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md rounded-2xl border border-white/40 bg-white/95 shadow-2xl">
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Convert Booking</p>
                  <h3 className="mt-2 text-lg font-bold text-slate-900">Create a job from this booking?</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    This will create a new job and vehicle record and move the booking into your Jobs list.
                  </p>
                </div>
                <button
                  onClick={() => setShowConvertModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{convertBooking.bookingNumber}</span>
                  <span className="text-xs text-slate-500">{convertBooking.service.name}</span>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  {convertBooking.customerName} • {formatDate(convertBooking.bookingDate)} • {convertBooking.bookingTime}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowConvertModal(false)}
                  className="flex-1 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleConvertToJob(convertBooking.id)}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  Convert to Job
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
