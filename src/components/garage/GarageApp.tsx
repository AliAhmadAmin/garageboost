"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Coins,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Settings,
  Users,
  Zap,
  Trash2,
  Edit,
  Send,
  FileText,
  TrendingUp,
  AlertTriangle,
  X,
  Mail,
  MessageSquare,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { vehicleTitle } from "@/lib/vehicle";
import { PlanUpgradeModal } from "@/components/ui/PlanUpgradeModal";
import { getPlanLabel } from "@/lib/plans";

interface Advisory {
  id?: string;
  text: string;
  category: string;
  estPricePence: number;
}

interface Vehicle {
  id: string;
  vrm: string;
  make: string;
  model: string;
  motExpiry: string;
  ownerName: string;
  lastService?: string | null;
  mileage?: number | null;
  advisories: Advisory[];
}

interface Garage {
  id: string;
  name: string;
  ownerName: string;
  plan: string;
  status: string;
}

interface LookupResult {
  vrm: string;
  make: string;
  model: string;
  firstReg: string;
  fuel: string;
  color: string;
  motStatus: string;
  motExpiry: string;
  mileage: number;
  advisories: Advisory[];
}

interface Analytics {
  totalVehicles: number;
  expiringSoon: number;
  totalRevenuePotential: number;
  remindersSent: number;
  remindersPending: number;
  conversionRate: number;
}

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toISOString().slice(0, 10);
};

const Navbar = ({
  activeTab,
  setActiveTab,
  onLogout,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}) => (
  <nav className="fixed bottom-0 left-0 right-0 lg:left-0 lg:top-0 lg:h-screen lg:w-64 bg-slate-900 text-white p-4 z-50 flex lg:flex-col items-center lg:items-stretch justify-around lg:justify-between gap-2">
    <div className="flex lg:flex-col items-center lg:items-stretch gap-2">
      <div className="hidden lg:flex items-center gap-2 mb-8 px-2 py-4 border-b border-slate-800">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
          <Zap size={24} fill="currentColor" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight">Garage Boost</h1>
        </div>
      </div>

      {[
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "lookup", label: "Vehicle Lookup", icon: Search },
        { id: "customers", label: "Customers", icon: Users },
        { id: "reminders", label: "Reminders", icon: Bell },
        { id: "settings", label: "Settings", icon: Settings },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col lg:flex-row items-center gap-2 lg:gap-3 p-3 rounded-lg transition-all ${
            activeTab === item.id
              ? "bg-blue-600 text-white"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <item.icon size={20} />
          <span className="text-[10px] lg:text-sm font-medium">{item.label}</span>
        </button>
      ))}
    </div>

    <button
      onClick={onLogout}
      className="hidden lg:flex items-center gap-3 p-3 w-full rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-all border-t border-slate-800"
    >
      <LogOut size={20} />
      <span className="text-sm font-medium">Logout</span>
    </button>
  </nav>
);

