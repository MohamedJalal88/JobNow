import { r as reactExports, W as jsxRuntimeExports } from "./server-x9CHfBKQ.js";
import { b as Link, t as toast } from "./router-D7lfUnXG.js";
import { B as Button } from "./button-jV6UgcJo.js";
import { S as Switch } from "./switch-auPP_ok2.js";
import { A as ArrowLeft } from "./arrow-left-CRkNVaEI.js";
import { D as Database, C as Cookie, S as ShieldAlert } from "./shield-alert-CXhCNIF-.js";
import { D as Download } from "./download-OD6tPo86.js";
import { T as Trash2 } from "./trash-2-CqBfLmCv.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-C1IWq_ZA.js";
import "./index-Blqeljoh.js";
import "./index-2eWgaTdc.js";
import "./index-BWTXJzPM.js";
import "./index-DN5R_CKq.js";
import "./index-DqFviqIj.js";
function Privacy() {
  const [prefs, setPrefs] = reactExports.useState({
    ads: false,
    analytics: true,
    location: true,
    share: false
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/settings", className: "inline-flex items-center gap-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to settings"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-2xl md:text-3xl font-extrabold tracking-tight", children: "Privacy & Data" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Control how your business data is used across JobNow." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Data preferences", icon: Database, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Personalised worker recommendations", desc: "Use your activity to suggest better workers.", value: prefs.analytics, onChange: (v) => setPrefs((p) => ({
        ...p,
        analytics: v
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Share location for nearby workers", desc: "Required to show workers around your sites.", value: prefs.location, onChange: (v) => setPrefs((p) => ({
        ...p,
        location: v
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Marketing communications", desc: "Tips, offers and product updates.", value: prefs.ads, onChange: (v) => setPrefs((p) => ({
        ...p,
        ads: v
      })) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Cookie preferences", icon: Cookie, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Essential cookies", desc: "Required for the app to work.", value: true, disabled: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Analytics cookies", desc: "Help us understand how the app is used.", value: prefs.analytics, onChange: (v) => setPrefs((p) => ({
        ...p,
        analytics: v
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { label: "Marketing cookies", desc: "Used to personalise ads.", value: prefs.ads, onChange: (v) => setPrefs((p) => ({
        ...p,
        ads: v
      })) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Your data", icon: Download, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { title: "Download business data", desc: "Get a copy of everything we have about your account.", cta: "Request", onClick: () => toast.success("We'll email your archive within 48h") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { title: "Privacy policy", desc: "Read how we collect and process your data.", cta: "Open" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { title: "Terms & conditions", desc: "The legal stuff for using JobNow.", cta: "Open" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Danger zone", icon: ShieldAlert, tone: "destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { danger: true, title: "Delete account", desc: "Permanently remove your contractor account and all associated data.", cta: "Delete", onClick: () => toast.error("Account deletion requested") }) })
  ] });
}
function Section({
  title,
  icon: Icon,
  tone,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-3xl bg-card border border-border shadow-soft overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-border flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-10 w-10 rounded-xl grid place-items-center ${tone === "destructive" ? "bg-destructive/15 text-destructive" : "bg-primary/10 text-primary"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4.5 w-4.5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold", children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children })
  ] });
}
function Toggle({
  label,
  desc,
  value,
  onChange,
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex items-start justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: value, onCheckedChange: onChange, disabled })
  ] });
}
function Action({
  title,
  desc,
  cta,
  onClick,
  danger
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex items-start justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: desc })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: danger ? "destructive" : "outline", className: "rounded-full", onClick, children: [
      danger && /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 mr-1.5" }),
      cta
    ] })
  ] });
}
export {
  Privacy as component
};
