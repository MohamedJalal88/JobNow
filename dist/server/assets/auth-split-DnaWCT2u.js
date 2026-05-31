import { W as jsxRuntimeExports } from "./server-Brds8CES.js";
import { L as Logo, m as motion, b as Link } from "./router-fTGMDcAU.js";
import { S as Sparkles } from "./sparkles-Cp91bPRt.js";
import { U as UsersRound } from "./users-round-BzDTQsTk.js";
import { S as ShieldCheck } from "./shield-check-BqwM8fPZ.js";
import { A as ArrowLeft } from "./arrow-left-z2sXZ9QN.js";
const defaultBullets = [
  { icon: Sparkles, title: "Hyperlocal matching", body: "Connect within 10km in seconds." },
  { icon: UsersRound, title: "50,000+ workers", body: "Verified skilled professionals nearby." },
  { icon: ShieldCheck, title: "Secure payments", body: "Protected daily wage transactions." }
];
function AuthSplit({
  backTo = "/welcome",
  eyebrow,
  heading,
  subheading,
  bullets = defaultBullets,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-dvh w-full bg-background grid lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "relative hidden lg:flex overflow-hidden bg-gradient-hero text-primary-foreground p-12 xl:p-16 flex-col justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-60 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "mt-20 max-w-lg",
            children: [
              eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.3em] opacity-80", children: eyebrow }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-4xl xl:text-5xl font-extrabold leading-[1.05]", children: heading }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base xl:text-lg opacity-90", children: subheading })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative space-y-3 max-w-lg", children: [
        bullets.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -12 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: 0.15 + i * 0.08 },
            className: "glass border border-white/15 rounded-2xl p-4 flex items-start gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-white/20 grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(b.icon, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: b.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-85", children: b.body })
              ] })
            ]
          },
          b.title
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs opacity-70 pt-4", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " JobNow. All rights reserved."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative flex flex-col min-h-dvh", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center justify-between px-6 md:px-10 py-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: backTo, className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          " Back"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center px-6 md:px-10 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4 },
          className: "w-full max-w-xl",
          children
        }
      ) })
    ] })
  ] });
}
export {
  AuthSplit as A
};
