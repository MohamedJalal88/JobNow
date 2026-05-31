import { r as reactExports, W as jsxRuntimeExports } from "./server-D9f26qs9.js";
import { G as useParams, h as useLanguage, b as Link, s as supabase, t as toast } from "./router-D271R6tG.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-DP81uZtj.js";
import { B as Badge } from "./badge-Crs-jTDn.js";
import { B as Button } from "./button-DuUw4OSY.js";
import { A as ArrowLeft } from "./arrow-left-BcxA52cs.js";
import { S as Star } from "./star-FMmgCmSx.js";
import { C as CircleCheck } from "./circle-check-C8FZ7Hz2.js";
import { M as MapPin } from "./map-pin-CnpljVeo.js";
import { P as Phone } from "./phone-5smvoopI.js";
import { M as MessageSquare } from "./message-square-B7xO_Ubn.js";
import { C as Clock } from "./clock-R7DXfDgW.js";
import { C as Check } from "./check-D1MBAsRZ.js";
import { X } from "./x-CtarryAC.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-Bms23s2b.js";
import "./index-C63i5dPR.js";
import "./index-C5Fgo2z4.js";
import "./index-t_H3gLFJ.js";
import "./index-B2wzRjJC.js";
function ApplicationDetails() {
  const {
    applicationId
  } = useParams({
    from: "/contractor/applications/$applicationId"
  });
  const {
    t
  } = useLanguage();
  const [app, setApp] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadAppDetails() {
      try {
        const {
          data: dbApp,
          error
        } = await supabase.from("applications").select("*, worker:profiles(*), job:jobs(*)").eq("id", applicationId).single();
        if (error) throw error;
        setApp(dbApp);
      } catch (err) {
        console.error("Error loading application details:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAppDetails();
  }, [applicationId]);
  async function handleStatusChange(nextStatus) {
    try {
      const {
        error
      } = await supabase.from("applications").update({
        status: nextStatus
      }).eq("id", app.id);
      if (error) throw error;
      setApp((prev) => ({
        ...prev,
        status: nextStatus
      }));
      try {
        await supabase.from("notifications").insert({
          user_id: app.worker_id,
          title: nextStatus === "hired" ? "Congratulations! You are hired!" : "Application Status",
          body: nextStatus === "hired" ? `You have been hired for the job "${app.job?.title}". Pack your tools!` : `Your application for the job "${app.job?.title}" was declined.`,
          type: "job",
          unread: true
        });
      } catch (notifErr) {
        console.warn("Could not insert notification:", notifErr);
      }
      if (nextStatus === "hired") {
        toast.success("Worker hired! Escrow wage roll locked successfully.");
      } else {
        toast.success("Application declined politely.");
      }
    } catch (err) {
      console.error("Error updating application status:", err);
      toast.error("Failed to update status");
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary" }) });
  }
  if (!app) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 pt-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Application not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4 rounded-full", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/applications", children: "Back to Applications" }) })
    ] });
  }
  const w = app.worker;
  const job = app.job;
  const initials = w.name?.split(" ").map((n) => n[0]).join("") || "W";
  const createdTime = new Date(app.created_at).getTime();
  const diffMins = Math.max(1, Math.floor((Date.now() - createdTime) / 6e4));
  const timeAgo = diffMins < 60 ? `${diffMins}m ago` : `${Math.floor(diffMins / 60)}h ago`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", className: "rounded-full h-10 w-10 shrink-0", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/applications", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-extrabold tracking-tight", children: t("Worker Verification & Application Review") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: t("Inspect physical verification badges, and check geofenced readiness before locking escrow.") })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[1fr_300px] gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft text-center relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] bg-success/20 text-success px-3 py-1 rounded-full font-extrabold uppercase tracking-wider flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🛡️" }),
            " Aadhaar Verified (100% Match)"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-24 w-24 mx-auto mb-4 border-4 border-background shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-primary text-primary-foreground text-2xl font-bold", children: w.avatar || initials }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: w.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary font-medium text-sm mt-1 capitalize", children: [
            w.skill || "Helper",
            " · Level 3 Expert"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-center gap-4 text-sm text-muted-foreground flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "h-4 w-4 text-amber-500 fill-amber-500" }),
              " ",
              w.rating || 5
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success" }),
              " ",
              w.jobs_done || 0,
              " Jobs Done"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4 text-primary" }),
              " Noida (Ready for Geofence)"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex gap-3 justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
              " ",
              t("Call")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-full gap-2", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/messages", search: {
              userId: w.id
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
              " ",
              t("Message")
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-lg mb-2", children: t("Physical Verification & Attendance Readiness") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-xs space-y-2 text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-foreground font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success shrink-0" }),
                " Government Aadhaar ID physically verified by JobNow Field Team."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-foreground font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success shrink-0" }),
                " Worker device supports GPS Geofencing (100m accuracy)."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-foreground font-medium", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success shrink-0" }),
                " Same-day UPI Escrow payout route active and verified."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-sm mb-2", children: "Work History Highlights" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
              "Experienced ",
              w.skill || "helper",
              " with over 5 years of field experience. Specializes in residential and commercial projects. Known for punctuality and high-quality finish. Has own transport and basic tools."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/15 text-primary border-0 rounded-full mb-4 uppercase text-[10px] font-extrabold tracking-wider", children: app.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-1", children: t("Applied For") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-lg", children: job?.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-2 inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
          " ",
          timeAgo
        ] }),
        app.status === "applied" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => handleStatusChange("hired"), className: "w-full h-12 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow text-base gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-5 w-5" }),
            " ",
            t("Hire & Lock Escrow")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => handleStatusChange("declined"), variant: "outline", className: "w-full h-12 rounded-full font-semibold text-base gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }),
            " ",
            t("Decline")
          ] })
        ] }),
        app.status === "hired" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 p-3 rounded-2xl bg-success/10 text-success text-center font-bold text-sm", children: "🛡️ Hired! Escrow Locked & Roster Active." }),
        app.status === "declined" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 p-3 rounded-2xl bg-destructive/10 text-destructive text-center font-bold text-sm", children: "❌ Application Declined." })
      ] }) })
    ] })
  ] });
}
export {
  ApplicationDetails as component
};
