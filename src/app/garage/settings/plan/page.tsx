"use client";

import { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { PlanUpgradeModal } from "@/components/ui/PlanUpgradeModal";
import { getPlanLabel, getTrialStatus } from "@/lib/plans";
import { Zap, Loader2, CreditCard, FileText, Download, ExternalLink } from "lucide-react";
import { formatUKDate } from "@/lib/uk-date";

interface Garage {
  id: string;
  name: string;
  plan: string;
  status: string;
  trialEndsAt?: string | null;
}

interface PaymentMethod {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  cardholderName: string | null;
}

interface Invoice {
  id: string;
  number: string;
  amountDue: number;
  amountPaid: number;
  currency: string;
  status: string;
  created: number;
  hostedInvoiceUrl: string | null;
  invoicePdf: string | null;
  description: string;
}

interface UpcomingInvoice {
  amountDue: number;
  currency: string;
  periodEnd: number;
  nextPaymentAttempt: number | null;
}

interface BillingData {
  paymentMethod: PaymentMethod | null;
  invoices: Invoice[];
  upcomingInvoice: UpcomingInvoice | null;
}

export default function PlanSettings() {
  const [garage, setGarage] = useState<Garage | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [refreshingPlan, setRefreshingPlan] = useState(false);
  const [billingData, setBillingData] = useState<BillingData | null>(null);
  const [billingLoading, setBillingLoading] = useState(true);
  const [updatingCard, setUpdatingCard] = useState(false);

  const trialStatus = useMemo(() => {
    if (!garage?.trialEndsAt || garage.status !== "TRIAL") return null;
    return getTrialStatus(new Date(garage.trialEndsAt));
  }, [garage]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const cached = localStorage.getItem("garage-data");
        if (cached) {
          const current = JSON.parse(cached);
          setGarage(current);
        } else {
          const res = await fetch("/api/garages");
          const data = await res.json();
          if (data[0]) {
            setGarage(data[0]);
          }
        }
      } catch (error) {
        console.error("Error loading garage:", error);
      } finally {
        setLoading(false);
      }
    };
    
    const loadBillingData = async () => {
      try {
        console.log("[Plan Page] 🔍 Fetching billing data...");
        const res = await fetch("/api/stripe/billing");
        console.log("[Plan Page] Response status:", res.status);
        const data = await res.json();
        console.log("[Plan Page] ✓ Billing data received:", {
          hasPaymentMethod: !!data.paymentMethod,
          invoiceCount: data.invoices?.length || 0,
          paymentMethod: data.paymentMethod,
          firstInvoice: data.invoices?.[0]
        });
        setBillingData(data);
      } catch (error) {
        console.error("[Plan Page] ❌ Error loading billing data:", error);
      } finally {
        setBillingLoading(false);
      }
    };
    
    loadData();
    loadBillingData();

    const readFlag = () => {
      try {
        const v = localStorage.getItem("garage-refreshing");
        setRefreshingPlan(v === "true");
      } catch (e) {
        setRefreshingPlan(false);
      }
    };

    readFlag();

    const onStorage = (ev: StorageEvent) => {
      if (ev.key === "garage-refreshing") readFlag();
    };
    const onStart = () => setRefreshingPlan(true);
    const onEnd = () => setRefreshingPlan(false);

    window.addEventListener("storage", onStorage);
    window.addEventListener("garage-refresh-start", onStart as EventListener);
    window.addEventListener("garage-refresh-end", onEnd as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("garage-refresh-start", onStart as EventListener);
      window.removeEventListener("garage-refresh-end", onEnd as EventListener);
    };
  }, []);

  const handleUpdateCard = async () => {
    setUpdatingCard(true);
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to open billing portal');
      }
      
      // Redirect to Stripe billing portal
      window.location.href = data.url;
    } catch (error) {
      console.error('Error opening billing portal:', error);
      alert(error instanceof Error ? error.message : 'Failed to open billing portal');
      setUpdatingCard(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Subscription & Billing</h2>
        <p className="text-slate-500 mt-1">Manage your subscription plan and billing</p>
      </div>

      <PlanUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        currentPlan={garage?.plan}
        currentStatus={garage?.status}
        garageId={garage?.id ?? ""}
        isRefreshing={false}
      />

      <Card className="overflow-hidden">
        <div className="p-4 lg:p-6 bg-linear-to-r from-blue-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center ring-1 ring-white/10">
                <Zap size={28} fill="currentColor" />
              </div>
              <div>
                <p className="text-sm font-bold">
                  {garage?.plan ? `${getPlanLabel(garage.plan)} Plan` : "Starter Plan"}
                </p>
                <p className="text-xs opacity-90">
                  {garage?.status === "TRIAL" && trialStatus
                    ? `${trialStatus.daysRemaining} days left in your trial.`
                    : "Active subscription"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowUpgradeModal(true)}
              disabled={loading || refreshingPlan}
              className="bg-white text-blue-700 px-6 py-3 rounded-lg text-sm font-bold hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 transition-colors"
            >
              {refreshingPlan ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Updating…</span>
                </>
              ) : (
                <>{garage?.plan === "TRIAL" ? "Upgrade Now" : "Change Plan"}</>
              )}
            </button>
          </div>
        </div>

        <div className="p-4 lg:p-6 border-t border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4">What's included in your plan</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-medium text-slate-900">Full job management</p>
                <p className="text-sm text-slate-500">Track all your jobs with complete workflow</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-medium text-slate-900">DVSA integrations</p>
                <p className="text-sm text-slate-500">MOT, tax, battery, tyre checks and recalls</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-medium text-slate-900">Automated reminders</p>
                <p className="text-sm text-slate-500">MOT, tax & service reminders</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-emerald-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="font-medium text-slate-900">Customer management</p>
                <p className="text-sm text-slate-500">Complete customer database with history</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">Payment Method</h3>
          <button 
            onClick={handleUpdateCard}
            disabled={updatingCard || !billingData?.paymentMethod}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {updatingCard ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Opening...
              </>
            ) : (
              <>
                <CreditCard size={16} />
                Update Card
              </>
            )}
          </button>
        </div>
        
        {billingLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full" />
          </div>
        ) : billingData?.paymentMethod ? (
          <>
            <div className="bg-linear-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center">
                    <CreditCard size={20} />
                  </div>
                  <span className="text-sm font-medium opacity-75">{billingData.paymentMethod.brand.toUpperCase()}</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs opacity-60 mb-1">Card Number</p>
                    <p className="text-lg tracking-wider font-mono">•••• •••• •••• {billingData.paymentMethod.last4}</p>
                  </div>
                  
                  <div className="flex gap-8">
                    <div>
                      <p className="text-xs opacity-60 mb-1">Card Holder</p>
                      <p className="text-sm font-medium">{billingData.paymentMethod.cardholderName || garage?.name || 'Garage Owner'}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-60 mb-1">Expires</p>
                      <p className="text-sm font-medium">
                        {String(billingData.paymentMethod.expMonth).padStart(2, '0')}/{String(billingData.paymentMethod.expYear).slice(-2)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4">
                  {billingData.paymentMethod.brand === 'visa' && (
                    <svg className="w-12 h-8" viewBox="0 0 48 32" fill="white">
                      <text x="4" y="22" fontSize="16" fontWeight="bold">VISA</text>
                    </svg>
                  )}
                  {billingData.paymentMethod.brand === 'mastercard' && (
                    <svg className="w-12 h-8" viewBox="0 0 48 32" fill="none">
                      <circle cx="15" cy="16" r="12" fill="rgba(235, 0, 27, 0.8)" />
                      <circle cx="33" cy="16" r="12" fill="rgba(255, 95, 0, 0.8)" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            
            {billingData.upcomingInvoice && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 mt-0.5">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-blue-900">Upcoming bill</p>
                    <p className="text-sm text-blue-700 mt-1">
                      £{(billingData.upcomingInvoice.amountDue / 100).toFixed(2)} {billingData.upcomingInvoice.currency.toUpperCase()} on{' '}
                      {formatUKDate(billingData.upcomingInvoice.periodEnd * 1000, { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
            <CreditCard className="mx-auto mb-3 text-slate-400" size={32} />
            <p className="text-slate-600 font-medium">No payment method on file</p>
            <p className="text-sm text-slate-500 mt-1">Add a payment method when you upgrade your plan</p>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900">Billing History</h3>
        </div>
        
        {billingLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full" />
          </div>
        ) : billingData?.invoices && billingData.invoices.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Bill number</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Date issued</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Description</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Amount</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {billingData.invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-3 px-4 text-sm text-slate-900 font-mono">
                        {invoice.number || invoice.id.slice(-8)}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">
                        {formatUKDate(invoice.created * 1000, { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600">{invoice.description}</td>
                      <td className="py-3 px-4 text-sm text-slate-900 font-semibold text-right">
                        £{(invoice.amountDue / 100).toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          invoice.status === 'paid' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : invoice.status === 'open'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-800'
                        }`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        {invoice.invoicePdf && (
                          <a 
                            href={invoice.invoicePdf} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 p-1 inline-block" 
                            title="Download invoice"
                          >
                            <Download size={16} />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex items-center justify-between pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Need help? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">Contact support</a>
              </p>
              {billingData.invoices[0]?.hostedInvoiceUrl && (
                <a 
                  href={billingData.invoices[0].hostedInvoiceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                >
                  View billing portal
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-slate-500">
            <FileText className="inline-block mb-2 opacity-40" size={32} />
            <p className="font-medium">No billing history yet</p>
            <p className="text-sm mt-2">Your invoices will appear here once you upgrade</p>
          </div>
        )}
      </Card>
    </div>
  );
}
