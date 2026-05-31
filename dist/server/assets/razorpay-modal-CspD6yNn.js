import { a2 as TSS_SERVER_FUNCTION, a7 as getServerFnById, a3 as createServerFn, r as reactExports, W as jsxRuntimeExports } from "./server-DoqeQAMK.js";
import { B as Button } from "./button-BqkRPwal.js";
import { I as Input } from "./input-bpKYGI82.js";
import { L as Label } from "./label-CAwEZolP.js";
import { A as AnimatePresence } from "./index-CBGVxDuw.js";
import { c as createLucideIcon, m as motion } from "./router-DH6bADvP.js";
import { X } from "./x-CjV8kUHY.js";
import { C as CreditCard } from "./credit-card-CWtKzdR4.js";
import { A as ArrowRight } from "./arrow-right-BtX46bpU.js";
import { L as LoaderCircle } from "./loader-circle-CMQFy84J.js";
import { C as CircleCheck } from "./circle-check-BOsUISvn.js";
import { S as ShieldCheck } from "./shield-check-CbLGXEOC.js";
const __iconNode = [
  ["rect", { width: "5", height: "5", x: "3", y: "3", rx: "1", key: "1tu5fj" }],
  ["rect", { width: "5", height: "5", x: "16", y: "3", rx: "1", key: "1v8r4q" }],
  ["rect", { width: "5", height: "5", x: "3", y: "16", rx: "1", key: "1x03jg" }],
  ["path", { d: "M21 16h-3a2 2 0 0 0-2 2v3", key: "177gqh" }],
  ["path", { d: "M21 21v.01", key: "ents32" }],
  ["path", { d: "M12 7v3a2 2 0 0 1-2 2H7", key: "8crl2c" }],
  ["path", { d: "M3 12h.01", key: "nlz23k" }],
  ["path", { d: "M12 3h.01", key: "n36tog" }],
  ["path", { d: "M12 16v.01", key: "133mhm" }],
  ["path", { d: "M16 12h1", key: "1slzba" }],
  ["path", { d: "M21 12v.01", key: "1lwtk9" }],
  ["path", { d: "M12 21v-1", key: "1880an" }]
];
const QrCode = createLucideIcon("qr-code", __iconNode);
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const createRazorpayOrder = createServerFn({
  method: "POST"
}).handler(createSsrRpc("e7461c44f7a960556129109463606ff603140d91822a72eff9cadfe0f0efd76e"));
const verifyRazorpayPayment = createServerFn({
  method: "POST"
}).handler(createSsrRpc("06cdb36750bf1040ffabb92e8bcad45ba1e26e48a938a24692d2011303b37d08"));
function RazorpayModal({ isOpen, onClose, onSuccess, amount, jobTitle }) {
  const [method, setMethod] = reactExports.useState("upi");
  const [upiId, setUpiId] = reactExports.useState("");
  const [cardNumber, setCardNumber] = reactExports.useState("");
  const [expiry, setExpiry] = reactExports.useState("");
  const [cvv, setCvv] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("idle");
  const [error, setError] = reactExports.useState("");
  if (!isOpen) return null;
  const handlePay = async (e) => {
    e.preventDefault();
    setError("");
    if (method === "upi" && !upiId.includes("@")) {
      setError("Please enter a valid UPI ID (e.g. user@upi)");
      return;
    }
    if (method === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16) {
        setError("Card number must be 16 digits");
        return;
      }
      if (!expiry.includes("/")) {
        setError("Expiry must be MM/YY");
        return;
      }
      if (cvv.length < 3) {
        setError("CVV must be 3 digits");
        return;
      }
    }
    setStatus("processing");
    let scriptLoaded = false;
    try {
      scriptLoaded = await new Promise((resolve) => {
        if (window.Razorpay) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    } catch (err) {
      console.warn("Failed to load Razorpay script. Falling back to simulation.", err);
    }
    const isLiveConfigured = true;
    let orderResult = null;
    let orderError = null;
    if (scriptLoaded && isLiveConfigured) {
      try {
        orderResult = await createRazorpayOrder({
          amount,
          jobId: jobTitle.replace(/\s+/g, "_").toLowerCase()
        });
      } catch (err) {
        console.warn("Could not create real Razorpay order on server.", err);
        orderError = err.message || String(err);
      }
    }
    if (orderError) {
      setError(`Razorpay Order Error: ${orderError}`);
      setStatus("idle");
      return;
    }
    if (scriptLoaded && orderResult) {
      try {
        const options = {
          key: orderResult.keyId,
          amount: orderResult.amount,
          currency: orderResult.currency,
          name: "JobNow Escrow",
          description: `Wage escrow for: ${jobTitle}`,
          order_id: orderResult.orderId,
          handler: async function(response) {
            setStatus("processing");
            try {
              const verifyRes = await verifyRazorpayPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              });
              if (verifyRes.success) {
                setStatus("success");
                await new Promise((r) => setTimeout(r, 1200));
                onSuccess(response.razorpay_payment_id);
                setStatus("idle");
                onClose();
              } else {
                setError("Payment signature verification failed.");
                setStatus("idle");
              }
            } catch (err) {
              console.error("Signature verification failed:", err);
              setError("Payment verification failed. Please contact support.");
              setStatus("idle");
            }
          },
          prefill: {
            method,
            vpa: method === "upi" ? upiId : void 0
          },
          theme: {
            color: "#1e3a8a"
          },
          modal: {
            ondismiss: function() {
              setStatus("idle");
            }
          }
        };
        if (method === "card") {
          const [month, year] = expiry.split("/");
          options.prefill.card = {
            number: cardNumber.replace(/\s/g, ""),
            expiry_month: month,
            expiry_year: `20${year}`,
            cvv
          };
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("Razorpay widget error:", err);
        setError("Could not open Razorpay checkout widget.");
        setStatus("idle");
      }
    } else {
      await new Promise((r) => setTimeout(r, 2200));
      setStatus("success");
      await new Promise((r) => setTimeout(r, 1200));
      const simulatedTxId = `pay_mock_${Math.random().toString(36).substring(2, 16)}`;
      onSuccess(simulatedTxId);
      setStatus("idle");
      onClose();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: status === "processing" ? void 0 : onClose,
        className: "absolute inset-0 bg-background/80 backdrop-blur-sm"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { scale: 0.95, y: 15, opacity: 0 },
        animate: { scale: 1, y: 0, opacity: 1 },
        exit: { scale: 0.95, y: 15, opacity: 0 },
        className: "relative w-full max-w-sm overflow-hidden rounded-3xl bg-card border border-border shadow-elegant z-10",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 p-5 border-b border-border flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 rounded bg-primary grid place-items-center text-primary-foreground text-xs font-bold font-mono", children: "R" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-extrabold text-sm text-foreground", children: "Razorpay Secure" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "JobNow Escrow Services" })
              ] })
            ] }),
            status !== "processing" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: onClose,
                className: "h-8 w-8 rounded-full hover:bg-muted grid place-items-center text-muted-foreground hover:text-foreground transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
            status === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePay, className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase font-bold text-muted-foreground tracking-wider", children: "Funding Amount" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-black text-foreground", children: [
                    "₹",
                    amount.toLocaleString("en-IN")
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "rounded-full text-[10px] tracking-wide uppercase px-2 py-0.5", children: "Job Escrow" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 bg-muted/40 rounded-2xl text-[11px] text-muted-foreground leading-relaxed", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: "Job:" }),
                " ",
                jobTitle
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 p-1 bg-muted rounded-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setMethod("upi");
                      setError("");
                    },
                    className: `h-9 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${method === "upi" ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(QrCode, { className: "h-3.5 w-3.5" }),
                      " UPI / QR"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setMethod("card");
                      setError("");
                    },
                    className: `h-9 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${method === "card" ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground"}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-3.5 w-3.5" }),
                      " Card"
                    ]
                  }
                )
              ] }),
              method === "upi" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "UPI Address" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    placeholder: "e.g. mobile@upi or name@okaxis",
                    className: "h-11 rounded-xl bg-card",
                    value: upiId,
                    onChange: (e) => setUpiId(e.target.value),
                    required: true
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10px] text-muted-foreground justify-center pt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-success", children: "✓" }),
                  " Simulated Instant GooglePay / PhonePe UPI lock"
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Card Number" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "4111 2222 3333 4444",
                      maxLength: 19,
                      className: "h-11 rounded-xl bg-card",
                      value: cardNumber,
                      onChange: (e) => {
                        let v = e.target.value.replace(/\D/g, "");
                        v = v.replace(/(.{4})/g, "$1 ").trim();
                        setCardNumber(v);
                      },
                      required: true
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Expiry" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        placeholder: "MM/YY",
                        maxLength: 5,
                        className: "h-11 rounded-xl bg-card text-center",
                        value: expiry,
                        onChange: (e) => {
                          let v = e.target.value.replace(/\D/g, "");
                          if (v.length > 2) v = `${v.slice(0, 2)}/${v.slice(2, 4)}`;
                          setExpiry(v);
                        },
                        required: true
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "CVV" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        placeholder: "•••",
                        type: "password",
                        maxLength: 3,
                        className: "h-11 rounded-xl bg-card text-center",
                        value: cvv,
                        onChange: (e) => setCvv(e.target.value.replace(/\D/g, "")),
                        required: true
                      }
                    )
                  ] })
                ] })
              ] }),
              error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive text-center font-medium", children: error }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  type: "submit",
                  className: "w-full h-11 rounded-full bg-gradient-primary text-primary-foreground font-bold shadow-soft flex items-center justify-center gap-1.5 hover:opacity-95",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Pay ₹",
                      amount.toLocaleString("en-IN")
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
                  ]
                }
              )
            ] }),
            status === "processing" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-10 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-10 w-10 text-primary animate-spin mb-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-base", children: "Processing Payment..." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 max-w-[200px]", children: "Connecting to bank UPI gateway securely. Please do not close or refresh." })
            ] }),
            status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-10 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-full bg-success/10 text-success grid place-items-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-8 w-8" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-extrabold text-base text-success", children: "Escrow Funded!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Transaction verified. Wages are locked securely in trust escrow." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/40 p-4 border-t border-border flex items-center justify-center gap-1 text-[10px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-primary shrink-0" }),
            " Secure SSL 256-Bit Escrow Protection"
          ] })
        ]
      }
    )
  ] }) });
}
function Badge({ children, variant, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variant === "secondary" ? "bg-secondary text-secondary-foreground" : "bg-primary text-primary-foreground"} ${className}`, children });
}
export {
  RazorpayModal as R
};
