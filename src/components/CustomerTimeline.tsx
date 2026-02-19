"use client";

import { useMemo, type ReactNode } from "react";
import {
  Search,
  AlertTriangle,
  FileText,
  Mail,
  Wrench,
  DollarSign,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { vehicleTitle } from "@/lib/vehicle";
import { formatUKDate } from "@/lib/uk-date";

type TimelineEvent = {
  id: string;
  type: "lookup" | "healthcheck" | "quote" | "reminder" | "job" | "payment";
  title: string;
  description: string;
  amount?: number;
  status?: string;
  timestamp: Date;
  icon: ReactNode;
  color: string;
};

type Vehicle = {
  id: string;
  registration: string;
  make: string;
  model: string;
  createdAt: string;
  healthChecks: Array<{
    id: string;
    createdAt: string;
    advisories: Array<{
      id: string;
      description: string;
      estPricePence: number;
    }>;
  }>;
  quotes: Array<{
    id: string;
    createdAt: string;
    totalPence: number;
    status: string;
  }>;
  reminders: Array<{
    id: string;
    createdAt: string;
    type: string;
    status: string;
  }>;
  jobs: Array<{
    id: string;
    createdAt: string;
    title: string;
    status: string;
    totalPence?: number;
  }>;
};

type Customer = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  vehicles: Vehicle[];
};

interface CustomerTimelineProps {
  customer: Customer;
  showHeader?: boolean;
  className?: string;
}

export function CustomerTimeline({
  customer,
  showHeader = true,
  className,
}: CustomerTimelineProps) {
  const events: TimelineEvent[] = useMemo(() => {
    const allEvents: TimelineEvent[] = [];

    customer.vehicles.forEach((vehicle) => {
      // DVLA lookup (vehicle creation)
      allEvents.push({
        id: `lookup-${vehicle.id}`,
        type: "lookup",
        title: "Vehicle Added",
        description: `${vehicle.registration} - ${vehicleTitle(vehicle)}`,
        timestamp: new Date(vehicle.createdAt),
        icon: <Search size={16} />,
        color: "bg-blue-50 text-blue-600",
      });

      // Health checks (inspections)
      vehicle.healthChecks.forEach((check) => {
        const advisoryCount = check.advisories.length;
        const totalValue = check.advisories.reduce((sum, a) => sum + a.estPricePence, 0);

        allEvents.push({
          id: `healthcheck-${check.id}`,
          type: "healthcheck",
          title: "Inspection Completed",
          description: `${advisoryCount} advisory${advisoryCount !== 1 ? "s" : ""} identified${
            totalValue > 0 ? ` - £${(totalValue / 100).toFixed(2)} potential` : ""
          }`,
          amount: totalValue,
          timestamp: new Date(check.createdAt),
          icon: <AlertTriangle size={16} />,
          color: advisoryCount > 0 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600",
        });
      });

      // Quotes
      vehicle.quotes.forEach((quote) => {
        allEvents.push({
          id: `quote-${quote.id}`,
          type: "quote",
          title: "Quote Created",
          description: `£${(quote.totalPence / 100).toFixed(2)} - ${quote.status}`,
          amount: quote.totalPence,
          status: quote.status,
          timestamp: new Date(quote.createdAt),
          icon: <FileText size={16} />,
          color:
            quote.status === "ACCEPTED"
              ? "bg-emerald-50 text-emerald-600"
              : quote.status === "REJECTED"
                ? "bg-slate-50 text-slate-500"
                : "bg-purple-50 text-purple-600",
        });
      });

      // Reminders
      vehicle.reminders.forEach((reminder) => {
        allEvents.push({
          id: `reminder-${reminder.id}`,
          type: "reminder",
          title: `${reminder.type} Reminder`,
          description: reminder.status === "SENT" ? "Sent successfully" : "Scheduled",
          status: reminder.status,
          timestamp: new Date(reminder.createdAt),
          icon: <Mail size={16} />,
          color: reminder.status === "SENT" ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-500",
        });
      });

      // Jobs
      vehicle.jobs.forEach((job) => {
        allEvents.push({
          id: `job-${job.id}`,
          type: "job",
          title: job.title,
          description:
            job.status === "COMPLETED" || job.status === "PAID"
              ? `Completed${job.totalPence ? ` - £${(job.totalPence / 100).toFixed(2)}` : ""}`
              : `Status: ${job.status}`,
          amount: job.totalPence || undefined,
          status: job.status,
          timestamp: new Date(job.createdAt),
          icon: <Wrench size={16} />,
          color:
            job.status === "COMPLETED" || job.status === "PAID"
              ? "bg-emerald-50 text-emerald-600"
              : job.status === "IN_PROGRESS"
                ? "bg-blue-50 text-blue-600"
                : "bg-slate-50 text-slate-500",
        });
      });
    });

    // Sort chronologically (newest first)
    return allEvents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }, [customer]);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return formatUKDate(date, { day: "numeric", month: "short", year: "numeric" });
  };

  const getEventIcon = (event: TimelineEvent) => {
    if (event.type === "job" && (event.status === "COMPLETED" || event.status === "PAID")) {
      return <CheckCircle2 size={16} />;
    }
    return event.icon;
  };

  return (
    <Card className={`p-6 ${className || ""}`.trim()}>
      {showHeader && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Customer Timeline</h3>
          <p className="text-sm text-slate-500 mt-1">
            Complete history of interactions with {customer.name}
          </p>
        </div>
      )}

      {events.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="mx-auto mb-3 text-slate-300" size={48} />
          <p className="text-slate-500">No activity recorded yet</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-3 bottom-3 w-px bg-slate-200"></div>

          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={event.id} className="relative flex gap-4">
                {/* Icon */}
                <div
                  className={`shrink-0 w-12 h-12 rounded-full ${event.color} flex items-center justify-center relative z-10`}
                >
                  {getEventIcon(event)}
                </div>

                {/* Content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900">{event.title}</p>
                      <p className="text-sm text-slate-600 mt-0.5">{event.description}</p>
                    </div>
                    <span className="text-xs text-slate-500 whitespace-nowrap">
                      {formatDate(event.timestamp)}
                    </span>
                  </div>

                  {event.amount !== undefined && event.amount > 0 && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-1 bg-slate-50 rounded text-xs font-medium text-slate-700">
                      <DollarSign size={12} />
                      £{(event.amount / 100).toFixed(2)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Vehicles</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{customer.vehicles.length}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Inspections</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {customer.vehicles.reduce((sum, v) => sum + v.healthChecks.length, 0)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Quotes</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {customer.vehicles.reduce((sum, v) => sum + v.quotes.length, 0)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Jobs</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {customer.vehicles.reduce((sum, v) => sum + v.jobs.length, 0)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
