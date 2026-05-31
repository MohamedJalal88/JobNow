let loadPromise = null;
function loadGoogleMaps() {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }
  if (window.google?.maps) {
    return Promise.resolve(window.google.maps);
  }
  if (loadPromise) {
    return loadPromise;
  }
  const apiKey = "AIzaSyC07-wHXddSSyWA_eVxmWeK1VpIv1HZJjE";
  loadPromise = new Promise((resolve, reject) => {
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
async function googleReverseGeocode(lat, lng) {
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
          pincode
        });
      } else {
        reject(new Error(`Reverse geocoding failed with status: ${status}`));
      }
    });
  });
}
async function googleGeocodeSearch(query) {
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
          pincode
        });
      } else {
        reject(new Error(`Geocoding search failed with status: ${status}`));
      }
    });
  });
}
export {
  googleGeocodeSearch as a,
  googleReverseGeocode as g,
  loadGoogleMaps as l
};
