"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { AlertTriangle, Database, Trash2 } from "lucide-react";

export default function AdvancedSettings() {
  const [cleaning, setCleaning] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleCleanup = async () => {
    const garageData = localStorage.getItem("garage-data");
    if (!garageData) {
      setSaveMessage("No garage data found.");
      return;
    }

    const garage = JSON.parse(garageData);
    
    if (!confirm("Run database cleanup?\n\nThis will remove orphaned advisories and reminders that may be causing incorrect dashboard metrics.\n\nThis is safe and cannot break anything.")) {
      return;
    }

    try {
      setCleaning(true);
      setSaveMessage(null);
      const response = await fetch(`/api/garages/${garage.id}/cleanup`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Cleanup failed");
      }

      const result = await response.json();
      setSaveMessage(`✅ Cleanup complete! Removed ${result.deletedAdvisories} orphaned advisories and ${result.deletedReminders} orphaned reminders. Dashboard metrics should now be accurate.`);
    } catch (error) {
      setSaveMessage("Cleanup failed. Please try again or contact support.");
      console.error("Cleanup error:", error);
    } finally {
      setCleaning(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Advanced Settings</h2>
        <p className="text-slate-500 mt-1">Database maintenance and advanced configuration</p>
      </div>

      <Card className="p-4 lg:p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-100 rounded-lg">
            <AlertTriangle className="text-amber-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Danger Zone</h3>
            <p className="text-sm text-slate-600 mb-4">
              These actions are irreversible. Please proceed with caution.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-4 lg:p-8">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Database className="text-blue-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold">Database Maintenance</h3>
            <p className="text-sm text-slate-600 mt-1">
              Clean up orphaned data to ensure accurate reporting
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Trash2 className="text-blue-600 mt-1" size={20} />
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900 mb-2">Clean Up Orphaned Data</h4>
              <p className="text-sm text-blue-700 mb-4">
                If your dashboard shows incorrect metrics (like vehicle counts or revenue potential that don't match reality), 
                this cleanup will remove orphaned advisories and reminders from deleted vehicles.
              </p>
              <button
                onClick={handleCleanup}
                disabled={cleaning}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
              >
                {cleaning ? "Cleaning..." : "Run Cleanup"}
              </button>
            </div>
          </div>
        </div>

        {saveMessage && (
          <div className={`mt-6 rounded-lg px-4 py-3 text-sm font-medium ${
            saveMessage.includes("✅") ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {saveMessage}
          </div>
        )}
      </Card>

      <Card className="p-4 lg:p-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-slate-100 rounded-lg">
            <Database className="text-slate-600" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">Data Export</h3>
            <p className="text-sm text-slate-600 mb-4">
              Export your garage data for backup or migration purposes
            </p>
            <button
              className="bg-slate-600 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
              onClick={() => {
                setSaveMessage("Export feature coming soon.");
                setTimeout(() => setSaveMessage(null), 3000);
              }}
            >
              Export Data
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
