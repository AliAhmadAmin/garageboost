"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Clock } from "lucide-react";
import { WeekHours, parseOpeningHours, formatOpeningHours } from "@/lib/garage-settings";

interface Garage {
  id: string;
  openingHours?: string | null;
}

export default function OpeningHoursSettings() {
  const [garage, setGarage] = useState<Garage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [openingHours, setOpeningHours] = useState<WeekHours>({
    monday: { open: "09:00", close: "17:00", closed: false },
    tuesday: { open: "09:00", close: "17:00", closed: false },
    wednesday: { open: "09:00", close: "17:00", closed: false },
    thursday: { open: "09:00", close: "17:00", closed: false },
    friday: { open: "09:00", close: "17:00", closed: false },
    saturday: { open: "09:00", close: "14:00", closed: false },
    sunday: { open: "09:00", close: "17:00", closed: true },
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const cached = localStorage.getItem("garage-data");
        if (cached) {
          const current = JSON.parse(cached);
          setGarage(current);
          setOpeningHours(parseOpeningHours(current.openingHours));
        } else {
          const res = await fetch("/api/garages");
          const data = await res.json();
          if (data[0]) {
            setGarage(data[0]);
            setOpeningHours(parseOpeningHours(data[0].openingHours));
          }
        }
      } catch (error) {
        console.error("Error loading garage:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSave = async () => {
    if (!garage) return;
    setSaving(true);
    setSaveMessage(null);
    try {
      const updateData = {
        openingHours: formatOpeningHours(openingHours),
      };

      const response = await fetch(`/api/garages/${garage.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save settings");
      }

      setGarage(data);
      localStorage.setItem("garage-data", JSON.stringify(data));
      setSaveMessage("✓ Saved successfully.");
      
      setTimeout(() => {
        setSaveMessage(null);
      }, 3000);
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Opening Hours</h2>
        <p className="text-slate-500 mt-1">Set your business hours for each day of the week</p>
      </div>

      <Card className="p-8">
        <div className="mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Clock className="text-violet-600" size={24} />
            Weekly Schedule
          </h3>
        </div>

        <div className="space-y-4">
          {Object.entries(openingHours).map(([day, hours]) => (
            <div key={day} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-2 border-slate-200 rounded-lg hover:border-violet-500 transition-colors">
              <div className="w-32">
                <span className="font-bold text-slate-900 capitalize">{day}</span>
              </div>
              
              {hours.closed ? (
                <div className="flex-1">
                  <span className="text-slate-500 font-medium">Closed</span>
                </div>
              ) : (
                <div className="flex-1 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-slate-600">Open</label>
                    <input
                      type="time"
                      value={hours.open}
                      onChange={(e) => setOpeningHours({
                        ...openingHours,
                        [day]: { ...hours, open: e.target.value }
                      })}
                      className="border-2 border-slate-200 focus:border-violet-500 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                    />
                  </div>
                  <span className="text-slate-400">-</span>
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-semibold text-slate-600">Close</label>
                    <input
                      type="time"
                      value={hours.close}
                      onChange={(e) => setOpeningHours({
                        ...openingHours,
                        [day]: { ...hours, close: e.target.value }
                      })}
                      className="border-2 border-slate-200 focus:border-violet-500 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                    />
                  </div>
                </div>
              )}
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hours.closed}
                  onChange={(e) => setOpeningHours({
                    ...openingHours,
                    [day]: { ...hours, closed: e.target.checked }
                  })}
                  className="w-5 h-5 text-violet-600 rounded border-slate-300 focus:ring-violet-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-700">Closed</span>
              </label>
            </div>
          ))}
          
          {/* Quick Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t-2 border-slate-200">
            <button
              type="button"
              onClick={() => {
                const weekdayHours = { open: "09:00", close: "17:00", closed: false };
                setOpeningHours({
                  monday: weekdayHours,
                  tuesday: weekdayHours,
                  wednesday: weekdayHours,
                  thursday: weekdayHours,
                  friday: weekdayHours,
                  saturday: { open: "09:00", close: "14:00", closed: false },
                  sunday: { open: "09:00", close: "17:00", closed: true },
                });
              }}
              className="px-4 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-lg font-semibold text-sm transition-colors"
            >
              🕒 Standard Hours (9-5 Mon-Fri)
            </button>
            <button
              type="button"
              onClick={() => {
                const samehours = openingHours.monday;
                setOpeningHours({
                  monday: samehours,
                  tuesday: samehours,
                  wednesday: samehours,
                  thursday: samehours,
                  friday: samehours,
                  saturday: samehours,
                  sunday: samehours,
                });
              }}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-sm transition-colors"
            >
              🔄 Copy Monday to All Days
            </button>
          </div>
        </div>
      </Card>

      {saveMessage && (
        <div className={`rounded-lg px-4 py-3 text-sm font-medium ${
          saveMessage.includes("✓") ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {saveMessage}
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
