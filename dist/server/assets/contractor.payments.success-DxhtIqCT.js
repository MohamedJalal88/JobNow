import { W as jsxRuntimeExports } from "./server-tlzWzzxG.js";
import { c as createLucideIcon, m as motion, b as Link } from "./router-BN8-Jwly.js";
import { B as Button } from "./button-Q5sIVU3I.js";
import { C as CircleCheck } from "./circle-check-94W1TNTg.js";
import { I as IndianRupee } from "./indian-rupee-CriXNZzL.js";
import { A as ArrowRight } from "./arrow-right-C_wCt8AG.js";
import { D as Download } from "./download-BCvRnBY5.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DGfzVTOR.js";
import "./index-7ypanOaY.js";
import "./index-BQm1n8Yx.js";
const __iconNode = [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }]
];
const RefreshCcw = createLucideIcon("refresh-ccw", __iconNode);
function PaymentSuccess() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] flex flex-col items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    scale: 0.9,
    opacity: 0
  }, animate: {
    scale: 1,
    opacity: 1
  }, className: "max-w-md w-full bg-card border border-border rounded-3xl p-8 shadow-elegant text-center relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-2 bg-gradient-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      scale: 0
    }, animate: {
      scale: 1
    }, transition: {
      type: "spring",
      stiffness: 200,
      delay: 0.1
    }, className: "mx-auto h-20 w-20 rounded-full bg-success/10 text-success grid place-items-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-extrabold mb-2", children: "Payment Sent!" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Your payout has been processed successfully." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 mb-8 p-6 rounded-2xl bg-muted/30 border border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1", children: "Total Amount" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl font-black inline-flex items-center text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-7 w-7" }),
        " 3,400"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-3 pt-6 border-t border-border/50 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Recipient" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Anil Verma" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Job" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "Bathroom Plumbing" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Reference ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: "TXN-89342011" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/payments", children: [
        "Back to Payments ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "flex-1 h-11 rounded-full gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
          " Receipt"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "flex-1 h-11 rounded-full gap-2", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/active", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "h-4 w-4" }),
          " Active Jobs"
        ] }) })
      ] })
    ] })
  ] }) });
}
export {
  PaymentSuccess as component
};
