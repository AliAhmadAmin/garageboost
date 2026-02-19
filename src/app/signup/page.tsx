"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import PublicLayout from "@/components/layout/PublicLayout";
import Link from "next/link";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Load reCAPTCHA script only if configured
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (siteKey && !siteKey.includes("YOUR_RECAPTCHA")) {
      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js";
      script.async = true;
      script.defer = true;
      script.onload = () => setRecaptchaReady(true);
      document.head.appendChild(script);
    } else {
      // Skip reCAPTCHA in development
      setRecaptchaReady(true);
    }
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.confirmPassword.trim()) {
      setError("Please complete all fields");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
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

      // Get reCAPTCHA token (skip if not configured)
      let recaptchaToken = "";
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      
      if (siteKey && !siteKey.includes("YOUR_RECAPTCHA") && window.grecaptcha) {
        recaptchaToken = await window.grecaptcha.execute(siteKey, { action: "signup" });
      }

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      // Store garage data from signup
      if (data.garage) {
        localStorage.setItem("garage-data", JSON.stringify(data.garage));
      }

      // Auto-login after successful signup
      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          recaptchaToken: recaptchaToken || "",
        }),
      });

      if (loginResponse.ok) {
        const userData = await loginResponse.json();
        localStorage.setItem("user", JSON.stringify(userData.user));
        
        // Store full garage data from login response if available
        if (userData.garage) {
          localStorage.setItem("garage-data", JSON.stringify(userData.garage));
        } else if (userData.user.garages && userData.user.garages[0]) {
          localStorage.setItem("garage-data", JSON.stringify(userData.user.garages[0]));
        }
        
        router.push("/garage/dashboard");
      } else {
        setError("Account created! Please login.");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <div className="bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6 min-h-[70vh]">
        <div className="w-full max-w-md space-y-6">

          <Card className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Create Account</h2>
            <p className="text-sm text-slate-600 mb-6">Get started with Garage Boost today</p>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                  autoFocus
                />
              </div>

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
                  placeholder="At least 8 characters"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-slate-600 text-sm mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                Login here
              </Link>
            </p>

            <p className="text-center text-xs text-slate-500 mt-4">
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
              {" "}apply.
            </p>
          </Card>

          <p className="text-center text-sm text-slate-400">
            You'll configure your garage details on the dashboard after signup.
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
