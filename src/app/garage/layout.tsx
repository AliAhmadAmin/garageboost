"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Hide scrollbar while preserving scroll functionality
const scrollbarHideStyle = `
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
`;
import TrialBanner from "@/components/ui/TrialBanner";
import { getPlanLabel, isTrialExpired } from "@/lib/plans";
import { PlanUpgradeModal } from "@/components/ui/PlanUpgradeModal";
import { isManagerAccessRole, isGarageStaffRole } from "@/lib/access-control";
import {
  Bell,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Users,
  Zap,
  MessageSquare,
  Megaphone,
  Wrench,
  Calendar,
  CalendarCheck,
  Star,
  Package,
  Receipt,
  List,
  X,
} from "lucide-react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [pendingJobs, setPendingJobs] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [staffAccessRole, setStaffAccessRole] = useState<string | null>(null);
  const [garageId, setGarageId] = useState<string | null>(null);
  const [bookingRequestsEnabled, setBookingRequestsEnabled] = useState(true);
  const [showNewBookingAlert, setShowNewBookingAlert] = useState(false);
  const [newBookingCount, setNewBookingCount] = useState(0);
  const [showPushPrompt, setShowPushPrompt] = useState(false);
  const alertTimeoutRef = useRef<number | null>(null);
  const previousPendingBookingsRef = useRef<number | null>(null);

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let index = 0; index < rawData.length; ++index) {
      outputArray[index] = rawData.charCodeAt(index);
    }
    return outputArray;
  };

  const syncPushSubscription = async (resolvedGarageId: string) => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!vapidPublicKey) return;

    const registration = await navigator.serviceWorker.register("/sw.js");
    const existingSubscription = await registration.pushManager.getSubscription();

    if (Notification.permission !== "granted") {
      if (existingSubscription) {
        await fetch("/api/push-subscriptions", {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            garageId: resolvedGarageId,
            endpoint: existingSubscription.endpoint,
          }),
        });
        await existingSubscription.unsubscribe();
      }
      return;
    }

    const subscription =
      existingSubscription ||
      (await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
      }));

    await fetch("/api/push-subscriptions", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        garageId: resolvedGarageId,
        subscription,
      }),
    });

  };

  const requestPushPermission = async () => {
    if (!garageId) return;
    if (!("Notification" in window)) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        setShowPushPrompt(false);
        await syncPushSubscription(garageId);
      }
    } catch (error) {
      // Ignore permission request errors
    }
  };

  const playAlertTone = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const audioContext = new AudioContextClass();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = 880;
      gainNode.gain.value = 0.05;

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.2);

      window.setTimeout(() => {
        void audioContext.close().catch(() => undefined);
      }, 250);
    } catch (error) {
      // Ignore if browser blocks autoplay/audio context
    }
  };

  const triggerNewBookingAlert = (increase: number, totalPending: number) => {
    if (increase <= 0 || !bookingRequestsEnabled) return;

    setNewBookingCount(increase);
    setShowNewBookingAlert(true);

    if (alertTimeoutRef.current) {
      window.clearTimeout(alertTimeoutRef.current);
    }
    alertTimeoutRef.current = window.setTimeout(() => {
      setShowNewBookingAlert(false);
    }, 7000);

    playAlertTone();

    try {
      if ("Notification" in window && Notification.permission === "granted") {
        const bookingLabel = increase === 1 ? "booking" : "bookings";
        const totalLabel = totalPending === 1 ? "booking" : "bookings";
        new Notification("New booking received", {
          body: `${increase} new ${bookingLabel}. You now have ${totalPending} pending ${totalLabel}.`,
          tag: "garage-new-booking",
        });
      }
    } catch (error) {
      // Ignore notification failures
    }

    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      navigator.vibrate([150, 80, 150]);
    }
  };

  useEffect(() => {
    try {
      const rawUser = localStorage.getItem("user");
      if (rawUser) {
        const userData = JSON.parse(rawUser);
        setUserRole(userData?.role || null);
        setStaffAccessRole(userData?.staff?.accessRole || null);
      }
    } catch (error) {
      setUserRole(null);
      setStaffAccessRole(null);
    }
  }, []);

  const isStaffRestricted = isGarageStaffRole(userRole) && !isManagerAccessRole(staffAccessRole);

  useEffect(() => {
    if (!isStaffRestricted) return;
    const allowed = pathname.startsWith("/garage/jobs") || pathname.startsWith("/garage/bookings");
    if (!allowed) {
      router.replace("/garage/jobs");
    }
  }, [isStaffRestricted, pathname, router]);

  useEffect(() => {
    if (!garageId) return;

    const loadNotificationPreferences = async () => {
      try {
        const response = await fetch(`/api/reminder-config?garageId=${garageId}`, {
          cache: "no-store",
          credentials: "include",
        });

        if (!response.ok) return;
        const config = await response.json();
        setBookingRequestsEnabled(config.bookingRequests !== false);
      } catch (error) {
        // Keep defaults if loading fails
      }
    };

    void loadNotificationPreferences();
  }, [garageId]);

  useEffect(() => {
    if (!garageId || !bookingRequestsEnabled) return;
    if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) return;

    if (Notification.permission === "default") {
      setShowPushPrompt(true);
      return;
    }

    if (Notification.permission === "granted") {
      void syncPushSubscription(garageId).catch(() => undefined);
    } else {
      setShowPushPrompt(false);
    }
  }, [garageId, bookingRequestsEnabled]);

  useEffect(() => {
    const loadPendingCounts = async () => {
      try {
        let resolvedGarageId: string | null = null;

        try {
          const meRes = await fetch("/api/garages/me", {
            credentials: "include",
            cache: "no-store",
          });
          if (meRes.ok) {
            const garage = await meRes.json();
            if (garage?.id) {
              resolvedGarageId = garage.id;
              try {
                localStorage.setItem("garage-data", JSON.stringify(garage));
              } catch (error) {
                // Ignore storage failures
              }
            }
          }
        } catch (error) {
            resolvedGarageId = null;
        }

          if (!resolvedGarageId) {
          const cached = localStorage.getItem("garage-data");
          if (cached) {
            const parsed = JSON.parse(cached);
              resolvedGarageId = parsed?.id || null;
          }
        }

          if (!resolvedGarageId) return;

          setGarageId((previous) => (previous === resolvedGarageId ? previous : resolvedGarageId));

          const jobsRes = await fetch(`/api/jobs?garageId=${resolvedGarageId}`, {
          cache: 'no-store',
          credentials: 'include',
          headers: { 'Cache-Control': 'no-cache' },
        });
        if (jobsRes.ok) {
          const jobs = await jobsRes.json();
          const list = Array.isArray(jobs) ? jobs : [];
          const count = list.filter(
            (job: { status?: string }) =>
              job?.status === "TODO" ||
              job?.status === "BOOKED" ||
              job?.status === "DOING" ||
              job?.status === "IN_PROGRESS"
          ).length;
          setPendingJobs(count);
        }

        const bookingsRes = await fetch(`/api/garages/${resolvedGarageId}/bookings`, {
          cache: 'no-store',
          credentials: 'include',
          headers: { 'Cache-Control': 'no-cache' },
        });
        if (bookingsRes.ok) {
          const data = await bookingsRes.json();
          const list = Array.isArray(data?.bookings) ? data.bookings : [];
          const count = list.filter(
            (booking: { status?: string; convertedToJob?: boolean }) => 
              (booking?.status === "PENDING" || booking?.status === "CONFIRMED") &&
              !booking?.convertedToJob
          ).length;

          const previousCount = previousPendingBookingsRef.current;
          if (previousCount !== null && count > previousCount) {
            triggerNewBookingAlert(count - previousCount, count);
          }

          previousPendingBookingsRef.current = count;
          setPendingBookings(count);
        }
      } catch (error) {
        setPendingJobs(0);
        setPendingBookings(0);
      }
    };

    loadPendingCounts();

    const handleFocus = () => {
      loadPendingCounts();
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        loadPendingCounts();
      }
    };

    const intervalId = window.setInterval(() => {
      loadPendingCounts();
    }, 15000); // 15 seconds - match other pages

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.clearInterval(intervalId);
      if (alertTimeoutRef.current) {
        window.clearTimeout(alertTimeoutRef.current);
      }
    };
  }, [bookingRequestsEnabled]);

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout?")) {
      return;
    }

    try {
      setIsLoggingOut(true);
      // Call logout API to clear session
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // Clear local storage
      localStorage.removeItem("user");
      localStorage.removeItem("garage-id");
      localStorage.removeItem("garage-data");
      
      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect even if logout API fails
      router.push("/");
    }
  };

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/garage/dashboard" },
    { label: "Vehicle Lookup", icon: Search, href: "/garage/lookup" },
    { label: "Customers", icon: Users, href: "/garage/customers" },
    { label: "Jobs", icon: Wrench, href: "/garage/jobs", badge: pendingJobs },
    { label: "Online Bookings", icon: CalendarCheck, href: "/garage/bookings", badge: pendingBookings },
    { label: "Calendar", icon: Calendar, href: "/garage/calendar" },
    { label: "Bookable Services", icon: List, href: "/garage/services" },
    { label: "Staff", icon: Users, href: "/garage/staff" },
    { label: "Inventory", icon: Package, href: "/garage/inventory" },
    { label: "Expenses", icon: Receipt, href: "/garage/expenses" },
    { label: "Reviews", icon: Star, href: "/garage/reviews" },
    { label: "Reminders", icon: Bell, href: "/garage/reminders" },
    { label: "Settings", icon: Settings, href: "/garage/settings" },
  ];

  const visibleNavItems = isStaffRestricted
    ? navItems.filter((item) => item.href === "/garage/jobs" || item.href === "/garage/bookings")
    : navItems;

  const isNavItemActive = (href: string) => {
    if (href === "/garage/dashboard") {
      return pathname === "/garage" || pathname === "/garage/dashboard";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <style>{scrollbarHideStyle}</style>
      {showNewBookingAlert && bookingRequestsEnabled && (
        <div className="fixed top-4 right-4 left-4 lg:left-auto lg:top-6 lg:right-6 z-120 max-w-sm ml-auto">
          <div className="bg-emerald-600 text-white rounded-xl shadow-2xl p-4 border border-emerald-500">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <Bell size={18} className="mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold">New booking received</p>
                  <p className="text-sm text-emerald-100">
                    {newBookingCount} new {newBookingCount === 1 ? "booking" : "bookings"} pending.
                  </p>
                  <Link
                    href="/garage/bookings"
                    className="inline-block mt-2 text-sm font-semibold text-white underline underline-offset-2"
                    onClick={() => setShowNewBookingAlert(false)}
                  >
                    View bookings
                  </Link>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNewBookingAlert(false)}
                className="text-emerald-100 hover:text-white"
                aria-label="Close booking alert"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
      {showPushPrompt && bookingRequestsEnabled && (
        <div className="fixed bottom-20 right-4 left-4 lg:left-auto lg:bottom-6 lg:right-6 z-120 max-w-sm ml-auto">
          <div className="bg-slate-900 text-white rounded-xl shadow-2xl p-4 border border-slate-700">
            <p className="font-bold">Enable booking push alerts?</p>
            <p className="text-sm text-slate-300 mt-1">Get instant alerts even when the app is in the background.</p>
            <div className="mt-3 flex items-center gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowPushPrompt(false)}
                className="px-3 py-1.5 text-sm rounded-lg border border-slate-600 text-slate-300"
              >
                Not now
              </button>
              <button
                type="button"
                onClick={() => void requestPushPermission()}
                className="px-3 py-1.5 text-sm rounded-lg bg-blue-600 text-white font-semibold"
              >
                Enable
              </button>
            </div>
          </div>
        </div>
      )}
      <nav className="print:hidden fixed bottom-0 left-0 right-0 lg:left-0 lg:top-0 lg:h-screen lg:w-64 bg-slate-900 text-white p-2 lg:pl-4 lg:pr-0 lg:py-4 z-50 flex lg:flex-col items-center lg:items-stretch border-t border-slate-800 lg:border-t-0 shadow-lg lg:shadow-none overflow-x-auto lg:overflow-x-visible">
        <div className="scrollbar-hide flex lg:flex-col items-center lg:items-stretch gap-2 lg:gap-2 lg:flex-1 lg:overflow-y-auto min-w-full lg:min-w-0">
        <div className="hidden lg:flex items-center gap-2 mb-8 px-2 py-4 border-b border-slate-800 shrink-0">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Zap size={24} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Garage Boost</h1>
          </div>
        </div>

        {visibleNavItems.map((item) => {
          const isActive = isNavItemActive(item.href);
          const badgeText = item.badge && item.badge > 99 ? "99+" : item.badge;
          const labelText = badgeText ? `${item.label} (${badgeText})` : item.label;
          return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-col lg:flex-row items-center gap-1 lg:gap-3 p-2 lg:p-3 rounded-none transition-all shrink-0 min-h-13.5 lg:min-h-11 touch-manipulation active:scale-95 min-w-17.5 lg:w-full ${
              isActive
                ? "bg-linear-to-r from-blue-600/30 via-indigo-600/25 to-cyan-500/25 text-white ring-1 ring-blue-300/60 shadow-[0_0_0_1px_rgba(59,130,246,0.15)]"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <item.icon size={20} className={`shrink-0 ${isActive ? "text-blue-300" : ""}`} />
            <span className="text-[9px] lg:text-sm font-medium leading-tight text-center lg:text-left whitespace-nowrap">
              {labelText}
            </span>
          </Link>
          );
        })}
      </div>

      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="hidden lg:flex items-center gap-3 p-3 w-full rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all border-t border-slate-800 disabled:opacity-50 shrink-0"
      >
        <LogOut size={20} />
        <span className="text-sm font-medium">{isLoggingOut ? "Logging out..." : "Logout"}</span>
      </button>
    </nav>
    </>
  );
};

export default function GarageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [garageData, setGarageData] = useState<any>(null);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [refreshingPlan, setRefreshingPlan] = useState(false);
  const [upgradeNotice, setUpgradeNotice] = useState<string | null>(null);
  const [isTrialExpiredBlocked, setIsTrialExpiredBlocked] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("user");
    
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const userData = JSON.parse(user);
      if (userData.role === "ADMIN" || userData.role === "SUPER_ADMIN") {
        router.push("/admin");
        return;
      }
      setIsAuthenticated(true);

      // Load garage data - use cached data for now
      const fetchGarageData = async () => {
        // Just use cached data - API endpoint requires proper session cookies
        const garage = localStorage.getItem("garage-data");
        if (garage) {
          setGarageData(JSON.parse(garage));
        }
      };

      if (userData?.staff?.garage) {
        try {
          localStorage.setItem("garage-data", JSON.stringify(userData.staff.garage));
          setGarageData(userData.staff.garage);
        } catch (error) {
          // Ignore storage failures
        }
      }

      fetchGarageData();
    } catch (error) {
      router.push("/login");
      return;
    }

    setIsLoading(false);
  }, [router]);

  // Check if trial is expired and block access
  useEffect(() => {
    if (!garageData) return;

    // If garage status is TRIAL and trial has expired, block access
    if (garageData.status === "TRIAL" && garageData.trialEndsAt) {
      const trialDate = new Date(garageData.trialEndsAt);
      if (isTrialExpired(trialDate)) {
        setIsTrialExpiredBlocked(true);
        setShowPlanModal(true);
      }
    }
  }, [garageData]);

  useEffect(() => {
    // If returning from Stripe checkout with success, refresh garage data
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get("success") === "true") {
        (async () => {
          try {
            // If we have a Stripe session_id in the URL, call the session endpoint
            // to confirm the checkout and update the garage record immediately.
            const sessionId = params.get("session_id");
            if (sessionId) {
              try {
                const res = await fetch(`/api/stripe/session?session_id=${encodeURIComponent(sessionId)}`);
                if (res.ok) {
                  const data = await res.json();
                  if (data?.updated && data?.garage) {
                    try { localStorage.setItem("garage-data", JSON.stringify(data.garage)); } catch (e) {}
                    setGarageData(data.garage);
                    const label = getPlanLabel(data.garage.plan);
                    const message = `Thank you! You've upgraded to ${label}`;
                    try { localStorage.setItem("garage-upgrade-success", JSON.stringify({ message, plan: data.garage.plan })); } catch (e) {}
                    try { window.dispatchEvent(new Event("garage-upgraded")); } catch (e) {}
                    setUpgradeNotice(message);
                  }
                }
              } catch (e) {
                // best-effort: ignore errors here and continue polling the garage API
              }
            }
            // Poll for updated garage plan because Stripe webhook may process asynchronously
            const prev = garageData || (localStorage.getItem("garage-data") ? JSON.parse(localStorage.getItem("garage-data") as string) : null);
            setRefreshingPlan(true);
            try { localStorage.setItem("garage-refreshing", "true"); } catch (e) {}
            try { window.dispatchEvent(new Event("garage-refresh-start")); } catch (e) {}
            const prevPlan = prev?.plan || null;

            // Wait a bit for webhook to process before polling
            await new Promise((r) => setTimeout(r, 1000));

            const maxAttempts = 6;
            const delayMs = 2000; // 2s between polls

            const garageIdToCheck = prev?.id || null;
            for (let i = 0; i < maxAttempts; i++) {
              try {
                let res;
                if (garageIdToCheck) {
                  res = await fetch(`/api/garages/${garageIdToCheck}`);
                  if (res.ok) {
                    const latest = await res.json();
                    if (latest && (latest.plan !== prevPlan || i === maxAttempts - 1)) {
                      localStorage.setItem("garage-data", JSON.stringify(latest));
                      setGarageData(latest);
                      setRefreshingPlan(false);
                      // Close modal and trial-expired blocker on successful upgrade
                      setShowPlanModal(false);
                      setIsTrialExpiredBlocked(false);
                      break;
                    }
                  }
                } else {
                  res = await fetch("/api/garages");
                  if (res.ok) {
                    const list = await res.json();
                    if (list && list[0]) {
                      const latest = list[0];
                      if (latest.plan !== prevPlan || i === maxAttempts - 1) {
                        localStorage.setItem("garage-data", JSON.stringify(latest));
                        setGarageData(latest);
                        setRefreshingPlan(false);
                        // Close modal and trial-expired blocker on successful upgrade
                        setShowPlanModal(false);
                        setIsTrialExpiredBlocked(false);
                        break;
                      }
                    }
                  }
                }
              } catch (e) {
                // ignore and retry
              }

              // wait before next attempt
              await new Promise((r) => setTimeout(r, delayMs));
            }

            // if we exhausted attempts, clear refreshing flag
            setRefreshingPlan(false);
            try { localStorage.setItem("garage-refreshing", "false"); } catch (e) {}
            try { window.dispatchEvent(new Event("garage-refresh-end")); } catch (e) {}

            // remove success param from URL
            const url = new URL(window.location.href);
            url.searchParams.delete("success");
            url.searchParams.delete("session_id");
            window.history.replaceState({}, "", url.toString());
            } catch (e) {
              console.error("Failed to refresh garage after checkout", e);
              try { localStorage.setItem("garage-refreshing", "false"); } catch (e) {}
              try { window.dispatchEvent(new Event("garage-refresh-end")); } catch (e) {}
            }
        })();
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    // Listen for upgrade events from session-confirm or other tabs
    const readNotice = () => {
      try {
        const raw = localStorage.getItem("garage-upgrade-success");
        if (raw) {
          const parsed = JSON.parse(raw);
          setUpgradeNotice(parsed?.message || null);
          return;
        }
      } catch (e) {}
      setUpgradeNotice(null);
    };

    const onUpgrade = () => readNotice();
    const onStorage = (ev: StorageEvent) => {
      if (ev.key === "garage-upgrade-success") readNotice();
    };

    window.addEventListener("garage-upgraded", onUpgrade as EventListener);
    window.addEventListener("storage", onStorage);
    // init
    readNotice();
    return () => {
      window.removeEventListener("garage-upgraded", onUpgrade as EventListener);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <PlanUpgradeModal
        isOpen={showPlanModal}
        onClose={() => setShowPlanModal(isTrialExpiredBlocked)} // Force modal to stay open if trial expired
        currentPlan={garageData?.plan}
        currentStatus={garageData?.status}
        garageId={garageData?.id ?? ""}
        isRefreshing={refreshingPlan}
      />

      {/* Trial Expired Blocking Overlay */}
      {isTrialExpiredBlocked && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor"/>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Trial Expired</h3>
            <p className="text-slate-600 mb-6">Your trial period has ended. Please add a payment method to continue using Garage Boost.</p>
            <button
              onClick={() => setShowPlanModal(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Add Payment Now
            </button>
            <p className="text-xs text-slate-500 mt-4">No hidden fees. Cancel anytime.</p>
          </div>
        </div>
      )}
      {upgradeNotice && (
        <div className="print:hidden max-w-7xl mx-auto mt-4">
          <div className="flex items-center justify-between bg-emerald-600 text-white p-4 rounded-lg shadow-md">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div>
                <div className="font-semibold">{upgradeNotice}</div>
                <div className="text-sm opacity-90">Your subscription has been updated.</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setUpgradeNotice(null);
                  try { localStorage.removeItem("garage-upgrade-success"); } catch (e) {}
                }}
                className="text-white/90 hover:text-white text-sm font-medium"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
      {!isTrialExpiredBlocked && (
        <>
          {garageData && (
            <>
              <TrialBanner
                trialEndsAt={garageData.trialEndsAt ? new Date(garageData.trialEndsAt) : null}
                currentPlan={garageData.plan || "starter"}
                status={garageData.status}
                onViewPlans={() => setShowPlanModal(true)}
              />
            </>
          )}
          <div className="flex-1 flex flex-col lg:flex-row">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-4 md:p-6 lg:p-12 pb-24 lg:pb-12">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </>
      )}
    </div>
  );
}
