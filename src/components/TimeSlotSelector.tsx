"use client";

import { useEffect, useState } from "react";
import { Clock, AlertCircle, User } from "lucide-react";
import { formatUKDateFromLocalDate } from "@/lib/uk-date";

interface TimeSlotSelectorProps {
  garageId: string;
  serviceId: string;
  date: string;
  durationMinutes?: number;
  staffId?: string;
  onTimeSelect: (time: string, availableStaff?: any[]) => void;
  onStaffSelect?: (staffId: string | null) => void;
  selectedTime?: string;
  selectedStaffId?: string | null;
}

export function TimeSlotSelector({
  garageId,
  serviceId,
  date,
  durationMinutes = 60,
  staffId,
  onTimeSelect,
  onStaffSelect,
  selectedTime,
  selectedStaffId,
}: TimeSlotSelectorProps) {
  const [slots, setSlots] = useState<string[]>([]);
  const [availableStaff, setAvailableStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!date || !serviceId) return;

    fetchAvailableSlots();
  }, [date, serviceId, durationMinutes, staffId]);

  const fetchAvailableSlots = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("/api/availability/slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          garageId,
          date,
          staffId: staffId || null,
          durationMinutes,
          serviceId,
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch available slots");

      const data = await res.json();
      setSlots(data.slots || []);
      setAvailableStaff(data.availableStaff || []);
    } catch (err) {
      console.error("Error fetching slots:", err);
      setError("Could not load available time slots");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Date Display */}
      <div>
        <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
          Selected Date
        </label>
        <div className="px-3 md:px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="font-medium text-xs md:text-sm text-gray-900">
            {formatUKDateFromLocalDate(date, {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Staff Selection (if not pre-assigned) */}
      {!staffId && availableStaff.length > 0 && (
        <div>
          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
            Preferred Staff (Optional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                onStaffSelect?.(null);
                fetchAvailableSlots();
              }}
              className={`p-2 md:p-3 rounded-lg border-2 transition-colors flex items-center gap-2 ${
                selectedStaffId === null
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <User size={14} className="md:size-16" />
              <span className="text-xs md:text-sm font-medium">Any</span>
            </button>

            {availableStaff.map((staff) => (
              <button
                key={staff.id}
                onClick={() => {
                  onStaffSelect?.(staff.id);
                }}
                className={`p-2 md:p-3 rounded-lg border-2 transition-colors flex items-center gap-2 ${
                  selectedStaffId === staff.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <User size={14} className="md:size-16" />
                <span className="text-xs md:text-sm font-medium truncate">{staff.name.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Time Slots */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs md:text-sm font-medium text-gray-700">
            Available Times
          </label>
          {loading && <span className="text-xs text-gray-500">Loading...</span>}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 text-xs text-red-700 mb-3">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {slots.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => onTimeSelect(slot, availableStaff)}
                disabled={loading}
                className={`p-2 rounded-lg border-2 font-medium text-xs transition-colors ${
                  selectedTime === slot
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-200 hover:border-gray-300 bg-white text-gray-900"
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        ) : (
          <div className="p-3 md:p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
            <Clock size={18} className="md:size-20 mx-auto mb-2 text-gray-400" />
            <p className="text-xs md:text-sm text-gray-600">
              {loading ? "Loading available times..." : "No available slots for this date"}
            </p>
            {!loading && (
              <p className="text-xs text-gray-500 mt-1">
                Try selecting a different date
              </p>
            )}
          </div>
        )}
      </div>

      {/* Duration Info */}
      <div className="p-2 md:p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs md:text-sm text-blue-700">
        <p className="font-medium">Appointment duration: {durationMinutes} minutes</p>
      </div>
    </div>
  );
}
