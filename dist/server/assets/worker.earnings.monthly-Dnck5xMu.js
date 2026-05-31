import { r as reactExports, W as jsxRuntimeExports } from "./server-DpY2U1qf.js";
import { u as useAuth, b as Link, B as Briefcase, s as supabase } from "./router-D3LitR0x.js";
import { L as LoaderCircle } from "./loader-circle-BvjrLz79.js";
import { A as ArrowLeft } from "./arrow-left-DuGzwRs0.js";
import { I as IndianRupee } from "./indian-rupee-Cjm4sCxT.js";
import { T as TrendingUp } from "./trending-up-HaeoFg-1.js";
import { A as ArrowUpRight } from "./arrow-up-right-8McXNztk.js";
import { R as ResponsiveContainer, A as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, b as Area, B as BarChart, a as Bar } from "./AreaChart-D1bqdhe_.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function Monthly() {
  const {
    user
  } = useAuth();
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
        const now = /* @__PURE__ */ new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const historyList = apps.map((app) => {
          const j = app.job;
          const amt = j.pay_per_day * j.duration_days;
          const isCompleted = j.status === "completed" || j.escrow_status === "released";
          total += amt;
          return {
            id: app.id,
            amount: amt,
            status: isCompleted ? "Paid" : "Pending",
            rawDate: new Date(j.created_at)
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
          const amt = historyList.filter((h) => h.status === "Paid" && h.rawDate.getMonth() === d.getMonth() && h.rawDate.getFullYear() === d.getFullYear()).reduce((sum, h) => sum + h.amount, 0);
          return {
            label,
            amt
          };
        });
        const thisMonthCompletedJobs = historyList.filter((h) => h.status === "Paid" && h.rawDate >= startOfMonth);
        const thisMonthAmt = thisMonthCompletedJobs.reduce((sum, h) => sum + h.amount, 0);
        const completedCount = thisMonthCompletedJobs.length;
        const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
        const prevMonthCompletedJobs = historyList.filter((h) => h.status === "Paid" && h.rawDate >= prevMonthStart && h.rawDate <= prevMonthEnd);
        const prevMonthAmt = prevMonthCompletedJobs.reduce((sum, h) => sum + h.amount, 0);
        const workedDays = new Set(thisMonthCompletedJobs.map((h) => h.rawDate.getDate()));
        setEarningsData({
          yearly: yearlyData,
          thisMonthAmt,
          completedCount,
          prevMonthAmt,
          workedDays
        });
      } catch (err) {
        console.error("Error loading monthly earnings:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [user]);
  const months = reactExports.useMemo(() => earningsData?.yearly || [], [earningsData]);
  const last = reactExports.useMemo(() => months[months.length - 1]?.amt || 0, [months]);
  const prev = reactExports.useMemo(() => months[months.length - 2]?.amt || 0, [months]);
  const growth = reactExports.useMemo(() => {
    if (prev === 0) return last > 0 ? "100.0" : "0.0";
    return ((last - prev) / prev * 100).toFixed(1);
  }, [last, prev]);
  const avgPerJob = reactExports.useMemo(() => {
    if (!earningsData || earningsData.completedCount === 0) return 0;
    return Math.round(earningsData.thisMonthAmt / earningsData.completedCount);
  }, [earningsData]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 flex flex-col items-center justify-center min-h-[60vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 text-primary animate-spin mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading monthly earnings..." })
    ] });
  }
  const currentMonthLabel = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/worker/earnings", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to Earnings"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-extrabold tracking-tight", children: "Monthly Earnings Analytics" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Detailed view of your performance this month." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4", children: [{
      label: "This month",
      value: `₹${earningsData.thisMonthAmt.toLocaleString()}`,
      sub: currentMonthLabel,
      icon: IndianRupee
    }, {
      label: "Jobs completed",
      value: String(earningsData.completedCount),
      sub: "Paid out this cycle",
      icon: Briefcase
    }, {
      label: "Growth",
      value: `${growth}%`,
      sub: "vs last month",
      icon: TrendingUp
    }, {
      label: "Avg per job",
      value: `₹${avgPerJob.toLocaleString()}`,
      sub: "Earnings efficiency",
      icon: ArrowUpRight
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-4 shadow-soft hover:shadow-elegant hover:-translate-y-0.5 transition-all", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-2xl md:text-3xl font-extrabold", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5", children: s.sub })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 rounded-3xl bg-card border border-border p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: "Monthly trend (last 12 months)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: months, margin: {
          top: 8,
          right: 6,
          left: -16,
          bottom: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "mfill", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.58 0.12 240)", stopOpacity: 0.5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.58 0.12 240)", stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0.01 240)", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: {
            fontSize: 11,
            fill: "oklch(0.5 0.03 240)"
          }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
            fontSize: 11,
            fill: "oklch(0.5 0.03 240)"
          }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            borderRadius: 12,
            border: "1px solid oklch(0.92 0.01 240)"
          }, formatter: (v) => [`₹${v.toLocaleString()}`, "Earned"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "amt", stroke: "oklch(0.58 0.12 240)", strokeWidth: 2.5, fill: "url(#mfill)" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-5 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: "Comparison" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This month vs last month" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 h-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: [{
          label: "Last Month",
          amt: prev
        }, {
          label: "This Month",
          amt: last
        }], margin: {
          top: 8,
          right: 6,
          left: -16,
          bottom: 0
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "compFill", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "oklch(0.66 0.10 220)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "oklch(0.58 0.12 240)" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "oklch(0.92 0.01 240)", vertical: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: {
            fontSize: 11,
            fill: "oklch(0.5 0.03 240)"
          }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
            fontSize: 11,
            fill: "oklch(0.5 0.03 240)"
          }, axisLine: false, tickLine: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            borderRadius: 12,
            border: "1px solid oklch(0.92 0.01 240)"
          }, formatter: (v) => [`₹${v.toLocaleString()}`, "Earned"] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "amt", fill: "url(#compFill)", radius: [8, 8, 0, 0] })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-3xl bg-card border border-border p-5 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: "Work frequency this month" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Days you completed jobs (highlighted in blue)." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-7 md:grid-cols-15 gap-1.5", children: Array.from({
        length: 30
      }).map((_, i) => {
        const worked = earningsData.workedDays.has(i + 1);
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `aspect-square rounded-md transition-all ${worked ? "bg-gradient-primary scale-105 shadow-soft" : "bg-muted"}`, title: `Day ${i + 1}` }, i);
      }) })
    ] })
  ] });
}
export {
  Monthly as component
};
