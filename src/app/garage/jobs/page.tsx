"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, FileText, Clock, CheckCircle, DollarSign, Search, Filter, Trash2, Eye } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { vehicleTitle } from "@/lib/vehicle";
import { useToast, ToastContainer } from "@/components/ui/Toast";
import { formatUKDate } from "@/lib/uk-date";

interface Job {
  id: string;
  jobNumber: string;
  type: string;
  status: string;
  description: string;
  bookedDate: string;
  totalPence: number;
  source?: string;
  vehicle: {
    vrm: string;
    make: string;
    model: string;
    ownerName: string;
  };
  invoice?: {
    id: string;
    invoiceNumber: string;
    status: string;
  };
  createdAt: string;
}

const statusColors: Record<string, string> = {
  TODO: "bg-blue-100 text-blue-800 border-blue-300",
  DOING: "bg-orange-100 text-orange-800 border-orange-300",
  DONE: "bg-green-100 text-green-800 border-green-300",
  // Legacy statuses for backwards compatibility
  BOOKED: "bg-blue-100 text-blue-800 border-blue-300",
  IN_PROGRESS: "bg-orange-100 text-orange-800 border-orange-300",
  COMPLETED: "bg-green-100 text-green-800 border-green-300",
  INVOICED: "bg-purple-100 text-purple-800 border-purple-300",
  PAID: "bg-emerald-100 text-emerald-800 border-emerald-300",
  CANCELLED: "bg-red-100 text-red-800 border-red-300",
};

const statusIcons: Record<string, any> = {
  TODO: Clock,
  DOING: Clock,
  DONE: CheckCircle,
  // Legacy
  BOOKED: Clock,
  IN_PROGRESS: Clock,
  COMPLETED: CheckCircle,
  INVOICED: FileText,
  PAID: DollarSign,
  CANCELLED: FileText,
};

