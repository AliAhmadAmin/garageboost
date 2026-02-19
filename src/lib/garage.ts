/**
 * Garage utilities for client-side garage data management
 */

export interface GarageData {
  id: string;
  name: string;
  ownerName: string;
  plan: string;
  status: string;
  trialEndsAt?: string | null;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  description?: string | null;
}

/**
 * Safely get garage ID from localStorage
 * @returns Garage ID or null if not found
 */
export function getGarageId(): string | null {
  if (typeof window === "undefined") return null;
  
  try {
    const garageData = localStorage.getItem("garage-data");
    if (!garageData) return null;
    
    const parsed = JSON.parse(garageData);
    return parsed?.id || null;
  } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to get garage ID:", error);
      }
    return null;
  }
}

/**
 * Safely get full garage data from localStorage
 * @returns GarageData or null if not found
 */
export function getGarageData(): GarageData | null {
  if (typeof window === "undefined") return null;
  
  try {
    const garageData = localStorage.getItem("garage-data");
    if (!garageData) return null;
    
    return JSON.parse(garageData);
  } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to get garage data:", error);
      }
    return null;
  }
}

/**
 * Save garage data to localStorage
 * @param data Garage data to save
 */
export function setGarageData(data: GarageData): void {
  try {
    localStorage.setItem("garage-data", JSON.stringify(data));
  } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to save garage data:", error);
      }
  }
}

/**
 * Clear garage data from localStorage
 */
export function clearGarageData(): void {
  try {
    localStorage.removeItem("garage-data");
  } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to clear garage data:", error);
      }
  }
}

/**
 * Format price from pence to pounds
 * @param pence Amount in pence
 * @returns Formatted price string (e.g., "£12.50")
 */
export function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

/**
 * Convert pounds to pence
 * @param pounds Amount in pounds
 * @returns Amount in pence
 */
export function poundsToPence(pounds: number): number {
  return Math.round(pounds * 100);
}

/**
 * Convert pence to pounds
 * @param pence Amount in pence
 * @returns Amount in pounds
 */
export function penceToPounds(pence: number): number {
  return pence / 100;
}
