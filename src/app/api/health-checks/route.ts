import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireGarageAccess, requireVehicleAccess } from "@/lib/auth-guards";

const DEFAULT_ITEMS = [
  { category: "Safety", item: "Brakes", status: "green", urgency: "monitor" },
  { category: "Safety", item: "Tyres", status: "green", urgency: "monitor" },
  { category: "Safety", item: "Lights", status: "green", urgency: "monitor" },
  { category: "Service", item: "Fluids", status: "green", urgency: "monitor" },
  { category: "Service", item: "Battery", status: "green", urgency: "monitor" },
];

// Health check API endpoint and related logic removed
