"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Bell, Mail, Calendar } from "lucide-react";

type NotificationSettings = {
  emailNotifications: boolean;
  weeklyReports: boolean;
  reminderSent: boolean;
  jobUpdates: boolean;
  bookingRequests: boolean;
};

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  emailNotifications: true,
  weeklyReports: true,
  reminderSent: true,
  jobUpdates: true,
  bookingRequests: true,
};

export default function NotificationsSettings() {
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [garageId, setGarageId] = useState<string | null>(null);

  const [notifications, setNotifications] = useState<NotificationSettings>(DEFAULT_NOTIFICATIONS);
  const [initialNotifications, setInitialNotifications] = useState<NotificationSettings>(DEFAULT_NOTIFICATIONS);

  useEffect(() => {
    const resolveGarageId = async () => {
      const currentGarageId = localStorage.getItem("currentGarageId");
      if (currentGarageId) {
        return currentGarageId;
      }

      const meResponse = await fetch("/api/garages/me", { cache: "no-store", credentials: "include" });
      if (meResponse.status === 401) {
        throw new Error("You are not signed in. Please sign in and try again.");
      }
      if (meResponse.status === 403) {
        throw new Error("You do not have access to this garage. Please contact an admin.");
      }
      if (!meResponse.ok) {
        throw new Error("Unable to load garage details");
      }

      const meGarage = await meResponse.json();
      if (!meGarage?.id) {
        throw new Error("Garage ID not found");
      }

      localStorage.setItem("currentGarageId", meGarage.id);
      return meGarage.id as string;
    };

    const load = async () => {
      try {
        const resolvedGarageId = await resolveGarageId();
        setGarageId(resolvedGarageId);

        const response = await fetch(`/api/reminder-config?garageId=${resolvedGarageId}`, {
          cache: "no-store",
          credentials: "include",
        });
        if (response.status === 403) {
          setSaveMessage("You do not have permission to view notification preferences. Please contact an admin.");
          return;
        }

        if (response.status === 404) {
          setSaveMessage("Notification settings are not available yet for this garage. Please try again later.");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load notification settings");
        }

        const data = await response.json();
        const loaded: NotificationSettings = {
          emailNotifications: data.emailNotifications !== false,
          weeklyReports: data.weeklyReports !== false,
          reminderSent: data.reminderSent !== false,
          jobUpdates: data.jobUpdates !== false,
          bookingRequests: data.bookingRequests !== false,
        };

        setNotifications(loaded);
        setInitialNotifications(loaded);
      } catch (error) {
        console.error("Failed to load notification settings", error);
        if (error instanceof Error) {
          setSaveMessage(error.message || "Failed to load notification settings.");
        } else {
          setSaveMessage("Failed to load notification settings.");
        }
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const hasUnsavedChanges = JSON.stringify(notifications) !== JSON.stringify(initialNotifications);

  const handleDiscard = () => {
    setNotifications(initialNotifications);
    setSaveMessage(null);
  };

  const handleSave = async () => {
    if (!garageId) {
      setSaveMessage("Garage not found. Please refresh and try again.");
      return;
    }

    setSaving(true);
    setSaveMessage(null);

    try {
      const response = await fetch("/api/reminder-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          garageId,
          emailNotifications: notifications.emailNotifications,
          weeklyReports: notifications.weeklyReports,
          reminderSent: notifications.reminderSent,
          jobUpdates: notifications.jobUpdates,
          bookingRequests: notifications.bookingRequests,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save settings");
      }

      setSaveMessage("✓ Notification preferences saved.");
      setInitialNotifications(notifications);
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error("Failed to save notification settings", error);
      setSaveMessage("Failed to save notification preferences.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 pb-24">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Notification Preferences</h2>
          <p className="text-slate-500 mt-1">Loading your preferences...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Notification Preferences</h2>
        <p className="text-slate-500 mt-1">Choose how you want to be notified</p>
      </div>

      <Card className="p-4 lg:p-8">
        <h3 className="text-xl font-bold mb-6">Communication Channels</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={notifications.emailNotifications}
              onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <Mail className="text-blue-600" size={20} />
            <div className="flex-1">
              <p className="font-semibold text-slate-900">Email Notifications</p>
              <p className="text-sm text-slate-500">Receive email updates on important events</p>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={notifications.weeklyReports}
              onChange={(e) => setNotifications({ ...notifications, weeklyReports: e.target.checked })}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <Calendar className="text-purple-600" size={20} />
            <div className="flex-1">
              <p className="font-semibold text-slate-900">Weekly Reports</p>
              <p className="text-sm text-slate-500">Receive weekly revenue and activity reports</p>
            </div>
          </label>
        </div>
      </Card>

      <Card className="p-4 lg:p-8">
        <h3 className="text-xl font-bold mb-6">Activity Notifications</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={notifications.reminderSent}
              onChange={(e) => setNotifications({ ...notifications, reminderSent: e.target.checked })}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <Bell className="text-amber-600" size={20} />
            <div className="flex-1">
              <p className="font-semibold text-slate-900">Reminder Sent</p>
              <p className="text-sm text-slate-500">Get notified when automatic reminders are sent to customers</p>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={notifications.jobUpdates}
              onChange={(e) => setNotifications({ ...notifications, jobUpdates: e.target.checked })}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <Bell className="text-blue-600" size={20} />
            <div className="flex-1">
              <p className="font-semibold text-slate-900">Job Updates</p>
              <p className="text-sm text-slate-500">Notifications when job status changes</p>
            </div>
          </label>
          
          <label className="flex items-center gap-3 p-4 border-2 border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
            <input
              type="checkbox"
              checked={notifications.bookingRequests}
              onChange={(e) => setNotifications({ ...notifications, bookingRequests: e.target.checked })}
              className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <Bell className="text-emerald-600" size={20} />
            <div className="flex-1">
              <p className="font-semibold text-slate-900">Booking Requests</p>
              <p className="text-sm text-slate-500">Alerts for new online booking requests</p>
            </div>
          </label>
        </div>
      </Card>

      {saveMessage && (
        <div className={`rounded-lg px-4 py-3 text-sm font-medium ${
          saveMessage.includes("✓") ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {saveMessage}
        </div>
      )}

      {hasUnsavedChanges && (
        <div className="fixed left-0 right-0 bottom-16 lg:bottom-0 lg:left-64 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-6">
            <p className="text-sm font-medium text-slate-700">You have unsaved changes</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDiscard}
                disabled={saving}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 disabled:opacity-60"
              >
                Discard
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
              >
                {saving ? "Saving..." : "Save Preferences"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
