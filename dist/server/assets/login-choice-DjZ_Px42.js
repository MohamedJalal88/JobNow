import { W as jsxRuntimeExports } from "./server-tlzWzzxG.js";
import { b as Link, L as Logo, m as motion, B as Briefcase } from "./router-BN8-Jwly.js";
import { A as ArrowLeft } from "./arrow-left-_AI6_IRH.js";
import { U as UsersRound } from "./users-round-B6ihTVef.js";
import { A as ArrowRight } from "./arrow-right-C_wCt8AG.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function LoginChoice() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-dvh w-full bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "max-w-7xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/welcome", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "text-center max-w-2xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold", children: "Choose login type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-4xl md:text-5xl font-extrabold tracking-tight", children: "How would you like to log in?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-muted-foreground", children: "Select your role to continue securely." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid md:grid-cols-2 gap-5", children: [{
        role: "worker",
        title: "Worker Login",
        desc: "Login as a worker to find and accept nearby jobs.",
        icon: Briefcase,
        gradient: "from-blue-600 to-sky-700"
      }, {
        role: "contractor",
        title: "Contractor Login",
        desc: "Login as a contractor to post jobs and hire workers.",
        icon: UsersRound,
        gradient: "from-blue-800 to-slate-900"
      }].map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/login", search: {
        role: opt.role
      }, className: "group rounded-3xl border-2 border-border bg-card p-7 hover:border-primary hover:shadow-elegant transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-14 w-14 rounded-2xl bg-gradient-to-br ${opt.gradient} text-white grid place-items-center shadow-soft`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(opt.icon, { className: "h-6 w-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-5 text-xl font-extrabold", children: opt.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: opt.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform", children: [
          "Continue ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] })
      ] }, opt.role)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-10 text-center text-sm text-muted-foreground", children: [
        "New to JobNow?",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "text-primary font-semibold", children: "Create an account" })
      ] })
    ] })
  ] });
}
export {
  LoginChoice as component
};
