import { r as reactExports, W as jsxRuntimeExports } from "./server-C4dWhZyv.js";
import { c as createLucideIcon, G as useParams, b as Link, s as supabase, t as toast } from "./router-WW3szPP7.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-DKwW0ft5.js";
import { B as Badge } from "./badge-BbNRQ_08.js";
import { B as Button } from "./button-DEGIpoY6.js";
import { a as DropdownMenu, b as DropdownMenuTrigger, c as DropdownMenuContent, d as DropdownMenuLabel, e as DropdownMenuSeparator, f as DropdownMenuItem } from "./dropdown-menu-qRcNR3Kq.js";
import { S as SKILLS } from "./skills-config-DbJMp3N2.js";
import { A as ArrowLeft } from "./arrow-left-B0ptsRh_.js";
import { C as CirclePause, S as SquarePen } from "./square-pen-DJcS6GPe.js";
import { E as Ellipsis } from "./ellipsis-CttPReWY.js";
import { T as Trash2 } from "./trash-2-CgvJkMVE.js";
import { U as Users } from "./users-CFmWlfRJ.js";
import { C as CircleCheck } from "./circle-check-CLiQI4PZ.js";
import { C as Clock } from "./clock-C3Gaonnb.js";
import { M as MessageSquare } from "./message-square-CzCne64O.js";
import { C as ChartColumn } from "./chart-column-DZJbj9ie.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-DbFYQznj.js";
import "./index-BZTqIGMe.js";
import "./index-Od-5zCBa.js";
import "./index-B4gOCyvo.js";
import "./index-BBwSRa9y.js";
import "./index-BcRQ9-0a.js";
import "./index-Tm08NaaV.js";
import "./index-QzyIYWUi.js";
import "./index-DFoc6wlL.js";
import "./chevron-right-BTUddhV9.js";
import "./check-wPv7Ktgy.js";
import "./zap-BvGYa9P1.js";
import "./sparkles-BNbbs-o2.js";
import "./hard-hat-CbsBRCPM.js";
const __iconNode$2 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["rect", { x: "9", y: "9", width: "6", height: "6", rx: "1", key: "1ssd4o" }]
];
const CircleStop = createLucideIcon("circle-stop", __iconNode$1);
const __iconNode = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode);
function ManageJob() {
  const {
    jobId
  } = useParams({
    from: "/contractor/jobs/$jobId/manage"
  });
  const [job, setJob] = reactExports.useState(null);
  const [applications, setApplications] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    async function loadJobData() {
      try {
        const {
          data: dbJob,
          error: jobErr
        } = await supabase.from("jobs").select("*, contractor:profiles(name)").eq("id", jobId).single();
        if (jobErr) throw jobErr;
        setJob(dbJob);
        const {
          data: dbApps,
          error: appsErr
        } = await supabase.from("applications").select("*, worker:profiles(*)").eq("job_id", jobId);
        if (appsErr) throw appsErr;
        setApplications(dbApps || []);
      } catch (err) {
        console.error("Error loading job details:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadJobData();
  }, [jobId]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary" }) });
  }
  if (!job) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 pt-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Job not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4 rounded-full", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/active", children: "Back to Active Jobs" }) })
    ] });
  }
  const skill = SKILLS.find((s) => s.id === job.skill);
  skill?.icon;
  const totalEscrow = job.pay_per_day * job.duration_days * job.workers_needed;
  const hiredCount = applications.filter((app) => app.status === "hired" || app.status === "completed").length;
  async function handleTogglePause() {
    const nextStatus = job.status === "open" ? "completed" : "open";
    try {
      const {
        error
      } = await supabase.from("jobs").update({
        status: nextStatus
      }).eq("id", job.id);
      if (error) throw error;
      setJob((prev) => ({
        ...prev,
        status: nextStatus
      }));
      toast.success(`Job status set to ${nextStatus}`);
    } catch (err) {
      console.error("Error pausing job:", err);
      toast.error("Failed to update status");
    }
  }
  async function handleDeleteJob() {
    try {
      const {
        error
      } = await supabase.from("jobs").delete().eq("id", job.id);
      if (error) throw error;
      toast.success("Job deleted successfully");
      window.location.href = "/contractor/active";
    } catch (err) {
      console.error("Error deleting job:", err);
      toast.error("Failed to delete job");
    }
  }
  function copyIdToClipboard() {
    navigator.clipboard.writeText(job.id);
    toast.success("Copied Job ID to clipboard");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", className: "rounded-full h-10 w-10 shrink-0", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/active", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-extrabold tracking-tight", children: job.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${job.status === "open" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"} border-0 rounded-full font-bold uppercase tracking-wider`, children: job.status === "open" ? "Active" : job.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold uppercase tracking-wider", children: [
              "🔒 ₹",
              totalEscrow.toLocaleString(),
              " Escrow Funded"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1 inline-flex items-center gap-1.5 flex-wrap", children: [
            "ID: ",
            job.id.toUpperCase(),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3 cursor-pointer hover:text-foreground", onClick: copyIdToClipboard }),
            " · Posted ",
            Math.max(1, Math.floor((Date.now() - new Date(job.created_at).getTime()) / 6e4)),
            " mins ago · Geofence: ",
            job.geofence_radius_meters || 100,
            "m"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full gap-2", onClick: handleTogglePause, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePause, { className: "h-4 w-4" }),
          " ",
          job.status === "open" ? "Pause" : "Resume"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "rounded-full gap-2 bg-gradient-primary text-primary-foreground", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/contractor/post", search: {
          editId: job.id
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SquarePen, { className: "h-4 w-4" }),
          " Edit Job"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", className: "rounded-full h-10 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-48 rounded-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { children: "Job Actions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-2", onClick: handleTogglePause, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleStop, { className: "h-4 w-4" }),
              " Toggle Open/Close"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "gap-2 text-destructive focus:text-destructive", onClick: handleDeleteJob, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
              " Delete Job"
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Users, label: "Applications", value: String(applications.length), trend: "Total applications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: CircleCheck, label: "Hired", value: String(hiredCount), trend: `out of ${job.workers_needed}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Clock, label: "Duration", value: `${job.duration_days} Days`, trend: "Job timeframe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: Activity, label: "Status", value: job.status === "open" ? "Live" : "Paused", trend: "Current visibility" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border shadow-soft overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 border-b border-border flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-lg inline-flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-5 w-5 text-primary" }),
              " Active Roster & Applicants"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/applications", className: "text-sm text-primary font-semibold hover:underline", children: "View All" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border", children: applications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: "No one has applied to this job yet." }) : applications.map((app) => {
            const w = app.worker;
            const initials = w.name?.split(" ").map((n) => n[0]).join("") || "W";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "h-10 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-gradient-primary text-primary-foreground text-xs", children: w.avatar || initials }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm", children: w.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `${app.status === "hired" ? "bg-success/15 text-success" : app.status === "declined" ? "bg-destructive/15 text-destructive" : "bg-primary/10 text-primary"} border-0 text-[10px] rounded-full uppercase tracking-wider`, children: app.status })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                    "★ ",
                    w.rating || "5.0",
                    " · ",
                    app.status === "hired" ? "🟢 GPS Active (Clocked In)" : "⚪ Pending Roster Activation"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 w-full sm:w-auto justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "icon", className: "rounded-full h-8 w-8", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/messages", search: {
                  userId: w.id
                }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-3.5 w-3.5" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "rounded-full h-8 px-4 font-bold", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contractor/applications/$applicationId", params: {
                  applicationId: app.id
                }, children: "Review" }) })
              ] })
            ] }, app.id);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-lg mb-4", children: "Job Summary & Compliance" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-y-6 gap-x-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed", children: job.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider mb-1", children: "Escrow & Compliance Mandates" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "text-sm space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "inline-flex items-center gap-1.5 text-xs font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success shrink-0" }),
                  " Digital Escrow Funded (100% Wage Guarantee)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "inline-flex items-center gap-1.5 text-xs font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success shrink-0" }),
                  " Geofence Attendance Matching (",
                  job.geofence_radius_meters || 100,
                  "m Radius)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "inline-flex items-center gap-1.5 text-xs font-medium", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-success shrink-0" }),
                  " Aadhaar Physical Verification Required"
                ] })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4 text-primary" }),
            " Escrow & Budget Overview"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 p-4 rounded-2xl bg-muted/40 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Pay Per Day" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-extrabold mt-1", children: [
                "₹",
                job.pay_per_day
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground uppercase tracking-wider", children: "Escrow Locked" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-extrabold mt-1 text-amber-600 dark:text-amber-400", children: [
                "₹",
                totalEscrow.toLocaleString()
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Duration" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium text-foreground", children: [
                job.duration_days,
                " Days"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Workers Needed" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: job.workers_needed })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Skill Required" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground capitalize", children: job.skill })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Compliance" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-success", children: "Compliant" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-4 w-4 text-primary" }),
            " Activity Timeline"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineItem, { time: "Live", title: "Applications open", desc: "System receiving live worker applications", active: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineItem, { time: "System Checked", title: "Escrow funded", desc: "Batch UPI Escrow lock verified" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineItem, { time: "Posted", title: "Job published", desc: `Posted on ${new Date(job.created_at).toLocaleDateString()}` })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function StatCard({
  icon: Icon,
  label,
  value,
  trend
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border p-4 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-primary font-medium", children: trend })
  ] }) });
}
function TimelineItem({
  time,
  title,
  desc,
  active
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-5 h-5 rounded-full border-[3px] border-card bg-muted group-[.is-active]:bg-primary shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-soft", style: {
      backgroundColor: active ? "var(--primary)" : void 0
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] pl-3 md:pl-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col mb-1 group-odd:md:items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-primary", children: time }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-sm font-bold", children: title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground group-odd:md:text-right", children: desc })
    ] })
  ] });
}
export {
  ManageJob as component
};
