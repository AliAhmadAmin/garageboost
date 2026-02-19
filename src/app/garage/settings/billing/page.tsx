"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BillingSettings() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/garage/settings/plan");
  }, [router]);

  return null;
}
