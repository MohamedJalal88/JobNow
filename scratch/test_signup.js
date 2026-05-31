import { createClient } from "@supabase/supabase-js";
import fs from "fs";

// Read env variables manually
const envContent = fs.readFileSync(".env", "utf8");
const env = {};
envContent.split("\n").forEach((line) => {
  const parts = line.split("=");
  if (parts.length >= 2) {
    env[parts[0].trim()] = parts.slice(1).join("=").trim();
  }
});

const supabaseUrl = env["VITE_SUPABASE_URL"];
const supabaseAnonKey = env["VITE_SUPABASE_ANON_KEY"];

console.log("Supabase URL:", supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testFlow() {
  const testPhone = `+91${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  const testEmail = `${testPhone.replace("+", "")}@jobnow.com`;
  const testPassword = "Password123!";

  console.log(`\n1. Testing Supabase signUp with email: ${testEmail}...`);
  try {
    const { data, error } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          name: "Test User",
          phone: testPhone,
          role: "worker",
        },
      },
    });

    if (error) {
      console.error("SignUp Failed:", error.message);
      return;
    }

    const userId = data.user?.id;
    console.log("SignUp Successful! User ID:", userId);

    console.log("\n2. Checking if profile row was automatically created by trigger...");
    // Give it a second for trigger to complete
    await new Promise((r) => setTimeout(r, 1000));
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (profileError) {
      console.error("Fetch Profile Failed:", profileError.message);
    } else if (profile) {
      console.log("Profile Row Found:", profile);
    } else {
      console.warn("Profile Row NOT found! Trigger might have failed or not executed.");
    }

    console.log("\n3. Testing updating/upserting profile (completeProfile)...");
    const { data: upsertData, error: upsertError } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        name: "Test User Updated",
        phone: testPhone,
        email: testEmail,
        role: "worker",
        skill: "painter",
        location: "Test Location, 201301",
      });

    if (upsertError) {
      console.error("Profile Update (Upsert) Failed:", upsertError.message);
    } else {
      console.log("Profile Update (Upsert) Successful!", upsertData);
    }

  } catch (err) {
    console.error("Unexpected error in test:", err);
  }
}

testFlow();
