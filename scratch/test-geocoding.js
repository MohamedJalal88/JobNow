async function test() {
  console.log("Searching for pincode 110001 in India...");
  try {
    const res1 = await fetch("https://nominatim.openstreetmap.org/search?q=110001&format=json&addressdetails=1&limit=1&countrycodes=in", {
      headers: { "User-Agent": "JobNowApp/1.0" }
    });
    const data1 = await res1.json();
    console.log("Search Result for 110001 (IN):", JSON.stringify(data1, null, 2));
  } catch (err) {
    console.error("Search 110001 failed:", err);
  }
}

test();
