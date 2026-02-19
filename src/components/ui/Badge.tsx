import { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "error" | "blue" | "gray" | "green" | "red" | "amber";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const styles: Record<BadgeVariant, string> = {
    default: "bg-slate-100 text-slate-700",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    warning: "bg-amber-50 text-amber-700 border border-amber-100",
    danger: "bg-rose-50 text-rose-700 border border-rose-100",
    error: "bg-red-50 text-red-700 border border-red-100",
    blue: "bg-blue-50 text-blue-700 border border-blue-100",
    gray: "bg-gray-100 text-gray-700",
    green: "bg-green-50 text-green-700 border border-green-100",
    red: "bg-red-50 text-red-700 border border-red-100",
    amber: "bg-amber-50 text-amber-700 border border-amber-100",
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[variant]}`}>
      {children}
    </span>
  );
}
