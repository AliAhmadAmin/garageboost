"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastType = "info", duration = 3000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toast: ToastMessage = { id, message, type, duration };
    setToasts((prev) => [...prev, toast]);

    if (duration) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
}

export function ToastContainer({ toasts, removeToast }: { toasts: ToastMessage[]; removeToast: (id: string) => void }) {
  return (
    <div className="fixed bottom-24 lg:bottom-4 right-4 flex flex-col gap-3 z-100">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

function Toast({ toast, onClose }: { toast: ToastMessage; onClose: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  const bgColorMap: Record<ToastType, string> = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-blue-600",
    warning: "bg-amber-600",
  };

  const iconMap: Record<ToastType, typeof AlertCircle> = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
    warning: AlertCircle,
  };

  const Icon = iconMap[toast.type];

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 200);
  };

  return (
    <div
      className={`${bgColorMap[toast.type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transform transition-all duration-200 ${
        isExiting ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
      }`}
    >
      <Icon size={20} />
      <span className="flex-1">{toast.message}</span>
      <button onClick={handleClose} className="text-white/70 hover:text-white">
        <X size={18} />
      </button>
    </div>
  );
}
