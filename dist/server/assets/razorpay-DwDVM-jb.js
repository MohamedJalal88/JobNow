import { a2 as TSS_SERVER_FUNCTION, a3 as createServerFn } from "./server-x9CHfBKQ.js";
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
  const keyId = process.env.VITE_RAZORPAY_KEY_ID || "rzp_test_SvVqspuWAEmzt1";
  const keySecret = process.env.VITE_RAZORPAY_KEY_SECRET || "w7SKZrUNaRgrdDnK0VLY6u97";
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
    throw new Error(`Razorpay order generation failed: ${errorText}`);
  }
  const orderData = await response.json();
  return {
    orderId: orderData.id,
    amount: orderData.amount,
    currency: orderData.currency,
    keyId
    // Return keyId to frontend so it knows which account to use
  };
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
  const keySecret = process.env.VITE_RAZORPAY_KEY_SECRET || "w7SKZrUNaRgrdDnK0VLY6u97";
  const text = `${data.razorpay_order_id}|${data.razorpay_payment_id}`;
  const generatedSignature = crypto.createHmac("sha256", keySecret).update(text).digest("hex");
  const isValid = generatedSignature === data.razorpay_signature;
  return {
    success: isValid
  };
});
export {
  createRazorpayOrder_createServerFn_handler,
  verifyRazorpayPayment_createServerFn_handler
};
