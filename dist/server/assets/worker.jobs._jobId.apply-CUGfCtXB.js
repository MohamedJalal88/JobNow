import { r as reactExports, W as jsxRuntimeExports } from "./server-tlzWzzxG.js";
import { G as useParams, a as useNavigate, h as useLanguage, u as useAuth, b as Link, s as supabase, t as toast } from "./router-BN8-Jwly.js";
import { B as Button } from "./button-Q5sIVU3I.js";
import { I as Input } from "./input-CI1R33Pa.js";
import { L as Label } from "./label-DSZXNWSM.js";
import { S as SKILLS } from "./skills-config-DPVCG2Pg.js";
import { A as ArrowLeft } from "./arrow-left-_AI6_IRH.js";
import { M as MapPin } from "./map-pin-CcWakKMb.js";
import { I as IndianRupee } from "./indian-rupee-CriXNZzL.js";
import { C as Clock } from "./clock-DXPWLM1l.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DGfzVTOR.js";
import "./index-7ypanOaY.js";
import "./index-BQm1n8Yx.js";
import "./zap-Bz0W7g9c.js";
import "./sparkles-DO91-M2b.js";
import "./hard-hat-wiyMP55G.js";
function ApplyForJob() {
  const {
    jobId
  } = useParams({
    from: "/worker/jobs/$jobId/apply"
  });
  const navigate = useNavigate();
  const {
    t
  } = useLanguage();
  const {
    user
  } = useAuth();
  const [job, setJob] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [rate, setRate] = reactExports.useState("");
  const skill = SKILLS.find((s) => s.id === job?.skill);
  reactExports.useEffect(() => {
    async function fetchJob() {
      try {
        const {
          data,
          error
        } = await supabase.from("jobs").select("*, contractor:profiles(name, avatar)").eq("id", jobId).single();
        if (error) throw error;
        if (data) {
          setJob({
            id: data.id,
            contractorId: data.contractor_id,
            title: data.title,
            description: data.description,
            skill: data.skill,
            payPerDay: data.pay_per_day,
            durationDays: data.duration_days,
            workersNeeded: data.workers_needed,
            location: data.location,
            contractor: data.contractor?.name || "Contractor",
            contractorAvatar: data.contractor?.avatar || "C"
          });
          setRate(data.pay_per_day.toString());
        }
      } catch (err) {
        console.error("Error fetching job details:", err);
        toast.error("Failed to load job details.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchJob();
  }, [jobId]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !job) {
      toast.error("You must be logged in to apply.");
      return;
    }
    try {
      const {
        error
      } = await supabase.from("applications").insert({
        job_id: jobId,
        worker_id: user.id,
        status: "applied"
      });
      if (error) {
        if (error.code === "23505") {
          toast.info("You have already applied for this job!");
          navigate({
            to: "/worker/accepted"
          });
          return;
        }
        throw error;
      }
      try {
        if (job.contractorId) {
          await supabase.from("notifications").insert({
            user_id: job.contractorId,
            title: "New Job Application",
            body: `${user.name || "A worker"} has claimed a slot for "${job.title}".`,
            type: "job",
            unread: true
          });
        }
      } catch (notifErr) {
        console.warn("Could not insert application notification:", notifErr);
      }
      toast.success("✅ Slot Claimed! ₹850 Escrow locked for your attendance.");
      navigate({
        to: "/worker/accepted"
      });
    } catch (err) {
      console.error("Error submitting application:", err);
      toast.error(err instanceof Error ? err.message : "Failed to claim job slot.");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center min-h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) });
  }
  if (!job) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 pt-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Job not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/worker", className: "text-primary mt-2 inline-block underline", children: "Go back to dashboard" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/worker/jobs/$jobId", params: {
      jobId: job.id
    }, className: "inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " ",
      t("Back to job details")
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 text-2xl md:text-3xl font-extrabold tracking-tight", children: t("Claim Escrow Job Slot") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t("No cover letters needed. Lock your slot instantly with Escrow Guarantee.") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-3xl bg-card border border-border overflow-hidden shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `p-5 text-white bg-gradient-to-br ${skill?.color ?? "from-primary to-primary"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-white/20 text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider", children: "🔒 Escrow Guaranteed Job" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs bg-black/30 px-2.5 py-1 rounded-full font-bold", children: [
            job.workersNeeded,
            " Slots Left"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg", children: job.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90", children: job.contractor }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-4 text-xs font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            " ",
            job.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-3.5 w-3.5" }),
            " ",
            job.payPerDay,
            "/day baseline"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
            " ",
            job.durationDays,
            " days"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "p-6 md:p-8 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🛡️" }),
            " ",
            t("100% Escrow Protection")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("The contractor has already deposited the wages into JobNow Escrow. Upon successful GPS clock-out, your pay will be instantly credited to your UPI account.") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold", children: t("Agreed Daily Wage (₹)") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: t("Fixed escrow baseline rate set by contractor.") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: rate, disabled: true, type: "number", className: "pl-9 h-12 rounded-xl bg-muted/60 border-transparent text-lg font-bold text-foreground" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", className: "flex-1 h-12 rounded-full font-semibold", onClick: () => navigate({
            to: "/worker/jobs/$jobId",
            params: {
              jobId: job.id
            }
          }), children: t("Cancel") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "flex-1 h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow text-base", children: t("Claim Slot & Lock Escrow") })
        ] })
      ] })
    ] })
  ] });
}
export {
  ApplyForJob as component
};
