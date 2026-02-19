export type AccessScope = "ALL" | "ASSIGNED";

type AccessRole =
  | "OWNER"
  | "MANAGER"
  | "TECHNICIAN"
  | "SERVICE_ADVISOR"
  | "ACCOUNTANT"
  | "READ_ONLY";

export const isGarageOwnerRole = (role?: string | null) => role === "GARAGE_OWNER";
export const isGarageStaffRole = (role?: string | null) => role === "GARAGE_STAFF";

export const isManagerAccessRole = (accessRole?: string | null) =>
  accessRole === "OWNER" || accessRole === "MANAGER";

export const getAssignmentScope = (accessRole?: string | null): AccessScope => {
  if (isManagerAccessRole(accessRole)) return "ALL";
  return "ASSIGNED";
};

export const normalizeAccessRole = (accessRole?: string | null): AccessRole => {
  switch (accessRole) {
    case "OWNER":
    case "MANAGER":
    case "TECHNICIAN":
    case "SERVICE_ADVISOR":
    case "ACCOUNTANT":
    case "READ_ONLY":
      return accessRole;
    default:
      return "TECHNICIAN";
  }
};
