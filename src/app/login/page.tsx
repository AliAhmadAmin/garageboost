"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import PublicLayout from "@/components/layout/PublicLayout";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.email.trim() || !form.password.trim()) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      localStorage.removeItem("garage-data");
      localStorage.removeItem("user");

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // Store user info
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Store garage data - handle both staff and owner roles
      if (data.garage) {
        localStorage.setItem("garage-data", JSON.stringify(data.garage));
      } else if (data.user?.staff?.garage) {
        localStorage.setItem("garage-data", JSON.stringify(data.user.staff.garage));
      } else if (data.user?.garages && data.user.garages[0]) {
        localStorage.setItem("garage-data", JSON.stringify(data.user.garages[0]));
      }
      
      // Redirect based on role
      if (data.user.role === "ADMIN" || data.user.role === "SUPER_ADMIN") {
        router.push("/admin");
      } else {
        router.push("/garage/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6 min-h-[70vh]">
        <div className="w-full max-w-md space-y-6">

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Login</h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-slate-600">
                Don't have an account?{" "}
                <Link href="/pricing" className="text-blue-600 font-semibold hover:underline">
                  Sign up
                </Link>
              </p>
              <p className="text-xs text-slate-500">
                <Link href="/forgot-password" className="hover:underline">
                  Forgot password?
                </Link>
              </p>
            </div>
          </Card>

          <p className="text-center text-xs text-slate-400">
            By logging in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
