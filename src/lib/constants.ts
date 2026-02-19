/**
 * Centralized constants for the garage management system
 */

// Expense Management
export const EXPENSE_CATEGORIES = [
  "Rent",
  "Utilities",
  "Parts & Supplies",
  "Equipment",
  "Marketing",
  "Insurance",
  "Payroll",
  "Maintenance",
  "Taxes & Licenses",
  "Other",
] as const;

export const PAYMENT_METHODS = [
  "CASH",
  "CARD",
  "BANK_TRANSFER",
  "DIRECT_DEBIT",
  "CHEQUE",
  "OTHER",
] as const;

export const EXPENSE_STATUSES = ["PAID", "PENDING", "CANCELLED"] as const;

// Inventory Management
export const INVENTORY_CATEGORIES = [
  "Parts",
  "Oils & Fluids",
  "Filters",
  "Tyres",
  "Batteries",
  "Brakes",
  "Tools",
  "Consumables",
  "Other",
] as const;

export const TRANSACTION_TYPES = ["RECEIPT", "ISSUE", "ADJUSTMENT"] as const;

// Staff Management
export const EMPLOYMENT_TYPES = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACTOR",
  "APPRENTICE",
] as const;

export const STAFF_ROLES = [
  "Mechanic",
  "Technician",
  "Service Advisor",
  "Receptionist",
  "Manager",
  "Owner",
  "Apprentice",
  "Parts Manager",
  "Other",
] as const;

export const STAFF_ACCESS_ROLES = [
  "OWNER",
  "MANAGER",
  "TECHNICIAN",
  "SERVICE_ADVISOR",
  "ACCOUNTANT",
  "READ_ONLY",
] as const;

// Job Management
export const JOB_TYPES = [
  "MOT",
  "SERVICE",
  "REPAIR",
  "DIAGNOSTIC",
  "TYRES",
  "BRAKES",
  "BATTERY",
  "EXHAUST",
  "CLUTCH",
  "SUSPENSION",
  "OTHER",
] as const;

export const JOB_STATUSES = [
  "BOOKED",
  "IN_PROGRESS",
  "COMPLETED",
  "INVOICED",
  "PAID",
  "CANCELLED",
] as const;

// Service Categories
export const SERVICE_CATEGORIES = [
  "MOT",
  "SERVICE",
  "REPAIR",
  "DIAGNOSTIC",
  "TYRES",
  "BRAKES",
  "BATTERY",
  "EXHAUST",
  "CLUTCH",
  "SUSPENSION",
  "AIR_CONDITIONING",
  "BODYWORK",
  "OTHER",
] as const;

// Booking Statuses
export const BOOKING_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
  "NO_SHOW",
] as const;

// Type exports
export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];
export type PaymentMethod = typeof PAYMENT_METHODS[number];
export type ExpenseStatus = typeof EXPENSE_STATUSES[number];
export type InventoryCategory = typeof INVENTORY_CATEGORIES[number];
export type TransactionType = typeof TRANSACTION_TYPES[number];
export type EmploymentType = typeof EMPLOYMENT_TYPES[number];
export type StaffRole = typeof STAFF_ROLES[number];
export type StaffAccessRole = typeof STAFF_ACCESS_ROLES[number];
export type JobType = typeof JOB_TYPES[number];
export type JobStatus = typeof JOB_STATUSES[number];
export type ServiceCategory = typeof SERVICE_CATEGORIES[number];
export type BookingStatus = typeof BOOKING_STATUSES[number];

// Display name mappings
export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  CASH: "Cash",
  CARD: "Card",
  BANK_TRANSFER: "Bank Transfer",
  DIRECT_DEBIT: "Direct Debit",
  CHEQUE: "Cheque",
  OTHER: "Other",
};

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACTOR: "Contractor",
  APPRENTICE: "Apprentice",
};

export const STAFF_ACCESS_ROLE_LABELS: Record<StaffAccessRole, string> = {
  OWNER: "Owner",
  MANAGER: "Manager",
  TECHNICIAN: "Technician",
  SERVICE_ADVISOR: "Service Advisor",
  ACCOUNTANT: "Accountant",
  READ_ONLY: "Read Only",
};

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  RECEIPT: "Receipt",
  ISSUE: "Issue",
  ADJUSTMENT: "Adjustment",
};

// Helper functions
export function getPaymentMethodLabel(method: string): string {
  return PAYMENT_METHOD_LABELS[method as PaymentMethod] || method;
}

export function getEmploymentTypeLabel(type: string): string {
  return EMPLOYMENT_TYPE_LABELS[type as EmploymentType] || type;
}

export function getTransactionTypeLabel(type: string): string {
  return TRANSACTION_TYPE_LABELS[type as TransactionType] || type;
}

export function getStaffAccessRoleLabel(role: string): string {
  return STAFF_ACCESS_ROLE_LABELS[role as StaffAccessRole] || role;
}
