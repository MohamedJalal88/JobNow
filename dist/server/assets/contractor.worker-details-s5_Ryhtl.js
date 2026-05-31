import { r as reactExports, W as jsxRuntimeExports } from "./server-asg8yyOI.js";
import { n as Route, b as Link, m as motion, B as Briefcase, s as supabase } from "./router-CJiiTd-g.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-DVQQtQPm.js";
import { B as Badge } from "./badge-K2Rxl4bs.js";
import { B as Button } from "./button-CYsrxhE6.js";
import { L as LoaderCircle } from "./loader-circle-BApE_kuV.js";
import { A as ArrowLeft } from "./arrow-left-DysyZWUs.js";
import { S as ShieldCheck } from "./shield-check-BKlsm_hB.js";
import { M as MapPin } from "./map-pin-Dp4q3uSx.js";
import { M as MessageSquare } from "./message-square-CXc6FAzo.js";
import { S as Star } from "./star-D98SwHC6.js";
import { C as Calendar } from "./calendar-BSWo_WaD.js";
import { P as Phone } from "./phone-U7CVo9c0.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-BCQuZvc9.js";
import "./index-BWHTYThd.js";
import "./index-xaKJNf22.js";
import "./index-BDj9T5Ow.js";
import "./index-MJfIt0uB.js";
function WorkerDetails() {
  const {
    id
  } = Route.useSearch();
  const [worker, setWorker] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadWorker() {
      setIsLoading(true);
      try {
        const {
          data,
          error
        } = await supabase.from("profiles").select("*").eq("id", id).single();
        if (error) throw error;
        setWorker(data);
      } catch (err) {
        console.error("Error loading worker details:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadWorker();
  }, [id]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-10 w-10 animate-spin text-primary" }) });
  }
  if (!worker) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 pt-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Worker not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4 rounded-full", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/workers", children: "Back to Workers list" }) })
    ] });
  }
  const initials = worker.name?.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() || "W";
  const rating = worker.rating ? parseFloat(worker.rating.toString()) : 5;
  const jobsDone = worker.jobs_done ?? 0;
  const skillName = worker.skill || "General Helper";
  const memberSince = worker.created_at ? new Date(worker.created_at).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric"
  }) : "Jan 2026";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/workers", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to Nearby Workers"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 12
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "rounded-3xl bg-card border border-border shadow-elegant overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 bg-gradient-primary relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-40" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 md:px-10 pb-8 relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-5 items-start sm:items-end -mt-12 sm:-mt-16 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-24 w-24 sm:h-32 sm:w-32 border-4 border-card bg-card shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-primary text-primary-foreground text-3xl font-bold", children: worker.avatar || initials }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-extrabold", children: worker.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-success/15 text-success border-0 rounded-full inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
                " Aadhaar Verified"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1 inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
              " ",
              worker.location || "Noida",
              " · Near You"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 w-full sm:w-auto mt-2 sm:mt-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-full flex-1 sm:flex-none gap-2", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/messages", search: {
              userId: worker.id
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
              " Message"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "rounded-full flex-1 sm:flex-none bg-gradient-primary text-primary-foreground gap-2", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/post", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-4 w-4" }),
              " Hire now"
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg", children: "About" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground leading-relaxed", children: [
                "Experienced ",
                skillName.toLowerCase(),
                " available for commercial and residential construction projects. Device supports full GPS geofencing attendance, digital roster listings, and automated UPI Escrow wage transfers on JobNow."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg mb-3", children: "Skills & Expertise" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: [skillName, "Attendance Guaranteed", "Geofence Clockin Support", "UPI Account Active"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "rounded-full px-3 py-1 font-medium", children: s }, s)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg mb-3", children: "Recent Reviews" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [{
                name: "Verified Contractor Review",
                rating: Math.floor(rating),
                date: "Recently",
                text: "Excellent field work. Arrived on time and was very professional."
              }].map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-muted/30 p-4 border border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: r.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: r.date })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 text-amber-500 mt-1", children: Array.from({
                  length: 5
                }).map((_, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: `h-3.5 w-3.5 ${j < r.rating ? "fill-current" : "opacity-30"}` }, j)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-2 text-muted-foreground", children: r.text })
              ] }, i)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "space-y-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-muted/30 p-5 border border-border space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Star, label: "Rating", value: `${rating} / 5.0` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Briefcase, label: "Jobs completed", value: `${jobsDone} jobs` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Calendar, label: "Member since", value: memberSince }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { icon: Phone, label: "Contact", value: worker.phone || "No phone provided" })
          ] }) })
        ] })
      ] })
    ] })
  ] });
}
function InfoRow({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-lg bg-card border border-border grid place-items-center text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: value })
    ] })
  ] });
}
export {
  WorkerDetails as component
};
