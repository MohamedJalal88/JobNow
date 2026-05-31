import { r as reactExports, W as jsxRuntimeExports } from "./server-Brds8CES.js";
import { c as createLucideIcon, B as Briefcase, b as Link, s as supabase } from "./router-fTGMDcAU.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-BjfoNoSO.js";
import { B as Badge } from "./badge-DMnAyUHh.js";
import { U as Users } from "./users-BTGqadLE.js";
import { I as IndianRupee } from "./indian-rupee-DSYuZIxI.js";
import { A as ArrowLeft } from "./arrow-left-z2sXZ9QN.js";
import { T as TrendingUp } from "./trending-up-DOWBfm1q.js";
import { E as Ellipsis } from "./ellipsis-vX148tAn.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DRyp94vH.js";
import "./index-CyVeoe2Y.js";
import "./index-Buhi5q-1.js";
import "./index-XFZqbW9A.js";
import "./index--uSmo9Br.js";
const __iconNode = [
  [
    "path",
    {
      d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
      key: "1jaruq"
    }
  ]
];
const Flag = createLucideIcon("flag", __iconNode);
function Admin() {
  const [stats, setStats] = reactExports.useState({
    totalUsers: 0,
    activeJobs: 0,
    gmv: 0,
    reports: 0
  });
  const [recentUsers, setRecentUsers] = reactExports.useState([]);
  const [recentJobs, setRecentJobs] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadAdminData() {
      try {
        const {
          data: usersData,
          error: usersErr
        } = await supabase.from("profiles").select("*").order("created_at", {
          ascending: false
        });
        if (usersErr) throw usersErr;
        const {
          data: jobsData,
          error: jobsErr
        } = await supabase.from("jobs").select("*").order("created_at", {
          ascending: false
        });
        if (jobsErr) throw jobsErr;
        const {
          data: appsData
        } = await supabase.from("applications").select("*, job:jobs(pay_per_day, duration_days)").eq("status", "hired");
        const calculatedGmv = (appsData || []).reduce((acc, app) => {
          const pay = app.job?.pay_per_day || 0;
          const days = app.job?.duration_days || 0;
          return acc + pay * days;
        }, 0);
        const openOrActiveJobsCount = (jobsData || []).filter((j) => j.status === "open" || j.status === "active").length;
        const reportsCount = (usersData || []).filter((u) => u.rating && u.rating < 3).length;
        setStats({
          totalUsers: usersData?.length || 0,
          activeJobs: openOrActiveJobsCount,
          gmv: calculatedGmv,
          reports: reportsCount
        });
        setRecentUsers((usersData || []).slice(0, 5));
        setRecentJobs((jobsData || []).slice(0, 5));
      } catch (err) {
        console.error("Error loading admin data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAdminData();
  }, []);
  const STATS_CARDS = [{
    label: "Total users",
    value: stats.totalUsers.toLocaleString(),
    icon: Users,
    tone: "from-blue-800 to-slate-900"
  }, {
    label: "Active jobs",
    value: stats.activeJobs.toLocaleString(),
    icon: Briefcase,
    tone: "from-emerald-500 to-teal-600"
  }, {
    label: "GMV (₹)",
    value: stats.gmv >= 1e5 ? `${(stats.gmv / 1e5).toFixed(1)}L` : stats.gmv.toLocaleString(),
    icon: IndianRupee,
    tone: "from-blue-600 to-sky-700"
  }, {
    label: "Reports",
    value: stats.reports.toString(),
    icon: Flag,
    tone: "from-slate-700 to-slate-900"
  }];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "min-h-dvh bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-5 pt-7 pb-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-1 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Admin console" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-extrabold", children: "Overview" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-success/15 text-success border-0 rounded-full", children: "All systems normal" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-2 md:grid-cols-4 gap-3", children: STATS_CARDS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative overflow-hidden rounded-2xl p-4 text-white bg-gradient-to-br ${s.tone} shadow-soft`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 -right-4 h-20 w-20 rounded-full bg-white/15 blur-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs opacity-90", children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4 opacity-90" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "relative mt-2 text-2xl font-extrabold", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "relative text-[10px] opacity-90 mt-0.5 inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3 w-3" }),
        "+12% MoM"
      ] })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 grid md:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Recent users", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentUsers.map((w) => {
        const initials = w.name?.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase() || "U";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-10 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-primary text-primary-foreground font-semibold", children: w.avatar || initials }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: w.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground capitalize", children: [
              w.role,
              " · ",
              w.skill || "Helper",
              " · ★ ",
              w.rating || "5.0"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "h-8 w-8 rounded-full hover:bg-muted grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4" }) })
        ] }, w.id);
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Recent jobs", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: recentJobs.map((j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-3 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-xl bg-muted grid place-items-center text-xs font-bold uppercase", children: j.title.substring(0, 2) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: j.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "₹",
            j.pay_per_day,
            "/day · ",
            j.location
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "rounded-full capitalize", children: j.status })
      ] }, j.id)) }) })
    ] })
  ] }) });
}
function Panel({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-5 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs text-primary font-medium", children: "View all" })
    ] }),
    children
  ] });
}
export {
  Admin as component
};
