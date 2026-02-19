"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/Card";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: 9,
    description: "Perfect for mobile mechanics and sole traders",
    features: [
      "1 user account",
      "Up to 50 vehicles",
      "Basic job management",
      "Invoice & quotes",
      "DVLA/DVSA vehicle lookup",
      "Email support",
    ],
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: 29,
    description: "Best for small to medium independent garages",
    features: [
      "Up to 5 users",
      "Up to 500 vehicles",
      "Full job & CRM management",
      "Advanced invoicing & quotes",
      "Unlimited DVLA/DVSA lookups",
      "Campaign & reminder automation",
      "Analytics & reporting",
      "Priority email support",
    ],
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    price: 49,
    description: "For established garages and chains",
    features: [
      "Unlimited users",
      "Unlimited vehicles",
      "Everything in Professional",
      "Multi-location support",
      "Advanced analytics",
      "API access",
      "White-label options",
      "Priority phone & email support",
      "Dedicated account manager",
    ],
    popular: false,
  },
];

function ChoosePlanContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const signupId = searchParams.get("id");

  const [selectedPlan, setSelectedPlan] = useState<string>("professional");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!signupId) {
      router.push("/signup");
    }
  }, [signupId, router]);

  const handleSelectPlan = async () => {
    if (!signupId) return;

    setLoading(true);
    setMessage(null);

    try {
      // Update signup with selected plan
      const response = await fetch(`/api/garage-signups/${signupId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedPlan: selectedPlan,
        }),
      });

      if (!response.ok) {
        setMessage("Failed to save plan selection");
        return;
      }

      // Redirect to payment/confirmation based on plan
      if (selectedPlan === "starter" || selectedPlan === "professional" || selectedPlan === "business") {
        setMessage("Plan selected! Redirecting to dashboard...");
        // In a real app, you'd redirect to Stripe checkout or dashboard
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      setMessage("Failed to save plan selection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Choose Your Plan</h1>
          <p className="text-lg text-slate-600 mb-2">
            Select the plan that best fits your garage needs
          </p>
          <p className="text-sm font-semibold text-blue-600">
            ✨ First 14 days free - no card required
          </p>
        </header>

        {message && (
          <Card className="max-w-2xl mx-auto mb-6 p-4 bg-blue-50 border-blue-200 text-blue-700 text-center">
            {message}
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className="cursor-pointer"
            >
            <Card
              className={`relative p-6 transition-all ${
                selectedPlan === plan.id
                  ? "border-2 border-blue-600 shadow-lg"
                  : "border border-slate-200 hover:border-blue-300"
              } ${plan.popular ? "ring-2 ring-blue-500 ring-opacity-50" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-black text-slate-900">£{plan.price}</span>
                  <span className="text-slate-600">/month</span>
                </div>
                <p className="text-sm text-slate-600">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-center">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selectedPlan === plan.id
                      ? "border-blue-600 bg-blue-600"
                      : "border-slate-300"
                  }`}
                >
                  {selectedPlan === plan.id && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
              </div>
            </Card>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={handleSelectPlan}
            disabled={loading || !selectedPlan}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-lg font-bold text-lg transition-colors shadow-lg"
          >
            {loading ? "Processing..." : "Start 14-Day Free Trial"}
          </button>
          <p className="text-sm text-slate-500 mt-4">
            No credit card required • Cancel anytime • Full access during trial
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="p-6 bg-slate-50 border-slate-200">
            <h4 className="font-bold text-slate-900 mb-3">Frequently Asked Questions</h4>
            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <strong>Can I change plans later?</strong>
                <p className="text-slate-600">Yes, you can upgrade or downgrade anytime from your dashboard.</p>
              </div>
              <div>
                <strong>What happens after the trial?</strong>
                <p className="text-slate-600">We'll send you a reminder before the trial ends. You can add payment details or cancel anytime.</p>
              </div>
              <div>
                <strong>Do you offer discounts for annual billing?</strong>
                <p className="text-slate-600">Yes! Save 2 months with annual billing. Contact us for details.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function ChoosePlanPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" /></div>}>
      <ChoosePlanContent />
    </Suspense>
  );
}
