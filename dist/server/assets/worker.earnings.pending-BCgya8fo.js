import { r as reactExports, W as jsxRuntimeExports } from "./server-DlEMaIYL.js";
import { u as useAuth, b as Link, t as toast, s as supabase } from "./router-DgB0XHQ2.js";
import { B as Badge } from "./badge-z9nJm1iG.js";
import { B as Button } from "./button-DwlwWLNZ.js";
import { L as LoaderCircle } from "./loader-circle-C_Krqs5O.js";
import { A as ArrowLeft } from "./arrow-left-7FMAoHOB.js";
import { W as Wallet } from "./wallet-nkaXBfHE.js";
import { I as IndianRupee } from "./indian-rupee-Dvf5kEID.js";
import { C as Clock } from "./clock-CF8piOhA.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-CYdrBDmt.js";
import "./index-BJ7KTwgS.js";
import "./index-CrZuCHr4.js";
function Pending() {
  const {
    user
  } = useAuth();
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [pendingData, setPendingData] = reactExports.useState([]);
  const [totalPending, setTotalPending] = reactExports.useState(0);
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
        let sum = 0;
        const rows = apps.filter((app) => {
          const j = app.job;
          return j && j.status !== "completed" && j.escrow_status !== "released";
        }).map((app) => {
          const j = app.job;
          const amt = j.pay_per_day * j.duration_days;
          sum += amt;
          const created = new Date(j.created_at);
          const expectedDate = new Date(created.getTime() + 5 * 24 * 60 * 60 * 1e3);
          return {
            id: app.id,
            job: j.title,
            contractor: j.contractor?.name || "Contractor",
            amount: amt,
            date: created.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            }),
            expected: expectedDate.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric"
            })
          };
        });
        setPendingData(rows);
        setTotalPending(sum);
      } catch (err) {
        console.error("Error loading pending payments:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [user]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 flex flex-col items-center justify-center min-h-[60vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 text-primary animate-spin mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading pending payments..." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/worker/earnings", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to Earnings"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-extrabold tracking-tight", children: "Pending Payments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Payouts that are still being processed." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => toast.success("Withdraw request sent"), className: "rounded-full bg-gradient-primary text-primary-foreground gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, { className: "h-4 w-4" }),
        " Request withdrawal"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 rounded-3xl bg-gradient-to-br from-blue-600 to-sky-700 text-white p-6 shadow-elegant relative overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest opacity-90", children: "Total pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-4xl md:text-5xl font-extrabold mt-2 inline-flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-8 w-8" }),
          totalPending.toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm opacity-90 mt-2", children: [
          pendingData.length,
          " payouts awaiting"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl bg-card border border-border p-6 shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Avg release time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-extrabold mt-1", children: "3.2 days" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2", children: "Most contractors release within 5 days of job completion." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-3", children: pendingData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-muted-foreground bg-card border border-border rounded-2xl", children: "No pending payments." }) : pendingData.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-5 shadow-soft hover:shadow-elegant transition-all flex flex-col md:flex-row md:items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 w-12 rounded-2xl bg-amber-500/15 text-amber-600 grid place-items-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold truncate", children: p.job }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          p.contractor,
          " · Created on ",
          p.date
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:text-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-extrabold text-lg inline-flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-4 w-4" }),
          p.amount.toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
          "Expected by ",
          p.expected
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "rounded-full border-0 bg-warning/15 text-warning self-start md:self-center", children: "Pending" })
    ] }, p.id)) })
  ] });
}
export {
  Pending as component
};
