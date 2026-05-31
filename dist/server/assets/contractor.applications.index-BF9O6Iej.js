import { r as reactExports, W as jsxRuntimeExports } from "./server-asg8yyOI.js";
import { u as useAuth, m as motion, d as cn, b as Link, s as supabase, t as toast } from "./router-CJiiTd-g.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-DVQQtQPm.js";
import { B as Badge } from "./badge-K2Rxl4bs.js";
import { B as Button } from "./button-CYsrxhE6.js";
import { C as Check } from "./check-BU0hd1v0.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-BCQuZvc9.js";
import "./index-BWHTYThd.js";
import "./index-xaKJNf22.js";
import "./index-BDj9T5Ow.js";
import "./index-MJfIt0uB.js";
function Applications() {
  const {
    user
  } = useAuth();
  const [applications, setApplications] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadApplications() {
      if (!user) return;
      try {
        const {
          data: dbJobs
        } = await supabase.from("jobs").select("id").eq("contractor_id", user.id);
        const jobIds = (dbJobs || []).map((j) => j.id);
        if (jobIds.length > 0) {
          const {
            data: dbApps,
            error: appsErr
          } = await supabase.from("applications").select("*, worker:profiles(*), job:jobs(*)").in("job_id", jobIds).order("created_at", {
            ascending: false
          });
          if (appsErr) throw appsErr;
          setApplications(dbApps || []);
        }
      } catch (err) {
        console.error("Error loading contractor applications:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadApplications();
  }, [user]);
  async function handleHire(appId) {
    try {
      const app = applications.find((a) => a.id === appId);
      const {
        error
      } = await supabase.from("applications").update({
        status: "hired"
      }).eq("id", appId);
      if (error) throw error;
      if (app) {
        try {
          await supabase.from("notifications").insert({
            user_id: app.worker_id,
            title: "Congratulations! You are hired!",
            body: `You have been hired for the job "${app.job?.title}". Pack your tools!`,
            type: "job",
            unread: true
          });
        } catch (notifErr) {
          console.warn("Could not insert notification:", notifErr);
        }
      }
      setApplications((prev) => prev.map((app2) => app2.id === appId ? {
        ...app2,
        status: "hired"
      } : app2));
      toast.success("Worker hired successfully! Escrow locked.");
    } catch (err) {
      console.error("Error hiring worker:", err);
      toast.error("Failed to hire worker");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-extrabold tracking-tight", children: "Applications" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Workers who applied to your jobs." }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-10 w-10 border-b-2 border-primary" }) }) : applications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-3xl bg-card border border-border p-10 text-center text-muted-foreground", children: "No worker applications found. Post more jobs to get candidate matches!" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: applications.map((a, i) => {
      const w = a.worker;
      const initials = w.name?.split(" ").map((n) => n[0]).join("") || "W";
      const createdTime = new Date(a.created_at).getTime();
      const diffMins = Math.max(1, Math.floor((Date.now() - createdTime) / 6e4));
      const timeAgo = diffMins < 60 ? `${diffMins}m ago` : `${Math.floor(diffMins / 60)}h ago`;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 8
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: i * 0.04
      }, className: "rounded-3xl bg-card border border-border p-5 shadow-soft hover:shadow-elegant transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-12 w-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-primary text-primary-foreground font-semibold", children: w.avatar || initials }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold truncate", children: w.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground capitalize", children: [
              w.skill || "Helper",
              " · ★ ",
              w.rating || 5
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: cn("rounded-full border-0 uppercase text-[10px] font-extrabold tracking-wider", a.status === "applied" ? "bg-primary/15 text-primary" : a.status === "shortlisted" ? "bg-muted text-foreground" : a.status === "hired" ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive"), children: a.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 rounded-2xl bg-muted/40 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] uppercase tracking-wider text-muted-foreground", children: "Applied for" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold truncate", children: a.job?.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-1", children: timeAgo })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-full flex-1", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/applications/$applicationId", params: {
            applicationId: a.id
          }, children: "Review" }) }),
          a.status === "applied" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => handleHire(a.id), className: "rounded-full flex-1 bg-gradient-primary text-primary-foreground gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
            " Hire"
          ] })
        ] })
      ] }, a.id);
    }) })
  ] });
}
export {
  Applications as component
};
