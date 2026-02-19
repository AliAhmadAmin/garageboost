"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Download,
  Mail,
  DollarSign,
  Calendar,
  CheckCircle,
  AlertCircle,
  CreditCard,
  Printer,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { vehicleTitle } from "@/lib/vehicle";
import { useToast } from "@/components/ui/Toast";
import Link from "next/link";
import { formatUKDate } from "@/lib/uk-date";

interface JobItem {
  id: string;
  type: "PART" | "LABOR" | "SERVICE";
  name: string;
  description: string | null;
  quantity: number;
  unitPricePence: number;
  totalPence: number;
}

interface Vehicle {
  id: string;
  vrm: string;
  make: string;
  model: string;
  ownerName: string;
  ownerPhone: string | null;
  ownerEmail: string | null;
}

interface Job {
  id: string;
  jobNumber: string;
  type: string;
  description: string | null;
  bookedDate: string | null;
  source?: string;
  vatRate?: number;
  items: JobItem[];
  vehicle: Vehicle;
  garage?: {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  };
}

interface Payment {
  id: string;
  amountPence: number;
  method: string;
  reference: string | null;
  notes: string | null;
  createdAt: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  status: string;
  issuedDate: string;
  dueDate: string;
  paidDate: string | null;
  subtotalPence: number;
  vatPence: number;
  totalPence: number;
  paidPence: number;
  balancePence: number;
  paymentMethod: string | null;
  notes: string | null;
  source?: string;
  job: Job;
  payments: Payment[];
}

const statusColors: Record<string, string> = {
  UNPAID: "bg-red-100 text-red-800 border-red-300",
  PARTIALLY_PAID: "bg-orange-100 text-orange-800 border-orange-300",
  PAID: "bg-green-100 text-green-800 border-green-300",
  OVERDUE: "bg-purple-100 text-purple-800 border-purple-300",
  CANCELLED: "bg-gray-100 text-gray-800 border-gray-300",
};

const statusIcons: Record<string, any> = {
  UNPAID: AlertCircle,
  PARTIALLY_PAID: DollarSign,
  PAID: CheckCircle,
  OVERDUE: AlertCircle,
  CANCELLED: FileText,
};