const statusLabels: Record<string, string> = {
  TODO: "TO DO",
  DOING: "WORKING",
  DONE: "COMPLETE",
  // Legacy
  BOOKED: "Booked",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  INVOICED: "Invoiced",
  PAID: "Paid",
  CANCELLED: "Cancelled",
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [garageId, setGarageId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  // Auto-refresh every 15 seconds to catch new jobs from converted bookings
  useEffect(() => {
    if (!garageId) return;

    const interval = setInterval(() => {
      loadData();
    }, 15000); // 15 seconds

    return () => clearInterval(interval);
  }, [garageId]);

  // Refresh when tab becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && garageId) {
        loadData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [garageId]);

  const loadData = async () => {
    try {
      let resolvedGarageId: string | null = null;

      try {
        const cached = localStorage.getItem("garage-data");
        if (cached) {
          const parsed = JSON.parse(cached);
          resolvedGarageId = parsed?.id || null;
        }
      } catch (error) {
        resolvedGarageId = null;
      }

      if (!resolvedGarageId) {
        const garagesRes = await fetch("/api/garages");
        if (garagesRes.ok) {
          const garages = await garagesRes.json();
          if (Array.isArray(garages) && garages[0]?.id) {
            resolvedGarageId = garages[0].id;
            try {
              localStorage.setItem("garage-data", JSON.stringify(garages[0]));
            } catch (error) {
              // Ignore storage failures
            }
          }
        }
      }

      setGarageId(resolvedGarageId || null);

      if (resolvedGarageId) {
        const jobsRes = await fetch(`/api/jobs?garageId=${resolvedGarageId}`, {
          cache: 'no-store',
          credentials: 'include',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const jobsData = await jobsRes.json();
        setJobs(Array.isArray(jobsData) ? jobsData : []);
      }
    } catch (error) {
      console.error("Failed to load jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (job: Job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    if (deleteLoading) return;
    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  const confirmDeleteJob = async () => {
    if (!jobToDelete) return;
    setDeleteLoading(true);
    try {
      const res = await fetch(`/api/jobs/${jobToDelete.id}`, { method: "DELETE" });
      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j.id !== jobToDelete.id));
        localStorage.setItem("jobs-updated-at", Date.now().toString());
        window.dispatchEvent(new Event("jobs-updated"));
        addToast("Job deleted successfully", "success");
      } else {
        addToast("Failed to delete job", "error");
      }
    } catch {
      addToast("Error deleting job", "error");
    } finally {
      setDeleteLoading(false);
      closeDeleteModal();
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesStatus = filterStatus === "ALL" || job.status === filterStatus;
    const matchesSearch =
      job.jobNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.vehicle.vrm.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.vehicle.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const stats = {
    todo: jobs.filter((j) => j.status === "TODO" || j.status === "BOOKED").length,
    doing: jobs.filter((j) => j.status === "DOING" || j.status === "IN_PROGRESS").length,
    done: jobs.filter((j) => j.status === "DONE" || j.status === "COMPLETED").length,
    revenue: jobs
      .filter((j) => j.invoice)
      .reduce((sum, j) => sum + j.totalPence, 0),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Job Management</h1>
          <p className="text-xs md:text-sm text-slate-500 mt-1">Track all service jobs and repairs</p>
        </div>
        <Link
          href="/garage/jobs/new"
          className="px-4 md:px-6 py-2 md:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors text-sm md:text-base"
        >
          <Plus size={18} className="md:w-5 md:h-5" />
          <span className="hidden sm:inline">New Job</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between gap-3 md:gap-4">
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-slate-500 font-medium uppercase tracking-wider">To Do</p>
              <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-1">{stats.todo}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg shrink-0 flex items-center justify-center">
              <Clock className="text-blue-600 md:w-6 md:h-6" size={20} />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between gap-3 md:gap-4">
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-slate-500 font-medium uppercase tracking-wider">Working</p>
              <p className="text-2xl md:text-3xl font-bold text-orange-600 mt-1">{stats.doing}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg shrink-0 flex items-center justify-center">
              <Clock className="text-orange-600 md:w-6 md:h-6" size={20} />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between gap-3 md:gap-4">
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-slate-500 font-medium uppercase tracking-wider">Complete</p>
              <p className="text-2xl md:text-3xl font-bold text-green-600 mt-1">{stats.done}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg shrink-0 flex items-center justify-center">
              <CheckCircle className="text-green-600 md:w-6 md:h-6" size={20} />
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <div className="flex items-center justify-between gap-3 md:gap-4">
            <div className="min-w-0">
              <p className="text-xs md:text-sm text-slate-500 font-medium">Revenue</p>
              <p className="text-2xl md:text-3xl font-bold text-green-600 mt-1">
                £{(stats.revenue / 100).toFixed(2)}
              </p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg shrink-0 flex items-center justify-center">
              <DollarSign className="text-green-600 md:w-6 md:h-6" size={20} />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-3 md:p-4">
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search job, VRM, or customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-slate-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Status</option>
              <option value="TODO">To Do</option>
              <option value="DOING">Working</option>
              <option value="DONE">Complete</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Jobs List */}
      <Card>
        {filteredJobs.length > 0 ? (
          <>
            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-slate-100">
              {filteredJobs.map((job) => {
                const StatusIcon = statusIcons[job.status];
                return (
                  <div
                    key={job.id}
                    onClick={() => {
                      window.location.href = `/garage/jobs/${job.jobNumber}`;
                    }}
                    className="p-4 hover:bg-blue-50 transition-colors cursor-pointer"
                  >
                    {/* Job Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900">{job.jobNumber.split('-').pop()}</span>
                          {job.source === "ONLINE_BOOKING" && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full" title="From online booking">
                              🌐
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{formatUKDate(job.createdAt)}</p>
                      </div>
                      <span className={`px-2 py-1 border-2 rounded-full text-xs font-bold whitespace-nowrap ${statusColors[job.status]}`}>
                        {statusLabels[job.status]}
                      </span>
                    </div>

                    {/* Vehicle & Type */}
                    <div className="mb-3 pb-3 border-b border-slate-100">
                      <div className="flex gap-2 mb-2">
                        <span className="bg-yellow-400 border border-slate-900 rounded px-2 py-1 font-bold text-xs">
                          {job.vehicle.vrm}
                        </span>
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded">
                          {job.type}
                        </span>
                      </div>
                      <p className="text-sm text-slate-900 font-medium">{vehicleTitle(job.vehicle)}</p>
                      <p className="text-xs text-slate-600">{job.vehicle.ownerName}</p>
                    </div>

                    {/* Total & Actions */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-slate-900">£{(job.totalPence / 100).toFixed(2)}</span>
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => window.location.href = `/garage/jobs/${job.jobNumber}`}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        {job.invoice && (
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              const invoiceId = job.invoice?.id;
                              if (!invoiceId) return;
                              try {
                                const res = await fetch(`/api/invoices/${invoiceId}/email`, { method: 'POST' });
                                if (res.ok) {
                                  addToast('Invoice email sent!', 'success');
                                } else {
                                  addToast('Failed to send invoice email', 'error');
                                }
                              } catch {
                                addToast('Error sending invoice email', 'error');
                              }
                            }}
                            className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                            title="Send Invoice Email"
                          >
                            <FileText size={16} />
                          </button>
                        )}
                        <button
                          onClick={async (e) => {
                            e.stopPropagation();
                            openDeleteModal(job);
                          }}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete Job"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-slate-900">Job #</th>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-slate-900">Type</th>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-slate-900">Vehicle</th>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-slate-900">Customer</th>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-slate-900">Total</th>
                    <th className="px-4 lg:px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredJobs.map((job) => {
                    const StatusIcon = statusIcons[job.status];
                    return (
                      <tr
                        key={job.id}
                        onClick={() => {
                          window.location.href = `/garage/jobs/${job.jobNumber}`;
                        }}
                        className="hover:bg-blue-50 transition-colors cursor-pointer group"
                      >
                        <td className="px-4 lg:px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-900 text-sm">{job.jobNumber.split('-').pop()}</span>
                            {job.source === "ONLINE_BOOKING" && (
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full" title="From online booking">
                                🌐
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {formatUKDate(job.createdAt)}
                          </p>
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded">
                            {job.type}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <span className="bg-yellow-400 border-2 border-slate-900 rounded px-2 py-1 font-bold text-sm">
                            {job.vehicle.vrm}
                          </span>
                          <p className="text-sm text-slate-600 mt-1">
                            {vehicleTitle(job.vehicle)}
                          </p>
                        </td>
                        <td className="px-4 lg:px-6 py-4 text-slate-600 text-sm">{job.vehicle.ownerName}</td>
                        <td className="px-4 lg:px-6 py-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            defaultValue={job.status}
                            onChange={async (e) => {
                              const newStatus = e.target.value;
                              if (newStatus === job.status) return;
                              try {
                                const res = await fetch(`/api/jobs/${job.id}`, {
                                  method: 'PATCH',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ status: newStatus }),
                                });
                                if (res.ok) {
                                  setJobs((prev) => prev.map(j => j.id === job.id ? { ...j, status: newStatus } : j));
                                  addToast(`Job status updated to ${statusLabels[newStatus]}`, 'success');
                                } else {
                                  addToast('Failed to update status', 'error');
                                }
                              } catch (err) {
                                addToast('Error updating status', 'error');
                              }
                            }}
                            className={`px-2 py-1 border-2 rounded-full text-xs font-bold cursor-pointer ${statusColors[job.status]}`}
                          >
                            <option value="TODO">📋 TO DO</option>
                            <option value="DOING">🔧 WORKING</option>
                            <option value="DONE">✅ COMPLETE</option>
                          </select>
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <span className="text-lg font-bold text-slate-900">
                            £{(job.totalPence / 100).toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 lg:px-6 py-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => window.location.href = `/garage/jobs/${job.jobNumber}`}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye size={18} />
                          </button>
                          {job.invoice && (
                            <button
                              onClick={async () => {
                                const invoiceId = job.invoice?.id;
                                if (!invoiceId) return;
                                try {
                                  const res = await fetch(`/api/invoices/${invoiceId}/email`, { method: 'POST' });
                                  if (res.ok) {
                                    addToast('Invoice email sent successfully!', 'success');
                                  } else {
                                    addToast('Failed to send invoice email', 'error');
                                  }
                                } catch {
                                  addToast('Error sending invoice email', 'error');
                                }
                              }}
                              className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors"
                              title="Send Invoice Email"
                            >
                              <FileText size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => openDeleteModal(job)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete Job"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="p-8 md:p-12 text-center">
            <FileText size={40} className="md:w-12 md:h-12 mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-base md:text-lg">
              {searchQuery || filterStatus !== "ALL"
                ? "No jobs match your filters"
                : "No jobs yet. Create your first job!"}
            </p>
          </div>
        )}
      </Card>

      {showDeleteModal && jobToDelete && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md rounded-2xl shadow-2xl border border-white/40 bg-white/95 backdrop-blur">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Delete job?</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    This action cannot be undone.
                  </p>
                </div>
                <button onClick={closeDeleteModal} className="text-slate-400 hover:text-slate-600 text-xl" aria-label="Close">
                  ✕
                </button>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">Job</span> #{jobToDelete.jobNumber.split("-").pop()}
                </p>
                <p className="text-sm text-slate-600 mt-1">{vehicleTitle(jobToDelete.vehicle)}</p>
                <p className="text-xs text-slate-500 mt-1">{jobToDelete.vehicle.ownerName}</p>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={closeDeleteModal}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700"
                  disabled={deleteLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteJob}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? "Deleting..." : "Delete Job"}
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
