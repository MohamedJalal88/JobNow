import { createServerFn } from "@tanstack/react-start";
import crypto from "crypto";

// Safely retrieve environment variables across different runtimes (Node, Deno, Cloudflare)
function getEnvVariable(name: string): string {
  if (typeof process !== "undefined" && process.env && process.env[name]) {
    return process.env[name] as string;
  }
  // Try Deno
  try {
    const denoEnv = (globalThis as any).Deno?.env;
    if (denoEnv) {
      return denoEnv.get(name) || "";
    }
  } catch (e) {}
  // Try import.meta.env
  try {
    const metaEnv = (import.meta as any).env;
    if (metaEnv && metaEnv[name]) {
      return metaEnv[name] as string;
    }
  } catch (e) {}
  return "";
}

// Server function to create a Razorpay Order ID securely
export const createRazorpayOrder = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: { amount: number; jobId: string } }) => {
    try {
      const keyId = getEnvVariable("VITE_RAZORPAY_KEY_ID");
      const keySecret = getEnvVariable("VITE_RAZORPAY_KEY_SECRET");

      console.log("Server-side Razorpay configuration check:", {
        keyIdExists: !!keyId,
        keySecretExists: !!keySecret,
        keyIdPreview: keyId ? `${keyId.substring(0, 8)}...` : "none",
      });

      if (!keyId || !keySecret) {
        throw new Error("Razorpay API Key (VITE_RAZORPAY_KEY_ID) or Secret (VITE_RAZORPAY_KEY_SECRET) is missing in server environment variables.");
      }

      const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");

      const response = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          amount: Math.round(data.amount * 100), // convert to Paisa
          currency: "INR",
          receipt: `receipt_job_${data.jobId}`,
        }),
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
        keyId, // Return keyId to frontend so it knows which account to use
      };
    } catch (error) {
      console.error("Error in createRazorpayOrder server handler:", error);
      throw error;
    }
  });

// Server function to securely verify payment signatures before completing transactions
export const verifyRazorpayPayment = createServerFn({ method: "POST" })
  .handler(async ({ data }: { data: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
    } }) => {
    try {
      const keySecret = getEnvVariable("VITE_RAZORPAY_KEY_SECRET");

      if (!keySecret) {
        throw new Error("Razorpay API Secret (VITE_RAZORPAY_KEY_SECRET) is missing in server environment variables.");
      }

      const text = `${data.razorpay_order_id}|${data.razorpay_payment_id}`;
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(text)
        .digest("hex");

      const isValid = generatedSignature === data.razorpay_signature;
      return { success: isValid };
    } catch (error) {
      console.error("Error in verifyRazorpayPayment server handler:", error);
      throw error;
    }
  });
