export interface VehicleLike {
  make?: string | null;
  typeApproval?: string | null;
  model?: string | null;
  variant?: string | null;
  engine?: string | null;
  vrm?: string | null;
  registration?: string | null;
}

export function vehicleTitle(v?: VehicleLike | null) {
  if (!v) return "Vehicle";
  const parts: string[] = [];
  if (v.make) parts.push(String(v.make));
  if (v.typeApproval) parts.push(String(v.typeApproval));
  if (v.model) {
    const m = String(v.model).trim();
    const lower = m.toLowerCase();
    if (m && lower !== "unknown" && lower !== "n/a" && lower !== "na") parts.push(m);
  }
  if (v.variant) parts.push(String(v.variant));

  if (parts.length > 0) return parts.join(" ");
  if (v.engine) return String(v.engine);
  if (v.registration) return String(v.registration);
  if (v.vrm) return String(v.vrm);
  return "Vehicle";
}

export default vehicleTitle;
