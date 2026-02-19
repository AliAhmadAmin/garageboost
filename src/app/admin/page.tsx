import AdminLayout from "@/components/admin/AdminLayout";
import SuperAdminDashboard from "@/components/admin/SuperAdminDashboard";

export default function AdminPage() {
  return (
    <AdminLayout>
      <SuperAdminDashboard />
    </AdminLayout>
  );
}
