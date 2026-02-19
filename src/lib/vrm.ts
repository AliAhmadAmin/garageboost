/**
 * VRM (Vehicle Registration Mark) utilities for UK number plates
 */

/**
 * Normalize a VRM to consistent format: uppercase, no spaces
 * @param vrm Raw VRM input
 * @returns Normalized VRM (e.g., "AB12 CDE" -> "AB12CDE")
 */
export function normalizeVRM(vrm: string): string {
  return vrm.toUpperCase().replace(/\s+/g, "").trim();
}

/**
 * Format a VRM for display with standard spacing
 * @param vrm Normalized VRM
 * @returns Display-formatted VRM (e.g., "AB12CDE" -> "AB12 CDE")
 */
export function formatVRM(vrm: string): string {
  const normalized = normalizeVRM(vrm);
  
  // UK VRM patterns (simplified):
  // Current format (2001+): AB12 CDE (2 letters, 2 digits, 3 letters)
  // Prefix format (1983-2001): A123 BCD (1 letter, 1-3 digits, 3 letters)
  // Suffix format (1963-1983): ABC 123D (3 letters, 1-3 digits, 1 letter)
  
  // Try current format first (most common)
  const currentMatch = normalized.match(/^([A-Z]{2})(\d{2})([A-Z]{3})$/);
  if (currentMatch) {
    return `${currentMatch[1]}${currentMatch[2]} ${currentMatch[3]}`;
  }
  
  // Try prefix format
  const prefixMatch = normalized.match(/^([A-Z])(\d{1,3})([A-Z]{3})$/);
  if (prefixMatch) {
    return `${prefixMatch[1]}${prefixMatch[2]} ${prefixMatch[3]}`;
  }
  
  // Try suffix format
  const suffixMatch = normalized.match(/^([A-Z]{3})(\d{1,3})([A-Z])$/);
  if (suffixMatch) {
    return `${suffixMatch[1]} ${suffixMatch[2]}${suffixMatch[3]}`;
  }
  
  // If no pattern matches, return as-is (might be edge case or invalid)
  return normalized;
}

/**
 * Validate if a VRM looks reasonable (basic check)
 * @param vrm VRM to validate
 * @returns True if VRM appears valid
 */
export function isValidVRM(vrm: string): boolean {
  const normalized = normalizeVRM(vrm);
  
  // Must be 2-7 characters (most UK plates)
  if (normalized.length < 2 || normalized.length > 7) {
    return false;
  }
  
  // Must contain at least one letter and one digit
  if (!/[A-Z]/.test(normalized) || !/\d/.test(normalized)) {
    return false;
  }
  
  return true;
}
