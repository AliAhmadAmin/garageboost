"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Phone, Car, CheckCircle, AlertCircle, Wrench } from "lucide-react";
import { getGarageId } from "@/lib/garage";
import { useToast } from "@/components/ui/Toast";
import { formatUKDate, formatUKDateFromLocalDate } from "@/lib/uk-date";

interface Appointment {
  id: string;
  type: "booking" | "job";
  number: string;
  customerName: string;
  vehicleInfo: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: string;
  staffName?: string;
  phone?: string;
  notes?: string;
}

// Status display labels (same as jobs page)
const statusLabels: Record<string, string> = {
  TODO: "TO DO",
  DOING: "WORKING",
  DONE: "COMPLETE",
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
};

export default function CalendarPage() {
  const { addToast } = useToast();
  const today = new Date(2026, 1, 15); // Today: Feb 15, 2026
  const [currentDate, setCurrentDate] = useState(today);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>("2026-02-15");

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const garageId = getGarageId();

  useEffect(() => {
    if (garageId) {
      fetchAppointments();
    }
  }, [garageId, currentDate]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

      const res = await fetch(
        `/api/garages/${garageId}/calendar?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      );

      if (!res.ok) throw new Error("Failed to fetch appointments");

      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      addToast("Failed to load appointments", "error");
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getAppointmentsForDate = (day: number) => {
    // Create YYYY-MM-DD string directly without timezone conversion
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const dateStr = `${year}-${month}-${dayStr}`;
    return appointments.filter((app) => app.date === dateStr);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
      CONFIRMED: "bg-blue-100 text-blue-800 border-blue-300",
      COMPLETED: "bg-emerald-100 text-emerald-800 border-emerald-300",
      CANCELLED: "bg-red-100 text-red-800 border-red-300",
      TODO: "bg-yellow-100 text-yellow-800 border-yellow-300",
      DOING: "bg-orange-100 text-orange-800 border-orange-300",
      DONE: "bg-emerald-100 text-emerald-800 border-emerald-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-300";
  };

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: "bg-yellow-500",
      CONFIRMED: "bg-blue-500",
      COMPLETED: "bg-emerald-600",
      CANCELLED: "bg-red-500",
      TODO: "bg-yellow-500",
      DOING: "bg-orange-500",
      DONE: "bg-emerald-600",
    };
    return colors[status] || "bg-gray-500";
  };

  const getServiceColor = (service: string) => {
    const colors: Record<string, string> = {
      MOT: "from-blue-400 to-blue-600",
      SERVICE: "from-green-400 to-green-600",
      REPAIR: "from-orange-400 to-orange-600",
      DIAGNOSTIC: "from-purple-400 to-purple-600",
      TYRES: "from-gray-400 to-gray-600",
      BRAKES: "from-red-400 to-red-600",
      WARRANTY: "from-pink-400 to-pink-600",
    };
    const key = service.split(" ")[0].toUpperCase();
    return colors[key] || "from-indigo-400 to-indigo-600";
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleStatusChange = async (appointmentId: string, newStatus: string) => {
    try {
      const appointment = appointments.find((a) => a.id === appointmentId);
      if (!appointment) return;

      const endpoint =
        appointment.type === "booking"
          ? `/api/garages/${garageId}/bookings/${appointmentId}`
          : `/api/garages/${garageId}/jobs/${appointmentId}`;

      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      setAppointments((prev) =>
        prev.map((a) => (a.id === appointmentId ? { ...a, status: newStatus } : a))
      );
      setSelectedAppointment((prev) => (prev ? { ...prev, status: newStatus } : null));
      addToast("Status updated successfully", "success");
    } catch (error) {
      console.error("Error updating status:", error);
      addToast("Failed to update status", "error");
    }
  };

  const handleConvertToJob = async (bookingId: string) => {
    try {
      const res = await fetch(
        `/api/garages/${garageId}/bookings/${bookingId}/convert-to-job`,
        { method: "POST" }
      );

      if (!res.ok) throw new Error("Failed to convert booking to job");

      const data = await res.json();
      
      // Update local state: remove booking, add job
      setAppointments((prev) => {
        const updatedBooking = prev.find((a) => a.id === bookingId);
        if (!updatedBooking) return prev;

        const newJob = {
          ...updatedBooking,
          type: "job" as const,
          status: "TODO",
        };

        return prev.map((a) => (a.id === bookingId ? newJob : a));
      });

      setSelectedAppointment((prev) => 
        prev ? { ...prev, type: "job" as const, status: "TODO" } : null
      );

      addToast("Booking converted to job successfully!", "success");
    } catch (error) {
      console.error("Error converting booking to job:", error);
      addToast("Failed to convert booking to job", "error");
    }
  };

  const handleUpdateJobStatus = async (jobId: string, newStatus: string) => {
    try {
      const res = await fetch(
        `/api/garages/${garageId}/jobs/${jobId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Failed to update job status");

      setAppointments((prev) =>
        prev.map((a) => (a.id === jobId ? { ...a, status: newStatus } : a))
      );
      setSelectedAppointment((prev) => (prev ? { ...prev, status: newStatus } : null));

      const statusText = newStatus === "DOING" ? "started" : newStatus === "DONE" ? "completed" : "updated";
      addToast(`Job ${statusText} successfully!`, "success");
    } catch (error) {
      console.error("Error updating job status:", error);
      addToast("Failed to update job status", "error");
    }
  };

  const handleCreateInvoice = async (jobId: string) => {
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to create invoice");
      }

      const invoice = await res.json();
      addToast("Invoice created successfully!", "success");
      
      // Redirect to invoice detail page
      setTimeout(() => {
        window.location.href = `/garage/invoices/${invoice.id}`;
      }, 500);
    } catch (error) {
      console.error("Error creating invoice:", error);
      addToast("Failed to create invoice", "error");
    }
  };

  const monthDays = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = formatUKDate(currentDate, { month: "long", year: "numeric" });

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= monthDays; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="p-3 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Appointments Calendar</h1>
        <p className="text-xs md:text-sm text-gray-600 mt-1">View and manage jobs and bookings</p>
      </div>

      {/* Calendar Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
        {/* Main Calendar */}
        <div className="lg:col-span-2">
          <Card>
            {/* Calendar Header */}
            <div className="p-3 md:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between gap-2 mb-3 md:mb-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">{monthName}</h2>
                <div className="flex gap-1 md:gap-2">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronLeft size={18} className="md:hidden" />
                    <ChevronLeft size={20} className="hidden md:block" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight size={18} className="md:hidden" />
                    <ChevronRight size={20} className="hidden md:block" />
                  </button>
                </div>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-0 text-center">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="py-2 text-sm font-semibold text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-3 md:p-6">
              <div className="grid grid-cols-7 gap-1 md:gap-2">
                {calendarDays.map((day, index) => {
                  // Create YYYY-MM-DD string directly without timezone conversion
                  const dateStr =
                    day !== null
                      ? (() => {
                          const year = currentDate.getFullYear();
                          const month = String(currentDate.getMonth() + 1).padStart(2, "0");
                          const dayStr = String(day).padStart(2, "0");
                          return `${year}-${month}-${dayStr}`;
                        })()
                      : null;
                  const dayAppointments = day ? getAppointmentsForDate(day) : [];
                  const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (dateStr) setSelectedDate(dateStr);
                      }}
                      className={`min-h-16 md:min-h-24 p-1 md:p-2 rounded-lg border-2 cursor-pointer transition-colors ${
                        day === null
                          ? "bg-gray-50 border-transparent"
                          : selectedDate === dateStr
                            ? "border-blue-500 bg-blue-50"
                            : isToday
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {day !== null && (
                        <div>
                          <div className={`text-xs md:text-sm font-semibold mb-0.5 MD:mb-1 ${isToday ? "text-green-700" : "text-gray-900"}`}>
                            {day}
                          </div>
                          <div className="space-y-0.5 md:space-y-1">
                            {dayAppointments.slice(0, 1).map((app) => (
                              <div
                                key={app.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedAppointment(app);
                                }}
                                className={`text-xs p-0.5 rounded bg-linear-to-r ${getServiceColor(
                                  app.service
                                )} text-white truncate cursor-pointer hover:shadow-md transition-shadow`}
                                title={app.customerName}
                              >
                                <span className="hidden md:inline">{app.customerName.split(" ")[0]}</span>
                                <span className="md:hidden">•</span>
                              </div>
                            ))}
                            {dayAppointments.length > 1 && (
                              <div className="text-xs text-gray-600 px-1">
                                +{dayAppointments.length - 1}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar - Selected Date Details */}
        <div className="lg:col-span-1">
          {selectedDate ? (
            <Card>
              <div className="p-3 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
                  {(() => {
                    // Parse YYYY-MM-DD string as UTC date to avoid timezone shifts
                    const [year, month, day] = selectedDate.split("-").map(Number);
                    const dateObj = new Date(Date.UTC(year, month - 1, day, 12, 0, 0)); // noon UTC
                    return formatUKDate(dateObj, {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    });
                  })()}
                </h3>

                <div className="space-y-2 md:space-y-3">
                  {getAppointmentsForDate(parseInt(selectedDate.split("-")[2])).length > 0 ? (
                    getAppointmentsForDate(parseInt(selectedDate.split("-")[2])).map((app) => (
                      <div
                        key={app.id}
                        onClick={() => setSelectedAppointment(app)}
                        className={`p-2 md:p-3 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md bg-linear-to-r ${getServiceColor(
                          app.service
                        )} text-white`}
                      >
                        <div className="font-semibold text-xs md:text-sm">{app.customerName}</div>
                        <div className="text-xs opacity-90 mt-0.5">{app.vehicleInfo}</div>
                        <div className="text-xs opacity-90 mt-0.5">{app.time}</div>
                        <div className="mt-1 text-xs">{app.status}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 md:py-6 text-gray-500">
                      <Calendar size={24} className="md:size-32 mx-auto mb-2 opacity-50" />
                      <p className="text-xs md:text-sm">No appointments scheduled</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="p-3 md:p-6 text-center text-gray-500">
                <Calendar size={24} className="md:size-32 mx-auto mb-2 opacity-50" />
                <p className="text-xs md:text-sm">Select a date to view appointments</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <>
          <div 
            className="fixed inset-0 z-40 backdrop-blur-md"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            onClick={() => setSelectedAppointment(null)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-3 md:p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header - Type Badge & Title & Close */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 md:p-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Badge variant={selectedAppointment.type === "booking" ? "blue" : "gray"}>
                  {selectedAppointment.type === "booking" ? "Booking" : "Job"}
                </Badge>
                <div>
                  <p className="text-xs text-gray-600">Ref Number</p>
                  <p className="text-sm md:text-base font-bold text-gray-900">{selectedAppointment.number}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl ml-auto shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Main Content */}
            <div className="p-4 md:p-5">
              {/* Action Buttons - Prominent at top */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex gap-2 flex-wrap items-center">
                  {/* BOOKING: Convert to Job */}
                  {selectedAppointment.type === "booking" && selectedAppointment.status === "CONFIRMED" && (
                    <button
                      onClick={() => handleConvertToJob(selectedAppointment.id)}
                      className="px-4 py-2 rounded text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors flex-1"
                    >
                      Convert to Job
                    </button>
                  )}

                  {/* JOB: Start Job */}
                  {selectedAppointment.type === "job" && selectedAppointment.status === "TODO" && (
                    <button
                      onClick={() => handleUpdateJobStatus(selectedAppointment.id, "DOING")}
                      className="px-4 py-2 rounded text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors flex-1"
                    >
                      ▶ Start Job
                    </button>
                  )}

                  {/* JOB: Mark Complete */}
                  {selectedAppointment.type === "job" && selectedAppointment.status === "DOING" && (
                    <button
                      onClick={() => handleUpdateJobStatus(selectedAppointment.id, "DONE")}
                      className="px-4 py-2 rounded text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors flex-1"
                    >
                      ✓ Mark Complete
                    </button>
                  )}

                  {/* JOB: Create Invoice */}
                  {selectedAppointment.type === "job" && selectedAppointment.status === "DONE" && (
                    <button
                      onClick={() => handleCreateInvoice(selectedAppointment.id)}
                      className="px-4 py-2 rounded text-sm font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-colors flex-1"
                    >
                      → Create Invoice
                    </button>
                  )}
                </div>

                {/* Status Badge */}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded text-xs font-semibold text-white ${getStatusBadgeColor(selectedAppointment.status)}`}>
                    {statusLabels[selectedAppointment.status] || selectedAppointment.status}
                  </span>
                </div>
              </div>

              {/* Two Column Layout - Customer & Vehicle */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Customer */}
                <div className="flex gap-2">
                  <User size={18} className="text-gray-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-600">Customer</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">{selectedAppointment.customerName}</p>
                    {selectedAppointment.phone && (
                      <p className="text-xs text-gray-600 truncate">{selectedAppointment.phone}</p>
                    )}
                  </div>
                </div>

                {/* Vehicle */}
                <div className="flex gap-2">
                  <Car size={18} className="text-gray-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-600">Vehicle</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">{selectedAppointment.vehicleInfo}</p>
                  </div>
                </div>
              </div>

              {/* Grid Layout - Service, Date/Time, Staff */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pb-4 border-b border-gray-200">
                {/* Service */}
                <div>
                  <p className="text-xs text-gray-600 mb-1">Service</p>
                  <p className="text-sm font-semibold text-gray-900">{selectedAppointment.service}</p>
                </div>

                {/* Date & Time */}
                <div className="flex gap-2">
                  <Clock size={18} className="text-gray-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-600">Date & Time</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatUKDate(new Date(selectedAppointment.date + "T" + selectedAppointment.time), {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at {selectedAppointment.time}
                    </p>
                    <p className="text-xs text-gray-600">{selectedAppointment.duration} mins</p>
                  </div>
                </div>

                {/* Staff Assignment */}
                {selectedAppointment.staffName && (
                  <div className="flex gap-2">
                    <Wrench size={18} className="text-gray-400 shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-600">Assigned To</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedAppointment.staffName}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes */}
              {selectedAppointment.notes && (
                <div>
                  <p className="text-xs text-gray-600 mb-2">Notes</p>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded border border-gray-200">
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}
            </div>
          </Card>
          </div>
        </>
      )}
    </div>
  );
}
