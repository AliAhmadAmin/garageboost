"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GaragePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard
    router.push("/garage/dashboard");
  }, [router]);

  return null;
}

