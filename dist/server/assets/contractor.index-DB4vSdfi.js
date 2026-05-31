import { r as reactExports, W as jsxRuntimeExports } from "./server-Bdhs9obN.js";
import { c as createLucideIcon, u as useAuth, h as useLanguage, B as Briefcase, b as Link, m as motion, s as supabase, t as toast } from "./router-BRcjVh65.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-pIIcMAyb.js";
import { B as Badge } from "./badge-CeDEXXqn.js";
import { S as SKILLS } from "./skills-config-DxDgjwUf.js";
import { U as Users } from "./users-CiECk4c5.js";
import { B as Bell } from "./bell-BuIkKKRo.js";
import { T as TrendingUp } from "./trending-up-kaLTWONN.js";
import { M as MapPin } from "./map-pin-Dzjs76hk.js";
import { C as ChevronRight } from "./chevron-right-CjNIn6MF.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-CT7-nG3N.js";
import "./index-JJn3Sn7e.js";
import "./index-DjzVvyLV.js";
import "./index-lxwdXnt7.js";
import "./index-CSRB__ba.js";
import "./zap-B4WKiyj2.js";
import "./sparkles-DziH-1fm.js";
import "./hard-hat-D-NfbZSZ.js";
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
function ContractorHome() {
  const {
    user
  } = useAuth();
  const companyName = user?.name ?? "Sharma Contractors";
  const [batchPaid, setBatchPaid] = reactExports.useState(false);
  const [isPaying, setIsPaying] = reactExports.useState(false);
  const {
    t
  } = useLanguage();
  const [jobs, setJobs] = reactExports.useState([]);
  const [applications, setApplications] = reactExports.useState([]);
  const [workers, setWorkers] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadDashboardData() {
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
          } = await supabase.from("applications").select("*, worker:profiles(*), job:jobs(*)").in("job_id", jobIds);
          if (appsErr) throw appsErr;
          setApplications(dbApps || []);
        }
        const {
          data: dbWorkers,
          error: workersErr
        } = await supabase.from("profiles").select("*").eq("role", "worker").limit(5);
        if (workersErr) throw workersErr;
        setWorkers(dbWorkers || []);
      } catch (err) {
        console.error("Error loading contractor dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, [user]);
  const activeJobsCount = jobs.filter((j) => j.status === "open" || j.status === "active").length;
  const hiredCount = applications.filter((a) => a.status === "hired" || a.status === "completed").length;
  const pendingAppsCount = applications.filter((a) => a.status === "applied").length;
  const hireRate = applications.length > 0 ? Math.round(hiredCount / applications.length * 100) : 0;
  const STATS = [{
    label: "Active jobs",
    value: String(activeJobsCount),
    trend: `${jobs.length} total posted`,
    icon: Briefcase
  }, {
    label: "Workers hired",
    value: String(hiredCount),
    trend: "Active roster",
    icon: Users
  }, {
    label: "Applications",
    value: String(pendingAppsCount),
    trend: `${applications.length} total received`,
    icon: Bell
  }, {
    label: "Hire rate",
    value: `${hireRate}%`,
    trend: "Dynamic conversion",
    icon: TrendingUp
  }];
  const rosterWorkers = applications.filter((a) => a.status === "hired" || a.status === "completed").slice(0, 5).map((a) => {
    const w = a.worker;
    const job = a.job;
    return {
      id: w.id,
      name: w.name,
      avatar: w.avatar || w.name?.split(" ").map((n) => n[0]).join("") || "W",
      rating: w.rating || 5,
      skillLevel: w.skill ? `${w.skill.charAt(0).toUpperCase()}${w.skill.slice(1)}` : "Worker",
      clockedIn: job.attendance_status === "clocked_in" || job.attendance_status === "clocked_out",
      clockInTime: job.attendance_status === "clocked_in" ? "7:30 AM" : "Pending"
    };
  });
  const totalTodayEscrow = rosterWorkers.length * 850;
  function simulateBatchPayout() {
    if (rosterWorkers.length === 0) {
      toast.error("No hired workers to pay!");
      return;
    }
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setBatchPaid(true);
      toast.success(`✅ ₹${totalTodayEscrow.toLocaleString()} Escrow released instantly to ${rosterWorkers.length} workers via Batch UPI!`);
    }, 2e3);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden rounded-3xl bg-gradient-hero text-white p-6 md:p-8 shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-mesh opacity-40" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col md:flex-row md:items-center md:justify-between gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest opacity-80", children: t("Welcome back") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "bg-success text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider", children: [
              "🛡️ ",
              t("PF & ESIC Compliant Enterprise")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-extrabold mt-1", children: companyName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1.5 inline-flex items-center gap-1 text-sm opacity-90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
            " Hiring in ",
            user?.location?.split(",")[0] || "Noida",
            " · Escrow Reserve: ₹45,000"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/post", className: "inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-primary font-semibold shadow-glow hover:opacity-95 transition-all w-fit", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " ",
          t("Post a new job")
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-6 rounded-3xl bg-card border-2 border-primary/40 p-6 shadow-soft bg-gradient-to-r from-primary/5 via-transparent to-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "📍" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-extrabold text-foreground", children: t("Live Geofenced Attendance & Escrow Payout") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            rosterWorkers.length,
            " workers assigned. GPS Geofence: 100m."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full md:w-auto justify-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right hidden sm:block", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground uppercase font-bold tracking-wider", children: t("Today's Escrow Wage Roll") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-extrabold text-primary", children: [
              "₹",
              totalTodayEscrow.toLocaleString(),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-normal text-muted-foreground", children: [
                "(",
                rosterWorkers.length,
                " workers)"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: simulateBatchPayout, disabled: batchPaid || isPaying || rosterWorkers.length === 0, className: `h-12 px-6 rounded-full bg-gradient-primary text-primary-foreground font-bold shadow-glow hover:opacity-95 transition-all shrink-0 flex items-center gap-2 ${isPaying ? "animate-pulse" : batchPaid ? "bg-success text-white opacity-100" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: isPaying ? "Processing Batch UPI…" : batchPaid ? "Wages Released (Escrow Cleared)" : `Release Batch Payout (${rosterWorkers.length} Workers)` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" })
          ] })
        ] })
      ] }),
      rosterWorkers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-6 text-sm text-muted-foreground", children: "No workers currently hired. When you hire workers, their geofenced attendance will appear here." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3", children: rosterWorkers.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-3.5 flex flex-col items-center text-center shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-12 w-12 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-primary text-primary-foreground font-bold", children: w.avatar }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm truncate w-full", children: w.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground mb-2", children: [
          "★ ",
          w.rating,
          " · ",
          w.skillLevel
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto w-full pt-2 border-t border-border flex items-center justify-between text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-muted-foreground", children: "Clock-in:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: w.clockedIn ? "font-bold text-success" : "font-bold text-amber-500", children: w.clockedIn ? `🟢 ${w.clockInTime}` : "🔴 7:30 AM (Pending)" })
        ] })
      ] }, w.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4", children: STATS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: i * 0.05
    }, className: "rounded-2xl bg-card border border-border p-4 md:p-5 shadow-soft hover:shadow-elegant hover:-translate-y-0.5 transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: t(s.label) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-9 rounded-xl bg-primary/10 text-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-2xl md:text-3xl font-extrabold tracking-tight", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: s.trend })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 grid grid-cols-1 xl:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "xl:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { title: t("Active job posts"), actionTo: "/contractor/active" }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) : jobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card border border-border p-6 text-center text-sm text-muted-foreground", children: `You haven't posted any jobs yet. Click "Post a new job" above to start.` }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: jobs.slice(0, 4).map((j) => {
          const skill = SKILLS.find((s) => s.id === j.skill);
          const Icon = skill?.icon;
          const jobApps = applications.filter((app) => app.job_id === j.id);
          const createdTime = new Date(j.created_at).getTime();
          const diffMins = Math.max(1, Math.floor((Date.now() - createdTime) / 6e4));
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/jobs/$jobId/manage", params: {
            jobId: j.id
          }, className: "block rounded-2xl bg-card border border-border p-4 shadow-soft hover:shadow-elegant hover:-translate-y-0.5 transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-11 w-11 rounded-xl bg-gradient-to-br ${skill?.color || "from-primary to-primary-foreground"} grid place-items-center text-white shadow-soft`, children: Icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: j.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  j.workers_needed,
                  " workers · ₹",
                  j.pay_per_day,
                  "/day · ",
                  j.location
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${j.status === "open" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"} border-0 rounded-full`, children: j.status === "open" ? "Live" : j.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                jobApps.length,
                " applications · posted ",
                diffMins < 60 ? `${diffMins}m ago` : `${Math.floor(diffMins / 60)}h ago`
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-semibold inline-flex items-center", children: [
                "View ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
              ] })
            ] })
          ] }, j.id);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { title: t("Nearby workers"), actionTo: "/contractor/workers" }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) : workers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card border border-border p-6 text-center text-sm text-muted-foreground", children: "No workers registered in your area yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: workers.map((w) => {
          const skill = SKILLS.find((s) => s.id === w.skill);
          const nameInitials = w.name?.split(" ").map((n) => n[0]).join("") || "W";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-3.5 flex items-center gap-3 shadow-soft hover:shadow-elegant transition-all", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-11 w-11", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-primary text-primary-foreground font-semibold", children: w.avatar || nameInitials }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: w.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                skill?.name || w.skill || "Helper",
                " · ★ ",
                w.rating || 5,
                " · 1.2km"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/worker-details", search: {
              id: w.id
            }, className: "flex items-center justify-center h-9 px-4 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold shadow-soft hover:opacity-95", children: t("Hire") })
          ] }, w.id);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10" })
  ] });
}
function Heading({
  title,
  actionTo,
  actionLabel = "See all"
}) {
  const {
    t
  } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: actionTo, className: "text-xs text-primary font-semibold inline-flex items-center hover:gap-2 gap-1 transition-all", children: [
      t(actionLabel),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3.5 w-3.5" })
    ] })
  ] });
}
export {
  ContractorHome as component
};
