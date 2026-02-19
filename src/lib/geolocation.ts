/**
 * Geolocation utilities for UK garage locations
 */

export interface PostcodeData {
  latitude: number;
  longitude: number;
  city?: string;
  county?: string;
  region?: string;
}

/**
 * Convert ALL CAPS string to Title Case
 */
function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Geocode a UK postcode using postcodes.io (free API)
 * Returns coordinates plus location data (city, county, region)
 */
export async function geocodePostcode(postcode: string): Promise<PostcodeData | null> {
  try {
    const cleanPostcode = postcode.replace(/\s+/g, '').toUpperCase();
    const response = await fetch(`https://api.postcodes.io/postcodes/${cleanPostcode}`);
    
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (data.status === 200 && data.result) {
      // Use post_town for city (official Royal Mail postal town - includes small areas)
      // Fall back to admin_district if post_town not available
      let city = data.result.post_town || data.result.admin_district || data.result.parliamentary_constituency || undefined;
      
      // Convert from ALL CAPS to Title Case if needed
      if (city && city === city.toUpperCase()) {
        city = toTitleCase(city);
      }
      
      return {
        latitude: data.result.latitude,
        longitude: data.result.longitude,
        city: city,
        county: data.result.admin_county || data.result.region || undefined,
        region: data.result.region || undefined,
      };
    }

    return null;
  } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error('Geocoding error:', error);
      }
    return null;
  }
}

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in miles
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3958.8; // Earth's radius in miles
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Get user's current location using browser geolocation API
 */
export function getCurrentPosition(): Promise<{ latitude: number; longitude: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * Sort garages by distance from a given location
 */
export function sortByDistance<T extends { latitude: number | null; longitude: number | null }>(
  garages: T[],
  userLat: number,
  userLon: number
): (T & { distance: number | null })[] {
  return garages
    .map((garage) => ({
      ...garage,
      distance:
        garage.latitude && garage.longitude
          ? calculateDistance(userLat, userLon, garage.latitude, garage.longitude)
          : null,
    }))
    .sort((a, b) => {
      if (a.distance === null) return 1;
      if (b.distance === null) return -1;
      return a.distance - b.distance;
    });
}
