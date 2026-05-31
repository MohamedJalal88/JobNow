import { a2 as TSS_SERVER_FUNCTION, a3 as createServerFn } from "./server-DoqeQAMK.js";
import crypto from "crypto";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const __vite_import_meta_env__ = { "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SSR": true, "TSS_DEV_SERVER": "false", "TSS_DEV_SSR_STYLES_BASEPATH": "/", "TSS_DEV_SSR_STYLES_ENABLED": "true", "TSS_INLINE_CSS_ENABLED": "false", "TSS_ROUTER_BASEPATH": "", "TSS_SERVER_FN_BASE": "/_serverFn/", "VITE_GOOGLE_MAPS_API_KEY": "AIzaSyC07-wHXddSSyWA_eVxmWeK1VpIv1HZJjE", "VITE_RAZORPAY_KEY_ID": "rzp_test_SvVqspuWAEmzt1", "VITE_RAZORPAY_KEY_SECRET": "w7SKZrUNaRgrdDnK0VLY6u97", "VITE_SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmemZydXRnZ3Z6ZHRlbHZyZnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyNjYzNjcsImV4cCI6MjA5NDg0MjM2N30.TGijxjDEExkEgnevb5RDw17BrWE2oicyy2gki636iR4", "VITE_SUPABASE_URL": "https://sfzfrutggvzdtelvrftw.supabase.co" };
function getEnvVariable(name) {
  if (typeof process !== "undefined" && process.env && process.env[name]) {
    return process.env[name];
  }
  try {
    const denoEnv = globalThis.Deno?.env;
    if (denoEnv) {
      return denoEnv.get(name) || "";
    }
  } catch (e) {
  }
  try {
    const metaEnv = __vite_import_meta_env__;
    if (metaEnv && metaEnv[name]) {
      return metaEnv[name];
    }
  } catch (e) {
  }
  return "";
}
const createRazorpayOrder_createServerFn_handler = createServerRpc({
  id: "e7461c44f7a960556129109463606ff603140d91822a72eff9cadfe0f0efd76e",
  name: "createRazorpayOrder",
  filename: "src/lib/razorpay.ts"
}, (opts) => createRazorpayOrder.__executeServer(opts));
const createRazorpayOrder = createServerFn({
  method: "POST"
}).handler(createRazorpayOrder_createServerFn_handler, async ({
  data
}) => {
  try {
    const keyId = getEnvVariable("VITE_RAZORPAY_KEY_ID");
    const keySecret = getEnvVariable("VITE_RAZORPAY_KEY_SECRET");
    console.log("Server-side Razorpay configuration check:", {
      keyIdExists: !!keyId,
      keySecretExists: !!keySecret,
      keyIdPreview: keyId ? `${keyId.substring(0, 8)}...` : "none"
    });
    if (!keyId || !keySecret) {
      throw new Error("Razorpay API Key (VITE_RAZORPAY_KEY_ID) or Secret (VITE_RAZORPAY_KEY_SECRET) is missing in server environment variables.");
    }
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`
      },
      body: JSON.stringify({
        amount: Math.round(data.amount * 100),
        // convert to Paisa
        currency: "INR",
        receipt: `receipt_job_${data.jobId}`
      })
    });
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Razorpay order API error response:", errorText);
      throw new Error(`Razorpay order API failed: ${errorText}`);
    }
    const orderData = await response.json();
    return {
      orderId: orderData.id,
      amount: orderData.amount,
      currency: orderData.currency,
      keyId
      // Return keyId to frontend so it knows which account to use
    };
  } catch (error) {
    console.error("Error in createRazorpayOrder server handler:", error);
    throw error;
  }
});
const verifyRazorpayPayment_createServerFn_handler = createServerRpc({
  id: "06cdb36750bf1040ffabb92e8bcad45ba1e26e48a938a24692d2011303b37d08",
  name: "verifyRazorpayPayment",
  filename: "src/lib/razorpay.ts"
}, (opts) => verifyRazorpayPayment.__executeServer(opts));
const verifyRazorpayPayment = createServerFn({
  method: "POST"
}).handler(verifyRazorpayPayment_createServerFn_handler, async ({
  data
}) => {
  try {
    const keySecret = getEnvVariable("VITE_RAZORPAY_KEY_SECRET");
    if (!keySecret) {
      throw new Error("Razorpay API Secret (VITE_RAZORPAY_KEY_SECRET) is missing in server environment variables.");
    }
    const text = `${data.razorpay_order_id}|${data.razorpay_payment_id}`;
    const generatedSignature = crypto.createHmac("sha256", keySecret).update(text).digest("hex");
    const isValid = generatedSignature === data.razorpay_signature;
    return {
      success: isValid
    };
  } catch (error) {
    console.error("Error in verifyRazorpayPayment server handler:", error);
    throw error;
  }
});
export {
  createRazorpayOrder_createServerFn_handler,
  verifyRazorpayPayment_createServerFn_handler
};
