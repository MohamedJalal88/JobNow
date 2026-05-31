import { r as reactExports, W as jsxRuntimeExports } from "./server-DoqeQAMK.js";
import { b as Link, t as toast, m as motion } from "./router-DH6bADvP.js";
import { L as LifeBuoy, A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionContent } from "./accordion-PqFhjq_T.js";
import { B as Button } from "./button-BqkRPwal.js";
import { I as Input } from "./input-bpKYGI82.js";
import { T as Textarea } from "./textarea-BkCR0ro4.js";
import { F as FAQS } from "./skills-config-BDa8JOXu.js";
import { A as ArrowLeft } from "./arrow-left-DBlBVBDe.js";
import { S as Search } from "./search-DzOS3S8d.js";
import { M as MessageSquare } from "./message-square-BX828T4s.js";
import { M as Mail } from "./mail-BFDKnCBy.js";
import { P as Phone } from "./phone-4zP-C5De.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-BlqQBOEz.js";
import "./index-DJaL8J2T.js";
import "./index-DRWbC4_q.js";
import "./index-3A6rqZvE.js";
import "./chevron-down-B2YCtIdw.js";
import "./index-Bc9SJP-z.js";
import "./index-BDtDEmOi.js";
import "./zap-B9doRRc5.js";
import "./sparkles-DzN7_SOO.js";
import "./hard-hat-Dv8SW1KX.js";
function Help() {
  const [q, setQ] = reactExports.useState("");
  const filtered = FAQS.filter((f) => f.q.toLowerCase().includes(q.toLowerCase()));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor", className: "inline-flex items-center gap-1 text-sm text-muted-foreground mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to dashboard"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden rounded-3xl bg-gradient-hero text-primary-foreground p-8 md:p-12 shadow-elegant text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-14 w-14 rounded-2xl bg-white/15 grid place-items-center backdrop-blur border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LifeBuoy, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-3xl md:text-4xl font-extrabold", children: "How can we help?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 opacity-90", children: "Get answers to common contractor questions or contact support." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 max-w-xl mx-auto relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-foreground/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search help articles…", className: "h-12 pl-11 rounded-full bg-white text-foreground border-0" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-5 w-5" }), title: "Live chat", desc: "Avg response < 2 min", cta: "Start chat", tone: "from-blue-700 to-slate-800" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-5 w-5" }), title: "Email support", desc: "business@jobnow.in", cta: "Send email", tone: "from-emerald-500 to-teal-600" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5" }), title: "Phone support", desc: "1800-202-808", cta: "Call now", tone: "from-blue-600 to-sky-700" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "lg:col-span-2 rounded-3xl bg-card border border-border p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg", children: "Frequently asked" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "single", collapsible: true, className: "mt-4", children: filtered.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `f${i}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "text-left text-sm font-semibold", children: f.q }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "text-sm text-muted-foreground", children: f.a })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: "Open a ticket" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
          e.preventDefault();
          toast.success("Ticket submitted");
        }, className: "mt-3 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Subject", className: "h-11 rounded-xl bg-muted/40 border-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "Describe your issue", className: "rounded-xl min-h-28 bg-muted/40 border-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full rounded-full bg-gradient-primary text-primary-foreground font-semibold", children: "Submit ticket" })
        ] })
      ] })
    ] })
  ] });
}
function Card({
  icon,
  title,
  desc,
  cta,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, className: `rounded-3xl p-6 text-white bg-gradient-to-br ${tone} shadow-soft relative overflow-hidden`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-6 -right-6 h-24 w-24 rounded-full bg-white/15 blur-xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-white/20 grid place-items-center", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-bold text-lg", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90", children: desc }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "mt-4 h-9 px-4 rounded-full bg-white text-foreground text-xs font-semibold", children: cta })
  ] });
}
export {
  Help as component
};
