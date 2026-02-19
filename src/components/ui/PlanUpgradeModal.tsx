"use client";

import { useEffect, useState } from "react";
import { X, CreditCard, Check, Loader2 } from "lucide-react";
import { Card } from "./Card";
import { normalizePlanId } from "@/lib/plans";

interface PlanUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: string;
  currentStatus?: string;
  garageId: string;
  isRefreshing?: boolean;
}

export function PlanUpgradeModal({ isOpen, onClose, currentPlan = "TRIAL", currentStatus, garageId, isRefreshing = false }: PlanUpgradeModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "professional" | "business">("professional");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isTrialStatus = String(currentStatus || "").toUpperCase() === "TRIAL";
  const normalizedCurrentPlan = isTrialStatus ? null : normalizePlanId(currentPlan);

  // `isRefreshing` is passed in as a prop to indicate polling/refresh state

  useEffect(() => {
    if (!isOpen) return;
    setSelectedPlan(normalizePlanId(currentPlan) ?? "starter");
    setError(null);
    
    // Check for missing garageId when modal opens
    if (!garageId || garageId.trim() === "") {
      setError("Garage data not loaded. Please close this dialog and try again in a moment.");
    }
  }, [isOpen, normalizedCurrentPlan, currentPlan, garageId]);

  if (!isOpen) return null;

  const plans = {
    starter: {
      name: "Starter",
      price: 9,
      features: [
        "1 user account",
        "Up to 50 vehicles",
        "Basic job management",
        "Invoice & quotes",
        "DVLA/DVSA vehicle lookup",
        "Email support",
      ],
    },
    professional: {
      name: "Professional",
      price: 29,
      features: [
        "Up to 5 users",
        "Up to 500 vehicles",
        "Full job & CRM management",
        "Advanced invoicing & quotes",
        "Campaign & reminder automation",
        "Analytics & reporting",
        "Priority email support",
      ],
    },
    business: {
      name: "Business",
      price: 49,
      features: [
        "Unlimited users & vehicles",
        "Multi-location support",
        "Advanced analytics",
        "API access",
        "White-label options",
        "Priority phone & email support",
        "Dedicated account manager",
      ],
    },
  };

  const handleUpgrade = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!garageId) {
        setError("Garage ID is missing. Please refresh the page and try again.");
        setLoading(false);
        return;
      }

      // Call Stripe checkout API (route is /api/stripe/checkout)
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan: selectedPlan,
          garageId,
        }),
      });

      // Handle auth errors explicitly
      if (response.status === 401 || response.status === 403) {
        try { localStorage.removeItem("user"); } catch (e) {}
        // Redirect to login for re-auth
        window.location.href = "/login";
        return;
      }

      const contentType = response.headers.get("content-type") || "";
      let data: any = null;

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // Non-JSON response (HTML error page or redirect) — read as text for debugging
        const text = await response.text();
        throw new Error(text || "Unexpected response from server");
      }

      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err: any) {
      console.error('Upgrade error:', err);
      setError(err.message || 'Failed to start checkout. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 flex items-center justify-center z-200 p-2 sm:p-4">
      <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-xl md:text-2xl font-bold">Upgrade Your Plan</h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Choose the plan that best fits your garage
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 transition-colors p-2 -m-2 shrink-0"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4 md:p-8">
          {isRefreshing && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-lg text-blue-700 flex items-center gap-3">
              <Loader2 size={18} className="animate-spin" />
              <span className="text-sm font-medium">Updating plan status…</span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
            {(Object.keys(plans) as Array<keyof typeof plans>).map((planKey) => {
              const plan = plans[planKey];
              const isSelected = selectedPlan === planKey;
              const isCurrentPlan = normalizedCurrentPlan === planKey;

              return (
                <div
                  key={planKey}
                  onClick={() => !isCurrentPlan && !isRefreshing && setSelectedPlan(planKey)}
                  className={`p-4 md:p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    // If this is the user's current plan, show a solid colored card
                    isCurrentPlan
                      ? "bg-blue-600 border-blue-700 text-white cursor-not-allowed"
                      : isSelected
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 hover:border-blue-300 bg-white"
                  }`}
                >
                  {planKey === "professional" && (
                    <div className="inline-block bg-blue-600 text-white text-xs font-bold px-2 sm:px-3 py-1 rounded-full mb-3">
                      MOST POPULAR
                    </div>
                  )}
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-3xl md:text-4xl font-extrabold">£{plan.price}</span>
                    <span className={`${isCurrentPlan ? 'text-white/90' : 'text-slate-500'} text-sm md:text-base`}>/month</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-emerald-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {isCurrentPlan && (
                    <div className="mt-4 bg-white/10 text-white text-center py-2 rounded-lg font-semibold text-sm">
                      Current Plan
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleUpgrade}
            disabled={loading || isRefreshing || normalizedCurrentPlan === selectedPlan || !garageId || garageId.trim() === ""}
            className="w-full bg-blue-600 text-white py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-13"
          >
            {loading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard size={20} />
                Upgrade to {plans[selectedPlan].name} - £{plans[selectedPlan].price}/month
              </>
            )}
          </button>

          <p className="text-center text-sm text-slate-500 mt-4">
            Secure payment powered by Stripe. Cancel anytime. No hidden fees.
          </p>
        </div>
      </Card>
    </div>
  );
}