const Dashboard = ({ vehicles, setActiveTab, garage, analytics }: { vehicles: Vehicle[]; setActiveTab: (tab: string) => void; garage: Garage | null; analytics: Analytics | null }) => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
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
    alert("Reminder scheduled successfully!");
  };

  return (
    <div className="space-y-6">
      <PlanUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentPlan={garage?.plan}
        garageId={garage?.id ?? ""}
        isRefreshing={false}
      />

      {garage?.status === "TRIAL" && (
        <div className="bg-linear-to-r from-amber-50 to-orange-50 border-2 border-amber-200 p-4 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <Clock size={20} className="text-amber-700" />
            </div>
            <div>
              <p className="font-bold text-amber-900">14 days left in your free trial</p>
              <p className="text-sm text-amber-700">
                Upgrade now to unlock unlimited features and SMS reminders
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
          >
            Upgrade Now
          </button>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome back, {garage?.name || 'Garage'}!</h2>
          <p className="text-slate-500 text-sm">
            Revenue identified this month: <span className="font-bold text-emerald-600">£{((analytics?.totalRevenuePotential || 0) / 100).toFixed(2)}</span>
          </p>
        </div>
        <button
          onClick={() => setActiveTab("lookup")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700"
        >
          <Search size={18} /> New Lookup
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none">
          <Coins className="opacity-80 mb-4" size={24} />
          <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Identified Revenue</p>
          <h3 className="text-4xl font-bold mt-1">£{(recoverableRevenue / 100).toFixed(2)}</h3>
        </Card>
        <Card className="p-6">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg w-fit mb-4">
            <Calendar size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">MOTs Expiring Soon</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">{expiringSoon.length}</h3>
        </Card>
        <Card className="p-6">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg w-fit mb-4">
            <Users size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Customers</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">{analytics?.totalVehicles || 0}</h3>
        </Card>
        <Card className="p-6">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg w-fit mb-4">
            <TrendingUp size={24} />
          </div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Conversion Rate</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-1">{analytics?.conversionRate || 0}%</h3>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-amber-500" size={20} />
              <h3 className="font-bold text-slate-900">Action Required</h3>
            </div>
            <span className="text-sm text-slate-500">{expiringSoon.length} urgent</span>
          </div>
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            {expiringSoon.length > 0 ? (
              expiringSoon.map((vehicle) => {
                const daysLeft = Math.ceil(
                  (new Date(vehicle.motExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                );
                return (
                  <div
                    key={vehicle.id}
                    className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-yellow-400 border-2 border-slate-900 rounded px-2 py-0.5 font-bold text-xs">
                          {vehicle.vrm}
                        </span>
                        <span className="text-xs text-amber-600 font-semibold">
                          {daysLeft} days left
                        </span>
                      </div>
                      <h4 className="font-bold text-sm">
                        {vehicleTitle(vehicle)}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {vehicle.ownerName} • Expires: {formatDate(vehicle.motExpiry)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSendReminder(vehicle.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-2 rounded-lg font-semibold flex items-center gap-1"
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
        <Card>
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold">Recent Activity</h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">View All</button>
          </div>
          <div className="p-4 space-y-4">
            {vehicles.slice(0, 5).map((v) => (
              <div key={v.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <FileText className="text-blue-600" size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {vehicleTitle(v)}
                  </p>
                  <p className="text-xs text-slate-500">{v.vrm} added to database</p>
                </div>
                <span className="text-xs text-slate-400">Today</span>
              </div>
            ))}
            {vehicles.length === 0 && (
              <div className="text-center py-8">
                <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-slate-300 mb-2">
                  <Search size={20} />
                </div>
                <p className="text-sm text-slate-500">No activity yet. Start by looking up a vehicle.</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

const VehicleLookup = ({ onSave, garageId }: { onSave: (result: LookupResult) => void; garageId?: string }) => {
  const [vrm, setVrm] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LookupResult | null>(null);
  const [showQuote, setShowQuote] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!vrm) return;
    setLoading(true);
    const response = await fetch("/api/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vrm }),
    });
    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  const totalEstimate = result?.advisories.reduce((sum, a) => sum + a.estPricePence, 0) || 0;
  const motPrice = 5485;
  const grandTotal = totalEstimate + motPrice;

  const generateQuotePDF = () => {
    alert("PDF quote generation would be implemented here with a library like jsPDF");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="p-10 mb-8 border-none shadow-xl shadow-blue-50">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">Vehicle Revenue Finder</h2>
          <p className="text-slate-500 mt-2">Enter VRM to find jobs your customers aren&apos;t booking yet.</p>
        </div>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="ENTER VRM"
            className="flex-1 bg-yellow-400 border-2 border-slate-900 text-slate-900 px-6 py-4 rounded-xl text-2xl font-black text-center placeholder:text-slate-700 tracking-tighter uppercase"
            value={vrm}
            onChange={(event) => setVrm(event.target.value.toUpperCase())}
          />
          <button
            type="submit"
            className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Search size={20} />
            )}
            Search
          </button>
        </form>
      </Card>

      {result && (
        <>
          <Card className="animate-in fade-in slide-in-from-bottom-5 duration-500 mb-6">
            <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {result.make}{result.model && ` ${result.model}`}
                </h3>
                <p className="text-sm text-slate-500">
                  {result.vrm}{result.color && ` • ${result.color}`}{result.fuel && ` • ${result.fuel}`}{result.firstReg && ` • First Reg: ${result.firstReg}`}
                </p>
              </div>
              <button
                onClick={() => onSave(result)}
                disabled={!garageId}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 disabled:opacity-60"
              >
                <Plus size={18} /> Save Customer
              </button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">MOT Status</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      new Date(result.motExpiry) > new Date() ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                  />
                  <p className="text-lg font-bold">{result.motStatus}</p>
                </div>
                <p className="text-sm text-slate-500">Expires: {formatDate(result.motExpiry)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Mileage</p>
                <p className="text-xl font-bold">{result.mileage.toLocaleString()} mi</p>
                <p className="text-sm text-slate-500">~7,400 mi/year</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Advisories Found</p>
                <p className="text-xl font-bold text-blue-600">{result.advisories.length}</p>
                <p className="text-sm text-slate-500">Potential work</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. Total Revenue</p>
                <p className="text-xl font-bold text-emerald-600">£{(grandTotal / 100).toFixed(2)}</p>
                <p className="text-sm text-slate-500">MOT + Repairs</p>
              </div>
            </div>
          </Card>

          {result.advisories.length > 0 && (
            <Card className="mb-6">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <AlertTriangle className="text-blue-500" size={24} />
                    Smart Advisory Analysis
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    These items were flagged in the last MOT and may need attention
                  </p>
                </div>
                <button
                  onClick={() => setShowQuote(!showQuote)}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700 flex items-center gap-2"
                >
                  <FileText size={18} /> {showQuote ? "Hide" : "Generate"} Quote
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {result.advisories.map((advisory, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-blue-200 text-blue-900 text-xs font-bold px-2 py-1 rounded">
                            {advisory.category}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-900">{advisory.text}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-500">Est. Price</p>
                        <p className="text-xl font-bold text-emerald-600">£{(advisory.estPricePence / 100).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {showQuote && (
            <Card className="animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="p-6 bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                <h3 className="text-2xl font-bold mb-2">Professional Quote</h3>
                <p className="text-blue-100">Ready to send to your customer</p>
              </div>
              <div className="p-8">
                <div className="mb-6">
                  <h4 className="font-bold text-slate-900 mb-2">Vehicle Details</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Registration</p>
                      <p className="font-semibold">{result.vrm}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Vehicle</p>
                      <p className="font-semibold">
                        {result.make}{result.model && ` ${result.model}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-6">
                  <h4 className="font-bold text-slate-900 mb-4">Recommended Work</h4>
                  <table className="w-full">
                    <thead className="text-left text-xs text-slate-500 uppercase">
                      <tr>
                        <th className="pb-2">Item</th>
                        <th className="pb-2 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr className="border-t border-slate-100">
                        <td className="py-3">MOT Test</td>
                        <td className="text-right font-semibold">£{(motPrice / 100).toFixed(2)}</td>
                      </tr>
                      {result.advisories.map((advisory, i) => (
                        <tr key={i} className="border-t border-slate-100">
                          <td className="py-3">{advisory.text}</td>
                          <td className="text-right font-semibold">£{(advisory.estPricePence / 100).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-slate-300 font-bold">
                        <td className="py-4 text-lg">Total</td>
                        <td className="text-right text-2xl text-emerald-600">£{(grandTotal / 100).toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-slate-600">
                    <strong>Note:</strong> This is an estimated quote. Final price may vary based on inspection. Quote valid for 30 days.
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={generateQuotePDF}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={() => alert("Email functionality would integrate with your email provider")}
                    className="flex-1 bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail size={18} /> Email Quote
                  </button>
                </div>
              </div>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default function GarageApp() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [garage, setGarage] = useState<Garage | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      if (
        process.env.NODE_ENV === "development" &&
        process.env.NEXT_PUBLIC_ENABLE_AUTO_SEED === "true"
      ) {
        await fetch("/api/seed", { method: "POST", credentials: "include" });
      }
      let resolvedGarage: Garage | null = null;
      const storedGarage = typeof window !== "undefined"
        ? localStorage.getItem("garage-data")
        : null;

      if (storedGarage) {
        try {
          const parsed = JSON.parse(storedGarage) as Garage;
          if (parsed?.id) {
            const garageRes = await fetch(`/api/garages/${parsed.id}`);
            if (garageRes.ok) {
              resolvedGarage = await garageRes.json();
            }
          }
        } catch (error) {
          console.warn("Failed to parse stored garage data:", error);
        }
      }

      if (!resolvedGarage) {
        const garageRes = await fetch("/api/garages/me");
        const garageData: Garage | { error?: string } = await garageRes.json();
        resolvedGarage = "id" in garageData ? garageData : null;
      }
      setGarage(resolvedGarage);
      if (resolvedGarage) {
        const vehiclesRes = await fetch(`/api/vehicles?garageId=${resolvedGarage.id}`);
        const vehiclesData = await vehiclesRes.json();
        setVehicles(Array.isArray(vehiclesData) ? vehiclesData : []);

        const analyticsRes = await fetch(`/api/analytics?garageId=${resolvedGarage.id}`);
        const analyticsData = await analyticsRes.json();
        setAnalytics(analyticsData);
      }
    };
    load();
  }, []);

  const showNotif = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleSaveVehicle = async (result: LookupResult) => {
    if (!garage) return;
    const response = await fetch("/api/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        vrm: result.vrm,
        make: result.make,
        model: result.model,
        motExpiry: result.motExpiry,
        ownerName: "New Client",
        mileage: result.mileage,
        garageId: garage.id,
        advisories: result.advisories.map((advisory) => ({
          text: advisory.text,
          category: advisory.category,
          estPricePence: advisory.estPricePence,
        })),
      }),
    });

    const saved = await response.json();
    setVehicles((prev) => [saved, ...prev]);
    showNotif("Customer saved! Revenue tracked and reminders scheduled.");
    setActiveTab("crm");
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    await fetch(`/api/vehicles/delete?id=${id}`, { method: "DELETE" });
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    showNotif("Customer deleted successfully.");
  };

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout?")) {
      return;
    }

    try {
      // Call logout API to clear session
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      // Clear local storage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("garage-id");
        localStorage.removeItem("garage-data");
        // Redirect to home page
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Still redirect even if logout API fails
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      <main className="flex-1 lg:ml-64 p-6 lg:p-12 pb-24 lg:pb-12">
        <div className="max-w-7xl mx-auto">
          {activeTab === "dashboard" && <Dashboard vehicles={vehicles} setActiveTab={setActiveTab} garage={garage} analytics={analytics} />}
          {activeTab === "lookup" && <VehicleLookup onSave={handleSaveVehicle} garageId={garage?.id} />}
          {activeTab === "crm" && (
            <div className="space-y-6">
              <header className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Customer & Vehicle Management</h2>
                  <p className="text-slate-500 text-sm">{vehicles.length} customers in database</p>
                </div>
                <button
                  onClick={() => setActiveTab("lookup")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2"
                >
                  <Plus size={18} /> Add Customer
                </button>
              </header>
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase text-slate-500 tracking-widest">
                      <tr>
                        <th className="p-4 px-6">VRM</th>
                        <th className="p-4 px-6">Vehicle</th>
                        <th className="p-4 px-6">Owner</th>
                        <th className="p-4 px-6">MOT Expiry</th>
                        <th className="p-4 px-6">Revenue Potential</th>
                        <th className="p-4 px-6">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {vehicles.map((vehicle) => {
                        const revenue = vehicle.advisories.reduce((sum, a) => sum + a.estPricePence, 0) + 5485;
                        const daysUntilExpiry = Math.ceil(
                          (new Date(vehicle.motExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                        );
                        const isUrgent = daysUntilExpiry > 0 && daysUntilExpiry < 30;

                        return (
                          <tr key={vehicle.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="p-4 px-6">
                              <span className="bg-yellow-400 border-2 border-slate-900 rounded px-2 py-1 font-bold text-xs">
                                {vehicle.vrm}
                              </span>
                            </td>
                            <td className="p-4 px-6 text-sm">
                              <strong>{vehicleTitle(vehicle)}</strong>
                              {vehicle.mileage && (
                                <p className="text-xs text-slate-500">{vehicle.mileage.toLocaleString()} mi</p>
                              )}
                            </td>
                            <td className="p-4 px-6 text-sm">{vehicle.ownerName}</td>
                            <td className="p-4 px-6 text-sm">
                              <div className="flex items-center gap-2">
                                {formatDate(vehicle.motExpiry)}
                                {isUrgent && (
                                  <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                                    {daysUntilExpiry}d
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-4 px-6 text-sm font-bold text-emerald-600">£{(revenue / 100).toFixed(2)}</td>
                            <td className="p-4 px-6">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => alert("Edit functionality - would open modal to edit vehicle details")}
                                  className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded transition-colors"
                                  title="Edit"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteVehicle(vehicle.id)}
                                  className="text-rose-600 hover:text-rose-700 p-2 hover:bg-rose-50 rounded transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                                <button
                                  onClick={() => {
                                    alert(`Send reminder to ${vehicle.ownerName} for ${vehicle.vrm}`);
                                  }}
                                  className="text-emerald-600 hover:text-emerald-700 p-2 hover:bg-emerald-50 rounded transition-colors"
                                  title="Send Reminder"
                                >
                                  <Send size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                      {vehicles.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-12 text-center">
                            <div className="inline-flex flex-col items-center">
                              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                                <Users className="text-slate-400" size={32} />
                              </div>
                              <p className="font-semibold text-slate-900 mb-1">No customers yet</p>
                              <p className="text-sm text-slate-500 mb-4">Start by looking up a vehicle to add your first customer</p>
                              <button
                                onClick={() => setActiveTab("lookup")}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
                              >
                                Add First Customer
                              </button>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
          {activeTab === "reminders" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <header>
                <h2 className="text-2xl font-bold">Reminder Automation</h2>
                <p className="text-slate-500 text-sm mt-1">
                  Automated SMS and email reminders keep your customers coming back
                </p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Send className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">{analytics?.remindersSent || 0}</h3>
                  <p className="text-sm text-slate-500 mt-1">Reminders Sent</p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="text-amber-600" size={24} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">{analytics?.remindersPending || 0}</h3>
                  <p className="text-sm text-slate-500 mt-1">Scheduled</p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="text-emerald-600" size={24} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">18.4%</h3>
                  <p className="text-sm text-slate-500 mt-1">Conversion Rate</p>
                </Card>
              </div>

              <Card className="p-8">
                <Bell className="mx-auto text-blue-600 mb-4" size={48} />
                <h3 className="text-xl font-bold text-center">Automatic Reminder Schedule</h3>
                <p className="text-slate-500 mt-2 text-center max-w-2xl mx-auto">
                  We automatically send reminders to your customers at the perfect time
                </p>
                <div className="mt-8 space-y-4">
                  {[
                    { days: 30, type: "Email", message: "Gentle reminder about upcoming MOT" },
                    { days: 14, type: "SMS + Email", message: "Reminder with booking link" },
                    { days: 7, type: "SMS", message: "Urgent reminder - MOT expires soon" },
                  ].map((reminder, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg"
                    >
                      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                        {reminder.days}d
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                            {reminder.type}
                          </span>
                        </div>
                        <p className="font-semibold text-slate-900">{reminder.message}</p>
                      </div>
                      <CheckCircle2 className="text-emerald-500" size={24} />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Manual Reminder</h3>
                <p className="text-slate-500 text-sm mb-4">
                  Send an immediate reminder to a specific customer
                </p>
                <div className="flex gap-3">
                  <select className="flex-1 border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select a customer...</option>
                    {vehicles.map((v) => (
                      <option key={v.id} value={v.id}>
                          {v.vrm} - {v.ownerName} - {vehicleTitle(v)}
                        </option>
                    ))}
                  </select>
                  <button
                    onClick={() => alert("Manual reminder sent!")}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
                  >
                    <MessageSquare size={18} /> Send Now
                  </button>
                </div>
              </Card>
            </div>
          )}
          {activeTab === "settings" && (
            <div className="max-w-3xl mx-auto space-y-6">
              <Card className="p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold">Subscription & Billing</h3>
                </div>
                <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center">
                      <Zap size={28} fill="currentColor" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-900">
                        {garage?.plan ? `${getPlanLabel(garage.plan)} Plan` : "Starter Plan"}
                      </p>
                      <p className="text-xs text-blue-700">
                        {garage?.status === "TRIAL" ? "14 days left. Full features unlocked." : "Active subscription"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => alert("Upgrade modal would open")}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-blue-700"
                  >
                    {garage?.plan === "TRIAL" ? "Upgrade Now" : "Change Plan"}
                  </button>
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-xl font-bold mb-6">Garage Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Garage Name</label>
                    <input
                      type="text"
                      defaultValue={garage?.name}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Owner Name</label>
                    <input
                      type="text"
                      defaultValue={garage?.ownerName}
                      className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="garage@example.com"
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue="0800 123 4567"
                        className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800">
                    Save Changes
                  </button>
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-xl font-bold mb-6">Notification Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: "Email notifications for new customers", checked: true },
                    { label: "SMS confirmation when reminders are sent", checked: true },
                    { label: "Weekly revenue summary report", checked: false },
                    { label: "Urgent MOT expiry alerts", checked: true },
                  ].map((setting, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={setting.checked}
                        className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm">{setting.label}</span>
                    </label>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>

      {showNotification && (
        <div className="fixed bottom-24 lg:bottom-12 right-6 z-100 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right fade-in duration-300">
          <CheckCircle2 size={24} />
          <div>
            <p className="font-bold">{notificationMessage.split("!")[0]}!</p>
            {notificationMessage.split("!")[1] && (
              <p className="text-sm opacity-90">{notificationMessage.split("!")[1]}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
