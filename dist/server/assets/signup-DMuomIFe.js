import { r as reactExports, W as jsxRuntimeExports } from "./server-C4dWhZyv.js";
import { a as useNavigate, b as Link, L as Logo, m as motion, B as Briefcase, d as cn } from "./router-WW3szPP7.js";
import { B as Button } from "./button-DEGIpoY6.js";
import { A as ArrowLeft } from "./arrow-left-B0ptsRh_.js";
import { S as Sparkles } from "./sparkles-BNbbs-o2.js";
import { H as HardHat } from "./hard-hat-CbsBRCPM.js";
import { A as ArrowRight } from "./arrow-right-3QPfhf-A.js";
import { C as Check } from "./check-wPv7Ktgy.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-Od-5zCBa.js";
import "./index-B4gOCyvo.js";
import "./index-BBwSRa9y.js";
function RoleSelect() {
  const nav = useNavigate();
  const [role, setRole] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-dvh w-full bg-background relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-40 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/welcome", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
        " Back"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login-choice", className: "text-sm font-medium text-muted-foreground hover:text-foreground", children: "Log in" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-16 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "max-w-3xl mx-auto text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5" }),
          " Step 1 of 2"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-5 text-4xl md:text-6xl font-extrabold tracking-tight", children: [
          "How will you use ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "JobNow" }),
          "?"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-muted-foreground text-lg", children: "Choose your role to personalize your experience. You can always switch later." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid lg:grid-cols-2 gap-5 max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RoleCard, { selected: role === "worker", onClick: () => setRole("worker"), title: "I'm a Worker", tagline: "Find daily wage jobs near you", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(HardHat, { className: "h-7 w-7" }), gradient: "from-blue-600 to-sky-700", bullets: ["Browse jobs within 10km", "Apply with one tap", "Get paid same day", "Build your reputation"] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RoleCard, { selected: role === "contractor", onClick: () => setRole("contractor"), title: "I'm a Contractor", tagline: "Hire skilled workers in minutes", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-7 w-7" }), gradient: "from-blue-800 to-slate-900", bullets: ["Post jobs in seconds", "Verified worker profiles", "Bulk hiring tools", "Manage payments easily"] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 max-w-md mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: !role, onClick: () => {
          if (role) {
            localStorage.setItem("signup_role", role);
          }
          nav({
            to: "/auth-choice",
            search: {
              role
            }
          });
        }, className: "w-full h-13 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow disabled:opacity-50 inline-flex items-center justify-center gap-2", children: [
          "Continue ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-4 text-center text-sm text-muted-foreground", children: [
          "Already a member? ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login-choice", className: "text-primary font-semibold", children: "Log in" })
        ] })
      ] })
    ] })
  ] });
}
function RoleCard({
  selected,
  onClick,
  title,
  tagline,
  icon,
  gradient,
  bullets
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick, className: cn("group relative text-left p-7 md:p-8 rounded-3xl border-2 bg-card transition-all overflow-hidden", selected ? "border-primary shadow-elegant scale-[1.01]" : "border-border hover:border-primary/40 hover:shadow-soft"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("absolute top-5 right-5 h-7 w-7 rounded-full border-2 grid place-items-center transition-colors", selected ? "bg-primary border-primary text-primary-foreground" : "border-border"), children: selected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-16 w-16 rounded-2xl bg-gradient-to-br ${gradient} text-white grid place-items-center shadow-soft`, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-2xl font-extrabold", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: tagline }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-2 text-sm", children: bullets.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-success shrink-0" }),
      " ",
      b
    ] }, b)) })
  ] });
}
export {
  RoleSelect as component
};
