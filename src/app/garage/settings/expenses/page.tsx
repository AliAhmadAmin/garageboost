"use client";

import { redirect } from "next/navigation";

export default function ExpensesSettings() {
  redirect("/garage/expenses");
  return null;
}
