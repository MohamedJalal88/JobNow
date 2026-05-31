import { W as jsxRuntimeExports } from "./server-DoqeQAMK.js";
import { c as createLucideIcon, j as Route, L as Logo, m as motion, b as Link } from "./router-DH6bADvP.js";
import { S as Sparkles } from "./sparkles-DzN7_SOO.js";
import { Z as Zap } from "./zap-B9doRRc5.js";
import { S as ShieldCheck } from "./shield-check-CbLGXEOC.js";
import { A as ArrowLeft } from "./arrow-left-DBlBVBDe.js";
import { A as ArrowRight } from "./arrow-right-BtX46bpU.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["path", { d: "m10 17 5-5-5-5", key: "1bsop3" }],
  ["path", { d: "M15 12H3", key: "6jk70r" }],
  ["path", { d: "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4", key: "u53s6r" }]
];
const LogIn = createLucideIcon("log-in", __iconNode$1);
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function AuthChoice() {
  const {
    role
  } = Route.useSearch();
  const isWorker = role === "worker";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-dvh w-full bg-background grid lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "relative hidden lg:flex overflow-hidden bg-gradient-hero text-primary-foreground p-12 xl:p-16 flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 16
        }, animate: {
          opacity: 1,
          y: 0
        }, className: "mt-20 max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-xs font-semibold capitalize", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
            " Joining as ",
            role
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-5 text-4xl xl:text-5xl font-extrabold leading-[1.05]", children: [
            "Welcome to ",
            isWorker ? "more work, near you." : "faster hiring."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg opacity-90", children: isWorker ? "Verified daily wage jobs in your neighborhood, with secure same-day payouts." : "Hire skilled, verified workers in your neighborhood — in minutes, not days." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative space-y-3 max-w-lg", children: [{
        icon: Zap,
        t: "Instant matching",
        b: "Get matched in seconds."
      }, {
        icon: ShieldCheck,
        t: "Verified & secure",
        b: "ID-verified profiles, secure payments."
      }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass border border-white/15 rounded-2xl p-4 flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-white/20 grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: b.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-85", children: b.b })
        ] })
      ] }, b.t)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex flex-col min-h-dvh", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-6 md:px-10 py-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/signup", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Back"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center px-6 md:px-10 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "w-full max-w-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-extrabold tracking-tight", children: "Welcome to JobNow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Choose how you want to continue." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", search: {
            role
          }, className: "group flex items-center gap-5 p-6 rounded-3xl border-2 border-border bg-card hover:border-primary hover:shadow-elegant transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-2xl bg-gradient-primary text-primary-foreground grid place-items-center shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", children: "Log in" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Already have an account? Continue securely." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/register", search: {
            role
          }, onClick: () => {
            localStorage.setItem("signup_role", role);
          }, className: "group flex items-center gap-5 p-6 rounded-3xl border-2 border-border bg-card hover:border-primary hover:shadow-elegant transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-14 w-14 rounded-2xl bg-gradient-to-br ${isWorker ? "from-blue-600 to-sky-700" : "from-blue-800 to-slate-900"} text-white grid place-items-center shadow-soft`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-bold", children: "Create account" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "New to JobNow? Set up your ",
                role,
                " profile."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-10 text-xs text-center text-muted-foreground", children: [
          "By continuing you agree to our ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-primary font-medium", children: "Terms" }),
          " and ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-primary font-medium", children: "Privacy Policy" }),
          "."
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AuthChoice as component
};
