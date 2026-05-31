let loadPromise: Promise<any> | null = null;

/**
 * Dynamically loads the Google Maps JavaScript API script tag.
 * Safe to call multiple times; returns the same promise instance.
 * Excludes server-side execution.
 */
export function loadGoogleMaps(): Promise<any> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }

  if (loadPromise) {
    return loadPromise;
  }

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

  loadPromise = new Promise((resolve, reject) => {
    // If no API key, resolve with a dummy flag so components know to display a placeholder message
    if (!apiKey) {
      console.warn("Google Maps API Key (VITE_GOOGLE_MAPS_API_KEY) is missing in .env.");
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      resolve(window.google.maps);
    };
    script.onerror = (err) => {
      console.error("Failed to load Google Maps script:", err);
      reject(err);
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}

/**
 * Interface representing the geocoding coordinates.
 */
export interface GeocodeResult {
  latitude: number;
  longitude: number;
  locationName: string;
  pincode?: string;
}

/**
 * Helper to perform reverse geocoding via Google Maps Geocoder.
 */
export async function googleReverseGeocode(lat: number, lng: number): Promise<GeocodeResult> {
  await loadGoogleMaps();
  if (!window.google?.maps) {
    throw new Error("Google Maps SDK not loaded");
  }

  const geocoder = new window.google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const item = results[0];
        let pincode = "";
        
        // Extract pincode from components
        for (const component of item.address_components) {
          if (component.types.includes("postal_code")) {
            pincode = component.long_name;
            break;
          }
        }

        // Generate a concise location display name
        const displayParts = item.formatted_address.split(",");
        const locationName = displayParts.slice(0, 3).join(", ").trim();

        resolve({
          latitude: lat,
          longitude: lng,
          locationName,
          pincode,
        });
      } else {
        reject(new Error(`Reverse geocoding failed with status: ${status}`));
      }
    });
  });
}

/**
 * Helper to search location by address query via Google Maps Geocoder.
 */
export async function googleGeocodeSearch(query: string): Promise<GeocodeResult> {
  await loadGoogleMaps();
  if (!window.google?.maps) {
    throw new Error("Google Maps SDK not loaded");
  }

  const geocoder = new window.google.maps.Geocoder();
  return new Promise((resolve, reject) => {
    geocoder.geocode({ address: query, componentRestrictions: { country: "IN" } }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        const item = results[0];
        const lat = item.geometry.location.lat();
        const lng = item.geometry.location.lng();
        let pincode = "";

        for (const component of item.address_components) {
          if (component.types.includes("postal_code")) {
            pincode = component.long_name;
            break;
          }
        }

        const displayParts = item.formatted_address.split(",");
        const locationName = displayParts.slice(0, 3).join(", ").trim();

        resolve({
          latitude: lat,
          longitude: lng,
          locationName,
          pincode,
        });
      } else {
        reject(new Error(`Geocoding search failed with status: ${status}`));
      }
    });
  });
}
