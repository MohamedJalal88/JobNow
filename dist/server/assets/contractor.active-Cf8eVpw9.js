import { r as reactExports, W as jsxRuntimeExports } from "./server-asg8yyOI.js";
import { u as useAuth, b as Link, B as Briefcase, s as supabase, t as toast } from "./router-CJiiTd-g.js";
import { B as Badge } from "./badge-K2Rxl4bs.js";
import { S as SKILLS } from "./skills-config-DPZBFJXa.js";
import { a as DropdownMenu, b as DropdownMenuTrigger, c as DropdownMenuContent, f as DropdownMenuItem } from "./dropdown-menu-DdoakqtA.js";
import { U as Users } from "./users-ByybLJud.js";
import { C as ChevronRight } from "./chevron-right-Dda_06kg.js";
import { E as Ellipsis } from "./ellipsis-DX-HZFbd.js";
import { S as SquarePen, C as CirclePause } from "./square-pen-BQKeuRIo.js";
import { T as Trash2 } from "./trash-2-C6BnpDgS.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-MJfIt0uB.js";
import "./zap-BLSmICLD.js";
import "./sparkles-DITP6bCp.js";
import "./hard-hat-C4WqYtpT.js";
import "./index-DeS0QqHY.js";
import "./index-BWHTYThd.js";
import "./index-BDj9T5Ow.js";
import "./index-CwT--ASf.js";
import "./index-BCQuZvc9.js";
import "./index-B1Ksuubc.js";
import "./index-lw6_RpcP.js";
import "./check-BU0hd1v0.js";
function ActiveJobs() {
  const {
    user
  } = useAuth();
  const [jobs, setJobs] = reactExports.useState([]);
  const [applications, setApplications] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadActiveJobs() {
      if (!user) return;
      try {
        const {
          data: dbJobs,
          error: jobsErr
        } = await supabase.from("jobs").select("*").eq("contractor_id", user.id).order("created_at", {
          ascending: false
        });
        if (jobsErr) throw jobsErr;
        setJobs(dbJobs || []);
        const jobIds = (dbJobs || []).map((j) => j.id);
        if (jobIds.length > 0) {
          const {
            data: dbApps,
            error: appsErr
          } = await supabase.from("applications").select("id, job_id").in("job_id", jobIds);
          if (appsErr) throw appsErr;
          setApplications(dbApps || []);
        }
      } catch (err) {
        console.error("Error loading active jobs:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadActiveJobs();
  }, [user]);
  async function handleDelete(jobId) {
    try {
      const {
        error
      } = await supabase.from("jobs").delete().eq("id", jobId);
      if (error) throw error;
      setJobs((prev) => prev.filter((j) => j.id !== jobId));
      toast.success("Job deleted successfully");
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error("Failed to delete job");
    }
  }
  async function handleTogglePause(jobId, currentStatus) {
    const nextStatus = currentStatus === "open" ? "completed" : "open";
    try {
      const {
        error
      } = await supabase.from("jobs").update({
        status: nextStatus
      }).eq("id", jobId);
      if (error) throw error;
      setJobs((prev) => prev.map((j) => j.id === jobId ? {
        ...j,
        status: nextStatus
      } : j));
      toast.success(`Job status updated to ${nextStatus}`);
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-extrabold tracking-tight", children: "Active Jobs & Escrow Roster" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage live job posts, view geofenced check-ins, and oversee escrow locks." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-primary/10 border border-primary/20 px-4 py-2 flex items-center gap-2 w-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg", children: "🛡️" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-extrabold text-primary uppercase tracking-wider", children: "Escrow Fully Funded" })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-10 w-10 border-b-2 border-primary" }) }) : jobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-10 text-center text-muted-foreground", children: [
      "No jobs posted yet. Go to ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/post", className: "text-primary hover:underline font-bold", children: "Post Job" }),
      " to start hiring."
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4", children: jobs.map((j) => {
      const skill = SKILLS.find((s) => s.id === j.skill);
      const Icon = skill?.icon;
      const totalEscrow = j.pay_per_day * j.workers_needed * j.duration_days;
      const jobApps = applications.filter((app) => app.job_id === j.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/jobs/$jobId/manage", params: {
          jobId: j.id
        }, className: "block rounded-3xl bg-card border border-border p-5 shadow-soft hover:shadow-elegant transition-all hover:-translate-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-12 w-12 rounded-2xl bg-gradient-to-br ${skill?.color || "from-primary to-primary-foreground"} grid place-items-center text-white shadow-soft shrink-0`, children: Icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-5 w-5" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${j.status === "open" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"} border-0 rounded-full text-[10px] font-bold uppercase tracking-wider`, children: j.status === "open" ? "Live" : j.status }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider", children: [
                  "🔒 ₹",
                  totalEscrow.toLocaleString(),
                  " Escrow"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-base truncate text-foreground", children: j.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                j.location,
                " · 📍 Geofence: ",
                j.geofence_radius_meters || 100,
                "m"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-3 gap-2 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Pay/Day", value: `₹${j.pay_per_day}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Workers", value: `${j.workers_needed}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Duration", value: `${j.duration_days}d` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-3 border-t border-border flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground inline-flex items-center gap-1 font-medium", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-primary" }),
              " ",
              jobApps.length,
              " applications"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold inline-flex items-center gap-1", children: [
              "Manage Roster ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-8 w-8 rounded-full bg-background/80 backdrop-blur border border-border grid place-items-center hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-40 rounded-xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { className: "gap-2", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/post", search: {
              editId: j.id
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" }),
              " Edit"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-2", onClick: () => handleTogglePause(j.id, j.status), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePause, { className: "h-4 w-4" }),
              " ",
              j.status === "open" ? "Pause" : "Resume"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-2 text-destructive focus:text-destructive", onClick: () => handleDelete(j.id), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
              " Delete"
            ] })
          ] })
        ] }) })
      ] }, j.id);
    }) })
  ] });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/40 p-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm", children: value })
  ] });
}
export {
  ActiveJobs as component
};
