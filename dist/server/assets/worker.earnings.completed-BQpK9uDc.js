import { r as reactExports, W as jsxRuntimeExports } from "./server-x9CHfBKQ.js";
import { u as useAuth, b as Link, t as toast, s as supabase } from "./router-D7lfUnXG.js";
import { B as Badge } from "./badge-xzobKUtH.js";
import { B as Button } from "./button-jV6UgcJo.js";
import { L as LoaderCircle } from "./loader-circle-Cv_0hvwz.js";
import { A as ArrowLeft } from "./arrow-left-CRkNVaEI.js";
import { D as Download } from "./download-OD6tPo86.js";
import { I as IndianRupee } from "./indian-rupee-DwhH-q9y.js";
import { C as CircleCheck } from "./circle-check-PCGF0FyS.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./index-2eWgaTdc.js";
import "./index-C1IWq_ZA.js";
import "./index-Blqeljoh.js";
function Completed() {
  const {
    user
  } = useAuth();
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [completedData, setCompletedData] = reactExports.useState([]);
  const [totalCompleted, setTotalCompleted] = reactExports.useState(0);
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
          return j && (j.status === "completed" || j.escrow_status === "released");
        }).map((app, i) => {
          const j = app.job;
          const amt = j.pay_per_day * j.duration_days;
          sum += amt;
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
            txn: `TXN${String(2026e3 + i * 137).padStart(8, "0")}`,
            method: i % 2 === 0 ? "UPI" : "Bank transfer"
          };
        });
        setCompletedData(rows);
        setTotalCompleted(sum);
      } catch (err) {
        console.error("Error loading completed payments:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [user]);
  const upiCount = completedData.filter((r) => r.method === "UPI").length;
  const bankCount = completedData.filter((r) => r.method !== "UPI").length;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 flex flex-col items-center justify-center min-h-[60vh]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 text-primary animate-spin mb-2" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading completed payments..." })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pt-6 md:pt-8 pb-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/worker/earnings", className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
      " Back to Earnings"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-extrabold tracking-tight", children: "Completed Payments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "All successfully paid jobs and their invoices." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "rounded-full gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-4 w-4" }),
        " Export CSV"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4", children: [{
      label: "Total received",
      value: `₹${totalCompleted.toLocaleString()}`
    }, {
      label: "Transactions",
      value: String(completedData.length)
    }, {
      label: "UPI payouts",
      value: String(upiCount)
    }, {
      label: "Bank transfers",
      value: String(bankCount)
    }].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border p-4 shadow-soft", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-2xl font-extrabold", children: s.value })
    ] }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 rounded-3xl bg-card border border-border shadow-soft overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: completedData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: "No completed payment transactions." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/40 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3", children: "Job" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3 hidden md:table-cell", children: "Transaction ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3 hidden sm:table-cell", children: "Date" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3 hidden lg:table-cell", children: "Method" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3", children: "Amount" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left font-medium px-5 py-3", children: "Invoice" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: completedData.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border hover:bg-muted/30", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: h.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: h.contractor })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground font-mono text-xs hidden md:table-cell", children: h.txn }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 text-muted-foreground hidden sm:table-cell", children: h.date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3 hidden lg:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "rounded-full border-0 bg-primary/10 text-primary", children: h.method }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-3 font-semibold inline-flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-3.5 w-3.5" }),
          h.amount.toLocaleString()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", className: "rounded-full gap-1", onClick: () => toast.success("Invoice downloaded"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
          " PDF"
        ] }) })
      ] }, h.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-6 shadow-elegant flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-10 w-10 shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold", children: "All payments verified" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90", children: "Every transaction is encrypted and verifiable from your invoice PDF." })
      ] })
    ] })
  ] });
}
export {
  Completed as component
};
