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

  const attemptGeocode = (q: string): Promise<GeocodeResult> => {
    return new Promise((resolve, reject) => {
      geocoder.geocode({ address: q, componentRestrictions: { country: "IN" } }, (results, status) => {
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
          reject(new Error(`Geocoding status: ${status}`));
        }
      });
    });
  };

  try {
    // 1. Primary search with original query
    return await attemptGeocode(query);
  } catch (err) {
    console.warn(`Primary geocoding failed for "${query}":`, err);

    // 2. Pincode Fallback (6 digits)
    const pincodeMatch = query.match(/\b\d{6}\b/);
    if (pincodeMatch) {
      try {
        console.log(`Retrying geocode with pincode: ${pincodeMatch[0]}`);
        return await attemptGeocode(pincodeMatch[0]);
      } catch (err2) {
        console.warn(`Pincode fallback failed for "${pincodeMatch[0]}":`, err2);
      }
    }

    // 3. Clean special characters fallback
    const cleanQuery = query
      .replace(/[-]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (cleanQuery !== query && cleanQuery.length > 3) {
      try {
        console.log(`Retrying geocode with cleaned query: "${cleanQuery}"`);
        return await attemptGeocode(cleanQuery);
      } catch (err3) {
        console.warn(`Cleaned query fallback failed for "${cleanQuery}":`, err3);
      }
    }

    // 4. Segment-based fallback
    const segments = query.split(/[,|-]/).map((s) => s.trim()).filter(Boolean);
    if (segments.length > 1) {
      const partialQuery = segments.slice(0, 2).join(", ");
      try {
        console.log(`Retrying geocode with partial query: "${partialQuery}"`);
        return await attemptGeocode(partialQuery);
      } catch (err4) {
        console.warn(`Partial query fallback failed for "${partialQuery}":`, err4);
      }

      const firstSegment = segments[0];
      if (firstSegment.length > 2) {
        try {
          console.log(`Retrying geocode with first segment: "${firstSegment}"`);
          return await attemptGeocode(firstSegment);
        } catch (err5) {
          console.warn(`First segment fallback failed for "${firstSegment}":`, err5);
        }
      }
    }

    throw err;
  }
}
