import { r as reactExports, W as jsxRuntimeExports } from "./server-asg8yyOI.js";
import { u as useAuth, b as Link, d as cn, s as supabase } from "./router-CJiiTd-g.js";
import { B as Badge } from "./badge-K2Rxl4bs.js";
import { B as Button } from "./button-CYsrxhE6.js";
import { L as LoaderCircle } from "./loader-circle-BApE_kuV.js";
import { A as ArrowLeft } from "./arrow-left-DysyZWUs.js";
import { D as Download } from "./download-DIhz6Tru.js";
import { I as IndianRupee } from "./indian-rupee-1j-wPeZt.js";
import { T as TrendingUp } from "./trending-up-NkD0eHln.js";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, A as AreaChart, b as Area } from "./AreaChart-CzkAej_0.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-MJfIt0uB.js";
import "./index-xaKJNf22.js";
import "./index-BDj9T5Ow.js";
const FILTERS = [{
  id: "weekly",
  label: "Week"
}, {
  id: "monthly",
  label: "Month"
}, {
  id: "yearly",
  label: "Year"
}];
function TotalEarnings() {
  const {
    user
  } = useAuth();
  const [range, setRange] = reactExports.useState("monthly");
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [earningsData, setEarningsData] = reactExports.useState(null);
  reactExports.useEffect(() => {
    async function loadData() {
      if (!user) return;
      setIsLoading(true);
      try {
        const {
          data,
          error
        } = await supabase.from("applications").select("*, job:jobs(*, contractor:profiles(*))").eq("worker_id", user.id).eq("status", "hired");
        if (error) throw error;
        const apps = data || [];
        let total = 0;
        let completed = 0;
        let pending = 0;
        const historyList = apps.map((app) => {
          const j = app.job;
          const amt = j.pay_per_day * j.duration_days;
          const isCompleted = j.status === "completed" || j.escrow_status === "released";
          total += amt;
          if (isCompleted) {
            completed += amt;
          } else {
            pending += amt;
          }
          return {
            id: app.id,
            title: j.title,
            contractor: j.contractor?.name || "Contractor",
            date: new Date(j.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            }),
            amount: amt,
            status: isCompleted ? "Paid" : "Pending",
            rawDate: new Date(j.created_at)
          };
        });
        historyList.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime());
        const weeklyData = Array.from({
          length: 7
        }).map((_, i) => {
          const d = /* @__PURE__ */ new Date();
          d.setDate(d.getDate() - (6 - i));
          const label = d.toLocaleDateString("en-US", {
            weekday: "short"
          });
          const amt = historyList.filter((h) => h.rawDate.toDateString() === d.toDateString()).reduce((sum, h) => sum + h.amount, 0);
          return {
            label,
            amt
          };
        });
        const monthlyData = Array.from({
          length: 30
        }).map((_, i) => {
          const d = /* @__PURE__ */ new Date();
          d.setDate(d.getDate() - (29 - i));
          const label = `${d.getDate()}`;
          const amt = historyList.filter((h) => h.rawDate.toDateString() === d.toDateString()).reduce((sum, h) => sum + h.amount, 0);
          return {
            label,
            amt
          };
        });
        const yearlyData = Array.from({
          length: 12
        }).map((_, i) => {
          const d = /* @__PURE__ */ new Date();
          d.setMonth(d.getMonth() - (11 - i));
          const label = d.toLocaleDateString("en-US", {
            month: "short"
          });
          const amt = historyList.filter((h) => h.rawDate.getMonth() === d.getMonth() && h.rawDate.getFullYear() === d.getFullYear()).reduce((sum, h) => sum + h.amount, 0);
          return {
            label,
            amt
          };
        });
        setEarningsData({
          total,
          completed,
          pending,
          weekly: weeklyData,
          monthly: monthlyData,
          yearly: yearlyData,
          history: historyList
        });
      } catch (err) {
        console.error("Error loading total earnings:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [user]);
  const activeRangeData = reactExports.useMemo(() => {
    if (!earningsData) return [];
    return earningsData[range];
  }, [earningsData, range]);
  const maxWeeklyAmt = reactExports.useMemo(() => {
    if (!earningsData) return 1500;
    return Math.max(...earningsData.weekly.map((w) => w.amt), 1500);
  }, [earningsData]);
  const maxMonthlyAmt = reactExports.useMemo(() => {
    if (!earningsData) return 26e3;
    const last6 = earningsData.yearly.slice(-6);
    return Math.max(...last6.map((m) => m.amt), 26e3);
  }, [earningsData]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 flex flex-col items-center justify-center min-h-[60vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 text-primary animate-spin mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading total earnings..." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/worker/earnings", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to Earnings"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-extrabold tracking-tight", children: "Total Earnings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Complete overview of your lifetime earnings on JobNow." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
        " Export Report"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-3xl bg-gradient-to-br from-blue-800 via-blue-900 to-slate-950 text-white p-8 shadow-elegant relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest opacity-80", children: "Lifetime earnings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-5xl font-extrabold mt-2 inline-flex items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-9 w-9" }),
        earningsData.total.toLocaleString()
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm opacity-90 mt-2 inline-flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }),
        " Active JobNow Wallet"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-3xl bg-card border border-border p-5 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Income trends" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold mt-1", children: "Earnings breakdown" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex bg-muted rounded-full p-1", children: FILTERS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRange(f.id), className: cn("px-4 py-1.5 rounded-full text-xs font-semibold transition-all", range === f.id ? "bg-card shadow-soft text-foreground" : "text-muted-foreground"), children: f.label }, f.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 h-80", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: range === "weekly" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: activeRangeData, margin: {
        top: 8,
        right: 6,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "barFill", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.60 0.13 240)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.42 0.15 240)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0.01 240)", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: {
          fontSize: 11,
          fill: "oklch(0.45 0.03 240)"
        }, axisLine: false, tickLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
          fontSize: 11,
          fill: "oklch(0.45 0.03 240)"
        }, axisLine: false, tickLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          borderRadius: 12,
          border: "1px solid oklch(0.92 0.01 240)"
        }, formatter: (v) => [`₹${v.toLocaleString()}`, "Earned"] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "amt", fill: "url(#barFill)", radius: [8, 8, 0, 0] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: activeRangeData, margin: {
        top: 8,
        right: 6,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "totalArea", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.42 0.15 240)", stopOpacity: 0.5 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.42 0.15 240)", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0.01 240)", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: {
          fontSize: 11,
          fill: "oklch(0.45 0.03 240)"
        }, axisLine: false, tickLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
          fontSize: 11,
          fill: "oklch(0.45 0.03 240)"
        }, axisLine: false, tickLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
          borderRadius: 12,
          border: "1px solid oklch(0.92 0.01 240)"
        }, formatter: (v) => [`₹${v.toLocaleString()}`, "Earned"] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "amt", stroke: "oklch(0.42 0.15 240)", strokeWidth: 2.5, fill: "url(#totalArea)" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid lg:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold", children: "Weekly breakdown" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: earningsData.weekly.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-xs font-medium text-muted-foreground", children: w.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-primary rounded-full", style: {
            width: `${Math.min(100, w.amt / maxWeeklyAmt * 100)}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold w-20 text-right", children: [
            "₹",
            w.amt.toLocaleString()
          ] })
        ] }, w.label)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold", children: "Monthly breakdown" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 space-y-2", children: earningsData.yearly.slice(-6).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-xs font-medium text-muted-foreground", children: m.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full", style: {
            width: `${Math.min(100, m.amt / maxMonthlyAmt * 100)}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold w-24 text-right", children: [
            "₹",
            m.amt.toLocaleString()
          ] })
        ] }, m.label)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-3xl bg-card border border-border shadow-soft overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold", children: "Payment timeline" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Full history of every payment received." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: earningsData.history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: "No payments recorded yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3", children: "Job" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3 hidden md:table-cell", children: "Contractor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3 hidden sm:table-cell", children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: earningsData.history.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border hover:bg-muted/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 font-medium", children: h.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground hidden md:table-cell", children: h.contractor }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground hidden sm:table-cell", children: h.date }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 font-semibold inline-flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-3.5 w-3.5" }),
            h.amount.toLocaleString()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: cn("rounded-full border-0", h.status === "Paid" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"), children: h.status }) })
        ] }, h.id)) })
      ] }) })
    ] })
  ] });
}
export {
  TotalEarnings as component
};
