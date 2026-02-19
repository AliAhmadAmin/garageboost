"use client";

import { redirect } from "next/navigation";

export default function InventorySettings() {
  redirect("/garage/inventory");
  return null;
}
