"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Building2,
  Zap,
  Bell,
  Settings as SettingsIcon,
  Award,
} from "lucide-react";

interface SettingsSection {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    id: "general",
    label: "General",
    icon: <Building2 size={18} />,
    href: "/garage/settings/general",
  },
  {
    id: "profile",
    label: "Profile & Expertise",
    icon: <Award size={18} />,
    href: "/garage/settings/profile",
  },
  {
    id: "plan",
    label: "Plan & Billing",
    icon: <Zap size={18} />,
    href: "/garage/settings/plan",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: <Bell size={18} />,
    href: "/garage/settings/notifications",
  },
  {
    id: "advanced",
    label: "Advanced",
    icon: <SettingsIcon size={18} />,
    href: "/garage/settings/advanced",
  },
];

export function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto">
      <nav className="p-3 lg:p-4 inline-flex lg:flex lg:flex-col gap-2 lg:gap-1 w-full">
        {SETTINGS_SECTIONS.map((section) => {
          const isActive = pathname === section.href;
          return (
            <Link
              key={section.id}
              href={section.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors shrink-0 lg:shrink min-w-fit lg:w-full ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-200"
              }`}
            >
              <span className={isActive ? "text-white" : "text-slate-500"}>
                {section.icon}
              </span>
              <span className="text-sm lg:text-base">
                {section.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
