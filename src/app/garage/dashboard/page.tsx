"use client";

import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/ui/Toast";
import { vehicleTitle } from "@/lib/vehicle";
import { formatUKDate } from "@/lib/uk-date";
import {
  AlertTriangle,
  Bolt,
  Calendar,
  CheckCircle2,
  Coins,
  Hammer,
  Search,
  Send,
  TrendingUp,
  BarChart3,
  Package,
  Users,
  MessageCircle,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

interface Vehicle {
  id: string;
  vrm: string;
  make: string;
  model: string;
  motExpiry: string;
  ownerName: string;
  advisories: Array<{ estPricePence: number }>;
}

interface Analytics {
  totalVehicles: number;
  expiringSoon: number;
  totalRevenuePotential: number;
  conversionRate: number;
  remindersSent?: number;
  remindersPending?: number;
  missedRevenue?: number;
  convertedJobs?: number;
  upcomingTax?: number;
}

interface Garage {
  id: string;
  name: string;
  status: string;
  plan: string;
  trialEndsAt?: string | Date | null;
  address?: string | null;
  phone?: string | null;
  website?: string | null;
  description?: string | null;
}

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString().slice(0, 10);
};

export default function DashboardPage() {
  const { addToast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [garage, setGarage] = useState<Garage | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);
  const [isCleaning, setIsCleaning] = useState(false);
  const [inventory, setInventory] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [isSendingBatch, setIsSendingBatch] = useState(false);
  const [monthlyGoalAmount, setMonthlyGoalAmount] = useState<number>(10000 * 100); // in pence
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInputValue, setGoalInputValue] = useState<string>((10000).toString());
  const missingProfileFields = useMemo(() => {
    if (!garage) return [] as string[];
    const missing: string[] = [];
    if (!garage.address) missing.push("Address");
    if (!garage.phone) missing.push("Phone");
    if (!garage.website) missing.push("Website");
    if (!garage.description) missing.push("Description");
    return missing;
  }, [garage]);

  useEffect(() => {
    const loadData = async (showLoadingState = true) => {
      if (showLoadingState) {
        setLoading(true);
      }

      try {
        await fetch("/api/seed", { method: "POST" });
        let resolvedGarage: Garage | null = null;
        const storedGarage = typeof window !== "undefined"
          ? localStorage.getItem("garage-data")
          : null;

        if (storedGarage) {
          try {
            const parsed = JSON.parse(storedGarage) as Garage;
            if (parsed?.id) {
              const garageRes = await fetch(`/api/garages/${parsed.id}`, {
                cache: "no-store",
              });
              if (garageRes.ok) {
                resolvedGarage = await garageRes.json();
              }
            }
          } catch (error) {
            console.warn("Failed to parse stored garage data:", error);
          }
        }

        if (!resolvedGarage) {
          const garageRes = await fetch("/api/garages/me", {
            cache: "no-store",
          });
          const garageData: Garage | { error?: string } = await garageRes.json();
          resolvedGarage = "id" in garageData ? garageData : null;
        }
        setGarage(resolvedGarage);

        if (resolvedGarage) {
          // Save garage data to localStorage for the layout TrialBanner
          localStorage.setItem("garage-data", JSON.stringify(resolvedGarage));

          const vehiclesRes = await fetch(`/api/vehicles?garageId=${resolvedGarage.id}`, {
            cache: "no-store",
          });
          const vehiclesData = await vehiclesRes.json();
          setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);

          const analyticsRes = await fetch(`/api/analytics?garageId=${resolvedGarage.id}`, {
            cache: "no-store",
          });
          const analyticsData = await analyticsRes.json();
          setAnalytics(analyticsData);

          // Fetch jobs for dashboard
          const jobsRes = await fetch(`/api/jobs?garageId=${resolvedGarage.id}`, {
            credentials: "include",
            cache: "no-store",
          });
          const jobsData = await jobsRes.json();
          setJobs(Array.isArray(jobsData) ? jobsData : []);

          // Fetch inventory for low stock alert
          const inventoryRes = await fetch(`/api/garages/${resolvedGarage.id}/inventory`, {
            cache: "no-store",
          });
          const inventoryData = await inventoryRes.json();
          setInventory(Array.isArray(inventoryData) ? inventoryData : (inventoryData?.items || []));

          // Fetch staff for workload summary
          const staffRes = await fetch(`/api/garages/${resolvedGarage.id}/staff`, {
            cache: "no-store",
          });
          const staffData = await staffRes.json();
          setStaff(Array.isArray(staffData) ? staffData : (staffData?.staff || []));
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        if (showLoadingState) {
          setLoading(false);
        }
      }
    };

    const refreshData = () => {
      loadData(false);
    };

    const onVisibilityChange = () => {
      if (!document.hidden) refreshData();
    };

    const onPageShow = () => {
      refreshData();
    };

    const onStorage = (event: StorageEvent) => {
      if (event.key === "jobs-updated-at") {
        refreshData();
      }
    };

    loadData();

    window.addEventListener("focus", refreshData);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pageshow", onPageShow);
    window.addEventListener("jobs-updated", refreshData as EventListener);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("focus", refreshData);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pageshow", onPageShow);
      window.removeEventListener("jobs-updated", refreshData as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const expiringSoon = vehicles.filter((vehicle) => {
    const diff = new Date(vehicle.motExpiry).getTime() - new Date().getTime();
    return diff > 0 && diff < 30 * 24 * 60 * 60 * 1000;
  });

  const recoverableRevenue = useMemo(() => {
    return vehicles.reduce((acc, vehicle) => {
      const advisoryTotal = (vehicle.advisories || []).reduce((sum, advisory) => sum + advisory.estPricePence, 0);
      return acc + advisoryTotal + 5485;
    }, 0);
  }, [vehicles]);

  const todayJobs = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const todays = jobs.filter((j) => {
      const d = new Date(j.createdAt).getTime();
      return d >= start.getTime() && d <= end.getTime();
    });
    const total = todays.reduce((sum, j) => sum + (j.totalPence || 0), 0);
    return { count: todays.length, total };
  }, [jobs]);

  const jobStats = useMemo(() => {
    const stats = {
      open: 0,
      done: 0,
      booked: 0,
      inProgress: 0,
      cancelled: 0,
      totalValue: 0,
    };

    for (const job of jobs) {
      const status = String(job.status || "").toUpperCase();
      if (status === "DONE") stats.done += 1;
      else if (status === "BOOKED" || status === "SCHEDULED") stats.booked += 1;
      else if (status === "CANCELLED" || status === "CANCELED") stats.cancelled += 1;
      else stats.inProgress += 1;
      if (status !== "DONE" && status !== "CANCELLED" && status !== "CANCELED") stats.open += 1;
      stats.totalValue += job.totalPence || 0;
    }

    const avgTicket = jobs.length > 0 ? Math.round(stats.totalValue / jobs.length) : 0;

    return { ...stats, avgTicket };
  }, [jobs]);

  const pulseData = useMemo(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - 6);
    start.setHours(0, 0, 0, 0);

    const days = Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(start);
      date.setDate(start.getDate() + index);
      const key = date.toISOString().slice(0, 10);
      return {
        key,
        label: formatUKDate(date, { weekday: "short" }),
        total: 0,
      };
    });

    const totals = new Map(days.map((day) => [day.key, 0]));
    for (const job of jobs) {
      if (!job.createdAt) continue;
      const created = new Date(job.createdAt);
      if (Number.isNaN(created.getTime())) continue;
      const key = created.toISOString().slice(0, 10);
      if (!totals.has(key)) continue;
      totals.set(key, (totals.get(key) || 0) + (job.totalPence || 0));
    }

    return days.map((day) => ({
      ...day,
      total: totals.get(day.key) || 0,
    }));
  }, [jobs]);

  const pulseMax = Math.max(1, ...pulseData.map((day) => day.total));
  const conversionRaw = analytics?.conversionRate || 0;
  const conversionRate = conversionRaw > 1 ? conversionRaw : conversionRaw * 100;
  const convertedJobs = analytics?.convertedJobs || 0;
  const totalJobs = jobs.length;
  const remindersQueued = (analytics?.remindersSent || 0) + (analytics?.remindersPending || 0);
  const revenuePotential = analytics?.totalRevenuePotential ?? recoverableRevenue;
  const todayLabel = formatUKDate(new Date(), {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  // Calculate monthly revenue
  const monthlyRevenue = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const monthJobs = jobs.filter((j) => {
      const jobDate = new Date(j.createdAt);
      return jobDate >= monthStart && jobDate <= monthEnd;
    });

    const total = monthJobs.reduce((sum, j) => sum + (j.totalPence || 0), 0);
    const daysInMonth = monthEnd.getDate();
    const daysElapsed = now.getDate();
    const progress = Math.round((daysElapsed / daysInMonth) * 100);

    return { total, daysElapsed, daysInMonth, progress };
  }, [jobs]);

  // Calculate low stock alerts
  const lowStockItems = useMemo(() => {
    return inventory.filter((item) => item.quantityOnHand <= (item.reorderLevel || 5));
  }, [inventory]);

  // Calculate staff workload (top 3 mechanics by jobs this month)
  const staffWorkload = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const workload: { [key: string]: { name: string; count: number } } = {};

    jobs
      .filter((j) => {
        const jobDate = new Date(j.createdAt);
        return jobDate >= monthStart;
      })
      .forEach((job) => {
        if (job.assignedToId) {
          const staffMember = staff.find((s) => s.id === job.assignedToId);
          if (staffMember) {
            if (!workload[job.assignedToId]) {
              workload[job.assignedToId] = { name: staffMember.name, count: 0 };
            }
            workload[job.assignedToId].count += 1;
          }
        }
      });

    return Object.values(workload)
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [jobs, staff]);

  // Calculate service popularity (top 3 job types this month)
  const servicePopularity = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const services: { [key: string]: number } = {};

    jobs
      .filter((j) => {
        const jobDate = new Date(j.createdAt);
        return jobDate >= monthStart;
      })
      .forEach((job) => {
        const type = job.type || "Other";
        services[type] = (services[type] || 0) + 1;
      });

    return Object.entries(services)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);
  }, [jobs]);

  // Calculate customer retention (repeat customers)
  const customerRetention = useMemo(() => {
    const customerCounts: { [key: string]: number } = {};

    jobs.forEach((job) => {
      const customerId = job.vehicle?.ownerName || job.customer?.name || "Unknown";
      customerCounts[customerId] = (customerCounts[customerId] || 0) + 1;
    });

    const repeatCustomers = Object.values(customerCounts).filter((count) => count > 1).length;
    const totalCustomers = Object.values(customerCounts).length;
    const rate = totalCustomers > 0 ? Math.round((repeatCustomers / totalCustomers) * 100) : 0;

    return { repeatCustomers, totalCustomers, rate };
  }, [jobs]);

  // Calculate next week's bookings
  const nextWeekBookings = useMemo(() => {
    const now = new Date();
    const weekStart = new Date(now);
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() + 7);

    return jobs
      .filter((j) => {
        const jobDate = new Date(j.createdAt);
        const status = String(j.status || "").toUpperCase();
        return (
          jobDate >= weekStart &&
          jobDate <= weekEnd &&
          (status === "BOOKED" || status === "SCHEDULED")
        );
      })
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      .slice(0, 5);
  }, [jobs]);

  // Calculate revenue goal and progress
  const revenueGoal = useMemo(() => {
    // Use custom monthly goal or default to £10,000
    let target = monthlyGoalAmount; // in pence

    const progress = Math.round((monthlyRevenue.total / target) * 100);
    const remaining = Math.max(0, target - monthlyRevenue.total);

    return { target, current: monthlyRevenue.total, progress, remaining };
  }, [monthlyRevenue, monthlyGoalAmount]);

  // Calculate job completion rate
  const completionRate = useMemo(() => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const monthJobs = jobs.filter((j) => {
      const jobDate = new Date(j.createdAt);
      return jobDate >= monthStart;
    });

    if (monthJobs.length === 0) return { completed: 0, cancelled: 0, rate: 0, total: 0 };

    const completed = monthJobs.filter((j) => String(j.status || "").toUpperCase() === "DONE").length;
    const cancelled = monthJobs.filter((j) => {
      const status = String(j.status || "").toUpperCase();
      return status === "CANCELLED" || status === "CANCELED";
    }).length;

    const rate = monthJobs.length > 0 ? Math.round((completed / monthJobs.length) * 100) : 0;

    return { completed, cancelled, rate, total: monthJobs.length };
  }, [jobs]);

  const handleSendReminder = async (vehicleId: string) => {
    await fetch("/api/reminders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vehicleId,
        channel: "SMS",
        scheduledFor: new Date().toISOString(),
      }),
    });
    addToast("Reminder scheduled successfully!", "success");
  };

  const handleSendBatchReminders = async () => {
    if (expiringSoon.length === 0) {
      addToast("No vehicles with expiring MOTs!", "error");
      return;
    }

    if (!confirm(`Send SMS reminders to ${expiringSoon.length} vehicles?\n\nThis action cannot be undone.`)) {
      return;
    }

    try {
      setIsSendingBatch(true);
      let successCount = 0;
      let failureCount = 0;

      for (const vehicle of expiringSoon) {
        try {
          const response = await fetch("/api/reminders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              vehicleId: vehicle.id,
              channel: "SMS",
              scheduledFor: new Date().toISOString(),
            }),
          });

          if (response.ok) {
            successCount += 1;
          } else {
            failureCount += 1;
          }
        } catch (error) {
          failureCount += 1;
        }
      }

      addToast(`Batch reminders sent! Sent: ${successCount}, Failed: ${failureCount}`, "success");
    } catch (error) {
      addToast("Failed to send batch reminders. Please try again.", "error");
      console.error("Batch reminder error:", error);
    } finally {
      setIsSendingBatch(false);
    }
  };

  const handleSaveGoal = () => {
    const newGoalAmount = parseFloat(goalInputValue) * 100; // Convert to pence
    if (newGoalAmount > 0) {
      setMonthlyGoalAmount(newGoalAmount);
      setGoalInputValue((newGoalAmount / 100).toString());
      setIsEditingGoal(false);
    } else {
      addToast("Please enter a valid amount greater than 0", "error");
    }
  };

  const handleCancelGoalEdit = () => {
    setGoalInputValue((monthlyGoalAmount / 100).toString());
    setIsEditingGoal(false);
  };

  const handleCleanup = async () => {
    if (!garage?.id) return;
    
    if (!confirm("🔧 Fix Dashboard Metrics?\n\nThis will remove orphaned data causing incorrect counts.\n\nSafe operation - takes 2 seconds.")) {
      return;
    }

    try {
      setIsCleaning(true);
      const response = await fetch(`/api/garages/${garage.id}/cleanup`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Cleanup failed");

      const result = await response.json();
      
      // Reload all data after cleanup
      const [vehiclesRes, analyticsRes, jobsRes] = await Promise.all([
        fetch(`/api/vehicles?garageId=${garage.id}`),
        fetch(`/api/analytics?garageId=${garage.id}`),
        fetch(`/api/jobs?garageId=${garage.id}`, {
          credentials: 'include'
        })
      ]);

      const [vehiclesData, analyticsData, jobsData] = await Promise.all([
        vehiclesRes.json(),
        analyticsRes.json(),
        jobsRes.json()
      ]);

      setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);
      setAnalytics(analyticsData);
      setJobs(Array.isArray(jobsData) ? jobsData : []);

      addToast(`Fixed! Removed ${result.deletedAdvisories} ghost advisories and ${result.deletedReminders} ghost reminders. Metrics updated.`, "success");
    } catch (error) {
      addToast("Cleanup failed. Please try again.", "error");
      console.error("Cleanup error:", error);
    } finally {
      setIsCleaning(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-40 right-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.25),transparent_65%)]" />
      <div className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.3),transparent_60%)]" />
      <div className="relative space-y-6">
      {missingProfileFields.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-linear-to-r from-amber-50 via-white to-teal-50 p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-700">Profile Signal</p>
            <p className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              Boost local visibility
            </p>
            <p className="text-sm text-slate-600">
              Add {missingProfileFields.join(", ")} to rank higher in the directory.
            </p>
          </div>
          <Link
            href="/garage/settings"
            className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
          >
            Finish Profile
          </Link>
        </div>
      )}

      <header className="rounded-3xl border border-slate-200/80 bg-white/90 shadow-sm backdrop-blur p-6 md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Garage Command Center</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
              {garage?.name || "Garage"} performance snapshot
            </h2>
            <p className="text-sm text-slate-500">{todayLabel} • Live operational signals</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/garage/lookup"
              className="bg-slate-900 text-white px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 min-h-12 text-sm md:text-base"
            >
              <Search size={18} /> New Lookup
            </Link>
            <Link
              href="/garage/jobs/new"
              className="bg-amber-400 text-slate-900 px-4 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-amber-300 min-h-12 text-sm md:text-base"
            >
              <Hammer size={18} /> Create Job
            </Link>
          </div>
        </div>
      </header>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="p-5 md:p-6 bg-white/90 backdrop-blur border-slate-200/70">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Today</p>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <Calendar size={18} />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mt-3" style={{ fontFamily: "var(--font-display)" }}>
            £{(todayJobs.total / 100).toFixed(2)}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{todayJobs.count} jobs logged</p>
          <p className="text-xs text-emerald-600 mt-3">Live revenue for the day</p>
        </Card>
        <Card className="p-5 md:p-6 bg-white/90 backdrop-blur border-slate-200/70">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Open Jobs</p>
            <div className="p-2 bg-slate-100 text-slate-700 rounded-lg">
              <Bolt size={18} />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mt-3" style={{ fontFamily: "var(--font-display)" }}>
            {jobStats.open}
          </h3>
          <p className="text-sm text-slate-500 mt-1">{jobStats.inProgress} in progress, {jobStats.booked} booked</p>
          <p className="text-xs text-slate-500 mt-3">Keep momentum on active bays</p>
        </Card>
        <Card className="p-5 md:p-6 bg-white/95 border-slate-200/80">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Conversion</p>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <TrendingUp size={18} />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 mt-3" style={{ fontFamily: "var(--font-display)" }}>
            {conversionRate.toFixed(1)}%
          </h3>
          <p className="text-sm text-slate-600 mt-1">Jobs converted this month</p>
          <p className="text-xs text-slate-700 mt-2">
            {totalJobs > 0 ? `${convertedJobs} of ${totalJobs} jobs` : "No jobs recorded yet"}
          </p>
          <p className="text-xs text-slate-500 mt-2">Target: 65%+</p>
        </Card>
      </div>

      {/* Instant Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="p-6 bg-white/95 border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Coins size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Average Ticket</p>
              <p className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                £{(jobStats.avgTicket / 100).toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4">Based on {jobs.length} recorded jobs.</p>
        </Card>
        <Card className="p-6 bg-white/95 border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Send size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Reminders Queued</p>
              <p className="text-lg font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                {remindersQueued}
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-4">Scheduled and sent reminders.</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white/95 border-slate-200/80">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={20} />
              <h3 className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Action Required</h3>
            </div>
            <span className="text-xs text-slate-500">{expiringSoon.length} urgent</span>
          </div>
          <div className="p-5 space-y-4">
            {expiringSoon.length > 0 && (
              <button
                onClick={handleSendBatchReminders}
                disabled={isSendingBatch}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle size={16} />
                {isSendingBatch ? "Sending..." : `Send SMS to All ${expiringSoon.length}`}
              </button>
            )}
            {expiringSoon.length > 0 ? (
              expiringSoon.map((vehicle) => {
                const daysLeft = Math.ceil(
                  (new Date(vehicle.motExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                return (
                  <div
                    key={vehicle.id}
                    className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-yellow-400 border-2 border-slate-900 rounded px-2 py-0.5 font-bold text-xs">
                          {vehicle.vrm}
                        </span>
                        <span className="text-xs text-amber-600 font-semibold">{daysLeft} days left</span>
                      </div>
                      <h4 className="font-bold text-sm">
                        {vehicle.make} {vehicle.model}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {vehicle.ownerName} • Expires: {formatDate(vehicle.motExpiry)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSendReminder(vehicle.id)}
                      className="bg-slate-900 hover:bg-slate-800 text-white text-xs px-4 py-2 rounded-lg font-semibold flex items-center gap-1"
                    >
                      <Send size={14} /> Send SMS
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="text-emerald-500" size={32} />
                </div>
                <p className="font-semibold text-slate-900">All caught up!</p>
                <p className="text-sm text-slate-500 mt-1">No urgent MOT expiries in the next 30 days.</p>
              </div>
            )}
          </div>
        </Card>
        <Card className="bg-white/95 border-slate-200/80">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Revenue Pulse</h3>
            <span className="text-xs text-slate-500">Last 7 days</span>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-7 gap-2 items-end">
              {pulseData.map((day) => (
                <div key={day.key} className="flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-full bg-emerald-500/80"
                    style={{
                      height: `${Math.max(8, Math.round((day.total / pulseMax) * 140))}px`,
                    }}
                    title={`£${(day.total / 100).toFixed(2)}`}
                  />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{day.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-slate-600">
              <span>Weekly intake</span>
              <span className="font-semibold text-slate-900">£{(pulseData.reduce((sum, day) => sum + day.total, 0) / 100).toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-white/95 border-slate-200/80">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Workload Board</h3>
            <Link href="/garage/jobs" className="text-sm text-slate-600 hover:text-slate-900 font-semibold">View queue</Link>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-slate-100 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Booked</p>
              <p className="text-2xl font-semibold text-slate-900 mt-2" style={{ fontFamily: "var(--font-display)" }}>{jobStats.booked}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">In Progress</p>
              <p className="text-2xl font-semibold text-slate-900 mt-2" style={{ fontFamily: "var(--font-display)" }}>{jobStats.inProgress}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Done</p>
              <p className="text-2xl font-semibold text-slate-900 mt-2" style={{ fontFamily: "var(--font-display)" }}>{jobStats.done}</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Cancelled</p>
              <p className="text-2xl font-semibold text-slate-900 mt-2" style={{ fontFamily: "var(--font-display)" }}>{jobStats.cancelled}</p>
            </div>
          </div>
        </Card>

        {/* Next Week's Bookings */}
        <Card className="p-6 bg-white/95 border-slate-200/80">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Upcoming</p>
              <p className="text-lg font-semibold text-slate-900">{nextWeekBookings.length} bookings</p>
            </div>
          </div>
          {nextWeekBookings.length > 0 ? (
            <div className="space-y-2 text-sm">
              {nextWeekBookings.slice(0, 3).map((booking, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded">
                  <div>
                    <p className="font-semibold text-slate-900 text-xs">
                      {booking.vehicle?.vrm || "N/A"} • {booking.type || "Service"}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatUKDate(booking.createdAt, {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-rose-100 text-rose-700 text-xs font-semibold rounded">
                    £{((booking.totalPence || 0) / 100).toFixed(2)}
                  </span>
                </div>
              ))}
              {nextWeekBookings.length > 3 && (
                <p className="text-xs text-slate-500 text-center pt-2">
                  +{nextWeekBookings.length - 3} more booking{nextWeekBookings.length - 3 !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-sm text-slate-500">No bookings next week</p>
              <p className="text-xs text-slate-400 mt-1">Keep your schedule active</p>
            </div>
          )}
        </Card>
      </div>

      {/* Phase 1 Enhancement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Monthly Progress & Goal Tracker - MERGED */}
        <Card className="p-6 bg-white/95 border-slate-200/80 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <BarChart3 size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Monthly Progress & Goal</p>
                <p className="text-sm text-slate-600">Calendar & Revenue Tracking</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Calendar Progress Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Calendar Progress</span>
                <span className="text-sm font-semibold text-blue-600">{monthlyRevenue.progress}%</span>
              </div>
              <div className="bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-full transition-all duration-500"
                  style={{ width: `${monthlyRevenue.progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">{monthlyRevenue.daysElapsed} of {monthlyRevenue.daysInMonth} days completed</p>
            </div>

            {/* Revenue Goal Section */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-700">Revenue Goal</span>
                  <button
                    onClick={() => {
                      if (!isEditingGoal) {
                        setIsEditingGoal(true);
                      }
                    }}
                    className="ml-auto text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                  >
                    {isEditingGoal ? "Editing..." : "Edit"}
                  </button>
                </div>
                <span className={`text-sm font-bold ${revenueGoal.progress >= 100 ? "text-emerald-600" : "text-amber-600"}`}>
                  {revenueGoal.progress}%
                </span>
              </div>

              {isEditingGoal ? (
                <div className="space-y-3 mb-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Set Monthly Goal (£)
                    </label>
                    <input
                      type="number"
                      value={goalInputValue}
                      onChange={(e) => setGoalInputValue(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                      placeholder="e.g., 10000"
                      min="1"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={handleCancelGoalEdit}
                      className="px-3 py-1.5 text-sm rounded bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveGoal}
                      className="px-3 py-1.5 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                    >
                      Save Goal
                    </button>
                  </div>
                </div>
              ) : null}

              <div className="bg-slate-100 rounded-full h-3 overflow-hidden mb-4">
                <div
                  className={`${revenueGoal.progress >= 100 ? "bg-emerald-500" : "bg-amber-500"} h-full transition-all duration-500`}
                  style={{ width: `${Math.min(revenueGoal.progress, 100)}%` }}
                />
              </div>

              <div className="grid grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 bg-slate-50 rounded">
                  <p className="text-slate-500 mb-1">Target</p>
                  <p className="font-bold text-slate-900">£{(revenueGoal.target / 100).toFixed(0)}</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded">
                  <p className="text-slate-500 mb-1">Actual</p>
                  <p className="font-bold text-slate-900">£{(revenueGoal.current / 100).toFixed(0)}</p>
                </div>
                <div className="p-2.5 bg-slate-50 rounded">
                  <p className="text-slate-500 mb-1">Remaining</p>
                  <p className="font-bold text-slate-900">£{(revenueGoal.remaining / 100).toFixed(0)}</p>
                </div>
                <div className="p-2.5 bg-blue-50 rounded">
                  <p className="text-blue-600 mb-1">Revenue</p>
                  <p className="font-bold text-blue-900">£{(monthlyRevenue.total / 100).toFixed(0)}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Low Stock Alert */}
        <Card className="p-6 bg-white/95 border-slate-200/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-50 text-orange-600">
                <Package size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Low Stock</p>
                <p className="text-2xl font-semibold text-slate-900">{lowStockItems.length}</p>
              </div>
            </div>
          </div>
          {lowStockItems.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-orange-600 font-semibold">Items below reorder level</p>
              <p className="text-sm text-slate-600 mt-1">Review inventory soon</p>
            </div>
          )}
          {lowStockItems.length === 0 && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <p className="text-xs text-emerald-600 font-semibold">✓ All items stocked</p>
            </div>
          )}
          <Link
            href="/garage/inventory"
            className="text-xs text-slate-600 hover:text-slate-900 font-semibold mt-3 block"
          >
            View Inventory →
          </Link>
        </Card>

        {/* Staff Workload */}
        <Card className="p-6 bg-white/95 border-slate-200/80">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Users size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Top Mechanics</p>
              <p className="text-sm text-slate-600">This month</p>
            </div>
          </div>
          {staffWorkload.length > 0 ? (
            <div className="space-y-3">
              {staffWorkload.map((worker, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-sm text-slate-900">{worker.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-purple-600">{worker.count}</p>
                    <p className="text-xs text-slate-500">job{worker.count !== 1 ? "s" : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500">No staff assignments this month</p>
            </div>
          )}
        </Card>

        {/* Service Popularity */}
        <Card className="p-6 bg-white/95 border-slate-200/80">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <TrendingUp size={18} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Popular Services</p>
              <p className="text-sm text-slate-600">This month</p>
            </div>
          </div>
          {servicePopularity.length > 0 ? (
            <div className="space-y-3">
              {servicePopularity.map((service, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-sm text-slate-900 capitalize">{service.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-indigo-600">{service.count}</p>
                    <p className="text-xs text-slate-500">job{service.count !== 1 ? "s" : ""}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-slate-500">No services recorded this month</p>
            </div>
          )}
        </Card>

        {/* Customer Retention */}
        <Card className="p-6 bg-white/95 border-slate-200/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-50 text-cyan-600">
                <Users size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Retention Rate</p>
                <p className="text-2xl font-semibold text-slate-900">{customerRetention.rate}%</p>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-cyan-600">{customerRetention.repeatCustomers}</span> of{" "}
              <span className="font-semibold">{customerRetention.totalCustomers}</span> customers are returning
            </p>
            <p className="text-xs text-slate-500 mt-2">Repeat visits drive loyalty</p>
          </div>
        </Card>
      </div>

      {/* Recent Jobs (moved below Recent Activity) */}
      <Card className="mt-6 bg-white/95 border-slate-200/80">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900" style={{ fontFamily: "var(--font-display)" }}>Recent Jobs</h3>
          <Link href="/garage/jobs" className="text-slate-600 hover:text-slate-900 font-semibold text-sm">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-900">Job #</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-900">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-900">Vehicle</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-900">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-900">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-900">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {jobs.slice(0, 8).map((job) => (
                <tr key={job.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-slate-900">{job.jobNumber}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded">{job.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="bg-yellow-400 border-2 border-slate-900 rounded px-2 py-1 font-bold text-xs">{job.vehicle.vrm}</span>
                    <span className="ml-2 text-xs text-slate-600">{vehicleTitle(job.vehicle)}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{job.vehicle.ownerName}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">{job.status.replace("_", " ")}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-900 font-bold">£{(job.totalPence / 100).toFixed(2)}</td>
                </tr>
              ))}
              {jobs.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-400">No jobs yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      </div>
    </div>
  );
}
