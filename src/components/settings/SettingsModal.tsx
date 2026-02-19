"use client";

import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function SettingsModal({ isOpen, onClose, children }: SettingsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex bg-white animate-in fade-in duration-200">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 z-10">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
          aria-label="Close settings"
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="w-full pt-16">
        {children}
      </div>
    </div>
  );
}
