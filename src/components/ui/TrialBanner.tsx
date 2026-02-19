"use client";

import { AlertTriangle, Crown, TrendingUp } from "lucide-react";
import { getTrialStatus, getPlanLimits } from "@/lib/plans";

interface TrialBannerProps {
  trialEndsAt: Date | null;
  currentPlan: string;
  status: string;
  onViewPlans?: () => void;
}

export default function TrialBanner({
  trialEndsAt,
  currentPlan,
  status,
  onViewPlans,
}: TrialBannerProps) {
  // Only show trial banner if status is TRIAL and trial has date set
  if (String(status).toUpperCase() !== "TRIAL" || !trialEndsAt) return null;

  const trial = getTrialStatus(trialEndsAt);
  const plan = getPlanLimits(currentPlan);

  // Trial expired
  if (trial.expired) {
    return (
      <div className="print:hidden bg-red-600 text-white px-3 py-3 lg:ml-64">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <AlertTriangle size={18} className="shrink-0 mt-0.5 sm:mt-0" />
            <div className="text-sm">
              <span className="font-bold">Trial Expired</span>
              <span className="ml-2">Your trial has ended. Please add payment details to continue.</span>
            </div>
          </div>
          <button
            onClick={onViewPlans}
            className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition-colors cursor-pointer text-sm shrink-0 w-full sm:w-auto"
          >
            Add Payment
          </button>
        </div>
      </div>
    );
  }

  // Trial ending soon (3 days or less)
  if (trial.daysRemaining <= 3) {
    return (
      <div className="print:hidden bg-amber-600 text-white px-3 py-3 lg:ml-64">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-2 sm:gap-3">
            <AlertTriangle size={18} className="shrink-0 mt-0.5 sm:mt-0" />
            <div className="text-sm">
              <span className="font-bold">{trial.daysRemaining} days left</span>
              <span className="ml-1">in your {plan.name} trial</span>
            </div>
          </div>
          <button
            onClick={onViewPlans}
            className="bg-white text-amber-600 px-4 py-2 rounded-lg font-bold hover:bg-amber-50 transition-colors cursor-pointer text-sm shrink-0 w-full sm:w-auto"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    );
  }

  // Active trial
  return (
    <div className="print:hidden bg-blue-600 text-white px-3 py-3 lg:ml-64">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3">
          <Crown size={18} className="shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-sm">
            <span className="font-bold">{trial.daysRemaining} days remaining</span>
            <span className="ml-1">in your {plan.name} trial</span>
            <span className="ml-1 text-blue-100">(£{plan.price}/month after)</span>
          </div>
        </div>
        <button
          onClick={onViewPlans}
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors text-sm cursor-pointer shrink-0 w-full sm:w-auto"
        >
          View Plans
        </button>
      </div>
    </div>
  );
}