export default function InvoiceViewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { addToast } = useToast();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendingEmail, setSendingEmail] = useState(false);

  useEffect(() => {
    loadInvoice();
  }, [id]);

  // Refresh invoice data when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        loadInvoice();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [id]);

  const loadInvoice = async () => {
    try {
      const res = await fetch(`/api/invoices/${id}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (!res.ok) throw new Error("Failed to load invoice");
      const data = await res.json();
      setInvoice(data);
    } catch (error) {
      console.error("Error loading invoice:", error);
      addToast("Failed to load invoice", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmail = async () => {
    if (!invoice) return;

    if (!invoice.job.vehicle.ownerEmail) {
      addToast("Customer email not found", "error");
      return;
    }

    if (!confirm("Send invoice to customer email?")) return;

    setSendingEmail(true);
    try {
      const res = await fetch(`/api/invoices/${invoice.id}/email`, {
        method: "POST",
      });

      if (!res.ok) throw new Error("Failed to send email");

      addToast("Invoice email sent successfully!", "success");
    } catch (error) {
      console.error("Error sending email:", error);
      addToast("Failed to send invoice email", "error");
    } finally {
      setSendingEmail(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading invoice...</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900">Invoice Not Found</h2>
          <p className="text-slate-600 mt-2">
            The invoice you're looking for doesn't exist.
          </p>
          <Link
            href="/garage/jobs"
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const StatusIcon = statusIcons[invoice.status];

  return (
    <div className="space-y-4 md:space-y-6 max-w-5xl mx-auto px-4 md:px-0">
      {/* Header Actions - Hidden on Print */}
      <div className="print:hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <Link
          href={`/garage/jobs/${invoice.job.jobNumber}`}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm md:text-base"
        >
          <ArrowLeft size={18} className="md:w-5 md:h-5" />
          <span>Back to Job</span>
        </Link>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial px-3 md:px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <Printer size={16} className="md:w-4.5 md:h-4.5" />
            <span className="hidden sm:inline">Print</span>
            <span className="sm:hidden">🖨️</span>
          </button>
          <button
            onClick={handleSendEmail}
            disabled={sendingEmail || !invoice.job.vehicle.ownerEmail}
            className="flex-1 sm:flex-initial px-3 md:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
          >
            <Mail size={16} className="md:w-4.5 md:h-4.5" />
            {sendingEmail ? "Sending..." : <><span className="hidden sm:inline">Email Invoice</span><span className="sm:hidden">Email</span></>}
          </button>
        </div>
      </div>

      {/* Invoice Document */}
      <Card className="p-4 md:p-6 lg:p-8 print:shadow-none bg-white max-w-4xl mx-auto">
        {/* Top Section: Company Info & Logo */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-6 md:mb-8 pb-4 md:pb-6 border-b-4 border-blue-900 gap-4">
          <div className="flex-1 w-full md:w-auto">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
              {invoice.job.garage?.name || "Garage Boost"}
            </h2>
            <div className="text-xs md:text-sm text-slate-600 space-y-0">
              {invoice.job.garage?.address && (
                <p>{invoice.job.garage.address}</p>
              )}
              {invoice.job.garage?.phone && (
                <p>Tel: {invoice.job.garage.phone}</p>
              )}
              {invoice.job.garage?.email && (
                <p className="break-all">{invoice.job.garage.email}</p>
              )}
            </div>
          </div>
          
          {/* Invoice Title */}
          <div className="flex-1 flex flex-col items-start md:items-end w-full md:w-auto">
            <div className="text-left md:text-right w-full">
              <div className="flex items-center justify-start md:justify-end gap-2 mb-1">
                <h1 className="text-2xl md:text-4xl font-bold text-blue-900 leading-tight">INVOICE</h1>
                {(invoice.source === "ONLINE_BOOKING" || invoice.job.source === "ONLINE_BOOKING") && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full whitespace-nowrap print:hidden" title="From online booking">
                    🌐 Online
                  </span>
                )}
                {(invoice.job.vatRate ?? 20) === 0 && (
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full whitespace-nowrap print:hidden" title="VAT disabled in garage settings">
                    VAT OFF
                  </span>
                )}
              </div>
              <p className="text-xs md:text-sm text-slate-600 font-mono mt-1">{invoice.invoiceNumber}</p>
            </div>
          </div>
        </div>

        {/* Billed To & Invoice Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          <div>
            <h3 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-2 md:mb-3 border-b-2 border-blue-900 pb-2">
              Billed To
            </h3>
            <div className="space-y-1 text-xs md:text-sm">
              <p className="font-bold text-slate-900">{invoice.job.vehicle.ownerName}</p>
              {invoice.job.vehicle.ownerEmail && (
                <p className="text-slate-600">{invoice.job.vehicle.ownerEmail}</p>
              )}
              {invoice.job.vehicle.ownerPhone && (
                <p className="text-slate-600">{invoice.job.vehicle.ownerPhone}</p>
              )}
            </div>
          </div>

          <div>
            <div className="space-y-2 text-xs md:text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 font-semibold">Receipt #</span>
                <span className="font-mono font-bold text-slate-900">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-semibold">Receipt date</span>
                <span className="font-semibold text-slate-900">
                  {formatUKDate(invoice.issuedDate)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-semibold">Due Date</span>
                <span className="font-semibold text-slate-900">
                  {formatUKDate(invoice.dueDate)}
                </span>
              </div>
              {invoice.job.jobNumber && (
                <div className="flex justify-between">
                  <span className="text-slate-600 font-semibold">Job Ref</span>
                  <span className="font-mono font-bold text-slate-900">{invoice.job.jobNumber}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="invoice-items-wrap mb-6 -mx-4 md:mx-0 overflow-x-auto">
          <table className="invoice-items-table w-full table-fixed min-w-full">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="text-left py-2 md:py-3 px-2 md:px-3 font-bold text-xs md:text-sm uppercase tracking-wide">QTY</th>
                <th className="text-left py-2 md:py-3 px-2 md:px-3 font-bold text-xs md:text-sm uppercase tracking-wide">Description</th>
                <th className="text-right py-2 md:py-3 px-2 md:px-3 font-bold text-xs md:text-sm uppercase tracking-wide">Unit Price</th>
                <th className="text-right py-2 md:py-3 px-2 md:px-3 font-bold text-xs md:text-sm uppercase tracking-wide">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.job.items.map((item) => (
                <tr key={item.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-2 md:py-3 px-2 md:px-3 text-center font-semibold text-slate-900 text-xs md:text-sm">{item.quantity}</td>
                  <td className="py-2 md:py-3 px-2 md:px-3">
                    <p className="font-semibold text-slate-900 text-xs md:text-sm">{item.name}</p>
                    {item.description && (
                      <p className="text-[10px] md:text-xs text-slate-600 mt-1">{item.description}</p>
                    )}
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-3 text-right text-slate-900 font-semibold text-xs md:text-sm">
                    £{(item.unitPricePence / 100).toFixed(2)}
                  </td>
                  <td className="py-2 md:py-3 px-2 md:px-3 text-right text-slate-900 font-bold text-xs md:text-sm">
                    £{(item.totalPence / 100).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="w-full flex justify-end mb-6 md:mb-8">
          <div className="w-full md:w-96 space-y-2 text-xs md:text-sm">
            <div className="flex justify-between text-slate-700">
              <span className="font-semibold">Subtotal</span>
              <span className="font-semibold text-slate-900">
                £{(invoice.subtotalPence / 100).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-slate-700">
              <span className="font-semibold">Sales Tax ({invoice.job.vatRate ?? 20}%)</span>
              <span className="font-semibold text-slate-900">
                £{(invoice.vatPence / 100).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between bg-blue-900 text-white py-2 px-3 rounded font-bold text-sm md:text-base">
              <span>Total (GBP)</span>
              <span>£{(invoice.totalPence / 100).toFixed(2)}</span>
            </div>
            {invoice.paidPence > 0 && (
              <>
                <div className="flex justify-between text-green-700 font-semibold text-[10px] md:text-xs pt-2">
                  <span>Amount Paid:</span>
                  <span>-£{(invoice.paidPence / 100).toFixed(2)}</span>
                </div>
                {invoice.balancePence > 0 && (
                  <div className="flex justify-between text-red-700 font-bold text-[10px] md:text-xs">
                    <span>Balance Due:</span>
                    <span>£{(invoice.balancePence / 100).toFixed(2)}</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Payment History - Keep but on new page */}
        {invoice.payments && invoice.payments.length > 0 && (
          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t-2 border-slate-200 print:break-before-page">
            <h3 className="text-xs md:text-sm font-bold text-blue-900 uppercase tracking-widest mb-2 md:mb-3 border-b-2 border-blue-900 pb-2">
              Payment History
            </h3>
            <div className="-mx-4 md:mx-0 overflow-x-auto">
              <table className="w-full min-w-125 md:min-w-0 text-[10px] md:text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300">
                    <th className="text-left py-2 px-2 md:px-3 font-semibold text-slate-700">Date</th>
                    <th className="text-left py-2 px-2 md:px-3 font-semibold text-slate-700">Method</th>
                    <th className="text-left py-2 px-2 md:px-3 font-semibold text-slate-700">Reference</th>
                    <th className="text-right py-2 px-2 md:px-3 font-semibold text-slate-700">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-slate-100">
                      <td className="py-2 px-2 md:px-3">
                      {formatUKDate(payment.createdAt)}
                    </td>
                    <td className="py-2 px-2 md:px-3">
                      <span className="px-1.5 md:px-2 py-0.5 md:py-1 bg-slate-100 text-slate-700 text-[10px] md:text-xs font-semibold rounded">
                        {payment.method}
                      </span>
                    </td>
                    <td className="py-2 px-2 md:px-3 text-slate-600">{payment.reference || "-"}</td>
                    <td className="py-2 px-2 md:px-3 text-right font-semibold text-green-600">
                      £{(payment.amountPence / 100).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}

        {/* Notes Section */}
        {invoice.notes && (
          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-slate-200">
            <h3 className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-2">Notes</h3>
            <p className="text-xs md:text-sm text-slate-700">{invoice.notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 md:mt-8 pt-3 md:pt-4 text-center text-[10px] md:text-xs text-slate-600">
          <p className="font-semibold">Thank you for your business!</p>
        </div>
      </Card>

      <style jsx global>{`
        @media print {
          /* Page setup */
          @page {
            margin: 1cm;
            size: A4;
          }
          
          /* Body reset */
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          /* Hide elements marked with print:hidden */
          .print\\:hidden {
            display: none !important;
          }
          
          /* Remove shadows and borders from card */
          .print\\:shadow-none {
            box-shadow: none !important;
            border: none !important;
            overflow: visible !important;
          }
          
          /* Page break control */
          .print\\:break-before-page {
            break-before: page;
          }
          
          /* Ensure colors are preserved */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Table styles */
          table {
            page-break-inside: avoid;
            border-collapse: collapse;
          }

          /* Keep invoice items header/rows full width in print */
          .invoice-items-wrap {
            margin-left: 0 !important;
            margin-right: 0 !important;
            overflow: visible !important;
            width: 100% !important;
          }

          .invoice-items-table {
            display: table !important;
            width: 100% !important;
            min-width: 100% !important;
            max-width: 100% !important;
            table-layout: fixed;
          }

          .invoice-items-table thead {
            display: table-header-group !important;
          }

          .invoice-items-table tbody {
            display: table-row-group !important;
          }

          .invoice-items-table tr {
            display: table-row !important;
            page-break-inside: avoid;
          }

          .invoice-items-table th,
          .invoice-items-table td {
            display: table-cell !important;
            color: #0f172a !important;
            background: transparent !important;
            visibility: visible !important;
          }

          .invoice-items-table thead th {
            color: #ffffff !important;
            background-color: #0f3d91 !important;
          }
          
          thead {
            display: table-header-group;
          }
          
          tr {
            page-break-inside: avoid;
          }
          
          /* Prevent orphans and widows */
          h1, h2, h3 {
            page-break-after: avoid;
          }
          
          p {
            orphans: 3;
            widows: 3;
          }
        }
      `}</style>
    </div>
  );
}
