import { r as reactExports, W as jsxRuntimeExports } from "./server-Bdhs9obN.js";
import { E as Route, b as Link, m as motion, B as Briefcase, s as supabase } from "./router-BRcjVh65.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-pIIcMAyb.js";
import { B as Badge } from "./badge-CeDEXXqn.js";
import { B as Button } from "./button-DVa_PMXS.js";
import { L as LoaderCircle } from "./loader-circle-Bo8SCPAJ.js";
import { A as ArrowLeft } from "./arrow-left-CKykvCro.js";
import { C as CircleCheck } from "./circle-check-DUP1m5d4.js";
import { P as Phone } from "./phone-DuqHLLJB.js";
import { M as MessageSquare } from "./message-square-qVSqzkS5.js";
import { S as Star } from "./star-DT0ONVEj.js";
import { C as Calendar } from "./calendar-CkoZpd9W.js";
import { M as MapPin } from "./map-pin-Dzjs76hk.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-CT7-nG3N.js";
import "./index-JJn3Sn7e.js";
import "./index-DjzVvyLV.js";
import "./index-lxwdXnt7.js";
import "./index-CSRB__ba.js";
function Hired() {
  const {
    id
  } = Route.useSearch();
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [app, setApp] = reactExports.useState(null);
  reactExports.useEffect(() => {
    async function loadHiredApplication() {
      if (!id) {
        setIsLoading(false);
        return;
      }
      try {
        const {
          data,
          error
        } = await supabase.from("applications").select("*, worker:profiles(*), job:jobs(*)").eq("id", id).single();
        if (error) throw error;
        setApp(data);
      } catch (err) {
        console.error("Error loading hired application:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadHiredApplication();
  }, [id]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  if (!app) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto mt-12 p-6 rounded-3xl bg-card border border-border text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Application not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2", children: "Could not load details for this hiring event." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4 rounded-full", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/applications", children: "Back to Applications" }) })
    ] });
  }
  const workerName = app.worker?.name || "Worker";
  const workerAvatar = app.worker?.avatar || workerName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  const workerSkill = app.worker?.skill || "Helper";
  const workerRating = app.worker?.rating || "5.0";
  const jobTitle = app.job?.title || "General Job";
  const jobLocation = app.job?.location || "On site";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/applications", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to Applications"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 12
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "lg:col-span-2 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 md:p-10 shadow-elegant relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          scale: 0
        }, animate: {
          scale: 1
        }, transition: {
          type: "spring",
          stiffness: 200
        }, className: "h-20 w-20 rounded-full bg-white/20 grid place-items-center backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-12 w-12" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-6 text-3xl md:text-4xl font-extrabold", children: "Worker hired successfully!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 opacity-95", children: [
          workerName,
          ' has been assigned to "',
          jobTitle,
          `". They've been notified.`
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "rounded-full bg-white text-emerald-700 hover:bg-white/90 font-semibold gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
            " Call worker"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-full border-white/40 text-white bg-white/10 hover:bg-white/20 gap-2", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/messages", search: {
            userId: app.worker_id
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
            " Message"
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Worker" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-14 w-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-primary text-primary-foreground font-bold", children: workerAvatar }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: workerName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: workerSkill }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-600 font-semibold mt-0.5 inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-3 w-3 fill-current" }),
              " ",
              workerRating,
              " rating"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mt-4 rounded-full border-0 bg-success/15 text-success", children: "Hired" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 rounded-3xl bg-card border border-border p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold", children: "Assigned job" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-lg font-extrabold", children: jobTitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid sm:grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: Briefcase, label: "Skill", value: workerSkill }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: Calendar, label: "Start date", value: "Scheduled start" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { icon: MapPin, label: "Location", value: jobLocation })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 rounded-2xl bg-muted/40 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Next steps" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-2 text-sm space-y-1.5 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Worker will receive job details in their accepted jobs dashboard." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Confirm the job location and timing directly with the worker via chat or phone." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "• Mark the job as complete once the work is finished to trigger the payment payout." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold", children: "Quick actions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full rounded-full justify-start gap-2", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
            " Back to dashboard"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full rounded-full justify-start gap-2", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/active", children: "View active jobs" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full rounded-full justify-start gap-2", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/applications", children: "More applications" }) })
        ] })
      ] })
    ] })
  ] });
}
function Info({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border p-3.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-semibold text-sm", children: value })
  ] });
}
export {
  Hired as component
};
