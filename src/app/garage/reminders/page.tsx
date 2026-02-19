"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Send, Bell, Mail, MessageSquare, Clock, Calendar } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useToast } from "@/components/ui/Toast";

interface Vehicle {
  id: string;
  vrm: string;
  ownerName: string;
  make: string;
  model: string;
  motExpiry: string;
}

interface QueueStatus {
  pending: number;
  processing: number;
  retry: number;
  sent: number;
  failed: number;
  totalActive: number;
}

const getMOTStatus = (motExpiry: string) => {
  const expiry = new Date(motExpiry);
  const today = new Date();
  const daysRemaining = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysRemaining < 0) {
    return { status: "EXPIRED", daysRemaining: 0, color: "text-red-600", bgColor: "bg-red-50", badge: "text-red-700 bg-red-100" };
  } else if (daysRemaining < 14) {
    return { status: "URGENT", daysRemaining, color: "text-amber-600", bgColor: "bg-amber-50", badge: "text-amber-700 bg-amber-100" };
  } else {
    return { status: "VALID", daysRemaining, color: "text-emerald-600", bgColor: "bg-emerald-50", badge: "text-emerald-700 bg-emerald-100" };
  }
};

function GarageRemindersContent() {
  const searchParams = useSearchParams();
  const { addToast } = useToast();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [allCustomers, setAllCustomers] = useState<any[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [customerSearchQuery, setCustomerSearchQuery] = useState("");
  const [customerFilter, setCustomerFilter] = useState<"all" | "has-email" | "has-phone">("all");
  const [sourceFilter, setSourceFilter] = useState<"all" | "manual" | "online">("all");
  const [motFilter, setMotFilter] = useState<"all" | "expired" | "urgent" | "valid">("all");
  const [messageType, setMessageType] = useState<"mot_reminder" | "service_reminder" | "promotional" | "custom">("mot_reminder");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const [sending, setSending] = useState(false);
  const [showMotConfig, setShowMotConfig] = useState(false);
  const [showServiceConfig, setShowServiceConfig] = useState(false);
  const [motReminders, setMotReminders] = useState<number[]>([30]);
  const [serviceReminders, setServiceReminders] = useState<number[]>([]);
  const [motCustomDays, setMotCustomDays] = useState<string>("");
  const [serviceCustomDays, setServiceCustomDays] = useState<string>("");
  const [queueStatus, setQueueStatus] = useState<QueueStatus>({
    pending: 0,
    processing: 0,
    retry: 0,
    sent: 0,
    failed: 0,
    totalActive: 0,
  });
  const [queueLoading, setQueueLoading] = useState(false);

  const getGarageId = async () => {
    let garageId = localStorage.getItem("currentGarageId");
    if (garageId) return garageId;

    const res = await fetch("/api/garages");
    const garages = await res.json();
    if (Array.isArray(garages) && garages[0]?.id) {
      const resolvedGarageId = String(garages[0].id);
      localStorage.setItem("currentGarageId", resolvedGarageId);
      return resolvedGarageId;
    }

    return null;
  };

  const loadQueueStatus = async (garageId: string, silent = true) => {
    if (!garageId) return;

    if (!silent) {
      setQueueLoading(true);
    }

    try {
      const response = await fetch(`/api/email-queue-status?garageId=${garageId}`, {
        cache: "no-store",
        credentials: "include",
      });

      if (!response.ok) {
        if (!silent) {
          console.warn("[Reminders] Queue status unavailable", response.status);
        }
        setQueueStatus({
          pending: 0,
          processing: 0,
          retry: 0,
          sent: 0,
          failed: 0,
          totalActive: 0,
        });
        return;
      }

      const data = await response.json().catch(() => null);
      if (data?.queueStatus) {
        setQueueStatus(data.queueStatus);
      }
    } catch (error) {
      if (!silent) {
        console.warn("[Reminders] Queue status fetch failed", error);
      }
    } finally {
      if (!silent) {
        setQueueLoading(false);
      }
    }
  };

  useEffect(() => {
    loadData();
    loadReminderConfigs();

    const interval = window.setInterval(() => {
      const garageId = localStorage.getItem("currentGarageId");
      if (garageId) {
        loadQueueStatus(garageId);
      }
    }, 10000);

    return () => window.clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      // Get garage ID
      let garageId = localStorage.getItem("currentGarageId");
      
      if (!garageId) {
        const res = await fetch("/api/garages");
        const garages = await res.json();
        if (Array.isArray(garages) && garages[0]?.id) {
          garageId = String(garages[0].id);
          localStorage.setItem("currentGarageId", garageId);
        }
      }

      if (!garageId) {
        console.error("No garage ID found");
        return;
      }

      loadQueueStatus(garageId);

      // Fetch customers with vehicles
      const customersRes = await fetch(`/api/garages/${garageId}/customers`);
      const customers = customersRes.ok ? await customersRes.json() : [];
      console.log("[Reminders] Loaded customers:", customers.length);

      // Extract all vehicles from customers
      const allVehicles: Vehicle[] = [];
      const allCustomers: any[] = [...customers];

      if (Array.isArray(customers)) {
        customers.forEach((customer: any) => {
          if (customer.vehicles && Array.isArray(customer.vehicles)) {
            customer.vehicles.forEach((vehicle: any) => {
              allVehicles.push({
                id: vehicle.id,
                vrm: vehicle.vrm,
                ownerName: customer.name || vehicle.ownerName,
                make: vehicle.make,
                model: vehicle.model,
                motExpiry: vehicle.motExpiry,
              });
            });
          }
        });
      }

      // Also fetch online bookings
      const bookingsRes = await fetch(`/api/garages/${garageId}/bookings`);
      if (bookingsRes.ok) {
        const { bookings } = await bookingsRes.json();
        console.log("[Reminders] Loaded bookings:", Array.isArray(bookings) ? bookings.length : 0);

        if (Array.isArray(bookings)) {
          bookings.forEach((booking: any) => {
            // Add booking customer if not already in list
            const customerExists = allCustomers.some(
              c => c.name?.toLowerCase() === booking.customerName?.toLowerCase()
            );

            if (!customerExists) {
              allCustomers.push({
                id: `booking-${booking.id}`,
                name: booking.customerName || "Unknown",
                email: booking.customerEmail,
                phone: booking.customerPhone,
                source: "ONLINE_BOOKING",
              });
              console.log("[Reminders] Added booking customer:", booking.customerName);
            }

            // Add booking vehicle if has VRM
            if (booking.vehicleVrm) {
              const vehicleExists = allVehicles.some(v => v.vrm === booking.vehicleVrm);
              if (!vehicleExists) {
                allVehicles.push({
                  id: `booking-${booking.id}`,
                  vrm: booking.vehicleVrm,
                  ownerName: booking.customerName || "Unknown",
                  make: booking.vehicleMake || "Unknown",
                  model: booking.vehicleModel || "",
                  motExpiry: booking.bookingDate || new Date().toISOString(),
                });
              }
            }
          });
        }
      }

      console.log("[Reminders] Setting state - customers:", allCustomers.length, "vehicles:", allVehicles.length);
      setAllCustomers(allCustomers);
      setVehicles(allVehicles);
    } catch (error) {
      console.error("Error loading reminders data:", error);
      setVehicles([]);
      setAllCustomers([]);
    }
  };

  const loadReminderConfigs = () => {
    const load = async () => {
      try {
        const garageId = await getGarageId();
        if (garageId) {
          const response = await fetch(`/api/reminder-config?garageId=${garageId}`, { cache: "no-store" });
          if (response.ok) {
            const config = await response.json();
            if (Array.isArray(config.mot) && config.mot.length > 0) {
              setMotReminders(config.mot);
            }
            if (Array.isArray(config.service)) {
              setServiceReminders(config.service);
            }
            return;
          }
        }
      } catch (error) {
        console.error("[Reminders] Failed to load server config", error);
      }

      const saved = localStorage.getItem("reminderConfigs");
      if (saved) {
        const { mot, service } = JSON.parse(saved);
        if (mot) setMotReminders(mot);
        if (service) setServiceReminders(service);
      }
    };

    void load();
  };

  const saveMotConfig = () => {
    const save = async () => {
      const configs = JSON.parse(localStorage.getItem("reminderConfigs") || "{}");
      configs.mot = motReminders;
      if (motCustomDays && !motReminders.includes(parseInt(motCustomDays))) {
        configs.mot = [...motReminders, parseInt(motCustomDays)];
      }
      localStorage.setItem("reminderConfigs", JSON.stringify(configs));

      try {
        const garageId = await getGarageId();
        if (garageId) {
          await fetch("/api/reminder-config", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              garageId,
              mot: configs.mot,
              service: serviceReminders,
              motEnabled: true,
              serviceEnabled: serviceReminders.length > 0,
              taxEnabled: true,
            }),
          });
        }
      } catch (error) {
        console.error("[Reminders] Failed to save MOT config", error);
      }

      setMotCustomDays("");
      setShowMotConfig(false);
      addToast("MOT automation settings saved", "success");
    };

    void save();
  };

  const saveServiceConfig = () => {
    const save = async () => {
      const configs = JSON.parse(localStorage.getItem("reminderConfigs") || "{}");
      configs.service = serviceReminders;
      if (serviceCustomDays && !serviceReminders.includes(parseInt(serviceCustomDays))) {
        configs.service = [...serviceReminders, parseInt(serviceCustomDays)];
      }
      localStorage.setItem("reminderConfigs", JSON.stringify(configs));

      try {
        const garageId = await getGarageId();
        if (garageId) {
          await fetch("/api/reminder-config", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              garageId,
              mot: motReminders,
              service: configs.service,
              motEnabled: true,
              serviceEnabled: configs.service.length > 0,
              taxEnabled: true,
            }),
          });
        }
      } catch (error) {
        console.error("[Reminders] Failed to save service config", error);
      }

      setServiceCustomDays("");
      setShowServiceConfig(false);
      addToast("Service automation settings saved", "success");
    };

    void save();
  };

  const toggleMotReminder = (days: number) => {
    setMotReminders(prev => 
      prev.includes(days) ? prev.filter(d => d !== days) : [...prev, days].sort((a, b) => a - b)
    );
  };

  const toggleServiceReminder = (days: number) => {
    setServiceReminders(prev => 
      prev.includes(days) ? prev.filter(d => d !== days) : [...prev, days].sort((a, b) => a - b)
    );
  };

  const customerEntries: [string, { ownerName: string; vehicleCount: number }][] = [
    ...allCustomers.map((c): [string, { ownerName: string; vehicleCount: number }] => [
      c.name,
      {
        ownerName: c.name,
        vehicleCount: vehicles.filter(v => v.ownerName === c.name).length,
      },
    ]),
    ...vehicles.map((v): [string, { ownerName: string; vehicleCount: number }] => [
      v.ownerName,
      {
        ownerName: v.ownerName,
        vehicleCount: vehicles.filter(vh => vh.ownerName === v.ownerName).length,
      },
    ]),
  ];

  // Get unique customers from all customers + vehicles
  const customers = Array.from(new Map(customerEntries).values());

  console.log("[Reminders] allCustomers:", allCustomers.length, "vehicles:", vehicles.length, "final customers:", customers.length);

  const templates = {
    mot_reminder: {
      subject: "MOT Expiry Reminder - {vrm}",
      message: `Hi {name},\n\nThis is a friendly reminder that the MOT for your {make} {model} ({vrm}) is due to expire on {motExpiry}.\n\nBook your MOT with us today to avoid any inconvenience.\n\nCall us or reply to schedule.\n\nBest regards,\n{garageName}`,
    },
    service_reminder: {
      subject: "Service Reminder - {vrm}",
      message: `Hi {name},\n\nIt's time for your {make} {model} ({vrm}) to have its regular service.\n\nRegular servicing keeps your vehicle running smoothly and helps prevent costly repairs.\n\nContact us to book your service appointment.\n\nBest regards,\n{garageName}`,
    },
    promotional: {
      subject: "Special Offer - Save on Services",
      message: `Hi {name},\n\nWe're offering 15% OFF all services this month!\n\nWhether you need an MOT, service, or repairs - we've got you covered.\n\nBook before month-end to claim your discount.\n\nBest regards,\n{garageName}`,
    },
  };

  const handleTemplateSelect = (type: typeof messageType) => {
    setMessageType(type);
    if (type !== "custom") {
      setSubject(templates[type].subject);
      setMessage(templates[type].message);
    } else {
      setSubject("");
      setMessage("");
    }
  };

  const handleSend = async () => {
    if (selectedCustomers.length === 0) {
      addToast("Please select at least one customer", "error");
      return;
    }
    if (!subject) {
      addToast("Please enter a subject", "error");
      return;
    }
    if (!message) {
      addToast("Please enter a message", "error");
      return;
    }

    setSending(true);
    try {
      const garageId = localStorage.getItem("currentGarageId");
      if (!garageId) {
        addToast("Garage information not found. Please refresh the page.", "error");
        setSending(false);
        return;
      }

      // Send via Resend API
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          garageId,
          channel: "email",
          subject,
          message,
          selectedCustomers,
          scheduledFor: scheduleDate || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || "Failed to send email");
      }

      addToast(data.message, "success");
      setSelectedCustomers([]);
      setSubject("");
      setMessage("");
      setScheduleDate("");
      loadQueueStatus(garageId, false);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send message";
      addToast(`Error: ${errorMessage}`, "error");
      console.error("[Send Message]", error);
    } finally {
      setSending(false);
    }
  };

  const toggleCustomer = (name: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  // Filter customers based on search query and filters
  const getFilteredCustomers = () => {
    let filtered = customers;
    
    // Apply customer contact filter
    if (customerFilter === "has-email") {
      filtered = filtered.filter((c) => {
        const customer = allCustomers.find(ac => ac.name === c.ownerName);
        return customer?.email;
      });
    } else if (customerFilter === "has-phone") {
      filtered = filtered.filter((c) => {
        const customer = allCustomers.find(ac => ac.name === c.ownerName);
        return customer?.phone;
      });
    }
    
    // Apply source filter
    if (sourceFilter === "manual") {
      filtered = filtered.filter((c) => {
        const customer = allCustomers.find(ac => ac.name === c.ownerName);
        return customer?.source !== "ONLINE_BOOKING";
      });
    } else if (sourceFilter === "online") {
      filtered = filtered.filter((c) => {
        const customer = allCustomers.find(ac => ac.name === c.ownerName);
        return customer?.source === "ONLINE_BOOKING";
      });
    }
    
    // Apply MOT filter
    if (motFilter !== "all") {
      filtered = filtered.filter((c) => {
        const customerVehicles = vehicles.filter(v => v.ownerName === c.ownerName);
        return customerVehicles.some(v => {
          const motStatus = getMOTStatus(v.motExpiry);
          if (motFilter === "expired") return motStatus.status === "EXPIRED";
          if (motFilter === "urgent") return motStatus.status === "URGENT";
          if (motFilter === "valid") return motStatus.status === "VALID";
          return true;
        });
      });
    }
    
    // Apply search
    if (customerSearchQuery.trim()) {
      const query = customerSearchQuery.toLowerCase();
      filtered = filtered.filter((customer) =>
        customer.ownerName.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const filteredCustomers = getFilteredCustomers();

  const selectAll = () => {
    setSelectedCustomers(filteredCustomers.map((c) => c.ownerName));
  };

  const clearAll = () => {
    setSelectedCustomers([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reminders</h1>
          <p className="text-gray-600 mt-1">Manage automated MOT and service reminder settings</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Customer Selection & Automation Cards */}
        <div className="lg:col-span-1 space-y-4">
          {/* Customer Selection */}
          <Card className="p-6 bg-linear-to-br from-white to-gray-50">
            <div className="flex items-center gap-2 mb-5">
              <MessageSquare className="w-6 h-6 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Recipients</h2>
            </div>
            <div className="space-y-3 mb-4">
              <p className="text-sm font-semibold text-gray-700">
                {selectedCustomers.length > 0
                  ? `✅ ${selectedCustomers.length} customer${selectedCustomers.length !== 1 ? 's' : ''} selected`
                  : "👥 Select customers to message"}
              </p>
              
              {/* Search Filter */}
              <input
                type="text"
                placeholder="Search customers..."
                value={customerSearchQuery}
                onChange={(e) => setCustomerSearchQuery(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              />
              
              {/* Filter Dropdowns */}
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={customerFilter}
                  onChange={(e) => setCustomerFilter(e.target.value as any)}
                  className="w-full px-2 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="all">All Customers</option>
                  <option value="has-email">Has Email</option>
                  <option value="has-phone">Has Phone</option>
                </select>
                
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value as any)}
                  className="w-full px-2 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="all">All Sources</option>
                  <option value="manual">Manual</option>
                  <option value="online">Online Booking</option>
                </select>
              </div>
              
              <select
                value={motFilter}
                onChange={(e) => setMotFilter(e.target.value as any)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="all">All MOT Status</option>
                <option value="expired">❌ Expired</option>
                <option value="urgent">⚠️ Urgent (14d)</option>
                <option value="valid">✅ Valid</option>
              </select>
              
              <div className="flex gap-2">
                <button
                  onClick={selectAll}
                  className="flex-1 px-3 py-1.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-all"
                >
                  Select All
                </button>
                <button
                  onClick={clearAll}
                  className="flex-1 px-3 py-1.5 text-xs font-semibold bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="space-y-0.5 max-h-64 overflow-y-auto border border-gray-200 rounded-xl p-2 bg-white">
              {filteredCustomers.map((customer) => (
                <label
                  key={customer.ownerName}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50 cursor-pointer transition-all"
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                    selectedCustomers.includes(customer.ownerName)
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-300 hover:border-blue-400"
                  }`}>
                    {selectedCustomers.includes(customer.ownerName) && (
                      <span className="text-white text-xs font-bold">✓</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{customer.ownerName}</p>
                    <p className="text-xs text-gray-500">{customer.vehicleCount} vehicle{customer.vehicleCount !== 1 ? 's' : ''}</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.ownerName)}
                    onChange={() => toggleCustomer(customer.ownerName)}
                    className="hidden"
                  />
                </label>
              ))}
              {filteredCustomers.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-8">
                  {customerSearchQuery ? "No customers match your search" : "No customers available"}
                </p>
              )}
            </div>
          </Card>

          {/* Automation Cards - Compact */}
          <Card className="p-6 bg-linear-to-br from-blue-50 via-blue-50 to-indigo-50 border-blue-200 shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900">Auto MOT Reminders</h3>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              {motReminders.length > 0 
                ? `⏰ Reminders at: ${motReminders.sort((a, b) => a - b).join(", ")} days` 
                : "📋 No reminders configured"}
            </p>
            <button 
              onClick={() => setShowMotConfig(true)}
              className="w-full px-4 py-2.5 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
              ⚙️ Configure
            </button>
          </Card>

          <Card className="p-6 bg-linear-to-br from-green-50 via-green-50 to-emerald-50 border-green-200 shadow-md hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900">Service Reminders</h3>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              {serviceReminders.length > 0 
                ? `⏰ Reminders at: ${serviceReminders.sort((a, b) => a - b).join(", ")} month${serviceReminders.length !== 1 ? 's' : ''}` 
                : "📋 No reminders configured"}
            </p>
            <button 
              onClick={() => setShowServiceConfig(true)}
              className="w-full px-4 py-2.5 text-sm font-semibold bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg">
              ⚙️ Configure
            </button>
          </Card>
        </div>

        {/* Right Column: Message Composer */}
        <div className="lg:col-span-2 space-y-4">
          {/* Email Section Removed */}

          {/* Queue Status */}
          <Card className="p-6 bg-linear-to-br from-white to-gray-50">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-gray-900">Delivery Queue</h3>
              </div>
              <button
                onClick={() => {
                  const garageId = localStorage.getItem("currentGarageId");
                  if (garageId) {
                    loadQueueStatus(garageId, false);
                  }
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                disabled={queueLoading}
              >
                {queueLoading ? "Refreshing..." : "Refresh"}
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                <p className="text-xs text-amber-700 font-semibold">Pending</p>
                <p className="text-xl font-bold text-amber-800">{queueStatus.pending}</p>
              </div>
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                <p className="text-xs text-blue-700 font-semibold">Processing</p>
                <p className="text-xl font-bold text-blue-800">{queueStatus.processing}</p>
              </div>
              <div className="rounded-lg border border-purple-200 bg-purple-50 p-3">
                <p className="text-xs text-purple-700 font-semibold">Retry</p>
                <p className="text-xl font-bold text-purple-800">{queueStatus.retry}</p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-xs text-emerald-700 font-semibold">Sent</p>
                <p className="text-xl font-bold text-emerald-800">{queueStatus.sent}</p>
              </div>
              <div className="rounded-lg border border-red-200 bg-red-50 p-3">
                <p className="text-xs text-red-700 font-semibold">Failed</p>
                <p className="text-xl font-bold text-red-800">{queueStatus.failed}</p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Active jobs: <span className="font-semibold text-gray-700">{queueStatus.totalActive}</span> • Auto-refresh every 10 seconds
            </p>
          </Card>

          {/* Templates */}
          <Card className="p-6 bg-linear-to-br from-white to-gray-50">
            <h3 className="font-bold text-gray-900 mb-4">Message Templates</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "mot_reminder", label: "🔴 MOT Reminder", desc: "MOT expiry" },
                { id: "service_reminder", label: "🟡 Service Reminder", desc: "Service due" },
                { id: "promotional", label: "🟢 Promotional", desc: "Special offer" },
                { id: "custom", label: "✏️ Custom", desc: "Write your own" },
              ].map(({ id, label, desc }) => (
                <button
                  key={id}
                  onClick={() => handleTemplateSelect(id as typeof messageType)}
                  className={`p-3 rounded-xl border-2 transition-all text-left ${
                    messageType === id
                      ? "bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                  }`}
                >
                  <p className="font-semibold text-gray-900 text-sm">{label}</p>
                  <p className="text-xs text-gray-600">{desc}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Subject */}
          <Card className="p-6 bg-linear-to-br from-white to-gray-50">
            <label className="block text-sm font-bold text-gray-900 mb-3">
              📝 Email Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Enter an engaging subject line..."
            />
          </Card>

          {/* Message Body */}
          <Card className="p-6 bg-linear-to-br from-white to-gray-50">
            <label className="block text-sm font-bold text-gray-900 mb-3">
              💌 Message Content
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-40 resize-none"
              placeholder="Enter your message here..."
            />
            <p className="text-xs text-gray-500 mt-3">
              💡 <span className="font-semibold">Dynamic variables:</span> {"{name}"}, {"{vrm}"}, {"{make}"}, {"{model}"}, {"{motExpiry}"}, {"{garageName}"}
            </p>
          </Card>

          {/* Schedule */}
          <Card className="p-6 bg-linear-to-br from-white to-gray-50">
            <label className="block text-sm font-bold text-gray-900 mb-3">
              ⏱️ Schedule Send (Optional)
            </label>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 mt-2">Leave empty to send immediately.</p>
          </Card>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={sending || selectedCustomers.length === 0}
            className="w-full px-6 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 text-lg"
          >
            <Send className="w-6 h-6" />
            {sending ? "Sending..." : scheduleDate ? "Schedule Email" : "Send Email"}
          </button>
        </div>
      </div>

      {/* MOT Reminder Configuration Modal */}
      {showMotConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Configure MOT Reminders</h3>
              <p className="text-sm text-gray-600">Select when to send MOT reminders before expiry</p>
              
              <div className="space-y-3">
                {[30, 14, 7].map((days) => (
                  <label key={days} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={motReminders.includes(days)}
                      onChange={() => toggleMotReminder(days)}
                      className="w-4 h-4 rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{days} days before</p>
                      <p className="text-xs text-gray-500">Send reminder {days} days before MOT expires</p>
                    </div>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom days (optional)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={motCustomDays}
                    onChange={(e) => setMotCustomDays(e.target.value)}
                    placeholder="e.g., 60"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      if (motCustomDays && !motReminders.includes(parseInt(motCustomDays))) {
                        toggleMotReminder(parseInt(motCustomDays));
                        setMotCustomDays("");
                      }
                    }}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={saveMotConfig}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowMotConfig(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Service Reminder Configuration Modal */}
      {showServiceConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Configure Service Reminders</h3>
              <p className="text-sm text-gray-600">Select service intervals for reminders</p>
              
              <div className="space-y-3">
                {[6, 12, 24].map((months) => (
                  <label key={months} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                    <input
                      type="checkbox"
                      checked={serviceReminders.includes(months)}
                      onChange={() => toggleServiceReminder(months)}
                      className="w-4 h-4 rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-900">Every {months} months</p>
                      <p className="text-xs text-gray-500">Remind customers for {months}-month service intervals</p>
                    </div>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom interval (optional)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={serviceCustomDays}
                    onChange={(e) => setServiceCustomDays(e.target.value)}
                    placeholder="e.g., 3"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={() => {
                      if (serviceCustomDays && !serviceReminders.includes(parseInt(serviceCustomDays))) {
                        toggleServiceReminder(parseInt(serviceCustomDays));
                        setServiceCustomDays("");
                      }
                    }}
                    className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={saveServiceConfig}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowServiceConfig(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

export default function GarageRemindersPage() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-600">Loading...</div>}>
      <GarageRemindersContent />
    </Suspense>
  );
}
