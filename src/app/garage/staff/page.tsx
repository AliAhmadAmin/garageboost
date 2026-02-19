"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Plus, Users, UserCheck, Edit2, Trash2 } from "lucide-react";
import { getGarageId, formatPrice, poundsToPence, penceToPounds } from "@/lib/garage";
import { EMPLOYMENT_TYPES, STAFF_ACCESS_ROLES, getEmploymentTypeLabel, getStaffAccessRoleLabel } from "@/lib/constants";
import { useToast } from "@/components/ui/Toast";

// Permission definitions
const PERMISSIONS = {
  VIEW_JOBS: "View all jobs and assignments",
  MANAGE_JOBS: "Create and assign jobs",
  EDIT_JOBS: "Edit job details",
  DELETE_JOBS: "Delete jobs",
  VIEW_CUSTOMERS: "View customer information",
  MANAGE_CUSTOMERS: "Add and edit customers",
  VIEW_REPORTS: "View reports and analytics",
  VIEW_BILLING: "View billing and invoices",
  MANAGE_BILLING: "Manage subscription and payments",
  MANAGE_TEAM: "Manage team members and roles",
  VIEW_SETTINGS: "View garage settings",
  EDIT_SETTINGS: "Edit garage settings",
};

const ROLE_PERMISSIONS = {
  OWNER: [
    "VIEW_JOBS",
    "MANAGE_JOBS",
    "EDIT_JOBS",
    "DELETE_JOBS",
    "VIEW_CUSTOMERS",
    "MANAGE_CUSTOMERS",
    "VIEW_REPORTS",
    "VIEW_BILLING",
    "MANAGE_BILLING",
    "MANAGE_TEAM",
    "VIEW_SETTINGS",
    "EDIT_SETTINGS",
  ],
  MANAGER: [
    "VIEW_JOBS",
    "MANAGE_JOBS",
    "EDIT_JOBS",
    "VIEW_CUSTOMERS",
    "MANAGE_CUSTOMERS",
    "VIEW_REPORTS",
    "MANAGE_TEAM",
    "VIEW_SETTINGS",
  ],
  TECHNICIAN: [
    "VIEW_JOBS",
    "EDIT_JOBS",
    "VIEW_CUSTOMERS",
  ],
  RECEPTIONIST: [
    "VIEW_JOBS",
    "MANAGE_JOBS",
    "VIEW_CUSTOMERS",
    "MANAGE_CUSTOMERS",
    "VIEW_SETTINGS",
  ],
};

interface Staff {
  id: string;
  name: string;
  role: string;
  accessRole?: string | null;
  jobTitle?: string | null;
  employmentType?: string | null;
  startDate?: string | null;
  hourlyRatePence?: number | null;
  phone?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
  active: boolean;
  notes?: string | null;
  userId?: string | null;
  permissions?: string[] | null;
}

