"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { formatUKDate, formatUKDateFromLocalDate } from "@/lib/uk-date";

interface StaffAvailable {
  date: string;
  staff: string[];
}

interface StaffAvailabilityCalendarProps {
  garageId: string;
  startDate?: Date;
  month?: number;
  year?: number;
}

export function StaffAvailabilityCalendar({
  garageId,
  startDate = new Date(),
  month = startDate.getMonth(),
  year = startDate.getFullYear(),
}: StaffAvailabilityCalendarProps) {
  const [availability, setAvailability] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedDayStaff, setSelectedDayStaff] = useState<string[]>([]);

  const currentDate = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = currentDate.getDay();

  // Fetch availability for the month
  useEffect(() => {
    fetchMonthAvailability();
  }, [month, year]);

  const fetchMonthAvailability = async () => {
    try {
      setLoading(true);
      const startOfMonth = new Date(year, month, 1).toISOString().split("T")[0];
      const endOfMonth = new Date(year, month + 1, 0).toISOString().split("T")[0];

      const res = await fetch("/api/availability/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          garageId,
          startDate: startOfMonth,
          endDate: endOfMonth,
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch availability");

      const data = await res.json();
      setAvailability(data.availability || {});
    } catch (error) {
      console.error("Error fetching availability:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDateClick = (day: number) => {
    const dateStr = new Date(year, month, day).toISOString().split("T")[0];
    setSelectedDate(dateStr);
    setSelectedDayStaff(availability[dateStr] || []);
  };

  const getDayStaffCount = (day: number) => {
    const dateStr = new Date(year, month, day).toISOString().split("T")[0];
    return availability[dateStr]?.length || 0;
  };

  // Generate calendar grid
  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const monthName = formatUKDate(currentDate, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
          <Users size={18} className="md:size-20" />
          Staff Availability Overview
        </h3>

        <Card>
          <div className="p-3 md:p-6">
            <h4 className="text-sm md:text-base font-semibold text-gray-900 mb-3 md:mb-4">
              {monthName}
            </h4>

            {loading ? (
              <div className="text-center py-6 md:py-8 text-gray-500">
                <Calendar size={24} className="md:size-32 mx-auto mb-2 opacity-50" />
                <p className="text-xs md:text-sm">Loading availability...</p>
              </div>
            ) : (
              <div className="space-y-3 md:space-y-4">
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-semibold text-gray-600 py-2"
                    >
                      <span className="hidden md:inline">{day}</span>
                      <span className="md:hidden">{day[0]}</span>
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1 md:gap-2">
                  {calendarDays.map((day, index) => {
                    const staffCount = day ? getDayStaffCount(day) : 0;
                    const dateStr =
                      day !== null
                        ? new Date(year, month, day).toISOString().split("T")[0]
                        : null;
                    const isSelected = dateStr === selectedDate;
                    const isToday =
                      new Date().toDateString() ===
                      new Date(year, month, day || 1).toDateString();

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          if (day) handleDateClick(day);
                        }}
                        className={`aspect-square rounded-lg p-1 md:p-2 cursor-pointer transition-colors border-2 flex flex-col items-center justify-center text-xs font-semibold ${
                          day === null
                            ? "bg-gray-50 border-transparent"
                            : isSelected
                              ? "border-blue-500 bg-blue-50"
                              : isToday
                                ? "border-green-500 bg-green-50"
                                : "border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {day && (
                          <>
                            <span className="text-xs md:text-sm text-gray-900">{day}</span>
                            {staffCount > 0 && (
                              <span
                                className={`text-xs mt-0.5 md:mt-1 px-1 py-0.5 rounded-full font-bold ${
                                  staffCount <= 2
                                    ? "bg-red-100 text-red-700"
                                    : staffCount <= 4
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-green-100 text-green-700"
                                }`}
                              >
                                {staffCount}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Selected date details */}
      {selectedDate && (
        <Card>
          <div className="p-3 md:p-6">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <Clock size={16} className="md:size-18" />
              <h4 className="font-semibold text-sm md:text-base text-gray-900">
                {formatUKDateFromLocalDate(selectedDate, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </h4>
            </div>

            {selectedDayStaff.length > 0 ? (
              <div className="space-y-2 md:space-y-3">
                <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                  {selectedDayStaff.length} staff available
                </p>
                <div className="space-y-1 md:space-y-2">
                  {selectedDayStaff.map((staffName, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 md:p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-600 shrink-0"></div>
                      <span className="text-xs md:text-sm font-medium text-gray-900 truncate">
                        {staffName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-4 md:py-6">
                <Calendar size={20} className="md:size-24 mx-auto mb-2 text-gray-400" />
                <p className="text-xs md:text-sm text-gray-600">
                  No staff available on this date
                </p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
