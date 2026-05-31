import { r as reactExports, W as jsxRuntimeExports } from "./server-asg8yyOI.js";
import { c as createLucideIcon, F as Route, b as Link, m as motion, s as supabase, t as toast } from "./router-CJiiTd-g.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-DVQQtQPm.js";
import { B as Badge } from "./badge-K2Rxl4bs.js";
import { B as Button } from "./button-CYsrxhE6.js";
import { T as Textarea } from "./textarea-xJJQLNoE.js";
import { L as LoaderCircle } from "./loader-circle-BApE_kuV.js";
import { A as ArrowLeft } from "./arrow-left-DysyZWUs.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-BCQuZvc9.js";
import "./index-BWHTYThd.js";
import "./index-xaKJNf22.js";
import "./index-BDj9T5Ow.js";
import "./index-MJfIt0uB.js";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
const REASONS = ["Not enough experience", "Skill mismatch", "Position filled", "Distance too far", "Other"];
function Declined() {
  const {
    id
  } = Route.useSearch();
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [app, setApp] = reactExports.useState(null);
  const [reason, setReason] = reactExports.useState(REASONS[0]);
  const [note, setNote] = reactExports.useState("");
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    async function loadDeclinedApplication() {
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
        console.error("Error loading declined application:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDeclinedApplication();
  }, [id]);
  async function handleSendFeedback() {
    if (!app) return;
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from("applications").update({
        status: "declined"
      }).eq("id", app.id);
      if (error) throw error;
      try {
        await supabase.from("notifications").insert({
          user_id: app.worker_id,
          title: "Application Status Updated",
          body: `Your application for "${app.job?.title}" was declined. Reason: ${reason}. ${note ? `Note: ${note}` : ""}`,
          type: "job",
          unread: true
        });
      } catch (notifErr) {
        console.warn("Notifications table might not exist yet, skipping in-app notification:", notifErr);
      }
      toast.success("Feedback sent to worker");
    } catch (err) {
      console.error("Error declining application:", err);
      toast.error("Failed to submit feedback");
    } finally {
      setIsSubmitting(false);
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  if (!app) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto mt-12 p-6 rounded-3xl bg-card border border-border text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Application not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2", children: "Could not load details for this application." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4 rounded-full", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/applications", children: "Back to Applications" }) })
    ] });
  }
  const workerName = app.worker?.name || "Worker";
  const workerAvatar = app.worker?.avatar || workerName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  const workerSkill = app.worker?.skill || "Helper";
  const workerRating = app.worker?.rating || "5.0";
  const jobTitle = app.job?.title || "General Job";
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
      }, className: "lg:col-span-2 rounded-3xl bg-card border border-border p-8 md:p-10 shadow-elegant", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-destructive/10 text-destructive grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-9 w-9" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-2xl md:text-3xl font-extrabold", children: "Application declined" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 text-muted-foreground", children: [
          "You've declined ",
          workerName,
          `'s application for "`,
          jobTitle,
          '". They will be notified politely.'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mb-2", children: "Reason for declining" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: REASONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setReason(r), className: `px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${reason === r ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-muted"}`, children: r }, r)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold mb-2", children: "Optional note (visible to worker)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: note, onChange: (e) => setNote(e.target.value), className: "rounded-2xl bg-card", rows: 4, placeholder: "Add a kind note for the worker…" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSendFeedback, disabled: isSubmitting, className: "rounded-full bg-gradient-primary text-primary-foreground font-semibold min-w-[120px]", children: isSubmitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : "Send feedback" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-full", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/applications", children: "Back to applications" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Worker" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-14 w-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-primary text-primary-foreground font-bold", children: workerAvatar }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: workerName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              workerSkill,
              " · ★ ",
              workerRating
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mt-4 rounded-full border-0 bg-destructive/15 text-destructive", children: "Declined" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl bg-muted/40 p-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: "Applied for" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: jobTitle })
        ] })
      ] })
    ] })
  ] });
}
export {
  Declined as component
};