export default function StaffPage() {
  const { addToast } = useToast();
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showRolesPanel, setShowRolesPanel] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    role: "Mechanic",
    accessRole: "TECHNICIAN",
    jobTitle: "",
    employmentType: "FULL_TIME",
    startDate: "",
    hourlyRatePence: 0,
    phone: "",
    email: "",
    avatarUrl: "",
    notes: "",
    createLogin: false,
    password: "",
  });

  const garageId = getGarageId();

  useEffect(() => {
    if (garageId) fetchStaff();
    // Initialize with default permissions for TECHNICIAN
    setSelectedPermissions(ROLE_PERMISSIONS.TECHNICIAN);
  }, [garageId]);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/garages/${garageId}/staff`);
      const data = await res.json();
      setStaff(data.staff || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      addToast("Name is required", "error");
      return;
    }

    if (formData.createLogin) {
      if (!formData.email.trim()) {
        addToast("Login email is required", "error");
        return;
      }
      if (!formData.password.trim()) {
        addToast("Login password is required", "error");
        return;
      }
    }

    try {
      const url = editingStaff
        ? `/api/garages/${garageId}/staff/${editingStaff.id}`
        : `/api/garages/${garageId}/staff`;

      const method = editingStaff ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          permissions: selectedPermissions,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        addToast(error.error || "Failed to save staff", "error");
        return;
      }

      addToast(editingStaff ? "Staff updated!" : "Staff added!", "success");
      resetForm();
      fetchStaff();
    } catch (err) {
      console.error(err);
      addToast("Error saving staff", "error");
    }
  };

  const handleEdit = (member: Staff) => {
    setEditingStaff(member);
    // Set permissions based on role or use custom permissions
    const defaultPerms = ROLE_PERMISSIONS[member.accessRole as keyof typeof ROLE_PERMISSIONS] || [];
    setSelectedPermissions(member.permissions || defaultPerms);
    setFormData({
      name: member.name,
      role: member.role,
      accessRole: member.accessRole || "TECHNICIAN",
      jobTitle: member.jobTitle || "",
      employmentType: member.employmentType || "FULL_TIME",
      startDate: member.startDate ? new Date(member.startDate).toISOString().slice(0, 10) : "",
      hourlyRatePence: member.hourlyRatePence || 0,
      phone: member.phone || "",
      email: member.email || "",
      avatarUrl: member.avatarUrl || "",
      notes: member.notes || "",
      createLogin: false,
      password: "",
    });
    setShowForm(true);
  };

  const handleAccessRoleChange = (newRole: string) => {
    setFormData({ ...formData, accessRole: newRole });
    // Auto-select default permissions for the role
    const defaultPerms = ROLE_PERMISSIONS[newRole as keyof typeof ROLE_PERMISSIONS] || [];
    setSelectedPermissions([...defaultPerms]);
  };

  const handlePermissionToggle = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleDelete = async (staffId: string) => {
    if (!confirm("Are you sure you want to deactivate this staff member?")) return;

    try {
      const res = await fetch(`/api/garages/${garageId}/staff/${staffId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        addToast(error.error || "Failed to delete staff", "error");
        return;
      }

      addToast("Staff deactivated!", "success");
      fetchStaff();
    } catch (err) {
      console.error(err);
      addToast("Error deleting staff", "error");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "Mechanic",
      accessRole: "TECHNICIAN",
      jobTitle: "",
      employmentType: "FULL_TIME",
      startDate: "",
      hourlyRatePence: 0,
      phone: "",
      email: "",
      avatarUrl: "",
      notes: "",
      createLogin: false,
      password: "",
    });
    setSelectedPermissions(ROLE_PERMISSIONS.TECHNICIAN);
    setEditingStaff(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading staff...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-xs md:text-sm text-gray-600 mt-1">Manage your team members</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowForm(true)}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1.5 text-xs md:text-sm"
          >
            <Plus size={14} />
            Add Staff
          </button>
          <button
            onClick={() => setShowRolesPanel(true)}
            className="px-3 py-1.5 bg-slate-600 text-white rounded-lg hover:bg-slate-700 flex items-center gap-1.5 text-xs md:text-sm"
          >
            <Users size={14} />
            Assign Roles
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-4 md:mb-6">
        <Card className="p-3 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-slate-500 font-medium uppercase tracking-wider">Total Staff</p>
              <p className="text-2xl md:text-3xl font-bold text-blue-600 mt-1">{staff.length}</p>
            </div>
            <div className="w-10 md:w-12 h-10 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
              <Users className="text-blue-600" size={20} />
            </div>
          </div>
        </Card>

        <Card className="p-3 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-slate-500 font-medium uppercase tracking-wider">Active</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-600 mt-1">{staff.filter((s) => s.active).length}</p>
            </div>
            <div className="w-10 md:w-12 h-10 md:h-12 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
              <UserCheck className="text-emerald-600" size={20} />
            </div>
          </div>
        </Card>

        <Card className="p-3 md:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-slate-500 font-medium uppercase tracking-wider">Full Time</p>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 mt-1">
                {staff.filter((s) => s.employmentType === "FULL_TIME").length}
              </p>
            </div>
            <div className="w-10 md:w-12 h-10 md:h-12 bg-slate-100 rounded-lg flex items-center justify-center shrink-0">
              <Users className="text-slate-600" size={20} />
            </div>
          </div>
        </Card>
      </div>

      {/* Staff Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-3 md:p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border border-white/40 bg-white/95 backdrop-blur">
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg md:text-xl font-bold text-slate-900">{editingStaff ? "Edit Staff" : "Add Staff"}</h2>
                  <p className="text-xs md:text-sm text-slate-500 mt-1">Keep team details tidy and role-based access clear.</p>
                </div>
                <button onClick={resetForm} className="text-slate-400 hover:text-slate-600 text-xl" aria-label="Close">
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-slate-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Profile Photo */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Profile Photo (Optional)
                  </label>
                  <div className="flex items-center gap-4">
                    {formData.avatarUrl && (
                      <img
                        src={formData.avatarUrl}
                        alt="Staff"
                        className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
                      />
                    )}
                    {!formData.avatarUrl && (
                      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-2xl font-bold border-2 border-slate-200">
                        {formData.name.charAt(0).toUpperCase() || "?"}
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="url"
                        value={formData.avatarUrl}
                        onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                        placeholder="https://example.com/photo.jpg"
                      />
                      <p className="text-xs text-slate-500 mt-1">
                        💡 Enter an image URL (e.g., upload to Imgur and paste link)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Role</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                      placeholder="e.g. Mechanic, Receptionist"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Job Title</label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                      placeholder="e.g. Senior Technician"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Access Role</label>
                  <select
                    value={formData.accessRole}
                    onChange={(e) => handleAccessRoleChange(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  >
                    {STAFF_ACCESS_ROLES.map((role) => (
                      <option key={role} value={role}>
                        {getStaffAccessRoleLabel(role)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Permissions Checkboxes */}
                <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                  <p className="text-sm font-semibold text-slate-700 mb-3">Permissions</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.entries(PERMISSIONS).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(key)}
                          onChange={() => handlePermissionToggle(key)}
                          className="w-4 h-4 rounded text-blue-600"
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Employment Type</label>
                    <select
                      value={formData.employmentType}
                      onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    >
                      {EMPLOYMENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Hourly Rate (£)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={(formData.hourlyRatePence / 100).toFixed(2)}
                      onChange={(e) =>
                        setFormData({ ...formData, hourlyRatePence: Math.round(parseFloat(e.target.value || "0") * 100) })
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  />
                </div>

                <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">Login Access</p>
                      <p className="text-xs text-slate-500">Enable staff to sign in and view assigned work.</p>
                    </div>
                    {!editingStaff?.userId && (
                      <label className="flex items-center gap-2 text-sm text-slate-700">
                        <input
                          type="checkbox"
                          checked={formData.createLogin}
                          onChange={(e) => setFormData({ ...formData, createLogin: e.target.checked })}
                          className="h-4 w-4 rounded text-blue-600"
                        />
                        Allow login
                      </label>
                    )}
                  </div>

                  {editingStaff?.userId ? (
                    <div className="mt-3">
                      <p className="text-xs text-emerald-700 font-medium">Login enabled</p>
                      <label className="block text-sm font-semibold text-slate-700 mb-1 mt-3">Reset Password</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                        placeholder="Enter new password to reset"
                      />
                    </div>
                  ) : (
                    formData.createLogin && (
                      <div className="mt-3">
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Temporary Password</label>
                        <input
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                          placeholder="Set a temporary password"
                        />
                      </div>
                    )
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <button type="submit" className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm">
                    {editingStaff ? "Update" : "Add"} Staff
                  </button>
                  <button type="button" onClick={resetForm} className="px-4 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-700">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}

      {/* Assign Roles Panel */}
      {showRolesPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 md:p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-3 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg md:text-xl font-bold">Assign Roles & Permissions</h2>
                <button onClick={() => setShowRolesPanel(false)} className="text-gray-400 hover:text-gray-600 text-xl">
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Role Overview */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Available Roles</h3>
                  <div className="space-y-2">
                    {Object.entries(ROLE_PERMISSIONS).map(([role, permissions]) => (
                      <div key={role} className="flex items-start gap-3">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{role}</p>
                          <p className="text-xs text-gray-600 mt-1">{permissions.length} permissions</p>
                        </div>
                        <Badge>{permissions.length}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Staff Role Assignment */}
                <div className="border-t border-slate-200 pt-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Assign Staff to Roles</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {staff.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{member.name}</p>
                          <p className="text-xs text-gray-600">{member.role}</p>
                        </div>
                        <select
                          value={member.accessRole || "TECHNICIAN"}
                          onChange={(e) => {
                            // Update staff access role
                            const newStaff = staff.map((s) =>
                              s.id === member.id ? { ...s, accessRole: e.target.value } : s
                            );
                            setStaff(newStaff);
                          }}
                          className="px-2 py-1 text-xs border rounded-lg"
                        >
                          {Object.keys(ROLE_PERMISSIONS).map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowRolesPanel(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Staff Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-2 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900">Name</th>
                <th className="hidden sm:table-cell px-2 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900">Role</th>
                <th className="hidden lg:table-cell px-2 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900">Access</th>
                <th className="hidden md:table-cell px-2 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900">Employment</th>
                <th className="hidden xl:table-cell px-2 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900">Hourly Rate</th>
                <th className="hidden md:table-cell px-2 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900">Contact</th>
                <th className="px-2 md:px-6 py-3 md:py-4 text-left text-xs md:text-sm font-semibold text-slate-900">Status</th>
                <th className="px-2 md:px-6 py-3 md:py-4 text-center text-xs md:text-sm font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staff.length > 0 ? (
                staff.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-2 md:px-6 py-3 md:py-4">
                      <div className="flex items-center gap-2 md:gap-3">
                        {member.avatarUrl ? (
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            className="w-8 md:w-10 h-8 md:h-10 rounded-full object-cover border-2 border-gray-200 shrink-0"
                          />
                        ) : (
                          <div className="w-8 md:w-10 h-8 md:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs border-2 border-blue-200 shrink-0">
                            {member.name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2)}
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="font-semibold text-xs md:text-sm text-slate-900 truncate">{member.name}</div>
                          {member.jobTitle && <div className="text-xs text-slate-500 truncate">{member.jobTitle}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-2 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-600">{member.role}</td>
                    <td className="hidden lg:table-cell px-2 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-600">
                      {getStaffAccessRoleLabel(member.accessRole || "TECHNICIAN")}
                    </td>
                    <td className="hidden md:table-cell px-2 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-600">
                      {member.employmentType ? member.employmentType.replace(/_/g, " ") : "-"}
                    </td>
                    <td className="hidden xl:table-cell px-2 md:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold text-emerald-600">
                      {member.hourlyRatePence ? formatPrice(member.hourlyRatePence) + "/hr" : "-"}
                    </td>
                    <td className="hidden md:table-cell px-2 md:px-6 py-3 md:py-4 text-xs md:text-sm text-slate-600">
                      <div>{member.phone || "-"}</div>
                      <div className="text-xs">{member.email || "-"}</div>
                    </td>
                    <td className="px-2 md:px-6 py-3 md:py-4">
                      <div className="flex flex-col gap-1">
                        <Badge variant={member.active ? "success" : "error"}>{member.active ? "Active" : "Inactive"}</Badge>
                        {member.userId && (
                          <span className="text-xs text-emerald-600 font-medium hidden md:inline">Login enabled</span>
                        )}
                      </div>
                    </td>
                    <td className="px-2 md:px-6 py-3 md:py-4">
                      <div className="flex gap-1 md:gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(member)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          disabled={member.accessRole === "OWNER"}
                          className={`p-1 rounded ${
                            member.accessRole === "OWNER"
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-red-600 hover:bg-red-50"
                          }`}
                          title={member.accessRole === "OWNER" ? "Cannot deactivate owner" : "Deactivate"}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No staff members yet. Click "Add Staff" to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
