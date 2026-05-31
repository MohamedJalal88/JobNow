import { r as reactExports, W as jsxRuntimeExports } from "./server-DpY2U1qf.js";
import { a as useNavigate, u as useAuth, m as motion, L as Logo, b as Link } from "./router-D3LitR0x.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Splash() {
  const nav = useNavigate();
  const {
    user,
    isLoading
  } = useAuth();
  reactExports.useEffect(() => {
    if (!isLoading) {
      if (user) {
        nav({
          to: user.role === "worker" ? "/worker" : "/contractor",
          replace: true
        });
      } else {
        const t = setTimeout(() => nav({
          to: "/welcome"
        }), 1800);
        return () => clearTimeout(t);
      }
    }
  }, [user, isLoading, nav]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "relative min-h-screen overflow-hidden bg-gradient-hero text-primary-foreground grid place-items-center px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-60" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      scale: 0.9
    }, animate: {
      opacity: 1,
      scale: 1
    }, transition: {
      duration: 0.6,
      ease: "easeOut"
    }, className: "relative text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto h-20 w-20 rounded-3xl bg-white/15 backdrop-blur grid place-items-center shadow-elegant border border-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        rotate: -10
      }, animate: {
        rotate: 0
      }, transition: {
        duration: 0.8,
        type: "spring"
      }, className: "h-12 w-12 rounded-2xl bg-white/95 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { showText: false }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 text-5xl font-extrabold tracking-tight", children: "JobNow" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm uppercase tracking-[0.3em] opacity-80", children: "Hire · Work · Earn" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "mt-10 mx-auto h-1 w-32 rounded-full bg-white/20 overflow-hidden", initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, transition: {
        delay: 0.4
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: "h-full bg-white", initial: {
        width: "0%"
      }, animate: {
        width: "100%"
      }, transition: {
        duration: 1.4,
        ease: "easeInOut"
      } }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/welcome", className: "mt-8 inline-block text-xs opacity-70 hover:opacity-100", children: "Skip" })
    ] })
  ] });
}
export {
  Splash as component
};
