"use client";

import { ReactNode } from "react";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row h-full">
      <SettingsSidebar />
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-5xl mx-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
