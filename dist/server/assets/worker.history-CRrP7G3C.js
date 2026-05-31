import { r as reactExports, W as jsxRuntimeExports } from "./server-Brds8CES.js";
import { c as createLucideIcon, u as useAuth, h as useLanguage, m as motion, d as cn, b as Link, s as supabase } from "./router-fTGMDcAU.js";
import { B as Badge } from "./badge-DMnAyUHh.js";
import { B as Button } from "./button-Bk64I2uS.js";
import { I as Input } from "./input-BTyUWXgW.js";
import { L as LoaderCircle } from "./loader-circle-CqDBv23a.js";
import { D as Download } from "./download-T-lcOmSL.js";
import { S as Search } from "./search-Dcw4fBWn.js";
import { F as Funnel } from "./funnel-D_iWU5n4.js";
import { I as IndianRupee } from "./indian-rupee-DSYuZIxI.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index--uSmo9Br.js";
import "./index-Buhi5q-1.js";
import "./index-XFZqbW9A.js";
const __iconNode$1 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "M11 4h10", key: "1w87gc" }],
  ["path", { d: "M11 8h7", key: "djye34" }],
  ["path", { d: "M11 12h4", key: "q8tih4" }]
];
const ArrowDownWideNarrow = createLucideIcon("arrow-down-wide-narrow", __iconNode$1);
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M17 14h-6", key: "bkmgh3" }],
  ["path", { d: "M13 18H7", key: "bb0bb7" }],
  ["path", { d: "M7 14h.01", key: "1qa3f1" }],
  ["path", { d: "M17 18h.01", key: "1bdyru" }]
];
const CalendarRange = createLucideIcon("calendar-range", __iconNode);
function History() {
  const {
    user
  } = useAuth();
  const {
    t
  } = useLanguage();
  const [q, setQ] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [historyItems, setHistoryItems] = reactExports.useState([]);
  reactExports.useEffect(() => {
    async function loadHistory() {
      if (!user) return;
      try {
        const {
          data,
          error
        } = await supabase.from("applications").select("*, job:jobs(*, contractor:profiles(name))").eq("worker_id", user.id).eq("status", "hired");
        if (error) throw error;
        const formatted = (data || []).map((app) => {
          const payPerDay = Number(app.job?.pay_per_day) || 0;
          const duration = Number(app.job?.duration_days) || 1;
          const amt = payPerDay * duration;
          const isCompleted = app.job?.status === "completed";
          return {
            id: app.id,
            jobId: app.job_id,
            title: app.job?.title || "General Job",
            contractor: app.job?.contractor?.name || "Contractor",
            date: new Date(app.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            }),
            amount: amt,
            status: isCompleted ? "Paid" : "Pending"
          };
        });
        setHistoryItems(formatted);
      } catch (err) {
        console.error("Error fetching worker history:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadHistory();
  }, [user]);
  const rows = historyItems.filter((h) => h.title.toLowerCase().includes(q.toLowerCase()) || h.contractor.toLowerCase().includes(q.toLowerCase()));
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-[50vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-extrabold tracking-tight", children: t("Job History") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t("All completed jobs and invoices.") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
        " ",
        t("Export CSV")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-2.5 flex items-center gap-2 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground ml-1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: t("Search by job title or contractor"), className: "border-0 shadow-none px-0 h-9 focus-visible:ring-0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full gap-2 h-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4" }),
        " ",
        t("Filters")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full gap-2 h-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownWideNarrow, { className: "h-4 w-4" }),
        " ",
        t("Latest")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3", children: rows.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 8
    }, animate: {
      opacity: 1,
      y: 0
    }, transition: {
      delay: i * 0.04
    }, className: "rounded-2xl bg-card border border-border p-4 shadow-soft hover:shadow-elegant transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center font-bold", children: h.title.split(" ").map((w) => w[0]).slice(0, 2).join("") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-sm truncate", children: h.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: h.contractor })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: cn("rounded-full border-0 shrink-0", h.status === "Paid" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"), children: t(h.status) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarRange, { className: "h-3.5 w-3.5" }),
            h.date
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-base inline-flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-3.5 w-3.5" }),
            h.amount.toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/worker/jobs/$jobId", params: {
            jobId: h.jobId
          }, className: "flex-1 h-9 rounded-full bg-muted text-xs font-medium grid place-items-center hover:bg-muted/70", children: t("View details") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "h-9 px-4 rounded-full bg-gradient-primary text-primary-foreground text-xs font-semibold shadow-soft inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
            " ",
            t("Invoice")
          ] })
        ] })
      ] })
    ] }) }, h.id)) }),
    rows.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-3xl border border-dashed border-border bg-card p-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: t("No jobs found") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t("Try a different search term.") })
    ] })
  ] });
}
export {
  History as component
};
