// Plan configuration and limits

export type PlanId = "starter" | "professional" | "business";

export interface PlanLimits {
  id: PlanId;
  name: string;
  price: number;
  maxUsers: number;
  maxVehicles: number;
  features: {
    basicJobManagement: boolean;
    advancedInvoicing: boolean;
    campaignAutomation: boolean;
    analytics: boolean;
    multiLocation: boolean;
    apiAccess: boolean;
    whiteLabel: boolean;
    prioritySupport: boolean;
  };
}

export const PLANS: Record<PlanId, PlanLimits> = {
  starter: {
    id: "starter",
    name: "Starter",
    price: 9,
    maxUsers: 1,
    maxVehicles: 200,
    features: {
      basicJobManagement: true,
      advancedInvoicing: false,
      campaignAutomation: false,
      analytics: false,
      multiLocation: false,
      apiAccess: false,
      whiteLabel: false,
      prioritySupport: false,
    },
  },
  professional: {
    id: "professional",
    name: "Professional",
    price: 29,
    maxUsers: 5,
    maxVehicles: 500,
    features: {
      basicJobManagement: true,
      advancedInvoicing: true,
      campaignAutomation: true,
      analytics: true,
      multiLocation: false,
      apiAccess: false,
      whiteLabel: false,
      prioritySupport: true,
    },
  },
  business: {
    id: "business",
    name: "Business",
    price: 49,
    maxUsers: 999999, // Unlimited
    maxVehicles: 999999, // Unlimited
    features: {
      basicJobManagement: true,
      advancedInvoicing: true,
      campaignAutomation: true,
      analytics: true,
      multiLocation: true,
      apiAccess: true,
      whiteLabel: true,
      prioritySupport: true,
    },
  },
};

export const TRIAL_DAYS = 14;

export type PlanCode = "TRIAL" | "BASIC" | "PRO" | "BUSINESS";

export function normalizePlanId(plan: string | null | undefined): PlanId | null {
  if (!plan) return null;
  const normalized = plan.toLowerCase();
  if (normalized === "trial") return null;
  if (normalized === "basic" || normalized === "starter") return "starter";
  if (normalized === "pro" || normalized === "professional") return "professional";
  if (normalized === "business") return "business";
  return null;
}

export function getPlanLabel(plan: string | null | undefined): string {
  if (!plan) return "Starter";
  const normalized = plan.toLowerCase();
  if (normalized === "trial") return "Free Trial";
  if (normalized === "basic" || normalized === "starter") return "Starter";
  if (normalized === "pro" || normalized === "professional") return "Professional";
  if (normalized === "business") return "Business";
  return "Starter";
}

// Helper to get plan limits
export function getPlanLimits(planId: string | null | undefined): PlanLimits {
  const normalized = normalizePlanId(planId);
  if (!normalized) {
    return PLANS.starter;
  }

  return PLANS[normalized];
}

// Check if feature is available on plan
export function hasFeature(planId: string, feature: keyof PlanLimits["features"]): boolean {
  const plan = getPlanLimits(planId);
  return plan.features[feature];
}

// Check if trial has expired
export function isTrialExpired(trialEndsAt: Date | null): boolean {
  if (!trialEndsAt) return false;
  return new Date() > trialEndsAt;
}

// Check if garage can add more vehicles
export function canAddVehicle(currentCount: number, planId: string): boolean {
  const plan = getPlanLimits(planId);
  return currentCount < plan.maxVehicles;
}

// Check if garage can add more users
export function canAddUser(currentCount: number, planId: string): boolean {
  const plan = getPlanLimits(planId);
  return currentCount < plan.maxUsers;
}

// Get remaining vehicle slots
export function getRemainingVehicles(currentCount: number, planId: string): number {
  const plan = getPlanLimits(planId);
  return Math.max(0, plan.maxVehicles - currentCount);
}

// Format trial status
export function getTrialStatus(trialEndsAt: Date | null): { 
  active: boolean; 
  daysRemaining: number; 
  expired: boolean;
} {
  if (!trialEndsAt) {
    return { active: false, daysRemaining: 0, expired: false };
  }

  const now = new Date();
  const ended = trialEndsAt;
  const diffMs = ended.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  return {
    active: daysRemaining > 0,
    daysRemaining: Math.max(0, daysRemaining),
    expired: daysRemaining <= 0,
  };
}
