import { r as reactExports, W as jsxRuntimeExports } from "./server-C4dWhZyv.js";
import { c as createLucideIcon, u as useAuth, h as useLanguage, b as Link, t as toast, d as cn } from "./router-WW3szPP7.js";
import { S as Switch } from "./switch-CHC0syJc.js";
import { A as ArrowLeft } from "./arrow-left-B0ptsRh_.js";
import { G as Globe, L as Languages } from "./languages-C5Gr8Gq-.js";
import { M as Mail } from "./mail-BPF-uAtM.js";
import { K as KeyRound } from "./key-round-DYXtkSYs.js";
import { C as CreditCard } from "./credit-card-CcBgEKXV.js";
import { M as Moon, C as CircleQuestionMark } from "./moon-Dcl2anRZ.js";
import { B as Bell } from "./bell-B5G5R-mP.js";
import { L as Lock } from "./lock-mMpWTCZn.js";
import { T as Trash2 } from "./trash-2-CgvJkMVE.js";
import { C as ChevronRight } from "./chevron-right-BTUddhV9.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-BcRQ9-0a.js";
import "./index-BZTqIGMe.js";
import "./index-B4gOCyvo.js";
import "./index-QzyIYWUi.js";
const __iconNode = [
  ["path", { d: "M10 12h4", key: "a56b0p" }],
  ["path", { d: "M10 8h4", key: "1sr2af" }],
  ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
  [
    "path",
    {
      d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
      key: "secmi2"
    }
  ],
  ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16", key: "16ra0t" }]
];
const Building2 = createLucideIcon("building-2", __iconNode);
function ContractorSettings() {
  const {
    user
  } = useAuth();
  const [dark, setDark] = reactExports.useState(false);
  const [notif, setNotif] = reactExports.useState(true);
  const [emailN, setEmailN] = reactExports.useState(false);
  const {
    t,
    language,
    setLanguage
  } = useLanguage();
  reactExports.useEffect(() => {
    if (typeof document !== "undefined") setDark(document.documentElement.classList.contains("dark"));
  }, []);
  function toggleDark(v) {
    setDark(v);
    if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", v);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-dvh bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor", className: "inline-flex items-center gap-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to dashboard"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-2xl md:text-3xl font-extrabold tracking-tight", children: t("Contractor Settings") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t("Manage your business account, preferences and security.") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: t("Language Settings"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            t("Select your preferred site language"),
            ":"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setLanguage("en"), className: `p-3 rounded-2xl border font-bold text-sm flex flex-col items-center gap-1 transition-all ${language === "en" ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card border-border hover:bg-muted"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "English" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setLanguage("hi"), className: `p-3 rounded-2xl border font-bold text-sm flex flex-col items-center gap-1 transition-all ${language === "hi" ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card border-border hover:bg-muted"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "हिंदी (Hindi)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setLanguage("ta"), className: `p-3 rounded-2xl border font-bold text-sm flex flex-col items-center gap-1 transition-all ${language === "ta" ? "bg-primary text-primary-foreground border-primary shadow-md" : "bg-card border-border hover:bg-muted"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "தமிழ் (Tamil)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: Languages, label: t("Region"), right: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "India" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Business Profile", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: Building2, label: "Business details", desc: "Company info, hiring preferences", to: "/contractor/profile", chevron: true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: t("Account"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: Mail, label: t("Email address"), right: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: user?.email || "No email" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: KeyRound, label: t("Change password"), to: "/contractor/change-password", chevron: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: CreditCard, label: t("Billing & Subscription"), desc: t("Manage billing details and checkouts"), to: "/contractor/payments", chevron: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: t("Appearance"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: Moon, label: t("Dark mode"), desc: t("Toggle a darker UI theme"), right: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: dark, onCheckedChange: toggleDark }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: t("Notifications"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: Bell, label: t("Push notifications"), desc: t("Receive instant job alerts and chat updates"), right: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: notif, onCheckedChange: setNotif }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: Mail, label: t("Email notifications"), desc: t("Get weekly payouts summary, invoices and updates"), right: /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: emailN, onCheckedChange: setEmailN }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: t("Security & privacy"), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: Lock, label: t("Privacy & data"), to: "/contractor/privacy", chevron: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: CircleQuestionMark, label: t("Help & support"), to: "/contractor/help", chevron: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { icon: Trash2, label: t("Delete Account"), desc: t("Permanently delete profile and history"), danger: true, onClick: () => toast.error(t("Please contact support to delete your account.")), chevron: true })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-center text-xs text-muted-foreground", children: "JobNow Contractor Portal v1.0.0" })
  ] }) });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-2 px-1", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-card border border-border overflow-hidden shadow-soft divide-y divide-border", children })
  ] });
}
function Row({
  icon: Icon,
  label,
  desc,
  right,
  chevron,
  to,
  onClick,
  danger
}) {
  const inner = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onClick, className: cn("px-4 py-3.5 flex items-center gap-3 hover:bg-muted/40 transition-colors", onClick && "cursor-pointer"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-10 w-10 rounded-xl bg-muted grid place-items-center shrink-0", danger && "bg-destructive/10 text-destructive"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4.5 w-4.5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("text-sm font-semibold", danger && "text-destructive"), children: label }),
      desc && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
    ] }),
    right,
    chevron && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
  ] });
  return to ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to, children: inner }) : inner;
}
export {
  ContractorSettings as component
};
